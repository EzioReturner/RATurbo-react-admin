import 'regenerator-runtime/runtime';
import 'core-js/stable';

// const puppeteer = require('puppeteer');
const BASE_URL = `http://localhost:${process.env.PORT || 9527}`;

describe('login', () => {
  // let browser;
  // let page;

  beforeAll(async () => {
    jest.setTimeout(10000000);
    // console.log('Openning browser.');
    // browser = await puppeteer.launch();
    // console.log('New browser window opened.');
    // console.log('Openning new page...');
    // page = await browser.newPage();
  });

  // afterEach(() => {
  //   console.log('closing page...');
  //   page.close();
  // });

  beforeEach(async () => {
    // console.log('Openning new page...');
    // page = await browser.newPage();
    console.log(`go to ${BASE_URL}/#/user/login`);
    await page.goto(`${BASE_URL}/#/user/login`, {
      waitUntil: 'networkidle2'
    });
  });

  it('should login with success', async () => {
    console.log('start to test login with success');
    await page.waitFor(selector => !!document.querySelector('#login_userName'), {
      timeout: 2000
    });
    await page.type('#login_userName', 'admin');
    await page.type('#login_password', '123');
    await page.click('button[type="submit"]');
    console.log('wait for selector .ant-message-success');
    await page.waitForSelector('.ant-message-success', { timeout: 2000 });
  }, 666666);

  it('should login with failure', async () => {
    console.log('start to test login with failure');
    await page.waitFor(selector => !!document.querySelector('#login_userName'), {
      timeout: 2000
    });
    await page.type('#login_userName', 'wrong_user');
    await page.type('#login_password', 'wrong_password');
    await page.click('button[type="submit"]');
    console.log('wait for selector .ant-message-error');
    await page.waitForSelector('.anticon-close-circle', { timeout: 2000 });
  }, 666666);

  // afterAll(() => browser.close());
});
