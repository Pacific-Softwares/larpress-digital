# Settings

Configure global application settings grouped into themed tabs.

## Tabs & sections
- **General**: Site name, tagline, descriptions, logos, footer text, author info
- **Contact**: Email, phone, address, and country picker
- **Social Media**: Handles for Facebook, X, Instagram, LinkedIn, YouTube, GitHub
- **SEO**: Analytics IDs, default robots meta
- **System**: Maintenance mode toggle/message, registration and verification settings, default role, timezone, date/time formats
- **Email**: Mail driver with conditional SMTP fields plus test email action
- **Storage**: Driver selection with conditional S3 credentials
- **API**: Rate limit requests per minute

## Behavior
- Saves all values to the settings store and flushes cache on save
- Updates runtime config for mail/app/storage after applying changes
- Maintenance mode state is cached so the site reflects the latest toggle
- “Send Test Email” uses the signed-in admin’s address and surfaces success/failure notifications
