const BASE_URL = `http://localhost:${process.env.PORT || 9527}`;

describe('login', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });

  beforeEach(async () => {
    await page.goto(`${BASE_URL}/#/user/login`, {
      waitUntil: 'networkidle2'
    });
  });

  afterEach(async () => {
    await page.waitFor(1000);
  });

  it('should login with success', async () => {
    await page.waitForSelector('#normal_login_username', {
      timeout: 2000
    });
    await page.type('#normal_login_username', 'admin');
    await page.type('#normal_login_password', '123');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-message-success');
  });

  it('should login with failure', async () => {
    await page.waitForSelector('#normal_login_username', {
      timeout: 2000
    });
    await page.type('#normal_login_username', 'wrong_user');
    await page.type('#normal_login_password', 'wrong_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error');
  });
});
