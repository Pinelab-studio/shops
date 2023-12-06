const fs = require('fs');

function createProductFeed(domain, products, feedUrl) {
  const productXML = products
    .map((product) => {
      let description = product.description;
      description = description.replace(/<[^>]*>?/gm, ' '); // replace html
      description = description.replace(/&nbsp;/g, ' '); // replace &nbsp;
      description.replace(/\s\s+/g, ' '); // replace double spaces
      return `
        <item>
            <g:id>product_${product.id}</g:id>
            <g:title><![CDATA[${product.name}]]></g:title>
            <g:description><![CDATA[${description}]]></g:description>
            <g:link>${domain}${product.url}</g:link> 
            <g:image_link>${
              product.featuredAsset?.preview ?? product.featuredAsset?.thumbnail
            }
            </g:image_link> 
            <g:condition>new</g:condition>
            <g:availability>in stock</g:availability>
            <g:price>£${product.lowestPrice}</g:price>
            <g:gtin><![CDATA[${product.slug}-${product.id}]]></g:gtin>
            <g:mpn><![CDATA[${product.slug}-${product.id}]]></g:mpn>
        </item>
    `;
    })
    .join('\n');
  fs.writeFileSync(
    `./static/${feedUrl}`,
    `<?xml version="1.0" encoding="UTF-8"?>
        <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
            <channel>
                <title>Wormenkwekerij Wass</title>
                <description>Google Product Feed van Wormenkwekerij</description>
                ${productXML}
            </channel>
        </rss>
`
  );
}

module.exports = {
  createProductFeed,
};
