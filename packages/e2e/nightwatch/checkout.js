/**
 * This test verifies if adding items to cart still works.
 * Adds item to cart, adds address, goes to Mollie without actually paying
 * Run specific case with `TESTCASE=cantastic yarn test:add-to-cart`
 */
const address = {
  firstName: 'Test',
  lastName: 'Test',
  phone: '06123456788',
  email: 'martijn@pinelab.studio',
  postalCode: '8923CP',
  houseNr: '33',
};
module.exports = {
  cantastic: function (browser) {
    browser
      .url('https://cantastic.netlify.app/product/loop-colors-400ml/')
      .useXpath()
      // Cookies
      .click("//span[contains(text(), 'Nee')]")
      .pause(2000)
      // Add 'White' to cart
      .click(
        '//*[@id="app"]/div/div/div/div[3]/div[1]/div[2]/div/div[2]/div/p[2]/button'
      )
      .pause(2000)
      .click("//button[contains(text(), 'Naar winkelmand')]")
      .pause(1000)
      .click("//a[contains(text(), 'Nu bestellen')]")
      .useCss()
      .pause(1000)
      .setValue('input[aria-label="firstname"]', address.firstName)
      .pause(200)
      .setValue('input[aria-label="lastname"]', address.lastName)
      .pause(200)
      .setValue('input[aria-label="phonenumber"]', address.phone)
      .pause(200)
      .setValue('input[aria-label="emailaddress"]', address.email)
      .pause(200)
      .setValue('input[aria-label="postalcode"]', address.postalCode)
      .pause(200)
      .setValue('input[aria-label="housenumber"]', address.houseNr)
      .pause(4000)
      .click('button[aria-label="submit form"]')
      .pause(1000)
      .click('label[id="shippingmethod 0"]')
      .pause(1000)
      .click('button[aria-label="submit shippingmethod"]')
      .pause(1000)
      .click('button[aria-label="go to payment"]')
      .pause(1000)
      .click('button[value="ideal"]')
      .end();
  },
  wkw: function (browser) {
    browser
      .url('https://wormenkwekerijwasse.nl/product/lavameel-1000-kg-bigbag/')
      .useXpath()
      // Cookies
      .click("//span[contains(text(), 'Nee')]")
      .pause(2000)
      // Add 'Lavameel' to cart
      .useCss()
      .click('button[aria-label="In winkelmand"]')
      .useXpath()
      .pause(2000)
      .click("//button[contains(text(), 'Naar winkelmand')]")
      .pause(1000)
      .click("//a[contains(text(), 'Bestellen')]")
      .useCss()
      .pause(1000)
      .setValue('input[aria-label="firstname"]', address.firstName)
      .pause(200)
      .setValue('input[aria-label="lastname"]', address.lastName)
      .pause(200)
      .setValue('input[aria-label="phonenumber"]', address.phone)
      .pause(200)
      .setValue('input[aria-label="emailaddress"]', address.email)
      .pause(200)
      .setValue('input[aria-label="postalcode"]', address.postalCode)
      .pause(200)
      .setValue('input[aria-label="housenumber"]', address.houseNr)
      .pause(4000)
      .click('button[aria-label="submit form"]')
      .pause(1000)
      .click('label[id="shippingmethod 0"]')
      .pause(1000)
      .click('button[aria-label="submit shippingmethod"]')
      .pause(1000)
      .click('button[aria-label="go to payment"]')
      .pause(1000)
      .click('button[value="ideal"]')
      .end();
  },
};
