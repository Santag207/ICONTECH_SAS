// Backend mínimo: sirve la Home y recibe el formulario de cotización por correo.
// Uso: cp .env.example .env  →  npm install  →  npm start  →  http://localhost:3000
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: +process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, max: 8 }), upload.single('archivo'), async (req, res) => {
  const b = req.body;
  if (b.web) return res.json({ ok: true }); // honeypot anti-spam
  const valid = b.nombre && b.nombre.trim().split(/\s+/).length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email || '')
    && b.telefono && b.ciudad && b.servicio && (b.mensaje || '').trim().length >= 20 && b.acepto;
  if (!valid) return res.status(400).json({ error: 'Datos inválidos' });
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM, to: process.env.MAIL_TO, replyTo: b.email,
      subject: `Solicitud de cotización – ${b.servicio} – ${b.nombre}`,
      html: `<h2>Nueva solicitud web</h2><p><b>Nombre:</b> ${esc(b.nombre)}<br><b>Empresa:</b> ${esc(b.empresa)}<br><b>Correo:</b> ${esc(b.email)}<br><b>Teléfono:</b> ${esc(b.telefono)}<br><b>Ciudad:</b> ${esc(b.ciudad)}<br><b>Servicio:</b> ${esc(b.servicio)}</p><p>${esc(b.mensaje).replace(/\n/g, '<br>')}</p>`,
      attachments: req.file ? [{ filename: req.file.originalname, content: req.file.buffer }] : []
    });
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(500).json({ error: 'No se pudo enviar' }); }
});

app.listen(process.env.PORT || 3000, () => console.log('INCONTECH en http://localhost:' + (process.env.PORT || 3000)));
