import { test, expect } from '@playwright/test';
import { LogoutPage } from '../../../pages/LogoutPage';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Logout Test ', async ({ page }) => {
  const logoutPage = new LogoutPage(page); 

  // 로그인 페이지 접속
  await logoutPage.goto();

  // 로그인
  await logoutPage.login('jwpark@v2test.com','uunn2345%%'); 

  // 메인 화면 접속 확인
  await page.waitForTimeout(2000);
  expect(await logoutPage.isLoggedIn()).toBeTruthy();

  // 로그아웃
  await logoutPage.logout();
  await logoutPage.LoggedOutSuccessCheeck();

  // 로그아웃 확인
  await page.waitForTimeout(2000);
  expect(await logoutPage.isLoggedOut()).toBeTruthy();

});