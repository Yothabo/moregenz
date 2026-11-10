import assert from 'node:assert/strict';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const BASE_URL = 'http://127.0.0.1:5173';
const CHROME = '/data/data/com.termux/files/usr/bin/chromium-browser';
const CHROMEDRIVER = '/data/data/com.termux/files/usr/bin/chromedriver';

const options = new chrome.Options();
options.setChromeBinaryPath(CHROME);
options.addArguments(
  '--headless=new',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--disable-background-networking',
  '--no-first-run'
);

const service = new chrome.ServiceBuilder(CHROMEDRIVER);

let driver;

function xpathLiteral(value) {
  if (!value.includes("'")) return `'${value}'`;
  if (!value.includes('"')) return `"${value}"`;

  return `concat(${value.split("'").map((part, index) =>
    `${index ? `,"'",` : ''}'${part}'`
  ).join(',')})`;
}

async function getCatalogue(store) {
  const response = await fetch(
    `${BASE_URL}/api/products?storefront=${store}`
  );

  assert.equal(response.status, 200, `${store} API must return HTTP 200`);

  const result = await response.json();
  assert.ok(Array.isArray(result.products), `${store} must return a products array`);
  assert.ok(result.products.length > 0, `${store} must have products`);

  return result.products
    .filter(product => product.is_active)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

async function waitForBodyText(value) {
  await driver.wait(async () => {
    const body = await driver.findElement(By.css('body')).getText();
    return body.includes(value);
  }, 45000, `Expected page text: ${value}`);
}

async function readCart(key) {
  return driver.executeScript(
    'return JSON.parse(localStorage.getItem(arguments[0]) || "[]")',
    key
  );
}

async function waitForCartItem(key, productId) {
  await driver.wait(async () => {
    const items = await readCart(key);
    return items.some(item => item.id === productId);
  }, 15000, `Product ${productId} was not saved to ${key}`);
}

async function addFirstProduct(store, product) {
  await driver.get(`${BASE_URL}/${store}/catalog`);

  await driver.wait(
    until.elementLocated(By.css('h4')),
    45000,
    `${store} catalogue did not render product cards`
  );

  const title = await driver.wait(
    until.elementLocated(
      By.xpath(`//h4[normalize-space(.)=${xpathLiteral(product.name)}]`)
    ),
    15000,
    `Expected newest product "${product.name}" was not displayed`
  );

  await title.click();

  const addButton = await driver.wait(
    until.elementLocated(
      By.xpath("//button[contains(., 'Add to Cart')]")
    ),
    15000,
    'Product modal did not open'
  );

  await addButton.click();

  const key = `${store}-cart`;
  await waitForCartItem(key, product.id);

  const items = await readCart(key);
  const added = items.find(item => item.id === product.id);

  assert.equal(added.quantity, 1, `${store} product should start at quantity 1`);

  console.log(`PASS: ${store} product added through the UI: ${product.name}`);
}

async function verifyCart(store, product) {
  await driver.get(`${BASE_URL}/${store}/cart`);
  await waitForBodyText(product.name);

  let items = await readCart(`${store}-cart`);
  assert.ok(items.some(item => item.id === product.id));

  await driver.navigate().refresh();
  await waitForBodyText(product.name);

  items = await readCart(`${store}-cart`);
  assert.ok(items.some(item => item.id === product.id));

  console.log(`PASS: ${store} cart survives page refresh`);
}

async function run() {
  const catalogues = {
    yotaabo: await getCatalogue('yotaabo'),
    poshies: await getCatalogue('poshies'),
  };

  console.log('Yotaabo active products:', catalogues.yotaabo.length);
  console.log('Poshies active products:', catalogues.poshies.length);

  const yotaaboIds = new Set(catalogues.yotaabo.map(product => product.id));
  const poshiesIds = new Set(catalogues.poshies.map(product => product.id));

  assert.ok(
    catalogues.yotaabo.every(product => !poshiesIds.has(product.id)),
    'Yotaabo API contains product IDs assigned to Poshies'
  );

  assert.ok(
    catalogues.poshies.every(product => !yotaaboIds.has(product.id)),
    'Poshies API contains product IDs assigned to Yotaabo'
  );

  console.log('PASS: API product IDs are isolated between storefronts');

  await addFirstProduct('yotaabo', catalogues.yotaabo[0]);
  await verifyCart('yotaabo', catalogues.yotaabo[0]);

  await driver.get(`${BASE_URL}/poshies/cart`);
  await waitForBodyText('Your cart is empty.');

  assert.equal((await readCart('poshies-cart')).length, 0);
  console.log('PASS: Yotaabo cart does not populate Poshies cart');

  await addFirstProduct('poshies', catalogues.poshies[0]);
  await verifyCart('poshies', catalogues.poshies[0]);

  await driver.get(`${BASE_URL}/yotaabo/cart`);
  await waitForBodyText(catalogues.yotaabo[0].name);

  assert.ok(
    (await readCart('yotaabo-cart')).some(
      item => item.id === catalogues.yotaabo[0].id
    )
  );

  console.log('PASS: Poshies activity does not overwrite Yotaabo cart');

  await driver.get(`${BASE_URL}/poshies/cart`);
  await waitForBodyText(catalogues.poshies[0].name);

  assert.ok(
    (await readCart('poshies-cart')).some(
      item => item.id === catalogues.poshies[0].id
    )
  );

  console.log('PASS: Both storefront carts retain their own products');
  console.log('\nALL STOREFRONT E2E CHECKS PASSED');
}

try {
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  await driver.manage().setTimeouts({
    implicit: 0,
    pageLoad: 45000,
    script: 15000,
  });

  await driver.manage().window().setRect({
    width: 1365,
    height: 900,
    x: 0,
    y: 0,
  });

  await run();
} catch (error) {
  console.error('\nSTOREFRONT E2E FAILED');
  console.error(error.stack || error.message);
  process.exitCode = 1;
} finally {
  if (driver) await driver.quit();
}
