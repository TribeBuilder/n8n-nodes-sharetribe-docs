/**
 * Generates GitHub Pages template documentation from public-template workflow JSON.
 *
 * Reads workflow JSON from the sibling `n8n-nodes-sharetribe` repo (expected at
 * `../n8n-nodes-sharetribe`) under `workflows/public-templates/published/<category>/<slug>.json`.
 * For each workflow it writes a Markdown page at `templates/<category>/<slug>.md` and copies
 * the JSON to `public/templates/<category>/<slug>.json` in this repo. The page is built from
 * the main sticky note inside the workflow so the docs cannot drift from the in-canvas
 * instructions.
 *
 * Two sticky-note formats are supported:
 *
 *   A. `## Try It Out!` / `### {title}` / paragraph / `### How it works` / ...
 *   B. `## [template] {title}` / `### How it works` / `### Setup steps` / `### Customization`
 *
 * Run via `npm run generate:template-docs`.
 */

import {
	readdirSync,
	readFileSync,
	writeFileSync,
	mkdirSync,
	copyFileSync,
	existsSync,
} from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_REPO_ROOT = path.resolve(REPO_ROOT, '../n8n-nodes-sharetribe');
const TEMPLATES_ROOT = path.join(SOURCE_REPO_ROOT, 'workflows/public-templates/published');
const DOCS_ROOT = path.join(REPO_ROOT, 'templates');
const PUBLIC_TEMPLATES_ROOT = path.join(REPO_ROOT, 'public/templates');
const SCREENSHOTS_ROOT = path.join(REPO_ROOT, 'public/img/templates');
const SOURCE_BASE = 'https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published';

interface StickyNode {
	parameters: { content: string; color?: number };
	type: string;
	name: string;
}

interface Workflow {
	nodes: StickyNode[];
}

interface ParsedSticky {
	title: string;
	description: string;
	sections: Map<string, string>;
}

function listSubdirs(root: string): string[] {
	return readdirSync(root, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();
}

function listJsonFiles(dir: string): string[] {
	return readdirSync(dir)
		.filter((name) => name.endsWith('.json'))
		.sort();
}

function findMainSticky(workflow: Workflow): string | null {
	const stickies = workflow.nodes.filter((n) => n.type === 'n8n-nodes-base.stickyNote');
	const main = stickies.find((n) => {
		const c = n.parameters.content ?? '';
		const isStep = n.parameters.color === 7;
		const looksMain =
			c.startsWith('## Try It Out!') ||
			c.startsWith('## [template]') ||
			(!isStep && c.startsWith('## ') && /###\s+How it works/i.test(c));
		return looksMain;
	});
	return main?.parameters.content ?? null;
}

const DESCRIPTION_KEY = '__description__';

function parseSticky(content: string): ParsedSticky {
	const lines = content.split('\n');
	const sections = new Map<string, string>();
	let title = '';
	let currentHeading: string | null = null;
	let buffer: string[] = [];

	const flush = () => {
		if (currentHeading) {
			const body = buffer.join('\n').trim();
			if (body) sections.set(currentHeading, body);
		}
		buffer = [];
	};

	for (const raw of lines) {
		const line = raw;
		const h2 = line.match(/^##\s+(.+?)\s*$/);
		const h3 = line.match(/^###\s+(.+?)\s*$/);

		if (h2) {
			const h2Text = h2[1];
			if (h2Text.startsWith('[template]')) {
				title = h2Text.replace(/^\[template\]\s*/, '').trim();
			} else if (/try it out/i.test(h2Text)) {
				// title comes from the next H3
			} else if (!title) {
				title = h2Text.trim();
			}
			continue;
		}

		if (h3) {
			flush();
			if (!title) {
				title = h3[1].trim();
				currentHeading = DESCRIPTION_KEY;
				continue;
			}
			currentHeading = h3[1].trim();
			continue;
		}

		if (currentHeading) {
			buffer.push(line);
		}
	}
	flush();

	const description = (sections.get(DESCRIPTION_KEY) ?? '').trim();
	sections.delete(DESCRIPTION_KEY);

	return { title, description, sections };
}

function slugForTitle(s: string): string {
	return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function categoryLabel(category: string): string {
	return category
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

function renderPage(args: {
	parsed: ParsedSticky;
	category: string;
	jsonFile: string;
	navOrder: number;
}): string {
	const { parsed, category, jsonFile } = args;
	const slug = jsonFile.replace(/\.json$/, '');
	const sourceUrl = `${SOURCE_BASE}/${category}/${jsonFile}`;

	const sectionOrder = [
		'How it works',
		'How to set up',
		'Setup steps',
		'Subscription consent (important)',
		'Requirements',
		'Customization',
		'How to customize',
	];

	const escapeVueBraces = (s: string): string => {
		const codeWithBraces = /`([^`\n]*\{\{[^`\n]*?\}\}[^`\n]*)`/g;
		const withCodeReplaced = s.replace(codeWithBraces, (_m, inner) => `<code v-pre>${inner}</code>`);
		return withCodeReplaced
			.replace(/\{\{/g, '<span v-pre>{{</span>')
			.replace(/\}\}/g, '<span v-pre>}}</span>');
	};

	const renderedSections: string[] = [];
	const seen = new Set<string>();
	for (const heading of sectionOrder) {
		const match = [...parsed.sections.keys()].find(
			(k) => k.toLowerCase() === heading.toLowerCase(),
		);
		if (match && !seen.has(match)) {
			seen.add(match);
			renderedSections.push(
				`## ${match}\n\n${escapeVueBraces(parsed.sections.get(match)!.trim())}\n`,
			);
		}
	}
	for (const [heading, body] of parsed.sections) {
		if (!seen.has(heading)) {
			renderedSections.push(`## ${heading}\n\n${escapeVueBraces(body.trim())}\n`);
		}
	}

	const title = parsed.title || slug;
	const description = parsed.description
		? `${parsed.description}\n\n`
		: '';
	const screenshotFile = path.join(SCREENSHOTS_ROOT, `${slug}.png`);
	const screenshotProp = existsSync(screenshotFile)
		? ` screenshot="/img/templates/${slug}.png"`
		: '';

	const frontMatter = [
		'---',
		`title: "${title.replace(/"/g, '\\"')}"`,
		`description: "${(parsed.description.split('\n')[0] ?? '').replace(/"/g, '\\"').slice(0, 200)}"`,
		'---',
		'',
	].join('\n');

	const header =
		`# ${title}\n\n` +
		`**Category:** [${categoryLabel(category)}](/templates/${category}/)\n\n` +
		`<ClientOnly>\n  <TemplateActions slug="${slug}" category="${category}" source-url="${sourceUrl}"${screenshotProp} />\n</ClientOnly>\n\n`;

	const footer =
		`\n## Import this workflow\n\n` +
		`The fastest way: click **Copy template JSON** above, then paste it onto your n8n workflow canvas.\n\n` +
		`Step by step:\n\n` +
		`1. Click **Copy template JSON** above (or **Download JSON** to save the file).\n` +
		`2. In n8n, open a new workflow.\n` +
		`3. Paste with **Ctrl/Cmd+V** directly on the canvas. n8n imports every node, sticky note, and connection.\n` +
		`4. Reconnect the credentials called out in the setup steps above.\n` +
		`5. Click **Publish** in the top-right to turn the workflow on.\n\n` +
		`::: tip Recommended\n` +
		`Set up an [error workflow](https://docs.n8n.io/flow-logic/error-handling/) so you're notified if anything goes wrong - the same step applies to any n8n workflow you run in production.\n` +
		`:::\n\n` +
		`[← Back to ${categoryLabel(category)}](/templates/${category}/) · [All workflow templates](/templates)\n`;

	return frontMatter + header + description + renderedSections.join('\n') + footer;
}

function renderCategoryIndex(args: {
	category: string;
	entries: { title: string; slug: string; description: string }[];
}): string {
	const { category, entries } = args;
	const label = categoryLabel(category);
	const frontMatter = [
		'---',
		`title: ${label}`,
		`description: "Sharetribe n8n workflow templates - ${label}."`,
		'---',
		'',
	].join('\n');

	const intro = `# ${label}\n\n`;
	const list = entries
		.map((e) => {
			const oneLine = e.description.split('\n').find((l) => l.trim().length > 0) ?? '';
			return `### [${e.title}](/templates/${category}/${e.slug})\n\n${oneLine.trim()}\n`;
		})
		.join('\n');

	const footer = `\n[← All templates](/templates)\n`;

	return frontMatter + intro + list + footer;
}

function main(): void {
	const categories = listSubdirs(TEMPLATES_ROOT);

	mkdirSync(SCREENSHOTS_ROOT, { recursive: true });
	for (const category of categories) {
		const categoryDir = path.join(TEMPLATES_ROOT, category);
		const outDir = path.join(DOCS_ROOT, category);
		const publicDir = path.join(PUBLIC_TEMPLATES_ROOT, category);
		mkdirSync(outDir, { recursive: true });
		mkdirSync(publicDir, { recursive: true });

		const files = listJsonFiles(categoryDir);
		const entries: { title: string; slug: string; description: string }[] = [];
		let navOrder = 0;

		for (const file of files) {
			navOrder += 1;
			const fullPath = path.join(categoryDir, file);
			const workflow = JSON.parse(readFileSync(fullPath, 'utf8')) as Workflow;
			const content = findMainSticky(workflow);
			if (!content) {
				console.warn(`No main sticky found in ${fullPath}`);
				continue;
			}
			const parsed = parseSticky(content);
			const page = renderPage({ parsed, category, jsonFile: file, navOrder });
			const slug = file.replace(/\.json$/, '');
			writeFileSync(path.join(outDir, `${slug}.md`), page);
			copyFileSync(fullPath, path.join(publicDir, file));
			const fallbackDescription =
				parsed.description ||
				(parsed.sections.get('How it works') ?? '')
					.split('\n')
					.map((l) => l.replace(/^[*\-\d.]+\s+/, '').trim())
					.find((l) => l.length > 0) ||
				'';
			entries.push({
				title: parsed.title || slug,
				slug,
				description: fallbackDescription,
			});
			console.log(`Wrote templates/${category}/${slug}.md`);
		}

		const indexPage = renderCategoryIndex({ category, entries });
		writeFileSync(path.join(outDir, 'index.md'), indexPage);
		console.log(`Wrote templates/${category}/index.md`);
	}
}

main();
