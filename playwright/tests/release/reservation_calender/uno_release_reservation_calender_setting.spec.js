import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Reservation } from '../../../pages/Reservation';
import { ReservationSetting } from '../../../pages/ReservationSetting';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Reservation Calendar > Setting ', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
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

  // 예약캘린더 값 확인
  await reservationSetting.checkReservationTileExist();

  //////////
  await page.waitForTimeout(1000);
  await reservationSetting.checkHeightToWidthMode(); // 세로 > 가로모드 ㄱㄱ

  // 가로 1x > 가로 2x
  await reservationSetting.checkWidthBasicToDouble();
  // 가로 2x > 가로 3x
  await reservationSetting.checkWidthDoubleToTriple();

  /////////
  await reservationSetting.enterCalendarSetting();
  await page.waitForTimeout(1000);
  await reservationSetting.changeWidthToHeight(); // 가로 > 세로모드 ㄱㄱ

  // 세로 3x > 세로 2x
  await reservationSetting.checkHeightTripleToDouble();
  // 세로 2x > 세로 1x
  await reservationSetting.checkHeightDoubleToBasic();

  await reservationSetting.checkSelectAll(reservation); // 전체선택
  await reservationSetting.checkUncheckedSurgery(reservation); // 시/수술
  await reservationSetting.checkUncheckedDoctor(reservation); // 의사
  await reservationSetting.checkUncheckedCounselor(reservation); // 상담사
  await reservationSetting.checkUncheckedReservationType(reservation); // 예약종류 ㅇㅇ

  //////////////////////////////////////////////////
  // 월 ㄱㄱ

  await reservationSetting.selectMonthCalender();

  await reservationSetting.checkMonthlyHeightToWidthMode(); // 세로 > 가로 모드 ㄱㄱ
  await reservationSetting.checkMonthlyWidthBasicToDouble();
  await reservationSetting.checkMonthlyWidthDoubleToTriple();
  
  // 가로 > 세로 ㅇㅇㅇㅇ
  await reservationSetting.enterCalendarSetting();
  await page.waitForTimeout(1000);
  await reservationSetting.changeMonthlyWidthToHeight();

  await reservationSetting.checkMonthlyHeightTripleToDouble();
  await reservationSetting.checkMonthlyHeightDoubleToBasic();

  await reservationSetting.checkSelectAllMonthly(reservation); // 전체선택
  await reservationSetting.checkUncheckedSurgeryMonthly(reservation); // 시/수술
  await reservationSetting.checkUncheckedDoctorMonthly(reservation); // 의사
  await reservationSetting.checkUncheckedCounselorMonthly(reservation); // 상담사
  await reservationSetting.checkUncheckedReservationTypeMonthly(reservation); // 예약종류 ㅇㅇ

  //////////////////////////////////////////////////
  // 에약 삭제 ㄱㄱㄱ

  // 고객 조회
  await search.searchCustomerName();
  await walkInReception.enterInIntegratedChart();
  // 통합차트 > 예약
  await reservation.enterReservation();

  await reservation.deleteReservation();
  await reservation.checkDeleteSuccessText();
  await reservation.checkDeleteSucess();


});