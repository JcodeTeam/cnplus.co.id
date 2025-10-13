const f = [{
        id: 1,
        name: "ERP (Enterprise Resource Planning)",
        image: "./product/erp.webp",
        icon: "bi bi-building-fill"
    }, {
        id: 2,
        name: "Human Resource Management System",
        image: "./product/best-product/1.webp",
        icon: "bi bi-person-badge-fill"
    }, {
        id: 3,
        name: "Point of Sale",
        image: "./product/pos.webp",
        icon: "ph-fill ph-cash-register"
    }, {
        id: 4,
        name: "Accounting",
        image: "./product/tj-finance.webp",
        icon: "ph-fill ph-calculator"
    }, {
        id: 5,
        name: "Website",
        image: "./product/website.webp",
        icon: "bi bi-bi bi-globe2"
    }, {
        id: 6,
        name: "Academic Portal",
        image: "./product/digital-academic.webp",
        icon: "bi bi-mortarboard-fill"
    }, {
        id: 7,
        name: "Learning Management System",
        image: "./product/best-product/4.webp",
        icon: "ph-fill ph-book-open"
    }, {
        id: 8,
        name: "E-Commerce",
        image: "./product/e-commerce.webp",
        icon: "bi bi-cart-check-fill"
    }, {
        id: 9,
        name: "E-Merchant",
        image: "./product/e-merchant.webp",
        icon: "ph-fill ph-storefront"
    }, {
        id: 10,
        name: "Micro Banking System",
        image: "./product/mbs.webp",
        icon: "ph-fill ph-bank"
    }, {
        id: 11,
        name: "E-Wallet",
        image: "./product/e-wallet.webp",
        icon: "ph-fill ph-wallet"
    }, {
        id: 12,
        name: "Payment Gateway Integration",
        image: "./product/pgi.webp",
        icon: "bi bi-credit-card-2-front-fill"
    }, {
        id: 13,
        name: "E-Hospital (Medical Record & HIS)",
        image: "./product/e-hospital.webp",
        icon: "bi bi-hospital-fill"
    }, {
        id: 14,
        name: "IT Service Management (ITop)",
        image: "./product/best-product/5.webp",
        icon: "ph-fill ph-laptop"
    }, {
        id: 15,
        name: "PDAM Management System",
        image: "./product/epis.webp",
        icon: "bi bi-droplet-fill"
    }, {
        id: 16,
        name: "Project Management System",
        image: "./product/project.webp",
        icon: "ph-fill ph-list-checks"
    }, {
        id: 17,
        name: "Workshop Management System",
        image: "./product/wms.webp",
        icon: "ph-fill ph-projector-screen-chart"
    }, {
        id: 18,
        name: "Fleet Management System",
        image: "./product/easy-fleet.webp",
        icon: "ph-fill ph-truck"
    }, {
        id: 19,
        name: "Online Travel Agent",
        image: "./product/travel-io.webp",
        icon: "ph-fill ph-airplane-tilt"
    }, {
        id: 20,
        name: "Helpdesk",
        image: "./product/helpdesk.webp",
        icon: "ph-fill ph-headset"
    }, {
        id: 21,
        name: "E-Hibah Bansos",
        image: "./product/hibah-bansos.webp",
        icon: "ph-fill ph-hand-heart"
    }, {
        id: 22,
        name: "E-Catalog",
        image: "./product/e-catalog.webp",
        icon: "bi bi-postcard-fill"
    }, {
        id: 23,
        name: "Custom Product",
        image: "./product/cp.webp",
        icon: "ph-fill ph-puzzle-piece"
    }],
    w = {
        all: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        enterprise: [1, 2, 3, 4, 5, 8, 9, 14, 16, 17, 18, 19, 20],
        "banking-finance": [10, 4, 9, 11, 12],
        academic: [6, 7],
        healthcare: [13],
        governance: [21, 5, 1, 4, 15, 2]
    };

function y(o) {
    const n = document.getElementById("demo-form"),
        i = document.getElementById("product");
    if (!n || !i) {
        console.warn("⚠️ Form atau elemen produk tidak ditemukan di DOM.");
        return
    }

    function c() {
        if (i.dataset.loaded === "true" || !Array.isArray(o)) return;
        o.forEach(e => {
            if (!e || !e.name) return;
            const a = document.createElement("option");
            a.value = e.name, a.textContent = e.name, i.appendChild(a)
        });
        const t = document.createElement("option");
        t.value = "other", t.textContent = "Lainnya", i.appendChild(t), i.dataset.loaded = "true"
    }

    function l(t) {
        return Object.values(t).every(e => e !== "")
    }
    async function m(t) {
        try {
            const e = await fetch("https://cnplus.co.id/v3/api/save-and-send.php ", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(t)
            });
            if (!e.ok) throw new Error("Server error");
            const a = await e.json();
            a.status === "success" ? (alert("Demo berhasil diajukan! Silakan cek email Anda."), n.reset()) : a.status === "warning" ? (alert("Data berhasil disimpan, tetapi gagal mengirim email. Tim kami akan menghubungi Anda."), n.reset()) : alert(`Gagal menyimpan data: ${a.message}`)
        } catch (e) {
            console.error("Error:", e), alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi nanti.")
        }
    }

    function p(t) {
        t.preventDefault();
        const e = document.getElementById("fullname").value.trim(),
            a = document.getElementById("email").value.trim(),
            s = document.getElementById("company").value.trim(),
            u = document.getElementById("industry").value,
            g = document.getElementById("phone").value.trim(),
            b = document.getElementById("product").value,
            h = document.getElementById("description").value.trim(),
            r = {
                fullname: e,
                email: a,
                company: s,
                industry: u,
                phone: g,
                product: b,
                description: h
            };
        if (!l(r)) {
            alert("Mohon lengkapi semua field!");
            return
        }
        m(r)
    }

    function d() {
        const t = () => c() || n.addEventListener("submit", p);
        document.readyState !== "loading" ? t() : document.addEventListener("DOMContentLoaded", t)
    }
    d()
}
export {
    f as a, y as i, w as p
};