import React, { useMemo, useState } from 'react';
import { plans, SPEED_TIERS, getEffectivePrice } from './data/plans';
import PlanCard from './components/PlanCard';
import RewardsToggle from './components/RewardsToggle';

const SORT_OPTIONS = [
  { value: 'effective', label: 'Effective monthly (with rewards)' },
  { value: 'promo', label: 'Special offer price' },
  { value: 'standard', label: 'Standard price' },
  { value: 'speed', label: 'Speed (fastest first)' },
  { value: 'score', label: 'Finder Score' },
];

export default function App() {
  const [showRewards, setShowRewards] = useState(true);
  const [speedFilter, setSpeedFilter] = useState('All speeds');
  const [sortKey, setSortKey] = useState('effective');
  const [rewardsOnly, setRewardsOnly] = useState(false);

  const visiblePlans = useMemo(() => {
    let list = [...plans];
    if (speedFilter !== 'All speeds') {
      list = list.filter((p) => p.speedTier === speedFilter);
    }
    if (rewardsOnly) {
      list = list.filter((p) => p.finderReward > 0);
    }
    const sorters = {
      effective: (a, b) => getEffectivePrice(a) - getEffectivePrice(b),
      promo: (a, b) => (a.promoPrice ?? a.standardPrice) - (b.promoPrice ?? b.standardPrice),
      standard: (a, b) => a.standardPrice - b.standardPrice,
      speed: (a, b) => b.typicalEveningSpeed - a.typicalEveningSpeed,
      score: (a, b) => (b.finderScore || 0) - (a.finderScore || 0),
    };
    list.sort(sorters[sortKey]);
    return list;
  }, [speedFilter, sortKey, rewardsOnly]);

  const totalRewardValue = useMemo(
    () =>
      plans
        .filter((p) => p.finderReward)
        .reduce((sum, p) => sum + p.finderReward, 0),
    []
  );

  return (
    <div className="min-h-screen bg-finder-bg font-sans">
      {/* Top bar */}
      <header className="bg-white border-b border-finder-line sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-finder-blue font-extrabold text-2xl tracking-tight">finder</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-finder-ink">
            <span className="hover:text-finder-blue cursor-pointer">Broadband</span>
            <span className="hover:text-finder-blue cursor-pointer">Mobile</span>
            <span className="hover:text-finder-blue cursor-pointer">Energy</span>
            <span className="hover:text-finder-blue cursor-pointer">Money</span>
            <span className="bg-finder-greenBg text-finder-green font-semibold px-2 py-1 rounded-md text-xs">
              ★ Finder Rewards
            </span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-finder-ink mb-2">
          Compare internet plans
        </h1>
        <p className="text-finder-muted text-base mb-6 max-w-3xl">
          The price gap between the cheapest and priciest broadband providers can top
          $700 a year. Don&rsquo;t overspend on your home internet — and earn cashback
          rewards with eligible plans.
        </p>

        {/* Hero stat / rewards CTA */}
        <div className="bg-gradient-to-r from-finder-greenBg to-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6 flex flex-wrap items-center gap-4">
          <div className="text-finder-green text-3xl font-extrabold">★ ${totalRewardValue}</div>
          <div className="flex-1">
            <div className="font-bold text-finder-ink">Get rewarded for switching with Finder Rewards</div>
            <div className="text-sm text-finder-muted">
              Total Visa eGift card value across {plans.filter(p => p.finderReward).length} eligible plans below.
              Toggle rewards-included pricing to see the real cost.
            </div>
          </div>
          <RewardsToggle enabled={showRewards} onChange={setShowRewards} />
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-4 mb-5 px-4 py-3 bg-white border border-finder-line rounded-xl shadow-card">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-finder-muted uppercase tracking-wide">
              Speed tier
            </label>
            <select
              value={speedFilter}
              onChange={(e) => setSpeedFilter(e.target.value)}
              className="border border-finder-line rounded-md px-2 py-1.5 text-sm font-medium bg-white"
            >
              {SPEED_TIERS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-finder-muted uppercase tracking-wide">
              Sort by
            </label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="border border-finder-line rounded-md px-2 py-1.5 text-sm font-medium bg-white"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={rewardsOnly}
              onChange={(e) => setRewardsOnly(e.target.checked)}
              className="rounded border-finder-line accent-finder-green"
            />
            <span>Plans with Finder Rewards only</span>
          </label>
        </div>

        <p className="text-sm text-finder-muted mb-4">
          Showing <span className="font-semibold text-finder-ink">{visiblePlans.length}</span> of {plans.length} plans
          {showRewards && (
            <span className="ml-2 text-finder-green font-semibold">
              · Rewards-included pricing on
            </span>
          )}
        </p>

        {/* Plan cards */}
        <div className="flex flex-col gap-3">
          {visiblePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} showRewards={showRewards} />
          ))}
          {visiblePlans.length === 0 && (
            <div className="text-center py-12 text-finder-muted bg-white border border-finder-line rounded-xl">
              No plans match the current filters.
            </div>
          )}
        </div>

        <p className="text-xs text-finder-muted mt-8 leading-relaxed">
          Effective monthly price amortises the Finder Reward over 12 months.
          Reward eligibility, redemption period, and T&amp;Cs vary by provider.
          Prototype data extracted from a snapshot of finder.com.au/broadband-plans.
        </p>
      </main>

      <footer className="bg-finder-ink text-slate-300 text-xs py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          Prototype · finder.com.au · Reward-included pricing demo
        </div>
      </footer>
    </div>
  );
}
