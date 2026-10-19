# Sisi Joyas — web estática

Sitio bilingüe en HTML, CSS y JavaScript puro, preparado para GitHub Pages y publicado bajo `sisijoyas.store`. No requiere backend, dependencias ni proceso de build.

## Estructura

- `index.html`: portada y cinco recomendaciones afiliadas; los nombres, materiales y enlaces están presentes en el HTML inicial.
- `js/products.js`: identificadores, destinos Awin e imágenes de las recomendaciones.
- `js/main.js`: idioma ES/EN, filtros y menú móvil.
- `assets/products/`: imágenes optimizadas de producto asociadas a las fichas oficiales de Miles Jewellery.
- `assets/sisi-hero.jpg` y `assets/sisi-story.jpg`: fotografías editoriales originales de la marca.
- `assets/sisi-logo.svg` y `assets/favicon.svg`: marca e icono del sitio.
- `blog.html` y `blog-*.html`: journal y guías.
- `legal.html`, `privacy.html` y `cookies.html`: páginas legales que requieren revisión según los datos y la actividad reales.

## Catálogo y afiliación

La portada distingue el bloque **Selección afiliada** de los enlaces a los perfiles propios de Vinted y Wallapop. No se deben presentar como anuncios propios los artículos enlazados a Miles Jewellery.

Para actualizar una recomendación, cambia en `js/products.js` el `id`, la categoría, la ruta de imagen y la URL de Awin, y conserva los parámetros de seguimiento. Mantén los IDs sincronizados con `data-product-id` en `index.html`. Deja el nombre y la descripción del artículo en el HTML para que sean visibles incluso sin JavaScript.

Comprueba cada destino en la tienda antes de editar sus materiales o variantes. No fijes un precio ni prometas disponibilidad en esta web: ambos pueden cambiar. Los colgantes de corazón y Hamsa pueden tener opciones de cadena distintas; la ficha de Hamsa indica que la cadena no está incluida.

Los enlaces de afiliación deben conservar `rel="sponsored nofollow noopener noreferrer"`. La divulgación de Awin aparece junto a la selección y en el pie de página.

## Comprobaciones locales

El sitio no necesita instalación. Desde la raíz del repositorio, puedes servirlo con `python3 -m http.server 8000` y abrir `http://localhost:8000`. Antes de guardar cambios, revisa que las URL Awin mantengan sus parámetros, que las fotos correspondan a cada producto y que las rutas de `sitemap.xml` sigan siendo correctas.

## Pendiente legal

`legal.html` conserva marcadores para los datos de titular y contacto, y `privacy.html` / `cookies.html` son borradores. Completa y revisa esas páginas según tu situación real antes de considerar que los textos legales están terminados.
