export default {
	title: 'larpress',
	description: 'Modern Laravel CMS',
	cleanUrls: true,
	lastUpdated: true,
	themeConfig: {
		nav: [
			{ text: 'Introduction', link: '/getting-started/introduction' },
			{ text: 'Getting started', link: '/getting-started/installation' },
			{ text: 'Modules', link: '/modules/' },
		],
		sidebar: [
			{
				text: 'Introduction',
				items: [
					{ text: 'What is larpress?', link: '/getting-started/introduction' },
				],
			},
			{
				text: 'Getting started',
				collapsed: false,
				items: [
					{ text: 'Installation', link: '/getting-started/installation' },
					{ text: 'Quick start', link: '/getting-started/quick-start' },
					{ text: 'Configuration', link: '/getting-started/configuration' },
				],
			},
			{
				text: 'Modules',
				link: '/modules/',
				items: [
					{
						text: 'Access Control',
						items: [
							{ text: 'Users', link: '/modules/access-control/users' },
							{ text: 'Roles & Permissions', link: '/modules/access-control/roles-permissions' },
							{ text: 'Login Activity', link: '/modules/access-control/login-activity' },
							{ text: 'API Tokens', link: '/modules/access-control/api-tokens' },
							{ text: 'IP Restrictions', link: '/modules/access-control/ip-restrictions' },
							{ text: 'Password Policy Settings', link: '/modules/access-control/password-policy-settings' },
						],
					},
					{
						text: 'Content',
						items: [
							{ text: 'Content / Pages', link: '/modules/content/content-pages' },
							{ text: 'Types', link: '/modules/content/types' },
							{ text: 'Categories', link: '/modules/content/categories' },
							{ text: 'HTML Blocks', link: '/modules/content/html-blocks' },
							{ text: 'Menus', link: '/modules/content/menus' },
							{ text: 'Sliders', link: '/modules/content/sliders' },
							{ text: 'Media Library', link: '/modules/content/media-library' },
						],
					},
					{
						text: 'Communication',
						items: [
							{ text: 'Contact Us', link: '/modules/communication/contact-us' },
							{ text: 'Email Layouts', link: '/modules/communication/email-layouts' },
							{ text: 'Email Templates', link: '/modules/communication/email-templates' },
							{ text: 'SMS Templates', link: '/modules/communication/sms-templates' },
							{ text: 'Notifications Center', link: '/modules/communication/notifications-center' },
							{ text: 'Announcements', link: '/modules/communication/announcements' },
							{ text: 'Communication Settings', link: '/modules/communication/communication-settings' },
						],
					},
					{
						text: 'System',
						items: [
							{ text: 'Modules', link: '/modules/system/modules' },
							{ text: 'Themes', link: '/modules/system/themes' },
							{ text: 'Languages', link: '/modules/system/languages' },
							{ text: 'Settings', link: '/modules/system/settings' },
							{ text: 'Cache & Maintenance', link: '/modules/system/cache-maintenance' },
							{ text: 'Activity Logs', link: '/modules/system/activity-logs' },
							{ text: 'Version Management', link: '/modules/system/version-management' },
						],
					},
				],
			},
		],
	},
}
