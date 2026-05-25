export default function SelfDestructToggle({ checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/50"
      />
      <div>
        <span className="text-sm text-slate-200 group-hover:text-white transition-colors">
          Self-Destruct Mode
        </span>
        <p className="text-xs text-slate-500">
          Erase content automatically after one view
        </p>
      </div>
    </label>
  )
}
