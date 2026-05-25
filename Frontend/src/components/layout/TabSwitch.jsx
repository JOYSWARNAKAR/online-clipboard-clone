import { TABS } from '../../constants/clipboard.js'

const TAB_OPTIONS = [
  { id: TABS.SHARE, label: 'Share' },
  { id: TABS.RETRIEVE, label: 'Retrieve' },
]

export default function TabSwitch({ activeTab, onTabChange }) {
  return (
    <div className="flex rounded-xl bg-slate-800/60 p-1 mb-6">
      {TAB_OPTIONS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
