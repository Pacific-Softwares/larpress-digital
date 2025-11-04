# Quick Start

Get up and running with LarPress in 10 minutes.

## Installation

```bash
# Clone LarPress
git clone https://github.com/yourusername/larpress.git
cd larpress

# Install dependencies
composer install
npm install && npm run build

# Run web installer
php artisan serve
```

Visit `http://localhost:8000/install`

## First Steps

### 1. Access Admin Panel

After installation, access your admin panel:

```
http://your-domain.com/admin
```

Login with credentials created during installation.

### 2. Configure Site Settings

Go to **Settings** → **General**:

- Set site name and description
- Upload logo and favicon
- Configure email settings
- Set timezone

### 3. Create Your First Page

**Content** → **Pages** → **New Page**:

```markdown
Title: Welcome to My Site
Slug: welcome
Status: Published

Content:
Welcome to my amazing website built with LarPress!
```

### 4. Create a Menu

**Content** → **Menus** → **Create Menu**:

```
Name: Main Menu
Location: Header

Items:
- Home (/)
- About (/about)
- Contact (/contact)
```

### 5. Install Your First Module

**System** → **Modules** → **Browse Modules**:

1. Find a module
2. Click "Install"
3. Activate the module
4. Configure settings

## Common Tasks

### Creating Content

#### Blog Post

```markdown
Title: My First Blog Post
Category: News
Tags: laravel, cms
Featured Image: (upload image)
Status: Published

Write your amazing content here...
```

#### HTML Block

```html
<div class="alert alert-info">
  <strong>Notice:</strong> This is a reusable HTML block!
</div>
```

Use shortcode: `[block:alert-info]`

### Managing Users

**Access Control** → **Users** → **Create User**:

```
Name: John Doe
Email: john@example.com
Role: Editor
Password: (generate secure password)
```

### Creating Roles

**Access Control** → **Roles** → **Create Role**:

```
Name: Content Manager
Permissions:
☑ View content
☑ Create content
☑ Edit content
☐ Delete content
☐ Access settings
```

### Email Templates

**Communication** → **Email Templates** → **Create Template**:

```
Name: Welcome Email
Subject: Welcome to {site_name}!
Type: User Registration

Body:
Hello {user_name},

Welcome to {site_name}! We're excited to have you.

Best regards,
The Team
```

### Setting Up Backups

**System** → **Backups** → **Configure**:

```
Frequency: Daily
Time: 2:00 AM
Keep: 7 days
Include: Database + Files
Destination: Local + S3
```

## Development Workflow

### Local Development

```bash
# Start development server
php artisan serve

# Watch assets
npm run dev

# Run queue worker
php artisan queue:work

# Tail logs
tail -f storage/logs/laravel.log
```

### Creating a Module

```bash
# Generate module structure
php artisan module:make Blog

# Edit module files
modules/Blog/
├── Http/Controllers/
├── Models/
├── Views/
├── routes/
└── module.json
```

### Creating a Theme

```bash
# Generate theme structure
php artisan theme:make MyTheme

# Edit theme files
themes/MyTheme/
├── views/
├── assets/
├── public/
└── theme.json
```

## API Usage

### Generate API Token

**Access Control** → **API Tokens** → **Create Token**:

```
Name: Mobile App
Abilities: read:content, write:content
Expires: Never
```

### Make API Request

```bash
# Get content
curl -X GET https://your-domain.com/api/content \
  -H "Authorization: Bearer your-token-here"

# Create content
curl -X POST https://your-domain.com/api/content \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API Created Post",
    "content": "Content here",
    "status": "published"
  }'
```

## Deployment

### Production Checklist

```bash
# Set environment
APP_ENV=production
APP_DEBUG=false

# Optimize application
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chmod -R 775 storage bootstrap/cache

# Set up SSL
sudo certbot --nginx -d your-domain.com

# Configure queue worker
# Set up supervisor for queue:work

# Add cron job
* * * * * cd /path && php artisan schedule:run
```

### Quick Deploy Script

```bash
#!/bin/bash
git pull origin main
composer install --no-dev --optimize-autoloader
npm install && npm run build
php artisan migrate --force
php artisan optimize
php artisan queue:restart
```

## Troubleshooting

### Clear All Caches

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
composer dump-autoload
```

### Fix Permissions

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Enable Debug Mode

```env
APP_DEBUG=true
LOG_LEVEL=debug
```

Check logs:
```bash
tail -f storage/logs/laravel.log
```

## Next Steps

Now that you're up and running:

1. [Explore Admin Panel Features](/admin-panel/overview)
2. [Learn Module Development](/modules/introduction)
3. [Customize Your Theme](/themes/introduction)
4. [Set Up API Access](/api/authentication)
5. [Deploy to Production](/deployment/checklist)

## Resources

- 📚 [Full Documentation](/getting-started/introduction)
- 💬 [Community Discord](https://discord.gg/larpress)
- 🎥 [Video Tutorials](https://youtube.com/larpress)
- 🐛 [Report Issues](https://github.com/yourusername/larpress/issues)

## Tips & Tricks

### Keyboard Shortcuts

In Admin Panel:
- `Ctrl/Cmd + S` - Save
- `Ctrl/Cmd + K` - Search
- `Esc` - Close modal

### Performance Tips

1. Enable Redis for caching
2. Use queue for emails
3. Optimize images before upload
4. Enable OPcache
5. Use CDN for assets

### Security Tips

1. Change admin URL
2. Enable 2FA
3. Use strong passwords
4. Enable IP restrictions
5. Keep LarPress updated
6. Regular backups

Happy building with LarPress! 🚀

