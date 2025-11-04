# Themes Introduction

Themes control the visual appearance and layout of your LarPress frontend.

## What are Themes?

Themes in LarPress are:

- **Blade-Based** - Use Laravel Blade templates
- **Modular** - Self-contained with assets
- **Switchable** - Change themes without code changes
- **Customizable** - Override any view or asset
- **Shareable** - Distribute to others

## Theme Structure

```
themes/MyTheme/
├── views/
│   ├── layouts/
│   │   ├── app.blade.php
│   │   ├── guest.blade.php
│   │   └── partials/
│   ├── pages/
│   │   ├── landing/
│   ├───│   ├── partials/
│   │   │   ├── index.blade.php
│   │   ├── home.blade.php
│   │   └── contact_us.blade.php
│   ├── auth/
│   ├── profile/
│   ├── dynamic_content_layout/
│   │   ├── index.blade.php
│   │   └── show.blade.php
│   └── errors/
└── theme.json

public/themes/MyTheme/
├── assets/
│   ├── css/
│   └── js/
└── demo/demo.json

storage/storage/app/public/
├──  settings/
├──  sliders/
├──  pages/
└── */

```

## Creating a Theme

### Use the Starter (Recommended)

1. Download the Sample Theme from Admin → System → Themes.
2. Rename the folder to your theme slug (lowercase, letters/numbers/hyphens/underscores).
3. Update: `theme.json`, helper(s), CSS, JS, and Blade views to match your new UI.
4. Zip the theme folder and upload in Admin → System → Themes → Upload.

That’s it. The installer handles registration, and assets automatically.

### Theme Configuration (theme.json)

Sample minimal config:

```json
{
  "name": "Sample Theme",
  "slug": "sample_theme",
  "version": "1.0.0",
  "description": "Sample Theme is dynamic theme with full settings integration",
  "author": "System",
  "protected": true,
  "features": {
    "settings_integration": true,
    "responsive": true,
    "seo_optimized": true
  }
}
```

Required fields: `name`, `slug`, `version`. The `slug` must match `/^[a-z0-9\-_]+$/`.

Optional fields commonly used: `description`, `author`, `screenshot`, `features` or `settings` for feature flags and defaults.

## Installing Themes

### Via Admin Panel

1. **System** → **Themes**
2. **Upload Theme** (ZIP file)
3. **Activate** theme

Notes:
- Protected system themes cannot be replaced via upload.
- Re‑uploading a theme with the same `slug` updates it safely (with backup and cache clear).

## Theme Development

## How Upload & Install Work (Under the Hood)

When you upload a theme ZIP, LarPress performs these steps automatically:

1. Validate the file and extract it to a temporary folder.
2. Locate and parse `theme.json` (supports a root file or a nested folder).
3. Validate required fields (`name`, `slug`, `version`) and the `slug` format.
4. If a theme with the same `slug` exists:
   - If it’s marked `protected`, the upload is rejected.
   - Otherwise, the existing theme is safely backed up, replaced, updated, assets republished, and caches cleared.
5. If it’s a new theme, it’s created in `themes/{slug}` and installed.
6. Installation publishes assets automatically.

### What gets automated

- Asset publishing to `public/themes/{slug}/assets` (and `demo/` if present)
- Theme helper file move to `app/Helpers/{slug}_helper.php` (if present)
- Optional copy of `public/` content to storage if not already present
- Cache/config/view clearing to ensure changes are live

### Active Theme Rendering

On frontend requests, LarPress binds a custom view finder that prioritizes the active theme (`themes/{activeSlug}/views`) and falls back to the default theme. If a helper file for the active theme exists in `app/Helpers/{slug}_helper.php`, it’s auto‑loaded so your Blade views can use those helpers immediately.

### Main Layout

`views/layouts/app.blade.php`:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', config('app.name'))</title>
    
    @stack('meta')
    
    <link rel="stylesheet" href="{{ theme_asset('css/style.css') }}">
    @stack('styles')
</head>
<body>
    <div id="app" class="min-h-screen flex flex-col">
        @include('layouts.partials.header')
        <main class="flex-grow">
            @include('layouts.partials.flash_messages')
            @yield('content')
        </main>
        @include('layouts.partials.footer')
    </div>
    @include('layouts.partials.scripts')           
    @stack('scripts')
</body>
</html>
```

### Homepage Template

`views/pages/home.blade.php`:

```blade
@includeIf('pages.landing.index')

```

### Homepage Active Theme Template 

`themes/{themeSlug}/views/pages/landing/index.blade.php`:

```blade

@extends('layouts.app')
@section('content')
    <!-- Hero Section -->
   @includeIf('pages.landing.partials.slider')

    
    <!-- About Section  -->
   @includeIf('pages.landing.partials.about_us')


    <!-- Services Section -->
   @includeIf('pages.landing.partials.services')
   
   <!-- CTA Section -->
   @includeIf('pages.landing.partials.ready_to_get_started')

@endsection

```

## Theme Helpers

### Asset Helper

```blade
<!-- Link to theme asset -->
<link rel="stylesheet" href="{{ theme_asset('css/theme.css') }}">
<script src="{{ theme_asset('js/theme.js') }}"></script>
<img src="{{ theme_asset('images/logo.png') }}">
```

### Settings Helper

```blade
<!-- Get site settings -->
{{ setting('site_name') }}
{{ setting('site_description') }}
{{ setting('contact_email') }}
```

### Menu Helper

```blade
<!-- Render menu -->
{!! menu('main-menu') !!}

<!-- Custom menu rendering -->
@foreach(menu_items('main-menu') as $item)
    <a href="{{ $item->url }}">{{ $item->title }}</a>
@endforeach
```

### Custom Page Templates

```php
// Register templates
'templates' => [
    'default' => 'Default',
    'full-width' => 'Full Width',
    'landing-page' => 'Landing Page',
],
```

## Publishing Themes

### Prepare for Release

1. Test thoroughly
2. Create screenshot
3. Write documentation
4. Version properly

Creates: `MyTheme-1.0.0.zip`

## Next Steps

- [Theme Structure](/themes/structure)
- [Blade Templates](/themes/blade-templates)
- [Assets & Styling](/themes/assets-styling)
- [Publishing Themes](/themes/publishing)

