import React from 'react';
import { getEffectivePrice, formatPrice } from '../data/plans';

function ProviderLogo({ plan }) {
  return (
    <div
      className="w-full h-14 rounded-md flex items-center justify-center font-bold tracking-tight text-sm px-2 text-center leading-tight"
      style={{ backgroundColor: plan.logoBg, color: plan.logoColor }}
    >
      {plan.provider}
    </div>
  );
}

function FinderScore({ score, label }) {
  return (
    <div className="flex items-center gap-1.5 mt-2">
      <div className="bg-finder-green text-white font-bold text-[11px] px-1.5 py-0.5 rounded">
        {score?.toFixed(1)}
      </div>
      <div className="text-[11px] leading-tight">
        <div className="font-semibold text-finder-ink">Finder Score</div>
        <div className="text-finder-green font-semibold">{label}</div>
      </div>
    </div>
  );
}

export default function PlanCard({ plan, showRewards }) {
  const basePrice = plan.promoPrice ?? plan.standardPrice;
  const effectivePrice = getEffectivePrice(plan);
  const monthlyRewardValue = (plan.finderReward || 0) / 12;
  const hasReward = plan.finderReward > 0;
  const showCalculated = showRewards && hasReward;
  const hasPromo = plan.promoPrice != null && plan.promoPrice < plan.standardPrice;

  return (
    <article
      className={`relative bg-white border rounded-xl shadow-card overflow-hidden transition-all ${
        showCalculated ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-finder-line'
      }`}
    >
      {/* Top promoted/exclusive ribbon */}
      {(plan.promoted || plan.exclusive) && (
        <div className="flex items-center gap-2 bg-amber-50 border-b border-amber-100 px-4 py-1.5 text-[11px] font-semibold text-amber-800">
          {plan.exclusive && (
            <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
              ★ Finder Rewards Exclusive
            </span>
          )}
          {plan.promoted && <span>Promoted</span>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_240px_160px] gap-5 items-center p-5">
        {/* Provider + Score */}
        <div>
          <ProviderLogo plan={plan} />
          <FinderScore score={plan.finderScore} label={plan.scoreLabel} />
        </div>

        {/* Plan info */}
        <div className="text-sm space-y-1">
          <div className="font-bold text-base text-finder-ink leading-tight">
            {plan.provider} {plan.planName}
          </div>
          <div className="text-finder-muted text-xs">
            {plan.speedTier} · {plan.contractType}
          </div>

          <div className="flex gap-2 pt-2">
            <span className="text-finder-muted w-32">Typical evening speed</span>
            <span className="font-semibold">{plan.typicalEveningSpeed} Mbps</span>
          </div>
          <div className="flex gap-2">
            <span className="text-finder-muted w-32">Upload speed</span>
            <span className="font-semibold">{plan.uploadSpeed} Mbps</span>
          </div>

          {hasReward && (
            <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 rounded-md bg-finder-greenBg text-finder-green text-[11px] font-semibold">
              <span>★ {plan.rewardLabel}</span>
              {plan.rewardEnds && (
                <span className="text-finder-green/70 font-medium">· {plan.rewardEnds}</span>
              )}
            </div>
          )}
        </div>

        {/* Price column */}
        <div className="text-right">
          {plan.saveAmount && !showCalculated && (
            <div className="inline-block bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide mb-1">
              Save ${plan.saveAmount}
            </div>
          )}

          {showCalculated ? (
            <>
              <div className="text-finder-muted line-through text-base leading-tight">
                {formatPrice(basePrice)}
                <span className="text-xs">/mth</span>
              </div>
              <div className="text-finder-green font-extrabold text-3xl leading-tight mt-0.5">
                {formatPrice(effectivePrice)}
                <span className="text-sm font-medium">/mth</span>
              </div>
              <div className="text-[11px] text-finder-green mt-0.5 font-semibold">
                Price after rewards
              </div>
              <div className="text-[10px] text-finder-muted mt-1">
                {formatPrice(basePrice)} − ({formatPrice(plan.finderReward, { decimals: 0 })} ÷ 12)
              </div>
            </>
          ) : (
            <>
              {hasPromo && (
                <div className="text-finder-muted line-through text-sm leading-tight">
                  {formatPrice(plan.standardPrice)}
                  <span className="text-xs">/mth</span>
                </div>
              )}
              <div className="text-finder-ink font-extrabold text-3xl leading-tight">
                {formatPrice(basePrice)}
                <span className="text-sm font-medium text-finder-muted">/mth</span>
              </div>
              <div className="text-[11px] text-finder-muted mt-0.5">
                {hasPromo
                  ? `for first ${plan.promoMonths} months`
                  : 'ongoing'}
              </div>
              {hasReward && (
                <div className="text-[11px] text-finder-green mt-1 font-semibold">
                  + {plan.rewardLabel}
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="bg-finder-blue hover:bg-finder-blueDark text-white font-semibold text-sm py-2.5 px-4 rounded-md transition-colors"
          >
            Go to site
          </button>
          <button
            type="button"
            className="bg-white hover:bg-slate-50 text-finder-blue border border-finder-blue font-semibold text-sm py-2.5 px-4 rounded-md transition-colors"
          >
            View details
          </button>
        </div>
      </div>

      {/* Offer text */}
      {plan.offerText && (
        <div className="px-5 pb-3 -mt-2 text-[11px] text-finder-muted leading-snug">
          {plan.offerText}
        </div>
      )}
    </article>
  );
}
