const BASE_URL = `http://localhost:${process.env.PORT || 9527}`;

describe('404', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
    await page.goto(`${BASE_URL}/#/user/login`);
    await page.type('#normal_login_username', 'admin');
    await page.type('#normal_login_password', '123');
    await page.click('button[type="submit"]');
  });

  it(`test route 404`, async () => {
    await page.goto(`${BASE_URL}/#/23333333`);
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.getElementsByTagName('h1')[0].innerText);
    expect(text).toContain('404');
  });
});
