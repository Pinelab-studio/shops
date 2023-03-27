require('dotenv').config();
const isLocal = process.env.TESTENV === 'local';
let orderId;
const site = isLocal ? 'http://localhost:8080' : 'https://minishop.studio';
const vendure = isLocal
  ? 'http://localhost:3000/admin/'
  : 'https://test-api.pinelab.studio/admin/';
console.log(`Running test against ${site} and ${vendure}`);
const address = {
  firstName: 'Martijn',
  lastName: 'Pinelab',
  phone: '06123456788',
  email: 'martijn@pinelab.studio',
  postalCode: '1013 MM',
  houseNr: '159',
  street: 'IJdok',
  city: 'Amsterdam',
  country: 'Nederland',
  note: 'Custom note for shop owner',
};
const prices = {
  itemFE: '67,50',
  subtotalFE: '67,50',
  shippingOutsideEU: '14,-',
  totalOutsideEU: '74,15',
  shippingFE: '5,-',
  totalFE: '65,75',
  dicountWithTaxFE: '- €6,75',
  itemBE: '67.50',
  itemWithoutTaxBE: '61.93',
  shippingWithoutTaxBE: '4.59',
  totalBE: '65.75',
  totalWithoutTaxBE: '60.32',
  dicountWithTaxBE: '-€6.75',
  tax: '9%',
};

module.exports = {
  'Customer checkout': function (browser) {
    const theJaunt = 'img[alt="The Jaunt"]';
    const edition = 'button[aria-label="Edition Laura Berger"]';
    const buyButton = 'button[aria-label="Add to cart"]';
    const checkoutSnackbar =
      'body > div.notices.is-top > div > div.action.is-light > button';
    const couponField = 'input[placeholder="Kortingscode"]';
    const orderNowButton = 'a[href="/checkout/"]';
    const customerForm = {
      firstname: 'input[placeholder="Voornaam*"]',
      lastname: 'input[placeholder="Achternaam*"]',
      phone: 'input[placeholder="Telefoonnr."]',
      email: 'input[placeholder="Email adres*"]',
      postalCode: 'input[placeholder="Postcode*"]',
      houseNr: 'input[placeholder="Huisnr.*"]',
      street: 'input[placeholder="Straat*"]',
      city: 'input[placeholder="Plaats*"]',
      note: '[placeholder="Notitie"]',
      submit: 'button[type="submit"]',
    };
    const ideal = 'button[value="ideal"]';
    const ing = 'button[value="ideal_INGBNL2A"]';
    const paid = 'input[value="paid"]';
    const continueBtn = 'button[class="button form__button"]';
    browser
      .url(site)
      .waitForElementVisible(theJaunt)
      .click(theJaunt)
      .waitForElementVisible(edition)
      .click(edition)
      .click(buyButton)
      .waitForElementVisible(checkoutSnackbar)
      .click(checkoutSnackbar)
      .waitForElementVisible(orderNowButton)
      .pause(500)
      // Coupon
      .setValue(couponField, 'GIMME10')
      .pause(1000)
      .assert.containsText('body', '- €6,75')
      // Customer details
      .click(orderNowButton)
      .waitForElementVisible(customerForm.firstname)
      .pause(500)
      .setValue(customerForm.firstname, address.firstName)
      .setValue(customerForm.lastname, address.lastName)
      .setValue(customerForm.phone, address.phone)
      .setValue(customerForm.email, address.email)
      .setValue(customerForm.postalCode, address.postalCode)
      .setValue(customerForm.houseNr, address.houseNr)
      .setValue(customerForm.note, address.note)
      .pause(200)
      .assert.value(customerForm.city, address.city)
      .assert.value(customerForm.street, address.street)
      .pause(200)
      .click('select[name="country"] option[value="AT"]')
      .pause(200)
      .click(customerForm.submit)
      .pause(200)
      // Shipping
      .pause(500)
      .useXpath()
      .click("//*[contains(text(), 'Verzenden (€14,-)')]")
      .useCss()
      .assert.containsText('body', prices.totalOutsideEU)
      // Back to customer details
      .click('button[aria-label="back to customer details"]')
      .waitForElementVisible(customerForm.firstname)
      .pause(500)
      .click('select[name="country"] option[value="nl"]')
      .pause(200)
      .click(customerForm.submit)
      .pause(1000)
      // Shipping
      .useXpath()
      .click("//*[contains(text(), 'Verzenden (€5,-)')]")
      .useCss()
      .assert.containsText('body', prices.totalFE)
      // Payment
      .click('button[aria-label="submit shippingmethod"]')
      .assert.containsText('body', prices.subtotalFE)
      .assert.containsText('body', prices.shippingFE)
      .assert.containsText('body', prices.dicountWithTaxFE)
      .assert.containsText('body', prices.totalFE)
      .pause(500)
      .click('button[aria-label="go to payment"]')
      .pause(500)
      .waitForElementVisible(ideal, 10000)
      .click(ideal)
      .waitForElementVisible(ing)
      .click(ing)
      .waitForElementVisible(paid)
      .click(paid)
      .click(continueBtn)
      .pause(500)
      .url(({ value }) => {
        orderId = value.replace(`https://minishop.studio/order/`, '');
      })
      .assert.containsText('body', prices.subtotalFE)
      .assert.containsText('body', prices.shippingFE)
      .assert.containsText('body', prices.dicountWithTaxFE)
      .assert.containsText('body', prices.totalFE)
      .end();
  },
  'Vendure backoffice': function (browser) {
    const username = 'input[id="login_username"]';
    const password = 'input[id="login_password"]';
    const orderTab = 'a[href="/admin/orders"]';
    const submit = 'button[type="submit"]';
    const invoicesTab = 'a[href="/admin/extensions/invoices"]';
    browser
      .url(vendure)
      .waitForElementVisible(username)
      .setValue(username, process.env.VENDURE_USERNAME)
      .setValue(password, process.env.VENDURE_PASSWORD)
      .click(submit)
      .waitForElementVisible(orderTab)
      .click(orderTab)
      .assert.containsText('body', orderId)
      .pause(500)
      .useXpath()
      .click("//a[text()=' Open ']")
      .useCss()
      .assert.containsText('body', address.firstName)
      .assert.containsText('body', address.lastName)
      .assert.containsText('body', address.city)
      .assert.containsText('body', address.postalCode)
      .assert.containsText('body', address.street)
      .assert.containsText('body', address.houseNr)
      .assert.containsText('body', address.country)
      .assert.containsText('body', address.phone)
      .assert.containsText('body', prices.itemBE)
      .assert.not.containsText('body', '21%')
      .assert.containsText('body', prices.itemWithoutTaxBE)
      .assert.containsText('body', prices.shippingWithoutTaxBE)
      .assert.containsText('body', prices.totalBE)
      .assert.containsText('body', prices.totalWithoutTaxBE)
      .assert.containsText('body', prices.dicountWithTaxBE)
      .pause(500)
      .useXpath()
      .click("//button[text()=' Fulfill order ']")
      .pause(500)
      .useCss()
      .click('button[type="submit"]')
      .assert.containsText('body', 'Created fulfillment')
      .pause(3000) // Delay because async job
      .click(invoicesTab)
      .assert.containsText('body', orderId)
      .end();
  },
};
