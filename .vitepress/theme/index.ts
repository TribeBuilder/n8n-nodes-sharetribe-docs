import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import TemplateActions from './components/TemplateActions.vue';
import './style.css';

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.component('TemplateActions', TemplateActions);
	},
} satisfies Theme;
