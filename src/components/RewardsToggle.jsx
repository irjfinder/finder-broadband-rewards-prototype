import React from 'react';

export default function RewardsToggle({ enabled, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className="relative inline-flex h-6 w-11 flex-shrink-0">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="absolute inset-0 rounded-full bg-slate-300 peer-checked:bg-finder-green transition-colors" />
        <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
      <span className="text-sm font-semibold text-finder-ink">
        Show prices with Finder Rewards applied
      </span>
    </label>
  );
}
