# Production Deployment Checklist

Complete checklist for deploying LarPress to production.

## Pre-Deployment

### Environment Configuration

- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Generate new `APP_KEY`
- [ ] Set correct `APP_URL`
- [ ] Configure production database
- [ ] Set up mail server
- [ ] Configure cache (Redis recommended)
- [ ] Set up queue connection

### Security

- [ ] Change default admin URL
- [ ] Enable HTTPS/SSL
- [ ] Set strong database password
- [ ] Configure firewall rules
- [ ] Enable IP restrictions (if needed)
- [ ] Set up fail2ban
- [ ] Review file permissions
- [ ] Disable directory listing

### Performance

- [ ] Enable OPcache
- [ ] Configure Redis
- [ ] Set up CDN for assets
- [ ] Optimize images
- [ ] Enable Gzip compression
- [ ] Configure browser caching

## Deployment Steps

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y php8.2 php8.2-fpm php8.2-mysql \
  php8.2-mbstring php8.2-xml php8.2-curl \
  nginx mysql-server redis-server composer

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Upload Files

```bash
# Clone repository
git clone https://github.com/yourusername/larpress.git
cd larpress

# Or upload via FTP/SFTP
```

### 3. Install Dependencies

```bash
# Composer
composer install --no-dev --optimize-autoloader

# NPM
npm install
npm run build
```

### 4. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Edit configuration
nano .env

# Generate key
php artisan key:generate
```

### 5. Database Setup

```bash
# Run migrations
php artisan migrate --force

# Seed data (if needed)
php artisan db:seed
```

### 6. Set Permissions

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 7. Optimize Application

```bash
# Cache everything
php artisan optimize

# Individual caches
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Storage link
php artisan storage:link
```

### 8. Configure Web Server

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/larpress/public;

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

### 9. SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 10. Queue Worker

Create supervisor config:

```bash
sudo nano /etc/supervisor/conf.d/larpress-worker.conf
```

```ini
[program:larpress-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/larpress/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/larpress/storage/logs/worker.log
```

```bash
# Start supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start larpress-worker:*
```

### 11. Scheduler

```bash
# Edit crontab
sudo crontab -e -u www-data

# Add scheduler
* * * * * cd /var/www/larpress && php artisan schedule:run >> /dev/null 2>&1
```

### 12. Monitoring

- [ ] Set up uptime monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Enable application monitoring
- [ ] Set up backup monitoring
- [ ] Configure log rotation

## Post-Deployment

### Testing

```bash
# Run tests
php artisan test

# Check routes
php artisan route:list

# Verify queue
php artisan queue:work --once

# Check scheduler
php artisan schedule:test
```

### Verification Checklist

- [ ] Homepage loads correctly
- [ ] Admin panel accessible
- [ ] Can login successfully
- [ ] Content displays properly
- [ ] Forms submit correctly
- [ ] Emails sending
- [ ] Media uploads working
- [ ] API endpoints working
- [ ] SSL certificate valid
- [ ] Backups running

### Performance Testing

```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com

# Load testing (optional)
ab -n 1000 -c 10 https://your-domain.com/
```

## Ongoing Maintenance

### Daily

- [ ] Check error logs
- [ ] Monitor uptime
- [ ] Review failed jobs

### Weekly

- [ ] Check disk space
- [ ] Review activity logs
- [ ] Test backups
- [ ] Update content

### Monthly

- [ ] Update dependencies
- [ ] Review security
- [ ] Performance audit
- [ ] User feedback review

## Rollback Plan

If deployment fails:

```bash
# Revert to previous version
git reset --hard HEAD~1

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Restart services
sudo supervisorctl restart larpress-worker:*
sudo systemctl restart nginx
```

## Environment-Specific Settings

### Staging

```env
APP_ENV=staging
APP_DEBUG=true
APP_URL=https://staging.your-domain.com
```

### Production

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

## Security Hardening

### PHP Configuration

```ini
; php.ini
expose_php = Off
display_errors = Off
log_errors = On
error_log = /var/log/php_errors.log
```

### Nginx Security Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "no-referrer-when-downgrade";
```

### File Permissions

```bash
# Directories: 755
find /var/www/larpress -type d -exec chmod 755 {} \;

# Files: 644
find /var/www/larpress -type f -exec chmod 644 {} \;

# Exceptions
chmod -R 775 storage bootstrap/cache
```

## Backup Strategy

```bash
# Automated daily backups
php artisan backup:run

# Manual backup
php artisan backup:run --only-db
php artisan backup:run --only-files
```

Store backups:
- Local server (short-term)
- Cloud storage (long-term)
- Off-site location

## Monitoring Tools

### Recommended Services

- **Uptime**: Pingdom, UptimeRobot
- **Errors**: Sentry, Bugsnag
- **Performance**: New Relic, Blackfire
- **Logs**: Papertrail, Loggly

## Deployment Scripts

### Auto-Deploy Script

`deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader
npm install && npm run build

# Run migrations
php artisan migrate --force

# Clear and cache
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart queue
php artisan queue:restart

echo "✅ Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
```

## Troubleshooting

### 500 Error

```bash
# Check logs
tail -f storage/logs/laravel.log

# Check permissions
ls -la storage bootstrap/cache

# Clear caches
php artisan optimize:clear
```

### Database Connection Error

```bash
# Test connection
php artisan tinker
>>> DB::connection()->getPdo();

# Check credentials in .env
```

### Queue Not Processing

```bash
# Check queue worker
sudo supervisorctl status

# Restart worker
sudo supervisorctl restart larpress-worker:*
```

## Next Steps

- [Server Requirements](/deployment/requirements)
- [VPS Setup Guide](/deployment/vps-setup)
- [Performance Optimization](/deployment/performance)
- [Security Best Practices](/deployment/security)

