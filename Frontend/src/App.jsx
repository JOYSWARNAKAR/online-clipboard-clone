import { useState } from 'react'
import { TABS } from './constants/clipboard.js'
import Header from './components/layout/Header.jsx'
import TabSwitch from './components/layout/TabSwitch.jsx'
import SharePanel from './components/share/SharePanel.jsx'
import RetrievePanel from './components/retrieve/RetrievePanel.jsx'
import { useClipboardUrl } from './hooks/useClipboardUrl.js'

export default function App() {
  const { initialTab, initialId } = useClipboardUrl()
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      <main className="relative max-w-xl mx-auto px-4 py-10 sm:py-14">
        <Header />
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm p-5 sm:p-6 shadow-xl">
          <TabSwitch activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === TABS.SHARE ? (
            <SharePanel />
          ) : (
            <RetrievePanel initialId={initialId} />
          )}
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Public clipboard — anyone with the 6-digit PIN can access. Not for sensitive data.
        </p>
        <p>Made with ❤️ by <a href="https://github.com/JOYSWARNAKAR" className="text-blue-500">
        Joy Swarnakar
        </a></p>
      </main>
    </div>
  )
}
