# 🌍 Internationalization (i18n) Setup

Your portfolio now supports both **English** and **Brazilian Portuguese**!

## 🎯 Features

- **Automatic locale detection** based on browser settings
- **Language switcher** button in the navigation (EN/PT)
- **URL-based routing**: `/en/...` and `/pt-BR/...`
- **Fully translated content** including:
  - Navigation
  - Hero section
  - About section
  - Experience timeline
  - Projects
  - Contact information
  - Footer

## 📁 Structure

```
app/
  [locale]/
    layout.tsx    # Root layout with i18n provider
    page.tsx      # Main page
    globals.css   # Global styles
    
i18n/
  routing.ts      # Routing configuration
  
messages/
  en.json         # English translations
  pt-BR.json      # Portuguese translations
  
middleware.ts     # Locale detection middleware
i18n.ts          # Main i18n configuration
```

## 🔧 How It Works

1. **Middleware** (`middleware.ts`) detects the user's preferred language
2. **Routing** redirects to the appropriate locale path (e.g., `/pt-BR/`)
3. **Components** use `useTranslations()` hook to display translated content
4. **Language Switcher** allows manual toggling between languages

## 🌐 Accessing Different Languages

- English: `http://localhost:3000/en`
- Portuguese: `http://localhost:3000/pt-BR`
- Auto-detect: `http://localhost:3000` (redirects based on browser language)

## ✏️ Adding/Editing Translations

Edit the JSON files in the `messages/` folder:

- `messages/en.json` - English translations
- `messages/pt-BR.json` - Portuguese translations

The structure is:
```json
{
  "section": {
    "key": "Translation text"
  }
}
```

## 🚀 Testing

1. Visit `http://localhost:3000`
2. Click the **PT/EN** button in the navigation
3. Watch the entire site switch languages instantly!

## 📝 Notes

- All content is now coming from the translation files
- The site automatically detects Brazilian Portuguese users
- SEO-friendly with proper lang attributes
