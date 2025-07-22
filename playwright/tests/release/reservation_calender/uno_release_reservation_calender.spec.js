import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Reservation } from '../../../pages/Reservation';
import { ReservationCalendar } from '../../../pages/ReservationCalendar';
import { ReservationSetting } from '../../../pages/ReservationSetting';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Reservation Calendar', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const reservation = new Reservation(page);
  const reservationSetting = new ReservationSetting(page);
  const reservationCalendar = new ReservationCalendar(page);

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

  // 예약캘린더 진입
  await reservationSetting.enterReservationCalendar();
  await page.waitForTimeout(3000);

  await reservationCalendar.changeStatusToNotVisit(); // 미방문
  await reservationCalendar.changeStatusToReservated(); // 예약
  await reservationCalendar.changeStatusToWaitForConsultation(); // 상담대기
  await reservationCalendar.changeStatusToConsulting(); // 상담중
  await reservationCalendar.changeStatusToSeeDoctor(); // 진료대기
  await reservationCalendar.changeStatusToSeeingDoctor(); // 진료중
  await reservationCalendar.changeStatusToWaitForSurgery(); // 시/수술대기
  await reservationCalendar.changeStatusToTakingSurgery(); // 시/수술중
  await reservationCalendar.changeStatusToPayment(); // 수납대기
  await reservationCalendar.changeStatusToComplete(); // 완료
  await reservationCalendar.changeStatusToDischarging(); // 퇴원

  await reservationCalendar.dbclickToEnter();

  await reservation.enterReservation();

  await reservation.checkReservationSuccess();

  await reservation.deleteReservation();
  await reservation.checkDeleteSuccessText();
  await reservation.checkDeleteSucess();

  await reservationCalendar.closeIntegratedChart();

  await reservationCalendar.letsDelete();

});