import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('GNB > Walk in Reception Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);


  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  // 팝업 처리 
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // const popupButton = page.getByText('오늘하루 보지않기');
  // if (await popupButton.isVisible()) {
  //   await popupButton.click();
  // }

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();


  // 고객 조회
  await search.searchCustomerName();
  // 통합 차트
  await walkInReception.dailyReception();

  // 당일 접수 진행
  await walkInReception.isChartEntered();
  await walkInReception.selectType();
  await walkInReception.selectDepartment();
  await walkInReception.checkDate();
  await walkInReception.selectVisitTime();
  await walkInReception.selectExpectedtime();
  await walkInReception.selectVisitRoute();
  await walkInReception.selectDoctor();
  await walkInReception.selectCounselor();
  await walkInReception.selectAssist();
  await walkInReception.selectWriter();
  await walkInReception.selectSurgicalCategory();
  await walkInReception.selectSurgery();
  await walkInReception.enterMemo();
  await walkInReception.selectSaveButton();
  await walkInReception.checkSaveSuccessText();

  // 접수 확인
  await search.searchCustomerName();
  await walkInReception.enterInIntegratedChart();
  await walkInReception.enterReceptionChart();
  await walkInReception.checkReceptionSuccess();
  

  // 접수 수정
  await walkInReception.selectEdit();

  await walkInReception.editType();
  await walkInReception.editDepartment();
  await walkInReception.checkDate();
  await walkInReception.editVisitTime();
  await walkInReception.editExpectedtime();
  await walkInReception.editVisitRoute();
  await walkInReception.editDoctor();
  await walkInReception.editCounselor();
  await walkInReception.editAssist();
  await walkInReception.editWriter();
  await walkInReception.addingSurgeryCategory();
  await walkInReception.editSurgicalCategory();
  await walkInReception.editSurgery();
  await walkInReception.editMemo();
  await walkInReception.selectEditCompleteButton();
  await walkInReception.checkEditSuccessText();

  // 접수 수정 확인
  await walkInReception.checkReceptionSuccess();

  // 접수 취소 확인
  await walkInReception.cancelReception();

  await walkInReception.checkCancelSuccessText();

  await walkInReception.cancelStatus();

  // 접수 삭제

  await walkInReception.deleteReception();

  await walkInReception.checkDeleteSuccessText();

  await walkInReception.checkDeleteSucess();



});