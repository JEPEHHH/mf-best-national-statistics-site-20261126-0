# mf-best-national-statistics-site-20261126-0

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/JEPEHHH/mf-best-national-statistics-site-20261126-0/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/JEPEHHH/mf-best-national-statistics-site-20261126-0/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

best-national-statistics-site-20261126-0539

## Run it

```sh
bash run.sh
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>


---

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
