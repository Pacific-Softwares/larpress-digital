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
            "id": 1,
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
            "id": 2,
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
            "id": 3,
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
        },
        {
            "id": 4,
            "name": "Stories",
            "is_base_url": true,
            "url": "#stories",
            "target": "",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 4,
            "is_active": true,
            "menu_location": "primary",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 5,
            "name": "Volunteer",
            "is_base_url": true,
            "url": "#volunteer",
            "target": "",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 5,
            "is_active": true,
            "menu_location": "primary",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 6,
            "name": "Contact",
            "is_base_url": true,
            "url": "\/contact-us",
            "target": "",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 6,
            "is_active": true,
            "menu_location": "primary",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 7,
            "name": "Home",
            "is_base_url": true,
            "url": "\/",
            "target": null,
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 1,
            "is_active": true,
            "menu_location": "footer",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 8,
            "name": "About Us",
            "is_base_url": true,
            "url": "\/page\/about-us",
            "target": null,
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 2,
            "is_active": true,
            "menu_location": "footer",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 9,
            "name": "Contact Us",
            "is_base_url": true,
            "url": "\/contact-us",
            "target": "_blank",
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 3,
            "is_active": true,
            "menu_location": "footer",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 10,
            "name": "Privacy Policy",
            "is_base_url": true,
            "url": "\/page\/privacy-policy",
            "target": null,
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 5,
            "is_active": true,
            "menu_location": "footer",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 11,
            "name": "Terms of Service",
            "is_base_url": true,
            "url": "\/page\/terms-and-conditions",
            "target": null,
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 6,
            "is_active": true,
            "menu_location": "footer",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        },
        {
            "id": 12,
            "name": "Our Work",
            "is_base_url": true,
            "url": "\/page\/our-work",
            "target": null,
            "icon": null,
            "icon_color": null,
            "css_classes": null,
            "parent_id": null,
            "order": 7,
            "is_active": true,
            "menu_location": "footer",
            "permissions": null,
            "meta": null,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "children": []
        }
    ],
    "content_type_categories": [
        {
            "id": 1,
            "content_type_id": null,
            "name": "EDUCATION",
            "slug": "education",
            "status": "active",
            "description": "EDUCATION",
            "created_at": "2025-11-01T07:57:43.000000Z",
            "updated_at": "2025-11-01T07:57:43.000000Z"
        },
        {
            "id": 2,
            "content_type_id": null,
            "name": "HEALTHCARE",
            "slug": "health-care",
            "status": "active",
            "description": "HEALTHCARE",
            "created_at": "2025-11-01T07:58:04.000000Z",
            "updated_at": "2025-11-01T07:58:04.000000Z"
        },
        {
            "id": 3,
            "content_type_id": null,
            "name": "ENVIRONMENT",
            "slug": "environment",
            "status": "active",
            "description": "ENVIRONMENT",
            "created_at": "2025-11-01T07:58:29.000000Z",
            "updated_at": "2025-11-01T07:58:29.000000Z"
        }
    ],
    "content_type": [
        {
            "id": 1,
            "name": "Page",
            "slug": "page",
            "description": "Page content type",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 2,
            "name": "Blog",
            "slug": "blog",
            "description": "Blogs",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 3,
            "name": "Vlog",
            "slug": "vlog",
            "description": "Vlogs",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 4,
            "name": "Services",
            "slug": "services",
            "description": "Services",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 5,
            "name": "Testimonials",
            "slug": "testimonials",
            "description": "testimonials",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 6,
            "name": "Features",
            "slug": "features",
            "description": "Features",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 7,
            "name": "News",
            "slug": "news",
            "description": "News",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 8,
            "name": "Portfolio",
            "slug": "portfolio",
            "description": "Portfolio",
            "status": "active",
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z"
        },
        {
            "id": 9,
            "name": "Events",
            "slug": "event",
            "description": "Events",
            "status": "active",
            "created_at": "2025-11-01T07:15:32.000000Z",
            "updated_at": "2025-11-01T07:15:32.000000Z"
        },
        {
            "id": 10,
            "name": "Success Stories",
            "slug": "success-stories",
            "description": "Success Stories",
            "status": "active",
            "created_at": "2025-11-01T07:56:58.000000Z",
            "updated_at": "2025-11-01T07:56:58.000000Z"
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
            "description": "Terms and Conditions for Company Name\nIntroduction\nThese Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com.\n\nThese Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.\n\nMinors or people below 18 years old are not allowed to use this Website.\n\nIntellectual Property Rights\nOther than the content you own, under these Terms, Company Name and\/or its licensors own all the intellectual property rights and materials contained in this Website.\n\nYou are granted limited license only for purposes of viewing the material contained on this Website.\n\nRestrictions\nYou are specifically restricted from all of the following:\n\npublishing any Website material in any other media;\nselling, sublicensing and\/or otherwise commercializing any Website material;\npublicly performing and\/or showing any Website material;\nusing this Website in any way that is or may be damaging to this Website;\nusing this Website in any way that impacts user access to this Website;\nusing this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;\nengaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;\nusing this Website to engage in any advertising or marketing.\nCertain areas of this Website are restricted from being access by you and Company Name may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.\n\nYour Content\nIn these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Company Name a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.\n\nYour Content must be your own and must not be invading any third-party's rights. Company Name reserves the right to remove any of Your Content from this Website at any time without notice.\n\nNo warranties\nThis Website is provided “as is,” with all faults, and Company Name express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.\n\nLimitation of liability\nIn no event shall Company Name, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Company Name, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.\n\nIndemnification\nYou hereby indemnify to the fullest extent Company Name from and against any and\/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.\n\nSeverability\nIf any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.\n\nVariation of Terms\nCompany Name is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.\n\nAssignment\nThe Company Name is allowed to assign, transfer, and subcontract its rights and\/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and\/or obligations under these Terms.\n\nEntire Agreement\nThese Terms constitute the entire agreement between Company Name and you in relation to your use of this Website, and supersede all prior agreements and understandings.\n\nGoverning Law & Jurisdiction\nThese Terms will be governed by and interpreted in accordance with the laws of the State of Country, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Country for the resolution of any disputes.",
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
        },
        {
            "title": "Privacy Policy",
            "slug": "privacy-policy",
            "type": {
                "name": "Page",
                "slug": "page"
            },
            "category_id": null,
            "layout": "default",
            "short_description": "Privacy policy of the site",
            "description": "Privacy Policies Are Required by Law\nYour website or app must comply with all data privacy laws that apply to you, and these laws almost always require you to post a privacy policy in some way.\n\nData privacy legislation exists on every continent and usually has broad legal thresholds. They might apply to your business depending on factors like:\n\nWhere your business is located\nWhere your consumers are located\nHow much data you track\nSome of the laws that dictate if and when you legally need a privacy policy page for your website or app include:\n\nGeneral Data Protection Regulation (GDPR): This law protects consumers in Europe and requires a generic privacy notice.\nCalifornia Consumer Privacy Act (CCPA): This law regulates privacy policy requirements and protects users in California.\nCalifornia Online Privacy Protection Act (CalOPPA): Adopted in 2004, CalOPPA set the standard for the presentation and wording of privacy policies.\nAll Current U.S. State-Level Privacy Laws: More than 16 states have data privacy laws in the U.S., and all require a compliant privacy policy.\nPersonal Information Protection and Electronic Documents Act (PIPEDA): A simple privacy policy can help entities meet the fair information principles PIPEDA requires.\nChildren’s Online Privacy Protection Act (COPPA): This federal U.S. law applies to any business marketing to children and requires a comprehensive privacy policy.\nGramm-Leach-Bliley Act (GLBA): The GLBA requires websites that are “significantly engaged” in financial activities to publish a clear, accurate, and conspicuous privacy policy.\nPenalties for violating these laws include significant fines, criminal penalties, and damage to brand reputation.\n\nFortunately, our legal team keeps our comprehensive privacy policy template up to date to help you meet the guidelines of new and evolving data privacy laws.\n\nPrivacy Policies Are Required by Third-Party Services\nThird-party services often require the people using their tools to also have a compliant privacy policy as part of their terms of use agreements.\n\nUsing a template can help you meet these third-party service requirements.\n\nSome examples of third-party services that require you to have a privacy policy include:\n\nAmazon\nApple\nClickBank\nGoogle (AdSense, Ad Words, Analytics, and Play Store)\nMeta\/Facebook\nYour privacy policy should clearly state what third parties can access user data and explain how and why the information is shared.",
            "html_section": null,
            "thumbnail": null,
            "banner_image": null,
            "status": "published",
            "order": 2,
            "external_url": null,
            "additional_data": null,
            "meta_title": null,
            "meta_description": null,
            "meta_keywords": null
        },
        {
            "title": "FAQ",
            "slug": "faq",
            "type": {
                "name": "Page",
                "slug": "page"
            },
            "category_id": null,
            "layout": "default",
            "short_description": "Frequently Asked Questions",
            "description": "<!-- FAQ -->\n<div class=\"max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto\">\n  <!-- Title -->\n  <div class=\"max-w-2xl mx-auto mb-10 lg:mb-14\">\n    <h2 class=\"text-2xl font-bold md:text-4xl md:leading-tight\">You might be wondering...<\/h2>\n  <\/div>\n  <!-- End Title -->\n\n  <div class=\"max-w-2xl mx-auto divide-y divide-gray-200\">\n    <div class=\"py-8 first:pt-0 last:pb-0\">\n      <div class=\"flex gap-x-5\">\n        <svg class=\"shrink-0 mt-1 size-6 text-gray-500\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"\/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"\/><path d=\"M12 17h.01\"\/><\/svg>\n\n        <div class=\"grow\">\n          <h3 class=\"md:text-lg font-semibold text-gray-800\">\n            Can I cancel at anytime?\n          <\/h3>\n          <p class=\"mt-1 text-gray-500\">\n            Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.\n          <\/p>\n        <\/div>\n      <\/div>\n    <\/div>\n\n    <div class=\"py-8 first:pt-0 last:pb-0\">\n      <div class=\"flex gap-x-5\">\n        <svg class=\"shrink-0 mt-1 size-6 text-gray-500\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"\/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"\/><path d=\"M12 17h.01\"\/><\/svg>\n\n        <div class=\"grow\">\n          <h3 class=\"md:text-lg font-semibold text-gray-800\">\n            My team has credits. How do we use them?\n          <\/h3>\n          <p class=\"mt-1 text-gray-500\">\n            Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.\n          <\/p>\n        <\/div>\n      <\/div>\n    <\/div>\n\n    <div class=\"py-8 first:pt-0 last:pb-0\">\n      <div class=\"flex gap-x-5\">\n        <svg class=\"shrink-0 mt-1 size-6 text-gray-500\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"\/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"\/><path d=\"M12 17h.01\"\/><\/svg>\n\n        <div class=\"grow\">\n          <h3 class=\"md:text-lg font-semibold text-gray-800\">\n            How does Preline's pricing work?\n          <\/h3>\n          <p class=\"mt-1 text-gray-500\">\n            Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.\n          <\/p>\n        <\/div>\n      <\/div>\n    <\/div>\n\n    <div class=\"py-8 first:pt-0 last:pb-0\">\n      <div class=\"flex gap-x-5\">\n        <svg class=\"shrink-0 mt-1 size-6 text-gray-500\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"\/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"\/><path d=\"M12 17h.01\"\/><\/svg>\n\n        <div class=\"grow\">\n          <h3 class=\"md:text-lg font-semibold text-gray-800\">\n            How secure is Preline?\n          <\/h3>\n          <p class=\"mt-1 text-gray-500\">\n            Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.\n          <\/p>\n        <\/div>\n      <\/div>\n    <\/div>\n\n    <div class=\"py-8 first:pt-0 last:pb-0\">\n      <div class=\"flex gap-x-5\">\n        <svg class=\"shrink-0 mt-1 size-6 text-gray-500\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"\/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"\/><path d=\"M12 17h.01\"\/><\/svg>\n\n        <div class=\"grow\">\n          <h3 class=\"md:text-lg font-semibold text-gray-800\">\n            How do I get access to a theme I purchased?\n          <\/h3>\n          <p class=\"mt-1 text-gray-500\">\n            If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.\n          <\/p>\n        <\/div>\n      <\/div>\n    <\/div>\n\n    <div class=\"py-8 first:pt-0 last:pb-0\">\n      <div class=\"flex gap-x-5\">\n        <svg class=\"shrink-0 mt-1 size-6 text-gray-500\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"\/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"\/><path d=\"M12 17h.01\"\/><\/svg>\n\n        <div class=\"grow\">\n          <h3 class=\"md:text-lg font-semibold text-gray-800\">\n            Upgrade License Type\n          <\/h3>\n          <p class=\"mt-1 text-gray-500\">\n            There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.\n          <\/p>\n        <\/div>\n      <\/div>\n    <\/div>\n  <\/div>\n<\/div>\n<!-- End FAQ -->",
            "html_section": null,
            "thumbnail": null,
            "banner_image": null,
            "status": "published",
            "order": 3,
            "external_url": null,
            "additional_data": null,
            "meta_title": null,
            "meta_description": null,
            "meta_keywords": null
        },
        {
            "title": "Scholarship Program Changes Lives",
            "slug": "scholarship-program-changes-lives",
            "icon": null,
            "type": {
                "name": "Success Stories",
                "slug": "success-stories"
            },
            "category": {
                "name": "EDUCATION",
                "slug": "education",
                "status": "active",
                "description": "EDUCATION"
            },
            "category_id": 1,
            "layout": "default",
            "short_description": "Over 200 students received educational support, opening doors to brighter futures and breaking cycles of poverty.",
            "description": "<p>Over 200 students received educational support, opening doors to brighter futures and breaking cycles of poverty.<\/p>",
            "html_section": null,
            "thumbnail": "pages\/thumbnails\/photo-1488521787991-ed7bbaae773c.jpeg",
            "banner_image": null,
            "status": "published",
            "order": 1,
            "external_url": null,
            "additional_data": [],
            "meta_title": null,
            "meta_description": null,
            "meta_keywords": ""
        },
        {
            "title": "Free Health Clinics Serve Thousands",
            "slug": "free-health-clinics-serve-thousands",
            "icon": null,
            "type": {
                "name": "Success Stories",
                "slug": "success-stories"
            },
            "category": {
                "name": "HEALTHCARE",
                "slug": "health-care",
                "status": "active",
                "description": "HEALTHCARE"
            },
            "category_id": 2,
            "layout": "default",
            "short_description": "Our mobile health clinics provided essential care to underserved communities, improving health outcomes.",
            "description": "<p>Our mobile health clinics provided essential care to underserved communities, improving health outcomes.<\/p>",
            "html_section": null,
            "thumbnail": "pages\/thumbnails\/photo-1593113646773-028c64a8f1b8.jpeg",
            "banner_image": null,
            "status": "published",
            "order": 2,
            "external_url": null,
            "additional_data": [],
            "meta_title": null,
            "meta_description": null,
            "meta_keywords": ""
        },
        {
            "title": "Green Initiative Plants 10,000 Trees",
            "slug": "green-initiative-plants-10000-trees",
            "icon": null,
            "type": {
                "name": "Success Stories",
                "slug": "success-stories"
            },
            "category": {
                "name": "ENVIRONMENT",
                "slug": "environment",
                "status": "active",
                "description": "ENVIRONMENT"
            },
            "category_id": 3,
            "layout": "default",
            "short_description": "Community volunteers planted trees across the city, creating greener spaces for future generations.",
            "description": "<p>Community volunteers planted trees across the city, creating greener spaces for future generations.<\/p>",
            "html_section": null,
            "thumbnail": "pages\/thumbnails\/photo-1469571486292-0ba58a3f068b.jpeg",
            "banner_image": null,
            "status": "published",
            "order": 3,
            "external_url": null,
            "additional_data": [],
            "meta_title": null,
            "meta_description": null,
            "meta_keywords": ""
        }
    ],
    "html_blocks": [
        {
            "id": 4,
            "title": "Faith Theme Slider Section",
            "slug": "faith-theme-slider-section",
            "status": "published",
            "content": "<!-- Hero Section -->\n<section id=\"home\" class=\"relative bg-gradient-to-br from-orange-50 to-green-50 py-20 md:py-32 overflow-hidden\">\n    <div class=\"absolute inset-0 opacity-10\">\n        <div class=\"absolute inset-0\" style=\"background-image: url('data:image\/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http:\/\/www.w3.org\/2000\/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23f97316\\' fill-opacity=\\'1\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'\/%3E%3C\/g%3E%3C\/g%3E%3C\/svg%3E');\"><\/div>\n    <\/div>\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10\">\n        <div class=\"grid md:grid-cols-2 gap-12 items-center\">\n            <div>\n                <h1 class=\"text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight\">\n                    Together We Can Make a <span class=\"primary-color\">Difference<\/span>\n                <\/h1>\n                <p class=\"text-xl text-gray-700 mb-8 leading-relaxed\">\n                    Join our community in creating positive change and helping those in need. Every contribution matters.\n                <\/p>\n                <div class=\"flex flex-col sm:flex-row gap-4\">\n                    <button class=\"primary-bg text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity text-lg inline-flex items-center justify-center\">\n                        <svg class=\"w-6 h-6 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\"><\/path>\n                        <\/svg>\n                        Donate Now\n                    <\/button>\n                    <button class=\"secondary-bg text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity text-lg inline-flex items-center justify-center\">\n                        <svg class=\"w-6 h-6 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z\"><\/path>\n                        <\/svg>\n                        Join Us\n                    <\/button>\n                <\/div>\n                \n                <!-- Impact Stats -->\n                <div class=\"grid grid-cols-3 gap-6 mt-12\">\n                    <div class=\"text-center\">\n                        <div class=\"text-4xl font-bold primary-color impact-counter\">5,000+<\/div>\n                        <div class=\"text-sm text-gray-600 mt-1\">Lives Impacted<\/div>\n                    <\/div>\n                    <div class=\"text-center\">\n                        <div class=\"text-4xl font-bold secondary-color impact-counter\">120+<\/div>\n                        <div class=\"text-sm text-gray-600 mt-1\">Active Projects<\/div>\n                    <\/div>\n                    <div class=\"text-center\">\n                        <div class=\"text-4xl font-bold primary-color impact-counter\">2,500+<\/div>\n                        <div class=\"text-sm text-gray-600 mt-1\">Volunteers<\/div>\n                    <\/div>\n                <\/div>\n            <\/div>\n            <div class=\"relative\">\n                <img src=\"https:\/\/images.unsplash.com\/photo-1559027615-cd4628902d4a?w=800\" alt=\"Community\" class=\"rounded-3xl shadow-2xl\">\n                <div class=\"absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl\">\n                    <div class=\"flex items-center gap-3\">\n                        <div class=\"w-12 h-12 secondary-bg rounded-full flex items-center justify-center\">\n                            <svg class=\"w-6 h-6 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"><\/path>\n                            <\/svg>\n                        <\/div>\n                        <div>\n                            <div class=\"font-bold text-gray-900\">Trusted Since 2010<\/div>\n                            <div class=\"text-sm text-gray-600\">Making a difference<\/div>\n                        <\/div>\n                    <\/div>\n                <\/div>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/section>",
            "created_at": "2025-11-01T06:47:17.000000Z",
            "updated_at": "2025-11-01T06:47:17.000000Z"
        },
        {
            "id": 5,
            "title": "Faith Theme Mission Vision",
            "slug": "faith-theme-mission-vision",
            "status": "published",
            "content": "<!-- Mission \/ Vision -->\n<section id=\"mission\" class=\"py-20 bg-white\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n        <div class=\"text-center mb-16\">\n            <h2 class=\"text-4xl md:text-5xl font-bold text-gray-900 mb-4\">Our Mission & Vision<\/h2>\n            <p class=\"text-xl text-gray-600 max-w-3xl mx-auto\">Committed to creating lasting positive change in our community<\/p>\n        <\/div>\n\n        <div class=\"grid md:grid-cols-2 gap-8\">\n            <div class=\"bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl border-2 primary-border\">\n                <div class=\"w-16 h-16 primary-bg rounded-2xl flex items-center justify-center mb-6\">\n                    <svg class=\"w-8 h-8 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 10V3L4 14h7v7l9-11h-7z\"><\/path>\n                    <\/svg>\n                <\/div>\n                <h3 class=\"text-3xl font-bold text-gray-900 mb-4\">Our Mission<\/h3>\n                <p class=\"text-lg text-gray-700 leading-relaxed\">\n                    To empower communities through education, support, and sustainable programs that create lasting positive impact. We believe in the power of collective action and compassion to transform lives.\n                <\/p>\n            <\/div>\n\n            <div class=\"bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border-2 secondary-border\">\n                <div class=\"w-16 h-16 secondary-bg rounded-2xl flex items-center justify-center mb-6\">\n                    <svg class=\"w-8 h-8 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\"><\/path>\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\"><\/path>\n                    <\/svg>\n                <\/div>\n                <h3 class=\"text-3xl font-bold text-gray-900 mb-4\">Our Vision<\/h3>\n                <p class=\"text-lg text-gray-700 leading-relaxed\">\n                    A world where every individual has access to opportunities, resources, and support they need to thrive. We envision thriving communities built on compassion, equality, and mutual respect.\n                <\/p>\n            <\/div>\n        <\/div>\n\n        <!-- Core Values -->\n        <div class=\"mt-16 grid md:grid-cols-4 gap-6\">\n            <div class=\"text-center\">\n                <div class=\"w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4\">\n                    <svg class=\"w-10 h-10 primary-color\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\"><\/path>\n                    <\/svg>\n                <\/div>\n                <h4 class=\"font-bold text-gray-900 mb-2\">Compassion<\/h4>\n                <p class=\"text-gray-600 text-sm\">Leading with empathy and understanding<\/p>\n            <\/div>\n            <div class=\"text-center\">\n                <div class=\"w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4\">\n                    <svg class=\"w-10 h-10 secondary-color\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z\"><\/path>\n                    <\/svg>\n                <\/div>\n                <h4 class=\"font-bold text-gray-900 mb-2\">Community<\/h4>\n                <p class=\"text-gray-600 text-sm\">Building stronger connections together<\/p>\n            <\/div>\n            <div class=\"text-center\">\n                <div class=\"w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4\">\n                    <svg class=\"w-10 h-10 primary-color\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\"><\/path>\n                    <\/svg>\n                <\/div>\n                <h4 class=\"font-bold text-gray-900 mb-2\">Integrity<\/h4>\n                <p class=\"text-gray-600 text-sm\">Acting with honesty and transparency<\/p>\n            <\/div>\n            <div class=\"text-center\">\n                <div class=\"w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4\">\n                    <svg class=\"w-10 h-10 secondary-color\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 10V3L4 14h7v7l9-11h-7z\"><\/path>\n                    <\/svg>\n                <\/div>\n                <h4 class=\"font-bold text-gray-900 mb-2\">Impact<\/h4>\n                <p class=\"text-gray-600 text-sm\">Creating meaningful lasting change<\/p>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/section>\n",
            "created_at": "2025-11-01T06:58:32.000000Z",
            "updated_at": "2025-11-01T06:58:32.000000Z"
        },
        {
            "id": 6,
            "title": "Faith Theme Events",
            "slug": "faith-theme-events",
            "status": "published",
            "content": "<!-- Upcoming Events -->\n<section id=\"events\" class=\"py-20 bg-gray-50\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n        <div class=\"flex justify-between items-end mb-12\">\n            <div>\n                <h2 class=\"text-4xl md:text-5xl font-bold text-gray-900 mb-4\">Upcoming Events<\/h2>\n                <p class=\"text-xl text-gray-600\">Join us and make a difference<\/p>\n            <\/div>\n            <button class=\"primary-color font-bold hover:underline\">View All Events →<\/button>\n        <\/div>\n\n        <div class=\"grid md:grid-cols-2 lg:grid-cols-3 gap-6\">\n            <!-- Event 1 -->\n            <div class=\"bg-white rounded-2xl shadow-sm card-hover event-card p-6\">\n                <div class=\"flex items-start justify-between mb-4\">\n                    <div class=\"primary-bg text-white px-4 py-2 rounded-xl text-center\">\n                        <div class=\"text-2xl font-bold\">15<\/div>\n                        <div class=\"text-xs\">JAN<\/div>\n                    <\/div>\n                    <span class=\"bg-orange-100 primary-color px-3 py-1 rounded-full text-sm font-semibold\">Fundraiser<\/span>\n                <\/div>\n                <h3 class=\"text-xl font-bold text-gray-900 mb-2\">Community Charity Gala<\/h3>\n                <p class=\"text-gray-600 mb-4\">Join us for an evening of celebration and fundraising for local education programs.<\/p>\n                <div class=\"flex items-center text-sm text-gray-500 mb-2\">\n                    <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\"><\/path>\n                    <\/svg>\n                    6:00 PM - 10:00 PM\n                <\/div>\n                <div class=\"flex items-center text-sm text-gray-500 mb-4\">\n                    <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\"><\/path>\n                    <\/svg>\n                    Grand Hall, Downtown\n                <\/div>\n                <button class=\"w-full primary-bg text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity\">Register Now<\/button>\n            <\/div>\n\n            <!-- Event 2 -->\n            <div class=\"bg-white rounded-2xl shadow-sm card-hover event-card p-6\">\n                <div class=\"flex items-start justify-between mb-4\">\n                    <div class=\"secondary-bg text-white px-4 py-2 rounded-xl text-center\">\n                        <div class=\"text-2xl font-bold\">22<\/div>\n                        <div class=\"text-xs\">JAN<\/div>\n                    <\/div>\n                    <span class=\"bg-green-100 secondary-color px-3 py-1 rounded-full text-sm font-semibold\">Workshop<\/span>\n                <\/div>\n                <h3 class=\"text-xl font-bold text-gray-900 mb-2\">Youth Leadership Workshop<\/h3>\n                <p class=\"text-gray-600 mb-4\">Empowering the next generation of community leaders through interactive sessions.<\/p>\n                <div class=\"flex items-center text-sm text-gray-500 mb-2\">\n                    <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\"><\/path>\n                    <\/svg>\n                    9:00 AM - 3:00 PM\n                <\/div>\n                <div class=\"flex items-center text-sm text-gray-500 mb-4\">\n                    <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\"><\/path>\n                    <\/svg>\n                    Community Center\n                <\/div>\n                <button class=\"w-full secondary-bg text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity\">Register Now<\/button>\n            <\/div>\n\n            <!-- Event 3 -->\n            <div class=\"bg-white rounded-2xl shadow-sm card-hover event-card p-6\">\n                <div class=\"flex items-start justify-between mb-4\">\n                    <div class=\"primary-bg text-white px-4 py-2 rounded-xl text-center\">\n                        <div class=\"text-2xl font-bold\">05<\/div>\n                        <div class=\"text-xs\">FEB<\/div>\n                    <\/div>\n                    <span class=\"bg-orange-100 primary-color px-3 py-1 rounded-full text-sm font-semibold\">Volunteer<\/span>\n                <\/div>\n                <h3 class=\"text-xl font-bold text-gray-900 mb-2\">Community Clean-Up Day<\/h3>\n                <p class=\"text-gray-600 mb-4\">Join volunteers in beautifying our neighborhood parks and public spaces.<\/p>\n                <div class=\"flex items-center text-sm text-gray-500 mb-2\">\n                    <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\"><\/path>\n                    <\/svg>\n                    8:00 AM - 12:00 PM\n                <\/div>\n                <div class=\"flex items-center text-sm text-gray-500 mb-4\">\n                    <svg class=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\"><\/path>\n                    <\/svg>\n                    Central Park\n                <\/div>\n                <button class=\"w-full primary-bg text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity\">Register Now<\/button>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/section>",
            "created_at": "2025-11-01T07:32:18.000000Z",
            "updated_at": "2025-11-01T08:31:05.000000Z"
        },
        {
            "id": 7,
            "title": "Faith Theme Gallery & Volunteer",
            "slug": "faith-theme-gallery-volunteer",
            "status": "published",
            "content": "<!-- Gallery & Volunteer Signup -->\n<section id=\"volunteer\" class=\"py-20 bg-gray-50\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n        <div class=\"grid md:grid-cols-2 gap-12 items-center mb-16\">\n            <!-- Gallery -->\n            <div>\n                <h2 class=\"text-4xl font-bold text-gray-900 mb-6\">Our Community in Action<\/h2>\n                <div class=\"grid grid-cols-2 gap-4\">\n                    <img src=\"https:\/\/images.unsplash.com\/photo-1488521787991-ed7bbaae773c?w=400\" alt=\"Gallery\" class=\"rounded-2xl w-full h-48 object-cover\">\n                    <img src=\"https:\/\/images.unsplash.com\/photo-1559027615-cd4628902d4a?w=400\" alt=\"Gallery\" class=\"rounded-2xl w-full h-48 object-cover\">\n                    <img src=\"https:\/\/images.unsplash.com\/photo-1593113646773-028c64a8f1b8?w=400\" alt=\"Gallery\" class=\"rounded-2xl w-full h-48 object-cover\">\n                    <img src=\"https:\/\/images.unsplash.com\/photo-1469571486292-0ba58a3f068b?w=400\" alt=\"Gallery\" class=\"rounded-2xl w-full h-48 object-cover\">\n                <\/div>\n            <\/div>\n\n            <!-- Volunteer Form -->\n            <div class=\"volunteer-form rounded-3xl p-8\">\n                <h3 class=\"text-3xl font-bold text-gray-900 mb-4\">Become a Volunteer<\/h3>\n                <p class=\"text-gray-600 mb-6\">Join our passionate team and make a real difference in your community.<\/p>\n                <form class=\"space-y-4\">\n                    <div class=\"grid md:grid-cols-2 gap-4\">\n                        <input type=\"text\" placeholder=\"First Name\" class=\"w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500\" required>\n                        <input type=\"text\" placeholder=\"Last Name\" class=\"w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500\" required>\n                    <\/div>\n                    <input type=\"email\" placeholder=\"Email Address\" class=\"w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500\" required>\n                    <input type=\"tel\" placeholder=\"Phone Number\" class=\"w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500\">\n                    <select class=\"w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500\" required>\n                        <option value=\"\">Areas of Interest<\/option>\n                        <option>Education<\/option>\n                        <option>Healthcare<\/option>\n                        <option>Environment<\/option>\n                        <option>Community Events<\/option>\n                        <option>Fundraising<\/option>\n                    <\/select>\n                    <textarea rows=\"4\" placeholder=\"Why do you want to volunteer?\" class=\"w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none\"><\/textarea>\n                    <button type=\"submit\" class=\"w-full primary-bg text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity\">Submit Application<\/button>\n                <\/form>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/section>",
            "created_at": "2025-11-01T07:33:16.000000Z",
            "updated_at": "2025-11-01T07:33:16.000000Z"
        }
    ],
    "sliders": [
        {
            "id": 1,
            "heading": "The Future of Digital Publishing",
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
        },
        {
            "id": 2,
            "heading": "Innovation in Community Building",
            "subheading": "How organizations are connecting with their audiences in meaningful ways.",
            "order": 2,
            "button_first_name": "Read More",
            "button_first_link": "#",
            "button_second_name": null,
            "button_second_link": null,
            "opposite_percentage": 50,
            "media_path": "sliders\/01K8J8PPZNMWVZVX0NKM3X94C1.jpeg",
            "is_active": 1,
            "created_at": "2025-11-01T06:45:46.000000Z",
            "updated_at": "2025-11-01T06:45:46.000000Z",
            "background_color": "#000000"
        },
        {
            "id": 3,
            "heading": "Leading Through Change",
            "subheading": "Stories of transformation and impact from organizations making a difference.",
            "order": 3,
            "button_first_name": "Read More",
            "button_first_link": "#",
            "button_second_name": null,
            "button_second_link": null,
            "opposite_percentage": 50,
            "media_path": "sliders\/01K8J8R4XZ0AH0HJJT9S1GCJ03.jpeg",
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

| File/Directory | Required | Notes |
|---------------|----------|-------|
| `theme.json` | ✅ Yes | Must have name, slug, version |
| `views/layouts/app.blade.php` | ✅ Yes | Missing causes errors |
| `views/layouts/guest.blade.php` | ✅ Yes | Missing causes errors |
| `views/pages/home.blade.php` | ✅ Yes | Required but customizable |
| `views/pages/contact_us.blade.php` | ✅ Yes | Required but customizable |
| `assets/` directory | ⚠️ Recommended | CSS/JS for styling |
| `helper/` directory | ⚪ Optional | Custom helper functions |
| `public/` directory | ⚪ Optional | Storage media files |
| `demo/` directory | ⚪ Optional | Demo data JSON |
| Other view files | ⚪ Optional | Customize as needed |

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

