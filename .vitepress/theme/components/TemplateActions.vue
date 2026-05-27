<script setup lang="ts">
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';

const props = defineProps<{
	slug: string;
	category: string;
	sourceUrl: string;
	screenshot?: string;
}>();

const jsonPath = computed(() => withBase(`/templates/${props.category}/${props.slug}.json`));
const screenshotSrc = computed(() => (props.screenshot ? withBase(props.screenshot) : ''));

const copied = ref(false);
const error = ref<string | null>(null);

async function copyJSON(): Promise<void> {
	error.value = null;
	try {
		const res = await fetch(jsonPath.value);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const text = await res.text();
		await navigator.clipboard.writeText(text);
		copied.value = true;
		window.setTimeout(() => {
			copied.value = false;
		}, 2500);
	} catch (e) {
		error.value =
			'Copy failed. Use the Download button instead, or check clipboard permissions.';
	}
}
</script>

<template>
	<div class="template-actions">
		<figure v-if="screenshot" class="template-screenshot">
			<img :src="screenshotSrc" :alt="`Preview of the ${slug} workflow in n8n`" loading="lazy" />
		</figure>

		<div class="template-buttons">
			<button type="button" class="ta-btn ta-btn--primary" @click="copyJSON">
				<span v-if="!copied">Copy template JSON</span>
				<span v-else>✓ Copied. Now paste it in n8n</span>
			</button>

			<a class="ta-btn ta-btn--secondary" :href="jsonPath" :download="`${slug}.json`">
				Download JSON
			</a>

			<a
				class="ta-btn ta-btn--ghost"
				:href="sourceUrl"
				target="_blank"
				rel="noreferrer"
			>
				View source on GitHub →
			</a>
		</div>

		<p class="template-hint">
			<strong>Easiest:</strong> click <em>Copy template JSON</em>, then paste
			(<kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>V</kbd>) onto your n8n workflow canvas - n8n imports the
			template automatically.
		</p>
		<p v-if="error" class="template-error">{{ error }}</p>
	</div>
</template>

<style scoped>
.template-actions {
	margin: 1.5rem 0 2rem;
	padding: 1.25rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 12px;
	background: var(--vp-c-bg-soft);
}

.template-screenshot {
	margin: 0 0 1rem;
}

.template-screenshot img {
	display: block;
	width: 100%;
	height: auto;
	border-radius: 8px;
	border: 1px solid var(--vp-c-divider);
}

.template-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem 0.75rem;
	align-items: center;
}

.ta-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0.55rem 1rem;
	border-radius: 8px;
	font-weight: 600;
	font-size: 0.95rem;
	line-height: 1.2;
	text-decoration: none;
	border: 1px solid transparent;
	cursor: pointer;
	transition: filter 0.15s ease, transform 0.05s ease;
}

.ta-btn:hover {
	filter: brightness(1.08);
}

.ta-btn:active {
	transform: translateY(1px);
}

.ta-btn--primary {
	background: var(--vp-c-brand-1);
	color: var(--vp-c-white);
}

.ta-btn--secondary {
	background: var(--vp-c-bg);
	color: var(--vp-c-text-1);
	border-color: var(--vp-c-divider);
}

.ta-btn--ghost {
	background: transparent;
	color: var(--vp-c-text-2);
}

.template-hint {
	margin: 0.85rem 0 0;
	font-size: 0.9rem;
	color: var(--vp-c-text-2);
}

.template-hint kbd {
	display: inline-block;
	padding: 0.05rem 0.4rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 4px;
	background: var(--vp-c-bg);
	font-family: var(--vp-font-family-mono);
	font-size: 0.8em;
}

.template-error {
	margin: 0.65rem 0 0;
	color: var(--vp-c-danger-1, #d04a4a);
	font-size: 0.9rem;
}
</style>
