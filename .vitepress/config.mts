import { defineConfig } from 'vitepress';

export default defineConfig({
	title: 'n8n for Sharetribe',
	description:
		'Automate your Sharetribe marketplace with n8n (the Zapier alternative). Ready-made workflow templates - copy, paste, run.',
	base: '/n8n-nodes-sharetribe-docs/',
	cleanUrls: true,
	lastUpdated: true,

	head: [
		['link', { rel: 'icon', href: '/n8n-nodes-sharetribe-docs/favicon.ico' }],
		['meta', { name: 'theme-color', content: '#ec6042' }],
	],

	themeConfig: {
		nav: [
			{ text: 'Templates', link: '/templates' },
			{ text: 'Set up', link: '/getting-started' },
			{ text: 'FAQ', link: '/faq' },
			{ text: 'GitHub', link: 'https://github.com/tribebuilder/n8n-nodes-sharetribe' },
		],

		sidebar: {
			'/': [
				{
					text: 'Start here',
					items: [
						{ text: 'Introduction', link: '/' },
						{ text: 'Set up the node', link: '/getting-started' },
					],
				},
				{
					text: 'Workflow templates',
					items: [
						{ text: 'All workflow templates', link: '/templates' },
						{
							text: 'Admin notifications',
							collapsed: true,
							items: [
								{
									text: 'Email on new dispute',
									link: '/templates/admin-notifications/admin-email-on-new-dispute',
								},
								{
									text: 'Email on new paid transaction',
									link: '/templates/admin-notifications/admin-email-on-new-paid-transaction',
								},
							],
						},
						{
							text: 'Bookings',
							collapsed: true,
							items: [
								{
									text: 'Booking confirmation + calendar invite',
									link: '/templates/bookings/booking-confirmation-with-calendar-invite',
								},
							],
						},
						{
							text: 'Monetization',
							collapsed: true,
							items: [
								{
									text: 'Approve listing after Stripe Checkout fee',
									link: '/templates/monetization/approve-listing-after-stripe-checkout-fee',
								},
								{
									text: 'Approve user after Stripe membership',
									link: '/templates/monetization/approve-user-after-stripe-membership-fee',
								},
							],
						},
						{
							text: 'User onboarding',
							collapsed: true,
							items: [
								{
									text: 'Sync new users to Mailchimp',
									link: '/templates/user-onboarding/sync-new-users-to-mailchimp',
								},
							],
						},
					],
				},
				{
					text: 'Learn more',
					items: [
						{ text: 'What the node does', link: '/operations' },
						{ text: 'How it works', link: '/concepts' },
					],
				},
				{
					text: 'Help',
					items: [
						{ text: 'FAQ', link: '/faq' },
						{ text: 'Suggest a workflow', link: '/contributing' },
					],
				},
			],
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/tribebuilder/n8n-nodes-sharetribe' },
		],

		footer: {
			message:
				'Built and maintained by <a href="https://tribebuilder.dev">TribeBuilder</a> &middot; <a href="https://experts.sharetribe.com/l/greg-long-freelance-developer/6973f22c-9cdb-4b3a-b0bd-7aa5e3915fe0">verified Sharetribe Expert</a> &middot; verified n8n community node publisher.',
			copyright: 'MIT licensed',
		},

		search: {
			provider: 'local',
		},

		editLink: {
			pattern:
				'https://github.com/tribebuilder/n8n-nodes-sharetribe-docs/edit/main/:path',
			text: 'Suggest an edit on GitHub',
		},
	},
});
