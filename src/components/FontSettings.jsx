import { useState, useRef } from 'react'
import { Settings, X, RotateCcw, Save, Check, ChevronUp, ChevronDown, Code2, Copy } from 'lucide-react'
import { useFonts } from '../FontContext'
import { COLUMNS } from './VendorInsights'

const FONT_OPTIONS = [
  { label: 'Nunito',        value: 'Nunito' },
  { label: 'Inter',         value: 'Inter' },
  { label: 'Barlow',        value: 'Barlow' },
  { label: 'Outfit',        value: 'Outfit' },
  { label: 'DM Sans',       value: 'DM Sans' },
  { label: 'Space Grotesk', value: 'Space Grotesk' },
  { label: 'Oswald',        value: 'Oswald' },
  { label: 'Rajdhani',      value: 'Rajdhani' },
]

const FONT_ROLE_CONTROLS = [
  { key: 'fontBody',    label: 'Body',    hint: 'Names, labels, tabs' },
  { key: 'fontHeading', label: 'Heading', hint: 'Titles, column headers' },
  { key: 'fontDisplay', label: 'Display', hint: 'Large numbers & values' },
]

const FONT_CONTROLS = [
  { key: 'headerTitle',     label: 'Header Title',      min: 10, max: 60 },
  { key: 'headerTab',       label: 'Header Tabs',       min: 8,  max: 40 },
  { key: 'headerTimestamp', label: 'Timestamp',         min: 8,  max: 40 },
  { key: 'summaryLabel',    label: 'KPI Label',         min: 8,  max: 40 },
  { key: 'summaryValue',    label: 'KPI Value',         min: 14, max: 80 },
  { key: 'summarySubLabel',  label: 'KPI Sub-label',    min: 8,  max: 40 },
  { key: 'summarySubLabel2', label: 'KPI Sub-label 2',  min: 8,  max: 40 },
  { key: 'tableHeader',     label: 'Column Header',     min: 8,  max: 40 },
  { key: 'tableSubHeader',  label: 'Column Sub-header', min: 8,  max: 30 },
  { key: 'sectionLabel',    label: 'Section Label',     min: 8,  max: 40 },
  { key: 'vendorName',      label: 'Vendor Name',       min: 10, max: 40 },
  { key: 'vendorLogoSize',  label: 'Vendor Logo Size',  min: 20, max: 100 },
  { key: 'vendorMeta',      label: 'Vendor Meta',       min: 8,  max: 30 },
  { key: 'tableValue',      label: 'Table Values',      min: 10, max: 80 },
]

const SS_FONT_CONTROLS = [
  { key: 'ssPanelTitle', label: 'Panel Title',       min: 10, max: 50 },
  { key: 'ssColHeader',  label: 'Column Header',     min: 8,  max: 40 },
  { key: 'ssErLabel',    label: 'KPI Label',         min: 8,  max: 40 },
  { key: 'ssErValue',    label: 'KPI Value',         min: 14, max: 80 },
  { key: 'ssRowUpc',     label: 'Row Primary Text',  min: 10, max: 40 },
  { key: 'ssRowDesc',    label: 'Row Secondary Text',min: 8,  max: 40 },
  { key: 'ssRowValue',   label: 'Row Value (top panels)', min: 10, max: 60 },
]

const SS_COLUMNS = {
  reclamation: { label: 'Reclamation',          flexKey: 'ssErColFlexes', headers: ['Event', 'Store Response', '$ Received'] },
  topLossNM:   { label: 'Top Loss No Markdowns', flexKey: 'ssZsColFlexes', headers: ['UPC & Description', 'Total Units', 'Shipped Cost'] },
  deptMD:      { label: 'Dept Markdowns',        flexKey: 'ssTlColFlexes', headers: ['Department', 'MD Units/lbs', 'Loss Units', 'Total Loss $', 'MD Effectiveness', 'Loss No MD'] },
}

const SPACING_CONTROLS = [
  { key: 'lineHeight',   label: 'Line Height',      min: 0.8, max: 2.0, step: 0.05, decimals: 2 },
  { key: 'progressBarH',   label: 'Progress Bar',        min: 1, max: 16 },
  { key: 'headerPY',       label: 'Header Padding',      min: 2, max: 40 },
  { key: 'sectionLabelPY', label: 'Section Label Padding', min: 0, max: 32 },
  { key: 'columnGap',      label: 'Column Gap',            min: 0, max: 64 },
  { key: 'kpiPY',       label: 'KPI Card Padding',  min: 2,  max: 40 },
  { key: 'rowPY',       label: 'Table Row Padding', min: 1,  max: 40 },
  { key: 'pagePadding', label: 'Page Padding',      min: 0,  max: 64 },
  { key: 'sectionGap',  label: 'Section Gap',       min: 0,  max: 40 },
]

function Slider({ control, value, onChange }) {
  const { min, max, step = 1, decimals = 0 } = control
  const display = decimals > 0 ? value.toFixed(decimals) : value
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-[#ccc]">{control.label}</label>
        <span className="text-xs font-mono text-white w-10 text-right">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-blue-400"
      />
    </div>
  )
}

function formatDuration(secs) {
  if (secs < 60) return `${secs}s`
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return s === 0 ? `${m}m` : `${m}m ${s}s`
}

function generateExport(sizes, timerDuration) {
  const groups = [
    { comment: '// Font sizes', keys: ['headerTitle','headerTab','headerTimestamp','summaryLabel','summaryValue','summarySubLabel','summarySubLabel2','tableHeader','tableSubHeader','sectionLabel','vendorName','vendorMeta','tableValue'] },
    { comment: '// Line height', keys: ['lineHeight'] },
    { comment: '// Spacing (px)', keys: ['progressBarH','headerPY','sectionLabelPY','kpiPY','rowPY','pagePadding','sectionGap','columnGap','pageDuration'] },
    { comment: '// Columns', keys: ['columnOrder','columnFlexes','vendorColFlex','vendorLogoSize'] },
    { comment: '// Fonts', keys: ['fontBody','fontHeading','fontDisplay'] },
    { comment: '// Animations', keys: ['animRowStyle','animRowDuration','animPageStyle','animPageDuration','animEasing'] },
    { comment: '// Sales & Shrink font sizes', keys: ['ssPanelTitle','ssErLabel','ssErValue','ssColHeader','ssRowUpc','ssRowDesc','ssRowValue'] },
    { comment: '// Sales & Shrink column flex widths', keys: ['ssErColFlexes','ssZsColFlexes','ssTlColFlexes'] },
    { comment: '// Sales & Shrink pagination', keys: ['ssPagDuration'] },
  ]
  const lines = ['export const defaults = {']
  for (const { comment, keys } of groups) {
    lines.push(`  ${comment}`)
    for (const key of keys) {
      const val = sizes[key]
      lines.push(`  ${key}: ${JSON.stringify(val)},`)
    }
  }
  lines.push('}')
  lines.push('')
  lines.push('// ─── App.jsx ───────────────────────────────────────────────────────────────')
  lines.push(`// Change the timerDuration default (line: useState(30)):`)
  lines.push(`// const [timerDuration, setTimerDuration] = useState(${timerDuration})`)
  return lines.join('\n')
}

export default function FontSettings({ timerDuration, setTimerDuration }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('fonts')
  const [saved, setSaved] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [copiedExport, setCopiedExport] = useState(false)
  const [pos, setPos] = useState(null) // null = docked right, {left, top} = floating
  const panelRef = useRef(null)
  const { sizes, set, save, reset } = useFonts()

  function handleSave() {
    save(sizes)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleClose() {
    setOpen(false)
    setPos(null)
  }

  function handleDragStart(e) {
    if (e.target.closest('button')) return
    e.preventDefault()
    const rect = panelRef.current.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY
    const startLeft = rect.left
    const startTop = rect.top

    function onMouseMove(e) {
      setPos({
        left: Math.max(0, startLeft + (e.clientX - startX)),
        top:  Math.max(0, startTop  + (e.clientY - startY)),
      })
    }
    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const TABS = [
    ['fonts',   'Fonts'],
    ['spacing', 'Spacing'],
    ['columns', 'Columns'],
    ['anim',    'Anim'],
    ['timer',   'Timer'],
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#333] hover:bg-[#444] text-white p-3 rounded-full shadow-lg transition-colors"
        title="Display Settings"
      >
        <Settings size={20} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-50" onClick={handleClose} />
          <div
            ref={panelRef}
            className="fixed z-[51] bg-[#1a1a1a] w-72 flex flex-col shadow-2xl"
            style={pos
              ? { left: pos.left, top: pos.top, maxHeight: '85vh', border: '1px solid #333', borderRadius: 8 }
              : { right: 0, top: 0, bottom: 0, borderLeft: '1px solid #333' }
            }
          >

            {/* Header — drag handle */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-[#333] flex-shrink-0 cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleDragStart}
            >
              <h2 className="font-bold text-white text-sm">Display Settings</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={reset}
                  className="text-[#aaa] hover:text-white transition-colors"
                  title="Reset to defaults (clears saved)"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setExportOpen(true)}
                  className="text-[#aaa] hover:text-white transition-colors"
                  title="Export settings as hardcoded values"
                >
                  <Code2 size={14} />
                </button>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    saved
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-500 hover:bg-blue-400 text-white'
                  }`}
                  title="Save settings"
                >
                  {saved ? <Check size={12} /> : <Save size={12} />}
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button onClick={handleClose} className="text-[#aaa] hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#333] flex-shrink-0">
              {TABS.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${
                    tab === id
                      ? 'text-white border-b-2 border-blue-400'
                      : 'text-[#888] hover:text-[#ccc]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {tab === 'fonts' && (
                <>
                  <div className="space-y-3 pb-3 border-b border-[#333]">
                    {FONT_ROLE_CONTROLS.map(({ key, label, hint }) => (
                      <div key={key}>
                        <div className="flex items-baseline justify-between mb-1">
                          <label className="text-xs text-[#ccc]">{label}</label>
                          <span className="text-[10px] text-[#666]">{hint}</span>
                        </div>
                        <select
                          value={sizes[key] ?? 'Nunito'}
                          onChange={e => set(key, e.target.value)}
                          className="w-full bg-[#252525] border border-[#444] text-white text-xs rounded px-2 py-1.5 appearance-none cursor-pointer"
                          style={{ fontFamily: `'${sizes[key]}', sans-serif` }}
                        >
                          {FONT_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        <p className="mt-1 text-[10px] text-[#555]" style={{ fontFamily: `'${sizes[key]}', sans-serif` }}>
                          The quick brown fox — 0123456789
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 pt-1">
                    <p className="text-[10px] text-[#555] uppercase tracking-wider pt-1">Vendor Management</p>
                    {FONT_CONTROLS.map(c => (
                      <Slider key={c.key} control={c} value={sizes[c.key]} onChange={v => set(c.key, v)} />
                    ))}
                    <p className="text-[10px] text-[#555] uppercase tracking-wider pt-2 border-t border-[#333]">Sales &amp; Shrink</p>
                    {SS_FONT_CONTROLS.map(c => (
                      <Slider key={c.key} control={c} value={sizes[c.key]} onChange={v => set(c.key, v)} />
                    ))}
                  </div>
                </>
              )}

              {tab === 'spacing' && SPACING_CONTROLS.map(c => (
                <Slider key={c.key} control={c} value={sizes[c.key]} onChange={v => set(c.key, v)} />
              ))}

              {tab === 'columns' && (() => {
                const order = sizes.columnOrder ?? [0, 1, 5, 2, 3, 4]
                const flexes = sizes.columnFlexes ?? [1, 1, 1, 1, 1, 1]
                return (
                  <div className="space-y-2">
                    <div className="bg-[#252525] rounded-lg p-3 space-y-2">
                      <span className="text-xs text-white font-medium">Vendor Name Column</span>
                      <Slider
                        control={{ label: 'Width', min: 0.1, max: 1.5, step: 0.05, decimals: 2 }}
                        value={sizes.vendorColFlex ?? 0.3}
                        onChange={v => set('vendorColFlex', v)}
                      />
                    </div>
                    {order.map((origIdx, displayIdx) => {
                      const col = COLUMNS[origIdx]
                      return (
                        <div key={origIdx} className="bg-[#252525] rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white font-medium">{col.heading.replace('\n', ' ')}</span>
                            <div className="flex gap-0.5">
                              <button
                                disabled={displayIdx === 0}
                                onClick={() => {
                                  const o = [...order]
                                  ;[o[displayIdx - 1], o[displayIdx]] = [o[displayIdx], o[displayIdx - 1]]
                                  set('columnOrder', o)
                                }}
                                className="p-0.5 rounded text-[#aaa] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                              ><ChevronUp size={14} /></button>
                              <button
                                disabled={displayIdx === order.length - 1}
                                onClick={() => {
                                  const o = [...order]
                                  ;[o[displayIdx], o[displayIdx + 1]] = [o[displayIdx + 1], o[displayIdx]]
                                  set('columnOrder', o)
                                }}
                                className="p-0.5 rounded text-[#aaa] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                              ><ChevronDown size={14} /></button>
                            </div>
                          </div>
                          <Slider
                            control={{ label: 'Width', min: 0.2, max: 4, step: 0.1, decimals: 1 }}
                            value={flexes[origIdx]}
                            onChange={v => {
                              const f = [...flexes]
                              f[origIdx] = v
                              set('columnFlexes', f)
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              })()}

              {tab === 'columns' && (
                <div className="space-y-4 pt-2 border-t border-[#333]">
                  <p className="text-[10px] text-[#555] uppercase tracking-wider">Sales &amp; Shrink Columns</p>
                  {Object.entries(SS_COLUMNS).map(([key, { label, flexKey, headers }]) => {
                    const flexes = sizes[flexKey] ?? headers.map(() => 1)
                    return (
                      <div key={key} className="bg-[#252525] rounded-lg p-3 space-y-2">
                        <span className="text-xs text-white font-medium">{label}</span>
                        {headers.map((h, i) => (
                          <Slider
                            key={i}
                            control={{ label: h, min: 0.2, max: 4, step: 0.1, decimals: 1 }}
                            value={flexes[i] ?? 1}
                            onChange={v => {
                              const f = [...flexes]
                              f[i] = v
                              set(flexKey, f)
                            }}
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>
              )}

              {tab === 'anim' && (() => {
                const styleSelect = (key, label, options) => (
                  <div key={key}>
                    <label className="text-xs text-[#ccc] block mb-1">{label}</label>
                    <select
                      value={sizes[key]}
                      onChange={e => set(key, e.target.value)}
                      className="w-full bg-[#252525] border border-[#444] text-white text-xs rounded px-2 py-1.5 appearance-none cursor-pointer"
                    >
                      {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                    </select>
                  </div>
                )
                return (
                  <div className="space-y-4">
                    <div className="space-y-3 pb-3 border-b border-[#333]">
                      <p className="text-[10px] text-[#555] uppercase tracking-wider">Row Animations</p>
                      {styleSelect('animRowStyle', 'Style', [
                        ['slide',    'Slide (with color flash)'],
                        ['slide-nf', 'Slide (no flash)'],
                        ['fade',     'Fade'],
                        ['rise',     'Rise'],
                        ['scale',    'Scale'],
                        ['none',     'None'],
                      ])}
                      <Slider control={{ label: 'Duration', min: 50, max: 1000, step: 25 }} value={sizes.animRowDuration} onChange={v => set('animRowDuration', v)} />
                    </div>
                    <div className="space-y-3 pb-3 border-b border-[#333]">
                      <p className="text-[10px] text-[#555] uppercase tracking-wider">Page Transitions</p>
                      {styleSelect('animPageStyle', 'Style', [
                        ['slide', 'Slide'],
                        ['fade',  'Fade'],
                        ['rise',  'Rise'],
                        ['none',  'None'],
                      ])}
                      <Slider control={{ label: 'Duration', min: 50, max: 1000, step: 25 }} value={sizes.animPageDuration} onChange={v => set('animPageDuration', v)} />
                    </div>
                    <div className="space-y-3 pb-3 border-b border-[#333]">
                      <p className="text-[10px] text-[#555] uppercase tracking-wider">S&amp;S Panel Pagination</p>
                      {styleSelect('animSsStyle', 'Style', [
                        ['slide', 'Slide'],
                        ['fade',  'Fade'],
                        ['rise',  'Rise'],
                        ['none',  'None'],
                      ])}
                      <Slider control={{ label: 'Duration', min: 50, max: 1000, step: 25 }} value={sizes.animSsDuration ?? 400} onChange={v => set('animSsDuration', v)} />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] text-[#555] uppercase tracking-wider">Easing</p>
                      {styleSelect('animEasing', 'Curve', [
                        ['ease-out',    'Ease Out (default)'],
                        ['ease-in-out', 'Ease In-Out'],
                        ['ease',        'Ease'],
                        ['linear',      'Linear'],
                        ['spring',      'Spring (overshoot)'],
                      ])}
                    </div>
                  </div>
                )
              })()}

              {tab === 'timer' && (
                <div className="space-y-6 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-[#ccc]">Screen Duration</label>
                      <span className="text-sm font-mono font-bold text-white">{formatDuration(timerDuration)}</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={300}
                      step={5}
                      value={timerDuration}
                      onChange={e => setTimerDuration(Number(e.target.value))}
                      className="w-full accent-blue-400"
                    />
                    <div className="flex justify-between text-[10px] text-[#666] mt-1">
                      <span>5s</span>
                      <span>1m</span>
                      <span>2m</span>
                      <span>5m</span>
                    </div>
                  </div>

                  {/* Vendor page flip duration */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-[#ccc]">Vendor Page Flip</label>
                      <span className="text-sm font-mono font-bold text-white">{formatDuration(sizes.pageDuration)}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={60}
                      step={1}
                      value={sizes.pageDuration}
                      onChange={e => set('pageDuration', Number(e.target.value))}
                      className="w-full accent-blue-400"
                    />
                    <div className="flex justify-between text-[10px] text-[#666] mt-1">
                      <span>2s</span>
                      <span>15s</span>
                      <span>30s</span>
                      <span>1m</span>
                    </div>
                  </div>

                  {/* S&S page flip duration */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-[#ccc]">S&amp;S Page Flip</label>
                      <span className="text-sm font-mono font-bold text-white">{formatDuration(sizes.ssPagDuration)}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={60}
                      step={1}
                      value={sizes.ssPagDuration}
                      onChange={e => set('ssPagDuration', Number(e.target.value))}
                      className="w-full accent-blue-400"
                    />
                    <div className="flex justify-between text-[10px] text-[#666] mt-1">
                      <span>2s</span>
                      <span>15s</span>
                      <span>30s</span>
                      <span>1m</span>
                    </div>
                  </div>

                  <div className="border border-[#333] rounded-lg p-3 space-y-1">
                    <p className="text-xs text-[#aaa] font-medium">How it works</p>
                    <p className="text-xs text-[#666] leading-relaxed">
                      The progress bar fills over the set duration, then automatically advances to the next screen. Clicking a tab also resets the timer.
                    </p>
                  </div>

                  {/* Quick presets */}
                  <div>
                    <p className="text-xs text-[#aaa] mb-2">Quick presets</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[15, 30, 60, 90, 120, 300].map(s => (
                        <button
                          key={s}
                          onClick={() => setTimerDuration(s)}
                          className={`py-1.5 rounded text-xs font-medium transition-colors ${
                            timerDuration === s
                              ? 'bg-blue-500 text-white'
                              : 'bg-[#2a2a2a] text-[#ccc] hover:bg-[#333]'
                          }`}
                        >
                          {formatDuration(s)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </>
      )}
      {exportOpen && (() => {
        const code = generateExport(sizes, timerDuration)
        function handleCopy() {
          navigator.clipboard.writeText(code).then(() => {
            setCopiedExport(true)
            setTimeout(() => setCopiedExport(false), 2000)
          })
        }
        return (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70" onClick={() => setExportOpen(false)}>
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl w-[560px] max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#333] flex-shrink-0">
                <div>
                  <h2 className="text-sm font-bold text-white">Export Display Settings</h2>
                  <p className="text-[11px] text-[#666] mt-0.5">Replace the <code className="text-[#aaa]">defaults</code> object in <code className="text-[#aaa]">src/FontContext.jsx</code> with this</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      copiedExport ? 'bg-green-600 text-white' : 'bg-blue-500 hover:bg-blue-400 text-white'
                    }`}
                  >
                    {copiedExport ? <Check size={12} /> : <Copy size={12} />}
                    {copiedExport ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={() => setExportOpen(false)} className="text-[#aaa] hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
              <pre className="flex-1 overflow-y-auto px-4 py-3 text-[11px] font-mono text-[#ccc] leading-relaxed whitespace-pre">
                {code}
              </pre>
            </div>
          </div>
        )
      })()}
    </>
  )
}
