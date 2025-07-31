import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { SimpleReception } from '../../../pages/SimpleReception';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Simple Reception > Enter Modal', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const simpleReception = new SimpleReception(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  // 팝업 처리 
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // 배너 처리
  await page.waitForTimeout(1000);
  await exception.closeBannerIfExists();

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  await simpleReception.enterInSimplReception();
  await simpleReception.closeSimpleReceptionModal();
  
  await simpleReception.checkMovedToMain();

});
