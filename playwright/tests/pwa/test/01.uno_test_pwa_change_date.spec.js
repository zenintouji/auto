import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  // web setting =>
//   viewport: {
//     height: 1080,
//     width: 1920
//   }
  // mobile setting =>
  viewport: { width: 820, height: 1180 }, // ipad 크기로 진행해봄
  deviceScaleFactor: 2, // 고해상도 디스플레이
  isMobile: true, // 모바일 환경으로 인식 ㄱㄱ
  hasTouch: true, // 터치 지원
});

test('test', async ({ page }) => {
  await page.goto('https://app.test.unocare.co.kr/login'); // 로그인 화면
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일' }).click();
  await page.getByRole('textbox', { name: '이메일' }).fill('dev@test.com');
  await expect(page.getByRole('textbox', { name: '●●●●●●●●' })).toBeVisible();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).fill('asdf1234!');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 
  await expect(page.getByRole('button', { name: '+ 고객 등록' })).toBeVisible();
  // 날짜 변경 (임의로 변경 해봄)
  await expect(page.locator('div[placeholder="날짜선택"]')).toBeVisible();
  await page.locator('div[placeholder="날짜선택"]').click();
  await expect(page.getByText('1', { exact: true }).nth(0)).toBeVisible(); // 1일로 선택
  await page.getByText('1', { exact: true }).nth(0).click();
  // 1일 선택 값이 잘 들어갔는지 확인
  await expect(page.locator('[placeholder="날짜선택"]')).toHaveText(/1/);
  // 오늘 버튼 선택
  await expect(page.getByRole('button', { name: '오늘' })).toBeVisible();
  await page.getByRole('button', { name: '오늘' }).click();
  const today = new Date();
  const formatDate = (date) => { return date.toISOString().split('T')[0].replace(/-/g, '.'); };
  const todayStr = formatDate(today);
  await expect(page.getByRole('banner').locator('div').filter({ hasText: `오늘${todayStr}` }).first()).toBeVisible();



});