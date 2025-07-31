import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { SimpleReception } from '../../../pages/SimpleReception';
import { Reservation } from '../../../pages/Reservation';
import { WalkInReception } from '../../../pages/WalkInReception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { ReservationSetting } from '../../../pages/ReservationSetting';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Simple Reception > Reservation', async ({ page }) => { 
  
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const simpleReception = new SimpleReception(page);
  const walkInReception = new WalkInReception(page);
  const search = new customerSearch(page);
  const reservation = new Reservation(page);
  const reservationSetting = new ReservationSetting(page);



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
  await search.searchSimpleReceptionName();
  await walkInReception.simpleReceptionIntegratedChart();
  // 통합차트 > 예약
  await reservation.enterReservation();

  // 예약 등록
  await reservation.selectCreateReservation();
  await reservation.selectType();
  await reservation.selectDepartment();
  await reservation.checkDate();
  await reservation.selectVisitTime();
  await reservation.selectExpectedtime();
  await reservation.selectVisitRoute();
  await reservation.selectDoctor();
  await reservation.selectCounselor();
  await reservation.selectAssist();
  await reservation.selectWriter();
  await reservation.selectSurgicalCategory();
  await reservation.selectSurgery();
  await reservation.enterMemo();
  await reservation.selectSaveButton();
  await reservation.checkSaveSuccessText();
  
  await reservation.checkReservationSuccess();

  await reservationSetting.closeIntegratedChart();
  await simpleReception.checkMovedToMain();

});
