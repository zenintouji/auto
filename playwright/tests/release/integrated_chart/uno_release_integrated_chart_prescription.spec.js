import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Prescription } from '../../../pages/Prescription';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Prescription Test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const prescription = new Prescription(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login("jwpark@v2test.com", "uunn2345%%");

  // 팝업 처리
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // 배너 처리
  await page.waitForTimeout(1000);
  await exception.closeBannerIfExists();

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  await prescription.doctorNameTaking();
  // 고객 조회
  await search.searchCustomerName();
  // 통합 차트 진입
  await walkInReception.enterInIntegratedChart();
  await prescription.enterPrescription();

  await prescription.enterCreatePrescription();
  await prescription.closeAlertPopup();

  // 처방전 확인 및 등록
  await prescription.registerPrescription();

  // 잘 들어갔는지? 
  await prescription.checkRegister();
  
  // 처방전 수정
  await prescription.enterEditPrescription();
  await prescription.closeEditAlert();
  await prescription.editPrescription();

  await prescription.checkEdit();

  // 처방전 삭제
  await prescription.deletePrescription();
  await prescription.deletePopup();
  await prescription.checkDeleteSuccess();

});