import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await expect(page.getByRole('textbox', { name: '비밀번호를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 진입
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 고객 조회 메뉴 진입
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 고객 선택
  await expect(page.locator('.sc-eeDRCY').first()).toBeVisible();
  await page.locator('.sc-eeDRCY').first().click();
  // 삭제 
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업 
  await expect(page.getByRole('heading', { name: '고객 삭제 시 주의사항 close' })).toBeVisible();
  await expect(page.getByText('고객 삭제 시 고객 정보와 모든 차트 정보가 함께 삭제됩니다.의료법상 보존의무가 있는 진료기록을 포함한 경우 삭제에 대한 책임은 귀원에 있으니 ')).toBeVisible();
  // 삭제 안내 팝업 > 복구불가 입력
  await expect(page.getByRole('textbox', { name: '복구불가' })).toBeVisible();
  await page.getByRole('textbox', { name: '복구불가' }).click();
  await page.getByRole('textbox', { name: '복구불가' }).fill('복구불가');
  // 삭제 안내 팝업 > 삭제 
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('삭제가 완료되었습니다. 삭제 이력은 [활동로그 확인] 메뉴에서 확인 가능합니다')).toBeVisible();

});