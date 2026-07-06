import { useRef, useEffect, useLayoutEffect, useState, useCallback, forwardRef } from 'react'
import { LogIn, LogOut, Clock, Truck, ShoppingBag } from 'lucide-react'
import { GOALS, meetsGoal } from '../data'
import { useFonts } from '../FontContext'

const BLUE  = '#80bdf0'
const RED   = '#f36c71'
const GREEN = '#71cc98'

function ValueCell({ value, goal, format, sizes, forceColor }) {
  if (value == null) return null
  const good = meetsGoal(value, goal)
  const color = forceColor ?? (good === false ? RED : 'white')
  let display = String(value)
  if (format === 'percent') display = `${value.toFixed(2)}%`
  if (format === 'dollar')  display = value < 0 ? `($${Math.abs(value).toLocaleString()})` : `$${value.toLocaleString()}`
  return (
    <span data-skey="tableValue" className="font-medium" style={{ color, fontSize: sizes.tableValue, lineHeight: sizes.lineHeight, fontFamily: `'${sizes.fontDisplay}', sans-serif` }}>
      {display}
    </span>
  )
}

function StatusIcon({ status, size }) {
  if (status === 'checked-in')  return <LogIn  size={size} color={BLUE} />
  if (status === 'checked-out') return <LogOut size={size} color="white" />
  return <Clock size={size} color="white" />
}

function TypeIcon({ type, size }) {
  if (type === 'Delivery')     return <Truck       size={size} color={BLUE} />
  if (type === 'Merchandiser') return <ShoppingBag size={size} color={BLUE} />
  return null
}

function VendorLogo({ vendor, size }) {
  return (
    <div
      data-skey="vendorLogoSize"
      className="rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: vendor.logoBg }}
    >
      {vendor.logo
        ? <img
            src={vendor.logo}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
        : <span className="font-bold text-white" style={{ fontSize: size * 0.3 }}>{vendor.name[0]}</span>
      }
    </div>
  )
}

const VendorRow = forwardRef(function VendorRow({ vendor, animClass, orderedColumns, isCollapsing }, ref) {
  const { sizes } = useFonts()
  const isCheckedIn = vendor.status === 'checked-in'

  // Merge forwarded ref (measurement) with local ref (collapse animation)
  const localRef = useRef(null)
  function mergeRef(el) {
    localRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  // When collapsing: lock height explicitly, then animate to 0 on next frame
  useLayoutEffect(() => {
    const el = localRef.current
    if (!el || !isCollapsing) return
    const h = el.offsetHeight
    el.style.height = h + 'px'
    el.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      el.style.transition = 'height 200ms ease, padding-top 200ms ease, padding-bottom 200ms ease'
      el.style.height = '0px'
      el.style.paddingTop = '0px'
      el.style.paddingBottom = '0px'
    })
  }, [isCollapsing])
  const nameColor = isCheckedIn ? BLUE : 'white'
  const metaColor = isCheckedIn ? BLUE : 'white'
  const logoSize = sizes.vendorLogoSize ?? 44
  const iconSize = Math.max(12, sizes.vendorMeta * 0.85)
  const py = sizes.rowPY

  return (
    <div
      ref={mergeRef}
      className={`bg-[#383838] flex items-center flex-shrink-0 ${animClass ?? ''}`}
      style={{ paddingTop: py, paddingBottom: py, paddingLeft: 24, paddingRight: 12 }}
    >
      <div className="flex items-center gap-6 flex-shrink-0" style={{ flex: sizes.vendorColFlex ?? 0.3 }}>
        <VendorLogo vendor={vendor} size={logoSize} />
        <div className="flex flex-col gap-0 justify-center">
          <span data-skey="vendorName" className="font-bold" style={{ color: nameColor, fontSize: sizes.vendorName, lineHeight: sizes.lineHeight }}>
            {vendor.name}
          </span>
          {(vendor.statusDetail || (vendor.type && isCheckedIn)) && (
            <div className="flex items-center gap-6">
              {vendor.statusDetail && (
                <span data-skey="vendorMeta" className="flex items-center gap-1" style={{ color: metaColor, fontSize: sizes.vendorMeta }}>
                  <StatusIcon status={vendor.status} size={iconSize} />
                  {vendor.statusDetail}
                </span>
              )}
              {vendor.type && isCheckedIn && (
                <span data-skey="vendorMeta" className="flex items-center gap-1" style={{ color: metaColor, fontSize: sizes.vendorMeta }}>
                  <TypeIcon type={vendor.type} size={iconSize} />
                  {vendor.type}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-around text-center" style={{ gap: sizes.columnGap }}>
        {orderedColumns.map(({ dataKey, goal, format, forceColorFn, flex, origIdx }) => (
          <div key={origIdx} style={{ flex }}>
            <ValueCell
              value={vendor[dataKey]}
              goal={goal}
              format={format}
              sizes={sizes}
              forceColor={forceColorFn ? forceColorFn(vendor[dataKey]) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  )
})

function SectionLabel({ label, fontSize, py, count }) {
  return (
    <div className="bg-[#424242] rounded-t-xl px-6 flex-shrink-0 flex items-center gap-2" style={{ paddingTop: py, paddingBottom: py }}>
      <span data-skey="sectionLabel" className="font-medium text-white" style={{ fontSize }}>{label}</span>
      {count != null && (
        <span
          className="flex items-center justify-center rounded-full bg-[#6d6d6d] text-white font-bold flex-shrink-0"
          style={{ fontSize: fontSize * 0.7, width: fontSize * 1.4, height: fontSize * 1.4 }}
        >
          {count}
        </span>
      )}
    </div>
  )
}

function Gap() {
  return <div className="h-2 bg-[#2a2a2a] flex-shrink-0" />
}

function Pagination({ totalPages, currentPage, pageKey, pageDuration, onPageChange }) {
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

export const COLUMNS = [
  { heading: 'Robot\nOut Of Stock',            sub: '\u00A0',         dataKey: 'outOfStock',         goal: null,                   format: null,      forceColorFn: v => v >= 10 ? RED : GREEN },
  { heading: 'DSD\nCredits',                   sub: 'Goal > 2.50%',  dataKey: 'dsdCredits',         goal: GOALS.dsdCredits,       format: 'percent', forceColorFn: v => v > 2.5 ? GREEN : RED },
  { heading: 'Over Delivered',                sub: '\u00A0',         dataKey: 'overDelivered',      goal: null,                   format: 'dollar',  forceColorFn: () => 'white' },
  { heading: 'GlobalWorx\nUnresolved Issues', sub: 'Goal ≤ 2',      dataKey: 'globalWorxIssues',   goal: GOALS.globalWorxIssues, format: null,      forceColorFn: v => v <= 2 ? GREEN : RED },
  { heading: 'Missed\nCheck Out',             sub: 'Goal < 1',      dataKey: 'missedCheckOut',     goal: GOALS.missedCheckOut,   format: null,      forceColorFn: v => v < 1 ? GREEN : RED },
  { heading: 'Weeks\nWithout Credit',         sub: 'Goal = 0',      dataKey: 'weeksWithoutCredit', goal: null,                   format: null,      forceColorFn: v => v === 0 ? GREEN : RED },
]

export default function VendorInsights({ vendors, checkingInId, checkingOutId, recentlyCheckedInId, recentlyCheckedOutId }) {
  const { sizes } = useFonts()
  const pageDuration = sizes.pageDuration ?? 5

  const animRowDuration = sizes.animRowDuration ?? 400

  // Phase 2 of check-in: after the row slides out, collapse its height so rows below move up
  const [collapsingId, setCollapsingId] = useState(null)
  useEffect(() => {
    if (checkingInId === null) { setCollapsingId(null); return }
    const t = setTimeout(() => setCollapsingId(checkingInId), animRowDuration)
    return () => clearTimeout(t)
  }, [checkingInId, animRowDuration])

  // Phase 2 of check-out: after the row slides out, collapse its height so rows below move up
  const [collapsingOutId, setCollapsingOutId] = useState(null)
  useEffect(() => {
    if (checkingOutId === null) { setCollapsingOutId(null); return }
    const t = setTimeout(() => setCollapsingOutId(checkingOutId), animRowDuration)
    return () => clearTimeout(t)
  }, [checkingOutId, animRowDuration])

  const orderedColumns = (sizes.columnOrder ?? [0, 1, 5, 2, 3, 4]).map(origIdx => ({
    ...COLUMNS[origIdx],
    origIdx,
    flex: (sizes.columnFlexes ?? [1, 1, 1, 1, 1, 1])[origIdx],
  }))

  const checkedIn    = vendors.filter(v => v.status === 'checked-in')
  const notCheckedIn = vendors.filter(v => v.status === 'not-checked-in')
  const checkedOut   = vendors.filter(v => v.status === 'checked-out')
  // checked-in always visible at top; not-checked-in first, then checked-out at bottom
  const topVendors       = [...checkedIn]
  const paginatedVendors = [...notCheckedIn, ...checkedOut]

  // ── Dynamic rows-per-page: measure container + actual row from DOM ─────────
  const containerRef = useRef(null)
  const [availableHeight, setAvailableHeight] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new ResizeObserver(([entry]) => setAvailableHeight(entry.contentRect.height))
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Measure the actual rendered height of the first VendorRow via a callback ref.
  // Falls back to a formula estimate until the first row mounts.
  const [measuredRowH, setMeasuredRowH] = useState(0)
  const rowObserver = useRef(null)
  const rowCallbackRef = useCallback(el => {
    if (rowObserver.current) { rowObserver.current.disconnect(); rowObserver.current = null }
    if (!el) return
    const update = () => setMeasuredRowH(el.offsetHeight + 2) // +2 for gap-0.5 between rows
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    rowObserver.current = obs
  }, [])

  const estimatedRowH = Math.max(
    Math.max(32, sizes.vendorName * 1.8),
    Math.ceil(sizes.vendorName * sizes.lineHeight) + Math.ceil(sizes.vendorMeta * sizes.lineHeight) + 4
  ) + sizes.rowPY * 2 + 2

  const rowH = measuredRowH > 0 ? measuredRowH : estimatedRowH

  // Subtract one section label's height from usable space (always present at page top)
  const sectionLabelH = Math.ceil(sizes.sectionLabel * sizes.lineHeight) + sizes.sectionLabelPY * 2 + 2
  const usableHeight  = Math.max(0, availableHeight - sectionLabelH)
  const rowsPerPage   = usableHeight > 0 ? Math.max(1, Math.floor(usableHeight / rowH)) : 4

  // ── Pagination state ───────────────────────────────────────────────────────
  const totalPages      = Math.max(1, Math.ceil(paginatedVendors.length / rowsPerPage))
  const [currentPage, setCurrentPage] = useState(0)
  const [pageKey,     setPageKey]     = useState(0)
  const [timerKey,    setTimerKey]    = useState(0)

  const safePage      = Math.min(currentPage, totalPages - 1)
  const pageVendors   = paginatedVendors.slice(safePage * rowsPerPage, (safePage + 1) * rowsPerPage)

  // Auto-advance pages
  useEffect(() => {
    if (totalPages <= 1) return
    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages)
      setPageKey(k => k + 1)
    }, pageDuration * 1000)
    return () => clearInterval(timer)
  }, [totalPages, timerKey, pageDuration])

  function handlePageChange(page) {
    setCurrentPage(page)
    setPageKey(k => k + 1)
    setTimerKey(k => k + 1)
  }

  // After check-in completes, jump to page 0 so the new checked-in row is visible
  const prevCheckingInId = useRef(null)
  useEffect(() => {
    if (prevCheckingInId.current !== null && checkingInId === null) {
      setCurrentPage(0)
      setPageKey(k => k + 1)
      setTimerKey(k => k + 1)
    }
    prevCheckingInId.current = checkingInId
  }, [checkingInId])

  const rowStyle = sizes.animRowStyle ?? 'slide'

  function getAnimClass(v) {
    const isExiting  = v.id === checkingInId || v.id === checkingOutId
    const isEntering = v.id === recentlyCheckedInId || v.id === recentlyCheckedOutId

    if (rowStyle === 'none') return undefined

    if (isExiting) {
      if (rowStyle === 'slide' || rowStyle === 'slide-nf') return v.id === checkingInId ? 'row-exit-left' : 'row-exit-right'
      if (rowStyle === 'fade')  return 'row-exit-fade'
      if (rowStyle === 'rise')  return 'row-exit-sink'
      if (rowStyle === 'scale') return 'row-exit-scale'
    }

    if (isEntering) {
      if (rowStyle === 'slide')    return v.status === 'checked-in' ? 'row-enter-checked-in' : 'row-enter-checked-out'
      if (rowStyle === 'slide-nf') return v.status === 'checked-in' ? 'row-enter-left' : 'row-enter-right'
      if (rowStyle === 'fade')  return 'row-enter-fade'
      if (rowStyle === 'rise')  return 'row-enter-rise'
      if (rowStyle === 'scale') return 'row-enter-scale'
    }

    return undefined
  }

  const pageAnimClass = {
    slide: 'page-slide-in',
    fade:  'page-fade-in',
    rise:  'page-rise-in',
    none:  '',
  }[sizes.animPageStyle ?? 'slide'] ?? 'page-slide-in'

  // ── Always-visible: checked-in only ───────────────────────────────────────
  function renderTopItems() {
    if (topVendors.length === 0) return null
    const items = []
    items.push(
      <SectionLabel
        key="top-label-checked-in"
        label="In Store"
        fontSize={sizes.sectionLabel}
        py={sizes.sectionLabelPY}
        count={topVendors.length}
      />
    )
    topVendors.forEach((v, i) => {
      const ref = i === 0 ? rowCallbackRef : null
      items.push(<VendorRow key={v.id} ref={ref} vendor={v} animClass={getAnimClass(v)} orderedColumns={orderedColumns} isCollapsing={v.id === collapsingOutId} />)
    })
    return items
  }

  // ── Paginated: not-checked-in + checked-out (all under "Not In Store") ──────
  function renderPageItems() {
    const items = []
    let firstRow = topVendors.length === 0
    pageVendors.forEach((v, i) => {
      if (i === 0) {
        items.push(
          <SectionLabel
            key="label-not-in-store"
            label="Not In Store"
            fontSize={sizes.sectionLabel}
            py={sizes.sectionLabelPY}
          />
        )
      }
      const ref = firstRow ? rowCallbackRef : null
      firstRow = false
      items.push(<VendorRow key={v.id} ref={ref} vendor={v} animClass={getAnimClass(v)} orderedColumns={orderedColumns} isCollapsing={v.id === collapsingId} />)
    })
    return items
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 gap-0.5">

      {/* ── Standalone header bar ── */}
      <div
        className="bg-[#424242] rounded-xl flex items-center flex-shrink-0"
        style={{ paddingLeft: 24, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}
      >
        <div className="flex items-center flex-shrink-0" style={{ flex: sizes.vendorColFlex ?? 0.3 }}>
          <span data-skey="tableHeader" className="font-bold text-white" style={{ fontSize: sizes.tableHeader, lineHeight: sizes.lineHeight, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>
            Vendor Insights
          </span>
        </div>
        <div className="flex-1 flex items-center justify-around text-center" style={{ gap: sizes.columnGap }}>
          {orderedColumns.map(({ heading, sub, flex, origIdx }) => (
            <div key={origIdx} style={{ flex }} className="flex flex-col items-center justify-center">
              <span data-skey="tableHeader" className="font-bold text-white" style={{ fontSize: sizes.tableHeader, lineHeight: sizes.lineHeight, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>
                {heading.split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}
              </span>
              {sub && (
                <span data-skey="tableSubHeader" className="font-light text-white" style={{ fontSize: sizes.tableSubHeader, lineHeight: sizes.lineHeight }}>
                  {sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Always-visible: checked-in ── */}
      {topVendors.length > 0 && (
        <div className="flex-shrink-0 flex flex-col gap-0.5">
          {renderTopItems()}
        </div>
      )}

      {topVendors.length > 0 && paginatedVendors.length > 0 && <Gap />}

      {/* ── Paginated: not-checked-in + checked-out ── */}
      <div ref={containerRef} className="flex-1 overflow-hidden min-h-0">
        <div key={pageKey} className={`${pageAnimClass} flex flex-col gap-0.5`}>
          {renderPageItems()}
        </div>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={safePage}
        pageKey={pageKey}
        pageDuration={pageDuration}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
