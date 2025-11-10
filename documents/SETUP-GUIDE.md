# larpress Documentation Setup Guide

Quick guide to get the documentation site running.

## Prerequisites

- Node.js 16+ and NPM
- Git

## Installation

```bash
# Navigate to docs directory
cd larpress-docs

# Install dependencies
npm install

# Start development server
npm run docs:dev
```

Visit: `http://localhost:5173`

## Available Commands

```bash
# Development server with hot reload
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build locally
npm run docs:preview
```

## Project Structure

```
larpress-docs/
├── docs/                           # All documentation files
│   ├── index.md                    # Home page
│   ├── getting-started/            # Getting started guides
│   │   ├── introduction.md
│   │   ├── installation.md
│   │   ├── configuration.md
│   │   └── quick-start.md
│   ├── admin-panel/                # Admin panel documentation
│   │   ├── overview.md
│   │   ├── dashboard.md
│   │   ├── users.md
│   │   └── ...
│   ├── modules/                    # Module development
│   │   ├── introduction.md
│   │   ├── creating.md
│   │   ├── structure.md
│   │   └── ...
│   ├── themes/                     # Theme development
│   │   ├── introduction.md
│   │   ├── creating.md
│   │   └── ...
│   ├── api/                        # API reference
│   │   ├── authentication.md
│   │   ├── users.md
│   │   └── ...
│   ├── deployment/                 # Deployment guides
│   │   ├── requirements.md
│   │   ├── checklist.md
│   │   └── ...
│   └── public/                     # Static assets (images, etc.)
├── .vitepress/                     # VitePress configuration
│   ├── config.ts                   # Main configuration
│   └── theme/                      # Theme customization
│       ├── index.ts
│       └── custom.css
├── package.json
├── README.md
└── SETUP-GUIDE.md (this file)
```

## Adding New Pages

1. Create a new `.md` file in appropriate directory
2. Add to sidebar in `.vitepress/config.ts`
3. Write content in Markdown

Example:

```markdown
# Page Title

Your content here...

## Section

More content...

```php
// Code example
echo "Hello";
```
```

## Customization

### Branding

Edit `.vitepress/config.ts`:

```typescript
export default defineConfig({
  title: 'larpress',
  description: 'Your description',
  themeConfig: {
    logo: '/logo.svg',
    // ... other config
  }
})
```

### Colors

Edit `.vitepress/theme/custom.css`:

```css
:root {
  --vp-c-brand-1: #667eea;
  --vp-c-brand-2: #764ba2;
}
```

### Navigation

Edit sidebar in `.vitepress/config.ts`:

```typescript
sidebar: {
  '/your-section/': [
    {
      text: 'Section Name',
      items: [
        { text: 'Page 1', link: '/your-section/page1' },
        { text: 'Page 2', link: '/your-section/page2' }
      ]
    }
  ]
}
```

## Deployment

### Build Static Site

```bash
npm run docs:build
```

Output: `docs/.vitepress/dist/`

### Deploy to Netlify

1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run docs:build`
4. Publish directory: `docs/.vitepress/dist`

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm install
      
      - name: Build docs
        run: npm run docs:build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

## Tips

### Writing Tips

- Use clear headings
- Include code examples
- Add screenshots
- Link related pages
- Keep it concise

### Code Blocks

Supported languages:
- `php`
- `javascript`
- `typescript`
- `bash`
- `json`
- `yaml`
- `html`
- `css`

### Custom Containers

```markdown
::: tip Pro Tip
Helpful information for users
:::

::: warning Important
Critical information users should know
:::

::: danger Be Careful
Things that could break the application
:::
```

## Search

VitePress includes built-in local search. No configuration needed!

Press `Cmd/Ctrl + K` to search.

## Hot Reload

While running `npm run docs:dev`, changes to markdown files will automatically reload in the browser.

## Getting Help

- [VitePress Documentation](https://vitepress.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [larpress Discord](https://discord.gg/larpress)

## Contributing

We welcome contributions! Please:

1. Check existing issues
2. Create feature branch
3. Write clear documentation
4. Submit pull request

Happy documenting! 📚

