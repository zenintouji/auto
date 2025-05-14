import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { SeeDoctor } from '../../../pages/SeeDoctor';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > See Doctor Test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const seedoctor = new SeeDoctor(page);

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
  // 통합차트 > 진료차트
  await seedoctor.enterTreatment();
  
  // 진료 등록
  //////////

  await seedoctor.selectCreateTreatment();
  await seedoctor.selectDoctor();
  await seedoctor.selectSurgicalCategory();
  await seedoctor.selectSurgery();
  await seedoctor.enterMemo();
  await seedoctor.enterPrescription();
  await seedoctor.closeAlertPopup();
  await seedoctor.registerPrescription();

  await seedoctor.checkPrescriptionSuccess();

  await seedoctor.selectPenchart();
  await seedoctor.loadImageToCustomer();
  await seedoctor.checkLoadImageSuccessText();

  await seedoctor.selectSaveButton();
  await seedoctor.checkSaveSuccessText();

  await seedoctor.checkTreatmentSuccess();


  // 진료 수정
  //////////

  await seedoctor.selectEdit();
  await seedoctor.editDoctor();
  await seedoctor.addingSurgeryCategory();
  await seedoctor.editSurgicalCategory();
  await seedoctor.editSurgery();
  await seedoctor.editMemo();

  await seedoctor.selectPenchart();
  await seedoctor.loadImageToCustomer();
  await seedoctor.checkLoadImageSuccessText();

  await seedoctor.selectEditCompleteButton();
  await seedoctor.checkEditSuccessText();

  await seedoctor.checkTreatmentSuccess();

  // 차트 출력
  //////////
  
  await seedoctor.selectPrintTreatment();
  await seedoctor.checkPrintTreatment();

  await seedoctor.compareValueFromPrintModal(); 

  // 차트 삭제
  /////////

  await seedoctor.selectDeleteButton();
  await seedoctor.deleteChart();

  await seedoctor.checkDeleteSuccessText();

  // 처방전 삭제
  ///////////

  await seedoctor.enterPrescriptionMenu();
  await seedoctor.deletePrescription();
  await seedoctor.deletePopup();
  await seedoctor.checkDeleteSuccess();
  
});