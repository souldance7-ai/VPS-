'use strict';

const billingTerms = ['month', 'quarter', 'halfyear', 'year'];
const billingLabels = {
  billingCycle: ['付款周期', '付款週期', 'Billing cycle', '支払周期'],
  bill_month: ['月付', '月付', 'Monthly', '月払い'],
  bill_quarter: ['季付', '季付', 'Quarterly', '3か月払い'],
  bill_halfyear: ['半年付', '半年付', 'Semiannual', '半年払い'],
  bill_year: ['年付', '年付', 'Annual', '年払い'],
  halfyear: ['半年', '半年', '6 months', '半年'],
  termQuotes: ['各周期应付金额', '各週期應付金額', 'Total per billing cycle', '支払周期ごとの合計'],
  rateSource: ['报价来源', '報價來源', 'Price source', '料金の出典'],
  termOrder: ['按此周期订购', '依此週期訂購', 'Order for this term', 'この周期で注文']
};
for (const [key, values] of Object.entries(billingLabels)) {
  editionLangs.forEach((language, i) => { WORDS[language][key] = values[i]; });
}

function billingSelection() {
  return document.getElementById('term')?.value || '';
}

function billingTiers(plan) {
  return plan.spec?.tiers?.length ? plan.spec.tiers : [plan.spec];
}

// Each rate belongs to the exact SKU at this facility. Hardware tiers cannot share rates.
function billingOptionsForPlan(plan, spec = billingTierForDisplay(plan)) {
  if (!spec) return [];
  const rates = new Map();
  for (const rate of [spec, ...(spec.billingRates || [])]) {
    if (!billingTerms.includes(rate.term) || !rate.currency || rate.price == null || rate.price === '') continue;
    const amount = String(rate.price).replaceAll(',', '');
    if (!/^\d+(\.\d+)?$/.test(amount)) continue;
    rates.set(rate.term, {
      term: rate.term, price: rate.price, currency: rate.currency,
      proof: rate.proof || spec.proof || plan.spec?.proof,
      date: rate.date || spec.date || plan.spec?.date,
      priceType: rate.priceType || spec.priceType || plan.spec?.priceType,
      url: rate.url || ''
    });
  }
  const ordered = billingTerms.filter(term => rates.has(term)).map(term => rates.get(term));
  return typeof greenCloudKnownRates === 'function' ? greenCloudKnownRates(plan, spec, ordered) : ordered;
}

function billingSupports(plan, spec, term) {
  return billingOptionsForPlan(plan, spec).some(rate => rate.term === term);
}

function matchesBillingTerm(plan, term = billingSelection()) {
  return !term || billingTiers(plan).some(spec => spec && billingSupports(plan, spec, term));
}

function selectableBillingTiers(plan, term) {
  const supported = billingTiers(plan).filter(spec => spec && (!term || billingSupports(plan, spec, term)));
  const matching = supported.filter(spec => matchesDirectoryHardware(spec));
  return matching.length ? matching : supported;
}

function billingTierForDisplay(plan) {
  const tiers = billingTiers(plan);
  const selected = tiers[selectedTiers.get(plan.id) || 0] || tiers[0];
  const term = billingSelection();
  if ((!term || !selected || billingSupports(plan, selected, term)) && matchesDirectoryHardware(selected)) return selected;
  const choices = selectableBillingTiers(plan, term);
  return choices.includes(selected) ? selected : choices[0] || selected;
}

function billingSpecForDisplay(plan) {
  const spec = billingTierForDisplay(plan);
  const term = billingSelection();
  if (!spec || (!term && !spec.billingRates?.length)) return spec;
  const rate = billingOptionsForPlan(plan, spec).find(entry => entry.term === (term || spec.term));
  return rate ? { ...spec, ...rate } : spec;
}

function appendBillingRates(out, plan, rates = billingOptionsForPlan(plan), includeSingle = false) {
  if (!rates.length || (rates.length < 2 && !includeSingle)) return;
  const block = el('section', null, 'billing-rates');
  block.append(el('h4', tr('termQuotes')));
  const lines = el('dl');
  for (const rate of rates) {
    const row = el('div');
    if (rate.term === billingSelection()) row.className = 'selected-term';
    const amount = el('dd');
    amount.append(el('strong', rate.currency + ' ' + rate.price));
    appendFx(amount,rate.price,rate.currency);
    if (rate.proof) amount.append(link(tr('rateSource') + ' ↗', rate.proof));
    if (rate.url && rate.url !== rate.proof) amount.append(link(tr('termOrder') + ' ↗', rate.url));
    if (rate.date) amount.append(el('time', String(rate.date).slice(0, 10)));
    row.append(el('dt', tr('bill_' + rate.term)), amount);
    lines.append(row);
  }
  block.append(lines);
  out.append(block);
}
