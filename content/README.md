# Blog Content Structure

## Published Posts

Each post lives in its own folder under `content/posts/`:

```
content/posts/
├── post-name/
│   ├── index.en.mdx
│   ├── index.pt-BR.mdx
│   └── images/
│       └── (optional assets for the post)
```

### Frontmatter Format

```yaml
---
title: "Post Title"
date: "2024-01-22"
description: "Brief description for SEO and card previews"
tags: ["tag1", "tag2"]
draft: false
---
```

## Drafts

Work-in-progress posts live in `content/drafts/`:

```
content/drafts/
├── draft-post/
│   ├── index.en.mdx
│   └── index.pt-BR.mdx
```

Drafts are only visible in development mode (`NODE_ENV=development`).
Move posts from `drafts/` to `posts/` when both language versions are complete.

## Adding Images

Place images in the post's `images/` folder:

```
content/posts/react-hooks-deep-dive/
├── index.en.mdx
├── index.pt-BR.mdx
└── images/
    ├── diagram.png
    └── code-example.png
```

Reference in MDX:

```markdown
![Description](/images/diagram.png)
```

## Bilingual Content

Each post must have both versions:

- `index.en.mdx` - English version
- `index.pt-BR.mdx` - Brazilian Portuguese version

Both files should have matching frontmatter (except `title` and `description` which can be translated).
