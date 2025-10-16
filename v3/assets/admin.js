(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const aside = $("#aside");
  const page = $("#page");
  const btnCollapse = $("#btnCollapse");
  const collapseIcon = btnCollapse?.querySelector(".bx");
  const collapseLabel =
    btnCollapse?.querySelector("[data-collapse-label]") ||
    btnCollapse?.querySelector("span");
  const btnAside = $("#btnAside");
  const backdrop = $("#backdrop");

  const getLabels = () => $$(".aside-label", aside || document);
  const getLinks = () => $$(".aside-link", aside || document);

  const collapseLinks = () =>
    getLinks().forEach((link) => {
      link.classList.remove("gap-3", "px-3");
      link.classList.add("gap-0", "px-0", "justify-center");
    });

  const expandLinks = () =>
    getLinks().forEach((link) => {
      link.classList.remove("gap-0", "px-0", "justify-center");
      link.classList.add("gap-3", "px-3");
    });

  const hideMenuLabels = () =>
    getLabels().forEach((l) => l.classList.add("hidden"));
  const showMenuLabels = () =>
    getLabels().forEach((l) => l.classList.remove("hidden"));

  const setCollapsed = (v) => {
    if (!aside || !page || !btnCollapse) return;
    aside.dataset.state = v ? "collapsed" : "expanded";
    aside.classList.toggle("w-20", v);
    aside.classList.toggle("w-64", !v);
    page.classList.toggle("lg:pl-20", v);
    page.classList.toggle("lg:pl-64", !v);
    collapseIcon?.classList.add(
      "transition-transform",
      "duration-200",
      "ease-linear"
    );
    collapseIcon?.classList.toggle("rotate-180", v);
    if (v) {
      hideMenuLabels();
      collapseLinks();
      collapseLabel?.classList.add("hidden");
      btnCollapse.classList.remove("justify-between", "px-3", "w-full");
      btnCollapse.classList.add("justify-center", "px-0", "w-10", "mx-auto");
    } else {
      showMenuLabels();
      expandLinks();
      collapseLabel?.classList.remove("hidden");
      btnCollapse.classList.remove("justify-center", "px-0", "w-10", "mx-auto");
      btnCollapse.classList.add("justify-between", "px-3", "w-full");
    }
  };

  const toggleCollapsed = () =>
    setCollapsed(
      !(
        aside?.dataset.state === "collapsed" ||
        aside?.classList.contains("w-20")
      )
    );

  const openMobileAside = () => {
    if (!aside || !backdrop) return;
    aside.classList.remove("-translate-x-full");
    aside.classList.add("translate-x-0");
    backdrop.classList.remove("pointer-events-none", "opacity-0");
    backdrop.classList.add(
      "pointer-events-auto",
      "opacity-100",
      "transition-opacity",
      "duration-200",
      "ease-out"
    );
    document.body.style.overflow = "hidden";
  };

  const closeMobileAside = () => {
    if (!aside || !backdrop) return;
    aside.classList.add("-translate-x-full");
    aside.classList.remove("translate-x-0");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    backdrop.classList.remove("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "";
  };

  if (btnCollapse && aside && page) {
    setCollapsed(aside.classList.contains("w-20"));
    btnCollapse.onclick = toggleCollapsed;
  }

  btnAside?.addEventListener("click", openMobileAside);
  backdrop?.addEventListener("click", closeMobileAside);
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMobileAside();
  });

  const tbody = $("#data-table tbody");
  const qInput = $("#q");
  const btnDropdown = $("#btnDropdown");
  const dropdown = $("#dropdown");
  const listInd = $("#listInd");
  const listProd = $("#listProd");
  const btnAllInd = $("#btnAllInd");
  const btnAllProd = $("#btnAllProd");
  const btnLabel = $("#btnLabel");

  const hasFilterUI = !!(
    tbody &&
    qInput &&
    btnDropdown &&
    dropdown &&
    listInd &&
    listProd
  );

  if (hasFilterUI) {
    let allRows = [];
    let timer = null;

    const esc = (s) =>
      String(s ?? "").replace(
        /[&<>"']/g,
        (m) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[m])
      );
    const markify = (s, terms) => {
      const e = esc(s);
      if (!terms.length) return e;
      const pat = terms
        .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|");
      return e.replace(
        new RegExp(`(${pat})`, "gi"),
        '<mark class="bg-yellow-200 text-inherit px-0.5 rounded">$1</mark>'
      );
    };
    const uniqueSorted = (arr) =>
      [...new Set(arr.filter(Boolean).map((v) => String(v).trim()))].sort(
        (a, b) => a.localeCompare(b)
      );

    const render = (rows, terms) => {
      if (!rows.length) {
        tbody.innerHTML =
          '<tr><td colspan="9" class="py-6 text-center text-zinc-600">Tidak ada data</td></tr>';
        return;
      }
      tbody.innerHTML = rows
        .map((r, i) => {
          const created = r.created_at
            ? new Date(r.created_at).toLocaleString()
            : "";
          return `
<tr class="hover:bg-zinc-50">
  <td class="py-3 px-4 text-center whitespace-nowrap">${i + 1}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    r.fullname,
    terms
  )}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    r.email,
    terms
  )}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    r.company,
    terms
  )}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    r.industry,
    terms
  )}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    r.phone,
    terms
  )}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    r.product,
    terms
  )}</td>
  <td class="py-3 px-4 text-center">${markify(r.description, terms)}</td>
  <td class="py-3 px-4 text-center whitespace-nowrap">${markify(
    created,
    terms
  )}</td>
</tr>`;
        })
        .join("");
    };

    const selected = () => {
      const inds = $$('input[type="checkbox"]:checked', listInd).map(
        (i) => i.value
      );
      const prods = $$('input[type="checkbox"]:checked', listProd).map(
        (i) => i.value
      );
      return { inds, prods };
    };

    const populateDropdown = (rows) => {
      const inds = uniqueSorted(rows.map((r) => r.industry));
      const prods = uniqueSorted(rows.map((r) => r.product));
      const url = new URLSearchParams(location.search);
      const tags = (url.get("tags") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const initInds = tags
        .filter((t) => t.startsWith("ind:"))
        .map((t) => t.slice(4));
      const initProds = tags
        .filter((t) => t.startsWith("prd:"))
        .map((t) => t.slice(4));

      listInd.innerHTML = inds
        .map(
          (v) => `
<label class="flex items-center gap-2 text-sm">
  <input type="checkbox" value="${esc(v)}" ${
            initInds.includes(v) ? "checked" : ""
          } class="h-4 w-4 rounded border-zinc-300 accent-[#028f46]">
  <span>${esc(v)}</span>
</label>`
        )
        .join("");

      listProd.innerHTML = prods
        .map(
          (v) => `
<label class="flex items-center gap-2 text-sm">
  <input type="checkbox" value="${esc(v)}" ${
            initProds.includes(v) ? "checked" : ""
          } class="h-4 w-4 rounded border-zinc-300 accent-[#028f46]">
  <span>${esc(v)}</span>
</label>`
        )
        .join("");

      updateBtnLabel();
    };

    const tagsFromSelected = () => {
      const { inds, prods } = selected();
      return [...inds.map((v) => `ind:${v}`), ...prods.map((v) => `prd:${v}`)];
    };

    const syncURL = (q) => {
      const u = new URL(location.href);
      const tags = tagsFromSelected();
      q ? u.searchParams.set("q", q) : u.searchParams.delete("q");
      tags.length
        ? u.searchParams.set("tags", tags.join(","))
        : u.searchParams.delete("tags");
      history.replaceState(null, "", u.toString());
    };

    const filterLocal = (q) => {
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      const { inds, prods } = selected();
      const sInd = new Set(inds.map((x) => x.toLowerCase()));
      const sPrd = new Set(prods.map((x) => x.toLowerCase()));
      const hasTags = sInd.size > 0 || sPrd.size > 0;

      const rows = allRows.filter((r) => {
        if (hasTags) {
          const ind = String(r.industry || "").toLowerCase();
          const prd = String(r.product || "").toLowerCase();
          const match =
            (sInd.size && sInd.has(ind)) || (sPrd.size && sPrd.has(prd));
          if (!match) return false;
        }
        if (!terms.length) return true;
        const hay = [
          r.fullname,
          r.email,
          r.company,
          r.industry,
          r.phone,
          r.product,
          r.description,
          r.created_at ? new Date(r.created_at).toLocaleString() : "",
        ]
          .join(" ")
          .toLowerCase();
        return terms.every((t) => hay.includes(t));
      });

      return { rows, terms };
    };

    const updateBtnLabel = () => {
      const { inds, prods } = selected();
      const n = inds.length + prods.length;
      btnLabel.textContent = n ? `Filter (${n})` : "Filter";
    };

    const runFilter = () => {
      const q = qInput.value.trim();
      const { rows, terms } = filterLocal(q);
      render(rows, terms);
      syncURL(q);
      updateBtnLabel();
    };

    const onType = () => {
      clearTimeout(timer);
      timer = setTimeout(runFilter, 120);
    };

    btnDropdown.addEventListener("click", () =>
      dropdown.classList.toggle("hidden")
    );
    document.addEventListener("click", (e) => {
      const within =
        e.target.closest("#dropdown") || e.target.closest("#btnDropdown");
      if (!within) dropdown.classList.add("hidden");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") dropdown.classList.add("hidden");
    });

    listInd.addEventListener("change", runFilter);
    listProd.addEventListener("change", runFilter);
    btnAllInd?.addEventListener("click", () => {
      $$('input[type="checkbox"]:checked', listInd).forEach(
        (i) => (i.checked = false)
      );
      runFilter();
    });
    btnAllProd?.addEventListener("click", () => {
      $$('input[type="checkbox"]:checked', listProd).forEach(
        (i) => (i.checked = false)
      );
      runFilter();
    });
    qInput.addEventListener("input", onType);
    qInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        qInput.value = "";
        runFilter();
      }
    });

    const init = () => {
      const url = new URLSearchParams(location.search);
      const initQ = url.get("q") || "";
      qInput.value = initQ;
      tbody.innerHTML =
        '<tr><td colspan="9" class="py-6 text-center text-zinc-600">Memuat data...</td></tr>';
      fetch("../api/get-data.php")
        .then((r) =>
          r.status === 401
            ? ((location.href = "../admin/"), Promise.reject())
            : r.json()
        )
        .then((rows) => {
          allRows = Array.isArray(rows) ? rows : [];
          populateDropdown(allRows);
          runFilter();
        })
        .catch(() => {
          tbody.innerHTML =
            '<tr><td colspan="9" class="py-6 text-center text-red-600">Gagal memuat data</td></tr>';
        });
    };
    init();
  }

  const settingsToggles = () => {
    const buttons = $$(".toggle-btn[data-id]");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const current = btn.getAttribute("data-state") === "1" ? 1 : 0;
        const next = current ? 0 : 1;

        const formData = new FormData();
        formData.append("id", id);
        formData.append("notify_demo", next);

        try {
          const res = await fetch("../api/update_notify.php", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data && data.success) {
            btn.setAttribute("data-state", String(next));
            const span = btn.querySelector("span");
            const icon = btn.querySelector("i");
            if (next === 1) {
              btn.className =
                "toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700";
              if (span) span.textContent = "Aktif";
              if (icon) icon.className = "bx bx-bell text-base mr-1.5";
            } else {
              btn.className =
                "toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors bg-rose-600 border-rose-700 text-white hover:bg-rose-700";
              if (span) span.textContent = "Nonaktif";
              if (icon) icon.className = "bx bx-bell-off text-base mr-1.5";
            }
          } else {
            alert("Gagal memperbarui status");
          }
        } catch {
          alert("Terjadi kesalahan jaringan");
        }
      });
    });
  };
  settingsToggles();
})();
// ---------- Notify Demo ----------
document.querySelectorAll(".toggle-btn").forEach(function (btn) {
  btn.addEventListener("click", async function () {
    const id = btn.getAttribute("data-id");
    const current = btn.getAttribute("data-state") === "1" ? 1 : 0;
    const next = current ? 0 : 1;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("notify_demo", next);

    try {
      const res = await fetch("../api/update_notify.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data && data.success) {
        btn.setAttribute("data-state", String(next));
        const span = btn.querySelector("span");
        const icon = btn.querySelector("i");

        if (next === 1) {
          btn.className =
            "toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors bg-[#028f46] border-[#028f46] text-white hover:bg-[#028f46]";
          span.textContent = "Aktif";
          icon.className = "bx bx-bell text-base mr-1.5";
        } else {
          btn.className =
            "toggle-btn inline-flex items-center h-8 px-3 rounded-xl text-xs font-medium border transition-colors bg-rose-600 border-rose-700 text-white hover:bg-rose-700";
          span.textContent = "Nonaktif";
          icon.className = "bx bx-bell-off text-base mr-1.5";
        }
      } else {
        alert("Gagal memperbarui status");
      }
    } catch (e) {
      alert("Terjadi kesalahan jaringan");
    }
  });
});
// ---------- Modal Register Admin ----------
(function () {
  const trigger = document.getElementById("registerDialog");
  const modal = document.getElementById("registerModal");
  const backdrop = document.getElementById("registerModalBackdrop");
  const panel = document.getElementById("registerModalPanel");
  const closeBtn = document.getElementById("closeModalBtn");

  if (!trigger || !modal || !backdrop || !panel || !closeBtn) return;

  let lock = false;

  const openModal = () => {
    if (!modal.classList.contains("hidden") || lock) return;
    lock = true;

    backdrop.classList.add("opacity-0");
    panel.classList.add("opacity-0", "scale-95", "translate-y-4");

    modal.classList.remove("hidden");
    panel.getBoundingClientRect();

    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0");
      panel.classList.remove("opacity-0", "scale-95", "translate-y-4");
    });

    document.body.style.overflow = "hidden";
    setTimeout(() => (lock = false), 350);
  };

  const closeModal = () => {
    if (lock) return;
    lock = true;

    backdrop.classList.add("opacity-0");
    panel.classList.add("opacity-0", "scale-95", "translate-y-4");

    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
      lock = false;
    }, 300);
  };

  trigger.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

  document.querySelectorAll("button[data-eye]").forEach((btn) => {
    if (!btn.querySelector("i")) {
      const i = document.createElement("i");
      i.className = "bx bx-show text-xl";
      btn.appendChild(i);
    }

    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-eye");
      const input = document.getElementById(targetId);
      const icon = btn.querySelector("i");
      if (!input || !icon) return;

      input.type = input.type === "password" ? "text" : "password";
      icon.classList.toggle("bx-show", input.type === "password");
      icon.classList.toggle("bx-hide", input.type !== "password");

      btn.classList.add("scale-95");
      setTimeout(() => btn.classList.remove("scale-95"), 120);
      input.focus();
    });
  });
})();