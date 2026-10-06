(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---- i18n Initialization and Selector Binding ---- */
const i18n = window.i18n;

function setupI18n() {
  if (!i18n) return;
  i18n.init();

  const langDropdown = $('#langDropdown');
  const langTrigger = $('#langTrigger');
  const langOptions = $$('.lang-dropdown__opt');

  if (langTrigger && langDropdown) {
    langTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = langDropdown.classList.contains('open');
      langDropdown.classList.toggle('open', !isOpen);
      langTrigger.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
        langTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langDropdown.classList.contains('open')) {
        langDropdown.classList.remove('open');
        langTrigger.setAttribute('aria-expanded', 'false');
        langTrigger.focus();
      }
    });
  }

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = opt.getAttribute('data-lang');
      if (lang) {
        i18n.setLanguage(lang);
        if (langDropdown) {
          langDropdown.classList.remove('open');
          if (langTrigger) langTrigger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/* ---- Dark / Light Theme Mode Switcher ---- */
const themeToggleBtn = $('#themeToggleBtn');
const themeToggleText = $('.theme-toggle__text', themeToggleBtn);

function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  if (themeToggleText && i18n) {
    const key = isDark ? 'topbar_light_mode' : 'topbar_dark_mode';
    themeToggleText.textContent = i18n.t(key, isDark ? 'Modo Claro' : 'Modo Oscuro');
  }
}

const savedTheme = localStorage.getItem('theme');
const initialDark = savedTheme === 'dark';

applyTheme(initialDark);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* ---- Dynamic Data Structures for Multi-language Support ---- */
const SERVICES_DATA = {
  es: [
    ['Laboratorio de Suelos','Caracterización física y mecánica de suelos y materiales para apoyar estudios geotécnicos, diseño y control de proyectos.',['Límites de Atterberg','Granulometría','Compactación','Densidad','CBR','Clasificación USCS / AASHTO']],
    ['Laboratorio de Concretos','Evaluación de propiedades físicas y mecánicas del concreto y mortero para el control de calidad en obra.',['Resistencia a compresión','Resistencia a flexión','Cilindros y Vigas','Diseño de mezclas','Ensayos no destructivos']],
    ['Laboratorio de Pavimentos','Caracterización y control de materiales y mezclas asfálticas para infraestructura vial.',['Marshall (Estabilidad y flujo)','Extracción de asfalto','Gravedad específica','Granulometría de agregados','Toma de briquetas']]
  ],
  en: [
    ['Soil Testing Laboratory','Physical and mechanical soil characterization supporting geotechnical studies, foundation design, and quality control.',['Atterberg Limits','Sieve Analysis','Compaction','Density','CBR Test','USCS / AASHTO Classification']],
    ['Concrete Testing Laboratory','Evaluation of concrete and mortar physical and mechanical properties for site quality assurance.',['Compressive Strength','Flexural Strength','Cylinders & Beams','Mix Design','Non-Destructive Testing']],
    ['Pavement Testing Laboratory','Testing and quality control of asphalt mixtures and quarry materials for highway infrastructure.',['Marshall Mix Design','Bitumen Extraction','Specific Gravity','Aggregate Sieve Analysis','Briquette Sampling']]
  ]
};

const LABS_DATA = {
  es: {
    suelos: ['Laboratorio de Suelos', 'Caracterizar el suelo es la base de todo proyecto seguro.', 'Analizamos la física y mecánica del subsuelo según normas INVIAS y ASTM para respaldar decisiones de ingeniería.', SERVICES_DATA.es[0][2], 'img/real/lab-suelos.jpg', 'Cotizar Laboratorio de Suelos'],
    concretos: ['Laboratorio de Concretos', 'Control de resistencia y calidad en cada vaciado.', 'Ensayos de rotura a compresión de cilindros, flexión de vigas y diseño de mezclas de concreto y mortero.', SERVICES_DATA.es[1][2], 'img/real/lab-concretos.jpg', 'Cotizar Laboratorio de Concretos'],
    pavimentos: ['Laboratorio de Pavimentos', 'Infraestructura vial duradera respaldada por ensayos.', 'Caracterización de mezclas asfálticas, agregados de cantera y control de calidad en obra vial.', SERVICES_DATA.es[2][2], 'img/real/lab-pavimentos.jpg', 'Cotizar Laboratorio de Pavimentos']
  },
  en: {
    suelos: ['Soil Laboratory', 'Soil characterization is the foundation of every safe engineering project.', 'We analyze physical and mechanical subsoil properties under INVIAS and ASTM standards.', SERVICES_DATA.en[0][2], 'img/real/lab-suelos.jpg', 'Quote Soil Laboratory'],
    concretos: ['Concrete Laboratory', 'Compressive strength and quality assurance across every pour.', 'Cylinder compressive strength testing, beam flexural tests, and concrete mix designs.', SERVICES_DATA.en[1][2], 'img/real/lab-concretos.jpg', 'Quote Concrete Laboratory'],
    pavimentos: ['Pavement Laboratory', 'Durable highway infrastructure backed by rigorous testing.', 'Asphalt mixture characterization, quarry aggregates, and field quality control.', SERVICES_DATA.en[2][2], 'img/real/lab-pavimentos.jpg', 'Quote Pavement Laboratory']
  }
};

const PROJECTS_DATA = {
  es: [
    ['Estudio Geotécnico','Estudio de Suelos – Zona ZODME EC3','Castilla, Meta','2022','img/real/proj-castilla.jpg','Caracterización estratigráfica y capacidad de carga para obra de infraestructura.'],
    ['Edificaciones','Calle Bistro en Viva Villavicencio','Villavicencio, Meta','2022–2023','img/real/proj-bistro.jpg','Control de calidad de concretos, cilindros y materiales en proyecto comercial.'],
    ['Vivienda VIS','Viviendas de Interés Social','Fuente de Oro, Meta','2022–2023','img/real/proj-vis.jpg','Ensayos de laboratorio de suelos y concretos para desarrollo residencial.'],
    ['Edificaciones','Fundación Universitaria FUNEDO','Arauca','2023','img/real/proj-funedo.jpg','Estudio geotécnico integral y prueba de materiales para sede universitaria.'],
    ['Consultoría','Diseños de Puente Vehicular y Accesos','Meta','2023','img/real/proj-puente.jpg','Diseño vial, hidráulico y geotécnico para infraestructura de transporte.'],
    ['Estudio Geotécnico','Nueva Sede de la Fiscalía','Mitú, Vaupés','2024','img/real/proj-fiscalia.jpg','Sondeos de exploración y caracterización para edificio institucional.'],
    ['Vivienda','Conjunto Residencial San Marino','Restrepo, Meta','2023–vigente','img/real/proj-sanmarino.png','Control de calidad continuo en cimentación y estructura.'],
    ['Edificaciones','Centro de Investigación IDEAM','Meta','2024–vigente','img/real/proj-ideam.jpg','Ensayos de laboratorio para desarrollo de sede científica.']
  ],
  en: [
    ['Geotechnical Study','Soil Study – ZODME EC3 Zone','Castilla, Meta','2022','img/real/proj-castilla.jpg','Stratigraphic characterization and load-bearing capacity for civil infrastructure.'],
    ['Buildings','Calle Bistro at Viva Villavicencio','Villavicencio, Meta','2022–2023','img/real/proj-bistro.jpg','Quality control for concrete, cylinders, and materials in commercial development.'],
    ['Social Housing','Social Housing Project (VIS)','Fuente de Oro, Meta','2022–2023','img/real/proj-vis.jpg','Soil and concrete laboratory testing for residential community.'],
    ['Buildings','FUNEDO University Foundation','Arauca','2023','img/real/proj-funedo.jpg','Comprehensive geotechnical study and materials testing for university campus.'],
    ['Consulting','Vehicular Bridge & Access Road Design','Meta','2023','img/real/proj-puente.jpg','Highway, hydraulic, and geotechnical design for transportation infrastructure.'],
    ['Geotechnical Study','Prosecutor Office Headquarters','Mitú, Vaupés','2024','img/real/proj-fiscalia.jpg','Exploratory boreholes and soil characterization for government facility.'],
    ['Housing','San Marino Residential Complex','Restrepo, Meta','2023–present','img/real/proj-sanmarino.png','Continuous quality control for foundation and structural elements.'],
    ['Buildings','IDEAM Research Center','Meta','2024–present','img/real/proj-ideam.jpg','Laboratory testing services for scientific research headquarters.']
  ]
};

const LAYERS_DATA = {
  es: [
    ['Capa Orgánica', '0 – 0,5 m', 'Suelo vegetal superficial con materia orgánica; se evalúa descapote e impacto antes de fundar.', ['Caracterización de materiales', 'Densidad en sitio']],
    ['Arcilla Plástica', '0,5 – 2,0 m', 'Suelo fino cohesivo con plasticidad media a alta; se miden límites y consolidación.', ['Límites de Atterberg', 'Densidad', 'Compactación']],
    ['Arena Granular', '2,0 – 4,0 m', 'Suelo granular con buena capacidad portante y drenaje; ensayo de gradación.', ['Granulometría INVIAS E-123', 'Compactación Proctor', 'CBR']],
    ['Grava de Cantera', '4,0 – 6,0 m', 'Material grueso ideal para subbases y bases granulares de pavimento.', ['Granulometría', 'Desgaste de los Ángeles', 'CBR']],
    ['Roca de Basamento', '> 6,0 m', 'Estrato rocoso competente; exploración indirecta mediante geofísica.', ['Sismografía MASW', 'Refracción Sísmica', 'Resistividad Eléctrica']]
  ],
  en: [
    ['Organic Topsoil', '0 – 0.5 m', 'Superficial organic topsoil stratum; stripping depth and ground impact evaluated prior to foundation.' , ['Material Characterization', 'In-Situ Field Density']],
    ['Plastic Clay', '0.5 – 2.0 m', 'Cohesive fine-grained soil with medium-to-high plasticity; Atterberg limits and consolidation measured.', ['Atterberg Limits', 'Density', 'Compaction']],
    ['Granular Sand', '2.0 – 4.0 m', 'Granular soil with good load-bearing capacity and drainage; sieve analysis recommended.', ['INVIAS E-123 Sieve Analysis', 'Proctor Compaction', 'CBR Test']],
    ['Quarry Gravel', '4.0 – 6.0 m', 'Coarse material suitable for pavement granular subbases and base courses.', ['Sieve Analysis', 'Los Angeles Abrasion', 'CBR Test']],
    ['Bedrock Stratum', '> 6.0 m', 'Competent rocky stratum; indirect subsoil exploration via geophysical methods.', ['MASW Seismography', 'Seismic Refraction', 'Electrical Resistivity (ERT)']]
  ]
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- Current Active Tab / Layer State ---- */
let currentTabKey = 'suelos';
let currentLayerIndex = 1;

/* ---- Render Tabpanel Laboratorios ---- */
const panel = $('#tabpanel');
function showTab(k) {
  currentTabKey = k;
  const lang = i18n ? i18n.currentLang : 'es';
  const labs = LABS_DATA[lang] || LABS_DATA.es;
  const l = labs[k]; if (!l) return;

  $$('.tab-nav__btn').forEach(b => b.classList.toggle('active', b.dataset.tab === k));
  if (!panel) return;

  const mainTestsHeading = lang === 'en' ? 'Main Testing Procedures:' : 'Ensayos Principales:';
  const normTag = lang === 'en' ? 'INVIAS / ASTM Standards' : 'Normativa INVIAS / ASTM';

  panel.innerHTML = `
  <div class="split">
    <div>
      <span class="sec-eyebrow">${esc(l[0])}</span>
      <h3 style="font-size:26px;margin-bottom:12px;color:var(--c-navy-dark)">${esc(l[1])}</h3>
      <p style="font-size:16px;color:var(--c-body);margin-bottom:24px">${esc(l[2])}</p>
      <h4 style="font-size:15px;margin-bottom:12px">${mainTestsHeading}</h4>
      <ul class="corp-card__list" style="margin-bottom:28px">
        ${l[3].map(x => `<li>${esc(x)}</li>`).join('')}
      </ul>
      <a href="#cotizar" class="btn btn--primary">${esc(l[5])}</a>
    </div>
    <div>
      <div class="img-frame img-frame--interactive">
        <img src="${l[4]}" alt="${esc(l[0])}" class="zoom-img" style="height:320px;object-fit:cover;width:100%">
        <div class="img-frame__badge">${normTag}</div>
      </div>
    </div>
  </div>`;
}

$$('.tab-nav__btn').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
$$('[data-tab]:not(.tab-nav__btn)').forEach(a => a.addEventListener('click', (e) => {
  const tab = a.dataset.tab;
  const lang = i18n ? i18n.currentLang : 'es';
  const labs = LABS_DATA[lang] || LABS_DATA.es;
  if (tab && labs[tab]) {
    showTab(tab);
  }
}));

/* ---- Render Proyectos ---- */
const projContainer = $('#projects');
const moreBtn = $('#moreProj');

function renderProjects() {
  if (!projContainer) return;
  const lang = i18n ? i18n.currentLang : 'es';
  const projects = PROJECTS_DATA[lang] || PROJECTS_DATA.es;
  const isExpanded = moreBtn?.getAttribute('aria-expanded') === 'true';

  projContainer.innerHTML = projects.map((p, i) => `
  <div class="proj-card" ${(!isExpanded && i > 2) ? 'hidden' : ''} data-img="${p[4]}" data-title="${esc(p[1])}" data-desc="${esc(p[5])}" data-loc="${esc(p[2])}" data-year="${esc(p[3])}">
    <img src="${p[4]}" alt="${esc(p[1])}" class="proj-card__img">
    <div class="proj-card__body">
      <span class="proj-card__cat">${esc(p[0])}</span>
      <h3 class="proj-card__title">${esc(p[1])}</h3>
      <p style="font-size:13px;font-weight:700;color:var(--c-navy);margin-bottom:6px">${esc(p[2])} · ${esc(p[3])}</p>
      <p class="proj-card__desc">${esc(p[5])}</p>
    </div>
  </div>`).join('');

  if (moreBtn) {
    moreBtn.textContent = isExpanded
      ? (i18n ? i18n.t('proj_btn_less') : 'Ver Menos Proyectos')
      : (i18n ? i18n.t('proj_btn_more') : 'Ver Más Proyectos');
  }
}

if (moreBtn) {
  moreBtn.addEventListener('click', () => {
    const open = moreBtn.getAttribute('aria-expanded') === 'true';
    moreBtn.setAttribute('aria-expanded', !open);
    renderProjects();
  });
}

/* ---- Lightbox Modal Proyectos / Imágenes ---- */
const lightbox = $('#lightboxModal');
const lightboxImg = $('#lightboxImg');
const lightboxCap = $('#lightboxCaption');

function openLightbox(imgSrc, title, desc) {
  if (!lightbox) return;
  lightboxImg.src = imgSrc;
  lightboxImg.alt = title || 'Imagen ampliada';
  lightboxCap.innerHTML = `<strong>${esc(title)}</strong><p>${esc(desc)}</p>`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (lightbox) {
  $('.lightbox-modal__close')?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
}

document.addEventListener('click', e => {
  const card = e.target.closest('.proj-card, .zoom-img');
  if (card) {
    if (card.classList.contains('proj-card')) {
      openLightbox(card.dataset.img, card.dataset.title, `${card.dataset.loc} (${card.dataset.year}) - ${card.dataset.desc}`);
    } else if (card.tagName === 'IMG') {
      openLightbox(card.src, card.alt || 'Fotografía de Control de Calidad', 'INCONTECH S.A.S. - Laboratorio de Suelos, Concretos y Pavimentos');
    }
  }
});

/* ---- Navbar & Scroll Sticky Effects ---- */
const nav = $('#nav'), totop = $('#totop');
const onScroll = () => {
  const y = window.scrollY;
  if (nav) nav.classList.toggle('scrolled', y > 40);
  if (totop) totop.classList.toggle('on', y > 400);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (totop) {
  totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Mobile Navigation Burger ---- */
const burger = $('#burger'), menu = $('#menu'), ov = $('#overlay');
const setMenu = (open) => {
  if (!menu || !burger) return;
  menu.classList.toggle('open', open);
  if (ov) ov.classList.toggle('on', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};

if (burger) burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
if (ov) ov.addEventListener('click', () => setMenu(false));
addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.classList.contains('open')) setMenu(false); });

$$('#menu a').forEach(a => a.addEventListener('click', e => {
  if (a.classList.contains('dd__btn') && innerWidth <= 1024) {
    e.preventDefault();
    a.parentElement.classList.toggle('open');
    return;
  }
  setMenu(false);
}));

/* ---- Explorador Estratigráfico ---- */
const layersList = $('#layers'), layerDetail = $('#layerDetail');

function renderLayers() {
  if (!layersList || !layerDetail) return;
  const lang = i18n ? i18n.currentLang : 'es';
  const layers = LAYERS_DATA[lang] || LAYERS_DATA.es;

  layersList.innerHTML = layers.map((l, i) =>
    `<button role="tab" class="tab-btn ${+i === currentLayerIndex ? 'active' : ''}" data-i="${i}">${esc(l[0])} <small>(${esc(l[1])})</small></button>`
  ).join('');

  showLayer(currentLayerIndex);
}

function showLayer(i) {
  currentLayerIndex = +i;
  const lang = i18n ? i18n.currentLang : 'es';
  const layers = LAYERS_DATA[lang] || LAYERS_DATA.es;
  const l = layers[currentLayerIndex]; if (!l) return;

  $$('button', layersList).forEach((b, k) => b.classList.toggle('active', k === currentLayerIndex));

  const depthLabel = lang === 'en' ? 'DEPTH:' : 'PROFUNDIDAD:';
  const testsHeading = lang === 'en' ? 'Recommended Tests:' : 'Ensayos Recomendados:';

  layerDetail.innerHTML = `
    <span class="sec-eyebrow">${depthLabel} ${esc(l[1])}</span>
    <h3 style="font-size:24px;margin-bottom:8px">${esc(l[0])}</h3>
    <p style="font-size:15px;color:var(--c-body);margin-bottom:20px">${esc(l[2])}</p>
    <h4 style="font-size:14px;margin-bottom:10px">${testsHeading}</h4>
    <ul class="corp-card__list">
      ${l[3].map(x => `<li>${esc(x)}</li>`).join('')}
    </ul>`;
}

if (layersList) {
  layersList.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn) showLayer(btn.dataset.i);
  });
}

/* ---- Floating Popover on Hover ---- */
const popover = $('#floatingPopover');
function showPopover(e, data) {
  if (!popover || innerWidth < 768) return;
  popover.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <span style="font-size:10px;font-weight:800;background:var(--c-navy);color:#fff;padding:2px 8px;border-radius:4px">${data.badge || 'INCONTECH'}</span>
    </div>
    <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:4px">${esc(data.title)}</div>
    <div style="font-size:13px;color:#94A3B8;line-height:1.4">${esc(data.desc)}</div>
  `;
  popover.classList.add('visible');
  positionPopover(e);
}

function positionPopover(e) {
  if (!popover) return;
  const pad = 16;
  let x = e.clientX + 18;
  let y = e.clientY + 18;
  if (x + 330 > innerWidth - pad) x = e.clientX - 340;
  if (y + 160 > innerHeight - pad) y = e.clientY - 160;
  popover.style.left = `${Math.max(pad, x)}px`;
  popover.style.top = `${Math.max(pad, y)}px`;
}

function hidePopover() {
  if (popover) popover.classList.remove('visible');
}

document.addEventListener('mouseover', e => {
  const corpCard = e.target.closest('.corp-card');
  if (corpCard && !corpCard.contains(e.relatedTarget)) {
    const title = corpCard.querySelector('.corp-card__title')?.textContent;
    const desc = corpCard.querySelector('.corp-card__desc')?.textContent;
    const badge = i18n?.currentLang === 'en' ? 'PRODUCT / SOLUTION' : 'PRODUCTO / SOLUCIÓN';
    showPopover(e, { title, desc, badge });
  }

  const svgSchematic = e.target.closest('.svg-schematic');
  if (svgSchematic) {
    const pType = svgSchematic.dataset.popover;
    const isEn = i18n?.currentLang === 'en';
    let title = isEn ? 'Technical Schematic' : 'Esquema Técnico';
    let desc = isEn ? 'Interactive analysis schematic.' : 'Modelamiento interactivo de análisis.';

    if (pType === 'geofisica') {
      title = isEn ? 'MASW Seismography & Tomography' : 'Sismografía MASW & Tomografía';
      desc = isEn ? 'Vs30 Rayleigh wave propagation & electrical resistivity tomography.' : 'Ondas Rayleigh Vs30 y tomografía de resistividad para estudios sísmicos NSR-10.';
    } else if (pType === 'patologia') {
      title = isEn ? 'Pathology & Concrete Coring' : 'Patología y Auscultación';
      desc = isEn ? 'Rebar pachometry mapping and core extraction compressive testing.' : 'Mapeo de armadura con pacometría y ensayo de compresión en núcleos extraídos.';
    } else if (pType === 'consultoria') {
      title = isEn ? 'Geotechnical Stratigraphic Profile' : 'Perfil Estratigráfico Geotécnico';
      desc = isEn ? 'Subsoil layer identification, water table level, and retaining wall design.' : 'Horizonte de suelos, nivel freático y diseño de muros de contención.';
    }

    const badge = isEn ? 'ANIMATED SCHEMATIC' : 'ESQUEMA ANIMADO';
    showPopover(e, { title, desc, badge });
  }
});

document.addEventListener('mousemove', e => {
  if (popover?.classList.contains('visible')) positionPopover(e);
});

document.addEventListener('mouseout', e => {
  if (e.target.closest('.corp-card, .svg-schematic') && !e.relatedTarget?.closest('.corp-card, .svg-schematic')) {
    hidePopover();
  }
});

/* ---- CTA Banner Quick 1-Click WhatsApp Handler ---- */
document.addEventListener('click', e => {
  const quickBtn = e.target.closest('.cta-quick-btn');
  if (quickBtn) {
    const rawMsg = quickBtn.dataset.msg || 'Hola, quisiera solicitar información y cotización sobre sus servicios.';
    const formattedText =
`*SOLICITUD RAPIDA - INCONTECH S.A.S.*
------------------------------------------------
${rawMsg}

------------------------------------------------
Mensaje enviado desde incontechsas.com`;

    const url = `https://wa.me/573212718824?text=${encodeURIComponent(formattedText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
});

/* ---- Quote Modal & WhatsApp Submission Handler ---- */
const quoteModal = $('#quoteModal');
const closeQuoteModalBtn = $('#closeQuoteModalBtn');
const modalQuoteForm = $('#modalQuoteForm');

function openQuoteModal() {
  if (!quoteModal) return;
  quoteModal.classList.add('open');
  quoteModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
  if (!quoteModal) return;
  quoteModal.classList.remove('open');
  quoteModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  if (e.target.closest('.open-quote-modal-btn')) {
    e.preventDefault();
    openQuoteModal();
  }
});

if (closeQuoteModalBtn) {
  closeQuoteModalBtn.addEventListener('click', closeQuoteModal);
}

if (quoteModal) {
  quoteModal.addEventListener('click', e => {
    if (e.target === quoteModal) closeQuoteModal();
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && quoteModal.classList.contains('open')) closeQuoteModal();
  });
}

if (modalQuoteForm) {
  modalQuoteForm.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = $('#m-nombre')?.value.trim() || '';
    const empresa = $('#m-empresa')?.value.trim() || 'No especificada';
    const email = $('#m-email')?.value.trim() || '';
    const telefono = $('#m-telefono')?.value.trim() || '';
    const ciudad = $('#m-ciudad')?.value.trim() || '';
    const servicio = $('#m-servicio')?.value || 'General';
    const mensaje = $('#m-mensaje')?.value.trim() || '';

    const text =
`*SOLICITUD DE COTIZACION - INCONTECH S.A.S.*
------------------------------------------------
* Nombre: ${nombre}
* Empresa: ${empresa}
* Correo: ${email}
* Telefono: ${telefono}
* Ubicacion del Proyecto: ${ciudad}
* Servicio Requerido: ${servicio}

* Descripcion / Requerimiento:
${mensaje}

------------------------------------------------
Mensaje enviado desde incontechsas.com`;

    const waUrl = `https://wa.me/573212718824?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    closeQuoteModal();
    modalQuoteForm.reset();
  });
}

/* ---- React to Language Changes ---- */
window.addEventListener('languageChanged', () => {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(isDark);
  showTab(currentTabKey);
  renderProjects();
  renderLayers();
});

/* ---- Initial Page Load Setup ---- */
let initialized = false;
function initApp() {
  if (initialized) return;
  initialized = true;
  setupI18n();
  showTab(currentTabKey);
  renderProjects();
  renderLayers();
}

if (document.readyState !== 'loading') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}

})();
