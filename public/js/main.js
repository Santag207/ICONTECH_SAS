(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---- Datos (revisar con INCONTECH antes de producción) ---- */
const SERVICES = [
  ['Laboratorio de Suelos','Caracterización física y mecánica de suelos y materiales para apoyar estudios geotécnicos, diseño y control de proyectos de infraestructura.',['Límites de Atterberg','Granulometría','Compactación','Densidad','CBR','Caracterización de materiales'],'#laboratorios','img/real/lab-suelos.jpg','img/suelos.svg'],
  ['Laboratorio de Concretos','Evaluación de propiedades físicas y mecánicas del concreto y mortero para apoyar el control de calidad de los proyectos.',['Resistencia a compresión','Resistencia a flexión','Ensayos en cubos','Diseño de mezclas','Diseño de morteros'],'#laboratorios','img/real/lab-concretos.jpg','img/concretos.svg'],
  ['Laboratorio de Pavimentos','Caracterización y control de materiales y mezclas utilizadas en infraestructura vial.',['Marshall','Estabilidad y flujo','Gravedad específica','Densidad','Toma de briquetas'],'#laboratorios','img/real/lab-pavimentos.jpg','img/pavimentos.svg'],
  ['Geofísica','Obtención de información complementaria sobre las condiciones del subsuelo mediante métodos de exploración geofísica.',['MASW','Refracción sísmica','Resistividad eléctrica','SEV'],'#geofisica','img/real/proj-castilla.jpg','img/geofisica.svg'],
  ['Patología estructural','Evaluación de elementos y estructuras mediante técnicas de inspección y ensayos orientados a identificar condiciones y características del material.',['Extracción de núcleos','Esclerometría','Determinación de refuerzo','Carbonatación','Regatas'],'#patologia','img/real/lab-concretos.jpg','img/patologia.svg'],
  ['Consultoría','Estudios y diseños especializados para apoyar la planificación, evaluación y ejecución de proyectos de obras civiles.',['Estudios geotécnicos','Taludes','Topografía','Diseño de pavimentos','Diseño estructural','Vulnerabilidad sísmica'],'#consultoria','img/real/proj-puente.jpg','img/consultoria.svg']
];

const LABS = {
  suelos:['Laboratorio de suelos','Caracterizar el suelo es entender la base del proyecto.','Analizamos propiedades físicas y mecánicas de los suelos y materiales asociados para generar información útil para estudios, diseños y procesos de control de calidad.',SERVICES[0][2],'img/real/lab-suelos.jpg','img/suelos.svg'],
  concretos:['Laboratorio de concretos','Medir el desempeño del concreto antes de tomar decisiones.','Realizamos ensayos para evaluar propiedades del concreto y mortero y apoyar el control de calidad de los materiales utilizados en los proyectos.',SERVICES[1][2],'img/real/lab-concretos.jpg','img/concretos.svg'],
  pavimentos:['Laboratorio de pavimentos','Datos para construir y evaluar infraestructura vial con criterio técnico.','Caracterizamos mezclas y materiales relacionados con pavimentos para apoyar el control de calidad y la evaluación de los proyectos.',SERVICES[2][2],'img/real/lab-pavimentos.jpg','img/pavimentos.svg']
};

const PROJECTS = [
  ['Estudio geotécnico','Estudio de suelos – Zona ZODME EC3','Castilla, Meta','2022','img/real/proj-castilla.jpg','Estudio técnico especializado para zona ZODME en Castilla.'],
  ['Edificaciones','Calle Bistro en Viva Villavicencio','Villavicencio, Meta','2022–2023','img/real/proj-bistro.jpg','Control de calidad de concretos y materiales en zona comercial.'],
  ['Vivienda','Viviendas de interés social – Fuente de Oro','Fuente de Oro, Meta','2022–2023','img/real/proj-vis.jpg','Ensayos de laboratorio para desarrollo de vivienda VIS.'],
  ['Edificaciones','Fundación Universitaria Obrera – FUNEDO','Arauca','2023','img/real/proj-funedo.jpg','Estudio geotécnico y control de materiales en sede de educación.'],
  ['Consultoría','Estudios y diseños para puente vehicular y vías de acceso','Meta','2023','img/real/proj-puente.jpg','Diseños viales, estudios hidráulicos y geotécnicos de puentes.'],
  ['Estudio geotécnico','Estudio de suelos – Nueva sede de la Fiscalía','Mitú, Vaupés','2024','img/real/proj-fiscalia.jpg','Exploración geotécnica y caracterización para edificio institucional.'],
  ['Vivienda','San Marino Conjunto Residencial','Restrepo, Meta','2023 – vigente','img/real/proj-sanmarino.png','Control de calidad continuo y caracterización de suelos.'],
  ['Edificaciones','Construcción del Centro del IDEAM','Meta','2024 – vigente','img/real/proj-ideam.jpg','Supervisión de ensayos de materiales y suelos para sede IDEAM.']
];

const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- Render Cards de Servicios ---- */
$('#cards').innerHTML = SERVICES.map((s,i) => `
<article class="card" data-service="${esc(s[0])}" data-desc="${esc(s[1])}">
  <div class="card__media">
    <img src="${s[4]}" alt="Fotografía de ${esc(s[0])}" class="card__img-real" loading="lazy">
    <div class="card__svg-container">
      <img src="${s[5]}" alt="Diagrama técnico de ${esc(s[0])}">
      <span class="card__svg-tag">Esquema Técnico</span>
    </div>
  </div>
  <div class="card__b">
    <span class="card__n">0${i+1}</span>
    <h3>${esc(s[0])}</h3>
    <p>${esc(s[1])}</p>
    <ul>${s[2].map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
    <a class="link" href="${s[3]}">Ver detalles de ${esc(s[0])} →</a>
  </div>
</article>`).join('');

/* ---- Render Pestañas de Laboratorios ---- */
const panel = $('#tabpanel');
function showTab(k){
  const l = LABS[k]; if(!l) return;
  $$('.tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === k));
  panel.innerHTML = `
  <div class="tabpanel__info">
    <p class="eyebrow">${l[0]}</p>
    <h2>${l[1]}</h2>
    <p class="lead">${l[2]}</p>
    <p style="margin-top:24px;font-weight:700;color:var(--ink)">Ensayos y pruebas especializadas:</p>
    <ul>${l[3].map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
    <div style="margin-top:32px">
      <a class="btn btn--p" href="#cotizar">Solicitar cotización de ${l[0].toLowerCase()}</a>
    </div>
  </div>
  <div class="tabpanel__visual">
    <div class="lab-photo-wrapper">
      <img class="lab-img lab-img--real" src="${l[4]}" alt="Fotografía de laboratorio real para ${esc(l[0])}" loading="lazy">
      <div class="lab-svg-container">
        <img src="${l[5]}" alt="Esquema técnico ${esc(l[0])}">
        <div class="lab-svg-badge">Diagrama Dinámico</div>
      </div>
    </div>
  </div>`;
}
$$('.tabs button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
$$('[data-tab]:not(button)').forEach(a => a.addEventListener('click', () => showTab(a.dataset.tab)));
showTab('suelos');

/* ---- Render Proyectos ---- */
const proj = $('#projects');
proj.innerHTML = PROJECTS.map((p,i) => `
<article class="proj" ${i>2?'hidden':''} data-img="${p[4]}" data-title="${esc(p[1])}" data-desc="${esc(p[5])}" data-loc="${esc(p[2])}" data-year="${esc(p[3])}">
  <div class="proj__img-box">
    <img src="${p[4]}" alt="Foto del proyecto ${esc(p[1])}" loading="lazy" class="proj__thumb">
    <span class="proj__zoom-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></span>
  </div>
  <div class="proj__info">
    <span class="cat">${p[0]}</span>
    <h3>${esc(p[1])}</h3>
    <p class="proj__loc">${p[2]} · <span class="proj__year">${p[3]}</span></p>
    <p class="proj__desc">${p[5]}</p>
  </div>
  <button class="btn btn--o proj__btn-view" type="button" aria-label="Ampliar fotografía del proyecto ${esc(p[1])}">Ampliar foto</button>
</article>`).join('');

const more = $('#moreProj');
more.addEventListener('click', () => {
  const open = more.getAttribute('aria-expanded') === 'true';
  $$('.proj', proj).forEach((el,i) => { if(i>2) el.hidden = open; });
  more.setAttribute('aria-expanded', !open);
  more.textContent = open ? 'Ver más proyectos' : 'Ver menos';
});

/* ---- Modal Lightbox de Proyectos ---- */
const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'modalLightbox';
modal.setAttribute('aria-hidden', 'true');
modal.innerHTML = `
  <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button class="modal__close" id="modalClose" aria-label="Cerrar modal">&times;</button>
    <img src="" alt="" class="modal__img" id="modalImg">
    <div class="modal__info">
      <h3 id="modalTitle"></h3>
      <p id="modalLoc" style="font-weight:700;color:var(--g);margin-top:4px"></p>
      <p id="modalDesc" style="margin-top:10px;color:var(--t)"></p>
    </div>
  </div>`;
document.body.appendChild(modal);

function openModal(card) {
  $('#modalImg').src = card.dataset.img;
  $('#modalImg').alt = card.dataset.title;
  $('#modalTitle').textContent = card.dataset.title;
  $('#modalLoc').textContent = card.dataset.loc + ' (' + card.dataset.year + ')';
  $('#modalDesc').textContent = card.dataset.desc;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

proj.addEventListener('click', e => {
  const card = e.target.closest('.proj');
  if (card && (e.target.closest('.proj__img-box') || e.target.closest('.proj__btn-view'))) {
    openModal(card);
  }
});

$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* ---- Navbar / topbar / to-top ---- */
const nav = $('#nav'), top = $('#topbar'), totop = $('#totop');
const onScroll = () => {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 40); top.classList.toggle('hide', y > 40);
  totop.classList.toggle('on', y > 500);
};
addEventListener('scroll', onScroll, {passive:true}); onScroll();
totop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

/* ---- Menú móvil ---- */
const burger = $('#burger'), menu = $('#menu'), ov = $('#overlay');
const setMenu = o => {
  menu.classList.toggle('open', o);
  ov.classList.toggle('on', o);
  burger.setAttribute('aria-expanded', o);
  document.body.style.overflow = o ? 'hidden' : '';
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
ov.addEventListener('click', () => setMenu(false));
addEventListener('keydown', e => { if(e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
$$('#menu a').forEach(a => a.addEventListener('click', e => {
  if(a.classList.contains('dd__btn') && innerWidth <= 1024){ e.preventDefault(); a.parentElement.classList.toggle('open'); return; }
  setMenu(false);
}));

/* ---- Reveals ---- */
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.15});
$$('.reveal, .steps').forEach(el => io.observe(el));

/* ---- Formulario ---- */
const form = $('#form'), ok = $('#ok');
const rules = {
  nombre: v => v.trim().split(/\s+/).filter(Boolean).length >= 2 || 'Escribe nombre y apellido.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Ingresa un correo electrónico válido.',
  telefono: v => /^(\+?57)?\s?(3\d{2}|60\d)[\s-]?\d{3}[\s-]?\d{4}$/.test(v.trim()) || 'Ingresa un teléfono colombiano válido (ej. 321 271 8824).',
  ciudad: v => v.trim().length > 1 || 'Este campo es obligatorio.',
  servicio: v => !!v || 'Este campo es obligatorio.',
  mensaje: v => v.trim().length >= 20 || 'Describe brevemente tu proyecto (mínimo 20 caracteres).',
  acepto: (v, el) => el.checked || 'Debes aceptar la política de datos.'
};
function check(name){
  const el = form.elements[name], r = rules[name](el.value, el), box = el.closest('.f');
  $('#e-' + name).textContent = r === true ? '' : r; box.classList.toggle('bad', r !== true);
  el.setAttribute('aria-invalid', r !== true); return r === true;
}
Object.keys(rules).forEach(n => form.elements[n].addEventListener('blur', () => check(n)));
form.addEventListener('submit', async e => {
  e.preventDefault(); ok.hidden = true; ok.classList.remove('bad');
  const valid = Object.keys(rules).map(check).every(Boolean);
  if(!valid){ form.querySelector('.bad input, .bad select, .bad textarea')?.focus(); return; }
  const btn = $('#send'); btn.disabled = true; btn.textContent = 'Enviando…';
  try{
    const res = await fetch('/api/contact', {method:'POST', body:new FormData(form)});
    const data = await res.json().catch(() => ({}));
    if(!res.ok) throw new Error(data.error || 'Error');
    ok.innerHTML = '<b>Solicitud enviada correctamente.</b> Gracias por contactarnos. Nuestro equipo revisará la información y se pondrá en contacto con usted.';
    form.reset();
  }catch(err){
    ok.classList.add('bad'); ok.innerHTML = '<b>No pudimos enviar la solicitud.</b> Inténtalo de nuevo o escríbenos por WhatsApp.';
  }
  ok.hidden = false; ok.focus?.(); btn.disabled = false; btn.textContent = 'Enviar solicitud';
});

/* ---- Explorador de perfil ---- */
const LAYERS=[
 ['Capa orgánica','0 – 0,5 m','#4a3425',64,'Material superficial con materia orgánica; se evalúa antes de cimentar o construir sobre él.',['Caracterización de materiales','Densidad']],
 ['Arcilla','0,5 – 2 m','#8b5e3c',92,'Suelo fino cuya plasticidad y comportamiento influyen en la estabilidad y el diseño.',['Límites de Atterberg','Densidad','Compactación']],
 ['Arena','2 – 4 m','#c9a57a',92,'Suelo granular que se clasifica por su distribución de tamaños y su densidad.',['Granulometría','Densidad','Compactación']],
 ['Grava','4 – 6 m','#8f8a82',92,'Material grueso usado en bases y subbases; se verifica su gradación y capacidad de soporte.',['Granulometría','Compactación','CBR']],
 ['Roca','> 6 m','#5d5b58',80,'Estrato resistente que puede explorarse indirectamente con métodos geofísicos.',['MASW','Tomografía de refracción sísmica','Tomografía de resistividad eléctrica']]
];
const lw=$('#layers'), ld=$('#layerDetail');
lw.innerHTML=LAYERS.map((l,i)=>`<button role="tab" aria-selected="${i===1}" data-i="${i}" style="background:${l[2]};height:${l[3]}px">${l[0]}<small>${l[1]}</small></button>`).join('');
function showLayer(i){
  const l=LAYERS[i];
  $$('button',lw).forEach((b,k)=>b.setAttribute('aria-selected',k===+i));
  ld.innerHTML=`<p class="eyebrow">${l[1]}</p><h3>${l[0]}</h3><p>${l[4]}</p><p style="margin-top:20px;font-weight:700">Ensayos y métodos relacionados</p><ul>${l[5].map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn btn--o" href="#cotizar">Cotizar este servicio</a>`;
}
lw.addEventListener('click',e=>{const b=e.target.closest('button');if(b)showLayer(b.dataset.i)});
showLayer(1);

/* ---- Ventana Emergente Temporal / Floating Hover Popover ---- */
const popover = document.createElement('div');
popover.className = 'popover';
popover.id = 'floatingPopover';
popover.innerHTML = `
  <div class="popover__header">
    <img src="" alt="" class="popover__thumb" id="popThumb">
    <div>
      <span class="popover__badge" id="popBadge">INCONTECH</span>
      <div class="popover__title" id="popTitle">Title</div>
    </div>
  </div>
  <div class="popover__body" id="popBody">Body</div>
  <div class="popover__status" id="popStatus">Calidad Certificada ONAC / ISO 17025</div>
`;
document.body.appendChild(popover);

function showPopover(e, data) {
  if (innerWidth < 768) return;
  $('#popThumb').src = data.img || 'img/real/logo.png';
  $('#popBadge').textContent = data.badge || 'ESPECIFICACIÓN TÉCNICA';
  $('#popTitle').textContent = data.title;
  $('#popBody').textContent = data.desc;
  $('#popStatus').textContent = data.status || 'Equipos Calibrados ONAC · Trazabilidad';

  popover.classList.add('visible');
  positionPopover(e);
}

function positionPopover(e) {
  const pad = 16;
  let x = e.clientX + 20;
  let y = e.clientY + 20;
  if (x + 330 > innerWidth - pad) x = e.clientX - 340;
  if (y + 190 > innerHeight - pad) y = e.clientY - 190;
  popover.style.left = `${Math.max(pad, x)}px`;
  popover.style.top = `${Math.max(pad, y)}px`;
}

function hidePopover() {
  popover.classList.remove('visible');
}

document.addEventListener('mouseover', e => {
  const card = e.target.closest('.card');
  if (card && !card.contains(e.relatedTarget)) {
    const sName = card.dataset.service;
    const sDesc = card.dataset.desc;
    const img = card.querySelector('.card__img-real')?.src;
    showPopover(e, {
      title: sName,
      desc: sDesc,
      img: img,
      badge: 'SERVICIO ESPECIALIZADO',
      status: 'Acreditación / Normas INVIAS & ACI'
    });
  }

  const projCard = e.target.closest('.proj');
  if (projCard && !projCard.contains(e.relatedTarget)) {
    const pTitle = projCard.dataset.title;
    const pDesc = projCard.dataset.desc;
    const img = projCard.dataset.img;
    const loc = projCard.dataset.loc;
    showPopover(e, {
      title: pTitle,
      desc: `${loc} — ${pDesc}`,
      img: img,
      badge: 'PROYECTO REALIZADO',
      status: 'Acompañamiento y control de calidad'
    });
  }

  const btnLayer = e.target.closest('.layers button');
  if (btnLayer && !btnLayer.contains(e.relatedTarget)) {
    const idx = btnLayer.dataset.i;
    const l = LAYERS[idx];
    if (l) {
      showPopover(e, {
        title: `${l[0]} (${l[1]})`,
        desc: l[4],
        img: 'img/real/lab-suelos.jpg',
        badge: 'ESTRATO GEOTÉCNICO',
        status: `Ensayos: ${l[5].join(', ')}`
      });
    }
  }
});

document.addEventListener('mousemove', e => {
  if (popover.classList.contains('visible')) {
    positionPopover(e);
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.closest('.card, .proj, .layers button') && !e.relatedTarget?.closest('.card, .proj, .layers button')) {
    hidePopover();
  }
});

})();
