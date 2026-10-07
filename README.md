# HiMat LLMs.txt Generator

A lightweight, browser-only tool for creating `llms.txt` and `llms-full.txt` documents for websites.

## Features

- Starter templates for SaaS, developer APIs, tech blogs, e-commerce, and agency/service businesses
- Editable site title, summary, documentation sections, and optional AI context
- Live markdown generation for `llms.txt`
- Optional `llms-full.txt` generation
- Built-in validator for required structure and URL/link checks
- Live Markdown preview
- Copy-to-clipboard and file download actions
- 100% client-side processing with no backend or API dependency

## Run locally

1. Open `index.html` in a browser, or
2. Serve the folder with a simple static server, for example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `index.html` — app structure
- `styles.css` — styling and layout
- `script.js` — generator, validator, and UI logic

## Privacy

This project is intentionally designed to keep all user-entered content in the browser. No data is sent to a backend or external service.

