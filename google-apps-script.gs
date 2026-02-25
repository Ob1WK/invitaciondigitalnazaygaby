/**
 * ════════════════════════════════════════════════════════
 *  GOOGLE APPS SCRIPT — RSVP para Naza & Gaby
 *  
 *  INSTRUCCIONES DE CONFIGURACIÓN:
 *  1. Abrí Google Sheets → Extensiones → Apps Script
 *  2. Pegá este código completo
 *  3. Configurá SHEET_ID y SHEET_NAME abajo
 *  4. Desplegá como Web App (ver instrucciones abajo)
 * ════════════════════════════════════════════════════════
 */

// ─── CONFIGURACIÓN ───────────────────────────────────────
const SHEET_ID   = 'TU_GOOGLE_SHEET_ID_AQUI';  // ID de tu hoja (está en la URL)
const SHEET_NAME = 'RSVP';                       // Nombre de la pestaña
// ─────────────────────────────────────────────────────────

/**
 * Maneja peticiones GET (para testear desde el browser)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'RSVP endpoint activo ✓' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Maneja peticiones POST desde la invitación web
 */
function doPost(e) {
  try {
    // Parsear el JSON recibido
    const data = JSON.parse(e.postData.contents);
    
    // Obtener la hoja
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    let   sheet = ss.getSheetByName(SHEET_NAME);
    
    // Si no existe la hoja, crearla con encabezados
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Fecha y hora',
        'Nombre',
        'Apellido', 
        'Asistencia',
        'Cantidad de personas',
        'Invitado (link)',
        'Mensaje'
      ]);
      
      // Estilizar encabezados
      const headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setBackground('#7a8c5e');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Agregar la fila con los datos
    sheet.appendRow([
      data.fecha      || new Date().toLocaleString('es-AR'),
      data.nombre     || '',
      data.apellido   || '',
      data.asistencia || '',
      data.personas   || '-',
      data.invitado   || '-',
      data.mensaje    || '',
    ]);
    
    // Ajustar ancho de columnas automáticamente
    sheet.autoResizeColumns(1, 7);
    
    // Respuesta exitosa con CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Confirmación registrada ✓' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log del error para debugging
    console.error('Error en doPost:', err.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
