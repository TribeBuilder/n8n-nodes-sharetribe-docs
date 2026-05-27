# n8n-nodes-sharetribe docs site

Documentation site for the verified n8n community node `n8n-nodes-sharetribe`, maintained by [TribeBuilder](https://tribebuilder.dev) - a verified Sharetribe Expert and verified n8n community node publisher.

Built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages.

## Local dev

```bash
npm install
npm run docs:dev
```

The dev server prints a local URL you can open in the browser. Edits to Markdown and config files hot-reload.

## Deploy

Deploys are local-only via the [`gh-pages`](https://github.com/tschaub/gh-pages) package - no CI involved.

One-time setup: in the GitHub repo settings, set Pages source to deploy from the `gh-pages` branch, root folder.

Then to publish:

```bash
npm run docs:deploy
```

This regenerates the template pages, builds the site, and pushes `.vitepress/dist` to the `gh-pages` branch on `origin`.

## Source repo

The community node itself lives at [github.com/tribebuilder/n8n-nodes-sharetribe](https://github.com/tribebuilder/n8n-nodes-sharetribe).

The `scripts/generateTemplateDocs.ts` generator reads workflow JSONs from `../n8n-nodes-sharetribe/workflows/public-templates/published/`, so a sibling checkout of the node repo is expected when regenerating the template pages. Clone both repos side-by-side under the same parent directory.
