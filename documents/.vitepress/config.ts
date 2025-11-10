import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'larpress',
  description: 'Modern Laravel CMS & Application Starter Kit',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started/introduction' },
      { text: 'API', link: '/api/authentication' },
      { text: 'Demo', link: 'https://demo.larpress.digital' }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/introduction' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Configuration', link: '/getting-started/configuration' },
            { text: 'Quick Start', link: '/getting-started/quick-start' }
          ]
        }
      ],
      
      '/admin-panel/': [
        {
          text: 'Admin Panel',
          items: [
            { text: 'Overview', link: '/admin-panel/overview' },
            { text: 'Dashboard', link: '/admin-panel/dashboard' }
          ]
        },
        {
          text: 'Access Control',
          items: [
            { text: 'Users', link: '/admin-panel/users' },
            { text: 'Roles & Permissions', link: '/admin-panel/roles-permissions' },
            { text: 'Login Activity', link: '/admin-panel/login-activity' },
            { text: 'API Tokens', link: '/admin-panel/api-tokens' },
            { text: 'IP Restrictions', link: '/admin-panel/ip-restrictions' }
          ]
        },
        {
          text: 'Content Management',
          items: [
            { text: 'Pages & Posts', link: '/admin-panel/content' },
            { text: 'Content Types', link: '/admin-panel/content-types' },
            { text: 'Categories', link: '/admin-panel/categories' },
            { text: 'HTML Blocks', link: '/admin-panel/html-blocks' },
            { text: 'Menus', link: '/admin-panel/menus' },
            { text: 'Sliders', link: '/admin-panel/sliders' },
            { text: 'Media Library', link: '/admin-panel/media-library' }
          ]
        },
        {
          text: 'Communication',
          items: [
            { text: 'Contact Messages', link: '/admin-panel/contact-messages' },
            { text: 'Email Layouts', link: '/admin-panel/email-layouts' },
            { text: 'Email Templates', link: '/admin-panel/email-templates' },
            { text: 'SMS Templates', link: '/admin-panel/sms-templates' },
            { text: 'Notifications', link: '/admin-panel/notifications' },
            { text: 'Announcements', link: '/admin-panel/announcements' }
          ]
        },
        {
          text: 'System',
          items: [
            { text: 'Modules', link: '/modules/introduction' },
            { text: 'Themes', link: '/themes/introduction' },
            { text: 'Languages', link: '/admin-panel/languages' },
            { text: 'Settings', link: '/admin-panel/settings' },
            { text: 'Backups', link: '/admin-panel/backups' },
            { text: 'Cache & Maintenance', link: '/admin-panel/cache-maintenance' },
            { text: 'Activity Logs', link: '/admin-panel/activity-logs' },
            { text: 'Version Management', link: '/admin-panel/version-management' }
          ]
        }
      ],

      '/modules/': [
        {
          text: 'Modules',
          items: [
            { text: 'Introduction', link: '/modules/introduction' },
            { text: 'Creating Modules', link: '/modules/creating' },
            { text: 'Module Structure', link: '/modules/structure' },
            { text: 'Service Providers', link: '/modules/service-providers' },
            { text: 'Routes & Controllers', link: '/modules/routes-controllers' },
            { text: 'Views & Assets', link: '/modules/views-assets' },
            { text: 'Database & Migrations', link: '/modules/database' },
            { text: 'Publishing Modules', link: '/modules/publishing' }
          ]
        }
      ],

      '/themes/': [
        {
          text: 'Themes',
          items: [
            { text: 'Introduction', link: '/themes/introduction' },
            { text: 'Creating Themes', link: '/themes/creating' },
            { text: 'Theme Structure', link: '/themes/structure' },
            { text: 'Blade Templates', link: '/themes/blade-templates' },
            { text: 'Assets & Styling', link: '/themes/assets-styling' },
            { text: 'Theme Settings', link: '/themes/settings' },
            { text: 'Publishing Themes', link: '/themes/publishing' }
          ]
        }
      ],

      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Users', link: '/api/users' },
            { text: 'Content', link: '/api/content' },
            { text: 'Media', link: '/api/media' },
            { text: 'Rate Limiting', link: '/api/rate-limiting' },
            { text: 'Error Handling', link: '/api/error-handling' }
          ]
        }
      ],

      '/deployment/': [
        {
          text: 'Deployment',
          items: [
            { text: 'Server Requirements', link: '/deployment/requirements' },
            { text: 'Shared Hosting', link: '/deployment/shared-hosting' },
            { text: 'VPS Setup', link: '/deployment/vps-setup' },
            { text: 'Production Checklist', link: '/deployment/checklist' },
            { text: 'Performance Optimization', link: '/deployment/performance' },
            { text: 'Security Best Practices', link: '/deployment/security' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/larpress' },
      { icon: 'twitter', link: 'https://twitter.com/larpress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 larpress'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/yourusername/larpress-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#667eea' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'larpress Documentation' }],
    ['meta', { property: 'og:description', content: 'Modern Laravel CMS & Application Starter Kit' }]
  ]
})

