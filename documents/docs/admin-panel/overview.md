# Admin Panel Overview

The LarPress admin panel is built with FilamentPHP v4.x, providing a modern, reactive interface for managing your application.

## Access the Admin Panel

Default URL: `https://your-domain.com/admin`

::: tip Custom Admin URL
You can change the admin URL in `config/larpress.php`:
```php
'admin' => [
    'path' => 'my-custom-admin',
],
```
:::

## Dashboard

The dashboard provides an at-a-glance view of your site:

- **Quick Stats** - Users, content, traffic
- **Recent Activity** - Latest actions and changes
- **Analytics** - Visitor stats and trends
- **Quick Actions** - Common tasks
- **System Status** - Health checks

## Main Sections

### 🏠 Dashboard
Overview, analytics, and quick stats

### 👥 Access Control
- **Users** - Manage user accounts
- **Roles & Permissions** - Define access levels
- **Login Activity** - Track user sessions
- **API Tokens** - Manage API access
- **IP Restrictions** - Whitelist/blacklist IPs

### 📰 Content
- **Pages & Posts** - Create and manage content
- **Content Types** - Custom post types
- **Categories** - Organize content
- **HTML Blocks** - Reusable content blocks
- **Menus** - Navigation management
- **Sliders** - Image carousels
- **Media Library** - File management

### 💬 Communication
- **Contact Messages** - View form submissions
- **Email Layouts** - Design email templates
- **Email Templates** - Pre-built emails
- **SMS Templates** - Text message templates
- **Notifications** - System notifications
- **Announcements** - Site-wide messages

### ⚙️ System
- **Modules** - Install and manage modules
- **Themes** - Manage site themes
- **Languages** - Multi-language support
- **Settings** - System configuration
- **Backups** - Automated backups
- **Cache & Maintenance** - Performance tools
- **Activity Logs** - Audit trail
- **Version Management** - Update control

## Interface Features

### Global Search

Press `Cmd/Ctrl + K` to open global search:
- Search across all resources
- Quick navigation
- Keyboard shortcuts

### Notifications

Bell icon in header:
- System notifications
- User mentions
- Activity alerts
- Update notifications

### User Menu

Click your avatar:
- Profile settings
- Account security
- Preferences
- Logout

### Dark Mode

Toggle between light and dark themes for comfortable viewing.

## Navigation

### Sidebar

- Collapsible navigation
- Grouped menu items
- Quick access icons
- Search filter

### Breadcrumbs

Shows current location and allows quick navigation up the hierarchy.

### Tabs

Many pages use tabs for related functionality:
- Edit mode vs Preview
- Settings sections
- Related resources

## Common Actions

### Creating Resources

Most resources have a "Create" button in the top-right:

1. Click **Create [Resource]**
2. Fill in required fields
3. **Save** or **Save & Continue**

### Editing Resources

1. Click on resource in list
2. Make changes
3. **Save** to update

### Bulk Actions

Select multiple items:
- Delete selected
- Change status
- Bulk edit
- Export data

### Filtering & Sorting

Most lists support:
- Column sorting
- Search
- Status filters
- Date range filters
- Custom filters

## Widgets

Customize your dashboard with widgets:

- **Stats** - Key metrics
- **Charts** - Visual data
- **Recent Items** - Latest content
- **Quick Links** - Shortcuts
- **Notifications** - Alerts

Configure in **Settings** → **Dashboard**.

## FilamentPHP Features

### Form Builder

Rich form components:
- Text inputs
- Rich text editor
- Date pickers
- File uploads
- Repeaters
- Relationship selects

### Table Builder

Powerful data tables:
- Sortable columns
- Searchable
- Filterable
- Bulk actions
- Export

### Notifications

Toast notifications for feedback:
- Success messages
- Error alerts
- Info messages
- Warning notifications

### Actions

Quick actions on resources:
- Edit
- Delete
- Clone
- Export
- Custom actions

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Global search |
| `Cmd/Ctrl + S` | Save form |
| `Esc` | Close modal |
| `?` | Show shortcuts |

## Mobile Access

The admin panel is fully responsive:
- Touch-friendly interface
- Mobile navigation
- Optimized layouts
- Quick actions

## Security Features

### Session Management

- Automatic timeout
- Multi-device login
- Force logout option
- Session history

### Activity Logging

All actions are logged:
- User actions
- System changes
- Login attempts
- API requests

### Two-Factor Authentication

Enable in **Profile** → **Security**:
- TOTP authenticator
- Backup codes
- Recovery options

## Customization

### Admin Logo

**Settings** → **General** → **Admin Branding**:
- Upload custom logo
- Set brand colors
- Custom favicon

### User Preferences

**Profile** → **Preferences**:
- Language
- Timezone
- Date format
- Items per page

## Next Steps

Explore specific admin sections:

- [Users & Access Control](/admin-panel/users)
- [Content Management](/admin-panel/content)
- [System Settings](/admin-panel/settings)
- [Modules Management](/admin-panel/modules)

