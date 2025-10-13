import {
    t as C,
    f as T,
    i as P,
    r as D,
    d as A
} from "./utils-0K0NRc03.js";
import {
    i as x,
    p as q,
    a as M
} from "./cta-Cn3DzOF0.js"; /* empty css             */
const B = [{
        title: "Custom Software, Designed for Your Comfort & Success",
        description: "Teknologi harus terasa alami, bukan membebani. Kami menciptakan solusi yang mulus, intuitif, dan dibuat khusus untuk Anda.",
        highlights: ["Perangkat lunak yang sepenuhnya disesuaikan dengan kebutuhan bisnis Anda.", "Integrasi tanpa hambatan dengan alat dan sistem yang sudah Anda gunakan.", "Teknologi yang andal & bebas stres untuk stabilitas dan kemudahan."],
        animationSrc: "https://lottie.host/49c33651-e229-40bc-a3dc-fa691d9c2640/GNWsRNOHZo.lottie",
        speed: "0.5"
    }, {
        title: "Seamless & Scalable Grow Without Limits",
        description: "Bisnis Anda berkembang, begitu juga dengan perangkat lunak Anda.",
        highlights: ["Solusi kustom atau SaaS yang fleksibel dan siap berkembang.", "Desain sederhana & intuitif untuk meningkatkan produktivitas.", "Pembaruan otomatis & perawatan minimal, agar Anda bisa fokus pada pertumbuhan."],
        animationSrc: "https://lottie.host/b118d4cb-86ca-4347-82d4-b958aef10a3c/pgzLpUTKpa.lottie",
        speed: "0.5"
    }, {
        title: "Technology That Feels Like Home – Reliable & Secure",
        description: "Perangkat lunak harus seperti rumah—aman, stabil, dan bebas dari kekhawatiran.",
        highlights: ["Keamanan tingkat perusahaan, tanpa kerumitan.", "Ketersediaan 99.9%, memastikan bisnis Anda berjalan lancar.", "Dukungan & perbaikan berkala, agar Anda selalu selangkah lebih maju."],
        animationSrc: "https://lottie.host/5f3e9546-6768-4ab4-81ed-cd817acaf619/eUd2BVE0VM.lottie",
        speed: "0.5"
    }, {
        title: "More Than Just Software A True Digital Partner",
        description: "Kami tidak hanya membangun perangkat lunak—kami membangun kesuksesan jangka panjang.",
        highlights: ["Solusi yang fleksibel & selalu berkembang mengikuti kebutuhan bisnis Anda.", "Dukungan khusus & otomatisasi berbasis AI untuk menyederhanakan operasional.", "Mitra teknologi masa depan yang berkomitmen untuk pertumbuhan Anda."],
        animationSrc: "https://lottie.host/6ed21225-5765-4918-ae00-1fbaa8f79b5b/3IHktqNo1G.lottie",
        speed: "0.7"
    }],
    O = [{
        src: "lppi.svg",
        name: "Lembaga Pengembangan Perbankan Indonesia"
    }, {
        src: "pb_taxand.svg",
        name: "PB Taxand"
    }, {
        src: "bank_victoria.svg",
        name: "Bank Victoria"
    }, {
        src: "fortress.svg",
        name: "Fortress Data Services"
    }, {
        src: "jamkrindo.svg",
        name: "Jaminan Kredit Indonesia"
    }, {
        src: "pemkot_tangsel.svg",
        name: "Pemerintah Kota Tangerang Selatan"
    }, {
        src: "spc.svg",
        name: "SPC"
    }],
    $ = [{
        src: "kementerian_pertanian.svg",
        name: "Kementerian Pertanian"
    }, {
        src: "doktor_tj.svg",
        name: "DOKTORTJ Digital Institute"
    }, {
        src: "gleam_wear.svg",
        name: "Gleam Wear"
    }, {
        src: "pdam.svg",
        name: "PDAM Perum Mustika Tigaraksa"
    }, {
        src: "badan_informasi_geospasial.svg",
        name: "Badan Informasi Geospasial"
    }, {
        src: "agora.svg",
        name: "Agora"
    }],
    H = [{
        src: "upnvj.webp",
        name: "Universitas Pembangunan Nasional Veteran Jakarta"
    }, {
        src: "unas.webp",
        name: "Universitas Nasional"
    }, {
        src: "unimar.webp",
        name: "Universitas Muhammadiyah A.R. Fachruddin"
    }, {
        src: "ut.webp",
        name: "Universitas Terbuka"
    }, {
        src: "upt.webp",
        name: "Universitas Pancasakti Tegal"
    }, {
        src: "phb_tegal.webp",
        name: "Politeknik Harapan Bersama Tegal"
    }, {
        src: "doktortj.webp",
        name: "DOKTORTJ Digital Institute"
    }, {
        src: "poltekmi.webp",
        name: "Politeknik Mardira Indonesia"
    }, {
        src: "smk-yuppentek-2.webp",
        name: "SMK Yuppentek 2 Tangerang"
    }, {
        src: "smkn4.webp",
        name: "SMKN 4 Kota Tangerang"
    }];

function R(i) {
    const s = document.querySelector(".navbar"),
        r = document.querySelector(".cta-menu"),
        c = document.querySelector("#hero-section");
    let e = 0,
        p = !1,
        l = 0,
        k = !0,
        t = !1,
        n = !1;

    function m() {
        c ? e = c.offsetHeight * .85 : e = window.innerHeight * .85
    }
    m(), window.addEventListener("resize", i(() => {
        m()
    }, 200)), window.addEventListener("resize", () => {
        const h = document.querySelector(".cta-button");
        if (!h) return;
        const o = window.innerWidth,
            a = h.offsetWidth;
        h.offsetLeft + a > o && (h.style.right = `${o-a}px`)
    });

    function b() {
        const h = window.scrollY;
        h > e ? (s.classList.remove("float"), r.classList.add("show"), k = !1, s.style.top = "0", !t && g() && (n = !0, setTimeout(() => {
            s.style.top = "-80px", t = !0, n = !1
        }, 3e3))) : (s.classList.add("float"), r.classList.remove("show"), k = !0, s.style.top = "1rem", t = !1, n = !1, l = Math.max(h, 0)), w()
    }

    function g() {
        return window.matchMedia("(max-width: 768px) or (max-height: 500px) or (max-aspect-ratio: 13/9)").matches
    }

    function w() {
        const h = window.scrollY,
            o = document.querySelector(".nav-links"),
            a = document.querySelector(".hamburger input");
        g() && (n || k || (h > l ? (s.style.top = "-80px", o && o.classList.contains("active") && o.classList.remove("active"), a && a.checked && (a.checked = !1)) : l > h && (s.style.top = "0"), l = Math.max(h, 0)))
    }
    window.addEventListener("scroll", i(() => {
        p || (requestAnimationFrame(() => {
            b(), p = !1
        }), p = !0)
    }, 50))
}
document.addEventListener("click", function(i) {
    const s = document.querySelector(".nav-links"),
        r = document.querySelector(".hamburger input");
    s && s.classList.contains("active") && !i.target.closest(".nav-links") && !i.target.closest(".hamburger") && (s.classList.remove("active"), r && (r.checked = !1))
});

function N(i, s) {
    const r = document.querySelector(".usp__card-container");
    if (!r) {
        console.error("Element .usp__card-container tidak ditemukan di DOM.");
        return
    }
    const c = i.map(p).join("");
    r.innerHTML = c;
    let e = null;

    function p(t) {
        return `
      <div class="usp__card">
        <h3 class="usp__title">${t.title}</h3>
        <p class="usp__description">${t.description}</p>
        <div class="usp__highlight-container">
          ${t.highlights.map(n=>`
            <div class="usp__highlight">
              <i class="bi bi-check"></i>
              <p>${n}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `
    }

    function l() {
        const t = r.querySelectorAll(".usp__card");
        e = new IntersectionObserver(n => {
            n.forEach(m => {
                if (m.isIntersecting) {
                    const b = Array.from(t).indexOf(m.target),
                        g = i[b];
                    if (g != null && g.animationSrc) {
                        if (!document.querySelector(".usp__ani")) {
                            console.warn("Animasi tidak dimuat karena .usp__ani tidak ditemukan (layar kecil).");
                            return
                        }
                        j(g.animationSrc, g.speed || "0.5")
                    }
                }
            })
        }, {
            threshold: .6
        }), t.forEach(n => e.observe(n))
    }

    function k() {
        window.matchMedia("(min-width: 1024px)").matches ? (e && e.disconnect(), l()) : e && e.disconnect()
    }
    k(), window.addEventListener("resize", s(() => {
        k()
    }, 200))
}

function j(i, s) {
    const r = document.querySelector(".usp__ani");
    if (!r) return;
    const c = r.querySelector("dotlottie-player");
    if (c) c.classList.remove("visible"), setTimeout(() => {
        r.removeChild(c);
        const e = document.createElement("dotlottie-player");
        e.setAttribute("src", i), e.setAttribute("background", "transparent"), e.setAttribute("speed", s), e.setAttribute("style", "width: auto; height: 100%"), e.setAttribute("loop", ""), e.setAttribute("autoplay", ""), r.appendChild(e), setTimeout(() => {
            e.classList.add("visible")
        }, 50)
    }, 500);
    else {
        const e = document.createElement("dotlottie-player");
        e.setAttribute("src", i), e.setAttribute("background", "transparent"), e.setAttribute("speed", s), e.setAttribute("style", "width: auto; height: 100%"), e.setAttribute("loop", ""), e.setAttribute("autoplay", ""), r.appendChild(e), setTimeout(() => {
            e.classList.add("visible")
        }, 50)
    }
}

function W(i) {
  const s = document.querySelectorAll(".best__btn"),
        r = document.querySelector(".best__btn-selected"),
        c = document.getElementById("best__img");
  if (!s.length || !r || !c) {
      console.warn("Elemen Best Solution tidak ditemukan di DOM.");
      return;
  }

  const e = [
      "./product/best-product/1.webp",
      "./product/best-product/2.webp",
      "./product/best-product/3.webp",
      "./product/best-product/4.webp",
      "./product/best-product/5.webp"
  ],
  texts = [
      "PB Taxand",
      "Bank Victoria",
      "PB Taxand",
      "Jamkrindo",
      "Fortress Data Services"
  ],
  p = {};

  e.forEach((t, n) => {
      const m = new Image();
      m.src = t;
      p[n] = m;
  });

  function l(t) {
      s.forEach(g => g.classList.remove("active"));
      const n = s[t],
            m = n.getBoundingClientRect(),
            b = n.parentElement.getBoundingClientRect();
      r.style.left = `${m.left-b.left}px`;
      r.style.width = `${m.width}px`;

      if (c.src !== p[t].src) {
          c.classList.remove("active");
          c.offsetWidth;
          setTimeout(() => {
              c.src = p[t].src;
              c.classList.add("active");
          }, 400);
      }

      n.classList.add("active");
      k();

      const textElement = document.getElementById("best__img-text");
      if (textElement) textElement.textContent = texts[t] || "";
  }

  s.forEach((t, n) => {
      t.addEventListener("click", () => l(n));
  });

  window.addEventListener("load", () => {
      s.length > 0 && l(0);
  });

  function k() {
      const t = document.querySelector(".best__btn.active");
      if (!t) return;
      window.highlightObserver && window.highlightObserver.disconnect();
      const n = new ResizeObserver(m => {
          for (let b of m) {
              const g = b.target.getBoundingClientRect(),
                    w = b.target.parentElement.getBoundingClientRect();
              r.style.left = `${g.left-w.left}px`;
              r.style.width = `${g.width}px`;
          }
      });
      n.observe(t);
      window.highlightObserver = n;
  }

  window.addEventListener("resize", i(() => {
      const t = document.querySelector(".best__btn.active");
      if (t) {
          const n = t.getBoundingClientRect(),
                m = t.parentElement.getBoundingClientRect();
          r.style.left = `${n.left-m.left}px`;
          r.style.width = `${n.width}px`;
      }
  }, 200));
}


function z(i, s, r) {
    const c = document.querySelector(".scrollable-list"),
        e = document.querySelector(".product__image"),
        p = document.querySelectorAll(".category-btn"),
        l = document.querySelector(".product__dropdown");
    if (!c || !e || !l || !p.length) {
        console.warn("Elemen Product Filter tidak lengkap atau tidak ditemukan.");
        return
    }
    const k = {};
    i.forEach(o => {
        if (o.image) {
            const a = new Image;
            a.src = o.image, k[o.id] = a
        }
    });
    let t = null,
        n = !1;

    function m(o) {
        const a = s[o] || [];
        if (l.innerHTML = "", a.forEach(d => {
                const v = i.find(u => u.id === d);
                if (!v) return;
                const L = document.createElement("option");
                L.value = v.id, L.textContent = v.name, t === v.id && (L.selected = !0), l.appendChild(L)
            }), !t && a.length > 0) {
            const d = i.find(v => v.id === a[0]);
            w(d), t = d.id, h(d.id)
        }
    }

    function b(o) {
        const a = s[o] || [],
            d = t && a.includes(t);
        d || (t = null);
        const v = n;
        (!v || !d) && (n = !1), c.classList.remove("active");
        const L = d && v;
        L || e.classList.remove("active"), setTimeout(() => {
            c.innerHTML = "";
            let u = null;
            for (const y of a) {
                const f = i.find(S => S.id === y);
                if (f) {
                    u = f;
                    break
                }
            }
            if (u == null || u.id, d && v) {
                const y = i.find(f => f.id === t);
                y && (h(t), w(y, !0))
            } else u && (t = u.id, w(u), h(u.id));
            const I = document.createDocumentFragment();
            if (a.forEach(y => {
                    const f = i.find(_ => _.id === y);
                    if (!f) return;
                    u || (u = f);
                    const S = document.createElement("li");
                    S.innerHTML = `<i class="${f.icon} product__icon"></i><span>${f.name}</span>`, S.dataset.productId = f.id, S.addEventListener("click", () => {
                        document.querySelectorAll(".scrollable-list li").forEach(_ => _.classList.remove("selected")), S.classList.add("selected"), w(f), t = f.id, n = !0, g(f.id)
                    }), (n && y === t || !n && y === u.id) && S.classList.add("selected"), I.appendChild(S)
                }), c.appendChild(I), u == null || u.id, d && n) {
                const y = i.find(f => f.id === t);
                y && (h(t), w(y, !0))
            } else u && (t = u.id, w(u), h(u.id));
            c.classList.add("active"), !L && u && (e.offsetWidth, setTimeout(() => {
                e.classList.add("active")
            }, 380)), m(o), a.length <= 1 ? (l.disabled = !0, l.style.pointerEvents = "none", l.style.backgroundImage = "none") : (l.disabled = !1, l.style.pointerEvents = "auto", l.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iIzAwODA0MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMTMuNjYsMTAxLjY2bC04MCw4MGE4LDgsMCwwLDEtMTEuMzIsMGwtODAtODBBOCw4LDAsMCwxLDQ4LDg4SDIwOGE4LDgsMCwwLDEsNS42NiwxMy42NloiPjwvcGF0aD48L3N2Zz4=')")
        }, 400)
    }

    function g(o) {
        const a = l.options;
        for (let d = 0; d < a.length; d++)
            if (a[d].value === o.toString()) {
                a[d].selected = !0;
                break
            }
    }

    function w(o, a = !1) {
        if (!e) {
            console.error("productImage tidak ditemukan!");
            return
        }
        const d = o.image;
        if (a || e.src === d) {
            e.src = d;
            return
        }
        e.classList.remove("active"), e.offsetWidth, setTimeout(() => {
            e.src = d, e.classList.add("active")
        }, 380)
    }

    function h(o) {
        document.querySelectorAll(".scrollable-list li").forEach(a => {
            var L, u;
            a.classList.remove("selected");
            const d = (L = a.querySelector("span")) == null ? void 0 : L.textContent,
                v = (u = i.find(I => I.id === o)) == null ? void 0 : u.name;
            d === v && a.classList.add("selected")
        })
    }
    l.addEventListener("change", r(() => {
        const o = parseInt(l.value),
            a = i.find(d => d.id === o);
        a ? (w(a), t = a.id, n = !0, h(o)) : console.warn("Produk dengan ID", o, "tidak ditemukan!")
    }, 100)), p.forEach(o => {
        o.addEventListener("click", () => {
            p.forEach(a => a.classList.remove("active")), o.classList.add("active"), b(o.getAttribute("data-category"))
        })
    }), b("all")
}

function K(i) {
    const s = new Image;
    s.src = i
}

function E(i, s, r = "left") {
    const c = document.getElementById(s);
    if (!c || !i || i.length === 0) {
        console.warn(`Container "${s}" tidak ditemukan atau data kosong.`);
        return
    }
    let e = 20;
    window.innerWidth < 600 ? e = 5 : window.innerWidth < 768 ? e = 10 : window.innerWidth < 1024 && (e = 15), i.forEach(m => {
        K(`./partner/${m.src}`)
    });
    const p = 250,
        l = i.length,
        k = 50,
        t = (p + e) * l;
    c.style.width = `${t}px`;
    const n = document.createDocumentFragment();
    i.forEach((m, b) => {
        const g = document.createElement("div");
        g.className = `logo-item scroll-${r}`, g.style.animationDelay = `calc(${k}s / ${l} * ${b} * -1)`, g.innerHTML = `
      <img src="./partner/${m.src}" alt="${m.name}">
      <p>${m.name}</p>
    `, n.appendChild(g)
    }), c.appendChild(n)
}
window.addEventListener("resize", () => {
    container.innerHTML = "", E(partnersDataArray, rowId, direction)
});
document.addEventListener("DOMContentLoaded", () => {
    C(), T(".fade-section"), P(), D(), R(A), N(B, A), W(A), z(M, q, A), E(O, "row1", "left"), E($, "row2", "right"), E(H, "row3", "left"), x(M)
});