const affiliateId = '21885';
const offerId = '29465';

const affiliateBaseUrl = 'https://convert.ctypy.com/aff_c';

// -----------------------------
// Generate Affiliate URL
// -----------------------------
function generateAffiliateUrl(query = '') {
  const encodedQuery = encodeURIComponent(query);

  return `${affiliateBaseUrl}?offer_id=${offerId}&aff_id=${affiliateId}&q=${encodedQuery}`;
}

// -----------------------------
// Safe Injector (runs reliably)
// -----------------------------
function updateAffiliateLinks() {
  const links = document.querySelectorAll('a[data-affiliate="true"]');

  links.forEach(link => {
    const query =
      link.dataset.query ||
      link.textContent.trim() ||
      'flight deals';

    link.href = generateAffiliateUrl(query);
  });
}

// -----------------------------
// Safe DOM Ready Handler
// -----------------------------
function initAffiliateSystem() {
  updateAffiliateLinks();
}

// Works in ALL cases (safe + robust)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAffiliateSystem);
} else {
  initAffiliateSystem();
}
