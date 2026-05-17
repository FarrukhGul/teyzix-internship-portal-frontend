import { useState } from 'react'
import { MdEmail, MdPhone, MdMessage, MdDescription, MdClose } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { SiGooglegemini } from 'react-icons/si'
import { analyzeResume } from '../../services/api'

//  Parse AI Response 
const parseAnalysis = (text) => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const result = { score: null, verdict: null, strengths: [], weaknesses: [], summary: null }

  lines.forEach(line => {
    const clean = line.replace(/\*\*/g, '').replace(/^\*\s*/, '').trim()

    if (/overall score/i.test(clean)) {
      const match = clean.match(/(\d+)\s*\/\s*10/)
      if (match) result.score = match[1]
    } else if (/verdict/i.test(clean)) {
      if (/hire/i.test(clean)) result.verdict = 'HIRE'
      else if (/pass/i.test(clean)) result.verdict = 'PASS'
    } else if (/strengths?:/i.test(clean)) {
      // heading line — skip
    } else if (/weaknesses?:/i.test(clean)) {
      // heading line — skip
    } else if (/summary:/i.test(clean)) {
      const val = clean.replace(/^.*?summary:/i, '').trim()
      if (val) result.summary = val
    } else if (result.score && result.verdict) {
      // bullet points — assign to strengths/weaknesses based on position
      const isWeak = text.indexOf('Weaknesses') < text.indexOf(line) ||
                     text.indexOf('Weakness') < text.indexOf(line)
      const isSummaryLine = text.indexOf('Summary') <= text.indexOf(line)

      if (isSummaryLine && !result.summary) {
        result.summary = clean
      } else if (isWeak && result.weaknesses.length < 3) {
        result.weaknesses.push(clean)
      } else if (!isWeak && result.strengths.length < 4) {
        result.strengths.push(clean)
      }
    }
  })

  return result
}

// ── Analysis Modal
const AnalysisModal = ({ analysis, onClose, loading }) => {
  const parsed = analysis ? parseAnalysis(analysis) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-green-900/40 rounded-2xl w-full max-w-lg max-h-[88vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-green-900/30 sticky top-0 bg-[#111] z-10">
          <div className="flex items-center gap-2">
            <SiGooglegemini className="text-green-400 text-lg" />
            <h2 className="text-white font-bold text-sm md:text-base">TEYZIX AI Resume Analysis</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 md:p-5 flex flex-col gap-4">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <SiGooglegemini className="text-green-400 text-4xl animate-pulse" />
              <p className="text-gray-400 text-sm">Analyzing resume...</p>
            </div>
          ) : parsed ? (
            <>
              {/* Score + Verdict */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0a0a0a] border border-green-900/20 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Score</p>
                  <p className="text-3xl font-black text-green-400">{parsed.score}<span className="text-gray-600 text-lg">/10</span></p>
                </div>
                <div className={`rounded-xl p-4 text-center border ${
                  parsed.verdict === 'HIRE'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Verdict</p>
                  <p className={`text-2xl font-black ${parsed.verdict === 'HIRE' ? 'text-green-400' : 'text-red-400'}`}>
                    {parsed.verdict === 'HIRE' ? '✓ HIRE' : '✗ PASS'}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              {parsed.strengths.length > 0 && (
                <div className="bg-[#0a0a0a] border border-green-900/20 rounded-xl p-4 flex flex-col gap-2">
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider">Strengths</p>
                  {parsed.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Weaknesses */}
              {parsed.weaknesses.length > 0 && (
                <div className="bg-[#0a0a0a] border border-red-900/20 rounded-xl p-4 flex flex-col gap-2">
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wider">Weaknesses</p>
                  {parsed.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{w}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {parsed.summary && (
                <div className="bg-[#0a0a0a] border border-green-900/20 rounded-xl p-4">
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-2">Summary</p>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{parsed.summary}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">{analysis}</p>
          )}

        </div>
      </div>
    </div>
  )
}

// ── Application Card ──────────────────────────────────────────────────────────
const ApplicationCard = ({ app }) => {
  const [expanded, setExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)

  const displayDomain = app.selectedDomain?.length === 24 && /^[a-f0-9]+$/i.test(app.selectedDomain)
    ? 'N/A'
    : app.selectedDomain

  const handleAnalyze = async () => {
    setShowModal(true)
    if (analysis) return
    try {
      setAnalyzing(true)
      const res = await analyzeResume(app._id)
      setAnalysis(res.data.analysis)
    } catch (err) {
      setAnalysis('Failed to analyze resume. Please try again.')
      console.error(err)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <>
      {showModal && (
        <AnalysisModal
          analysis={analysis}
          loading={analyzing}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-5 flex flex-col gap-3 hover:border-green-500/40 transition">

        {/* Name + Date */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm md:text-base truncate">{app.name}</h3>
            <span className="text-green-400 text-xs tracking-wider">{displayDomain}</span>
          </div>
          <span className="text-xs text-gray-500 shrink-0">
            {new Date(app.createdAt).toLocaleDateString('en-PK', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </span>
        </div>

        {/* Email + Phone */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <MdEmail className="text-green-400 shrink-0" />
            <span className="truncate text-xs md:text-sm text-gray-400">{app.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPhone className="text-green-400 shrink-0" />
            <span className="text-xs md:text-sm text-gray-400">{app.phoneNumber}</span>
          </div>
        </div>

        {/* View Message */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition w-fit"
        >
          <MdMessage />
          {expanded ? 'Hide Message' : 'View Message'}
        </button>

        {expanded && (
          <div className="bg-[#0a0a0a] border border-green-900/20 rounded-lg p-3 text-xs md:text-sm text-gray-400 leading-relaxed break-words overflow-hidden">
            {app.message}
          </div>
        )}

        {/* Resume + Analyze */}
        <div className="flex gap-2 mt-1 flex-wrap">
          {app.resumeUrl ? (
            <a
              href={app.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 border border-green-900/30 hover:border-green-500/40 px-3 py-1.5 rounded-lg transition"
            >
              <MdDescription className="text-green-400" />
              View Resume
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-800 px-3 py-1.5 rounded-lg">
              <MdDescription />
              No Resume
            </span>
          )}

          {app.resumeUrl && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex items-center gap-1.5 text-xs text-green-400 hover:text-black hover:bg-green-400 border border-green-500/40 hover:border-green-400 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
            >
              {analyzing ? <FaSpinner className="animate-spin" /> : <SiGooglegemini />}
              Analyze Resume
            </button>
          )}
        </div>

      </div>
    </>
  )
}

export default ApplicationCard