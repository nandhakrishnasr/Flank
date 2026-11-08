/**
 * Flank Marketing Website — Interactive Scripts & Desktop Emulator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Site Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;

  // Check stored preference or system preference
  const savedTheme = localStorage.getItem('flank_site_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.add('theme-animating');
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('flank_site_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  // 2. Interactive Windows 11 Taskbar Clock
  const emuClock = document.getElementById('taskbar-clock');
  const emuDate = document.getElementById('taskbar-date');
  function updateEmuClock() {
    const now = new Date();
    if (emuClock) {
      emuClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (emuDate) {
      emuDate.textContent = now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
    }
  }
  updateEmuClock();
  setInterval(updateEmuClock, 1000);

  // 3. Desktop Emulator Controls (Theme, Wallpaper, Edge)
  const emuDock = document.getElementById('emu-dock');
  const emuWindow = document.getElementById('emu-window');
  const desktopStage = document.getElementById('desktop-stage');
  const cardFlyout = document.getElementById('emu-card-flyout');

  // Wallpaper Switcher
  document.querySelectorAll('[data-set-wp]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-set-wp]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wp = btn.getAttribute('data-set-wp');
      if (emuWindow) {
        emuWindow.className = `emulator-window wp-${wp}`;
      }
    });
  });

  // Dock Theme Switcher
  document.querySelectorAll('[data-set-dock-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-set-dock-theme]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.getAttribute('data-set-dock-theme');
      if (emuDock) {
        emuDock.className = `emu-dock theme-${theme}`;
      }
      if (cardFlyout) {
        cardFlyout.className = `emu-card-flyout visible theme-${theme}`;
      }
    });
  });

  // Dock Edge Switcher
  const edgeToggleBtn = document.getElementById('toggle-dock-edge');
  if (edgeToggleBtn) {
    edgeToggleBtn.addEventListener('click', () => {
      const isLeft = desktopStage.classList.toggle('edge-left');
      edgeToggleBtn.textContent = isLeft ? 'Edge: Left' : 'Edge: Right';
    });
  }

  // 4. Dock Collapse / Expand Notch
  const collapseBtn = document.getElementById('emu-dock-collapse');
  const collapsedTab = document.getElementById('emu-collapsed-tab');

  if (collapseBtn && emuDock) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      emuDock.classList.add('collapsed');
      if (cardFlyout) cardFlyout.classList.remove('visible');
    });
  }

  if (collapsedTab && emuDock) {
    collapsedTab.addEventListener('click', (e) => {
      e.stopPropagation();
      emuDock.classList.remove('collapsed');
    });
  }

  // 5. Interactive Widget Cards Data & Rendering
  const widgetData = {
    weather: {
      title: 'Weather & Forecast',
      badge: 'Coimbatore · 28°C',
      content: `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div>
            <div style="font-size:32px; font-weight:800; line-height:1;">28°</div>
            <div style="font-size:12px; opacity:0.8;">Partly Cloudy · H:31° L:23°</div>
          </div>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </div>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px; text-align:center; font-size:11px;">
          <div style="background:rgba(128,128,128,0.1); padding:6px; border-radius:8px;"><div>Now</div><div style="font-weight:700;">28°</div></div>
          <div style="background:rgba(128,128,128,0.1); padding:6px; border-radius:8px;"><div>15:00</div><div style="font-weight:700;">29°</div></div>
          <div style="background:rgba(128,128,128,0.1); padding:6px; border-radius:8px;"><div>16:00</div><div style="font-weight:700;">27°</div></div>
          <div style="background:rgba(128,128,128,0.1); padding:6px; border-radius:8px;"><div>17:00</div><div style="font-weight:700;">25°</div></div>
        </div>
      `
    },
    player: {
      title: 'Media Player',
      badge: 'Spotify · Playing',
      content: `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
          <div style="width:44px; height:44px; border-radius:8px; background:linear-gradient(135deg, #1DB954, #191414); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800;">♪</div>
          <div style="overflow:hidden;">
            <div style="font-size:13px; font-weight:700; white-space:nowrap; text-overflow:ellipsis;">Starboy</div>
            <div style="font-size:11px; opacity:0.8;">The Weeknd · Daft Punk</div>
          </div>
        </div>
        <div style="width:100%; height:4px; border-radius:2px; background:rgba(128,128,128,0.2); position:relative; margin-bottom:12px;">
          <div style="width:62%; height:100%; background:var(--accent); border-radius:2px;"></div>
        </div>
        <div style="display:flex; justify-content:center; gap:16px;">
          <button style="color:currentColor;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg></button>
          <button style="width:32px; height:32px; border-radius:50%; background:var(--accent); color:#fff; display:flex; align-items:center; justify-content:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg></button>
          <button style="color:currentColor;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg></button>
        </div>
      `
    },
    stats: {
      title: 'System Diagnostics',
      badge: '16 Cores · 3.8 GHz',
      content: `
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;"><span>CPU Load</span><span style="font-weight:700;">18%</span></div>
            <div style="width:100%; height:6px; background:rgba(128,128,128,0.2); border-radius:3px; overflow:hidden;"><div style="width:18%; height:100%; background:#10B981;"></div></div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;"><span>RAM Usage</span><span style="font-weight:700;">8.4 / 32 GB (26%)</span></div>
            <div style="width:100%; height:6px; background:rgba(128,128,128,0.2); border-radius:3px; overflow:hidden;"><div style="width:26%; height:100%; background:var(--accent);"></div></div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;"><span>NVMe SSD C:</span><span style="font-weight:700;">28% Full</span></div>
            <div style="width:100%; height:6px; background:rgba(128,128,128,0.2); border-radius:3px; overflow:hidden;"><div style="width:28%; height:100%; background:#F59E0B;"></div></div>
          </div>
        </div>
      `
    },
    battery: {
      title: 'Laptop Battery',
      badge: '100% · AC Power',
      content: `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>
          <div>
            <div style="font-size:14px; font-weight:700;">Fully Charged</div>
            <div style="font-size:11px; opacity:0.8;">Power Adapter Connected (65W)</div>
          </div>
        </div>
        <div style="font-size:11px; opacity:0.7;">Discharge rate: 0.0 W · Cycle count: 42</div>
      `
    },
    clipboard: {
      title: 'Clipboard History',
      badge: '24 Items Saved',
      content: `
        <div style="font-size:11px; opacity:0.8; margin-bottom:8px;">Latest copied item:</div>
        <div style="background:rgba(128,128,128,0.1); padding:8px; border-radius:6px; font-family:var(--font-mono); font-size:11px; margin-bottom:8px; word-break:break-all;">
          https://github.com/nandhakrishna/flank
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11px;">
          <span>Shortcut: <strong>Ctrl+Alt+V</strong></span>
          <span style="color:var(--accent); font-weight:600; cursor:pointer;">View all →</span>
        </div>
      `
    },
    focus: {
      title: 'Focus Timer',
      badge: 'Deep Work',
      content: `
        <div style="text-align:center; padding:6px 0;">
          <div style="font-size:32px; font-weight:800; font-family:var(--font-mono);">25:00</div>
          <div style="font-size:11px; opacity:0.8; margin-bottom:12px;">Session 1 of 4 · Pomodoro</div>
          <button style="padding:6px 18px; border-radius:18px; background:var(--accent); color:#fff; font-size:12px; font-weight:700;">Start Focus</button>
        </div>
      `
    },
    audio: {
      title: 'Audio Mixer',
      badge: '68% Volume',
      content: `
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;"><span>Headphones (WH-1000XM5)</span><span>68%</span></div>
            <input type="range" min="0" max="100" value="68" style="width:100%; accent-color:var(--accent);">
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <span>Microphone Array</span>
            <span style="color:#10B981; font-weight:700;">Active</span>
          </div>
        </div>
      `
    }
  };

  // Click on dock tile to switch card flyout
  document.querySelectorAll('.emu-tile[data-widget]').forEach(tile => {
    tile.addEventListener('click', () => {
      document.querySelectorAll('.emu-tile[data-widget]').forEach(t => t.classList.remove('active'));
      tile.classList.add('active');

      const wKind = tile.getAttribute('data-widget');
      const data = widgetData[wKind] || widgetData['weather'];

      if (cardFlyout) {
        cardFlyout.innerHTML = `
          <div class="card-header">
            <span class="card-title">${data.title}</span>
            <span class="card-status-badge">${data.badge}</span>
          </div>
          <div class="card-body">
            ${data.content}
          </div>
        `;
        cardFlyout.classList.add('visible');
      }
    });
  });

  // 6. Interactive Clipboard Showcase Demo
  const clipItems = [
    { id: 1, type: 'link', title: 'Claude 3.7 Sonnet System Card', text: 'https://anthropic.com/research/claude-3-7-sonnet', meta: 'link · anthropic.com · 2m ago' },
    { id: 2, type: 'code', title: 'DWMWA_SYSTEMBACKDROP_TYPE enum', text: 'DWMSBT_AUTO = 0; DWMSBT_ACRYLIC = 3;', meta: 'code · Python snippet · 8m ago' },
    { id: 3, type: 'text', title: 'Flank Brand Deep Blue Token', text: '--flank-brand-blue: #2F4BFF;', meta: 'text · CSS snippet · 14m ago' },
    { id: 4, type: 'code', title: 'Win32 WM_SETICON Dispatch', text: 'user32.SendMessageW(hwnd, 0x0080, 1, h_big)', meta: 'code · Win32 CTypes · 24m ago' },
    { id: 5, type: 'link', title: 'Google Antigravity Documentation', text: 'https://deepmind.google/technologies/antigravity', meta: 'link · Google DeepMind · 1h ago' },
    { id: 6, type: 'text', title: 'Fast local SQLite query pattern', text: 'SELECT * FROM clips ORDER BY timestamp DESC LIMIT 40', meta: 'text · SQL statement · 2h ago' }
  ];

  const clipListContainer = document.getElementById('demo-clip-list');
  const clipSearchInput = document.getElementById('demo-clip-search');
  const clipTabs = document.querySelectorAll('[data-clip-filter]');

  let activeClipFilter = 'all';
  let activeClipQuery = '';

  function renderClipDemo() {
    if (!clipListContainer) return;
    const filtered = clipItems.filter(item => {
      const matchType = activeClipFilter === 'all' || item.type === activeClipFilter;
      const matchQuery = !activeClipQuery || item.title.toLowerCase().includes(activeClipQuery.toLowerCase()) || item.text.toLowerCase().includes(activeClipQuery.toLowerCase());
      return matchType && matchQuery;
    });

    if (filtered.length === 0) {
      clipListContainer.innerHTML = `
        <div style="text-align:center; padding:24px; color:var(--text-muted); font-size:13px;">
          No matching clips found
        </div>
      `;
      return;
    }

    clipListContainer.innerHTML = filtered.map(item => `
      <div class="clip-item-card" data-copy-text="${encodeURIComponent(item.text)}">
        <div class="clip-info">
          <span class="clip-item-title">${item.title}</span>
          <span class="clip-item-meta">${item.meta}</span>
        </div>
        <button class="clip-copy-btn" title="Copy to clipboard">Copy</button>
      </div>
    `).join('');

    clipListContainer.querySelectorAll('.clip-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.clip-item-card');
        const text = decodeURIComponent(card.getAttribute('data-copy-text'));
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied!';
          btn.style.background = '#10B981';
          btn.style.color = '#fff';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.style.background = '';
            btn.style.color = '';
          }, 1500);
        });
      });
    });
  }

  if (clipSearchInput) {
    clipSearchInput.addEventListener('input', (e) => {
      activeClipQuery = e.target.value;
      renderClipDemo();
    });
  }

  clipTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      clipTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeClipFilter = tab.getAttribute('data-clip-filter');
      renderClipDemo();
    });
  });

  renderClipDemo();

  // 7. FAQ Accordion Toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // 8. Custom Hue Slider for Theme Customizer Section
  const hueSlider = document.getElementById('custom-hue-slider');
  const huePreviewSwatch = document.getElementById('hue-preview-swatch');
  if (hueSlider) {
    hueSlider.addEventListener('input', (e) => {
      const hue = e.target.value;
      const color = `hsl(${hue}, 90%, 55%)`;
      if (huePreviewSwatch) huePreviewSwatch.style.backgroundColor = color;
      if (emuDock) emuDock.style.setProperty('--flank-color-accent', color);
      document.documentElement.style.setProperty('--accent', color);
    });
  }
});
