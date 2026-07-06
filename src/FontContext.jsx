import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'dsd-display-settings'

export const defaults = {
  // Font sizes
  headerTitle: 20,
  headerTab: 16,
  headerTimestamp: 16,
  summaryLabel: 20,
  summaryValue: 30,
  summarySubLabel: 18,
  summarySubLabel2: 18,
  tableHeader: 20,
  tableSubHeader: 18,
  sectionLabel: 18,
  vendorName: 24,
  vendorMeta: 20,
  tableValue: 30,
  // Line height
  lineHeight: 1.2,
  // Spacing (px)
  progressBarH: 4,
  headerPY: 18,
  sectionLabelPY: 6,
  kpiPY: 10,
  rowPY: 4,
  pagePadding: 8,
  sectionGap: 8,
  columnGap: 10,
  pageDuration: 5,
  columnOrder: [0, 1, 5, 2, 3, 4],
  columnFlexes: [0.3, 0.5, 0.3, 0.6, 0.4, 0.5],
  vendorColFlex: 0.35,
  vendorLogoSize: 60,
  // Fonts
  fontBody:    'Nunito',
  fontHeading: 'Nunito',
  fontDisplay: 'Nunito',
  // Animations
  animRowStyle:     'slide',    // slide | fade | rise | scale | none
  animRowDuration:  400,        // ms
  animPageStyle:    'slide',    // slide | fade | rise | none
  animPageDuration: 400,        // ms
  animSsStyle:      'slide',    // slide | fade | rise | none  (S&S panel pagination)
  animSsDuration:   400,        // ms
  animEasing:       'ease-out', // ease-out | ease-in-out | ease | linear | spring
  // Sales & Shrink font sizes
  ssPanelTitle:     16,             // panel section heading (e.g. "Reclamation (Previous Week)")
  ssErLabel:        18,             // KPI label text
  ssErValue:        30,             // KPI value text (large number)
  ssColHeader:      16,             // column header row
  ssRowUpc:         16,             // row primary text (ID / UPC)
  ssRowDesc:        16,             // row secondary text (description) — Regular weight
  ssRowValue:       20,             // row value (store response, amounts) in top panels
  // Sales & Shrink column flex widths
  ssErColFlexes:    [3.2, 2, 1],    // Reclamation: [Event, Store Response, $ Received]
  ssZsColFlexes:    [3.2, 2, 1],    // Top Loss No Markdowns: [UPC & Desc, Total Units, Shipped Cost]
  ssTlColFlexes:    [1, 1, 1, 1, 1, 1], // Dept Markdowns: [Dept, MD Units, Loss Units, Total Loss $, MD Eff, Loss No MD]
  // Sales & Shrink pagination
  ssPagDuration:    5,
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      // Migrate: drop old column settings so new 6-column defaults take effect
      if (saved.columnOrder?.length !== 6 || saved.columnFlexes?.length !== 6) {
        delete saved.columnOrder
        delete saved.columnFlexes
      }
      return { ...defaults, ...saved }
    }
  } catch {}
  return defaults
}

const FontContext = createContext(null)

export function FontProvider({ children }) {
  const [sizes, setSizes] = useState(loadSaved)

  function set(key, value) {
    setSizes(prev => ({ ...prev, [key]: value }))
  }

  function save(currentSizes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSizes))
  }

  function reset() {
    setSizes(defaults)
    localStorage.removeItem(STORAGE_KEY)
  }

  const EASING_MAP = {
    'ease-out':    'ease-out',
    'ease-in-out': 'ease-in-out',
    'ease':        'ease',
    'linear':      'linear',
    'spring':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
  }

  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--anim-row-dur',   `${sizes.animRowDuration ?? 400}ms`)
    r.style.setProperty('--anim-page-dur',  `${sizes.animPageDuration ?? 400}ms`)
    r.style.setProperty('--anim-ss-dur',    `${sizes.animSsDuration ?? 400}ms`)
    r.style.setProperty('--anim-row-ease',  EASING_MAP[sizes.animEasing] ?? 'ease-out')
    r.style.setProperty('--anim-page-ease', EASING_MAP[sizes.animEasing] ?? 'ease-out')
    r.style.setProperty('--anim-ss-ease',   EASING_MAP[sizes.animEasing] ?? 'ease-out')
  }, [sizes.animRowDuration, sizes.animPageDuration, sizes.animSsDuration, sizes.animEasing])

  return (
    <FontContext.Provider value={{ sizes, set, save, reset }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFonts() {
  return useContext(FontContext)
}
