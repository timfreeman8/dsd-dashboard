import { useState, useEffect, useRef, useCallback } from 'react'
import { Wheat, Apple, Beef, Milk, Sandwich, Thermometer, Utensils, Package, Fish, Store, Shell, Salad, Star, Carrot } from 'lucide-react'
import { useFonts } from '../FontContext'
import { reclamation, topLossNoMarkdowns, departmentMarkdowns } from '../data'

const DEPT_ICONS = {
  '40': { Icon: Wheat,       color: '#f59e0b' }, // Bakery
  '19': { Icon: Apple,       color: '#22c55e' }, // Fresh Produce
  '09': { Icon: Beef,        color: '#ef4444' }, // Meat
  '95': { Icon: Milk,        color: '#60a5fa' }, // Dairy
  '10': { Icon: Sandwich,    color: '#eab308' }, // Deli Packaged
  '02': { Icon: Thermometer, color: '#06b6d4' }, // Refrig Grocery
  '15': { Icon: Utensils,    color: '#a855f7' }, // Deli
  '71': { Icon: Package,     color: '#f97316' }, // Pkg Meat
  '69': { Icon: Fish,        color: '#14b8a6' }, // Seafood
  '73': { Icon: Store,       color: '#6366f1' }, // Fresh Food Dest
  '70': { Icon: Shell,       color: '#3b82f6' }, // Pkg Seafood
  '56': { Icon: Salad,       color: '#84cc16' }, // Salad Sandwich
  '49': { Icon: Star,        color: '#fbbf24' }, // Specialty Chs
  '07': { Icon: Carrot,      color: '#fb923c' }, // Package Produce
}

const RED   = '#f36c71'
const GREEN = '#71cc98'

// ── Shared pagination dots ────────────────────────────────────────────────────

function PaginationDots({ totalPages, currentPage, pageKey, pageDuration, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-4 py-2 flex-shrink-0">
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i}
          className="relative h-1 w-20 bg-[#6d6d6d] rounded-full overflow-hidden cursor-pointer"
          onClick={() => onPageChange(i)}
        >
          {i === currentPage && (
            <div
              key={pageKey}
              className="absolute left-0 top-0 h-full bg-white rounded-full"
              style={{ animation: `fillProgress ${pageDuration}s linear forwards` }}
            />
          )}
          {i < currentPage && (
            <div className="absolute left-0 top-0 h-full w-full bg-white/50 rounded-full" />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Pagination hook ───────────────────────────────────────────────────────────

function usePagination({ items, rowH, availH, pageDuration, outerPageKey, maxRows }) {
  const natural     = availH > 0 && rowH > 0 ? Math.max(1, Math.floor(availH / rowH)) : (maxRows ?? 5)
  const rowsPerPage = maxRows != null ? maxRows : natural
  const totalPages  = Math.max(1, Math.ceil(items.length / rowsPerPage))

  const [currentPage, setCurrentPage] = useState(0)
  const [pageKey,     setPageKey]     = useState(0)
  const [timerKey,    setTimerKey]    = useState(0)

  const safePage  = Math.min(currentPage, totalPages - 1)
  const pageItems = items.slice(safePage * rowsPerPage, (safePage + 1) * rowsPerPage)

  useEffect(() => {
    if (totalPages <= 1) return
    const t = setInterval(() => {
      setCurrentPage(p => (p + 1) % totalPages)
      setPageKey(k => k + 1)
    }, pageDuration * 1000)
    return () => clearInterval(t)
  }, [totalPages, timerKey, pageDuration])

  useEffect(() => {
    setCurrentPage(0)
    setPageKey(k => k + 1)
    setTimerKey(k => k + 1)
  }, [outerPageKey])

  function handlePageChange(p) {
    setCurrentPage(p)
    setPageKey(k => k + 1)
    setTimerKey(k => k + 1)
  }

  return { safePage, pageKey, pageItems, totalPages, handlePageChange }
}

// ── Reclamation panel ─────────────────────────────────────────────────────────

function ReclamationPanel({ sizes, outerPageKey }) {
  const {
    ssPanelTitle, ssColHeader, ssErLabel, ssErValue,
    ssRowUpc, ssRowDesc, ssRowValue,
    fontHeading, fontDisplay, fontBody, lineHeight,
    ssErColFlexes, ssPagDuration, animPageStyle,
  } = sizes

  const flexes   = ssErColFlexes ?? [3, 2, 1]
  const pageDur  = ssPagDuration ?? 5
  const pageAnim = { slide: 'page-slide-in', fade: 'page-fade-in', rise: 'page-rise-in', none: '' }[animPageStyle ?? 'slide'] ?? 'page-slide-in'

  const { totalReclaim, reclaimHold, events } = reclamation

  const containerRef = useRef(null)
  const [availH, setAvailH] = useState(0)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(([e]) => setAvailH(e.contentRect.height))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [measuredRowH, setMeasuredRowH] = useState(0)
  const rowObsRef = useRef(null)
  const rowRef = useCallback(el => {
    if (rowObsRef.current) { rowObsRef.current.disconnect(); rowObsRef.current = null }
    if (!el) return
    const update = () => setMeasuredRowH(el.offsetHeight + 2)
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    rowObsRef.current = obs
  }, [])

  const estRowH = Math.ceil(ssRowUpc * lineHeight) + Math.ceil(ssRowDesc * lineHeight) + 20
  const rowH    = measuredRowH > 0 ? measuredRowH : estRowH

  const { safePage, pageKey, pageItems, totalPages, handlePageChange } = usePagination({
    items: events, rowH, availH, pageDuration: pageDur, outerPageKey, maxRows: 5,
  })

  return (
    <div className="flex-1 flex flex-col min-h-0 gap-0.5">
      <div className="bg-[#424242] rounded-t-xl px-5 py-0.5 text-center flex-shrink-0">
        <span className="font-bold text-white" style={{ fontSize: ssPanelTitle, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
          Reclamation (Previous Week)
        </span>
      </div>

      <div className="flex gap-0.5 flex-shrink-0">
        <div className="flex-1 bg-[#383838] flex flex-col items-center justify-center text-center py-1">
          <span className="font-bold text-white" style={{ fontSize: ssErLabel, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
            Total Reclaim
          </span>
          <span className="font-bold" style={{ color: GREEN, fontSize: ssErValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
            ${totalReclaim.toLocaleString()}
          </span>
        </div>
        <div className="flex-1 bg-[#383838] flex flex-col items-center justify-center text-center py-1">
          <span className="font-bold text-white" style={{ fontSize: ssErLabel, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
            Scanned at Reclaim (HOLD)
          </span>
          <span className="font-bold" style={{ color: RED, fontSize: ssErValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
            ${reclaimHold.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="bg-[#424242] flex items-center gap-6 px-3 py-2 flex-shrink-0">
        <div style={{ flex: flexes[0] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>Event</span>
        </div>
        <div style={{ flex: flexes[1] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>Store Response</span>
        </div>
        <div style={{ flex: flexes[2] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>$ Received</span>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-hidden min-h-0">
        <div key={pageKey} className={`${pageAnim} flex flex-col gap-0.5`}>
          {pageItems.map((ev, idx) => (
            <div
              key={`${ev.id}-${idx}`}
              ref={idx === 0 ? rowRef : null}
              className="bg-[#383838] flex items-center gap-6 px-3 py-2"
            >
              <div style={{ flex: flexes[0], minWidth: 0 }}>
                <div className="font-bold text-white" style={{ fontSize: ssRowUpc, lineHeight, fontFamily: `'${fontBody}', sans-serif` }}>
                  {ev.id}
                </div>
                <div className="text-white" style={{ fontSize: ssRowDesc, lineHeight, fontFamily: `'${fontBody}', sans-serif`, fontWeight: 'normal' }}>
                  {ev.name}
                </div>
              </div>
              <div style={{ flex: flexes[1] }}>
                <span className="font-bold text-white" style={{ fontSize: ssRowValue, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
                  {ev.storeResponse}
                </span>
              </div>
              <div style={{ flex: flexes[2] }}>
                <span className="font-bold text-white" style={{ fontSize: ssRowValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
                  ${ev.received > 0 ? ev.received.toLocaleString() : '0'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaginationDots
        totalPages={totalPages} currentPage={safePage}
        pageKey={pageKey} pageDuration={pageDur}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

// ── Top Loss No Markdowns panel ───────────────────────────────────────────────

function TopLossNoMarkdownsPanel({ sizes, outerPageKey }) {
  const {
    ssPanelTitle, ssColHeader, ssErLabel, ssErValue,
    ssRowUpc, ssRowDesc, ssRowValue,
    fontHeading, fontDisplay, fontBody, lineHeight,
    ssZsColFlexes, ssPagDuration, animPageStyle,
  } = sizes

  const flexes   = ssZsColFlexes ?? [3, 1, 1]
  const pageDur  = ssPagDuration ?? 5
  const pageAnim = { slide: 'page-slide-in', fade: 'page-fade-in', rise: 'page-rise-in', none: '' }[animPageStyle ?? 'slide'] ?? 'page-slide-in'

  const { itemsWithZeroSales, totalShippedCost, items } = topLossNoMarkdowns

  const containerRef = useRef(null)
  const [availH, setAvailH] = useState(0)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(([e]) => setAvailH(e.contentRect.height))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [measuredRowH, setMeasuredRowH] = useState(0)
  const rowObsRef = useRef(null)
  const rowRef = useCallback(el => {
    if (rowObsRef.current) { rowObsRef.current.disconnect(); rowObsRef.current = null }
    if (!el) return
    const update = () => setMeasuredRowH(el.offsetHeight + 2)
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    rowObsRef.current = obs
  }, [])

  const estRowH = Math.ceil(ssRowUpc * lineHeight) + Math.ceil(ssRowDesc * lineHeight) + 20
  const rowH    = measuredRowH > 0 ? measuredRowH : estRowH

  const { safePage, pageKey, pageItems, totalPages, handlePageChange } = usePagination({
    items, rowH, availH, pageDuration: pageDur, outerPageKey, maxRows: 5,
  })

  return (
    <div className="flex-1 flex flex-col min-h-0 gap-0.5">
      <div className="bg-[#424242] rounded-t-xl px-5 py-0.5 text-center flex-shrink-0">
        <span className="font-bold text-white" style={{ fontSize: ssPanelTitle, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
          Top Loss No Markdowns
        </span>
      </div>

      <div className="flex gap-0.5 flex-shrink-0">
        <div className="flex-1 bg-[#383838] flex flex-col items-center justify-center text-center py-1">
          <span className="font-bold text-white" style={{ fontSize: ssErLabel, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
            Items with Zero Sales
          </span>
          <span className="font-bold" style={{ color: RED, fontSize: ssErValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
            {itemsWithZeroSales}
          </span>
        </div>
        <div className="flex-1 bg-[#383838] flex flex-col items-center justify-center text-center py-1">
          <span className="font-bold text-white" style={{ fontSize: ssErLabel, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
            Total Shipped Cost
          </span>
          <span className="font-bold" style={{ color: RED, fontSize: ssErValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
            {totalShippedCost}
          </span>
        </div>
      </div>

      {/* Column headers — all left-aligned */}
      <div className="bg-[#424242] flex items-center gap-2 px-3 py-2 flex-shrink-0">
        <div style={{ flex: flexes[0] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>UPC &amp; Description</span>
        </div>
        <div style={{ flex: flexes[1] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>Total Units</span>
        </div>
        <div style={{ flex: flexes[2] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>Shipped Cost</span>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-visible min-h-0">
        <div key={pageKey} className={`${pageAnim} flex flex-col gap-0.5`}>
          {pageItems.map((item, idx) => (
            <div
              key={item.upc}
              ref={idx === 0 ? rowRef : null}
              className="bg-[#383838] flex items-center gap-2 px-3 py-1"
            >
              <div style={{ flex: flexes[0] }}>
                <div className="font-bold text-white" style={{ fontSize: ssRowUpc, lineHeight, fontFamily: `'${fontBody}', sans-serif` }}>
                  {item.upc}
                </div>
                <div className="text-white" style={{ fontSize: ssRowDesc, lineHeight, fontFamily: `'${fontBody}', sans-serif`, fontWeight: 'normal' }}>
                  {item.description}
                </div>
              </div>
              <div style={{ flex: flexes[1] }}>
                <span className="font-bold text-white" style={{ fontSize: ssRowValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
                  {item.units ?? ''}
                </span>
              </div>
              <div style={{ flex: flexes[2] }}>
                <span className="font-bold text-white" style={{ fontSize: ssRowValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
                  {item.shippedCost}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <PaginationDots
            totalPages={totalPages} currentPage={safePage}
            pageKey={pageKey} pageDuration={pageDur}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

// ── Department Markdowns & Scanned Loss panel ─────────────────────────────────

function DepartmentMarkdownsPanel({ sizes, outerPageKey }) {
  const {
    ssPanelTitle, ssColHeader, ssErLabel, ssErValue, ssRowUpc,
    fontHeading, fontDisplay, fontBody, lineHeight,
    ssTlColFlexes, ssPagDuration, animPageStyle,
  } = sizes

  const flexes   = ssTlColFlexes ?? [2, 1, 1, 1, 1, 1]
  const pageDur  = ssPagDuration ?? 5
  const pageAnim = { slide: 'page-slide-in', fade: 'page-fade-in', rise: 'page-rise-in', none: '' }[animPageStyle ?? 'slide'] ?? 'page-slide-in'

  const { kpis, departments } = departmentMarkdowns

  const containerRef = useRef(null)
  const [availH, setAvailH] = useState(0)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(([e]) => setAvailH(e.contentRect.height))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const [measuredRowH, setMeasuredRowH] = useState(0)
  const rowObsRef = useRef(null)
  const rowRef = useCallback(el => {
    if (rowObsRef.current) { rowObsRef.current.disconnect(); rowObsRef.current = null }
    if (!el) return
    const update = () => setMeasuredRowH(el.offsetHeight + 2)
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    rowObsRef.current = obs
  }, [])

  const estRowH = Math.ceil(ssRowUpc * lineHeight) + 12
  const rowH    = measuredRowH > 0 ? measuredRowH : estRowH

  const { safePage, pageKey, pageItems, totalPages, handlePageChange } = usePagination({
    items: departments, rowH, availH, pageDuration: pageDur, outerPageKey,
  })

  const fmtLoss = n =>
    `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const kpiCards = [
    { label: 'Markdown Units Sold',          value: kpis.markdownUnitsSold.toLocaleString() },
    { label: 'Total Loss Units',              value: kpis.totalLossUnits.toLocaleString() },
    { label: 'Total Loss $',                 value: `$${kpis.totalLossDollars.toLocaleString()}` },
    { label: 'Markdown Effectiveness',        value: `${kpis.markdownEffectiveness}%` },
    { label: 'Total Loss Units No Markdown',  value: kpis.totalLossUnitsNoMarkdown.toLocaleString() },
  ]

  const colHeaders = [
    'MD Units/lbs Sold', 'Loss Units', 'Total Loss $', 'Markdown Effectiveness', 'Total Loss Units No MD',
  ]

  return (
    <div className="flex-1 flex flex-col min-h-0 gap-0.5">
      <div className="bg-[#424242] rounded-t-xl px-5 py-0.5 text-center flex-shrink-0">
        <span className="font-bold text-white" style={{ fontSize: ssPanelTitle, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
          Department Markdowns &amp; Scanned Loss
        </span>
      </div>

      <div className="flex gap-0.5 flex-shrink-0">
        {kpiCards.map(({ label, value }) => (
          <div key={label} className="flex-1 bg-[#383838] flex flex-col items-center justify-center text-center py-1">
            <span className="font-bold text-white" style={{ fontSize: ssErLabel, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>
              {label}
            </span>
            <span className="font-bold" style={{ color: RED, fontSize: ssErValue, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Column headers — all left-aligned */}
      <div className="bg-[#424242] flex items-center gap-2 px-3 py-2 flex-shrink-0">
        <div style={{ flex: flexes[0] }}>
          <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>Department</span>
        </div>
        {colHeaders.map((h, i) => (
          <div key={h} style={{ flex: flexes[i + 1] ?? 1 }}>
            <span className="font-bold text-white" style={{ fontSize: ssColHeader, lineHeight, fontFamily: `'${fontHeading}', sans-serif` }}>{h}</span>
          </div>
        ))}
      </div>

      <div ref={containerRef} className="flex-1 overflow-hidden min-h-0">
        <div key={pageKey} className={`${pageAnim} flex flex-col gap-0.5`}>
          {pageItems.map((dept, idx) => (
            <div
              key={`${dept.dept}-${dept.name}-${idx}`}
              ref={idx === 0 ? rowRef : null}
              className="bg-[#383838] flex items-center gap-2 px-3 py-1"
            >
              <div style={{ flex: flexes[0] }} className="flex items-center gap-2">
                <span className="font-bold text-white" style={{ fontSize: ssRowUpc, lineHeight, fontFamily: `'${fontBody}', sans-serif` }}>
                  {dept.dept}
                </span>
                <span className="text-white" style={{ fontSize: ssRowUpc, lineHeight, fontFamily: `'${fontBody}', sans-serif`, fontWeight: 'normal' }}>
                  {dept.name}
                </span>
              </div>
              {[
                dept.mdUnits != null ? dept.mdUnits.toLocaleString() : '',
                dept.lossUnits.toLocaleString(),
                fmtLoss(dept.totalLoss),
                dept.mdEffectiveness != null ? `${dept.mdEffectiveness}%` : '',
                dept.lossUnitsNoMd.toLocaleString(),
              ].map((val, i) => (
                <div key={i} style={{ flex: flexes[i + 1] ?? 1 }}>
                  <span className="font-bold text-white" style={{ fontSize: ssRowUpc, lineHeight, fontFamily: `'${fontDisplay}', sans-serif` }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <PaginationDots
        totalPages={totalPages} currentPage={safePage}
        pageKey={pageKey} pageDuration={pageDur}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────

export default function SalesAndShrink() {
  const { sizes } = useFonts()
  const [outerPageKey] = useState(0)

  const pageAnimClass = {
    slide: 'page-slide-in', fade: 'page-fade-in', rise: 'page-rise-in', none: '',
  }[sizes.animPageStyle ?? 'slide'] ?? 'page-slide-in'

  return (
    <div className={`flex-1 flex flex-col gap-6 min-h-0 pt-2 ${pageAnimClass}`}>
      {/* Top row: Reclamation (left) + Top Loss No Markdowns (right) — gap-4 for horizontal breathing room */}
      <div className="flex gap-4 min-h-0" style={{ flex: 3 }}>
        <ReclamationPanel sizes={sizes} outerPageKey={outerPageKey} />
        <TopLossNoMarkdownsPanel sizes={sizes} outerPageKey={outerPageKey} />
      </div>

      {/* Bottom: Department Markdowns & Scanned Loss (full width) */}
      <div className="flex flex-col min-h-0" style={{ flex: 3 }}>
        <DepartmentMarkdownsPanel sizes={sizes} outerPageKey={outerPageKey} />
      </div>
    </div>
  )
}
