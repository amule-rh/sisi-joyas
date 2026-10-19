# Sisi Joyas — web estática

Sitio bilingüe en HTML, CSS y JavaScript puro, preparado para GitHub Pages y publicado bajo `sisijoyas.store`. No requiere backend, dependencias ni proceso de build.

## Estructura

- `index.html`: portada, catálogo con trece recomendaciones afiliadas, seis piezas propias únicas (ocho enlaces de plataforma) y acceso al asistente; los nombres, textos y enlaces principales están en el HTML.
- `js/products.js`: identificadores, destinos Awin e imágenes de las recomendaciones afiliadas.
- `js/main.js`: idioma ES/EN, filtros del catálogo afiliado, textos y menú móvil.
- `js/assistant.js`: asistente local de reglas que recomienda artículos afiliados y anuncios propios, y enlaza guías; procesa las consultas en el navegador y no llama a una API.
- `assets/products/`: imágenes optimizadas de las fichas oficiales de Miles Jewellery.
- `assets/own-listings/`: fotos optimizadas de anuncios de Vinted y Wallapop enlazados a sus fichas individuales.
- `assets/sisi-hero.jpg` y `assets/sisi-story.jpg`: fotografías editoriales originales de la marca.
- `assets/sisi-logo-horizontal.png` y `assets/sisi-cat-mark.png`: masters del wordmark y el icono de gato; el sitio usa versiones optimizadas.
- `blog.html` y `blog-*.html`: journal y guías.
- `legal.html`, `privacy.html` y `cookies.html`: páginas legales que requieren revisión según los datos y la actividad reales.

## Catálogo y transparencia

La portada separa visual y funcionalmente las recomendaciones afiliadas de Miles Jewellery y los artículos propios anunciados en Vinted y Wallapop. La vitrina muestra seis piezas únicas con ocho enlaces directos: dos artículos con fotos coincidentes se agrupan en una tarjeta con ambos enlaces. El precio y la disponibilidad se consultan en las plataformas y pueden cambiar. Los materiales se presentan como declaraciones de cada anuncio, no como una verificación independiente. Una ficha de anillo tiene una discrepancia visible entre el campo de material y su descripción; se advierte en la tarjeta.

Las fichas de Miles identifican a `Miles Jewellery` como proveedor y dirigen a su tienda. La divulgación de que algunos enlaces son afiliados de Awin permanece en los avisos generales y el pie de página.

El catálogo afiliado permite filtrar por categoría y buscar por texto. Para actualizar una recomendación, cambia en `js/products.js` el `id`, la categoría, la ruta de imagen y la URL de Awin, y conserva los parámetros de seguimiento. Mantén los IDs sincronizados con `data-product-id` en `index.html` y las recomendaciones de `js/assistant.js`. Los enlaces afiliados deben conservar `rel="sponsored nofollow noopener noreferrer"` y la divulgación de Awin debe permanecer visible.

Al retirar anuncios vendidos o inactivos, actualiza también sus tarjetas y sus IDs en `js/assistant.js`. No conviertas las fichas propias en enlaces afiliados ni fijes un precio que pueda quedar obsoleto.

## Comprobaciones locales

El sitio no necesita instalación. Desde la raíz del repositorio, puedes servirlo con `python3 -m http.server 8000` y abrir `http://localhost:8000`. Antes de publicar, revisa `node --check js/main.js`, `node --check js/assistant.js` y `node --check js/products.js`, `git diff --check`, que cada ID del asistente exista en el HTML y que cada imagen cargue.

## Pendiente legal

`legal.html` conserva marcadores para los datos de titular y contacto, y `privacy.html` / `cookies.html` son borradores. Completa y revisa esas páginas según tu situación real antes de considerar que los textos legales están terminados.
