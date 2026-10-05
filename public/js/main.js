(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---- Datos (revisar con INCONTECH antes de producción) ---- */
const SERVICES = [
  ['Laboratorio de Suelos','Caracterización física y mecánica de suelos y materiales para apoyar estudios geotécnicos, diseño y control de proyectos de infraestructura.',['Límites de Atterberg','Granulometría','Compactación','Densidad','CBR','Caracterización de materiales'],'#laboratorios'],
  ['Laboratorio de Concretos','Evaluación de propiedades físicas y mecánicas del concreto y mortero para apoyar el control de calidad de los proyectos.',['Resistencia a compresión','Resistencia a flexión','Ensayos en cubos','Diseño de mezclas','Diseño de morteros'],'#laboratorios'],
  ['Laboratorio de Pavimentos','Caracterización y control de materiales y mezclas utilizadas en infraestructura vial.',['Marshall','Estabilidad y flujo','Gravedad específica','Densidad','Toma de briquetas'],'#laboratorios'],
  ['Geofísica','Obtención de información complementaria sobre las condiciones del subsuelo mediante métodos de exploración geofísica.',['MASW','Refracción sísmica','Resistividad eléctrica','SEV'],'#geofisica'],
  ['Patología estructural','Evaluación de elementos y estructuras mediante técnicas de inspección y ensayos orientados a identificar condiciones y características del material.',['Extracción de núcleos','Esclerometría','Determinación de refuerzo','Carbonatación','Regatas'],'#patologia'],
  ['Consultoría','Estudios y diseños especializados para apoyar la planificación, evaluación y ejecución de proyectos de obras civiles.',['Estudios geotécnicos','Taludes','Topografía','Diseño de pavimentos','Diseño estructural','Vulnerabilidad sísmica'],'#consultoria']
];
const LABS = {
  suelos:['Laboratorio de suelos','Caracterizar el suelo es entender la base del proyecto.','Analizamos propiedades físicas y mecánicas de los suelos y materiales asociados para generar información útil para estudios, diseños y procesos de control de calidad.',SERVICES[0][2]],
  concretos:['Laboratorio de concretos','Medir el desempeño del concreto antes de tomar decisiones.','Realizamos ensayos para evaluar propiedades del concreto y mortero y apoyar el control de calidad de los materiales utilizados en los proyectos.',SERVICES[1][2]],
  pavimentos:['Laboratorio de pavimentos','Datos para construir y evaluar infraestructura vial con criterio técnico.','Caracterizamos mezclas y materiales relacionados con pavimentos para apoyar el control de calidad y la evaluación de los proyectos.',SERVICES[2][2]]
};
const PROJECTS = [
  ['Estudio geotécnico','Estudio de suelos – Zona ZODME EC3','Castilla, Meta','2022'],
  ['Edificaciones','Calle Bistro en Viva Villavicencio','Villavicencio, Meta','2022–2023'],
  ['Vivienda','Viviendas de interés social – Fuente de Oro','Fuente de Oro, Meta','2022–2023'],
  ['Edificaciones','Fundación Universitaria Obrera – FUNEDO','Arauca','2023'],
  ['Consultoría','Estudios y diseños para puente vehicular y vías de acceso','—','2023'],
  ['Estudio geotécnico','Estudio de suelos – Nueva sede de la Fiscalía','Mitú, Vaupés','2024'],
  ['Vivienda','San Marino Conjunto Residencial','Restrepo, Meta','2023 – vigente'],
  ['Edificaciones','Construcción del Centro del IDEAM','Meta','2024 – vigente']
];
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- Render ---- */
$('#cards').innerHTML = SERVICES.map((s,i) => `<article class="card">${i<3?`<img src="img/${['suelos','concretos','pavimentos'][i]}.svg" alt="Ilustración de ${esc(s[0])}" loading="lazy">`:`<div class="ph" role="img" aria-label="Foto de ${esc(s[0])}"><span>Foto real</span></div>`}<div class="card__b"><span class="card__n">0${i+1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><ul>${s[2].map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a class="link" href="${s[3]}">Ver servicio →</a></div></article>`).join('');

const panel = $('#tabpanel');
function showTab(k){
  const l = LABS[k]; if(!l) return;
  $$('.tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === k));
  panel.innerHTML = `<div><p class="eyebrow">${l[0]}</p><h2>${l[1]}</h2><p>${l[2]}</p><p style="margin-top:24px;font-weight:600">Entre los servicios disponibles se encuentran:</p><ul>${l[3].map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn btn--o" href="#cotizar">Cotizar ${l[0].toLowerCase()}</a></div><img class="lab-img" src="img/${k}.svg" alt="Ilustración de ${l[0]}" loading="lazy">`;
}
$$('.tabs button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
$$('[data-tab]:not(button)').forEach(a => a.addEventListener('click', () => showTab(a.dataset.tab)));
showTab('suelos');

const proj = $('#projects');
proj.innerHTML = PROJECTS.map((p,i) => `<article class="proj" ${i>2?'hidden':''}><div class="ph" role="img" aria-label="Foto del proyecto"><span>Foto proyecto</span></div><div><span class="cat">${p[0]}</span><h3>${esc(p[1])}</h3><p>${p[2]} · ${p[3]}</p></div><a class="link" href="#proyectos">Ver proyecto →</a></article>`).join('');
const more = $('#moreProj');
more.addEventListener('click', () => {
  const open = more.getAttribute('aria-expanded') === 'true';
  $$('.proj', proj).forEach((el,i) => { if(i>2) el.hidden = open; });
  more.setAttribute('aria-expanded', !open); more.textContent = open ? 'Ver más proyectos' : 'Ver menos';
});

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
const setMenu = o => { menu.classList.toggle('open', o); ov.classList.toggle('on', o); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; };
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
ov.addEventListener('click', () => setMenu(false));
addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
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
function showLayer(i){const l=LAYERS[i];$$('button',lw).forEach((b,k)=>b.setAttribute('aria-selected',k===+i));
 ld.innerHTML=`<p class="eyebrow">${l[1]}</p><h3>${l[0]}</h3><p>${l[4]}</p><p style="margin-top:20px;font-weight:700">Ensayos y métodos relacionados</p><ul>${l[5].map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn btn--o" href="#cotizar">Cotizar este servicio</a>`;}
lw.addEventListener('click',e=>{const b=e.target.closest('button');if(b)showLayer(b.dataset.i)});
showLayer(1);
})();
