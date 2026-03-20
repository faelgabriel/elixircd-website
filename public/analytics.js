(function () {
  if (typeof window.gtag !== 'function') {
    return;
  }

  const trackedPageViews = new Set();
  let lastSearchQuery = '';
  let lastSearchResultsQuery = '';
  let lastTrackedPageLocation = document.referrer || '';
  let searchTimer;

  function normalizePathname(pathname) {
    if (!pathname) return '/';
    return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  }

  function getPageContext(url = window.location) {
    const pathname = normalizePathname(url.pathname);
    const segments = pathname.split('/').filter(Boolean);
    const docSection = segments[0] || 'home';
    const docSlug = segments.slice(1).join('/') || 'index';

    return {
      page_title: document.title,
      page_location: url.href,
      page_path: pathname + url.search,
      page_section: docSection,
      page_slug: docSlug,
    };
  }

  function trackEvent(eventName, params) {
    window.gtag('event', eventName, params);
  }

  function trackPageView() {
    const pageContext = getPageContext();
    const key = [
      normalizePathname(window.location.pathname),
      window.location.search,
      document.title,
    ].join('|');

    if (trackedPageViews.has(key)) {
      return;
    }

    trackedPageViews.add(key);
    trackEvent('page_view', {
      ...pageContext,
      page_referrer: lastTrackedPageLocation || undefined,
    });
    lastTrackedPageLocation = pageContext.page_location;
    lastSearchQuery = '';
    lastSearchResultsQuery = '';
  }

  function trackSearch(query) {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2 || trimmedQuery === lastSearchQuery) {
      return;
    }

    lastSearchQuery = trimmedQuery;

    trackEvent('search', {
      search_term: trimmedQuery,
      ...getPageContext(),
    });

    if (trimmedQuery === lastSearchResultsQuery) {
      return;
    }

    lastSearchResultsQuery = trimmedQuery;

    trackEvent('view_search_results', {
      search_term: trimmedQuery,
      ...getPageContext(),
    });
  }

  document.addEventListener('astro:page-load', trackPageView);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageView, { once: true });
  } else {
    trackPageView();
  }

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const searchOpenButton = target.closest('button[data-open-modal]');
    if (searchOpenButton) {
      trackEvent('search_open', getPageContext());
      return;
    }

    const searchResultLink = target.closest('#starlight__search .pagefind-ui__result-link');
    if (searchResultLink instanceof HTMLAnchorElement) {
      trackEvent('select_item', {
        item_list_name: 'site_search',
        search_term: lastSearchQuery || undefined,
        items: [
          {
            item_id: searchResultLink.pathname,
            item_name: searchResultLink.textContent?.trim().slice(0, 120) || searchResultLink.pathname,
            item_category: 'documentation',
            item_list_id: 'starlight_pagefind',
            item_list_name: 'site_search',
            item_variant: 'search_result',
          },
        ],
        destination: searchResultLink.href,
        ...getPageContext(),
      });
      return;
    }
  });

  document.addEventListener('input', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (!target.matches('#starlight__search .pagefind-ui__search-input')) {
      return;
    }

    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => trackSearch(target.value), 800);
  });
})();
