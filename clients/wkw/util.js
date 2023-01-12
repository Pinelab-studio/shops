module.exports = {
  /**
   * Optimizes a collection for menu display to save KB size
   */
  mapToMinimalCollection: function mapToMinimalCollection(col) {
    return {
      id: col.id,
      slug: col.slug,
      url: col.url,
      name: col.name,
      featuredAsset: col.featuredAsset,
      parent: col.parent ? mapToMinimalCollection(col.parent) : undefined,
      children: col.children
        ? col.children.map(mapToMinimalCollection)
        : undefined,
    };
  },
  mapToMinimalPage: function (page) {
    return {
      title: page.titel,
      slug: page.slug,
      language: page.language,
    };
  },
  mapToMinimalBlogPage: function (blog) {
    return {
      slug: blog.slug,
      title: blog.titel,
      language: blog.language,
      image: blog.featured_image,
      url: blog.url,
    };
  },
  /**
   * Set the full path of a product or collection on item.url
   */
  setFullUrl: function (itemWithSlug, prefixPath) {
    itemWithSlug.url = `/${prefixPath}/${itemWithSlug.slug}/`.replaceAll(
      '//',
      '/'
    ); // replace all double slashes
  },
};
