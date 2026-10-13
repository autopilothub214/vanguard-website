# Vanguard Website: How to Edit

| I want to change... | Edit this |
|---|---|
| Phone, email, address, hours, menu links | `js/site-config.js` |
| Colors and fonts | top of `css/styles.css` (the `:root` block) |
| A picture | replace the file in `images/` (keep the same filename) |
| English text | `index.html`, in the `<!-- EDIT -->` sections |
| **Spanish text** | `js/translations.js` (each line matches a `data-i18n` name in `index.html`) |

## Putting your changes online
Save the file, then ask Claude Code to commit and push. The live site updates in 1–2 minutes.

## Image tips
Lowercase names, no spaces (`team-john.jpg`), under 300KB each.

## English / Spanish
The site has an **ES / EN** button in the menu. A visitor whose browser is set to Spanish sees Spanish first; everyone else sees English. Their choice is remembered.

When you change a sentence, change it in **both** places: the English in `index.html` and the Spanish in `js/translations.js`. If you add a new sentence, give it a new `data-i18n="some.name"` tag and add the same `"some.name": "texto en español"` line to `js/translations.js`. Menu names and the open days are translated in `js/site-config.js`.
