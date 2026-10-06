(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---- Dark / Light Theme Mode Switcher ---- */
const themeToggleBtn = $('#themeToggleBtn');
const themeToggleText = $('.theme-toggle__text', themeToggleBtn);

function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  if (themeToggleText) {
    themeToggleText.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
  }
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;

applyTheme(initialDark);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* ---- Datos de Servicios y Laboratorio ---- */
const SERVICES = [
  ['Laboratorio de Suelos','Caracterización física y mecánica de suelos y materiales para apoyar estudios geotécnicos, diseño y control de proyectos.',['Límites de Atterberg','Granulometría','Compactación','Densidad','CBR','Clasificación USCS / AASHTO'],'#laboratorios','img/real/lab-suelos.jpg','img/suelos.svg'],
  ['Laboratorio de Concretos','Evaluación de propiedades físicas y mecánicas del concreto y mortero para el control de calidad en obra.',['Resistencia a compresión','Resistencia a flexión','Cilindros y Vigas','Diseño de mezclas','Ensayos no destructivos'],'#laboratorios','img/real/lab-concretos.jpg','img/concretos.svg'],
  ['Laboratorio de Pavimentos','Caracterización y control de materiales y mezclas asfálticas para infraestructura vial.',['Marshall (Estabilidad y flujo)','Extracción de asfalto','Gravedad específica','Granulometría de agregados','Toma de briquetas'],'#laboratorios','img/real/lab-pavimentos.jpg','img/pavimentos.svg'],
  ['Geofísica Especializada','Exploración indirecta no destructiva del subsuelo para perfiles sísmicos y tomografías eléctricas.',['Sismografía MASW (Vs30)','Refracción Sísmica','Resistividad Eléctrica (TRE)','SEV'],'#geofisica','img/real/proj-fiscalia.jpg','img/geofisica.svg'],
  ['Patología Estructural','Auscultación y diagnóstico técnico en estructuras existentes de concreto y mampostería.',['Extracción de núcleos','Esclerometría','Pacometría (detector de acero)','Carbonatación'],'#patologia','img/real/lab-concretos.jpg','img/patologia.svg'],
  ['Consultoría Geotécnica','Estudios y diseños de ingeniería civil para cimentaciones, estabilidad de taludes y estructuras viales.',['Estudios geotécnicos','Estabilidad de taludes','Diseño de pavimentos','Vulnerabilidad sísmica'],'#consultoria','img/real/proj-castilla.jpg','img/consultoria.svg']
];

const LABS = {
  suelos: ['Laboratorio de Suelos', 'Caracterizar el suelo es la base de todo proyecto seguro.', 'Analizamos la física y mecánica del subsuelo según normas INVIAS y ASTM para respaldar decisiones de ingeniería.', SERVICES[0][2], 'img/real/lab-suelos.jpg', 'img/suelos.svg'],
  concretos: ['Laboratorio de Concretos', 'Control de resistencia y calidad en cada vaciado.', 'Ensayos de rotura a compresión de cilindros, flexión de vigas y diseño de mezclas de concreto y mortero.', SERVICES[1][2], 'img/real/lab-concretos.jpg', 'img/concretos.svg'],
  pavimentos: ['Laboratorio de Pavimentos', 'Infraestructura vial duradera respaldada por ensayos.', 'Caracterización de mezclas asfálticas, agregados de cantera y control de calidad en obra vial.', SERVICES[2][2], 'img/real/lab-pavimentos.jpg', 'img/pavimentos.svg']
};

const PROJECTS = [
  ['Estudio Geotécnico','Estudio de Suelos – Zona ZODME EC3','Castilla, Meta','2022','img/real/proj-castilla.jpg','Caracterización estratigráfica y capacidad de carga para obra de infraestructura.'],
  ['Edificaciones','Calle Bistro en Viva Villavicencio','Villavicencio, Meta','2022–2023','img/real/proj-bistro.jpg','Control de calidad de concretos, cilindros y materiales en proyecto comercial.'],
  ['Vivienda VIS','Viviendas de Interés Social','Fuente de Oro, Meta','2022–2023','img/real/proj-vis.jpg','Ensayos de laboratorio de suelos y concretos para desarrollo residencial.'],
  ['Edificaciones','Fundación Universitaria FUNEDO','Arauca','2023','img/real/proj-funedo.jpg','Estudio geotécnico integral y prueba de materiales para sede universitaria.'],
  ['Consultoría','Diseños de Puente Vehicular y Accesos','Meta','2023','img/real/proj-puente.jpg','Diseño vial, hidráulico y geotécnico para infraestructura de transporte.'],
  ['Estudio Geotécnico','Nueva Sede de la Fiscalía','Mitú, Vaupés','2024','img/real/proj-fiscalia.jpg','Sondeos de exploración y caracterización para edificio institucional.'],
  ['Vivienda','Conjunto Residencial San Marino','Restrepo, Meta','2023–vigente','img/real/proj-sanmarino.png','Control de calidad continuo en cimentación y estructura.'],
  ['Edificaciones','Centro de Investigación IDEAM','Meta','2024–vigente','img/real/proj-ideam.jpg','Ensayos de laboratorio para desarrollo de sede científica.']
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- Render Tabpanel Laboratorios ---- */
const panel = $('#tabpanel');
function showTab(k) {
  const l = LABS[k]; if (!l) return;
  $$('.tab-nav__btn').forEach(b => b.classList.toggle('active', b.dataset.tab === k));
  panel.innerHTML = `
  <div class="split">
    <div>
      <span class="sec-eyebrow">${l[0]}</span>
      <h3 style="font-size:26px;margin-bottom:12px;color:var(--c-navy-dark)">${l[1]}</h3>
      <p style="font-size:16px;color:var(--c-body);margin-bottom:24px">${l[2]}</p>
      <h4 style="font-size:15px;margin-bottom:12px">Ensayos Principales:</h4>
      <ul class="corp-card__list" style="margin-bottom:28px">
        ${l[3].map(x => `<li>${esc(x)}</li>`).join('')}
      </ul>
      <a href="#cotizar" class="btn btn--primary">Cotizar ${l[0]}</a>
    </div>
    <div>
      <div class="img-frame img-frame--interactive">
        <img src="${l[4]}" alt="${esc(l[0])}" class="zoom-img" style="height:320px;object-fit:cover;width:100%">
        <div class="img-frame__badge">Normativa INVIAS / ASTM</div>
      </div>
    </div>
  </div>`;
}

$$('.tab-nav__btn').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
$$('[data-tab]:not(.tab-nav__btn)').forEach(a => a.addEventListener('click', (e) => {
  const tab = a.dataset.tab;
  if (tab && LABS[tab]) {
    showTab(tab);
  }
}));
if (panel) showTab('suelos');

/* ---- Render Proyectos ---- */
const projContainer = $('#projects');
if (projContainer) {
  projContainer.innerHTML = PROJECTS.map((p, i) => `
  <div class="proj-card" ${i > 2 ? 'hidden' : ''} data-img="${p[4]}" data-title="${esc(p[1])}" data-desc="${esc(p[5])}" data-loc="${esc(p[2])}" data-year="${esc(p[3])}">
    <img src="${p[4]}" alt="${esc(p[1])}" class="proj-card__img">
    <div class="proj-card__body">
      <span class="proj-card__cat">${p[0]}</span>
      <h3 class="proj-card__title">${esc(p[1])}</h3>
      <p style="font-size:13px;font-weight:700;color:var(--c-navy);margin-bottom:6px">${p[2]} · ${p[3]}</p>
      <p class="proj-card__desc">${p[5]}</p>
    </div>
  </div>`).join('');
}

const moreBtn = $('#moreProj');
if (moreBtn) {
  moreBtn.addEventListener('click', () => {
    const open = moreBtn.getAttribute('aria-expanded') === 'true';
    $$('.proj-card', projContainer).forEach((el, i) => { if (i > 2) el.hidden = open; });
    moreBtn.setAttribute('aria-expanded', !open);
    moreBtn.textContent = open ? 'Ver Más Proyectos' : 'Ver Menos';
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
const LAYERS = [
  ['Capa Orgánica', '0 – 0,5 m', 'Suelo vegetal superficial con materia orgánica; se evalúa descapote e impacto antes de fundar.', ['Caracterización de materiales', 'Densidad en sitio']],
  ['Arcilla Plástica', '0,5 – 2,0 m', 'Suelo fino cohesivo con plasticidad media a alta; se miden límites y consolidación.', ['Límites de Atterberg', 'Densidad', 'Compactación']],
  ['Arena Granular', '2,0 – 4,0 m', 'Suelo granular con buena capacidad portante y drenaje; ensayo de gradación.', ['Granulometría INVIAS E-123', 'Compactación Proctor', 'CBR']],
  ['Grava de Cantera', '4,0 – 6,0 m', 'Material grueso ideal para subbases y bases granulares de pavimento.', ['Granulometría', 'Desgaste de los Ángeles', 'CBR']],
  ['Roca de Basamento', '> 6,0 m', 'Estrato rocoso competente; exploración indirecta mediante geofísica.', ['Sismografía MASW', 'Refracción Sísmica', 'Resistividad Eléctrica']]
];

const layersList = $('#layers'), layerDetail = $('#layerDetail');
if (layersList && layerDetail) {
  layersList.innerHTML = LAYERS.map((l, i) => `<button role="tab" class="tab-btn ${i===1?'active':''}" data-i="${i}">${l[0]} <small>(${l[1]})</small></button>`).join('');

  function showLayer(i) {
    const l = LAYERS[i]; if (!l) return;
    $$('button', layersList).forEach((b, k) => b.classList.toggle('active', k === +i));
    layerDetail.innerHTML = `
      <span class="sec-eyebrow">PROFUNDIDAD: ${l[1]}</span>
      <h3 style="font-size:24px;margin-bottom:8px">${l[0]}</h3>
      <p style="font-size:15px;color:var(--c-body);margin-bottom:20px">${l[2]}</p>
      <h4 style="font-size:14px;margin-bottom:10px">Ensayos Recomendados:</h4>
      <ul class="corp-card__list">
        ${l[3].map(x => `<li>${esc(x)}</li>`).join('')}
      </ul>`;
  }

  layersList.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn) showLayer(btn.dataset.i);
  });
  showLayer(1);
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
    showPopover(e, { title, desc, badge: 'PRODUCTO / SOLUCIÓN' });
  }

  const svgSchematic = e.target.closest('.svg-schematic');
  if (svgSchematic) {
    const pType = svgSchematic.dataset.popover;
    let title = 'Esquema Técnico', desc = 'Modelamiento interactivo de análisis.';
    if (pType === 'geofisica') {
      title = 'Sismografía MASW & Tomografía';
      desc = 'Ondas Rayleigh Vs30 y tomografía de resistividad para estudios sísmicos NSR-10.';
    } else if (pType === 'patologia') {
      title = 'Patología y Auscultación';
      desc = 'Mapeo de armadura con pacometría y ensayo de compresión en núcleos extraídos.';
    } else if (pType === 'consultoria') {
      title = 'Perfil Estratigráfico Geotécnico';
      desc = 'Horizonte de suelos, nivel freático y diseño de muros de contención.';
    }
    showPopover(e, { title, desc, badge: 'ESQUEMA ANIMADO' });
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

})();
