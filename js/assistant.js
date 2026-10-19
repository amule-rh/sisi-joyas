(() => {
  const form = document.querySelector("#assistant-form");
  const input = document.querySelector("#assistant-question");
  const response = document.querySelector("#assistant-response");
  if (!form || !input || !response) return;

  const text = {
    es: {
      empty: "Escribe una categoría o una duda: por ejemplo, pendientes, anillos, pulseras, cadena o acabado dorado.",
      earrings: "Para pendientes puedes comparar un huggie de dos hileras, un stud cuadrado princess cut y un stud redondo de 3 mm. Comprueba en la ficha el tamaño y el tipo de cierre.",
      rings: "Hay un anillo fino de 3 mm y una banda llamativa de 13 mm. Miles publica tallas US; consulta su guía para elegir la equivalencia correcta antes de comprar.",
      bracelets: "La selección incluye una pulsera tennis de 2–6 mm y un diseño de estrellas de 8 mm. Revisa el largo disponible y mide tu muñeca en la tienda.",
      chain: "La cadena tennis de moissanita ofrece anchos de 2–6,5 mm y largos de 16–24 pulgadas. En los colgantes, comprueba si la cadena viene incluida o se selecciona aparte.",
      cross: "Hay cruces de distintos estilos y tamaños. Importante: la opción dorada que hemos verificado es plata 925 con baño de oro, no oro macizo.",
      hamsa: "El catálogo incluye un colgante Mano Hamsa de moissanita. La ficha de Miles indica que la cadena se selecciona aparte; confirma allí las variantes y el acabado.",
      heart: "El catálogo incluye un colgante corazón de moissanita en plata 925. Comprueba en la ficha las opciones de acabado y si la cadena se incluye.",
      gold: "Las variantes doradas verificadas de esta selección son plata 925 chapada en oro; no son piezas de oro macizo. Confirma el acabado concreto en la variante que elijas.",
      gift: "Para un regalo, un colgante corazón o unos pendientes evitan acertar con la talla de anillo. Confirma si la cadena se incluye y revisa cambios y devoluciones del vendedor.",
      care: "Para cuidar una pieza, identifica primero el metal y el acabado de su ficha. En la guía explicamos cuidados para plata 925, baños y engastes.",
      gem: "La moissanita y el diamante son gemas distintas. La guía compara composición, apariencia y dureza sin presentarlas como equivalentes.",
      material: "En estas fichas, la montura suele ser plata esterlina 925; algunas variantes llevan acabado rodiado o baño de oro. El baño dorado no equivale a oro macizo.",
      fallback: "No encuentro una respuesta segura para esa pregunta dentro de la selección. Prueba con pendientes, anillos, pulseras, cadenas, corazón, Hamsa, cruz, acabado dorado, plata 925, regalo o cuidado.",
      productLink: "Ver ficha en Miles Jewellery",
      articleCare: "Leer la guía de materiales y cuidado",
      articleGem: "Comparar moissanita y diamante",
      articleLab: "Moissanita y diamante de laboratorio",
      articleGift: "Abrir la guía de regalos"
    },
    en: {
      empty: "Enter a category or question, for example earrings, rings, bracelets, chain or gold finish.",
      earrings: "For earrings, compare two-row huggies, square princess-cut studs and 3 mm round studs. Check the size and backing on the retailer page.",
      rings: "The edit includes a slim 3 mm ring and a bold 13 mm band. Miles lists US sizes; use the retailer's size guide to check the right conversion before buying.",
      bracelets: "The edit includes a 2–6 mm tennis bracelet and an 8 mm star design. Check available lengths and measure your wrist on the retailer page.",
      chain: "The moissanite tennis chain offers 2–6.5 mm widths and 16–24 inch lengths. For pendants, check whether a chain is included or selected separately.",
      cross: "There are cross pendants in several styles and sizes. Important: the gold-colour option we verified is gold-plated 925 silver, not solid gold.",
      hamsa: "The catalogue includes a moissanite Hamsa hand pendant. Miles says the chain is selected separately; confirm variants and finish on the retailer page.",
      heart: "The catalogue includes a moissanite heart pendant in 925 silver. Check the finish options and whether a chain is included on the retailer page.",
      gold: "The verified gold-colour variants in this edit are gold-plated 925 silver, not solid gold. Confirm the specific finish on the variant you choose.",
      gift: "For a gift, a heart pendant or earrings avoid guessing a ring size. Check whether a chain is included and review the retailer's return terms.",
      care: "To care for a piece, first identify the metal and finish on its product page. Our guide covers 925 silver, plating and settings.",
      gem: "Moissanite and diamond are different gemstones. The guide compares composition, appearance and hardness without treating them as interchangeable.",
      material: "These product listings generally specify 925 sterling silver; some variants have rhodium or gold-plated finishes. A gold-plated finish is not solid gold.",
      fallback: "I can't find a reliable answer in this edit. Try earrings, rings, bracelets, chain, heart, Hamsa, cross, gold finish, 925 silver, gift or care.",
      productLink: "View at Miles Jewellery",
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
    const has = (...words) => words.some((word) => q.includes(word));
    if (!q.trim()) return { key: "empty", ids: [] };
    if (has("cuidado", "limpiar", "limpieza", "care", "clean")) return { key: "care", ids: [], article: "care" };
    const asksAboutGemstones = has("diamante", "diamond", "lab grown", "laboratorio", "diferencia", "comparar", "compare", "vs", "simulante") ||
      ((has("moissanita", "moissanite") && has("que es", "what is", "como se compara", "se diferencia")));
    if (asksAboutGemstones) return { key: "gem", ids: [], article: "gem" };
    if (has("regalo", "regalar", "gift", "cumple", "aniversario")) return { key: "gift", ids: ["miles-heart-pendant", "miles-huggie-2row", "miles-earrings-stud-3mm"], article: "gift" };
    if (has("oro", "dorado", "chapado", "gold", "plated")) return { key: has("cruz", "cross") ? "cross" : "gold", ids: ["miles-cross-gold-iced", "miles-huggie-2row", "miles-ring-13mm"] };
    if (has("hamsa", "mano")) return { key: "hamsa", ids: ["miles-hamsa-pendant"] };
    if (has("cruz", "cross")) return { key: "cross", ids: ["miles-cross-necklace", "miles-cross-gold-iced", "miles-cross-2mm"] };
    if (has("corazon", "heart")) return { key: "heart", ids: ["miles-heart-pendant"], article: "gift" };
    if (has("pendiente", "pendientes", "aro", "aros", "huggie", "earring", "stud")) return { key: "earrings", ids: ["miles-huggie-2row", "miles-princess-studs", "miles-earrings-stud-3mm"] };
    if (has("anillo", "anillos", "ring", "rings", "talla")) return { key: "rings", ids: ["miles-ring-tennis-3mm", "miles-ring-13mm"] };
    if (has("pulsera", "pulseras", "brazalete", "bracelet", "wrist")) return { key: "bracelets", ids: ["miles-tennis-bracelet", "miles-bracelet-star-8mm"] };
    if (has("cadena", "collar", "colgante", "necklace", "pendant", "chain")) return { key: "chain", ids: ["miles-tennis-chain", "miles-cross-necklace", "miles-heart-pendant"] };
    if (has("plata", "silver", "925", "material", "metal")) return { key: "material", ids: ["miles-huggie-2row", "miles-princess-studs", "miles-tennis-chain"], article: "care" };
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
        const card = [...document.querySelectorAll("[data-affiliate-card]")].find((item) => item.dataset.productId === id);
        if (!card) return;
        const productLink = card.querySelector(".product-buy");
        const image = card.querySelector(".product-image img");
        const title = card.querySelector("h3");
        if (!productLink || !image || !title) return;

        const link = document.createElement("a");
        link.className = "assistant-product";
        link.href = productLink.href;
        link.target = "_blank";
        link.rel = "sponsored nofollow noopener noreferrer";
        const thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.loading = "lazy";
        thumb.decoding = "async";
        const label = document.createElement("span");
        label.textContent = title.textContent;
        const action = document.createElement("small");
        action.textContent = copy.productLink;
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
