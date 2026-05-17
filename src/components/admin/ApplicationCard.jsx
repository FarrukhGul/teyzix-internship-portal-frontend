import { useState } from 'react'
import { MdEmail, MdPhone, MdMessage } from 'react-icons/md'

const ApplicationCard = ({ app }) => {
  const [expanded, setExpanded] = useState(false)

  const displayDomain = app.selectedDomain?.length === 24 && /^[a-f0-9]+$/i.test(app.selectedDomain)
    ? 'N/A'
    : app.selectedDomain

  return (
    <div className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-5 flex flex-col gap-3 hover:border-green-500/40 transition">
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

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition w-fit"
      >
        <MdMessage />
        {expanded ? 'Hide Message' : 'View Message'}
      </button>

      {expanded && (
        <div className="bg-[#0a0a0a] border wrap-break-word overflow-hidden border-green-900/20 rounded-lg p-3 text-xs md:text-sm text-gray-400 leading-relaxed">
          {app.message}
        </div>
      )}
    </div>
  )
}

export default ApplicationCard