import { useState, useEffect, useRef } from 'react'
import { FontProvider, useFonts } from './FontContext'
import Header from './components/Header'
import StoreSummary from './components/StoreSummary'
import VendorInsights from './components/VendorInsights'
import SalesAndShrink from './components/SalesAndShrink'
import FontSettings from './components/FontSettings'
import { vendors as initialVendors } from './data'

const TABS = ['vendor-management', 'sales-shrink']

function currentTime() {
  const now = new Date()
  let h = now.getHours()
  const m = now.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return `${h}:${m}${ampm}`
}

function Dashboard({ timerDuration, setTimerDuration }) {
  const [activeTab, setActiveTab] = useState('vendor-management')
  const [elapsed, setElapsed] = useState(0)
  const [vendors, setVendors] = useState(initialVendors)
  const [progressKey, setProgressKey] = useState(0)
  const [checkingInId, setCheckingInId]   = useState(null)
  const [checkingOutId, setCheckingOutId] = useState(null)
  const { sizes } = useFonts()

  function handleCheckIn() {
    const vendor = vendors.find(v => v.status === 'not-checked-in')
    if (!vendor) return
    setCheckingInId(vendor.id)
    setTimeout(() => {
      setVendors(prev => {
        const idx = prev.findIndex(v => v.id === vendor.id)
        const updated = prev.map((v, i) =>
          i === idx
            ? { ...v, status: 'checked-in', statusDetail: `Checked In ${currentTime()}`, type: v.type || 'Delivery' }
            : v
        )
        const target = updated[idx]
        const rest = updated.filter((_, i) => i !== idx)
        return [target, ...rest]
      })
      setCheckingInId(null)
    }, (sizes.animRowDuration ?? 400) + 220)
  }

  function handleCheckOut() {
    const checkedIn = vendors.filter(v => v.status === 'checked-in')
    if (checkedIn.length === 0) return
    const targetId = checkedIn[checkedIn.length - 1].id
    setCheckingOutId(targetId)
    setTimeout(() => {
      setVendors(prev =>
        prev.map(v =>
          v.id === targetId
            ? { ...v, status: 'checked-out', statusDetail: `Checked Out ${currentTime()}` }
            : v
        )
      )
      setCheckingOutId(null)
    }, (sizes.animRowDuration ?? 400) + 220)
  }

  function handleReset() {
    setVendors(initialVendors)
  }

  const canCheckIn  = vendors.some(v => v.status === 'not-checked-in')
  const canCheckOut = vendors.some(v => v.status === 'checked-in')
  const intervalRef = useRef(null)

  // Start/restart the interval whenever timerDuration changes
  useEffect(() => {
    clearInterval(intervalRef.current)
    setElapsed(0)
    setProgressKey(k => k + 1)
    intervalRef.current = setInterval(() => {
      setElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [timerDuration])

  // Auto-advance when elapsed reaches duration
  useEffect(() => {
    if (elapsed >= timerDuration) {
      const nextIdx = (TABS.indexOf(activeTab) + 1) % TABS.length
      setActiveTab(TABS[nextIdx])
      setElapsed(0)
      setProgressKey(k => k + 1)
    }
  }, [elapsed, timerDuration, activeTab])

  function handleTabChange(tab) {
    setActiveTab(tab)
    setElapsed(0)
    setProgressKey(k => k + 1)
  }

  return (
    <div className="h-screen flex flex-col bg-[#2a2a2a] text-white overflow-hidden" style={{ fontFamily: `'${sizes.fontBody}', sans-serif` }}>
      {/* Progress bar — CSS-animated for smooth fill */}
      <div className="relative bg-[#6d6d6d] flex-shrink-0" style={{ height: sizes.progressBarH }}>
        <div
          key={progressKey}
          className="absolute left-0 top-0 h-full bg-white"
          style={{ animation: `progressBarFill ${timerDuration}s linear forwards` }}
        />
      </div>

      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        onReset={handleReset}
        canCheckIn={canCheckIn}
        canCheckOut={canCheckOut}
      />

      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ padding: `0 ${sizes.pagePadding}px`, gap: sizes.sectionGap, paddingBottom: sizes.sectionGap }}
      >
        {activeTab === 'vendor-management' ? (
          <>
            <StoreSummary />
            <VendorInsights vendors={vendors} checkingInId={checkingInId} checkingOutId={checkingOutId} />
          </>
        ) : (
          <SalesAndShrink />
        )}
      </div>

      <FontSettings timerDuration={timerDuration} setTimerDuration={setTimerDuration} />
    </div>
  )
}

export default function App() {
  const [timerDuration, setTimerDuration] = useState(30)

  return (
    <FontProvider>
      <Dashboard timerDuration={timerDuration} setTimerDuration={setTimerDuration} />
    </FontProvider>
  )
}
