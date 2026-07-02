import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Star } from 'lucide-react'
import confetti from 'canvas-confetti'
import freshCartLogo from '../../designs/fresh-cart.svg'
import { useFonts } from '../FontContext'

export default function VendorWelcome({ vendor, checkedInAt, onDismiss, duration }) {
  const { sizes } = useFonts()
  const elapsedRef = useRef(0)

  useEffect(() => {
    elapsedRef.current = 0
    const interval = setInterval(() => {
      elapsedRef.current += 1
      if (elapsedRef.current >= duration) {
        clearInterval(interval)
        onDismiss()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [vendor.id, duration, onDismiss])

  // Confetti burst on mount
  useEffect(() => {
    const fire = (particleRatio, opts) =>
      confetti({
        origin: { y: 0.4 },
        particleCount: Math.floor(200 * particleRatio),
        ...opts,
      })
    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.20, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.10, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.10, { spread: 120, startVelocity: 45 })
  }, [vendor.id])

  const data = vendor.welcomeData

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-[#2a2a2a] flex flex-col" style={{ fontFamily: `'${sizes.fontBody}', sans-serif` }}>

      {/* Progress bar */}
      <div className="relative bg-[#6d6d6d] flex-shrink-0" style={{ height: sizes.progressBarH }}>
        <div
          key={vendor.id}
          className="absolute left-0 top-0 h-full bg-white"
          style={{ animation: `progressBarFill ${duration}s linear forwards` }}
        />
      </div>

      {/* Header */}
      <header
        className="flex items-center justify-between flex-shrink-0 px-8"
        style={{ paddingTop: sizes.headerPY, paddingBottom: sizes.headerPY, lineHeight: sizes.lineHeight }}
      >
        <div className="flex items-center gap-3">
          <img src={freshCartLogo} alt="Fresh Cart" style={{ height: sizes.headerTitle * 1.1 }} />
          <span className="font-bold text-white" style={{ fontSize: sizes.headerTitle, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>
            DSD Dash
          </span>
          <span
            className="px-2 py-0.5 rounded-md bg-yellow-400 text-[#2a2a2a] font-bold"
            style={{ fontSize: sizes.headerTitle * 0.6 }}
          >
            PLAYGROUND
          </span>
          <div className="w-px self-stretch bg-white opacity-40" />
          <span className="font-bold text-white" style={{ fontSize: sizes.headerTitle, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>
            CI 351
          </span>
        </div>
        <div
          className="px-4 py-1.5 rounded-full bg-white text-[#2a2a2a] font-bold"
          style={{ fontSize: sizes.headerTitle * 0.85, fontFamily: `'${sizes.fontHeading}', sans-serif` }}
        >
          Checked In {checkedInAt}
        </div>
      </header>

      {/* Content */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ padding: `0 ${sizes.pagePadding * 2}px`, paddingBottom: sizes.sectionGap * 2, gap: sizes.sectionGap }}
      >

        {/* Welcome row */}
        <div className="flex items-center justify-between flex-shrink-0">
          <h1
            className="font-bold text-white leading-none"
            style={{ fontSize: sizes.welcomeHeadingSize ?? 60, fontFamily: `'${sizes.fontHeading}', sans-serif` }}
          >
            Welcome, {vendor.repName}
          </h1>
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{
              background: vendor.logoBg,
              height: sizes.welcomeLogoH ?? 80,
              width: (sizes.welcomeLogoH ?? 80) * 1.4,
            }}
          >
            <img
              src={vendor.logo}
              alt={vendor.name}
              style={{ width: '82%', height: '82%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-[#383838] rounded-xl overflow-hidden flex-shrink-0">
          <div
            className="px-6 py-2 text-center font-bold text-white border-b border-[#2a2a2a]"
            style={{ fontSize: sizes.welcomeSectionTitle ?? 20, fontFamily: `'${sizes.fontHeading}', sans-serif` }}
          >
            {vendor.name} Executive Summary &mdash; {data.weekLabel}
          </div>
          <div className="flex divide-x divide-[#2a2a2a]">
            {data.execSummary.map((kpi, i) => (
              <div key={i} className="flex-1 px-4 text-center" style={{ paddingTop: sizes.kpiPY, paddingBottom: sizes.kpiPY }}>
                <div className="text-[#bbb] font-medium" style={{ fontSize: sizes.welcomeKpiLabel ?? 20 }}>
                  {kpi.label}
                </div>
                <div
                  className={`font-bold mt-1 ${
                    kpi.isGood === true  ? 'text-[#71cc98]' :
                    kpi.isGood === false ? 'text-[#f36c71]' :
                    'text-white'
                  }`}
                  style={{ fontSize: sizes.welcomeKpiValue ?? 30, fontFamily: `'${sizes.fontDisplay}', sans-serif` }}
                >
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Uplift */}
        <div className="bg-[#383838] rounded-xl px-5 py-3 flex items-center gap-3 flex-shrink-0">
          <Star size={22} fill="#f5c842" className="text-[#f5c842] flex-shrink-0" />
          <p style={{ fontSize: sizes.welcomeUpliftText ?? 18 }}>
            <span className="font-bold text-[#f5c842]">Vendor Uplift&nbsp;</span>
            <span className="text-white">{data.vendorUplift}</span>
          </p>
        </div>

        {/* Bottom two-column section */}
        <div className="flex gap-4 flex-1 overflow-hidden" style={{ gap: sizes.columnGap }}>

          {/* Top Loss Sale Items */}
          <div className="flex-1 bg-[#383838] rounded-xl overflow-hidden flex flex-col">
            <div
              className="px-5 py-2.5 text-center font-bold text-white border-b border-[#2a2a2a] flex-shrink-0"
              style={{ fontSize: sizes.welcomeSectionTitle ?? 20, fontFamily: `'${sizes.fontHeading}', sans-serif` }}
            >
              Top Loss Sale Items
            </div>
            {/* Column headers */}
            <div
              className="flex px-5 border-b border-[#2a2a2a] flex-shrink-0"
              style={{ paddingTop: sizes.rowPY * 1.5, paddingBottom: sizes.rowPY * 1.5 }}
            >
              <div className="flex-[2] text-[#bbb] font-bold" style={{ fontSize: sizes.welcomeColHeader ?? 18 }}>UPC &amp; Description</div>
              <div className="flex-1 text-right text-[#bbb] font-bold" style={{ fontSize: sizes.welcomeColHeader ?? 18 }}>ISS</div>
              <div className="flex-1 text-right text-[#bbb] font-bold" style={{ fontSize: sizes.welcomeColHeader ?? 18 }}>Lost Sales</div>
              <div className="flex-1 text-right text-[#bbb] font-bold" style={{ fontSize: sizes.welcomeColHeader ?? 18 }}>Days off Sale</div>
            </div>
            {/* Rows */}
            <div className="flex flex-col overflow-y-auto flex-1">
              {data.topLossItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center px-5 border-b border-[#2a2a2a] last:border-b-0"
                  style={{ paddingTop: sizes.rowPY * 1.5, paddingBottom: sizes.rowPY * 1.5 }}
                >
                  <div className="flex-[2]">
                    <div className="font-bold text-white" style={{ fontSize: sizes.welcomeRowPrimary ?? 20 }}>{item.upc}</div>
                    <div className="text-[#aaa]" style={{ fontSize: (sizes.welcomeRowPrimary ?? 20) * 0.85 }}>{item.description}</div>
                  </div>
                  <div
                    className={`flex-1 text-right font-bold ${item.issGood ? 'text-[#71cc98]' : 'text-white'}`}
                    style={{ fontSize: sizes.welcomeRowValue ?? 24, fontFamily: `'${sizes.fontDisplay}', sans-serif` }}
                  >
                    {item.iss}
                  </div>
                  <div
                    className="flex-1 text-right font-bold text-white"
                    style={{ fontSize: sizes.welcomeRowValue ?? 24, fontFamily: `'${sizes.fontDisplay}', sans-serif` }}
                  >
                    {item.lostSales}
                  </div>
                  <div
                    className={`flex-1 text-right font-bold ${
                      item.daysOffSale > item.daysTotal / 2 ? 'text-[#f36c71]' : 'text-white'
                    }`}
                    style={{ fontSize: sizes.welcomeRowValue ?? 24, fontFamily: `'${sizes.fontDisplay}', sans-serif` }}
                  >
                    {item.daysOffSale} of {item.daysTotal} days
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex-1 bg-[#383838] rounded-xl overflow-hidden flex flex-col">
            <div
              className="px-5 py-2.5 text-center font-bold text-white border-b border-[#2a2a2a] flex-shrink-0"
              style={{ fontSize: sizes.welcomeSectionTitle ?? 20, fontFamily: `'${sizes.fontHeading}', sans-serif` }}
            >
              Recommendations
            </div>
            <div className="flex flex-col overflow-y-auto flex-1 divide-y divide-[#2a2a2a]">
              {data.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-5"
                  style={{ paddingTop: sizes.rowPY * 2, paddingBottom: sizes.rowPY * 2 }}
                >
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold flex-shrink-0 mt-0.5 ${
                      rec.priority === 'HIGH'   ? 'bg-[#f36c71] text-white' :
                      rec.priority === 'MEDIUM' ? 'bg-[#f5c842] text-[#2a2a2a]' :
                                                  'bg-[#71cc98] text-[#2a2a2a]'
                    }`}
                    style={{ fontSize: sizes.welcomeRecDesc ?? 17 }}
                  >
                    {rec.priority}
                  </span>
                  <div>
                    <div className="font-bold text-white" style={{ fontSize: sizes.welcomeRecTitle ?? 20 }}>
                      {rec.title}
                    </div>
                    <div className="text-[#aaa] leading-snug mt-0.5" style={{ fontSize: sizes.welcomeRecDesc ?? 17 }}>
                      {rec.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
