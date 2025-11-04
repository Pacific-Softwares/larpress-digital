# Dashboard

The dashboard is your command center for managing your LarPress application.

## Overview

The dashboard provides a comprehensive view of your site's health, activity, and performance.

## Widgets

### Statistics Cards

Quick overview of key metrics:

- **Total Users** - Active user count
- **Total Content** - Published pages and posts
- **Media Files** - Uploaded files count
- **Storage Used** - Disk space utilization

### Recent Activity

Shows latest actions:
- Content published
- Users registered
- Files uploaded
- Settings changed
- Login attempts

### Analytics Chart

Visual representation of:
- Daily visitors
- Page views
- Popular content
- Traffic sources
- User engagement

### Quick Actions

Common tasks at your fingertips:
- Create new post
- Add user
- Upload media
- View messages
- System settings

### System Status

Real-time health indicators:
- Database connection
- Cache status
- Queue status
- Disk space
- PHP version

## Customizing Dashboard

### Adding Widgets

Create custom widgets in your modules:

```php
use Filament\Widgets\StatsOverviewWidget;

class BlogStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Posts', Post::count())
                ->description('All blog posts')
                ->descriptionIcon('heroicon-o-document-text')
                ->color('success'),
            
            Stat::make('Published', Post::published()->count())
                ->description('Live posts')
                ->descriptionIcon('heroicon-o-eye')
                ->color('primary'),
            
            Stat::make('Drafts', Post::draft()->count())
                ->description('Unpublished posts')
                ->descriptionIcon('heroicon-o-pencil')
                ->color('warning'),
        ];
    }
}
```

### Chart Widgets

```php
use Filament\Widgets\ChartWidget;

class PostsChart extends ChartWidget
{
    protected static ?string $heading = 'Posts Per Month';

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Posts created',
                    'data' => [12, 19, 27, 35, 42, 48],
                ],
            ],
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
```

### Widget Order

Arrange widgets in `config/filament.php`:

```php
'widgets' => [
    \App\Filament\Widgets\StatsOverview::class,
    \App\Filament\Widgets\RecentActivity::class,
    \Modules\Blog\Filament\Widgets\BlogStats::class,
],
```

## Dashboard Filters

### Date Range Filter

Filter data by time period:
- Today
- Last 7 days
- Last 30 days
- Last 90 days
- Custom range

### Role-Based Views

Different dashboards for different roles:

```php
public static function canViewAny(): bool
{
    return auth()->user()->can('view_dashboard');
}
```

## Dashboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Global Search | `Cmd/Ctrl + K` |
| Create New | `Cmd/Ctrl + N` |
| Navigate Sections | `G + Section Key` |

## Performance Tips

### Cache Dashboard Data

```php
use Illuminate\Support\Facades\Cache;

protected function getStats(): array
{
    return Cache::remember('dashboard.stats', 300, function () {
        return [
            // Your stats calculation
        ];
    });
}
```

### Lazy Loading

Load widgets on demand:

```php
protected static bool $isLazy = true;
```

## Customization Examples

### Custom Color Scheme

```php
Stat::make('Revenue', '$' . number_format($revenue))
    ->description('This month')
    ->descriptionIcon('heroicon-o-currency-dollar')
    ->color('success')
    ->chart([7, 2, 10, 3, 15, 4, 17]);
```

### Custom Icons

Use any Heroicon:

```php
->descriptionIcon('heroicon-o-trending-up')
->descriptionIcon('heroicon-o-user-group')
->descriptionIcon('heroicon-o-chart-bar')
```

### Conditional Display

```php
public static function canView(): bool
{
    return auth()->user()->isAdmin();
}
```

## Mobile Dashboard

The dashboard is fully responsive:
- Touch-optimized widgets
- Collapsible sections
- Mobile navigation
- Quick stats view

## Export Data

Export dashboard data:

```php
use Filament\Tables\Actions\Action;

Action::make('export')
    ->action(fn () => $this->export())
    ->icon('heroicon-o-download');
```

## Notifications

Dashboard shows system notifications:
- Update available
- Backup completed
- Failed jobs
- Security alerts
- System errors

## Next Steps

- [User Management](/admin-panel/users)
- [Content Management](/admin-panel/content)
- [System Settings](/admin-panel/settings)

