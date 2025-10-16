(function () {
  const q = (s, r = document) => r.querySelector(s);
  const qq = (s, r = document) => Array.from(r.querySelectorAll(s));

  const ensureModal = () => {
    if (q('#logoutModal')) return q('#logoutModal');
    const wrap = document.createElement('div');
    wrap.innerHTML = `
<div id="logoutModal" class="fixed inset-0 z-[70] hidden">
  <div id="logoutBackdrop" class="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 ease-out"></div>
  <div class="absolute inset-0 flex items-center justify-center p-4">
    <div id="logoutPanel" class="w-full max-w-sm origin-center rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-100 opacity-0 scale-95 translate-y-4 transition-all duration-300 ease-out">
      <div class="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
        <h5 class="text-lg font-semibold text-zinc-800">Konfirmasi Logout</h5>
        <button id="logoutClose" aria-label="Close" class="size-10 grid place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-all duration-200 active:scale-95">
          <i class="bx bx-x text-2xl"></i>
        </button>
      </div>
      <div class="px-5 pt-4 pb-2 text-sm text-zinc-700">
        Apakah anda yakin ingin keluar? <br/>
        Segala perubahan yang belum disimpan akan hilang.
      </div>
      <div class="px-5 pb-5 pt-3 flex items-center justify-end gap-2">
        <button id="logoutCancel" class="h-10 px-4 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-sm">Batal</button>
        <a id="logoutConfirm" href="#" class="h-10 px-4 rounded-xl bg-rose-600 text-white hover:bg-rose-700 text-sm grid place-items-center">Logout</a>
      </div>
    </div>
  </div>
</div>`;
    document.body.appendChild(wrap.firstElementChild);
    return q('#logoutModal');
  };

  const animateOpen = (modal) => {
    const backdrop = q('#logoutBackdrop', modal);
    const panel = q('#logoutPanel', modal);
    if (!backdrop || !panel) return;
    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0','scale-95','translate-y-4');
    modal.classList.remove('hidden');
    panel.getBoundingClientRect();
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      panel.classList.remove('opacity-0','scale-95','translate-y-4');
    });
    document.body.style.overflow = 'hidden';
  };

  const animateClose = (modal) => {
    const backdrop = q('#logoutBackdrop', modal);
    const panel = q('#logoutPanel', modal);
    if (!backdrop || !panel) return;
    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0','scale-95','translate-y-4');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  const bind = () => {
    const modal = ensureModal();
    const closeBtn = q('#logoutClose', modal);
    const cancelBtn = q('#logoutCancel', modal);
    const confirmBtn = q('#logoutConfirm', modal);
    let targetHref = null;

    qq('a[href*="logout.php"], a[data-logout], .js-logout').forEach(a => {
      if (a.dataset.__logoutBound) return;
      a.dataset.__logoutBound = '1';
      a.addEventListener('click', (e) => {
        e.preventDefault();
        targetHref = a.getAttribute('href') || a.dataset.href || '../api/logout.php';
        confirmBtn.setAttribute('href', targetHref);
        animateOpen(modal);
        modal.focus();
      });
    });

    closeBtn.addEventListener('click', () => animateClose(modal));
    cancelBtn.addEventListener('click', () => animateClose(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) animateClose(modal); });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('hidden') && e.key === 'Escape') animateClose(modal);
      if (!modal.classList.contains('hidden') && e.key === 'Enter') confirmBtn.click();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
