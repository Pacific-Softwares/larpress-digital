# larpress Documentation

Official documentation for larpress - Modern Laravel CMS & Application Starter Kit.

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

### Development

The documentation is built with [VitePress](https://vitepress.dev/).

- Docs are in `docs/` directory
- Configuration in `.vitepress/config.ts`
- All content written in Markdown

## Structure

```
larpress-docs/
├── docs/
│   ├── index.md                    # Home page
│   ├── getting-started/            # Getting started guides
│   ├── admin-panel/                # Admin panel docs
│   ├── modules/                    # Module development
│   ├── themes/                     # Theme development
│   ├── api/                        # API reference
│   └── deployment/                 # Deployment guides
├── .vitepress/
│   └── config.ts                   # VitePress config
└── package.json
```

## Writing Documentation

### Markdown Features

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

[Link text](https://example.com)

![Image alt](./image.png)
```

### Code Blocks

````markdown
```php
// PHP code with syntax highlighting
function hello() {
    echo "Hello World";
}
```

```bash
# Bash commands
composer install
```
````

### Custom Containers

```markdown
::: tip
Helpful tip for users
:::

::: warning
Important warning
:::

::: danger
Critical information
:::

::: info
Additional information
:::
```

### Tables

```markdown
| Feature | Description |
|---------|-------------|
| Easy | Simple setup |
| Fast | Quick loading |
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Writing Guidelines

- Use clear, concise language
- Include code examples
- Add screenshots where helpful
- Test all code snippets
- Follow existing structure

## Deployment

### GitHub Pages

```bash
# Build docs
npm run docs:build

# Deploy to GitHub Pages
# Configure in .github/workflows/deploy.yml
```

### Netlify

1. Connect GitHub repository
2. Set build command: `npm run docs:build`
3. Set publish directory: `docs/.vitepress/dist`

### Vercel

1. Import GitHub repository
2. Framework: VitePress
3. Build command: `npm run docs:build`
4. Output directory: `docs/.vitepress/dist`

## License

MIT License - see LICENSE file for details.

## Links

- [larpress Website](https://larpress.digital)
- [GitHub Repository](https://github.com/yourusername/larpress)
- [Discord Community](https://discord.gg/larpress)

