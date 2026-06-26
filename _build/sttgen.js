/* St Tropez ES — static site generator (brand-aligned) */
const fs = require("fs");
const path = require("path");
const { PRODUCTS, CATS, RATE } = require("./sttdata.js");

const SITE = "https://sttropeztan.es";
const BRAND = "St.Tropez";
const OUT = process.env.OUT || "./site";
const CABELLO = "https://cabellototal.es";
const EBAY = "https://www.ebay.es/sch/i.html";

// Brand assets — served locally from /assets (downloaded from official source)
const A = {
  logo: "assets/logo.png",
  hero: "assets/format-self.jpg",
  fmtSelf: "assets/format-self.jpg",
  fmtGradual: "assets/format-gradual.jpg",
  fmtInstant: "assets/format-instant.jpg",
  featBrush: "assets/feature-brush.jpg",
  featMitt: "assets/feature-mitt.jpg"
};
const BESTSELLERS = ["espuma-classic-240ml","espuma-express-200ml","espuma-dark-200ml","bruma-express-mist-200ml","bruma-purity-face-80ml","mitt-dual-luxe","gradual-classic-md","face-brush"];

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, "producto"), { recursive: true });

// ---- Interface translations (chrome only; product copy stays Spanish) ----
const I18N = {
  es: {
    topbar: "Distribuidor autorizado en España y Portugal · Compra en cabellototal.es y eBay España",
    ver_productos: "Ver productos", ver_producto: "Ver producto",
    hero_eyebrow: "30 años de resplandor de la Riviera",
    hero_h: "El autobronceador<br/>nº1 y de mayor confianza",
    hero_p: "Nuestra misión es que todo el mundo luzca su glow con confianza. Ya busques un dorado natural o un bronceado intenso, con St.Tropez tú marcas el tono — siempre. La gama completa, ahora en España y Portugal.",
    hero_cta2: "Comprar por formato",
    fmt_eyebrow: "Comprar por formato", fmt_h: "Encuentra tu bronceado",
    fmt_p: "Desde el autobronceado clásico hasta el gradual y el bronceado instantáneo.",
    fmt_self_s: "Autobronceado", fmt_grad_s: "Día a día", fmt_inst_s: "Al instante",
    best_eyebrow: "Lo más vendido", best_h: "Bestsellers",
    all_products: "Todos los productos", products_word: "productos", chip_all: "Todos",
    feat_eyebrow: "Aplicación perfecta", feat_h: "El secreto está en el guante",
    feat_p: "El guante aplicador Luxe de doble cara distribuye y difumina el autobronceador para un acabado uniforme de la cabeza a los pies, sin estrías y con las manos limpias.",
    feat_cta: "Ver el guante",
    feat2_eyebrow: "Precisión facial", feat2_h: "La brocha facial definitiva", feat2_p: "Cerdas suaves y curvadas que aplican el autobronceador siguiendo el contorno natural del rostro para un glow definido y sin manchas.", feat2_cta: "Ver la brocha",
    story_h: "El bronceado que lo empezó todo",
    story_p: "Como marca de autobronceado nº1 y de mayor confianza, creemos que cómo te hace sentir tu bronceado es tan importante como cómo te hace lucir. Resultados impecables, de aspecto natural, para cada tono de piel.",
    foot_shop: "Comprar", foot_formats: "Formatos",
    foot_about: "Tienda de la gama St.Tropez para España y Portugal, operada por Cabello Total como distribuidor autorizado.",
    foot_legal_h: "Legal", l_terms: "Términos y condiciones", l_privacy: "Política de privacidad", l_accessibility: "Accesibilidad",
    cookie_text: "Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes aceptarlas o rechazarlas.", cookie_accept: "Aceptar", cookie_decline: "Rechazar", cookie_more: "Más información",
    foot_disclaimer: "St.Tropez® y los nombres de producto son marcas registradas de PZ Cussons. © PZ Cussons. Todos los derechos reservados. Sitio operado de forma independiente por Cabello Total como distribuidor autorizado en España y Portugal; no es el sitio oficial de la marca. Imágenes y contenidos de producto mostrados con fines informativos. Precios en euros orientativos (convertidos de PVP de Reino Unido) — sujetos a confirmación en el punto de venta.",
    crumb_home: "Inicio",
    pdp_benefits: "Beneficios", pdp_howto: "Cómo aplicar", pdp_details: "Detalles del producto",
    pdp_buy: "Comprar", pdp_related: "Productos relacionados",
    d_brand: "Marca", d_format: "Formato", d_category: "Categoría", d_market: "Mercado", d_price: "Precio (EUR)",
    market_val: "España y Portugal",
    prov: "PVP orientativo · IVA incl. · convertido de RU",
    vegan: "✓ Vegano · No testado en animales · Envío a España y Portugal",
    buy_note: "Precio orientativo en euros, convertido del PVP de Reino Unido. Sujeto a confirmación en el punto de venta.",
    "cat.espumas":"Espumas autobronceadoras","cat.sprays":"Brumas y sprays","cat.gradual":"Autobronceador gradual","cat.instantaneo":"Bronceador instantáneo","cat.cuidado":"Preparación y cuidado","cat.accesorios":"Accesorios","cat.kits":"Kits y packs","cat.profesional":"Profesional / Cabina",
    "nav.espumas":"Espumas","nav.sprays":"Sprays","nav.gradual":"Gradual","nav.instantaneo":"Instantáneo","nav.cuidado":"Cuidado","nav.accesorios":"Accesorios","nav.kits":"Kits","nav.profesional":"Profesional"
  },
  pt: {
    topbar: "Distribuidor autorizado em Espanha e Portugal · Compra em cabellototal.es e eBay Espanha",
    ver_productos: "Ver produtos", ver_producto: "Ver produto",
    hero_eyebrow: "30 anos de resplendor da Riviera",
    hero_h: "O autobronzeador<br/>nº1 e de maior confiança",
    hero_p: "A nossa missão é que toda a gente tenha o seu glow com confiança. Procures um dourado natural ou um bronzeado intenso, com St.Tropez és tu que marcas o tom — sempre. A gama completa, agora em Espanha e Portugal.",
    hero_cta2: "Comprar por formato",
    fmt_eyebrow: "Comprar por formato", fmt_h: "Encontra o teu bronzeado",
    fmt_p: "Do autobronzeado clássico ao gradual e ao bronzeado instantâneo.",
    fmt_self_s: "Autobronzeado", fmt_grad_s: "Dia a dia", fmt_inst_s: "Ao instante",
    best_eyebrow: "Mais vendidos", best_h: "Bestsellers",
    all_products: "Todos os produtos", products_word: "produtos", chip_all: "Todos",
    feat_eyebrow: "Aplicação perfeita", feat_h: "O segredo está na luva",
    feat_p: "A luva aplicadora Luxe de dupla face distribui e esfuma o autobronzeador para um acabamento uniforme da cabeça aos pés, sem estrias e com as mãos limpas.",
    feat_cta: "Ver a luva",
    feat2_eyebrow: "Precisão facial", feat2_h: "A escova facial definitiva", feat2_p: "Cerdas suaves e curvas que aplicam o autobronzeador seguindo o contorno natural do rosto para um glow definido e sem manchas.", feat2_cta: "Ver a escova",
    story_h: "O bronzeado que começou tudo",
    story_p: "Como marca de autobronzeado nº1 e de maior confiança, acreditamos que como o teu bronzeado te faz sentir é tão importante como o aspeto que te dá. Resultados impecáveis, de aspeto natural, para cada tom de pele.",
    foot_shop: "Comprar", foot_formats: "Formatos",
    foot_about: "Loja da gama St.Tropez para Espanha e Portugal, operada pela Cabello Total como distribuidor autorizado.",
    foot_legal_h: "Legal", l_terms: "Termos e condições", l_privacy: "Política de privacidade", l_accessibility: "Acessibilidade",
    cookie_text: "Usamos cookies para melhorar a tua experiência e analisar o tráfego. Podes aceitá-las ou recusá-las.", cookie_accept: "Aceitar", cookie_decline: "Recusar", cookie_more: "Mais informação",
    foot_disclaimer: "St.Tropez® e os nomes de produto são marcas registadas da PZ Cussons. © PZ Cussons. Todos os direitos reservados. Site operado de forma independente pela Cabello Total como distribuidor autorizado em Espanha e Portugal; não é o site oficial da marca. Imagens e conteúdos de produto apresentados para fins informativos. Preços em euros indicativos (convertidos do PVP do Reino Unido) — sujeitos a confirmação no ponto de venda.",
    crumb_home: "Início",
    pdp_benefits: "Benefícios", pdp_howto: "Como aplicar", pdp_details: "Detalhes do produto",
    pdp_buy: "Comprar", pdp_related: "Produtos relacionados",
    d_brand: "Marca", d_format: "Formato", d_category: "Categoria", d_market: "Mercado", d_price: "Preço (EUR)",
    market_val: "Espanha e Portugal",
    prov: "PVP indicativo · IVA incl. · convertido do RU",
    vegan: "✓ Vegano · Não testado em animais · Envio para Espanha e Portugal",
    buy_note: "Preço indicativo em euros, convertido do PVP do Reino Unido. Sujeito a confirmação no ponto de venda.",
    "cat.espumas":"Espumas autobronzeadoras","cat.sprays":"Brumas e sprays","cat.gradual":"Autobronzeador gradual","cat.instantaneo":"Bronzeador instantâneo","cat.cuidado":"Preparação e cuidado","cat.accesorios":"Acessórios","cat.kits":"Kits e packs","cat.profesional":"Profissional / Cabine",
    "nav.espumas":"Espumas","nav.sprays":"Sprays","nav.gradual":"Gradual","nav.instantaneo":"Instantâneo","nav.cuidado":"Cuidado","nav.accesorios":"Acessórios","nav.kits":"Kits","nav.profesional":"Profissional"
  },
  en: {
    topbar: "Authorised distributor in Spain & Portugal · Buy at cabellototal.es and eBay Spain",
    ver_productos: "View products", ver_producto: "View product",
    hero_eyebrow: "30 years of Riviera radiance",
    hero_h: "The No.1 and<br/>most trusted self tan",
    hero_p: "Our mission is to get everyone glowing with confidence. Whether you want a natural golden glow or a deep bronze, with St.Tropez you set the tone — always. The full range, now in Spain and Portugal.",
    hero_cta2: "Shop by format",
    fmt_eyebrow: "Shop by format", fmt_h: "Find your tan",
    fmt_p: "From classic self tan to gradual tan and instant bronzer.",
    fmt_self_s: "Self tan", fmt_grad_s: "Everyday", fmt_inst_s: "Instant",
    best_eyebrow: "Best-selling", best_h: "Bestsellers",
    all_products: "All products", products_word: "products", chip_all: "All",
    feat_eyebrow: "Flawless application", feat_h: "The secret is in the mitt",
    feat_p: "The dual-sided Luxe applicator mitt distributes and blends your tan for an even, streak-free finish from head to toe — with clean hands.",
    feat_cta: "View the mitt",
    feat2_eyebrow: "Facial precision", feat2_h: "The ultimate face brush", feat2_p: "Soft, curved bristles glide self-tan across the natural contours of the face for a defined, streak-free glow.", feat2_cta: "View the brush",
    story_h: "The tan that started it all",
    story_p: "As the No.1 and most trusted self-tan brand, we believe how your tan makes you feel matters as much as how it looks. Flawless, natural-looking results for every skin tone.",
    foot_shop: "Shop", foot_formats: "Formats",
    foot_about: "St.Tropez range store for Spain and Portugal, operated by Cabello Total as an authorised distributor.",
    foot_legal_h: "Legal", l_terms: "Terms & conditions", l_privacy: "Privacy policy", l_accessibility: "Accessibility",
    cookie_text: "We use cookies to improve your experience and analyse traffic. You can accept or decline.", cookie_accept: "Accept", cookie_decline: "Decline", cookie_more: "Learn more",
    foot_disclaimer: "St.Tropez® and product names are registered trademarks of PZ Cussons. © PZ Cussons. All Rights Reserved. Site operated independently by Cabello Total as an authorised distributor in Spain and Portugal; it is not the brand's official site. Product images and content shown for informational purposes. Indicative euro prices (converted from UK RRP) — subject to confirmation at the point of sale.",
    crumb_home: "Home",
    pdp_benefits: "Benefits", pdp_howto: "How to apply", pdp_details: "Product details",
    pdp_buy: "Buy", pdp_related: "Related products",
    d_brand: "Brand", d_format: "Size", d_category: "Category", d_market: "Market", d_price: "Price (EUR)",
    market_val: "Spain & Portugal",
    prov: "Guide price · VAT incl. · converted from UK",
    vegan: "✓ Vegan · Not tested on animals · Delivery to Spain & Portugal",
    buy_note: "Guide price in euros, converted from the UK RRP. Subject to confirmation at the point of sale.",
    "cat.espumas":"Self-tan mousses","cat.sprays":"Mists & sprays","cat.gradual":"Gradual tan","cat.instantaneo":"Instant bronzer","cat.cuidado":"Prep & care","cat.accesorios":"Accessories","cat.kits":"Kits & sets","cat.profesional":"Professional",
    "nav.espumas":"Mousses","nav.sprays":"Sprays","nav.gradual":"Gradual","nav.instantaneo":"Instant","nav.cuidado":"Care","nav.accesorios":"Accessories","nav.kits":"Kits","nav.profesional":"Pro"
  }
};

const eur = (gbp) => (gbp * RATE);
const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";
const q = (s) => encodeURIComponent("St Tropez " + s);
const cabelloLink = (en) => `${CABELLO}/?s=${q(en)}&post_type=product`;
const ebayLink = (en) => `${EBAY}?_nkw=${q(en)}`;
const catOf = (id) => CATS.find((c) => c.id === id) || { es: "", term: "" };
const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const P = (slug) => PRODUCTS.find((x) => x.slug === slug);
const imgExt = (p) => ((p.img.match(/\.(jpe?g|png)/i) || [, "jpg"])[1]).toLowerCase();
const localImg = (p, depth) => `${depth ? "../" : ""}assets/productos/${p.slug}.${imgExt(p)}`;
const absImg = (p) => `${SITE}/assets/productos/${p.slug}.${imgExt(p)}`;

// Real review ratings scraped from sttropeztan.com/uk (Bazaarvoice). [rating, reviewCount].
// Products with no reviews are omitted (no rating shown, no schema aggregateRating).
const RATINGS = {
  "espuma-classic-240ml": [4.6, 127], "espuma-classic-120ml": [4.4, 33],
  "espuma-express-200ml": [4.6, 691], "espuma-express-100ml": [4.6, 525],
  "espuma-dark-200ml": [3.9, 57], "espuma-purity-200ml": [4.4, 186],
  "gel-purity-200ml": [4.0, 152], "espuma-berry-sorbet-200ml": [4.7, 163],
  "espuma-luxe-creme-200ml": [4.7, 499],
  "bruma-express-mist-200ml": [4.4, 64], "bruma-purity-face-80ml": [4.5, 883],
  "gradual-classic-lm": [4.0, 73], "gradual-classic-md": [4.2, 836],
  "gradual-tinted": [2.7, 106], "gradual-watermelon": [4.3, 768],
  "instant-glow-body-bronzer-light": [4.3, 14], "instant-glow-body-bronzer-medium": [4.5, 238],
  "sunlit-skin-tint-tan-30ml": [5.0, 1],
  "luxe-body-serum-200ml": [4.0, 221], "luxe-tonic-glow-drops-30ml": [4.5, 667],
  "tan-optimiser-200ml": [5.0, 2], "body-polish-200ml": [5.0, 8], "tan-remover-mousse-200ml": [3.5, 71],
  "mitt-dual-luxe": [4.7, 502], "mitt-tan-remover": [4.7, 46],
  "kit-award-winning": [4.5, 2], "kit-express-starter": [4.6, 22],
  "kit-self-tan-classic": [5.0, 1], "kit-purity-mini": [4.6, 43]
};
function starsHTML(slug) {
  const r = RATINGS[slug];
  if (!r) return "";
  const full = Math.round(r[0]);
  let s = "";
  for (let i = 1; i <= 5; i++) s += (i <= full ? "★" : "☆");
  return `<span class="rating"><span class="stars" aria-hidden="true">${s}</span><span class="rval">${r[0].toFixed(1)}</span><span class="rcnt">(${r[1]})</span></span>`;
}

/* ----- derive full-page content from category + name ----- */
function benefitsOf(p) {
  const n = (p.en + " " + p.es).toLowerCase();
  const b = [];
  if (p.cat === "espumas" || p.cat === "sprays") {
    if (/express|exprés/.test(n)) b.push("Listo en 1 hora — tú eliges la intensidad");
    if (/dark|oscur/.test(n)) b.push("Bronceado intenso, profundo y natural");
    if (/violet/.test(n)) b.push("Base violeta que neutraliza los tonos anaranjados");
    if (/purity/.test(n)) b.push("Sin aclarado, sin transferencia y sin olor a autobronceador");
    if (p.cat === "sprays") b.push("Aplicación 360º, ideal para zonas difíciles");
    if (!/purity/.test(n)) b.push("Color guía para una aplicación sin zonas olvidadas");
    b.push("Acabado uniforme y de larga duración");
  } else if (p.cat === "gradual") {
    b.push("Bronceado progresivo y fácil de controlar");
    b.push("Hidratación diaria con activos reafirmantes");
    if (/tinted|color/.test(n)) b.push("Toque de color inmediato al aplicar");
  } else if (p.cat === "instantaneo") {
    b.push("Color inmediato de acabado natural");
    b.push("Resistente al agua y a las manchas; dura todo el día");
    b.push("Se retira fácilmente con agua y jabón");
  } else if (p.cat === "accesorios") {
    if (/mitt|guante/.test(n)) { b.push("Acabado sin estrías"); b.push("Manos limpias, sin manchas"); }
    if (/brush|brocha/.test(n)) b.push("Aplicación de precisión para el rostro");
    if (/remover|elimin/.test(n)) b.push("Elimina los restos de autobronceador y piel seca");
  } else if (p.cat === "cuidado") {
    if (/optimi|prolong/.test(n)) b.push("Prolonga la duración del bronceado");
    if (/polish|exfoli/.test(n)) b.push("Prepara la piel para un acabado impecable");
    if (/remover|elimin/.test(n)) b.push("Elimina el autobronceador de forma rápida");
    if (/serum|sérum|drops|gotas/.test(n)) b.push("Potencia el glow y cuida la piel");
    b.push("Imprescindible en tu rutina de bronceado");
  } else if (p.cat === "profesional") {
    b.push("Formato 1 L para uso en cabina");
    b.push("Ideal para aplicación con pistola/aerógrafo");
    b.push("Resultado uniforme de nivel profesional");
  } else if (p.cat === "kits") {
    b.push("Todo lo que necesitas en un solo set");
    b.push("Perfecto para descubrir la gama o regalar");
  }
  b.push("Vegano y no testado en animales");
  return [...new Set(b)].slice(0, 5);
}
function howtoOf(p) {
  if (p.cat === "espumas") return [
    "Exfolia e hidrata las zonas secas (manos, pies, codos y rodillas).",
    "Aplica de forma uniforme con el guante aplicador St.Tropez.",
    "Deja actuar según la intensidad deseada y dúchate con agua.",
    "El bronceado seguirá desarrollándose durante 4-8 horas."
  ];
  if (p.cat === "sprays") return [
    "Sobre piel limpia y seca, pulveriza a unos 15 cm de distancia.",
    "Difumina con el guante aplicador para un acabado uniforme.",
    "Deja actuar y aclara según el tiempo de pose indicado.",
    "Evita el contacto con la ropa hasta que seque."
  ];
  if (p.cat === "gradual") return [
    "Aplica a diario sobre la piel limpia, como tu hidratante habitual.",
    "Extiende de forma uniforme y lávate las manos después.",
    "Repite cada día hasta alcanzar la intensidad deseada."
  ];
  if (p.cat === "instantaneo") return [
    "Aplica sobre la piel seca y difumina de forma uniforme.",
    "Deja secar unos minutos antes de vestirte.",
    "Retira al final del día con agua y jabón."
  ];
  if (p.cat === "profesional") return [
    "Para uso profesional en cabina con pistola/aerógrafo.",
    "Prepara la piel del cliente exfoliando e hidratando las zonas secas.",
    "Aplica de forma uniforme y deja desarrollar según la fórmula."
  ];
  if (p.cat === "accesorios") return [
    "Úsalo junto con tu autobronceador St.Tropez favorito.",
    "Limpia y deja secar después de cada uso."
  ];
  return [
    "Sigue las indicaciones del producto para un resultado óptimo.",
    "Combina con la rutina de bronceado St.Tropez."
  ];
}

const CSS = `
:root{--ink:#1a1a1a;--muted:#6b6b70;--line:#e7e2da;--bg:#fff;--soft:#f6f1ea;--sand:#efe7db;--sun:#b9742e;--gold:#c69a5b}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:var(--ink);background:var(--bg);line-height:1.55;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}a{color:inherit;text-decoration:none}
.wrap{max-width:1200px;margin:0 auto;padding:0 22px}
.serif{font-family:'Cormorant Garamond',Georgia,serif}
.eyebrow{letter-spacing:.3em;text-transform:uppercase;font-size:11px;color:var(--sun);font-weight:600}
.btn{display:inline-block;background:#1a1a1a;color:#fff;padding:14px 26px;border-radius:2px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;transition:opacity .2s}
.btn:hover{opacity:.85}.btn.light{background:#fff;color:#1a1a1a;border:1px solid #1a1a1a}
/* header */
header.site{position:relative;z-index:40}
.topbar{background:#1a1a1a;color:#fff;text-align:center;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:7px}
.navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;height:70px;gap:20px}
.nav .logo{flex:0 0 auto}
.nav .logo img{height:26px;width:auto;filter:brightness(0)}
.navlinks{display:flex;gap:20px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;flex:1 1 auto;justify-content:center;flex-wrap:nowrap;overflow:hidden}
.navlinks a{color:#3a3a3a;white-space:nowrap}.navlinks a:hover{color:var(--sun)}
@media(max-width:1080px){.navlinks{display:none}}
.langsel{display:flex;gap:1px}
.langsel button{border:0;background:none;font-size:12px;letter-spacing:.05em;color:var(--muted);cursor:pointer;padding:4px 5px;font-family:inherit}
.langsel button.on{color:var(--ink);font-weight:700;text-decoration:underline}
@media(max-width:700px){.nav{gap:10px;height:58px}.nav .logo img{height:22px}.nav .btn{display:none}.topbar{font-size:10px;letter-spacing:.05em;padding:6px 12px}.catbar{top:58px}#catalogo{scroll-margin-top:118px}}
/* hero */
.hero{display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:86vh;min-height:580px;max-height:860px;padding:10px;background:#fff}
.hero a{position:relative;overflow:hidden;border-radius:6px;display:block}
.hero a img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.hero a:hover img{transform:scale(1.045)}
.hero a::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.04) 30%,rgba(0,0,0,.5))}
.hero .h-main{grid-row:1 / span 2}
.hero .h-main img{object-position:64% center}
.hero .h-ov{position:absolute;left:0;bottom:0;z-index:2;color:#fff;padding:42px;max-width:560px}
.hero .h-ov .eyebrow{color:#f1dbba}
.hero .h-ov h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:clamp(34px,4.4vw,62px);line-height:1.0;color:#fff;margin:12px 0 14px;text-shadow:0 2px 20px rgba(0,0,0,.28)}
.hero .h-ov p{color:rgba(255,255,255,.94);font-size:15.5px;max-width:430px;margin-bottom:20px}
.hero .h-cta{display:inline-block;background:#fff;color:#1a1a1a;padding:13px 26px;border-radius:2px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
.hero .h-lbl{position:absolute;left:0;bottom:0;z-index:2;color:#fff;padding:24px}
.hero .h-lbl span{font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.92}
.hero .h-lbl h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:27px;font-weight:600;margin-top:2px}
.hero .h-lbl .arrow{font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin-top:6px;display:inline-block;border-bottom:1px solid rgba(255,255,255,.7);padding-bottom:2px}
@media(max-width:760px){.hero{grid-template-columns:1fr;grid-template-rows:auto;height:auto;max-height:none}.hero .h-main{grid-row:auto;aspect-ratio:4/5}.hero .h-side{aspect-ratio:16/10}.hero .h-ov{padding:28px}}
/* section */
.section{padding:62px 0}
.shead{text-align:center;margin-bottom:34px}
.shead h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:clamp(26px,3.4vw,40px);margin-top:8px}
.shead p{color:var(--muted);max-width:560px;margin:8px auto 0}
/* format tiles */
.formats{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.fmt{position:relative;border-radius:6px;overflow:hidden;aspect-ratio:3/4;display:block}
.fmt img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.fmt:hover img{transform:scale(1.05)}
.fmt .lbl{position:absolute;left:0;right:0;bottom:0;padding:18px;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff}
.fmt .lbl h3{font-size:18px;font-weight:600}.fmt .lbl span{font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.85}
@media(max-width:680px){.formats{grid-template-columns:1fr}.fmt{aspect-ratio:16/10}}
/* catbar + grid */
.catbar{position:sticky;top:70px;z-index:30;background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.catbar .row{display:flex;gap:8px;overflow-x:auto;padding:13px 0;scrollbar-width:none}
.catbar .row::-webkit-scrollbar{display:none}
#catalogo{scroll-margin-top:128px}
.chip{white-space:nowrap;border:1px solid var(--line);border-radius:22px;padding:8px 16px;font-size:13px;color:var(--muted);cursor:pointer;background:#fff}
.chip:hover{border-color:var(--ink);color:var(--ink)}.chip.on{background:#1a1a1a;color:#fff;border-color:#1a1a1a}
.sect{display:flex;align-items:baseline;justify-content:space-between;margin:34px 0 18px}
.sect h2{font-size:23px;font-weight:700}.sect .count{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;padding-bottom:34px}
@media(max-width:980px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:680px){.grid{grid-template-columns:repeat(2,1fr);gap:14px}}
.card{border:1px solid var(--line);border-radius:8px;overflow:hidden;background:#fff;display:flex;flex-direction:column;transition:box-shadow .2s,transform .2s}
.card:hover{box-shadow:0 14px 36px rgba(0,0,0,.08);transform:translateY(-3px)}
.card .imgw{background:var(--soft);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;padding:16px}
.card .imgw img{max-height:100%;object-fit:contain;mix-blend-mode:multiply}
.card .b{padding:14px 15px 17px;display:flex;flex-direction:column;flex:1}
.card .ct{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.card h3{font-size:14px;font-weight:600;line-height:1.3;margin-bottom:8px}
.card .pr{margin-top:auto;font-size:16px;font-weight:700}.card .pr small{font-weight:400;font-size:11px;color:var(--muted)}
.rating{display:inline-flex;align-items:center;gap:5px;font-size:12px;line-height:1}
.rating .stars{color:#e0a45e;letter-spacing:1px;font-size:12px}
.rating .rval{font-weight:600}.rating .rcnt{color:var(--muted)}
.card .rating{margin-bottom:9px}
.pdp .rating{font-size:14px;margin-bottom:14px}.pdp .rating .stars{font-size:15px}
.card .go{margin-top:12px;text-align:center;border:1px solid #1a1a1a;border-radius:3px;padding:9px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600}
.card:hover .go{background:#1a1a1a;color:#fff}
/* feature */
.feature{display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:8px;overflow:hidden;border:1px solid var(--line)}
.feature .ph{aspect-ratio:1/1;background:var(--soft)}.feature .ph img{width:100%;height:100%;object-fit:cover}
.feature .tx{padding:40px;display:flex;flex-direction:column;justify-content:center}
.feature .tx h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:600;margin-bottom:10px}
.feature .tx p{color:var(--muted);margin-bottom:18px}
.feature.rev .ph{order:2}
@media(max-width:760px){.feature,.feature.rev{grid-template-columns:1fr}.feature.rev .ph{order:0}}
/* brand strip */
.story{background:#1a1a1a;color:#efe9df;text-align:center;padding:64px 22px}
.story h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(26px,3.4vw,40px);font-weight:600;color:#fff;margin-bottom:14px}
.story p{max-width:680px;margin:0 auto;color:#c7c2b8;font-size:16px}
/* PDP */
.crumb{font-size:12px;color:var(--muted);padding:18px 0}.crumb a:hover{color:var(--ink)}
.pdp{display:grid;grid-template-columns:1fr 1fr;gap:46px;padding:6px 0 40px}
@media(max-width:820px){.pdp{grid-template-columns:1fr;gap:26px}}
.pdp .gal{background:var(--soft);border-radius:10px;display:flex;align-items:center;justify-content:center;padding:36px;min-height:420px}
.pdp .gal img{max-height:480px;object-fit:contain;mix-blend-mode:multiply}
.pdp .cat{color:var(--sun);font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600}
.pdp h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(26px,3.4vw,38px);font-weight:600;margin:8px 0 6px;line-height:1.08}
.pdp .vol{color:var(--muted);font-size:14px;margin-bottom:16px}
.pdp .price{font-size:28px;font-weight:700}
.pdp .price .prov{display:block;font-size:11px;font-weight:400;color:var(--muted);margin-top:3px}
.pdp .lead{margin:18px 0;color:#45433f;font-size:15.5px}
.buys{display:flex;flex-direction:column;gap:10px;margin:20px 0}
.buy{display:block;text-align:center;padding:15px;border-radius:4px;font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;transition:opacity .2s}
.buy:hover{opacity:.85}.buy.primary{background:#1a1a1a;color:#fff}.buy.ebay{background:#fff;color:#1a1a1a;border:1px solid #1a1a1a}
.vegan{font-size:12px;color:var(--muted);margin-top:6px}
.pinfo{border-top:1px solid var(--line);padding:34px 0;display:grid;grid-template-columns:1fr 1fr;gap:34px}
@media(max-width:760px){.pinfo{grid-template-columns:1fr;gap:22px}}
.pinfo h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:600;margin-bottom:12px}
.blist{list-style:none}.blist li{padding:8px 0 8px 26px;position:relative;border-bottom:1px solid var(--line);font-size:14.5px}
.blist li::before{content:"✓";position:absolute;left:0;color:var(--sun);font-weight:700}
.steps{list-style:none;counter-reset:s}.steps li{counter-increment:s;padding:10px 0 10px 40px;position:relative;font-size:14.5px;border-bottom:1px solid var(--line)}
.steps li::before{content:counter(s);position:absolute;left:0;top:8px;width:26px;height:26px;border-radius:50%;background:var(--soft);color:var(--sun);font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center}
.details{font-size:14px;color:#45433f}.details div{padding:7px 0;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:16px}
.details b{color:var(--ink);font-weight:600}
.kw{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}
.kw span{background:var(--soft);border:1px solid var(--line);border-radius:16px;padding:5px 11px;font-size:11px;color:var(--muted)}
.related{padding:16px 0 56px;border-top:1px solid var(--line)}.related h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:600;margin:28px 0 18px}
/* footer */
footer.site{background:#111;color:#b9b9bd;padding:48px 22px 30px;margin-top:10px}
.fcols{display:flex;justify-content:space-between;gap:34px;flex-wrap:wrap;max-width:1200px;margin:0 auto}
.fcols img.flogo{height:26px;filter:brightness(0) invert(1);margin-bottom:12px}
.fcols h4{color:#fff;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px}
.fcols a,.fcols p{display:block;font-size:13px;color:#9a9a9f;margin-bottom:7px}.fcols a:hover{color:#fff}
.fbot{max-width:1200px;margin:28px auto 0;border-top:1px solid #2a2a2a;padding-top:18px;font-size:11px;color:#76767b;line-height:1.6}
/* legal pages */
.legal{max-width:820px;margin:0 auto;padding:48px 22px 72px}
.legal h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(30px,4vw,46px);font-weight:600;margin-bottom:6px}
.legal .upd{color:var(--muted);font-size:13px;margin-bottom:10px}
.legal .notice{background:var(--soft);border:1px solid var(--line);border-radius:6px;padding:14px 16px;font-size:13.5px;color:#5a564f;margin:14px 0 28px;line-height:1.6}
.legal h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:23px;font-weight:600;margin:30px 0 10px}
.legal p,.legal li{font-size:15px;color:#3f3d39;line-height:1.7;margin-bottom:10px}
.legal ul{padding-left:20px;margin-bottom:12px}
.legal a{text-decoration:underline}
/* cookie banner */
.cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:200;max-width:760px;margin:0 auto;background:#161616;color:#eee;border-radius:8px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:18px;box-shadow:0 14px 40px rgba(0,0,0,.32)}
.cookie[hidden]{display:none}
.cookie p{font-size:13px;color:#cfcfcf;line-height:1.5;margin:0}
.cookie a{color:#fff;text-decoration:underline;white-space:nowrap}
.cookie-btns{display:flex;gap:8px;flex-shrink:0}
.cookie-btns button{border-radius:3px;padding:10px 20px;font-size:12px;letter-spacing:.06em;font-weight:700;cursor:pointer;border:1px solid #555;background:transparent;color:#fff;font-family:inherit}
.cookie-btns .ck-accept{background:#fff;color:#161616;border-color:#fff}
.cookie-btns .ck-decline:hover{border-color:#fff}
@media(max-width:600px){.cookie{flex-direction:column;align-items:stretch;gap:12px}.cookie-btns button{flex:1}}
`;

const head = (title, desc, canon, keywords, jsonld, depth, ogImg) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<meta name="keywords" content="${esc(keywords)}"/>
<link rel="canonical" href="${canon}"/>
<link rel="alternate" hreflang="es-ES" href="${canon}"/>
<link rel="alternate" hreflang="pt-PT" href="${canon}"/>
<link rel="alternate" hreflang="x-default" href="${canon}"/>
<meta name="geo.region" content="ES"/>
<meta name="geo.region" content="PT"/>
<meta name="geo.placename" content="España, Portugal"/>
<meta property="og:type" content="${depth ? "product" : "website"}"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:url" content="${canon}"/>
<meta property="og:image" content="${ogImg || (SITE + "/" + A.logo)}"/>
<meta property="og:locale" content="es_ES"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="${depth ? "../" : ""}styles.css"/>
<script defer src="${depth ? "../" : ""}i18n.js"></script>
${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ""}
</head>`;

const header = (depth) => `<header class="site">
  <div class="topbar" data-i18n="topbar">Distribuidor autorizado en España y Portugal · Compra en cabellototal.es y eBay España</div>
  <div class="navbar"><div class="wrap nav">
    <a class="logo" href="${depth ? "../" : ""}index.html"><img src="${depth ? "../" : ""}${A.logo}" alt="St.Tropez" loading="eager"></a>
    <nav class="navlinks">${CATS.map((c) => `<a href="${depth ? "../" : ""}index.html#${c.id}" data-i18n="nav.${c.id}">${esc(I18N.es["nav."+c.id])}</a>`).join("")}</nav>
    <div style="display:flex;align-items:center;gap:14px">
      <div class="langsel">
        <button data-lang="es">ES</button><button data-lang="pt">PT</button><button data-lang="en">EN</button>
      </div>
      <a class="btn" href="${depth ? "../" : ""}index.html#catalogo" style="padding:10px 18px" data-i18n="ver_productos">Ver productos</a>
    </div>
  </div></div>
</header>`;

const footer = (depth) => `<footer class="site">
  <div class="fcols">
    <div>
      <img class="flogo" src="${depth ? "../" : ""}${A.logo}" alt="St.Tropez">
      <p style="max-width:300px" data-i18n="foot_about">Tienda de la gama St.Tropez para España y Portugal, operada por Cabello Total como distribuidor autorizado.</p>
    </div>
    <div><h4 data-i18n="foot_shop">Comprar</h4><a href="${CABELLO}" target="_blank" rel="noopener">cabellototal.es</a><a href="https://www.ebay.es" target="_blank" rel="noopener">eBay España</a></div>
    <div><h4 data-i18n="foot_formats">Formatos</h4>${CATS.slice(0,5).map((c)=>`<a href="${depth ? "../" : ""}index.html#${c.id}" data-i18n="cat.${c.id}">${esc(c.es)}</a>`).join("")}</div>
    <div><h4 data-i18n="foot_legal_h">Legal</h4>
      <a href="${depth ? "../" : ""}terminos.html" data-i18n="l_terms">Términos y condiciones</a>
      <a href="${depth ? "../" : ""}privacidad.html" data-i18n="l_privacy">Política de privacidad</a>
      <a href="${depth ? "../" : ""}accesibilidad.html" data-i18n="l_accessibility">Accesibilidad</a>
    </div>
  </div>
  <div class="fbot" data-i18n="foot_disclaimer">St.Tropez® y los nombres de producto son marcas registradas de PZ Cussons. © PZ Cussons. Todos los derechos reservados. Sitio operado de forma independiente por Cabello Total como distribuidor autorizado en España y Portugal; no es el sitio oficial de la marca. Imágenes y contenidos de producto mostrados con fines informativos. Precios en euros orientativos (convertidos de PVP de Reino Unido) — sujetos a confirmación en el punto de venta.</div>
</footer>
<div class="cookie" id="cookieBanner" hidden>
  <p><span data-i18n="cookie_text">Usamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes aceptarlas o rechazarlas.</span> <a href="${depth ? "../" : ""}privacidad.html" data-i18n="cookie_more">Más información</a></p>
  <div class="cookie-btns">
    <button type="button" class="ck-decline" data-i18n="cookie_decline">Rechazar</button>
    <button type="button" class="ck-accept" data-i18n="cookie_accept">Aceptar</button>
  </div>
</div>`;

const cardHTML = (p, depth) => {
  const c = catOf(p.cat);
  const base = depth ? "" : "producto/";
  return `<a class="card" data-cat="${p.cat}" href="${base}${p.slug}.html">
    <div class="imgw"><img loading="lazy" src="${localImg(p, depth)}" alt="${esc(p.es)} — ${esc(BRAND)}"></div>
    <div class="b"><div class="ct" data-i18n="cat.${p.cat}">${esc(c.es)}</div><h3>${esc(p.es)}</h3>
    ${starsHTML(p.slug)}
    <div class="pr">${fmt(eur(p.gbp))} <small>· ${esc(p.vol)}</small></div><div class="go" data-i18n="ver_producto">Ver producto</div></div></a>`;
};

/* ---------- INDEX ---------- */
function buildIndex() {
  const cards = PRODUCTS.map((p) => cardHTML(p, 0)).join("\n");
  const chips = `<button class="chip on" data-f="todos" data-i18n="chip_all">Todos</button>` +
    CATS.map((c) => `<button class="chip" data-f="${c.id}" data-i18n="cat.${c.id}">${esc(c.es)}</button>`).join("");
  const best = BESTSELLERS.map(P).filter(Boolean).map((p) => cardHTML(p, 0)).join("\n");

  const desc = "Compra la gama completa de autobronceadores St.Tropez en España: espumas, brumas en spray, autobronceador gradual, bronceador instantáneo, profesional de cabina y accesorios. Precios en euros y envío a España y Portugal.";
  const jsonld = JSON.stringify({"@context":"https://schema.org","@type":"Store","name":"St.Tropez España","url":SITE,"logo":SITE+"/"+A.logo,"description":desc,"areaServed":["ES","PT"]});

  const html = head("St.Tropez España | Autobronceadores nº1 — Espumas, Sprays y Gradual", desc, SITE + "/", "autobronceador, st tropez, espuma autobronceadora, autobronceador en spray, fake tan, bronceado sin sol, autobronceador gradual, bronceador instantáneo", jsonld, 0) + `
<body>
${header(0)}
<section class="hero" id="formatos">
  <a class="h-main" href="#espumas">
    <img src="${A.fmtSelf}" alt="Autobronceador St.Tropez — glow natural" fetchpriority="high">
    <div class="h-ov">
      <div class="eyebrow" data-i18n="hero_eyebrow">30 años de resplandor de la Riviera</div>
      <h1 data-i18n-html="hero_h">El autobronceador<br/>nº1 y de mayor confianza</h1>
      <p data-i18n="hero_p">Nuestra misión es que todo el mundo luzca su glow con confianza. Ya busques un dorado natural o un bronceado intenso, con St.Tropez tú marcas el tono — siempre. La gama completa, ahora en España y Portugal.</p>
      <span class="h-cta" data-i18n="ver_productos">Ver productos</span>
    </div>
  </a>
  <a class="h-side" href="#gradual">
    <img src="${A.fmtGradual}" alt="Autobronceador gradual St.Tropez">
    <div class="h-lbl"><span data-i18n="fmt_grad_s">Día a día</span><h3>Gradual Tan</h3><span class="arrow" data-i18n="ver_productos">Ver productos</span></div>
  </a>
  <a class="h-side" href="#instantaneo">
    <img src="${A.fmtInstant}" alt="Bronceador instantáneo St.Tropez">
    <div class="h-lbl"><span data-i18n="fmt_inst_s">Al instante</span><h3>Instant Tan</h3><span class="arrow" data-i18n="ver_productos">Ver productos</span></div>
  </a>
</section>

<section class="section" style="background:var(--soft)">
  <div class="wrap">
    <div class="shead"><div class="eyebrow" data-i18n="best_eyebrow">Lo más vendido</div><h2 data-i18n="best_h">Bestsellers</h2></div>
    <div class="grid">${best}</div>
  </div>
</section>

<nav class="catbar"><div class="wrap row" id="chips">${chips}</div></nav>
<main class="wrap" id="catalogo">
  <div class="sect"><h2 id="secTitle" data-i18n="all_products">Todos los productos</h2><span class="count" id="count"></span></div>
  <div class="grid" id="grid">
${cards}
  </div>
</main>

<section class="section" style="background:var(--soft)"><div class="wrap">
  <div class="feature">
    <div class="ph"><img src="${A.featMitt}" alt="Guante aplicador St.Tropez"></div>
    <div class="tx"><div class="eyebrow" data-i18n="feat_eyebrow">Aplicación perfecta</div><h3 data-i18n="feat_h">El secreto está en el guante</h3>
    <p data-i18n="feat_p">El guante aplicador Luxe de doble cara distribuye y difumina el autobronceador para un acabado uniforme de la cabeza a los pies, sin estrías y con las manos limpias.</p>
    <a class="btn" href="producto/mitt-dual-luxe.html" data-i18n="feat_cta">Ver el guante</a></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="feature rev">
    <div class="ph"><img src="${A.featBrush}" alt="Brocha facial St.Tropez"></div>
    <div class="tx"><div class="eyebrow" data-i18n="feat2_eyebrow">Precisión facial</div><h3 data-i18n="feat2_h">La brocha facial definitiva</h3>
    <p data-i18n="feat2_p">Cerdas suaves y curvadas que aplican el autobronceador siguiendo el contorno natural del rostro para un glow definido y sin manchas.</p>
    <a class="btn" href="producto/face-brush.html" data-i18n="feat2_cta">Ver la brocha</a></div>
  </div>
</div></section>

<section class="story"><div class="wrap">
  <div class="eyebrow" style="color:var(--gold)">St.Tropez</div>
  <h2 data-i18n="story_h">El bronceado que lo empezó todo</h2>
  <p data-i18n="story_p">Como marca de autobronceado nº1 y de mayor confianza, creemos que cómo te hace sentir tu bronceado es tan importante como cómo te hace lucir. Resultados impecables, de aspecto natural, para cada tono de piel.</p>
</div></section>

${footer(0)}
<script>
  const chips=document.getElementById('chips');
  const cards=[...document.querySelectorAll('#grid .card')];
  const countEl=document.getElementById('count');const titleEl=document.getElementById('secTitle');
  let activeF='todos', visN=cards.length;
  const T=(k)=> (window.STT_T ? window.STT_T(k) : k);
  function labelFor(f){return f==='todos'?T('all_products'):T('cat.'+f);}
  function paint(){titleEl.textContent=labelFor(activeF);countEl.textContent=visN+' '+T('products_word');[...chips.children].forEach(b=>b.classList.toggle('on',b.dataset.f===activeF));}
  function apply(f){activeF=f;let n=0;cards.forEach(c=>{const s=(f==='todos'||c.dataset.cat===f);c.style.display=s?'':'none';if(s)n++;});visN=n;paint();}
  chips.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;apply(b.dataset.f);
    document.getElementById('catalogo').scrollIntoView({behavior:'smooth',block:'start'});});
  function fromHash(){const h=location.hash.replace('#','');const valid=${JSON.stringify(CATS.map(c=>c.id))};if(h&&valid.indexOf(h)>=0){apply(h);document.getElementById('catalogo').scrollIntoView({behavior:'smooth',block:'start'});}else apply('todos');}
  window.addEventListener('hashchange',fromHash);
  window.addEventListener('stt:lang',paint);
  fromHash();
</script>
</body></html>`;
  fs.writeFileSync(path.join(OUT, "index.html"), html);
}

/* ---------- PRODUCT PAGES ---------- */
function buildProduct(p) {
  const c = catOf(p.cat);
  const price = eur(p.gbp);
  const canon = `${SITE}/producto/${p.slug}.html`;
  const title = `${p.es} | ${BRAND} España — ${fmt(price)}`;
  const metaDesc = `${p.desc} Comprar ${BRAND} ${p.es} (${p.vol}) en España por ${fmt(price)}. Envío a España y Portugal.`.slice(0, 300);
  const keywords = [p.es.toLowerCase(), ...(p.kw||[]), c.term, "st tropez", "comprar autobronceador"].join(", ");
  const benefits = benefitsOf(p), howto = howtoOf(p);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 4);

  const _ld = {"@context":"https://schema.org","@type":"Product","name":`${BRAND} ${p.es}`,"image":[absImg(p)],"description":p.desc,"brand":{"@type":"Brand","name":BRAND},"category":c.es,
    "offers":{"@type":"Offer","url":canon,"priceCurrency":"EUR","price":price.toFixed(2),"availability":"https://schema.org/InStock","seller":{"@type":"Organization","name":"Cabello Total"}}};
  if (RATINGS[p.slug]) _ld.aggregateRating = {"@type":"AggregateRating","ratingValue":RATINGS[p.slug][0],"reviewCount":RATINGS[p.slug][1],"bestRating":5,"worstRating":1};
  const productLd = JSON.stringify(_ld);
  const crumbLd = JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Inicio","item":SITE+"/"},
    {"@type":"ListItem","position":2,"name":c.es,"item":SITE+"/index.html#"+p.cat},
    {"@type":"ListItem","position":3,"name":p.es,"item":canon}]});

  const relCards = related.map((r) => cardHTML(r, 1)).join("\n");

  const html = head(title, metaDesc, canon, keywords, productLd, 1, absImg(p)) + `
<body>
${header(1)}
<div class="wrap">
  <div class="crumb"><a href="../index.html" data-i18n="crumb_home">Inicio</a> › <a href="../index.html#${p.cat}" data-i18n="cat.${p.cat}">${esc(c.es)}</a> › ${esc(p.es)}</div>
  <div class="pdp">
    <div class="gal"><img src="${localImg(p, 1)}" alt="${esc(p.es)} — ${esc(BRAND)} autobronceador"></div>
    <div>
      <div class="cat" data-i18n="cat.${p.cat}">${esc(c.es)}</div>
      <h1>${esc(p.es)}</h1>
      ${starsHTML(p.slug)}
      <div class="vol">${esc(BRAND)} · ${esc(p.vol)}</div>
      <div class="price">${fmt(price)}<span class="prov" data-i18n="prov">PVP orientativo · IVA incl. · convertido de RU</span></div>
      <p class="lead">${esc(p.desc)}</p>
      <div class="buys">
        <a class="buy primary" href="${cabelloLink(p.en)}" target="_blank" rel="noopener">Cabello Total</a>
        <a class="buy ebay" href="${ebayLink(p.en)}" target="_blank" rel="noopener">eBay España</a>
      </div>
      <div class="vegan" data-i18n="vegan">✓ Vegano · No testado en animales · Envío a España y Portugal</div>
      <div class="kw">${(p.kw||[]).map((k)=>`<span>${esc(k)}</span>`).join("")}</div>
    </div>
  </div>

  <div class="pinfo">
    <div>
      <h2 data-i18n="pdp_benefits">Beneficios</h2>
      <ul class="blist">${benefits.map((b)=>`<li>${esc(b)}</li>`).join("")}</ul>
    </div>
    <div>
      <h2 data-i18n="pdp_howto">Cómo aplicar</h2>
      <ol class="steps">${howto.map((s)=>`<li>${esc(s)}</li>`).join("")}</ol>
    </div>
  </div>

  <div class="pinfo" style="border-top:0;padding-top:0">
    <div>
      <h2 data-i18n="pdp_details">Detalles del producto</h2>
      <div class="details">
        <div><span data-i18n="d_brand">Marca</span><b>${esc(BRAND)}</b></div>
        <div><span data-i18n="d_format">Formato</span><b>${esc(p.vol)}</b></div>
        <div><span data-i18n="d_category">Categoría</span><b data-i18n="cat.${p.cat}">${esc(c.es)}</b></div>
        <div><span data-i18n="d_market">Mercado</span><b data-i18n="market_val">España y Portugal</b></div>
        <div><span data-i18n="d_price">Precio (EUR)</span><b>${fmt(price)}</b></div>
      </div>
    </div>
    <div>
      <h2 data-i18n="pdp_buy">Comprar</h2>
      <div class="buys">
        <a class="buy primary" href="${cabelloLink(p.en)}" target="_blank" rel="noopener">Cabello Total</a>
        <a class="buy ebay" href="${ebayLink(p.en)}" target="_blank" rel="noopener">eBay España</a>
      </div>
      <p class="vegan" data-i18n="buy_note">Precio orientativo en euros, convertido del PVP de Reino Unido. Sujeto a confirmación en el punto de venta.</p>
    </div>
  </div>

  ${related.length ? `<div class="related"><h2 data-i18n="pdp_related">Productos relacionados</h2><div class="grid">${relCards}</div></div>` : ""}
</div>
${footer(1)}
<script type="application/ld+json">${crumbLd}</script>
</body></html>`;
  fs.writeFileSync(path.join(OUT, "producto", p.slug + ".html"), html);
}

/* ---------- LEGAL PAGES (ES) ---------- */
const CONTACT = "admin@viahairbeauty.com";
const NOTICE = `<div class="notice"><b>Nota:</b> Documento orientativo. Antes de su publicación definitiva, revísalo con tu asesor legal y completa los datos identificativos de la empresa (razón social, NIF/CIF, domicilio social y datos de contacto).</div>`;
const LEGAL_PAGES = [
  { slug: "terminos.html", title: "Términos y condiciones",
    desc: "Términos y condiciones de uso de sttropeztan.es, operado por Cabello Total como distribuidor autorizado de St.Tropez en España y Portugal.",
    body: `<h1>Términos y condiciones</h1><div class="upd">Última actualización: junio de 2026</div>${NOTICE}
<h2>1. Titularidad del sitio</h2><p>Este sitio web (sttropeztan.es) es operado por <b>Cabello Total</b> [razón social, NIF/CIF y domicilio social a completar] («el Operador»), como distribuidor autorizado de productos St.Tropez en España y Portugal. Puedes contactarnos en <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
<h2>2. Objeto del sitio</h2><p>Este sitio tiene carácter informativo y de escaparate de producto. La compra se realiza a través de nuestros canales de venta, principalmente <a href="${CABELLO}" target="_blank" rel="noopener">cabellototal.es</a> y eBay España, donde se aplican sus propios términos de compra, envío, devoluciones y atención al cliente.</p>
<h2>3. Propiedad intelectual e industrial</h2><p>«St.Tropez» y los nombres, logotipos e imágenes de producto son marcas registradas y propiedad de <b>PZ Cussons</b>. © PZ Cussons. Todos los derechos reservados. El Operador utiliza dichas marcas e imágenes exclusivamente para identificar y describir los productos genuinos que distribuye en su condición de distribuidor autorizado, sin que ello implique afiliación, patrocinio ni respaldo por parte del titular de la marca más allá de la relación de distribución. Este sitio no es el sitio web oficial de St.Tropez.</p><p>El diseño, los textos propios y la estructura del sitio pertenecen al Operador o se utilizan con autorización.</p>
<h2>4. Productos, precios y disponibilidad</h2><p>Los precios mostrados en euros son orientativos (convertidos a partir del PVP de Reino Unido) y pueden variar. El precio aplicable, los gastos de envío, los impuestos y la disponibilidad definitivos son los indicados en el punto de venta en el momento de la compra. El contrato de compraventa se perfecciona únicamente en dicho canal de venta.</p>
<h2>5. Enlaces a terceros</h2><p>El sitio incluye enlaces a sitios de terceros (p. ej. cabellototal.es y eBay). El Operador no se responsabiliza del contenido ni de las políticas de dichos sitios.</p>
<h2>6. Responsabilidad</h2><p>La información se ofrece «tal cual», con fines informativos. En la medida permitida por la ley, el Operador no garantiza la exactitud, integridad ni actualidad de la información (incluidos precios e imágenes) y no será responsable de los daños derivados del uso del sitio.</p>
<h2>7. Legislación aplicable</h2><p>Estos términos se rigen por la legislación española y, en su caso, por la normativa de consumo aplicable en España y Portugal. Las partes se someten a los juzgados y tribunales que correspondan conforme a dicha normativa.</p>
<h2>8. Modificaciones</h2><p>El Operador podrá modificar estos términos y el contenido del sitio en cualquier momento. La versión vigente será la publicada en esta página.</p>` },
  { slug: "privacidad.html", title: "Política de privacidad",
    desc: "Política de privacidad de sttropeztan.es conforme al RGPD y la normativa de protección de datos de España y Portugal.",
    body: `<h1>Política de privacidad</h1><div class="upd">Última actualización: junio de 2026</div>${NOTICE}
<h2>1. Responsable del tratamiento</h2><p><b>Cabello Total</b> [razón social, NIF/CIF y domicilio social a completar]. Contacto: <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
<h2>2. Datos que tratamos</h2><p>Este sitio es principalmente informativo. Podemos tratar: (i) datos de navegación y cookies técnicas o analíticas; (ii) los datos que nos facilites voluntariamente al contactarnos o registrarte (nombre, empresa, email, teléfono y datos relacionados).</p>
<h2>3. Finalidad y base jurídica</h2><p>Tratamos tus datos para atender tus consultas y gestionar la relación comercial (base jurídica: tu consentimiento, el interés legítimo y/o la aplicación de medidas precontractuales), conforme al Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica 3/2018 (LOPDGDD) en España y la normativa de protección de datos aplicable en Portugal.</p>
<h2>4. Conservación</h2><p>Conservamos los datos durante el tiempo necesario para la finalidad para la que se recabaron y, posteriormente, durante los plazos legales aplicables.</p>
<h2>5. Destinatarios</h2><p>No cedemos tus datos a terceros salvo obligación legal o proveedores que nos prestan servicios (p. ej. alojamiento web), con las garantías adecuadas.</p>
<h2>6. Tus derechos</h2><p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a <a href="mailto:${CONTACT}">${CONTACT}</a>. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD, <a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>) o, en Portugal, ante la CNPD.</p>
<h2>7. Cookies</h2><p>Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y, en su caso, cookies analíticas. Puedes configurar o rechazar las cookies desde tu navegador.</p>` },
  { slug: "accesibilidad.html", title: "Accesibilidad",
    desc: "Declaración de accesibilidad de sttropeztan.es. Compromiso con las pautas WCAG 2.1 nivel AA.",
    body: `<h1>Declaración de accesibilidad</h1><div class="upd">Última actualización: junio de 2026</div>${NOTICE}
<p>En Cabello Total queremos que sttropeztan.es sea accesible para el mayor número de personas posible, con independencia de sus capacidades o del dispositivo que utilicen.</p>
<h2>Estado de conformidad</h2><p>Trabajamos para que este sitio cumpla, en la medida de lo posible, con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 en nivel AA. Es posible que algunos contenidos no cumplan todavía plenamente con todos los criterios; seguimos mejorando de forma continua.</p>
<h2>Medidas adoptadas</h2><ul><li>Estructura semántica del contenido y textos alternativos en las imágenes.</li><li>Contraste de color y tamaños de texto legibles.</li><li>Navegación por teclado en los elementos interactivos.</li><li>Diseño adaptable (responsive) a distintos tamaños de pantalla.</li></ul>
<h2>Contacto y sugerencias</h2><p>Si encuentras alguna barrera de accesibilidad o necesitas algún contenido en un formato alternativo, escríbenos a <a href="mailto:${CONTACT}">${CONTACT}</a> y lo resolveremos lo antes posible.</p>` }
];
function buildLegal() {
  LEGAL_PAGES.forEach((pg) => {
    const canon = `${SITE}/${pg.slug}`;
    const html = head(`${pg.title} | ${BRAND} España`, pg.desc, canon, `st tropez, ${pg.title.toLowerCase()}, cabello total, españa, portugal`, "", 0) + `
<body>
${header(0)}
<main class="legal">
${pg.body}
</main>
${footer(0)}
</body></html>`;
    fs.writeFileSync(path.join(OUT, pg.slug), html);
  });
}

/* ---------- SITEMAP / ROBOTS / LLMS ---------- */
function buildSitemap() {
  const urls = [`${SITE}/`, ...PRODUCTS.map((p) => `${SITE}/producto/${p.slug}.html`), ...LEGAL_PAGES.map((p) => `${SITE}/${p.slug}`)];
  fs.writeFileSync(path.join(OUT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u)=>`  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>`);
  fs.writeFileSync(path.join(OUT, "robots.txt"),
`# St.Tropez España — autobronceadores (mercados: España y Portugal)
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
# LLM guide: ${SITE}/llms.txt
`);
}
function buildLlms() {
  let out = `# St.Tropez España\n\n`;
  out += `> Tienda online de la gama completa de autobronceadores St.Tropez para los mercados de España y Portugal, operada por Cabello Total como distribuidor autorizado. Espumas autobronceadoras, brumas en spray, autobronceador gradual, bronceador instantáneo, soluciones profesionales de cabina y accesorios. Precios en euros; compra a través de cabellototal.es y eBay España.\n\n`;
  out += `- Idioma: español (es-ES). Mercados objetivo: España (es-ES) y Portugal (pt-PT).\n`;
  out += `- Marca: St.Tropez (marca registrada de su titular). Sitio operado por Cabello Total, distribuidor autorizado; no es el sitio oficial de la marca.\n`;
  out += `- Precios en euros, orientativos (convertidos de PVP de Reino Unido al tipo ${RATE}); sujetos a confirmación.\n\n`;
  CATS.forEach((c) => {
    const items = PRODUCTS.filter((p) => p.cat === c.id);
    if (!items.length) return;
    out += `## ${c.es}\n\n`;
    items.forEach((p) => { out += `- [${p.es}](${SITE}/producto/${p.slug}.html): ${p.desc} (${p.vol} · ${fmt(eur(p.gbp))})\n`; });
    out += `\n`;
  });
  out += `## Comprar\n\n- [Cabello Total](${CABELLO}): tienda online del distribuidor autorizado.\n- [eBay España](https://www.ebay.es): listados oficiales del distribuidor.\n`;
  fs.writeFileSync(path.join(OUT, "llms.txt"), out);
}

/* ---------- I18N CLIENT ---------- */
function buildI18nJs() {
  const js = `/* St.Tropez ES — interface language toggle (chrome only; product copy stays Spanish) */
(function(){
  var DICT = ${JSON.stringify(I18N)};
  function get(lang,key){ var d=DICT[lang]||{}; return (d[key]!=null?d[key]:(DICT.es[key]!=null?DICT.es[key]:null)); }
  var lang = (function(){ try{ return localStorage.getItem('stt_lang')||'es'; }catch(e){ return 'es'; } })();
  if(!DICT[lang]) lang='es';
  function apply(){
    try{ document.documentElement.lang = lang; }catch(e){}
    document.querySelectorAll('[data-i18n]').forEach(function(el){ var v=get(lang,el.getAttribute('data-i18n')); if(v!=null) el.textContent=v; });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){ var v=get(lang,el.getAttribute('data-i18n-html')); if(v!=null) el.innerHTML=v; });
    document.querySelectorAll('[data-lang]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-lang')===lang); });
    window.STT_T = function(k){ return get(lang,k); };
    try{ window.dispatchEvent(new CustomEvent('stt:lang',{detail:{lang:lang}})); }catch(e){}
  }
  window.STT_setLang = function(l){ if(!DICT[l]) return; lang=l; try{ localStorage.setItem('stt_lang',l); }catch(e){} apply(); };
  function initCookies(){
    var ck=document.getElementById('cookieBanner'); if(!ck) return;
    var choice=null; try{ choice=localStorage.getItem('stt_cookie'); }catch(e){}
    if(!choice){ ck.hidden=false; }
    function setCk(v){ try{ localStorage.setItem('stt_cookie',v); }catch(e){} ck.hidden=true; }
    var ac=ck.querySelector('.ck-accept'), dc=ck.querySelector('.ck-decline');
    if(ac) ac.addEventListener('click', function(){ setCk('accepted'); });
    if(dc) dc.addEventListener('click', function(){ setCk('declined'); });
  }
  function init(){
    document.querySelectorAll('[data-lang]').forEach(function(b){ b.addEventListener('click', function(){ window.STT_setLang(b.getAttribute('data-lang')); }); });
    apply();
    initCookies();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();`;
  fs.writeFileSync(path.join(OUT, "i18n.js"), js);
}

/* ---------- RUN ---------- */
fs.writeFileSync(path.join(OUT, "styles.css"), CSS.trim());
buildI18nJs();
buildIndex();
PRODUCTS.forEach(buildProduct);
buildLegal();
buildSitemap();
buildLlms();
console.log("Generated", PRODUCTS.length, "full product pages + brand front page + sitemap + llms.txt into", OUT);
