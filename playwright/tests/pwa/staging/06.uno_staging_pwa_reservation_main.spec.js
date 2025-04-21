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
  // 예약 등록
  await expect(page.getByRole('button', { name: '+ 예약 등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 예약 등록' }).click();
  // 예약 고객 검색
  await expect(page.getByRole('textbox', { name: '예약할 고객을 검색하세요(고객명, 전화번호)' })).toBeVisible();
  await page.getByRole('textbox', { name: '예약할 고객을 검색하세요(고객명, 전화번호)' }).click();
  await page.getByRole('textbox', { name: '예약할 고객을 검색하세요(고객명, 전화번호)' }).fill('pwa_자동화');
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('columnheader', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'pwa_자동화_수정' })).toBeVisible();
  await page.getByRole('cell', { name: 'pwa_자동화_수정' }).click();
  // 예약 등록 
  await expect(page.getByText('pwa_자동화_수정(F/만 30세/940706) 님의 예약등록')).toBeVisible();
  // 예약 종류
  await expect(page.getByText('예약종류')).toBeVisible();
  await expect(page.getByRole('button', { name: '상담예약' })).toBeVisible();
  await page.getByRole('button', { name: '상담예약' }).click();
  // 일자
  await expect(page.getByText('일자')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Choose date, selected date is' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Choose date, selected date is' }).click();
  await expect(page.getByRole('gridcell', { name: '1', exact: true })).toBeVisible();
  await page.getByRole('gridcell', { name: '1', exact: true }).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  // 방문시간
  await expect(page.getByText('방문시간')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '방문시간을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '방문시간을 선택하세요' }).click();
  await page.getByRole('option', { name: '9:00' }).nth(0).click();
  // 예상 소요시간
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^시간분$/ }).nth(2)).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.getByRole('menuitem', { name: '0시간 30분' }).nth(0).click();
  // 예약 부서
  await expect(page.getByText('예약부서')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.getByRole('option', { name: '상담-상담사A2' }).click();
  // 내원경로
  await expect(page.getByText('내원경로')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '내원경로를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '굿닥' }).click();
  // 작성자
  await expect(page.getByText('작성자')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '작성자를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).nth(0).click();
  // 의사
  await expect(page.getByText('의사', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '이지혜' }).click();
  // 상담사
  await expect(page.getByText('상담사').nth(4)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).nth(0).click();
  // 어시스트
  await expect(page.getByText('어시스트')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '어시스트를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: 'dev' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.getByText('시/수술명')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술명을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 예약 메모
  await expect(page.getByText('예약 메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: /^$/ })).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('예약 메모 입력 자동화');
  // 예약 등록
  await expect(page.getByRole('button', { name: '등록' })).toBeVisible();
  await page.getByRole('button', { name: '등록' }).click();
  await expect(page.getByText('예약을 등록했습니다')).toBeVisible();


});