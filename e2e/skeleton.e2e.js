import { asyncRouteConfig } from '../src/config/router.config';

const BASE_URL = `http://localhost:${process.env.PORT || 9527}`;

function formatter(routes) {
  return routes.reduce((total, info) => {
    info.routes ? total.push(...formatter(info.routes)) : total.push(info.path);
    return total;
  }, []);
}

describe('mainLayout', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
    await page.goto(`${BASE_URL}/#/user/login`);
    await page.type('#normal_login_username', 'admin');
    await page.type('#normal_login_password', '123');
    await page.click('#login_button');
  });

  afterEach(async () => {
    await page.waitFor(1000);
  });

  const testPage = path => async () => {
    await page.goto(`${BASE_URL}/#${path}`);
    await page.waitForSelector('footer', {
      timeout: 2000
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0
    );
    expect(haveFooter).toBeTruthy();
  };

  const routes = formatter(asyncRouteConfig);

  routes.forEach(route => {
    it(`test pages ${route}`, testPage(route));
  });
});
