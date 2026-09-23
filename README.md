# Prinstine Academy — unofficial concept

Next.js 15 App Router, TypeScript, and Tailwind CSS 4. No backend or application data collection.

## Local preview

```sh
npm ci
npm run dev
```

For a production preview: `npm run build`, then `npm run start`.

## Community section

The carousel after learning pathways takes its composition from Clay’s customer-story section. It includes the five public Prinstine Group Facebook reels supplied by the user. Titles summarize their publicly visible captions; no testimonial quotes or outcomes have been invented. Covers are explicitly labeled academy gallery photos, not video stills.

Facebook embeds load only after a visitor clicks play. Only one player is mounted at a time, and changing slides removes it. Each slide has an external Facebook link for login, cookie, regional, or embedding restrictions. No Facebook SDK or player dependency is installed.

The accounting reel (`1320798773474924`) returned “Video Unavailable” in Facebook’s embed player during verification, so its main action opens Facebook directly. The other four public embed players loaded during verification; availability remains controlled by Facebook.

## GitHub Pages

Repository: https://github.com/Mitchell-Travis/Prinstine-Academy

Pages address: https://mitchell-travis.github.io/Prinstine-Academy/

Push the project to its `main` branch with **Settings → Pages → Source: GitHub Actions** enabled. The included workflow exports the static homepage and deploys `out/`. Repository subpaths are supplied by `configure-pages` and applied to all local images. Search indexing is disabled and the page retains its unofficial-concept label.

Test a subpath export locally:

```sh
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/Prinstine-Academy npm run build
```

Do not run a build while a production preview is using the same `.next` directory.

## Verification

`checks/hero.playwright.js` and `checks/community.playwright.js` can be run through Playwright MCP using `browser_run_code_unsafe` with the `filename` argument. They expect the production preview at `http://127.0.0.1:3001`.

Research and screenshots are local-only and excluded from git. Public gallery photos remain academy-owned; this project is an unofficial outreach concept, not the academy’s official website.
