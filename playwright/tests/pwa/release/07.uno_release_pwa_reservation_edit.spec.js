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
  await expect(page.getByRole('columnheader', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'pwa_자동화_수정' })).toBeVisible();
  await page.getByRole('cell', { name: 'pwa_자동화_수정' }).click();
  // 고객정보
  await expect(page.getByText('님의 고객정보')).toBeVisible();
  // 고객정보 > 내원정보 탭
  await expect(page.getByRole('tab', { name: '내원정보' })).toBeVisible();
  await page.getByRole('tab', { name: '내원정보' }).click();
  await expect(page.getByRole('cell', { name: ':00 - 09:30' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담사A2' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible();
  await expect(page.getByText('예약 메모 입력 자동화')).toBeVisible();
  await page.getByText('예약 메모 입력 자동화').click();
  // 예약 정보 노출 확인
  await expect(page.locator('div').filter({ hasText: /^pwa_자동화_수정\(F\/만 30세\/940706\)$/ }).nth(1)).toBeVisible();
  await expect(page.getByText('상담예약')).toBeVisible();
  await expect(page.getByText('상담').nth(8)).toBeVisible();
  await expect(page.getByText('시 00분')).toBeVisible();
  await expect(page.getByText('시간 30분')).toBeVisible();
  await expect(page.getByText('굿닥')).toBeVisible();
  await expect(page.getByText('이지혜').nth(1)).toBeVisible();
  await expect(page.getByText('최지안').nth(1)).toBeVisible();
  await expect(page.getByText('홍명희')).toBeVisible();
  await expect(page.getByText('노윤이')).toBeVisible();
  await expect(page.getByText('성형-눈매교정')).toBeVisible();
  await expect(page.getByRole('paragraph')).toBeVisible();
  // 예약 수정
  await expect(page.getByRole('button', { name: '수정' })).toBeVisible();
  await page.getByRole('button', { name: '수정' }).click();
  await expect(page.getByText('pwa_자동화_수정(F/만 30세/940706) 님의 예약내역 수정')).toBeVisible();
  // 예약종류
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await expect(page.getByRole('button', { name: '진료예약' })).toBeVisible();
  await page.getByRole('button', { name: '진료예약' }).click();
  // 일자
  await expect(page.locator('label').filter({ hasText: '일자' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Choose date, selected date is' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Choose date, selected date is' }).click();
  // 일자 직접입력 
  await expect(page.getByRole('button', { name: 'calendar view is open, go to' })).toBeVisible();
  await page.getByRole('button', { name: 'calendar view is open, go to' }).click();
  await expect(page.getByRole('textbox', { name: 'yyyy-mm-dd' })).toBeVisible();
  const today = new Date();
  const formatDate = (date) => { return date.toISOString().split('T')[0].replace(/-/g, '/'); };
  const todayStr = formatDate(today);
  await page.getByRole('textbox', { name: 'yyyy-mm-dd' }).click();
  await page.getByRole('textbox', { name: 'yyyy-mm-dd' }).fill(todayStr);
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  // 방문시간
  await expect(page.locator('label').filter({ hasText: '방문시간' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '방문시간을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '방문시간을 선택하세요' }).click();
  await page.getByRole('option', { name: '9:30' }).nth(0).click();
  // 예상 소요시간
  await expect(page.locator('label').filter({ hasText: '예상 소요시간' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^시간분$/ }).nth(2)).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.getByRole('menuitem', { name: '1시간 0분' }).nth(0).click();
  // 예약부서
  await expect(page.locator('label').filter({ hasText: '예약부서' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.getByRole('option', { name: '상담-상담사B' }).click();
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '내원경로를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: 'SNS' }).nth(0).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '작성자를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '황범석' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '변준영' }).nth(0).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '어시스트를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: '강슬아D' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명
  await expect(page.getByText('시/수술명')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술명을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 시/수술 카테고리 + 추가
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
  await page.getByRole('button', { name: '+' }).click();
  // 시/수술 카테고리 추가
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).nth(1)).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).nth(1).click();
  await page.getByRole('option', { name: '리프팅' }).click();
  // 시/수술명 추가
  await expect(page.getByText('시/수술명')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).nth(1)).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).nth(1).click();
  await page.getByRole('option', { name: '실리프팅' }).click();
  // 예약 메모
  await expect(page.getByText('예약 메모', { exact: true })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '예약 메모 입력 자동화' })).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: '예약 메모 입력 자동화' }).click();
  await page.locator('pre div').filter({ hasText: '예약 메모 입력 자동화' }).fill('예약 메모 입력 자동화 수정');
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('예약을 변경했습니다')).toBeVisible();
  // 예약 수정 확인
  await expect(page.getByText('진료예약')).toBeVisible();
  await expect(page.getByText('상담').nth(7)).toBeVisible();
  const todayStrISO = today.toISOString().slice(5,10);
  await expect(page.locator('span').filter({ hasText: `-${todayStrISO}` })).toBeVisible();
  await expect(page.getByText('시 30분')).toBeVisible();
  await expect(page.getByText('시간 0분')).toBeVisible();
  await expect(page.getByText('SNS')).toBeVisible();
  await expect(page.getByText('황범석')).toBeVisible();
  await expect(page.getByText('변준영')).toBeVisible();
  await expect(page.getByText('강슬아D')).toBeVisible();
  await expect(page.getByText('최지안').nth(1)).toBeVisible();
  await expect(page.getByText('피부 시술-인모드리프팅-실리프팅')).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '예약 메모 입력 자동화 수정' })).toBeVisible();





});