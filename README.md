# Health Hackathon 3.0

A responsive React + TypeScript + Tailwind CSS website for the Global Health Access Innovation Challenge – Next Generation, 28–29 January 2027, VIT Bhopal University. Workshop: 27 January 2027.

## Run locally

```sh
npm install
npm run dev -- --port 5173
```

Open http://127.0.0.1:5173. Build with `npm run build`; serve the production output with `npm run preview`.

## Content and assets

- `src/data/event.ts`: authoritative current-edition data, dates, prizes, tracks, committee, coordinators, partners, institutions, email and configurable registration URL.
- `src/data/previousEdition.json`: all 15 previous-edition detailed problem statements, explicitly unconfirmed and never rendered as current-edition requirements.
- `public/health-hackathon-3-brochure.pdf`: unmodified two-page brochure supplied by the user.
- `public/assets/`: authentic artwork, logos, emblem, campus images, and QR extracted from the brochure’s original embedded page JPEGs.
- `IMPLEMENTATION_NOTES.md`: source comparison, registration verification, unresolved organizer details and verification results.

The timeline uses the current calendar date in Asia/Kolkata. On 7 October 2026, Idea submission (31 October 2026) is the next milestone. The final registration window remains current until 31 December. After 29 January 2027 the site switches to a completed-edition state. No precise event opening time is assumed.
