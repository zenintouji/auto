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
  await page.goto('https://app.unocare.co.kr/login'); // 로그인 화면
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일' }).click();
  await page.getByRole('textbox', { name: '이메일' }).fill('jwpark@v2test.com');
  await expect(page.getByRole('textbox', { name: '●●●●●●●●' })).toBeVisible();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 
  await expect(page.getByRole('button', { name: '+ 고객 등록' })).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호를 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호를 검색하세요' }).click();
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).click();
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).fill('pwa_자동화');
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('columnheader', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'pwa_자동화_수정' })).toBeVisible();
  // 고객정보
  await page.getByRole('cell', { name: 'pwa_자동화_수정' }).click();
  await expect(page.getByText('님의 고객정보')).toBeVisible();
  // 고객정보 > 차팅이력 탭
  await expect(page.getByRole('tab', { name: '차팅이력' })).toBeVisible();
  await page.getByRole('tab', { name: '차팅이력' }).click();
  const today = new Date();
  const todayStrISO = today.toISOString().slice(5,10);
  await expect(page.getByText(`-${todayStrISO}`)).toBeVisible();
  await expect(page.getByText('예약', { exact: true }).nth(5)).toBeVisible();
  await expect(page.getByText('황범석∙변준영∙강슬아D')).toBeVisible();
  await expect(page.getByText('SNS')).toBeVisible();
  await expect(page.getByText('피부 시술')).toBeVisible();
  await expect(page.getByText('인모드')).toBeVisible();
  await expect(page.getByText('리프팅', { exact: true })).toBeVisible();
  await expect(page.getByText('실리프팅')).toBeVisible();
  await expect(page.getByText('예약 메모 입력 자동화 수정').nth(1)).toBeVisible();


  



});