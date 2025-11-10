# Introduction

Welcome to larpress - a modern, extensible Laravel-based CMS and application starter kit designed for developers who want to build powerful web applications quickly.

## What is larpress?

larpress is a complete content management system and application framework built on Laravel 11.x. It combines the power of Laravel with the elegance of FilamentPHP to provide a robust foundation for any web project.

### Key Features

- **Easy Installation** - One-click web installer gets you up and running in minutes
- **FilamentPHP Admin** - Beautiful, modern admin panel for managing everything
- **Modular Architecture** - Add features via installable modules
- **Theme System** - Switch and customize UI themes easily
- **Complete CMS** - Full content management with pages, posts, media, and more
- **User Management** - Comprehensive user, role, and permission system
- **Developer Friendly** - Clean code, extensive documentation, and API

## Who is larpress For?

larpress is perfect for:

- **Laravel Developers** building client projects
- **Agencies** needing a reliable starting point
- **SaaS Founders** launching MVPs quickly
- **Content Creators** wanting a modern CMS
- **Developers** who value clean, maintainable code

## Technology Stack

larpress is built with modern, proven technologies:

- **Backend**: Laravel 11.x
- **Admin Panel**: FilamentPHP v4.x
- **Frontend**: Tailwind CSS, Alpine.js
- **Database**: MySQL 5.7+ 
- **Cache**: Redis (optional)
- **Queue**: Redis, Database

## Architecture Overview

```
larpress/
├── app/              # Application code
├── bootstrap/        # Framework bootstrap
├── config/           # Configuration files
├── database/         # Migrations & seeders
├── modules/          # Custom modules
├── public/           # Public assets
├── resources/        # Views, CSS, JS
├── routes/           # Route definitions
├── storage/          # File storage
├── tests/            # Test files
└── themes/           # Theme files
```

## Core Modules

larpress comes with essential modules built-in:

### Content Module
- Pages and posts management
- Categories and tags
- Media library
- HTML blocks
- Menu builder
- Slider manager

### User Module
- User management
- Roles and permissions
- Login activity tracking
- API token management
- IP restrictions

### Communication Module
- Contact forms
- Email templates
- SMS templates
- Notification center
- Announcements

### System Module
- Settings management
- Backup system
- Cache management
- Activity logs
- Version control

## What Makes larpress Different?

### 1. True Modularity
Unlike traditional CMSs, larpress modules are self-contained Laravel packages that can be installed, removed, and shared independently.

### 2. FilamentPHP Integration
Built on FilamentPHP v4.x, you get a modern, reactive admin panel without writing boilerplate code.

### 3. Developer Experience
Clean Laravel code, comprehensive documentation, and extensive customization options make development a pleasure.

### 4. Production Ready
Security features, performance optimization, and deployment guides ensure your app is production-ready.

### 5. Open Source
MIT licensed, actively maintained, and community-driven.

## System Requirements

Before installing larpress, ensure your server meets these requirements:

- PHP 8.1 or higher
- MySQL 5.7+ or PostgreSQL 10+
- Composer 2.x
- Node.js 16+ and NPM
- Web server (Apache/Nginx)

### PHP Extensions
- BCMath
- Ctype
- cURL
- DOM
- Fileinfo
- JSON
- Mbstring
- OpenSSL
- PDO
- Tokenizer
- XML

## Next Steps

Ready to get started? Continue to the [Installation Guide](/getting-started/installation) to set up larpress.

## Getting Help

If you need assistance:

- 📚 Check the [documentation](/getting-started/introduction)
- 💬 Join our [Discord community](https://discord.gg/larpress)
- 🐛 Report bugs on [GitHub](https://github.com/yourusername/larpress/issues)
- 📧 Email support at support@larpress.digital
