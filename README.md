# finder-broadband-rewards-prototype

A React prototype that reproduces [finder.com.au/broadband-plans](https://www.finder.com.au/broadband-plans) and adds a **"Net Price with Rewards"** view to the comparison table.

Instead of showing just the special-offer monthly price, each plan's Finder Reward (e.g. a $110 Visa eGift card) is amortised over 12 months and subtracted from the monthly price — so shoppers can compare the real effective cost.

## The idea

```
Effective Price = Special Offer Price − (Finder Reward ÷ 12)
```

Example — Dodo NBN 500:
```
$72.99/mth − ($110 ÷ 12) = $63.82/mth
```

When the rewards toggle is **on**, the plan card shows:

- Original promo price **struck through**
- New effective price in **bold green**
- "Price after rewards" caption
- A small calculation line showing the math

When the toggle is **off**, the standard special-offer layout is shown (with the reward surfaced as a badge).

## Stack

- React 18 + Vite
- Tailwind CSS 3
- No backend — plan data is mocked in `src/data/plans.js`

## Data

`src/data/plans.js` contains 18 real NBN plans extracted from a snapshot of the live Finder broadband-plans page. Five of them carry a Finder Reward, with varied dollar values ($110–$250) so the rewards math is easy to verify visually.

Providers represented: Dodo, Superloop, TPG, Optus, Swoop, Exetel, Belong, Tangerine, Aussie Broadband, Telstra, Arctel, Southern Phone.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/
├── App.jsx                       # Page shell, filters, sort, toggle state
├── main.jsx
├── index.css                     # Tailwind directives
├── data/plans.js                 # Mock plan data + getEffectivePrice()
└── components/
    ├── PlanCard.jsx              # Single comparison row
    └── RewardsToggle.jsx         # Custom checkbox-based toggle switch
```

## Features

- **Rewards-included pricing toggle** — the core experiment
- Speed-tier filter (NBN 25 through NBN 1000)
- Sort by effective price, special offer, standard price, speed, or Finder Score
- "Plans with Finder Rewards only" checkbox
- Finder Score badge, "Save $X" ribbon, promoted/exclusive flags
- Mobile-responsive card layout

## Status

Prototype only — not production code. Plan data is a point-in-time snapshot and will go stale.
