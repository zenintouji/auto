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

test('Integrated Chart > Skincare Test', async ({ page }) => {

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

  // 수정
  await skincare.selectEdit();

  await skincare.editSkincareCounselor();
  await skincare.editDoctor();
  await skincare.editCounselor();
  await skincare.checkAddedSurgery();
  await skincare.editMemo();

  await skincare.editSkincare();
  await skincare.checkEditSuccessText();

  await skincare.checkSkincareSuccess();

  // 삭제
  await skincare.selectSkincare();
  await skincare.deleteSkincare();
  await skincare.deletePopup();
  await skincare.checkDeleteSuccessText();

  // 시/수술 삭제
  await skincare.deleteRemainingSkincare();
  await skincare.deleteSurgeryPopup();
  await skincare.checkDeleteSurgerySuccessText();













  
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