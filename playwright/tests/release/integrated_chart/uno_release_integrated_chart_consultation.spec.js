import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { ChartHistory } from '../../../pages/ChartHistory';
import { Consultation } from '../../../pages/Consultation';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Consultation Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const chartHistory = new ChartHistory(page);
  const consulTation = new Consultation(page);
  const walkInReception = new WalkInReception(page);

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

  await search.searchCustomerName();
  await walkInReception.enterInIntegratedChart();

  // 상담차트 진입
  await consulTation.enterConsultationChart();

  await consulTation.selectRegistration();

  await consulTation.selectCounselor();
  await consulTation.selectSurgicalCategory();
  await consulTation.selectSurgery();
  await consulTation.selectResult();
  await consulTation.enterMemo();

  await consulTation.enterPenchart();
  await consulTation.gettingPenchart();
  await consulTation.checkGettingSuccessText();

  await consulTation.selectSaveButton();
  await consulTation.saveSuccessText();

  await consulTation.checkConsultationSuccess();

  // 상담 수정
  await consulTation.selectEdit();

  await consulTation.editCounselor();
  await consulTation.addSurgeryCategory();
  await consulTation.editSurgicalCategory();
  await consulTation.editSurgery();
  await consulTation.editResult();
  await consulTation.editMemo();

  await consulTation.enterPenchart();
  await consulTation.addingPenchart();
  await consulTation.checkGettingSuccessText();
  await consulTation.removeImage();
  await consulTation.selectEditButton();
  await consulTation.editSucceessText();

  await consulTation.checkConsultationSuccess();

  // 상담 삭제
  await consulTation.selectChart();
  await consulTation.selectDelete();
  await consulTation.deletePopup();
  await consulTation.selectConfirm();
  await consulTation.checkDeleteSuccessText();

});