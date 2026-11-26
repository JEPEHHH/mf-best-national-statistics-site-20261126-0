# Nusa Angka

An offline, static national-statistics reading room for Indonesia. Six linked
sections — overview, people, economy, regions, education & health, and sources —
with real published figures, drawn charts and working controls. No build step,
no dependencies and no network requests: every asset lives under `app/`.

## Run locally

    node serve.ts            # serves app/ at http://localhost:8080
    MAKEFUN_OUTPUT_DIR=out node main.ts   # writes app/, screenshots/, dossier.json

`main.ts` is the hand-in program. It copies `app/` and `screenshots/` into the
output directory and writes `dossier.json` with the kit's dossier builder.
`MAKEFUN_OUTPUT_DIR` substitutes for `/output` outside the grader.

## Structure

    app/index.html        shell, navigation and page frame
    app/style.css         the whole visual system
    app/main.js           hash router
    app/charts.js         SVG chart functions
    app/data/*.js         figures and provenance, split by topic
    app/views/*.js        one page module per section
    screenshots/          real browser renders of this site
    vendor/               the kit's unchanged dossier library

## License

MIT — see LICENSE.
