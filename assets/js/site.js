/* SIDM Community site: no dependencies, cookies or tracking. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const opened = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(opened));
      menuButton.textContent = opened ? 'Close menu ×' : 'Menu ☰';
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'Menu ☰';
        menuButton.focus();
      }
    });
  }

  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const input = group.querySelector('[data-search]');
    const buttons = Array.from(group.querySelectorAll('[data-category]'));
    const list = document.querySelector(group.dataset.filterGroup);
    if (!list) return;
    const cards = Array.from(list.querySelectorAll('[data-item]'));
    const count = group.querySelector('[data-results-count]');
    const noResults = document.querySelector(group.dataset.noResults);
    let category = 'all';
    const update = () => {
      const term = (input?.value || '').trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const haystack = (card.dataset.searchText || card.textContent || '').toLocaleLowerCase();
        const matchesCategory = category === 'all' || (card.dataset.tags || '').split(',').includes(category);
        const show = matchesCategory && (!term || haystack.includes(term));
        card.hidden = !show;
        if (show) visible++;
      });
      if (count) count.textContent = `${visible} of ${cards.length} items shown`;
      if (noResults) noResults.hidden = visible !== 0;
    };
    if (input) input.addEventListener('input', update);
    buttons.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.category;
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      update();
    }));
    update();
  });

  // Optional live display of public project proposals. Issues in sidm-community
  // with label 'project' appear here automatically, without rebuilding the site.
  const projectList = document.getElementById('live-projects');
  const liveStatus = document.getElementById('live-status');
  if (projectList && liveStatus) {
    const url = 'https://api.github.com/repos/SIDM-Community/sidm-community/issues?state=open&labels=project&per_page=20';
    const excerpt = (text, max = 210) => {
      const normal = (text || '').replace(/[#>*`\[\]()!|]/g, ' ').replace(/\s+/g, ' ').trim();
      return normal.length > max ? `${normal.slice(0, max).trimEnd()}…` : normal;
    };
    fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      .then(response => { if (!response.ok) throw new Error('GitHub request unavailable'); return response.json(); })
      .then(issues => {
        const publicIssues = issues.filter(issue => !issue.pull_request).slice(0, 12);
        projectList.replaceChildren();
        if (!publicIssues.length) {
          liveStatus.textContent = 'There are no open issues labelled “project” yet. The community can use GitHub Issues to propose its first projects.';
          return;
        }
        for (const issue of publicIssues) {
          const card = document.createElement('article');
          card.className = 'live-item';
          const title = document.createElement('a');
          title.href = issue.html_url;
          title.textContent = issue.title;
          title.target = '_blank';
          title.rel = 'noopener noreferrer';
          const body = document.createElement('p');
          body.textContent = excerpt(issue.body || 'Open the proposal and contribute to the discussion.');
          const meta = document.createElement('span');
          meta.className = 'small-note';
          meta.textContent = `Proposal #${issue.number} · ${issue.comments} comment${issue.comments === 1 ? '' : 's'}`;
          card.append(title, body, meta);
          projectList.append(card);
        }
        liveStatus.textContent = `${publicIssues.length} open project proposal${publicIssues.length === 1 ? '' : 's'} from the SIDM community repository.`;
      })
      .catch(() => {
        liveStatus.textContent = 'The live proposals feed is temporarily unavailable. View proposals directly in the community repository.';
      });
  }
})();
