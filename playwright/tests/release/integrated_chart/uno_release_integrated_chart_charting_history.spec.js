import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
// import { customerSearch } from '../../../pages/CustomerSearch';
import { ChartHistory } from '../../../pages/ChartHistory';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Charting History Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  // const search = new customerSearch(page);
  const chartHistory = new ChartHistory(page);
  

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

  await chartHistory.searchCustomerName();
  await chartHistory.enterInIntegratedChart();

  // 차팅이력
  await chartHistory.checkChartHistoryName();
  await chartHistory.selectDepartment();

  // 차팅이력 > 예약 배지 확인
  await chartHistory.checkChartHistory();

  // 체크 해제
  await chartHistory.selectDepart();
  await chartHistory.uncheckDepartment();

  // 접기, 펼치기
  await chartHistory.foldHistoryList();
  await chartHistory.spreadHistoryList();


});