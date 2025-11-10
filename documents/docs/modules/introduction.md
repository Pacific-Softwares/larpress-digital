# Modules Introduction

Modules are self-contained Laravel packages that extend larpress functionality. They allow you to add features without modifying core code.

## What are Modules?

Modules in larpress are:

- **Self-Contained** - Everything needed in one package
- **Installable** - Easy installation via ZIP or directory
- **Reusable** - Use across multiple projects
- **Maintainable** - Separate from core code
- **Shareable** - Distribute to others

## Module Structure

A typical module structure:

```
{module-slug}/
├── Config/
│   └── config.php
├── Database/
│   ├── Migrations/
│   └── Seeders/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   └── Requests/
├── Models/
├── Providers/
│   └── BlogServiceProvider.php
├── Resources/
│   ├── views/
│   └── lang/
├── Routes/
│   ├── web.php
│   ├── api.php
│   └── admin.php
├── Assets/
│   ├── js/
│   └── css/
├── Tests/
├── composer.json
└── module.json
```

## Module Types

### 1. Feature Modules
Add new functionality:
- Blog system
- E-commerce
- Forums
- Events calendar

### 2. Integration Modules
Connect external services:
- Payment gateways
- Social media
- Analytics
- Email services

### 3. Admin Modules
Extend admin panel:
- Custom dashboards
- Reports
- Tools
- Widgets

### 4. Theme Modules
UI components and themes:
- Page builders
- Widgets
- Templates
- Components

## Installing Modules

### Via Admin Panel

1. Go to **System** → **Modules**
2. Click **Browse Modules**
3. Find desired module
4. Click **Install**
5. **Activate** the module

### Via ZIP Upload

1. Go to **System** → **Modules**
2. Click **Upload Module**
3. Select ZIP file
4. Click **Install**
5. **Activate** when ready

### Via Command Line

```bash
# Install from directory
php artisan module:install /path/to/module

# Install from GitHub
php artisan module:install vendor/module-name

# Install from ZIP
php artisan module:install module.zip
```

## Managing Modules

### Activate/Deactivate

```bash
# Activate module
php artisan module:enable Blog

# Deactivate module
php artisan module:disable Blog
```

### Update Module

```bash
# Update specific module
php artisan module:update Blog

# Update all modules
php artisan module:update-all
```

### Remove Module

```bash
# Remove module (keeps data)
php artisan module:remove Blog

# Remove with data
php artisan module:remove Blog --purge
```

## Module Configuration

Each module has a `module.json` file:

```json
{
  "name": "Blog",
  "alias": "blog",
  "description": "Full-featured blog module",
  "version": "1.0.0",
  "author": "Your Name",
  "email": "your@email.com",
  "homepage": "https://example.com",
  "keywords": ["blog", "posts", "articles"],
  "active": true,
  "order": 1,
  "providers": [
    "Modules\\Blog\\Providers\\BlogServiceProvider"
  ],
  "files": [],
  "requires": {
    "larpress": "^1.0",
    "php": "^8.1"
  },
  "autoload": {
    "psr-4": {
      "Modules\\Blog\\": ""
    }
  }
}
```

## Module Dependencies

### Specifying Dependencies

In `composer.json`:

```json
{
  "require": {
    "larpress/core": "^1.0",
    "modules/media": "^1.0",
    "guzzlehttp/guzzle": "^7.0"
  }
}
```

### Module Requirements

In `module.json`:

```json
{
  "requires": {
    "larpress": "^1.0",
    "modules": {
      "Media": "^1.0",
      "User": "^1.0"
    }
  }
}
```

## Module Hooks

Modules can hook into larpress events:

```php
// In ModuleServiceProvider
public function boot()
{
    // Register event listeners
    Event::listen('larpress.post.created', function($post) {
        // Handle post created
    });
    
    // Add admin menu items
    $this->app['larpress.admin.menu']->add([
        'label' => 'Blog',
        'route' => 'admin.blog.index',
        'icon' => 'heroicon-o-book-open',
    ]);
}
```

## Available Modules

### Official Modules

- **Blog** - Full-featured blog system
- **Forms** - Advanced form builder
- **SEO** - SEO optimization tools
- **Analytics** - Site analytics
- **Newsletter** - Email marketing

### Community Modules

Browse community modules at:
- [larpress Marketplace](https://marketplace.larpress.digital)
- [GitHub](https://github.com/topics/larpress-module)

## Creating Modules

Ready to create your own module?

→ Continue to [Creating Modules](/modules/creating)

## Module Development Resources

- [Module Structure](/modules/structure)
- [Service Providers](/modules/service-providers)
- [Routes & Controllers](/modules/routes-controllers)
- [Database & Migrations](/modules/database)
- [Publishing Modules](/modules/publishing)

## Best Practices

### 1. Follow Laravel Standards
Use Laravel conventions and best practices.

### 2. Namespace Properly
Use `Modules\YourModule\` namespace.

### 3. Document Well
Include README and inline documentation.

### 4. Test Thoroughly
Write tests for your module functionality.

### 5. Version Semantically
Follow semantic versioning (1.0.0).

### 6. Handle Dependencies
Declare all dependencies clearly.

### 7. Provide Migrations
Include database migrations with rollback.

### 8. Make it Configurable
Use config files for flexibility.

## Module Security

### Input Validation

Always validate user input:

```php
$validated = $request->validate([
    'title' => 'required|max:255',
    'content' => 'required',
]);
```

### Authorization

Check permissions:

```php
$this->authorize('create', Post::class);
```

### SQL Injection

Use Eloquent or query builder:

```php
// Good
Post::where('status', 'published')->get();

// Bad
DB::select("SELECT * FROM posts WHERE status = '$status'");
```

## Next Steps

- [Create Your First Module](/modules/creating)
- [Module Structure Deep Dive](/modules/structure)
- [Publishing to Marketplace](/modules/publishing)

