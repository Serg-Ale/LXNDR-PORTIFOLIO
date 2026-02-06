# Matrix Rain Terminal Animation Blog Post

This blog post tells the story of creating the [matrix-rain](https://github.com/Serg-Ale/matrix-rain) terminal animation tool from scratch.

## Files

- `index.en.mdx` - English version of the blog post
- `index.pt-BR.mdx` - Portuguese (Brazilian) version of the blog post
- `images/demo.gif` - Demo animation GIF

## Content Overview

The blog post covers:

1. **The Problem** - Why cmatrix wasn't good enough
2. **Challenge #1** - Getting Japanese Katakana characters to render properly
3. **Challenge #2** - The `curses.init_color()` bug and switching to 256-color palette
4. **Challenge #3** - Creating cinematic quality with 8-shade gradients and column-based rendering
5. **The Result** - Feature showcase and call to action

## Technical Details Highlighted

- Unicode/UTF-8 character encoding for Japanese characters
- Terminal color system (256-color xterm palette vs curses.init_color)
- Animation architecture (column-based rendering)
- Gradient system (8 brightness levels)
- Python curses library usage

## Style

- **Narrative-driven** - Tells the journey from frustration to solution
- **Accessible** - Technical concepts explained for general tech audience
- **Engaging** - Personal story mixed with technical challenges
- **Medium length** - ~800-1000 words per version

## Links

- GitHub Repository: https://github.com/Serg-Ale/matrix-rain
- Project Path: /home/lxndr/projects/matrix-rain

## Publication Date

2026-02-02
