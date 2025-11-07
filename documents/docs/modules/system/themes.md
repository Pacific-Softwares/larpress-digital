# Themes Introduction

Themes control the visual appearance and layout of your LarPress frontend.

#Quick Start - <a href="#quickStart"> Create a Theme from the Sample (recommended)</a>

## What are Themes?

Themes in LarPress are:

- **Blade-Based** - Use Laravel Blade templates
- **Modular** - Self-contained with assets
- **Switchable** - Change themes without code changes
- **Customizable** - Override any view or asset
- **Shareable** - Distribute to others

## Theme Structure

```

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
├── public/
│   ├──  settings/
│   ├──  sliders/
│   ├──  pages/
│   ├──  */
├── assets/
│   ├── js/
│   ├── css/
│   ├── fonts/
│   └── webfonts/
├── demo/
│   └── demo.json
├── helper/
│   └── {theme_slug}_helper.php
└── theme.json

```

## Theme Structure Explained

### 📁 `views/` Directory

This is where all your Blade templates live. **All view files are required to be in this directory.**

#### `views/layouts/` - Required Base Layouts

**⚠️ Required Files (Missing these will cause errors):**

- **`app.blade.php`** - Main layout for authenticated/logged-in pages

- **`guest.blade.php`** - Layout for guest/public pages (login, register, etc.)

These base layouts can include partials (header, footer, scripts) or use your own structure. Example:

```blade

<!-- views/layouts/app.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    @include('layouts.partials.head')
</head>
<body>
    @include('layouts.partials.header')
    <main>@yield('content')</main>
    @include('layouts.partials.footer')
</body>
</html>

```

**`layouts/partials/`** - Reusable components like headers, footers, navigation, scripts. Organize as needed.

#### `views/pages/` - Page Templates

**Required files (can be modified):**

- **`home.blade.php`** - Homepage template

  - Typically includes: `@includeIf('pages.landing.index')`

  

- **`contact_us.blade.php`** - Contact page template (required but customizable)

**Recommended pattern (you can customize):**

- `pages/landing/index.blade.php` - Main landing/homepage content

  - Extends `layouts.app`

  - Includes sections from partials:

    ```blade

    @extends('layouts.app')
    @section('content')
        @includeIf('pages.landing.partials.slider')
        @includeIf('pages.landing.partials.about_us')
        @includeIf('pages.landing.partials.services')
    @endsection

    ```

- `pages/landing/partials/` - Homepage sections (slider, about, services, CTA, etc.)

  - Create partials as needed: `slider.blade.php`, `about_us.blade.php`, `services.blade.php`, etc.

**Note:** You can follow this structure or create your own. The system will use whatever views you provide.

#### Other View Directories

- **`views/auth/`** - Authentication pages (login, register, password reset) - Optional, uses defaults if not provided

- **`views/profile/`** - User profile pages - Optional, customize as needed

- **`views/dynamic_content_layout/`** - Templates for dynamic content types

  - `index.blade.php` - Listing page
  - `show.blade.php` - Detail/single page

- **`views/errors/`** - Custom error pages (404, 500, etc.) - Optional

### 📁 `public/` Directory

Contains **storage media files** that will be automatically copied to `storage/app/public/` during theme installation.

**Purpose:**

- Place images, documents, or any media files your theme needs

- Structure can match your views: `settings/`, `sliders/`, `pages/`, etc.

- Files are copied to storage during install, so you can reference them in Blade views

**Example usage in Blade:**

```blade

<img src="{{ Storage::url('sliders/hero-image.jpg') }}" alt="Hero">

<!-- or using asset() helper -->

<img src="{{ asset('storage/sliders/hero-image.jpg') }}" alt="Hero">

```

### 📁 `assets/` Directory

Contains all static assets for your theme. Automatically published to `public/themes/{slug}/assets/` on install.

**Structure:**

- **`css/`** - Stylesheets (e.g., `theme.css`, `style.css`)

- **`js/`** - JavaScript files (e.g., `theme.js`, `app.js`)

- **`fonts/`** - Font files (TTF, OTF, WOFF)

- **`webfonts/`** - Web font files (WOFF2, WOFF, EOT)

**Access in Blade using `theme_asset()` helper:**

```blade

<link rel="stylesheet" href="{{ theme_asset('css/theme.css') }}">

<script src="{{ theme_asset('js/theme.js') }}"></script>

<img src="{{ theme_asset('images/logo.png') }}">

```

### 📁 `helper/` Directory

Contains your theme's custom helper functions file.

**File naming:** `{theme_slug}_helper.php` (e.g., `echo_helper.php` for theme slug "echo")

**Purpose:**

- Define custom PHP functions for your theme

- Interact with database

- Create reusable logic for Blade views

- Automatically moved to `app/Helpers/{slug}_helper.php` during installation

- Auto-loaded so functions are available in all Blade views

**Example helper file:**

```php

<?php

// helper/echo_helper.php

if (!function_exists('get_featured_posts')) {
    function get_featured_posts($limit = 5) {
        return \App\Models\Content::where('is_featured', true)
            ->limit($limit)
            ->get();
    }
}

if (!function_exists('theme_setting')) {
    function theme_setting($key, $default = null) {
        return setting('theme_echo_' . $key, $default);
    }
}

```

**Usage in Blade:**

```blade

@foreach(get_featured_posts(3) as $post)
    <article>{{ $post->title }}</article>
@endforeach
<div>{{ theme_setting('primary_color', '#667eea') }}</div>

```

**Using existing helpers:**

- All helpers in `app/Helpers/` are available

- Check existing helpers for database interactions, settings, menus, etc.

- Create new helpers as needed for your theme's functionality

### 📁 `demo/` Directory

Contains demo data in JSON format for one-click theme demo import.

**File:** `demo/demo.json`

**Purpose:**

- Pre-populate site with sample content when user imports demo

- **Warning:** Importing demo data will **truncate existing data** and replace with demo content

**JSON Structure:**

```json

{
    "menus": [
        {
            "name": "Home",
            "is_base_url": true,
            "url": "\/",
            "target": "",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 1,
            "is_active": true,
            "menu_location": "primary",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "name": "Mission",
            "is_base_url": true,
            "url": "#mission",
            "target": "",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 2,
            "is_active": true,
            "menu_location": "primary",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "name": "Events",
            "is_base_url": true,
            "url": "#events",
            "target": "",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 3,
            "is_active": true,
            "menu_location": "primary",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        }
    ],
    "content_type_categories": [
        {
            "content_type_id": null,
            "name": "EDUCATION",
            "slug": "education",
            "status": "active",
            "description": "EDUCATION",
            "created_at": "2025-11-01T07:57:43.000000Z",
            "updated_at": "2025-11-01T07:57:43.000000Z"
        },
        {
            "content_type_id": null,
            "name": "HEALTHCARE",
            "slug": "health-care",
            "status": "active",
            "description": "HEALTHCARE",
            "created_at": "2025-11-01T07:58:04.000000Z",
            "updated_at": "2025-11-01T07:58:04.000000Z"
        }
    ],
    "content_type": [
        {
            "name": "Page",
            "slug": "page",
            "description": "Page content type",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "name": "Blog",
            "slug": "blog",
            "description": "Blogs",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        }
    ],
    "contents": [
        {
            "title": "Terms and Conditions",
            "slug": "terms-and-conditions",
            "type": {
                "name": "Page",
                "slug": "page"
            },
            "category_id": null,
            "layout": "default",
            "short_description": "Terms and conditions for site usage",
            "description": "Terms and Conditions for Company Name\nIntroduction\nThese Website Standard Terms and Conditions written on this webpage shall manage your use of our website.",
            "html_section": null,
            "thumbnail": null,
            "banner_image": null,
            "status": "published",
            "order": 1,
            "external_url": null,
            "additional_data": null,
            "meta_title": null,
            "meta_description": null,
            "meta_keywords": null
        }
    ],
    "sliders": [
        {
=            "heading": "The Future of Digital Publishing",
            "subheading": "Exploring how content creation and distribution are evolving in the modern era.",
            "order": 1,
            "button_first_name": "Read More",
            "button_first_link": "#",
            "button_second_name": null,
            "button_second_link": null,
            "opposite_percentage": 50,
            "media_path": "sliders\/01K8J8MJC5N42W68HZZB2T68G8.jpeg",
            "is_active": 1,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "background_color": "#000000"
        }
    ]
}

```

**Notes:**

- Follow the exact JSON structure for each data type

- Use relative paths for media files (will be resolved during import)

- Test demo import thoroughly before distributing theme

### 📄 `theme.json` - Theme Configuration

**Required configuration file** that defines your theme's metadata.

**Required fields:**

- `name` - Display name
- `slug` - Unique identifier (lowercase, letters/numbers/hyphens/underscores only)
- `version` - Version number (e.g., "1.0.0")
**Optional fields:**
- `description` - Theme description
- `author` - Author name
- `protected` - Set to `true` to prevent overwriting via upload
- `features` - Object with feature flags
- `screenshot` - Path to screenshot image
**Example:**

```json

{

  "name": "My Custom Theme",
  "slug": "my_custom_theme",
  "version": "1.0.0",
  "description": "A beautiful theme with full customization",
  "author": "Your Name",
  "protected": false,
  "features": {
    "settings_integration": true,
    "responsive": true,
    "seo_optimized": true
  }
}

```

**⚠️ Important:** If a theme with the same `slug` already exists, uploading a new version will **replace** the existing theme (unless marked as `protected`). The system automatically backs up and replaces files, republishes assets, and clears caches.

## Quick Reference: What's Required vs Optional

<table>
  <thead>
    <tr>
      <th>File/Directory</th>
      <th>Required</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>theme.json</code></td>
      <td>✅ Yes</td>
      <td>Must have name, slug, version</td>
    </tr>
    <tr>
      <td><code>views/layouts/app.blade.php</code></td>
      <td>✅ Yes</td>
      <td>Missing causes errors</td>
    </tr>
    <tr>
      <td><code>views/layouts/guest.blade.php</code></td>
      <td>✅ Yes</td>
      <td>Missing causes errors</td>
    </tr>
    <tr>
      <td><code>views/pages/home.blade.php</code></td>
      <td>✅ Yes</td>
      <td>Required but customizable</td>
    </tr>
    <tr>
      <td><code>views/pages/contact_us.blade.php</code></td>
      <td>✅ Yes</td>
      <td>Required but customizable</td>
    </tr>
    <tr>
      <td><code>assets/</code> directory</td>
      <td>⚠️ Recommended</td>
      <td>CSS/JS for styling</td>
    </tr>
    <tr>
      <td><code>helper/</code> directory</td>
      <td>⚪ Optional</td>
      <td>Custom helper functions</td>
    </tr>
    <tr>
      <td><code>public/</code> directory</td>
      <td>⚪ Optional</td>
      <td>Storage media files</td>
    </tr>
    <tr>
      <td><code>demo/</code> directory</td>
      <td>⚪ Optional</td>
      <td>Demo data JSON</td>
    </tr>
    <tr>
      <td>Other view files</td>
      <td>⚪ Optional</td>
      <td>Customize as needed</td>
    </tr>
  </tbody>
</table>

## <div id="quickStart"> Creating a Theme</div>

### Use the Starter (Recommended)

1. Download the Sample Theme from Admin → System → Themes.

2. On that page click Download Sample Theme. A ZIP file will be downloaded.

3. Extract the ZIP locally.

4. Rename the folder to your theme slug (lowercase, letters/numbers/hyphens/underscores).

5. Update the theme.json file at the root of the extracted folder with your new theme name, slug and other configuration values.

  - Make sure slug follows the pattern /^[a-z0-9\-_]+$/ (lowercase letters, numbers, hyphens or underscores only).

6. Update: helper(s), CSS, JS, and Blade views to match your new UI.


7. Once you update the files re-compress (zip) the entire theme folder.

8. Upload the ZIP back from the same Admin → System → Themes page (use Upload Theme).

9. After the upload completes, your new theme will appear in the list — click Activate to set it as the active theme.

10. That’s it! The installer will automatically move all views, helpers, storage files, and assets for you.


### Theme Configuration (theme.json)

Sample minimal config:

```json

{

  "name": "Demo Theme",
  "slug": "demo_theme",
  "version": "1.0.0",
  "description": "Demo Theme is dynamic theme with full settings integration",
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



## Notes on iterative development and testing

- Every time you make changes locally, create a ZIP of the theme folder and upload it again to update the theme in the portal. If the uploaded theme slug matches an existing theme, LarPress will replace it (unless it’s protected).

- For fast testing during development you may edit files directly in the project themes/{slug} directory. Example flow:

  1. Suppose you uploaded a theme with slug demo.

  2. You will find view files at /themes/demo/views/* in your project. Make changes there to test immediately.

  3. When you want to publish those same changes as an uploadable ZIP, copy the modified files back into the original folder you use to create ZIPs, re-zip, and re-upload.

**Important:** Your theme views live under /themes/{theme_slug}/views/* — not under resources/views.


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
