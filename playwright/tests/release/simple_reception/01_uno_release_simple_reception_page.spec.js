import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('jwpark@v2test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForTimeout(1000);
  // 메인 화면 진입
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByText('간편접수').nth(0)).toBeVisible();
  // 간편 접수 새 창 확인
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('간편접수').nth(0).click();
  const page1 = await page1Promise;
  await expect(page1.getByText('간편접수 확인')).toBeVisible();
  // 간편접수 닫기
  await expect(page1.getByRole('button').first()).toBeVisible();
  await page1.getByRole('button').first().click();
  await page.bringToFront();
  // 다시 메인 페이지
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();

  

});
