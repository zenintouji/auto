import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');
  // await loginPage.login('dev@test.com', '12341234');
  // await loginPage.login('dev@test.com', 'uunn2345%%');

  // 팝업 처리 
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // const popupButton = page.getByText('오늘하루 보지않기');
  // if (await popupButton.isVisible()) {
  //   await popupButton.click();
  // }

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  // // 테스트 용

  // await expect(page.getByRole('button', { name: 'icon-calendar 예약 캘린더' })).toBeVisible();
  // await page.getByRole('button', { name: 'icon-calendar 예약 캘린더' }).click();

  // await page.locator('div').filter({ hasText: /^신안주영\/F\/만 30세$/ }).nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();

  // // 확인하고
  // await expect(page.getByRole('menuitem', { name: '상담대기' })).toBeVisible();

  // await page.getByRole('menuitem', { name: '상담대기' }).click();
  // // await page.waitForTimeout(50);
  // await page.getByRole('menuitem', { name: '상담대기' }).click();




  
});