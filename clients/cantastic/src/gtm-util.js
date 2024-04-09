function toOrderLineItem(line) {
  return {
    item_id: line.productVariant.sku,
    item_name: line.productVariant.name,
    quantity: line.quantity,
    price: line.proratedUnitPriceWithTax / 100,
  };
}

/**
 * Track purchase of an order
 * @param order
 * @param {string} currencyCode
 */
export function trackPurchase(order, currencyCode) {
  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
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

export function trackViewItem(name, sku, unitPriceWithTax, currencyCode) {
  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window?.dataLayer?.push({
    event: 'view_item',
    ecommerce: {
      value: (unitPriceWithTax / 100).toFixed(2),
      currency: currencyCode,
      items: [
        {
          item_id: sku,
          item_name: name,
          quantity: 1,
          price: unitPriceWithTax / 100,
        },
      ],
    },
  });
}

export function trackAddToCart(
  name,
  sku,
  unitPriceWithTax,
  quantity,
  currencyCode
) {
  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
  window?.dataLayer?.push({
    event: 'add_to_cart',
    ecommerce: {
      value: ((unitPriceWithTax * quantity) / 100).toFixed(2),
      currency: currencyCode,
      items: [
        {
          item_id: sku,
          item_name: name,
          quantity: quantity,
          price: unitPriceWithTax / 100,
        },
      ],
    },
  });
}

export function trackBeginCheckout(order, currencyCode) {
  window?.dataLayer?.push({ ecommerce: null }); // Clear the previous ecommerce object.
  const items = order.lines.map((line) => toOrderLineItem(line));
  window?.dataLayer?.push({
    event: 'begin_checkout',
    ecommerce: {
      transaction_id: order.id,
      value: (order.totalWithTax / 100).toFixed(2),
      currency: currencyCode,
      items,
    },
  });
}
