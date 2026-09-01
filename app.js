(() => {
  'use strict';

  const WHATSAPP_NUMBER = '628123456789';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem('asn-theme');
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('asn-theme', theme);
    } catch {
      // The website still works when storage is disabled.
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap');
      toggle.title = isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap';
    }
  }

  const preferredTheme = getStoredTheme()
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferredTheme);

  function setupCommonNavigation() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuButton = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    themeToggle?.addEventListener('click', () => {
      const theme = root.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(theme);
      setStoredTheme(theme);
    });

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.setAttribute('aria-controls', 'mobileMenu');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.setAttribute('aria-label', 'Buka menu navigasi');

      const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-label', 'Buka menu navigasi');
      };

      mobileMenuButton.addEventListener('click', () => {
        const willOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !willOpen);
        mobileMenuButton.setAttribute('aria-expanded', String(willOpen));
        mobileMenuButton.setAttribute('aria-label', willOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      });

      mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
          closeMenu();
          mobileMenuButton.focus();
        }
      });
    }

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.setAttribute('rel', 'noopener noreferrer');
    });

    const year = String(new Date().getFullYear());
    document.querySelectorAll('footer p').forEach((paragraph) => {
      if (paragraph.textContent.includes('© 2026')) {
        paragraph.innerHTML = paragraph.innerHTML.replace('© 2026', `© ${year}`);
      }
    });
  }

  const createWhatsAppUrl = (lines) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

  function setupProductCatalog() {
    const grid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    if (!grid || !searchInput) return;

    const items = [...grid.querySelectorAll('.product-item')];
    const pills = [...document.querySelectorAll('.cat-pill')];
    const validCategories = new Set(['all', ...items.map((item) => item.dataset.category)]);
    const requestedCategory = new URLSearchParams(window.location.search).get('category');
    let activeCategory = validCategories.has(requestedCategory) ? requestedCategory : 'all';

    const resultStatus = document.createElement('p');
    resultStatus.id = 'productResultStatus';
    resultStatus.className = 'col-span-full text-center text-sm text-slate-500 dark:text-slate-400 py-8';
    resultStatus.setAttribute('role', 'status');
    resultStatus.setAttribute('aria-live', 'polite');

    const updatePills = () => {
      pills.forEach((pill) => {
        const selected = pill.id === `btn-${activeCategory}`;
        pill.classList.toggle('bg-brand', selected);
        pill.classList.toggle('text-white', selected);
        pill.classList.toggle('bg-slate-200/80', !selected);
        pill.classList.toggle('dark:bg-industrial-800', !selected);
        pill.classList.toggle('text-slate-600', !selected);
        pill.classList.toggle('dark:text-slate-300', !selected);
        pill.setAttribute('aria-pressed', String(selected));
      });
    };

    const renderProducts = () => {
      const query = searchInput.value.trim().toLocaleLowerCase('id');
      let visibleCount = 0;

      items.forEach((item) => {
        const matchesCategory = activeCategory === 'all' || item.dataset.category === activeCategory;
        const matchesSearch = !query || item.textContent.toLocaleLowerCase('id').includes(query);
        const visible = matchesCategory && matchesSearch;
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      resultStatus.textContent = visibleCount
        ? `${visibleCount} produk ditemukan.`
        : 'Produk yang Anda cari belum tersedia. Coba kata kunci atau kategori lain.';
      grid.appendChild(resultStatus);
      updatePills();
    };

    window.filterCategory = (category) => {
      activeCategory = validCategories.has(category) ? category : 'all';
      const url = new URL(window.location.href);
      if (activeCategory === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', activeCategory);
      history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
      renderProducts();
      document.getElementById('productGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.searchProducts = renderProducts;
    searchInput.removeAttribute('onkeyup');
    searchInput.addEventListener('input', renderProducts);
    searchInput.setAttribute('aria-label', 'Cari produk');
    renderProducts();
  }

  function setupRfqModal() {
    const modal = document.getElementById('rfqModal');
    const itemInput = document.getElementById('modalItemInput');
    if (!modal || !itemInput) return;

    const panel = modal.firstElementChild;
    const nameInput = document.getElementById('modalName');
    const phoneInput = document.getElementById('modalPhone');
    const noteInput = document.getElementById('modalNote');
    let returnFocus = null;

    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'rfqModalTitle');
    modal.setAttribute('aria-hidden', 'true');
    nameInput.required = true;
    phoneInput.required = true;

    window.openRfqModal = (item, category) => {
      returnFocus = document.activeElement;
      itemInput.value = `${item} (${category})`;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => nameInput.focus(), 0);
    };

    window.closeRfqModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      returnFocus?.focus();
    };

    window.sendModalWhatsApp = () => {
      const requiredFields = [nameInput, phoneInput];
      const invalidField = requiredFields.find((field) => !field.checkValidity());
      if (invalidField) {
        invalidField.reportValidity();
        return;
      }

      const url = createWhatsAppUrl([
        'Halo CV Agape Sinar Nirwana,',
        '',
        'Saya ingin meminta penawaran harga (RFQ) untuk:',
        `- Item: ${itemInput.value}`,
        `- Nama/Perusahaan: ${nameInput.value.trim()}`,
        `- Telp/WA: ${phoneInput.value.trim()}`,
        `- Catatan: ${noteInput.value.trim() || 'Mohon penawaran harga resmi.'}`,
        '',
        'Terima kasih.'
      ]);

      window.open(url, '_blank', 'noopener,noreferrer');
      window.closeRfqModal();
    };

    modal.addEventListener('mousedown', (event) => {
      if (event.target === modal) window.closeRfqModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        window.closeRfqModal();
      }
    });

    panel?.querySelector('button')?.setAttribute('aria-label', 'Tutup formulir penawaran');
  }

  function setupContactForm() {
    const form = document.getElementById('rfqForm');
    if (!form) return;

    const categorySelect = document.getElementById('categorySelect');
    const requestedCategory = new URLSearchParams(window.location.search).get('cat');
    if (requestedCategory) {
      const option = [...categorySelect.options].find((item) =>
        item.value.toLocaleLowerCase('id').includes(requestedCategory.toLocaleLowerCase('id'))
      );
      if (option) categorySelect.value = option.value;
    }

    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const url = createWhatsAppUrl([
        'Halo CV Agape Sinar Nirwana,',
        '',
        'Saya ingin mengajukan Permintaan Penawaran Harga Resmi (RFQ):',
        `- PIC: ${document.getElementById('picName').value.trim()}`,
        `- Perusahaan/Site: ${document.getElementById('companyName').value.trim()}`,
        `- Email: ${document.getElementById('email').value.trim()}`,
        `- No. Kontak: ${document.getElementById('phone').value.trim()}`,
        `- Kategori Kebutuhan: ${categorySelect.value}`,
        `- Rincian Barang & Volume: ${document.getElementById('itemsList').value.trim()}`,
        '',
        'Mohon agar dapat ditindaklanjuti. Terima kasih.'
      ]);

      window.open(url, '_blank', 'noopener,noreferrer');
    };

    form.addEventListener('submit', handleFormSubmit);
    form.dataset.enhanced = 'true';
  }

  setupCommonNavigation();
  setupProductCatalog();
  setupRfqModal();
  setupContactForm();
})();
