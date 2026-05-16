import { MdDashboard, MdWork, MdPeople } from 'react-icons/md'

const BottomNav = ({ activeTab, setActiveTab, applicationCount, internshipCount }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <MdDashboard /> },
    { id: 'applications', label: 'Applications', icon: <MdPeople />, count: applicationCount },
    { id: 'internships', label: 'Internships', icon: <MdWork />, count: internshipCount },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#0a0a0a] border-t border-green-900/40 z-40">
      <div className="flex justify-around items-center py-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition ${
              activeTab === tab.id ? 'text-green-400' : 'text-gray-500'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
         
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomNav