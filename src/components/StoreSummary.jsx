import { storeSummary } from '../data'
import { useFonts } from '../FontContext'

export default function StoreSummary() {
  const { sizes } = useFonts()

  return (
    <div className="flex-shrink-0 flex flex-col gap-0.5">
      {/* Title bar */}
      <div className="bg-[#424242] rounded-t-xl px-6 py-3 text-center">
        <span className="font-bold text-white" style={{ fontSize: sizes.tableHeader, lineHeight: sizes.lineHeight, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>
          DSD Store Summary
        </span>
      </div>
      {/* KPI row */}
      <div className="flex gap-0.5">
        {storeSummary.map((item, i) => (
          <KpiCard
            key={i}
            {...item}
            roundedBl={i === 0}
            roundedBr={i === storeSummary.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function KpiCard({ label, valueDisplay, subLabel, subLabel2, isGood, roundedBl, roundedBr }) {
  const { sizes } = useFonts()
  const valueColor = isGood ? 'text-[#71cc98]' : 'text-[#f36c71]'

  return (
    <div
      className={`bg-[#383838] flex-1 flex flex-col items-center justify-center text-center px-3 ${roundedBl ? 'rounded-bl-xl' : ''} ${roundedBr ? 'rounded-br-xl' : ''}`}
      style={{ paddingTop: sizes.kpiPY, paddingBottom: sizes.kpiPY }}
    >
      <div
        className="font-bold text-white w-full"
        style={{ fontSize: sizes.summaryLabel, lineHeight: sizes.lineHeight }}
      >
        {label.split('\n').map((line, i) => <div key={i}>{line}</div>)}
      </div>
      <div
        className={`font-bold w-full ${valueColor}`}
        style={{ fontSize: sizes.summaryValue, lineHeight: sizes.lineHeight, fontFamily: `'${sizes.fontDisplay}', sans-serif` }}
      >
        {valueDisplay}
      </div>
      <div className="font-light text-white w-full" style={{ fontSize: sizes.summarySubLabel, lineHeight: sizes.lineHeight }}>
        {subLabel}
      </div>
      <div className="font-light text-white w-full" style={{ fontSize: sizes.summarySubLabel2, lineHeight: sizes.lineHeight }}>
        {subLabel2}
      </div>
    </div>
  )
}
