import puppeteer from 'puppeteer';

describe('logind', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:9527/#/user/login', {
      waitUntil: 'networkidle2',
    });
  });

  afterEach(() => page.close());

  it('should login with failure', async () => {
    await page.waitFor(selector => !!document.querySelector('#login_userName'), {
      timeout: 3000,
    });
    await page.type('#login_userName', 'wrong_user')
    await page.type('#login_password', 'wrong_password')
    await page.click('button[type="submit"]')
    await page.waitForSelector('.anticon-close-circle') // should display error
  })

  afterAll(() => browser.close())
})