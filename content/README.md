# Editorial Content Structure

This repository now uses an **editorial-first** model with two distinct content roots:

- `content/essays/` for long-form authorial essays (`ensaios`)
- `content/laboratory/` for experimental and iterative pieces (`laboratorio`)

Legacy technical blog posts remain in `content/posts/` during migration, but new editorial publication should target the roots above.

## 1) Essays (`content/essays/`)

Each essay lives in its own slug folder:

```txt
content/essays/
├── essay-slug/
│   ├── index.pt-BR.mdx
│   ├── index.en.mdx        # optional
│   └── images/             # optional
```

## 2) Laboratory (`content/laboratory/`)

Each laboratory entry also lives in its own slug folder:

```txt
content/laboratory/
├── experiment-slug/
│   ├── index.pt-BR.mdx
│   ├── index.en.mdx        # optional
│   └── images/             # optional
```

## 3) Drafts

Work-in-progress entries stay under `content/drafts/` and are only intended for development visibility.

```txt
content/drafts/
├── some-entry/
│   ├── index.pt-BR.mdx
│   └── index.en.mdx        # optional
```

## Frontmatter Contract

```yaml
---
title: "Entry title"
description: "Brief description for SEO and cards"
date: "2026-05-21"
tags: ["tag1", "tag2"]
author: "Sérgio Alexandre"
locale: "pt-BR" # or "en"
slug: "entry-slug"
contentType: "essay" # or "lab"
draft: false
---
```

### Optional frontmatter

- `image`
- `coverImage`
- `readingTime`

## PT-BR-first Publication Rule

PT-BR is allowed as the primary publication language.

- `index.pt-BR.mdx` can be published without `index.en.mdx`
- `index.en.mdx` can be added later as a translation
- Missing EN versions should use loader-level fallback behavior rather than hard 404 where applicable

## Images

Place images in the entry-local `images/` folder and reference them from MDX.

```markdown
![Description](/images/diagram.png)
```
