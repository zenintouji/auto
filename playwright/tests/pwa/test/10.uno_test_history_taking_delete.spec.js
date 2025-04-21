import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 로그인 화면 진입
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('pwa_자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: 'pwa_자동화_수정' })).toBeVisible();
  await page.getByRole('button', { name: 'pwa_자동화_수정' }).click();
  // 통합차트
  await expect(page.getByText('문진 (2)')).toBeVisible();
  await page.getByText('문진 (2)').click();
  // 문진 진입
  await expect(page.getByRole('paragraph').filter({ hasText: '문진 (2)' })).toBeVisible();
  // 문진 확인
  await expect(page.getByRole('cell', { name: '2', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '미완료' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '완료', exact: true })).toBeVisible();
  const today = new Date();
  const todayStrISO = today.toISOString().slice(5,10);
  await expect(page.getByRole('cell', { name: `${todayStrISO}` }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: `${todayStrISO}` }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: 'dev' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'dev' }).nth(1)).toBeVisible();
  // 문진 전체 선택 > 삭제
  await page.locator('.survey-list-table-wrapper > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('문진이 삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '미완료' })).not.toBeVisible();
  // 나머지 항목 삭제
  await expect(page.locator('.survey-list-table-wrapper > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('.survey-list-table-wrapper > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('문진이 삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '완료', exact: true })).not.toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();





});