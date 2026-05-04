const { MongoClient } = require('mongodb');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI env var not configured');

  const client = new MongoClient(uri);
  await client.connect();
  cachedDb = client.db('invitacion_naza_gaby');
  return cachedDb;
}

// ─── Initial seed data (runs once if collection is empty) ───
const INITIAL_GIFTS = [
  { emoji: '♨️', name: 'Microondas negro', desc: 'Para calentar nuestras comidas de todos los días con mucho estilo.', link: 'https://www.mercadolibre.com.ar/microondas-samsung-ms23k3513ak-negro-23l/p/MLA19148888#reviews' },
  { emoji: '🥣', name: 'Mixer negro', desc: 'Súper práctico para sopas, salsas y preparaciones rápidas.', link: 'https://www.mercadolibre.com.ar/mixer-ultracomb-lm-2555-minipimer-vaso-800ml-bowl-picador-color-negro/p/MLA29205496#reviews' },
  { emoji: '🍷', name: 'Vasos copones', desc: 'Para brindar y celebrar con familia y amigos.', link: 'https://www.mercadolibre.com.ar/set-x-6-vasos-vidrio-copon-pinot-vino-o-agua--hermosos-/up/MLAU208224547' },
  { emoji: '🛏️', name: 'Juego de sábanas', desc: 'Suavidad y confort color blanco para vestir nuestra cama.', link: 'https://www.mercadolibre.com.ar/juego-sabanas-2-plazas-600-hilos-extra-suave-premium-color-blanco-kl-portofino-knn-livet/p/MLA56463650' },
  { emoji: '🤎', name: 'Cubrecama edredón', desc: 'En tono marrón para darle calidez y textura a nuestro dormitorio.', link: '' },
  { emoji: '🪑', name: 'Mesita de luz', desc: 'El detalle perfecto en blanco y madera para el lado de la cama.', link: 'https://www.mercadolibre.com.ar/mesa-de-luz-flotante-murano-ricchezze-1-cajon-45x32-cm-blanco-pino/p/MLA40689991' },
  { emoji: '🛁', name: 'Set de toallas y toallones', desc: 'Para equipar nuestro baño con los colores que nos gustan.', link: '' },
  { emoji: '🍽️', name: 'Secaplatos negro', desc: 'Diseño moderno y mucha practicidad para la mesada.', link: 'https://www.mercadolibre.com.ar/secaplatos-escurridor-de-platos-para-mesada-con-cubiertero-escurridor-cubiertos-agarradera-de-madera-secaplatos-moderno-seca-platos-vajilla-con-bandeja-color-negro-levys-bazar/p/MLA47727165' },
  { emoji: '🧼', name: 'Set de baño', desc: 'Accesorios en negro y marrón que suman muchísimo estilo al baño.', link: 'https://articulo.mercadolibre.com.ar/MLA-1663075959-set-de-bano-city-blanco-bambu-6-piezas-rayado-_JM' },
  { emoji: '🗑️', name: 'Set de tachos de metal', desc: 'Combos a pedal para mantener el orden y la limpieza a raya.', link: 'https://www.mercadolibre.com.ar/tacho-de-basura-acero-cesto-pack-x2-unideades-7-litro-sufin/up/MLAU3218434588' },
  { emoji: '🍳', name: 'Batería de cocina', desc: 'Set completo de 12 piezas en gris oscuro para inspirarnos cocinando juntos.', link: 'https://www.mercadolibre.com.ar/bateria-cocina-tramontina-linz-de-aluminio-x7-piezas-gris/up/MLAU3238213004' },
  { emoji: '🥄', name: 'Utensilios de silicona', desc: 'Herramientas ideales para cocinar sin rayar nuestras ollas nuevas.', link: 'https://www.mercadolibre.com.ar/set-x12-kit-utensilios-de-cocina-mango-madera-punta-silicona/up/MLAU3121899412' },
  { emoji: '🔪', name: 'Set de cuchillos', desc: 'Cuatro cuchillos de acero inoxidable para cortar y preparar como verdaderos profesionales.', link: 'https://www.mercadolibre.com.ar/hudson-basic-bsset04-4-cuchillos-acero-inoxidable-con-taco-soporte-color-negro/p/MLA35275468' },
  { emoji: '🫙', name: 'Set de frascos herméticos', desc: 'Para organizar la alacena y que quede tan linda como funcional.', link: 'https://www.mercadolibre.com.ar/set-de-7-contenedores-para-cocina-gadnic-tapa-hermetica-libre-bpa/p/MLA38523425' },
  { emoji: '👕', name: 'Tender plegable', desc: 'El clásico vertical con rueditas, infaltable para el día a día.', link: 'https://www.mercadolibre.com.ar/tender-de-ropa-vertical-3-niveles-plegable-con-ruedas/up/MLAU3867080267' },
  { emoji: '🔊', name: 'Barra de sonido', desc: 'Para que el living suene como un verdadero cine en casa.', link: 'https://www.mercadolibre.com.ar/barra-de-sonido-gadnic-bs1000-2en1-aux-bt-optical-80w-multi-conexion-aux-microsd-led-display/p/MLA16639317' },
  { emoji: '❄️', name: 'Aire acondicionado', desc: 'Portátil frío/calor, para estar cómodos en cualquier estación del año.', link: 'https://www.mercadolibre.com.ar/aire-acondicionado-split-philco-inverter-3750w-frio-calor-a-phin37ha2an/p/MLA63226247' },
  { emoji: '🪞', name: 'Espejo redondo con luz LED', desc: 'Espejo decorativo con luz, ideal para darle amplitud y onda a nuestras paredes.', link: 'https://articulo.mercadolibre.com.ar/MLA-1150525163-espejo-led-pared-apto-bano-decorativo-redondo-moderno-80-cm-_JM' },
  { emoji: '🧺', name: 'Cesto de mimbre', desc: 'Un canasto de bambú para mantener el diseño natural hasta en el lavadero.', link: 'https://www.mercadolibre.com.ar/cesto-plegable-bambu-marron-doble-con-tapa-60x40x63cm-divisiones/p/MLA47805980' },
  { emoji: '💨', name: 'Ventilador de piso turbo', desc: 'Potente y silencioso, el salvavidas absoluto para los días de verano.', link: 'https://www.mercadolibre.com.ar/ventilador-de-piso-5-aspas-magiclick-turbo-chico-14-estructura-color-negro-3-velocidades/p/MLA60359524' },
  { emoji: '🌈', name: 'Luz LED inteligente', desc: 'Barra magnética para darle distintas atmósferas y colores a nuestro setup.', link: 'https://www.mercadolibre.com.ar/barra-luz-led-30-cm-usb-aluminio-recargable-con-sensor-de-movimiento-bajo-alacena-cocina-veoquiero/p/MLA46037227' },
  { emoji: '🍲', name: 'Fuente de vidrio', desc: 'Set de asaderas de vidrio templado, perfectas para las comidas al horno.', link: 'https://www.mercadolibre.com.ar/set-juego-3-fuentes-asaderas-marinex-vidrio-rectangulares/up/MLAU363745996' },
  { emoji: '🍴', name: 'Set de cubiertos', desc: 'Box de 24 cubiertos Volf Focus para vestir nuestra mesa con estilo.', link: 'https://www.gamingcity.com.ar/bazar-box-24-cubiertos-volf-focus--det--16134' },
];

async function seedIfEmpty(db) {
  const col = db.collection('gifts');
  const count = await col.countDocuments();
  if (count === 0) {
    await col.insertMany(INITIAL_GIFTS.map(g => ({ ...g, gifted: false })));
  }
}

module.exports = { connectToDatabase, seedIfEmpty };
