const BASE_URL = `http://localhost:${process.env.PORT || 9527}`;

describe('login', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });

  beforeEach(async () => {
    console.log(`go to ${BASE_URL}/#/user/login`);
    await page.goto(`${BASE_URL}/#/user/login`, {
      waitUntil: 'networkidle2'
    });
  });

  afterEach(async () => {
    await page.waitFor(1500);
  });

  it('should login with success', async () => {
    console.log('start to test login with success');
    await page.waitForSelector('#normal_login_username', {
      timeout: 2000
    });
    await page.type('#normal_login_username', 'admin');
    await page.type('#normal_login_password', '123');
    await page.click('button[type="submit"]');
    console.log('wait for selector .ant-message-success');
    await page.waitForSelector('.ant-message-success');
  });

  it('should login with failure', async () => {
    console.log('start to test login with failure');
    await page.waitForSelector('#normal_login_username', {
      timeout: 2000
    });
    await page.type('#normal_login_username', 'wrong_user');
    await page.type('#normal_login_password', 'wrong_password');
    await page.click('button[type="submit"]');
    console.log('wait for selector .ant-message-error');
    await page.waitForSelector('.ant-alert-error');
  });
});
