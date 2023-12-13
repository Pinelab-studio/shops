const fs = require('fs');

function formatEuro(value) {
  if (!value) {
    value = 0;
  }
  const formattedValue = Math.abs(value / 100).toFixed(2);
  return `${formattedValue} EUR`;
}

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
            <g:price>${formatEuro(product.lowestPrice)}</g:price>
        </item>
    `;
    })
    .join('\n');
  fs.writeFileSync(
    `./static/${feedUrl}`,
    `<?xml version="1.0" encoding="UTF-8"?>
        <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
            <channel>
                <title>Wormenkwekerij Wasse</title>
                <description>Google Product Feed van Wormenkwekerij Wasse</description>
                ${productXML}
            </channel>
        </rss>
`
  );
}

module.exports = {
  createProductFeed,
};
