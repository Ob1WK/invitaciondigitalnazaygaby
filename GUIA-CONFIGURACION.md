# 🌿 Naza & Gaby — Guía Completa de Configuración

## Archivos del proyecto

```
wedding-invitation/
├── index.html              ← La invitación web completa
└── google-apps-script.gs   ← Código para conectar con Google Sheets
```

---

## ⚙️ Paso 1 — Personalizar el archivo `index.html`

Abrí `index.html` y buscá el bloque `CONFIG` cerca del inicio del `<script>`:

```javascript
const CONFIG = {
  weddingDate: new Date(2025, 10, 7, 15, 30, 0),  // ← año, mes-1, día, hora, min
  SHEETS_URL:  'TU_GOOGLE_APPS_SCRIPT_URL_AQUI',   // ← completar en Paso 3
  WA_NUMBER:   '5491100000000',                     // ← tu número con código de país
  ALIAS:       'nazaygaby.hogar',                   // ← tu alias bancario real
  CBU:         '0000003100012345678901',            // ← tu CBU real
};
```

También podés actualizar los **regalos** en el array `GIFTS` más abajo.

---

## 📊 Paso 2 — Crear el Google Sheet

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una hoja nueva.
2. Nombrala como quieras (ej: "RSVP Naza y Gaby").
3. Copiá el **ID** de la URL. Ejemplo:
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                          ↑──────────────────────────────────────────────
                                          Este es el SHEET_ID
   ```

---

## 🔧 Paso 3 — Configurar Google Apps Script

1. Con el Sheet abierto, andá a **Extensiones → Apps Script**.
2. Borrá el código que trae por defecto.
3. Pegá **todo** el contenido de `google-apps-script.gs`.
4. Reemplazá `'TU_GOOGLE_SHEET_ID_AQUI'` con el ID del Paso 2:
   ```javascript
   const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms';
   ```
5. Guardá con **Ctrl+S** (nombre del proyecto: "RSVP Boda").

---

## 🚀 Paso 4 — Desplegar como Web App

1. Click en **Desplegar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configurar así:
   - **Ejecutar como:** Yo (tu cuenta de Google)
   - **Quién tiene acceso:** Cualquier persona
4. Click en **Implementar** → autorizar los permisos cuando te pida.
5. Copiá la **URL de la Web App** que te da (algo así como `https://script.google.com/macros/s/AKfyc.../exec`).
6. Pegá esa URL en `index.html` dentro del `CONFIG`:
   ```javascript
   SHEETS_URL: 'https://script.google.com/macros/s/AKfyc.../exec',
   ```

> **Importante:** Cada vez que modifiques el script, debés crear una **nueva implementación** (no versión nueva) para que los cambios apliquen.

---

## 🔗 Paso 5 — Generar links personalizados

El sistema lee los parámetros `?pax=` y `?nombres=` de la URL.

### Formato del link:
```
https://tudominio.com/?pax=2&nombres=Juan+y+María
```

### Ejemplos:

| Invitado | Link a enviar |
|----------|--------------|
| Familia García (4 pax) | `.../?pax=4&nombres=Familia+García` |
| Juan y María (2 pax) | `.../?pax=2&nombres=Juan+y+María` |
| Solo Pedro (1 pax) | `.../?pax=1&nombres=Pedro+López` |
| Sin personalizar | `...` (sin parámetros, no muestra el card) |

> Los **espacios** en los nombres van como `+` o `%20` en la URL.

---

## 🌐 Paso 6 — Publicar la web

### Opción A — GitHub Pages (gratis y fácil)
1. Creá una cuenta en [github.com](https://github.com).
2. Nuevo repositorio → subí `index.html`.
3. Settings → Pages → Branch: main → carpeta: root.
4. Tu URL será: `https://tu-usuario.github.io/nombre-repo/`

### Opción B — Netlify (gratis, más profesional)
1. Registrate en [netlify.com](https://netlify.com).
2. Drag & drop de `index.html` en el dashboard.
3. Podés comprar un dominio personalizado directamente desde Netlify.

### Opción C — Dominio propio
Subí el `index.html` a cualquier hosting con soporte estático (Hostinger, DonWeb, etc.).

---

## 📱 Paso 7 — Configurar número de WhatsApp

En el `CONFIG` dentro de `index.html`:
```javascript
WA_NUMBER: '5491155556677',
//          ↑  ↑  ↑
//          54 = Argentina
//             11 = código de área sin 0
//               número sin 15
```

El mensaje prearmado que recibirán los novios es:
> *"¡Hola! Ya completamos el formulario y confirmamos nuestra asistencia a la boda. 🌿"*

Podés cambiar este mensaje buscando la línea `const waMsg = encodeURIComponent(...)` en el script.

---

## 🎁 Paso 8 — Actualizar la lista de regalos

Buscá el array `GIFTS` en el script y editá cada objeto:

```javascript
{
  emoji: '🛋️',           // Emoji del regalo
  name:  'Sillón',       // Nombre del regalo
  desc:  'Descripción',  // Texto descriptivo
  link:  'https://...',  // Link al producto en la tienda
},
```

---

## ✅ Checklist final

- [ ] Actualicé `ALIAS` y `CBU` con los datos bancarios reales
- [ ] Actualicé `WA_NUMBER` con el número de WhatsApp de los novios
- [ ] Actualicé el array `GIFTS` con los regalos reales y sus links
- [ ] Creé el Google Sheet y copié el ID
- [ ] Pegué el script en Apps Script y lo desplegué
- [ ] Copié la URL del Web App y la pegué en `SHEETS_URL`
- [ ] Publiqué la web y probé el formulario de punta a punta
- [ ] Probé el link con parámetros: `.../?pax=2&nombres=Prueba`

---

¡Eso es todo! 🌿 Con esto tenés una invitación completamente funcional, personalizable y conectada a Google Sheets.
