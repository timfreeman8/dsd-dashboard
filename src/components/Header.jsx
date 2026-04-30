import { useState, useEffect } from 'react'
import freshCartLogo from '../../designs/fresh-cart.svg'
import { LogIn, LogOut, Maximize2, Minimize2 } from 'lucide-react'
import { useFonts } from '../FontContext'

export default function Header({ activeTab, onTabChange, onCheckIn, onCheckOut, onReset, canCheckIn, canCheckOut }) {
  const { sizes } = useFonts()
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement)

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <header
      className="flex items-center justify-between flex-shrink-0 px-8"
      style={{ paddingTop: sizes.headerPY, paddingBottom: sizes.headerPY, lineHeight: sizes.lineHeight }}
    >
      <div className="flex items-center gap-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <img src={freshCartLogo} alt="Fresh Cart" style={{ height: sizes.headerTitle * 1.1 }} />
          <span className="font-bold text-white" style={{ fontSize: sizes.headerTitle, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>DSD Dashboard</span>
          <div className="w-px self-stretch bg-white opacity-40" />
          <span className="font-bold text-white" style={{ fontSize: sizes.headerTitle, fontFamily: `'${sizes.fontHeading}', sans-serif` }}>CI 351</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 ml-2">
          <button
            onClick={() => onTabChange('vendor-management')}
            className={`px-4 py-1 rounded-full font-bold border-2 transition-colors ${
              activeTab === 'vendor-management'
                ? 'bg-white text-[#2a2a2a] border-white'
                : 'bg-transparent text-white border-white hover:bg-white/10'
            }`}
            style={{ fontSize: sizes.headerTab }}
          >
            Vendor Management
          </button>
          <button
            onClick={() => onTabChange('sales-shrink')}
            className={`px-4 py-1 rounded-full font-bold border-2 transition-colors ${
              activeTab === 'sales-shrink'
                ? 'bg-white text-[#2a2a2a] border-white'
                : 'bg-transparent text-white border-white hover:bg-white/10'
            }`}
            style={{ fontSize: sizes.headerTab }}
          >
            Sell More Lose Less
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/40 text-white/70 font-semibold transition-all hover:border-white hover:text-white"
          style={{ fontSize: sizes.headerTab * 0.75 }}
        >
          Default
        </button>
        <button
          onClick={onCheckIn}
          disabled={!canCheckIn}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#80bdf0] text-[#80bdf0] font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#80bdf0]/10"
          style={{ fontSize: sizes.headerTab * 0.75 }}
        >
          <LogIn size={14} />
          Check In
        </button>
        <button
          onClick={onCheckOut}
          disabled={!canCheckOut}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#f36c71] text-[#f36c71] font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#f36c71]/10"
          style={{ fontSize: sizes.headerTab * 0.75 }}
        >
          <LogOut size={14} />
          Check Out
        </button>
        <span className="text-white ml-2" style={{ fontSize: sizes.headerTimestamp }}>
          Updated Apr 6 at 05:31AM
        </span>
        <button
          onClick={toggleFullscreen}
          className="ml-2 p-1.5 rounded-lg border border-white/40 text-white/70 transition-all hover:border-white hover:text-white"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </header>
  )
}
