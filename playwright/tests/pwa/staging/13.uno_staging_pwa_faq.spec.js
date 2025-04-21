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
  await page.goto('https://app.staging.unocare.co.kr/login'); // 로그인 화면
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일' }).click();
  await page.getByRole('textbox', { name: '이메일' }).fill('dev@test.com');
  await expect(page.getByRole('textbox', { name: '●●●●●●●●' })).toBeVisible();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 
  await expect(page.getByRole('button', { name: '+ 고객 등록' })).toBeVisible();
  // 메뉴
  await expect(page.getByRole('button', { name: 'menu' })).toBeVisible();
  await page.getByRole('button', { name: 'menu' }).click();
  // 메뉴 닫기
  await expect(page.getByRole('button').filter({ hasText: /^$/ })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  // 메뉴
  await expect(page.getByRole('button', { name: 'menu' })).toBeVisible();
  await page.getByRole('button', { name: 'menu' }).click();
  // 상단 사용자 정보
  await expect(page.getByText('dev').first()).toBeVisible();
  await expect(page.getByText('dev').nth(1)).toBeVisible();
  await expect(page.getByText('dev@test.com')).toBeVisible();
  await expect(page.getByText('전자서명 미등록')).toBeVisible();
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // FAQ 
  await expect(page.getByRole('listitem').filter({ hasText: 'FAQ' })).toBeVisible();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('listitem').filter({ hasText: 'FAQ' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('main').getByText('📗우노 FAQ')).toBeVisible();


});