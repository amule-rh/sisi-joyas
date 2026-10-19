(() => {
  const form = document.querySelector("#assistant-form");
  const input = document.querySelector("#assistant-question");
  const response = document.querySelector("#assistant-response");
  if (!form || !input || !response) return;

  const text = {
    es: {
      empty: "Escribe una categoría o una duda: por ejemplo, pendientes, anillos, pulseras, collar, piezas propias o acabado dorado.",
      own: "La vitrina reúne anuncios propios de Vinted y Wallapop, separados de las recomendaciones afiliadas. El precio, el estado y la disponibilidad pueden cambiar; comprueba también los materiales declarados en cada anuncio.",
      earrings: "Hay pendientes propios de cruz y modelos afiliados de moissanita. En los anuncios propios, el material, las piedras y el cierre son los que declara cada ficha: confirma los detalles y la disponibilidad en la plataforma.",
      rings: "La selección incluye anillos propios ajustables y modelos afiliados de Miles en varias tallas. Importante: un anuncio de anillo halo muestra una discrepancia entre el atributo «plata» y el texto «oro blanco de 18K»; confírmalo con la vendedora antes de comprar.",
      bracelets: "Además de pulseras tennis afiliadas, hay una pulsera propia con circonitas. Su anuncio no especifica la ley del metal; comprueba el material y el estado directamente en Wallapop.",
      chain: "Entre las piezas propias hay un collar con colgante triangular amarillo, descrito en el anuncio como plata y piedra amarilla. También puedes comparar las cadenas y colgantes de Miles; comprueba si la cadena está incluida.",
      cross: "Hay pendientes propios y colgantes afiliados con diseño de cruz. Los materiales de los anuncios propios son declaraciones de cada ficha. La variante dorada de Miles que verificamos es plata 925 chapada, no oro macizo.",
      hamsa: "El catálogo afiliado incluye un colgante Mano Hamsa de moissanita. La ficha de Miles indica que la cadena se selecciona aparte; confirma allí las variantes y el acabado.",
      heart: "El catálogo afiliado incluye un colgante corazón de moissanita en plata 925. Comprueba en la ficha las opciones de acabado y si la cadena se incluye.",
      gold: "Las variantes doradas verificadas de Miles son plata 925 chapada, no oro macizo. Además, un anuncio propio de anillo halo contiene datos contradictorios sobre el metal; confirma esa ficha con la vendedora antes de comprar.",
      gift: "Para un regalo puedes comparar el collar propio, los pendientes y los colgantes afiliados. Revisa medidas, materiales declarados, precio, disponibilidad y condiciones de devolución en cada plataforma.",
      care: "Para cuidar una pieza, identifica primero el metal y el acabado de su ficha. En la guía explicamos cuidados para plata 925, baños y engastes.",
      gem: "La moissanita y el diamante son gemas distintas. La guía compara composición, apariencia y dureza sin presentarlas como equivalentes.",
      material: "Los anuncios propios describen los materiales de forma distinta y algunos datos necesitan confirmación. En Miles, varias fichas indican plata 925; un acabado dorado chapado no equivale a oro macizo.",
      fallback: "No encuentro una respuesta segura. Prueba con piezas propias, pendientes, anillos, pulseras, collares, corazón, Hamsa, cruz, acabado dorado, plata 925, regalo o cuidado.",
      productLink: "Ver en tienda del proveedor",
      ownProductLink: "Ver anuncio en",
      articleCare: "Leer la guía de materiales y cuidado",
      articleGem: "Comparar moissanita y diamante",
      articleLab: "Moissanita y diamante de laboratorio",
      articleGift: "Abrir la guía de regalos"
    },
    en: {
      empty: "Enter a category or question, for example earrings, rings, bracelets, necklace, Sisi's own listings or gold finish.",
      own: "This edit brings together Sisi's Vinted and Wallapop listings, kept separate from affiliate recommendations. Price, condition and availability can change; check the seller-stated materials on each listing too.",
      earrings: "There are Sisi-owned cross earrings and affiliate moissanite styles. For owned listings, materials, stones and fastenings are as stated on each listing: check the details and availability on the platform.",
      rings: "The edit includes adjustable rings from Sisi's listings and Miles styles in several sizes. Note: one halo-ring listing conflicts between the material field ('silver') and its description ('18K white gold'); confirm with the seller before buying.",
      bracelets: "Alongside affiliate tennis bracelets, there is a Sisi-owned cubic-zirconia bracelet. Its listing does not specify metal fineness; check the material and condition on Wallapop.",
      chain: "Sisi's own listings include a necklace with a yellow triangular pendant, described as silver and a yellow stone. You can also compare Miles chains and pendants; check whether a chain is included.",
      cross: "There are Sisi-owned cross earrings and affiliate cross pendants. Materials on owned listings are seller-stated. The gold-colour Miles variant we checked is gold-plated 925 silver, not solid gold.",
      hamsa: "The affiliate catalogue includes a moissanite Hamsa hand pendant. Miles says the chain is selected separately; confirm variants and finish on the retailer page.",
      heart: "The affiliate catalogue includes a moissanite heart pendant in 925 silver. Check the finish options and whether a chain is included on the retailer page.",
      gold: "Miles's verified gold-colour variants are gold-plated 925 silver, not solid gold. One owned halo-ring listing also has conflicting metal information; confirm it with the seller before buying.",
      gift: "For a gift, compare the owned necklace and earrings with the affiliate pendants. Check measurements, seller-stated materials, price, availability and return terms on each platform.",
      care: "To care for a piece, first identify the metal and finish on its listing. Our guide covers 925 silver, plating and settings.",
      gem: "Moissanite and diamond are different gemstones. The guide compares composition, appearance and hardness without treating them as interchangeable.",
      material: "Materials vary across Sisi's own listings and some details need confirmation. Several Miles listings specify 925 silver; a gold-plated finish is not solid gold.",
      fallback: "I can't find a reliable answer. Try Sisi's own listings, earrings, rings, bracelets, necklaces, heart, Hamsa, cross, gold finish, 925 silver, gift or care.",
      productLink: "View at supplier's shop",
      ownProductLink: "View listing on",
      articleCare: "Read the materials and care guide",
      articleGem: "Compare moissanite and diamond",
      articleLab: "Moissanite and lab-grown diamond",
      articleGift: "Open the gift guide"
    }
  };

  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const lang = () => document.documentElement.lang === "en" ? "en" : "es";

  function findResult(question) {
    const q = normalize(question);
    const has = (...words) => words.some((word) => q.includes(normalize(word)));
    if (!q.trim()) return { key: "empty", ids: [] };
    if (has("cuidado", "limpiar", "limpieza", "care", "clean")) return { key: "care", ids: [], article: "care" };
    const asksAboutGemstones = has("diamante", "diamond", "lab grown", "laboratorio", "diferencia", "comparar", "compare", "vs", "simulante") ||
      ((has("moissanita", "moissanite") && has("que es", "what is", "como se compara", "se diferencia")));
    if (asksAboutGemstones) return { key: "gem", ids: [], article: "gem" };
    if (has("pieza propia", "piezas propias", "anuncio propio", "anuncios propios", "mis joyas", "mis anuncios", "own listing", "own listings", "own pieces", "my listings")) {
      return { key: "own", ids: ["own-ring-adjustable", "own-yellow-pendant", "own-rhombus-bracelet", "own-wallapop-zirconia-cross-earrings"] };
    }
    if (has("regalo", "regalar", "gift", "cumple", "aniversario")) return { key: "gift", ids: ["own-yellow-pendant", "own-wallapop-zirconia-cross-earrings", "miles-heart-pendant", "miles-huggie-2row"], article: "gift" };
    if (has("oro", "dorado", "chapado", "gold", "plated")) return { key: has("cruz", "cross") ? "cross" : "gold", ids: ["own-vinted-halo-ring", "miles-cross-gold-iced", "miles-ring-13mm"] };
    if (has("hamsa", "mano")) return { key: "hamsa", ids: ["miles-hamsa-pendant"] };
    if (has("cruz", "cross")) return { key: "cross", ids: ["own-cross-earrings", "own-wallapop-zirconia-cross-earrings", "miles-cross-necklace", "miles-cross-gold-iced"] };
    if (has("corazon", "heart")) return { key: "heart", ids: ["miles-heart-pendant"], article: "gift" };
    if (has("pendiente", "pendientes", "aro", "aros", "huggie", "earring", "stud")) return { key: "earrings", ids: ["own-cross-earrings", "own-wallapop-zirconia-cross-earrings", "miles-huggie-2row", "miles-princess-studs"] };
    if (has("anillo", "anillos", "ring", "rings", "talla")) return { key: "rings", ids: ["own-ring-adjustable", "own-vinted-halo-ring", "miles-ring-tennis-3mm", "miles-ring-13mm"] };
    if (has("pulsera", "pulseras", "brazalete", "bracelet", "wrist")) return { key: "bracelets", ids: ["own-rhombus-bracelet", "miles-tennis-bracelet", "miles-bracelet-star-8mm"] };
    if (has("cadena", "collar", "colgante", "necklace", "pendant", "chain")) return { key: "chain", ids: ["own-yellow-pendant", "miles-tennis-chain", "miles-cross-necklace", "miles-heart-pendant"] };
    if (has("plata", "silver", "925", "material", "metal")) return { key: "material", ids: ["own-ring-adjustable", "own-wallapop-zirconia-cross-earrings", "miles-huggie-2row", "miles-princess-studs"], article: "care" };
    return { key: "fallback", ids: [] };
  }

  function addArticleLink(kind, copy) {
    const hrefs = {
      care: "blog-care.html",
      gem: "blog-moissanite-diamond.html",
      lab: "blog-moissanite-lab-diamond.html",
      gift: "blog-gift-guide.html"
    };
    const labels = {
      care: copy.articleCare,
      gem: copy.articleGem,
      lab: copy.articleLab,
      gift: copy.articleGift
    };
    const link = document.createElement("a");
    link.className = "assistant-guide-link";
    link.href = hrefs[kind];
    link.textContent = labels[kind];
    return link;
  }

  function showAnswer(question) {
    const copy = text[lang()];
    const result = findResult(question);
    response.replaceChildren();

    const paragraph = document.createElement("p");
    paragraph.className = "assistant-response-text";
    paragraph.textContent = copy[result.key];
    response.append(paragraph);

    if (result.ids.length) {
      const recommendations = document.createElement("div");
      recommendations.className = "assistant-recommendations";
      result.ids.forEach((id) => {
        const card = [...document.querySelectorAll("[data-product-id]")].find((item) => item.dataset.productId === id);
        if (!card) return;
        const isAffiliate = card.hasAttribute("data-affiliate-card");
        const productLink = card.querySelector(isAffiliate ? ".product-buy" : ".own-listing-buy");
        const image = card.querySelector("img");
        const title = card.querySelector("h3");
        if (!productLink || !image || !title) return;

        const link = document.createElement("a");
        link.className = "assistant-product";
        link.href = productLink.href;
        link.target = "_blank";
        link.rel = isAffiliate ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer";
        const thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.loading = "lazy";
        thumb.decoding = "async";
        const label = document.createElement("span");
        label.textContent = title.textContent;
        const action = document.createElement("small");
        action.textContent = isAffiliate ? copy.productLink : `${copy.ownProductLink} ${card.dataset.marketplace || ""}`.trim();
        link.append(thumb, label, action);
        recommendations.append(link);
      });
      response.append(recommendations);
    }

    if (result.article) response.append(addArticleLink(result.article, copy));
    if (result.key === "gem") response.append(addArticleLink("lab", copy));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showAnswer(input.value);
  });

  document.querySelectorAll("[data-assistant-query]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.assistantQuery;
      showAnswer(input.value);
    });
  });
})();
