# Installation

This guide will walk you through installing LarPress on your server.

## Installation Methods

LarPress offers two installation methods:

1. **Web Installer** (Recommended) - User-friendly GUI installer
2. **Manual Installation** - For advanced users and custom setups

## Method 1: Web Installer (Recommended)

### Step 1: Download LarPress

```bash
# Clone from GitHub
git clone https://github.com/yourusername/larpress.git
cd larpress

# Or download ZIP
wget https://github.com/yourusername/larpress/archive/main.zip
unzip main.zip
cd larpress-main
```

### Step 2: Install Dependencies

```bash
# Install PHP dependencies
composer install --no-dev

# Install Node dependencies
npm install
npm run build
```

### Step 3: Set Permissions

```bash
# Set proper permissions
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Step 4: Run Web Installer

```bash
# Start development server
php artisan serve

# Or configure your web server to point to /public
```

Visit `http://your-domain.com/install` in your browser.

### Step 5: Follow Installation Wizard

The web installer will guide you through:

1. **System Check** - Verifies server requirements
2. **Database Setup** - Configure database connection
3. **Admin Account** - Create first admin user
4. **Site Settings** - Set site name, URL, email
5. **Finalize** - Complete installation

::: tip
Keep your database credentials handy. You'll need:
- Database host
- Database name
- Database username
- Database password
:::

## Method 2: Manual Installation

### Step 1: Prepare Environment

```bash
# Clone repository
git clone https://github.com/yourusername/larpress.git
cd larpress

# Copy environment file
cp .env.example .env
```

### Step 2: Configure Environment

Edit `.env` file with your settings:

```env
APP_NAME=LarPress
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=larpress
DB_USERNAME=root
DB_PASSWORD=your_password

CACHE_DRIVER=file
QUEUE_CONNECTION=database
SESSION_DRIVER=database
```

### Step 3: Install Dependencies

```bash
# Install Composer dependencies
composer install --optimize-autoloader --no-dev

# Install NPM dependencies
npm install
npm run build
```

### Step 4: Generate Application Key

```bash
php artisan key:generate
```

### Step 5: Run Migrations

```bash
php artisan migrate --seed
```

### Step 6: Create Storage Link

```bash
php artisan storage:link
```

### Step 7: Set Permissions

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Step 8: Create Admin User

```bash
php artisan larpress:create-admin
```

Follow the prompts to create your admin account.

## Web Server Configuration

### Apache

Create `.htaccess` in `/public`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

Virtual host configuration:

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/larpress/public

    <Directory /path/to/larpress/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/larpress-error.log
    CustomLog ${APACHE_LOG_DIR}/larpress-access.log combined
</VirtualHost>
```

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/larpress/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Post-Installation

### 1. Optimize Application

```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer dump-autoload --optimize
```

### 2. Set Up Queue Worker

For production, set up a queue worker:

```bash
# Using Supervisor
sudo nano /etc/supervisor/conf.d/larpress-worker.conf
```

```ini
[program:larpress-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/larpress/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/larpress/storage/logs/worker.log
stopwaitsecs=3600
```

### 3. Set Up Scheduler

Add to crontab:

```bash
crontab -e
```

```cron
* * * * * cd /path/to/larpress && php artisan schedule:run >> /dev/null 2>&1
```

### 4. Configure SSL (Production)

```bash
# Using Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

### Permission Issues

```bash
# Fix storage permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Database Connection Failed

Check your `.env` database credentials and ensure:
- Database exists
- User has proper permissions
- Host is correct (try `127.0.0.1` instead of `localhost`)

### 500 Internal Server Error

```bash
# Enable debug mode temporarily
APP_DEBUG=true

# Check Laravel logs
tail -f storage/logs/laravel.log

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Composer Memory Issues

```bash
# Increase memory limit
php -d memory_limit=-1 /usr/local/bin/composer install
```

## Updating LarPress

```bash
# Pull latest changes
git pull origin main

# Update dependencies
composer update
npm update && npm run build

# Run migrations
php artisan migrate

# Clear and rebuild cache
php artisan cache:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Next Steps

After installation:

1. [Configure your application](/getting-started/configuration)
2. [Explore the admin panel](/admin-panel/overview)
3. [Create your first module](/modules/creating)
4. [Install a theme](/themes/introduction)

## Getting Help

If you encounter issues:

- Check [Common Issues](/troubleshooting)
- Join [Discord Community](https://discord.gg/larpress)
- Create [GitHub Issue](https://github.com/yourusername/larpress/issues)

