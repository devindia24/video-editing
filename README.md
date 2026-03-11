# MotionCraft Academy 🎬

> A modern, responsive skilling platform website for video editing & motion graphics education.

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Overview

MotionCraft Academy is a fully responsive, single-page website for a creative education platform specialising in video editing and motion graphics. Built with vanilla HTML5, CSS3, and JavaScript — no frameworks, no dependencies, just fast-loading, standards-compliant code with a stunning dark cinematic aesthetic.

## ✨ Features

- **Sticky Navigation** — transparent navbar that gains a frosted-glass background on scroll, with a mobile hamburger menu
- **Hero Section** — animated particles, grid overlay, headline with gradient text, stat counters, and dual CTA buttons
- **Features Grid** — six illustrated benefit cards with hover effects
- **Course Catalog** — filterable grid (All / Video Editing / Motion Graphics / VFX / Color Grading) with animated card transitions
- **About Section** — platform story with animated count-up statistics (triggered on viewport entry)
- **Instructor Profiles** — avatar cards with specialty badges, bios, and social links
- **Learning Path Timeline** — visual five-step roadmap from "Choose Your Path" to "Launch Your Career"
- **Pricing Section** — three-tier cards (Basic / Pro / Enterprise) with a monthly ↔ annual toggle
- **Testimonials Carousel** — auto-playing slider with touch/swipe support, keyboard navigation, and dot pagination
- **Newsletter CTA** — email signup with client-side validation and success state
- **Footer** — five-column layout with quick links, social icons, and a back-to-top button
- **Scroll Reveal Animations** — fade-in / slide-in effects for elements entering the viewport
- **Accessibility** — semantic HTML5, ARIA roles/labels, keyboard navigation, sufficient colour contrast, `prefers-reduced-motion` support

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styles | CSS3 — Custom Properties, Grid, Flexbox, Animations, Glassmorphism |
| Scripts | Vanilla JavaScript (ES6+, no build step required) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) (body) · [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (headings) via Google Fonts |

## 📁 File Structure

```
/
├── index.html          # Single-page application entry point
├── css/
│   └── styles.css      # All styles: layout, components, animations, responsive
├── js/
│   └── script.js       # All interactive behaviour
└── README.md
```

## 🚀 Running Locally

No build tools are required. Simply open `index.html` in any modern browser:

```bash
# Clone the repository
git clone https://github.com/devindia24/video-editing.git
cd video-editing

# Option 1: Open directly
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# Option 2: Use a local development server (recommended for font loading)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080` (or the port shown).

## 📸 Screenshots

> _Screenshots will be added once the site is deployed._

| Section | Preview |
|---|---|
| Hero | _Coming soon_ |
| Courses | _Coming soon_ |
| Pricing | _Coming soon_ |

## 🎨 Design Tokens

| Token | Value | Purpose |
|---|---|---|
| `--bg-primary` | `#0a0a0f` | Page background |
| `--bg-secondary` | `#12121a` | Alternate section background |
| `--purple` | `#7c3aed` | Primary accent |
| `--blue` | `#3b82f6` | Secondary accent |
| `--pink` | `#ec4899` | Tertiary accent |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please ensure your code follows the existing style conventions:
- Indent with **2 spaces**
- Use **CSS Custom Properties** for colours and spacing
- Keep JavaScript functions small and well-commented
- Ensure all interactive elements are keyboard-accessible

## �� License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

Built with ♥ for creators | © 2025 MotionCraft Academy
