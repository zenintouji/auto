import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Surgery } from '../../../pages/Surgery';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Surgery Test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const surgery = new Surgery(page);

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

  await surgery.enterSurgery();
  await surgery.enterSurgeryModal();
  await surgery.addSurgery();
  await surgery.checkRegisterSuccessText();

  await surgery.closeAddModal();
  await surgery.checkAddSurgery();

  // 시/수술 진행
  await surgery.enterProgressSurgery();
  await surgery.selectDoctor();
  await surgery.selectAssist();
  await surgery.checkProgressSurgery();
  await surgery.enterMemo();

  await surgery.selectPenchart();
  await surgery.loadImageToCustomer();
  await surgery.checkLoadImageSuccessText();

  await surgery.selectSaveButton();
  await surgery.checkCreateSuccessText();

  await surgery.checkSurgerySuccess();

  // 수정
  await surgery.selectEdit();
  await surgery.editDoctor();
  await surgery.editAssist();
  await surgery.checkProgressSurgery();
  await surgery.editMemo();
  await surgery.selectEditButton();

  await surgery.checkEditSuccessText();

  await surgery.checkSurgerySuccess();

  // 삭제
  await surgery.selectSurgery();
  await surgery.selectDeleteButton();
  await surgery.deletePopup();
  await surgery.checkDeleteSuccessText();

  await surgery.deleteRemainingSurgery();
  await surgery.deleteSurgeryPopup();
  await surgery.checkDeleteSurgerySuccessText();

});