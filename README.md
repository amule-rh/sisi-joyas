# Sisi Joyas — web estática bilingüe

Web de joyería en HTML, CSS y JavaScript puro, preparada para GitHub Pages. No necesita Node, backend ni build.

## Contenido
- `index.html`: inicio y catálogo filtrable.
- `blog.html` y `blog-*.html`: artículos SEO con enlaces afiliados separados del catálogo propio.
- `css/styles.css`: diseño responsive.
- `js/products.js`: catálogo propio editable y enlaces Awin.
- `js/main.js`: filtros e idioma ES/EN.
- `assets/`: logo SVG, favicon y portada Open Graph.
- `legal.html`, `privacy.html`, `cookies.html`: borradores que debes completar/revisar.

## 1. Crear el repositorio
1. Entra en https://github.com/new.
2. Crea un repositorio público llamado `sisi-joyas` (o el nombre que prefieras).
3. Selecciona `Add a README file` o deja el repositorio vacío.
4. Sube el contenido de esta carpeta a la raíz del repositorio; `index.html` debe quedar en la raíz, no dentro de otra carpeta.

## 2. Subir archivos
En GitHub: **Add file → Upload files**, arrastra todos los archivos y carpetas, escribe `Create Sisi website` como mensaje y pulsa **Commit changes**. Para futuras actualizaciones, repite el proceso o utiliza Git y haz `git push`.

## 3. Activar GitHub Pages
1. Abre el repositorio → **Settings → Pages**.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Selecciona `main` y la carpeta `/(root)`.
4. Pulsa **Save**. Espera a que termine la publicación.
5. La URL será `https://TU-USUARIO.github.io/sisi-joyas/` (sustituye TU-USUARIO por tu nombre de GitHub). No se puede confirmar la URL final hasta crear el repositorio.

## 4. Editar el catálogo
Abre `js/products.js`. Cada artículo tiene `id`, `category`, `status`, `name`, `description`, `price`, `image`, `marketplace` y `url`.
- Categorías admitidas: `rings`, `earrings`, `necklaces`, `bracelets`.
- Cuando vendas una pieza, cambia `status:"active"` por `status:"sold"` o elimina la entrada.
- Sustituye nombres, descripciones, precios, fotos y URLs de perfil por el anuncio individual real.
- Si `price` es `null`, se muestra “Precio por añadir”. No publiques tarjetas de ejemplo como si fueran artículos disponibles: reemplaza o elimina las cuatro entradas de demostración antes de lanzar.
- Para añadir una pieza, copia un objeto existente, asigna un `id` único y añade una coma entre objetos.
- El enlace de compra debe apuntar al anuncio individual, no solo al perfil.

## 5. Afiliados Awin
Los enlaces de Miles Jewellery están en `window.SISI_AFFILIATES` dentro de `js/products.js` y en los artículos del blog. Conserva los parámetros de tracking. Los enlaces deben llevar `rel="sponsored nofollow noopener"` cuando corresponda. No insertes productos afiliados dentro del catálogo propio.
Los enlaces de La Joya Jewelry aún no se han proporcionado; añádelos solo cuando tengas las URL de tracking generadas en Awin.

## 6. Antes de publicar (imprescindible)
- Completa los marcadores de `legal.html`, `privacy.html` y revisa `cookies.html` según tu actividad real.
- Sustituye los productos de ejemplo por anuncios reales; no inventes precios, medidas, disponibilidad ni especificaciones de metal.
- Confirma que tienes derechos para usar las fotos. Las fotos remotas de demostración pueden no representar tus artículos; cámbialas por fotos propias/autorizadas.
- Añade tu dominio en los metadatos si lo compras y crea `sitemap.xml` con la URL definitiva.
- Comprueba todos los enlaces desde móvil y escritorio.

## 7. Idiomas
El botón `ES / EN` cambia los textos de interfaz. El contenido editorial del blog de esta primera versión está en español; las traducciones completas de cada artículo pueden añadirse en una segunda iteración.

## 8. Imágenes y rendimiento
La plantilla usa imágenes remotas de demostración y Google Fonts. Para máxima velocidad y control, sustituye por fotos optimizadas WebP/AVIF alojadas en `assets/` y fuentes locales con licencia adecuada.
