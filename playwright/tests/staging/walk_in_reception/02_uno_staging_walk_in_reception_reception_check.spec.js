import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => { 
  await page.goto('https://staging.unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 진입
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 간편접수 진입 => GNB > 간편접수 진입해서 당일접수 노출되는지 확인
  await expect(page.getByText('간편접수').nth(0)).toBeVisible();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('간편접수').nth(0).click();
  const page1 = await page1Promise;
  await expect(page1.getByText('간편접수 확인')).toBeVisible();
  // 당일접수 카테고리 확인
  await expect(page1.getByRole('cell', { name: '접수', exact: true })).toBeVisible();
  await expect(page1.getByRole('cell', { name: '신 당일접수_확인 M' })).toBeVisible();
  await expect(page1.getByRole('cell', { name: '-05-05' })).toBeVisible();
  await expect(page1.getByRole('combobox', { name: '접수시간' })).toBeVisible();
  await expect(page1.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  // 당일접수 > 접수 진행
  await expect(page1.getByRole('button', { name: '접수' })).toBeVisible();
  await page1.getByRole('button', { name: '접수' }).click();
  await expect(page1.getByText('접수부서 선택 후 접수하세요')).toBeVisible();
  // 당일접수 > 접수 > 접수시간 선택
  await expect(page1.getByRole('combobox', { name: '접수시간' })).toBeVisible();
  await page1.getByRole('combobox', { name: '접수시간' }).click();
  await page1.getByRole('option', { name: '9:00', exact: true }).click();
  // 당일접수 > 접수 > 접수부서 선택
  await expect(page1.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  await page1.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page1.getByRole('option', { name: '상담-상담사A2' }).click();
  // 접수 진행
  await expect(page1.getByRole('button', { name: '접수' })).toBeVisible();
  await page1.getByRole('button', { name: '접수' }).click();
  await expect(page1.getByText('접수되었습니다')).toBeVisible();
  // 간편접수 확인 닫기 => 포커스 메인 화면으로 이동
  await expect(page1.getByRole('button').first()).toBeVisible();
  await page1.getByRole('button').first().click();
  await page.bringToFront();
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 예약 캘린더 진입
  await expect(page.getByRole('button', { name: 'icon-calendar 예약 캘린더' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-calendar 예약 캘린더' }).click();
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await expect(page.getByText('당일접수_확인')).toBeVisible();
  await page.getByText('당일접수_확인').dblclick();
  // 통합차트 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 > 접수
  await expect(page.getByText('접수 (1)')).toBeVisible();
  await page.getByText('접수 (1)').click();
  await expect(page.getByRole('cell', { name: '당일접수' })).toBeVisible();
  // 접수 삭제
  await expect(page.locator('.sc-eeDRCY').first()).toBeVisible();
  await page.locator('.sc-eeDRCY').first().click();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업
  await expect(page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();
  // 통합차트 닫기
  await expect(page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3)).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await expect(page.getByText('당일접수_확인')).not.toBeVisible();


  


});
