import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Skincare } from '../../../pages/Skincare';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const skincare = new Skincare(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  // 팝업 처리 
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // 배너 처리
  await page.waitForTimeout(1000);
  await exception.closeBannerIfExists();

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  // 고객 조회
  await search.searchCustomerName();
  await walkInReception.enterInIntegratedChart();
  
  // 통합차트 > 피부관리
  await skincare.enterSkincare();

  // 시/수술 추가
  await skincare.enterAddSurgery();
  await skincare.addSurgery();

  await skincare.checkAddingSuccessText();

  await skincare.closeSurgeryModal();
  
  await skincare.checkAddSurgery();

  // 피부관리 진행
  await skincare.enterProgressSkincare();

  await skincare.selectSkincareCounselor();
  await skincare.selectDoctor();
  await skincare.selectCounselor();

  await skincare.checkAddedSurgery();
  await skincare.enterMemo();
  await skincare.saveSkincare();

  await skincare.checkSaveSuccessText();

  await skincare.checkSkincareSuccess();














  
  // // 피부관리 진행내역
  // await expect(page.getByText('피부관리 진행내역')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '피부관리내용 입력 자동화' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1회차' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible(); // 사용
  // // 수정
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)')).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  // await expect(page.getByText('피부관리 진행', { exact: true })).toBeVisible();
  // // 피부관리사
  // await expect(page.locator('label').filter({ hasText: '피부관리사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '피부관리사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '홍명희' }).click();
  // // 의사
  // await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '최지안' }).click();
  // // 상담사
  // await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '이지혜' }).click();
  // // 진행 시/수술
  // await expect(page.getByText('진행 시/수술')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '눈매교정' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1', exact: true }).nth(3)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '회차' }).nth(3)).toBeVisible();
  // // 피부관리내용
  // await expect(page.locator('label').filter({ hasText: '피부관리내용' })).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.locator('pre').getByText('피부관리내용 입력 자동화').click();
  // await page.locator('pre div').filter({ hasText: '피부관리내용 입력 자동화' }).fill('피부관리내용 입력 자동화 수정');
  // // 수정완료
  // await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  // await page.getByRole('button', { name: '수정완료' }).click();
  // await expect(page.getByText('피부관리를 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // await expect(page.getByText('잔여 있는 피부관리 내역이 없습니다')).toBeVisible();
  // await expect(page.getByText('피부관리 진행내역')).toBeVisible();
  // // 피부관리차트 수정 확인
  // await expect(page.getByRole('cell', { name: '피부관리내용 입력 자동화 수정' })).toBeVisible(); // 피부관리내용
  // await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '이지혜' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1회차' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible(); // 사용
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // // 피부관리차트 삭제
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // // 피부관리 잔여 삭제
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // await expect(page.getByText('시/수술 항목을 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByText('잔여 있는 피부관리 내역이 없습니다')).toBeVisible();
});