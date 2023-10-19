/**
 * Set html color on variant.bgColor and
 * inverted color for variant.textColor
 * for all variants of swatchable products
 */
function setSwatchColors(swatches, product, facetCode, defaultColor) {
  let colorChart = swatches.find(
    (swatch) => swatch.swatch_naam === facetCode
  )?.html_colors;
  if (!colorChart) {
    throw Error(
      `No colorChart found for product ${product.name} with name '${facetCode}.json'`
    );
  }
  try {
    colorChart = JSON.parse(colorChart);
  } catch (e) {
    throw Error(`Swatch '${facetCode}' from directus is not a valid JSON`);
  }
  product.variants.forEach((variant) => {
    variant.bgColor = Object.entries(colorChart).find(
      ([key, value]) =>
        key.toLowerCase() === variant.options?.[0]?.name.toLowerCase()
    )?.[1];
    if (!variant.bgColor) {
      console.error(
        `No color found for ${variant.options?.[0]?.name} (${variant.name}) in swatch ${facetCode}, using ${defaultColor}`
      );
      variant.bgColor = defaultColor;
    }
    variant.textColor = getContrastingColor(variant.bgColor);
  });
  product.variants = sortByColorChart(product.variants, colorChart);
}

/**
 * Sort variants based on the defined order in colorChart
 * Undefined colors are moved to bottom
 */
function sortByColorChart(variants, colorChart) {
  const orderedColors = Object.keys(colorChart).map((key) => key.toLowerCase());
  return variants.sort((a, b) => {
    const posA = orderedColors.indexOf(a.options[0].name.toLowerCase());
    const posB = orderedColors.indexOf(b.options[0].name.toLowerCase());
    if (posB === -1) {
      return -1; // If no posB, move A up
    } else if (posA === -1) {
      return 1; // If no posA, move B up
    } else {
      return posA - posB;
    }
  });
}

/**
 * Determine black or white contrast depending on given background color
 */
function getContrastingColor(bgColor) {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff';
}

/**
 * Optimizes a product for card previews to save KB size
 */
function mapToMinimalProduct(product) {
  const variants = product.variants.map((v) => ({
    id: v.id,
    priceWithTax: v.priceWithTax,
  }));
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    variants,
    featuredAsset: product.featuredAsset,
    facetValues: product.facetValues,
    soldOut: product.soldOut,
    lowestPrice: product.lowestPrice,
    category: product.category,
  };
}

/**
 * Optimizes a blog for card previews to save KB size
 */
function mapToMinimalBlog(blog) {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    featured_image: blog.featured_image,
    date_created: blog.date_created,
    user_created: blog.user_created,
    description: blog.description,
  };
}

/**
 * Optimizes a page for card previews to save KB size
 */
function mapToMinimalPage(page) {
  return {
    slug: page.slug,
    title: page.title,
  };
}

/**
 * Optimizes a collection for menu display to save KB size
 */
function mapToMinimalCollection(col) {
  return {
    id: col.id,
    slug: col.slug,
    name: col.name,
    featuredAsset: col.featuredAsset,
    parent: col.parent ? mapToMinimalCollection(col.parent) : undefined,
    children: col.children
      ? col.children.map(mapToMinimalCollection)
      : undefined,
  };
}

module.exports = {
  setSwatchColors,
  sortByColorChart,
  getContrastingColor,
  mapToMinimalProduct,
  mapToMinimalBlog,
  mapToMinimalPage,
  mapToMinimalCollection,
};
