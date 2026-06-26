# sttropeztan.es — Tienda St.Tropez España (autobronceadores)

Sitio estático optimizado para SEO en España de la gama **St.Tropez**, operado por Cabello Total como distribuidor autorizado en España y Portugal. Datos de producto extraídos de sttropeztan.com/uk con Apify. Páginas de producto individuales en español con precios en euros y botones de compra a **cabellototal.es** y **eBay España**.

## Qué incluye
- `index.html` — portada con hero, filtro por categorías y rejilla de los 38 productos.
- `producto/<slug>.html` — 38 páginas de producto individuales, cada una con:
  - Título y meta description optimizados (marca + producto + término genérico, p. ej. "autobronceador en spray").
  - Datos estructurados schema.org `Product` (precio EUR) y `BreadcrumbList`.
  - Precio en euros, descripción, etiquetas de palabras clave y productos relacionados.
  - Botones "Comprar en Cabello Total" y "Comprar en eBay España".
- `styles.css`, `sitemap.xml`, `robots.txt`.
- `_build/` — generador (no afecta al sitio): `sttdata.js` (datos) + `sttgen.js`.

## Precios (importante)
Los precios mostrados son **orientativos**: PVP de Reino Unido (GBP) convertido a euros al tipo **1,16** definido en `_build/sttdata.js` (`RATE`). El sitio oficial de St.Tropez no muestra precios (enlaza a tiendas como Boots), por lo que estos valores deben confirmarse antes de publicar. Para precios reales en vivo desde el minorista de RU, se puede añadir una tarea programada de Apify que actualice `sttdata.js`.

## Editar productos / precios y regenerar
1. Edita `_build/sttdata.js` (cambia `gbp`, nombres, descripciones, imágenes, categorías).
2. Regenera el sitio:
   ```bash
   OUT=. node _build/sttgen.js
   ```
   (desde la raíz del repo; sobrescribe `index.html`, `producto/`, `sitemap.xml`, `styles.css`).

## Despliegue (Vercel)
Sitio estático: importa el repo en Vercel, Framework Preset **Other**, sin build command ni output dir. `index.html` se sirve en la raíz; las páginas de producto en `/producto/`. `robots.txt` permite indexación (SEO activo).

## Notas
- Idioma: español (mercado ES/PT).
- Marca: St.Tropez® es marca registrada de su titular; sitio operado por Cabello Total como distribuidor autorizado, no es el sitio oficial. Imágenes de packshots oficiales.
