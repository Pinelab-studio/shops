function toOrderLineItem(line) {
  return {
    item_id: line.productVariant.sku,
    item_name: line.productVariant.name,
    quantity: line.quantity,
    price: line.productVariant.priceWithTax / 100,
  };
}

/**
 * Track purchase of an order
 * @param order
 * @param {string} currencyCode
 */
export function trackPurchase(order, currencyCode) {
  const items = order.lines.map((line) => toOrderLineItem(line));
  window?.dataLayer?.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: order.id,
      value: (order.totalWithTax / 100).toFixed(2),
      currency: currencyCode,
      items,
    },
  });
}

/**
 * Track add to item event
 * @param order
 * @param {string} currencyCode
 */
export function trackViewItem(order, currencyCode) {
  const item = toOrderLineItem(line);
  window?.dataLayer?.push({
    event: 'view_item',
    ecommerce: {
      value: (order.totalWithTax / 100).toFixed(2),
      currency: currencyCode,
      items,
    },
  });
}
