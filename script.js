(() => {
  const data = window.CLIENT_DATA || {};

  const esc = (v = "") => String(v);

  function applyTheme() {
    const c = data.colors || {};
    const root = document.documentElement;
    const map = {
      primary: "--primary",
      primaryDark: "--primary-dark",
      secondary: "--secondary",
      accent: "--accent",
      background: "--bg",
      surface: "--surface",
      text: "--text",
      mutedText: "--muted",
      line: "--line"
    };
    Object.entries(map).forEach(([k, cssVar]) => c[k] && root.style.setProperty(cssVar, c[k]));
  }

  function bindText() {
    document.querySelectorAll("[data-bind]").forEach(el => {
      const key = el.dataset.bind;
      if (data[key] !== undefined) el.textContent = data[key];
    });
    document.querySelectorAll("[data-bind-html]").forEach(el => {
      const key = el.dataset.bindHtml;
      if (data[key] !== undefined) el.innerHTML = data[key];
    });
  }

  function bindLinks() {
    const waUrl = `https://wa.me/${esc(data.whatsapp)}?text=${encodeURIComponent(data.whatsappMessage || "Olá! Gostaria de saber mais sobre o atendimento.")}`;
    document.querySelectorAll('[data-link="whatsapp"]').forEach(a => {
      a.href = waUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
    document.querySelectorAll('[data-link="instagram"]').forEach(a => {
      a.href = data.instagramUrl || "#";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }

  function bindImages() {
    const images = data.images || {};
    const resolveImage = (key) => {
      if (key === "hero") return images.hero || images.heroFallback || "";
      // A seção Sobre aceita apenas uma segunda foto explicitamente marcada
      // como profissional. Na ausência dela, reutiliza a foto real do Hero.
      // Isso impede consultório, posts ou fallbacks genéricos nesta seção.
      if (key === "about") return images.aboutProfessional || images.hero || "";
      return images[key] || "";
    };

    document.querySelectorAll("[data-image]").forEach(el => {
      const key = el.dataset.image;
      const url = resolveImage(key);
      if (url) {
        el.style.backgroundImage = `url("${url}")`;
        el.textContent = "";
      }
    });
  }

  function applyDecorativeImages() {
    const textures = (data.images && data.images.textures) || {};
    const root = document.documentElement;
    if (textures.site) root.style.setProperty("--site-texture", `url("${textures.site}")`);
    if (textures.hero) root.style.setProperty("--hero-texture", `url("${textures.hero}")`);
    if (textures.lines) root.style.setProperty("--lines-texture", `url("${textures.lines}")`);
    if (textures.cta) root.style.setProperty("--cta-texture", `url("${textures.cta}")`);
  }

  function renderSymptoms() {
    const root = document.getElementById("symptomsGrid");
    root.innerHTML = (data.symptoms || []).map(i => `
      <article class="symptom-card">
        <div class="icon">${i.icon || "•"}</div>
        <h3>${i.title}</h3>
        <p>${i.text}</p>
      </article>
    `).join("");
  }

  function renderBenefits() {
    const root = document.getElementById("benefitsList");
    root.innerHTML = (data.benefits || []).map(i => `<li>${i}</li>`).join("");
  }

  function renderPositioningCards() {
    const root = document.getElementById("positioningCards");
    root.innerHTML = (data.positioningCards || []).map(i => `
      <article class="info-card"><h3>${i.title}</h3><p>${i.text}</p></article>
    `).join("");
  }

  function renderCredentials() {
    const root = document.getElementById("credentialsList");
    root.innerHTML = (data.credentials || []).map(i => `<div class="credential-item">${i}</div>`).join("");
  }

  function renderServices() {
    const root = document.getElementById("servicesList");
    const defaults = ((data.images || {}).serviceDefaults) || [];
    root.innerHTML = (data.services || []).map((s, idx) => {
      const imageUrl = s.image || defaults[idx] || "";
      const bg = imageUrl ? ` style="background-image: url('${imageUrl}')"` : "";
      const label = imageUrl ? "" : `<span>${s.imageLabel || "Imagem contextual"}</span>`;
      return `
      <article class="service-row">
        <div class="service-image" data-service-image="${idx}"${bg}>${label}</div>
        <div class="service-content">
          <span class="eyebrow">Área de cuidado ${String(idx + 1).padStart(2, "0")}</span>
          <h2>${s.title}</h2>
          <p>${s.text}</p>
          <ul>${(s.bullets || []).map(b => `<li>${b}</li>`).join("")}</ul>
        </div>
      </article>
    `}).join("");
  }

  function renderAttendance() {
    const root = document.getElementById("attendanceGrid");
    root.innerHTML = (data.attendance || []).map(i => `
      <article class="attendance-card"><div class="icon">${i.icon || "•"}</div><h3>${i.title}</h3><p>${i.text}</p></article>
    `).join("");
  }

  function renderSteps() {
    const root = document.getElementById("stepsGrid");
    root.innerHTML = (data.steps || []).map(i => `
      <article class="step-card"><div class="n">${i.n}</div><h3>${i.title}</h3><p>${i.text}</p></article>
    `).join("");
  }

  function renderTestimonials() {
    const section = document.getElementById("depoimentos");
    const root = document.getElementById("testimonialsGrid");
    if (!data.testimonials || !data.testimonials.length) {
      section.hidden = true;
      return;
    }
    root.innerHTML = data.testimonials.map(i => `
      <article class="testimonial-card">
        <blockquote>${i.text}</blockquote>
        <div class="testimonial-meta"><strong>${i.author}</strong><span>${i.meta || ""}</span></div>
      </article>
    `).join("");
  }

  function renderFaq() {
    const root = document.getElementById("faqList");
    root.innerHTML = (data.faq || []).map((i, idx) => `
      <div class="faq-item ${idx === 0 ? "open" : ""}">
        <button class="faq-question" aria-expanded="${idx === 0 ? "true" : "false"}">
          <span>${i.q}</span><span class="faq-icon">+</span>
        </button>
        <div class="faq-answer"><div><p>${i.a}</p></div></div>
      </div>
    `).join("");

    root.addEventListener("click", e => {
      const btn = e.target.closest(".faq-question");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      item.classList.toggle("open");
      btn.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    });
  }

  function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
  }

  applyTheme();
  bindText();
  bindLinks();
  bindImages();
  applyDecorativeImages();
  renderSymptoms();
  renderBenefits();
  renderPositioningCards();
  renderCredentials();
  renderServices();
  renderAttendance();
  renderSteps();
  renderTestimonials();
  renderFaq();
  initMenu();
  initReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
