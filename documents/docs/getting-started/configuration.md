# Configuration

Learn how to configure larpress for your specific needs.

## Environment Configuration

larpress uses Laravel's `.env` file for environment-specific configuration.

### Essential Settings

```env
# Application
APP_NAME="larpress"
APP_ENV=production
APP_KEY=base64:generated_key_here
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=larpress
DB_USERNAME=root
DB_PASSWORD=your_secure_password

# Cache
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@your-domain.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## Database Configuration

### MySQL

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=larpress
DB_USERNAME=root
DB_PASSWORD=
```

### PostgreSQL

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=larpress
DB_USERNAME=postgres
DB_PASSWORD=
```

### SQLite (Development Only)

```env
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

## Cache Configuration

### Redis (Recommended for Production)

```bash
# Install Redis
sudo apt install redis-server

# Start Redis
sudo systemctl start redis
sudo systemctl enable redis
```

```env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### File Cache (Development)

```env
CACHE_DRIVER=file
SESSION_DRIVER=file
```

## Queue Configuration

### Redis Queue (Production)

```env
QUEUE_CONNECTION=redis
```

### Database Queue

```env
QUEUE_CONNECTION=database
```

Run queue worker:

```bash
php artisan queue:work --daemon
```

## Mail Configuration

### SMTP

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
```

### Mailgun

```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=your-domain.com
MAILGUN_SECRET=your_mailgun_secret
```

### Amazon SES

```env
MAIL_MAILER=ses
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
```

## File Storage

### Local Storage (Default)

```env
FILESYSTEM_DISK=local
```

### Amazon S3

```bash
composer require league/flysystem-aws-s3-v3
```

```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket-name
```

## Application Settings

### Admin Panel Access

Configure in `config/larpress.php`:

```php
return [
    'admin' => [
        'path' => 'admin', // Admin panel URL
        'middleware' => ['web', 'auth'],
        'guard' => 'web',
    ],
];
```

### Site Settings

Manage via Admin Panel → Settings:

- Site Name
- Site Description
- Logo & Favicon
- Contact Information
- Social Media Links
- SEO Settings
- Analytics Code

## Security Configuration

### IP Restrictions

Enable IP whitelist in Admin Panel → Access Control → IP Restrictions.

### API Rate Limiting

Configure in `config/larpress.php`:

```php
'api' => [
    'rate_limit' => 60, // requests per minute
    'throttle' => '60,1', // 60 requests per 1 minute
],
```

### Two-Factor Authentication

Enable in Admin Panel → Settings → Security:

```php
'security' => [
    '2fa_enabled' => true,
    'session_timeout' => 120, // minutes
    'password_expiry' => 90, // days
],
```

## Performance Optimization

### OPcache

Enable in `php.ini`:

```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
```

### Application Optimization

```bash
# Cache everything
php artisan optimize

# Individual caches
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Database Optimization

```bash
# Enable query caching
php artisan config:cache
```

## Debugging

### Enable Debug Mode

```env
APP_DEBUG=true
LOG_LEVEL=debug
```

### Laravel Telescope (Development)

```bash
composer require laravel/telescope --dev
php artisan telescope:install
php artisan migrate
```

Access at `/telescope`

## Maintenance Mode

```bash
# Enable maintenance mode
php artisan down --secret="secret-token"

# Access site with token
https://your-domain.com/secret-token

# Disable maintenance mode
php artisan up
```

## Localization

### Add Languages

Admin Panel → System → Languages

## Backup Configuration

Configure in `config/backup.php`:

```php
'backup' => [
    'name' => env('APP_NAME', 'larpress'),
    'source' => [
        'files' => [
            'include' => [
                base_path(),
            ],
            'exclude' => [
                base_path('vendor'),
                base_path('node_modules'),
            ],
        ],
        'databases' => ['mysql'],
    ],
    'destination' => [
        'disks' => ['local', 's3'],
    ],
],
```

## Next Steps

- [Quick Start Guide](/getting-started/quick-start)
- [Admin Panel Overview](/admin-panel/overview)
- [Module Development](/modules/introduction)

