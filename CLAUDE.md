# DSD Dashboard

A fullscreen store-facing dashboard for Kroger store CI 351, built to display during DSD (Direct Store Delivery) vendor check-in windows. Designed to run on a TV or large display in the store.

## Stack

- **React 18** + **Vite** + **Tailwind CSS v3**
- **lucide-react** for icons
- No routing library — single page, tab-based navigation
- No backend — all data is static in `src/data.js`

## Dev

```bash
npm run dev      # start dev server (localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the dist build
```

## Project Structure

```
src/
  main.jsx             # entry point
  App.jsx              # root: FontProvider wraps Dashboard
  FontContext.jsx      # global display settings (fonts, sizes, spacing, animation)
  data.js              # all static data (vendors, KPIs, goals, sales/shrink)
  index.css            # global styles + CSS animation keyframes
  components/
    Header.jsx         # nav tabs, check-in/out buttons, fullscreen toggle
    StoreSummary.jsx   # DSD Store Summary KPI row (6 cards)
    VendorInsights.jsx # vendor table with check-in/out animation
    SalesAndShrink.jsx # Sell More Lose Less tab content
    FontSettings.jsx   # hidden settings panel (font, size, spacing, animation knobs)
designs/               # PNG mockups for reference
public/logos/          # vendor logo PNGs served as static assets
vendor logos/          # source logo files (not served directly)
```

## Key Concepts

### Two Tabs (auto-rotating)
- **Vendor Management** — Store Summary KPIs + Vendor Insights table
- **Sell More Lose Less** — Reclamation, Top Loss No Markdowns, Dept Markdowns
- The tabs auto-rotate on a configurable timer (default 30s). A white progress bar fills across the top to show time remaining.

### Vendor Check-In/Out
- Vendors start as `not-checked-in`. The Check In button promotes the next vendor in order to `checked-in` and moves them to the top of the list.
- Check Out marks the most recently checked-in vendor as `checked-out`.
- Both transitions are animated (row slide/fade). Animation style and duration are configurable via FontSettings.
- "Default" button resets all vendors back to `not-checked-in`.

### FontContext / Display Settings
- All font sizes, spacing values, animation settings, and column layouts live in `FontContext.jsx` with defaults in the `defaults` object.
- Settings are persisted to `localStorage` under key `dsd-display-settings`.
- The hidden `FontSettings` panel (toggled via a secret interaction) exposes sliders/inputs for all settings.
- CSS animation variables (`--anim-row-dur`, `--anim-page-dur`, `--anim-row-ease`, `--anim-page-ease`) are set on `document.documentElement` by FontContext.

**Default values (`src/FontContext.jsx`):**

| Key | Default | Notes |
|-----|---------|-------|
| `fontBody` | `'Nunito'` | Body text font |
| `fontHeading` | `'Nunito'` | Heading font |
| `fontDisplay` | `'Nunito'` | Large display numbers |
| `lineHeight` | `1.2` | |
| `headerTitle` | `20` | px |
| `headerTab` | `16` | px |
| `headerTimestamp` | `16` | px |
| `summaryLabel` | `20` | px |
| `summaryValue` | `30` | px |
| `summarySubLabel` | `18` | px |
| `summarySubLabel2` | `18` | px |
| `tableHeader` | `20` | px |
| `tableSubHeader` | `18` | px |
| `sectionLabel` | `18` | px |
| `vendorName` | `24` | px |
| `vendorMeta` | `20` | px |
| `tableValue` | `30` | px |
| `progressBarH` | `4` | px |
| `headerPY` | `18` | px, vertical padding |
| `sectionLabelPY` | `6` | px |
| `kpiPY` | `10` | px |
| `rowPY` | `4` | px |
| `pagePadding` | `8` | px, left/right |
| `sectionGap` | `8` | px |
| `columnGap` | `10` | px |
| `pageDuration` | `5` | seconds |
| `columnOrder` | `[0,1,5,2,3,4]` | Vendor table column order |
| `columnFlexes` | `[0.3,0.5,0.3,0.6,0.4,0.5]` | Vendor table column widths |
| `vendorColFlex` | `0.35` | Vendor name/logo column width (flex ratio) |
| `vendorLogoSize` | `60` | Vendor logo size (px) |
| `animRowStyle` | `'slide'` | `slide \| fade \| rise \| scale \| none` |
| `animRowDuration` | `400` | ms |
| `animPageStyle` | `'slide'` | `slide \| fade \| rise \| none` |
| `animPageDuration` | `400` | ms |
| `animEasing` | `'ease-out'` | `ease-out \| ease-in-out \| ease \| linear \| spring` |
| `ssPanelTitle` | `16` | px, Sales & Shrink panel heading |
| `ssErLabel` | `18` | px |
| `ssErValue` | `30` | px |
| `ssColHeader` | `16` | px |
| `ssRowUpc` | `16` | px |
| `ssRowDesc` | `16` | px |
| `ssRowValue` | `20` | px |
| `ssErColFlexes` | `[3.2,2,1]` | Reclamation columns |
| `ssZsColFlexes` | `[3.2,2,1]` | Top Loss No Markdowns columns |
| `ssTlColFlexes` | `[1,1,1,1,1,1]` | Dept Markdowns columns |
| `ssPagDuration` | `5` | seconds, Sales & Shrink pagination |

### Data (`src/data.js`)
- `vendors` — array of 10 DSD vendors with per-vendor KPIs and status
- `storeSummary` — 6 store-level KPI cards shown above the vendor table
- `GOALS` — goal thresholds used to color vendor KPI cells green/red
- `reclamation`, `topLossNoMarkdowns`, `departmentMarkdowns` — Sales & Shrink tab data
- `meetsGoal(val, goal)` — utility to evaluate a value against a goal definition

### Colors
- Background: `#2a2a2a`
- Card backgrounds: `#383838` / `#424242`
- Good/green: `#71cc98`
- Bad/red: `#f36c71`
- Check-in blue: `#80bdf0`
- Default font: Nunito

## Notes

- The dashboard is intended to be viewed fullscreen (toggle via the expand icon in the header).
- The store shown is **CI 351**; the branding uses a "Fresh Cart" logo SVG at `designs/fresh-cart.svg`.
- The timestamp in the header ("Updated Apr 6 at 05:31AM") is currently hardcoded.
- Data is all static/demo — no API calls.
