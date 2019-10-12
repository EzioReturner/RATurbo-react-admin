const puppeteer = require('puppeteer');
const BASE_URL = `http://localhost:${process.env.PORT || 9527}`;

describe('login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${BASE_URL}/#/user/login`, {
      waitUntil: 'networkidle2'
    });
  });

  afterEach(() => page.close());

  it('should login with failure', async () => {
    await page.waitFor(selector => !!document.querySelector('#login_userName'), {
      timeout: 3000
    });
    await page.type('#login_userName', 'wrong_user');
    await page.type('#login_password', 'wrong_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.anticon-close-circle');
  });

  it('should login with success', async () => {
    await page.waitFor(selector => !!document.querySelector('#login_userName'), {
      timeout: 3000
    });
    await page.type('#login_userName', 'admin');
    await page.type('#login_password', '123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-message-success');
  });

  afterAll(() => browser.close());
});
