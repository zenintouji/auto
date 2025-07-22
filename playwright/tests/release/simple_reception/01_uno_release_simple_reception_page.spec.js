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




  // await expect(page.getByText('간편접수').nth(0)).toBeVisible();
  // // 간편 접수 새 창 확인
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByText('간편접수').nth(0).click();
  // const page1 = await page1Promise;
  // await expect(page1.getByText('간편접수 확인')).toBeVisible();
  // // 간편접수 닫기
  // await expect(page1.getByRole('button').first()).toBeVisible();
  // await page1.getByRole('button').first().click();
  // await page.bringToFront();
  // // 다시 메인 페이지
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();

  

});
