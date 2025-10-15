    (() => {
      // ---------- DOM refs ----------
      const tbody = document.querySelector('#data-table tbody')
      const qInput = document.getElementById('q')
      const btnDropdown = document.getElementById('btnDropdown')
      const dropdown = document.getElementById('dropdown')
      const listInd = document.getElementById('listInd')
      const listProd = document.getElementById('listProd')
      const btnAllInd = document.getElementById('btnAllInd')
      const btnAllProd = document.getElementById('btnAllProd')
      const btnLabel = document.getElementById('btnLabel')

      const aside = document.getElementById('aside')
      const page = document.getElementById('page')
      const btnCollapse = document.getElementById('btnCollapse')
      const collapseIcon = btnCollapse?.querySelector('.bx')
      const collapseLabel = btnCollapse?.querySelector('[data-collapse-label]') || btnCollapse?.querySelector('span')

      const btnAside = document.getElementById('btnAside')
      const backdrop = document.getElementById('backdrop')

      if (!tbody || !qInput || !btnDropdown || !dropdown || !listInd || !listProd || !aside || !page || !btnCollapse) return

      // ---------- State ----------
      let allRows = []
      let timer = null
      let mobileOpen = false

      // ---------- Utils ----------
      const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      } [m]))
      const markify = (s, terms) => {
        const e = esc(s)
        if (!terms.length) return e
        const pat = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
        return e.replace(new RegExp(`(${pat})`, 'gi'), '<mark class="bg-yellow-200 text-inherit px-0.5 rounded">$1</mark>')
      }
      const uniqueSorted = arr => [...new Set(arr.filter(Boolean).map(v => String(v).trim()))].sort((a, b) => a.localeCompare(b))

      // ---------- Table render ----------
      const render = (rows, terms) => {
        if (!rows.length) {
          tbody.innerHTML = '<tr><td colspan="9" class="py-6 text-center text-zinc-600">Tidak ada data</td></tr>'
          return
        }
        tbody.innerHTML = rows.map((r, i) => {
          const created = r.created_at ? new Date(r.created_at).toLocaleString() : ''
          return `
        <tr class="hover:bg-zinc-50">
          <td class="py-3 px-4 text-center whitespace-nowrap">${i+1}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(r.fullname, terms)}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(r.email, terms)}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(r.company, terms)}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(r.industry, terms)}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(r.phone, terms)}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(r.product, terms)}</td>
          <td class="py-3 px-4 text-center">${markify(r.description, terms)}</td>
          <td class="py-3 px-4 text-center whitespace-nowrap">${markify(created, terms)}</td>
        </tr>`
        }).join('')
      }

      // ---------- Filters (dropdown + search) ----------
      const selected = () => {
        const inds = [...listInd.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value)
        const prods = [...listProd.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value)
        return {
          inds,
          prods
        }
      }
      const populateDropdown = rows => {
        const inds = uniqueSorted(rows.map(r => r.industry))
        const prods = uniqueSorted(rows.map(r => r.product))
        const url = new URLSearchParams(location.search)
        const tags = (url.get('tags') || '').split(',').map(s => s.trim()).filter(Boolean)
        const initInds = tags.filter(t => t.startsWith('ind:')).map(t => t.slice(4))
        const initProds = tags.filter(t => t.startsWith('prd:')).map(t => t.slice(4))

        listInd.innerHTML = inds.map(v => `
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" value="${esc(v)}" ${initInds.includes(v)?'checked':''} class="h-4 w-4 rounded border-zinc-300 accent-[#028f46]">
        <span>${esc(v)}</span>
      </label>`).join('')

        listProd.innerHTML = prods.map(v => `
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" value="${esc(v)}" ${initProds.includes(v)?'checked':''} class="h-4 w-4 rounded border-zinc-300 accent-[#028f46]">
        <span>${esc(v)}</span>
      </label>`).join('')

        updateBtnLabel()
      }
      const tagsFromSelected = () => {
        const {
          inds,
          prods
        } = selected()
        return [...inds.map(v => `ind:${v}`), ...prods.map(v => `prd:${v}`)]
      }
      const syncURL = q => {
        const u = new URL(location.href)
        const tags = tagsFromSelected()
        q ? u.searchParams.set('q', q) : u.searchParams.delete('q')
        tags.length ? u.searchParams.set('tags', tags.join(',')) : u.searchParams.delete('tags')
        history.replaceState(null, '', u.toString())
      }
      const filterLocal = q => {
        const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
        const {
          inds,
          prods
        } = selected()
        const sInd = new Set(inds.map(x => x.toLowerCase()))
        const sPrd = new Set(prods.map(x => x.toLowerCase()))
        const hasTags = sInd.size > 0 || sPrd.size > 0
        const rows = allRows.filter(r => {
          if (hasTags) {
            const ind = String(r.industry || '').toLowerCase()
            const prd = String(r.product || '').toLowerCase()
            const match = (sInd.size && sInd.has(ind)) || (sPrd.size && sPrd.has(prd))
            if (!match) return false
          }
          if (!terms.length) return true
          const hay = [r.fullname, r.email, r.company, r.industry, r.phone, r.product, r.description,
            r.created_at ? new Date(r.created_at).toLocaleString() : ''
          ].join(' ').toLowerCase()
          return terms.every(t => hay.includes(t))
        })
        return {
          rows,
          terms
        }
      }
      const updateBtnLabel = () => {
        const {
          inds,
          prods
        } = selected()
        const n = inds.length + prods.length
        btnLabel.textContent = n ? `Filter (${n})` : 'Filter'
      }
      const runFilter = () => {
        const q = qInput.value.trim()
        const {
          rows,
          terms
        } = filterLocal(q)
        render(rows, terms)
        syncURL(q)
        updateBtnLabel()
      }
      const onType = () => {
        clearTimeout(timer);
        timer = setTimeout(runFilter, 120)
      }

      // ---------- Listeners: filter/search/dropdown ----------
      btnDropdown.addEventListener('click', () => dropdown.classList.toggle('hidden'))
      document.addEventListener('click', e => {
        const within = e.target.closest('#dropdown') || e.target.closest('#btnDropdown')
        if (!within) dropdown.classList.add('hidden')
      })
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') dropdown.classList.add('hidden')
      })

      listInd.addEventListener('change', runFilter)
      listProd.addEventListener('change', runFilter)
      btnAllInd.addEventListener('click', () => {
        listInd.querySelectorAll('input[type="checkbox"]:checked').forEach(i => i.checked = false);
        runFilter()
      })
      btnAllProd.addEventListener('click', () => {
        listProd.querySelectorAll('input[type="checkbox"]:checked').forEach(i => i.checked = false);
        runFilter()
      })
      qInput.addEventListener('input', onType)
      qInput.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          qInput.value = '';
          runFilter()
        }
      })

      // ---------- Init: fetch data ----------
      const init = () => {
        const url = new URLSearchParams(location.search)
        const initQ = url.get('q') || ''
        qInput.value = initQ
        tbody.innerHTML = '<tr><td colspan="9" class="py-6 text-center text-zinc-600">Memuat data...</td></tr>'
        fetch('../api/get-data.php')
          .then(r => r.status === 401 ? (location.href = '../admin/', Promise.reject()) : r.json())
          .then(rows => {
            allRows = Array.isArray(rows) ? rows : [];
            populateDropdown(allRows);
            runFilter()
          })
          .catch(() => {
            tbody.innerHTML = '<tr><td colspan="9" class="py-6 text-center text-red-600">Gagal memuat data</td></tr>'
          })
      }
      init()

      // ---------- Sidebar: collapse/expand (icons-only) ----------
      const getLabels = () => aside.querySelectorAll('.aside-label')
      const getLinks = () => aside.querySelectorAll('.aside-link')

      const collapseLinks = () => {
        getLinks().forEach(link => {
          link.classList.remove('gap-3', 'px-3')
          link.classList.add('gap-0', 'px-0', 'justify-center')
        })
      }
      const expandLinks = () => {
        getLinks().forEach(link => {
          link.classList.remove('gap-0', 'px-0', 'justify-center')
          link.classList.add('gap-3', 'px-3')
        })
      }
      const hideMenuLabels = () => {
        getLabels().forEach(l => l.classList.add('hidden'))
      }
      const showMenuLabels = () => {
        getLabels().forEach(l => l.classList.remove('hidden'))
      }

      const setCollapsed = v => {
        aside.dataset.state = v ? 'collapsed' : 'expanded'
        aside.classList.toggle('w-20', v)
        aside.classList.toggle('w-64', !v)
        page.classList.toggle('lg:pl-20', v)
        page.classList.toggle('lg:pl-64', !v)

        collapseIcon?.classList.add('transition-transform', 'duration-200', 'ease-linear')
        collapseIcon?.classList.toggle('rotate-180', v)

        if (v) {
          hideMenuLabels()
          collapseLinks()
          // tombol collapse jadi ikon-only, center, compact
          collapseLabel?.classList.add('hidden')
          btnCollapse.classList.remove('justify-between', 'px-3', 'w-full')
          btnCollapse.classList.add('justify-center', 'px-0', 'w-10', 'mx-auto')
        } else {
          showMenuLabels()
          expandLinks()
          // tombol collapse kembali normal
          collapseLabel?.classList.remove('hidden')
          btnCollapse.classList.remove('justify-center', 'px-0', 'w-10', 'mx-auto')
          btnCollapse.classList.add('justify-between', 'px-3', 'w-full')
        }
      }

      const toggleCollapsed = () => setCollapsed(!(aside.dataset.state === 'collapsed' || aside.classList.contains('w-20')))
      // Sinkronisasi awal (kalau server sudah render w-20)
      setCollapsed(aside.classList.contains('w-20'))
      // Wire single handler (hindari duplikasi)
      btnCollapse.onclick = toggleCollapsed

      // ---------- Mobile drawer ----------
      const openMobileAside = () => {
        mobileOpen = true
        aside.classList.remove('-translate-x-full')
        aside.classList.add('translate-x-0')
        backdrop?.classList.remove('pointer-events-none', 'opacity-0')
        backdrop?.classList.add('pointer-events-auto', 'opacity-100', 'transition-opacity', 'duration-200', 'ease-out')
        document.body.style.overflow = 'hidden'
      }
      const closeMobileAside = () => {
        mobileOpen = false
        aside.classList.add('-translate-x-full')
        aside.classList.remove('translate-x-0')
        backdrop?.classList.add('opacity-0', 'pointer-events-none')
        backdrop?.classList.remove('opacity-100', 'pointer-events-auto')
        document.body.style.overflow = ''
      }
      btnAside?.addEventListener('click', openMobileAside)
      backdrop?.addEventListener('click', closeMobileAside)
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMobileAside()
      })
    })()
    // ---------- Notify Demo ----------
     document.querySelectorAll('.toggle-btn').forEach(function(btn) {
            btn.addEventListener('click', async function() {
                const id = btn.getAttribute('data-id');
                const current = btn.getAttribute('data-state') === '1' ? 1 : 0;
                const next = current ? 0 : 1;

                const formData = new FormData();
                formData.append('id', id);
                formData.append('notify_demo', next);

                try {
                    const res = await fetch('../api/update_notify.php', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();

                    if (data && data.success) {
                        btn.setAttribute('data-state', String(next));
                        const span = btn.querySelector('span');
                        const icon = btn.querySelector('i');

                        if (next === 1) {
                            btn.className = 'toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors bg-[#028f46] border-[#028f46] text-white hover:bg-[#028f46]';
                            span.textContent = 'Aktif';
                            icon.className = 'bx bx-bell text-base mr-1.5';
                        } else {
                            btn.className = 'toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors bg-rose-600 border-rose-700 text-white hover:bg-rose-700';
                            span.textContent = 'Nonaktif';
                            icon.className = 'bx bx-bell-off text-base mr-1.5';
                        }
                    } else {
                        alert('Gagal memperbarui status');
                    }
                } catch (e) {
                    alert('Terjadi kesalahan jaringan');
                }
            });
        });
        // ---------- Modal Register Admin ----------
        const modal = document.getElementById('registerModal');
        const openBtn = document.getElementById('openModalBtn');
        const closeBtn = document.getElementById('closeModalBtn');
        let isAnimating = false;

        openBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            modal.classList.add('active');
            setTimeout(() => isAnimating = false, 400);
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        document.getElementById("register-form").addEventListener("submit", async function(e) {
            e.preventDefault();

            const formData = new FormData(this);

            const password = formData.get("password");
            const confirm = formData.get("confirm_password");

            if (password !== confirm) {
                document.getElementById("error-message").textContent = "Password dan konfirmasi tidak cocok.";
                return;
            }

            try {
                const res = await fetch("../api/register.php", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();

                if (data.status === "success") {
                    alert("Admin berhasil ditambahkan!");
                    window.location.reload();
                } else {
                    document.getElementById("error-message").textContent = data.message || "Gagal menambah admin.";
                }
            } catch (err) {
                document.getElementById("error-message").textContent = "Terjadi kesalahan koneksi.";
            }
        });
  