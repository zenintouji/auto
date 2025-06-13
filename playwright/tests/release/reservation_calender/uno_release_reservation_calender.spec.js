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

test('test', async ({ page }) => {
  
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
  await reservationCalendar.waitForConsultationStatus(); // 상담대기
  await reservationCalendar.changeStatusToConsulting(); // 상담중





  // // 상태 변경 > 미방문
  // await expect(page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러')).toBeVisible();
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '미방문' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '미방문' }).click();
  // await expect(page.locator('div').filter({ hasText: '[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기' }).nth(3)).toBeVisible();
  // await expect(page.getByRole('button', { name: '미전송' })).toBeVisible();
  // await page.getByRole('button', { name: '미전송' }).click();
  // await expect(page.getByText('미방문으로 변경되었습니다')).toBeVisible();



  // // 상태 변경 > 예약
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '예약' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '예약' }).click();
  // await expect(page.getByText('예약으로 변경되었습니다')).toBeVisible();



  // // 상태 변경 > 상담대기
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '상담대기' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '상담대기' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();



  // // 상태 변경 > 상담대기 > 상담중
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '상담중' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '상담중' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 진료대기
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '진료대기' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '진료대기' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 진료대기 > 진료중
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '진료중' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '진료중' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 시/수술 대기
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '시/수술대기' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '시/수술대기' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 시/수술 대기 > 시/수술중
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '시/수술중' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '시/수술중' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 수납대기
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '수납대기' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '수납대기' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 완료 
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '완료' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '완료' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 상태 변경 > 퇴원
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  // await page.locator('li').filter({ hasText: '상태변경' }).hover();
  // await expect(page.getByRole('menuitem', { name: '퇴원' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '퇴원' }).click();
  // await expect(page.locator('div').filter({ hasText: '[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기' }).nth(3)).toBeVisible();
  // await expect(page.getByRole('button', { name: '미전송' })).toBeVisible();
  // await page.getByRole('button', { name: '미전송' }).click();
  // await expect(page.getByText('변경되었습니다')).toBeVisible();
  // // 예약캘린더 > 통합차트 진입
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').dblclick();
  // await expect(page.getByText('통합차트')).toBeVisible();
  // await expect(page.getByRole('button', { name: '취소', exact: true })).toBeVisible();
  // await page.getByRole('button', { name: '취소', exact: true }).click();
  // await expect(page.getByRole('cell', { name: '예약문자' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '설정' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '예약상태' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '내원', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '예약종류' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담예약' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '부서', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '세부부서' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담사A2' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담사', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '노윤이' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '의사', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '보톡스' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '시/수술명' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '필러' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '작성자' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: 'v2' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible();
  // // 예약 선택
  // await page.getByRole('cell').filter({ hasText: /^$/ }).nth(2).click();
  // await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // // 예약 삭제
  // await page.getByRole('button', { name: '삭제' }).click();
  // // 삭제 안내 팝업
  // await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // // 통합차트 닫기
  // await expect(page.getByText('통합차트')).toBeVisible();
  // await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  // // 예약 상태 변경 후 차트 삭제
  // await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await page.locator('li').filter({ hasText: '상태변경' }).click();
  // await expect(page.getByRole('menuitem', { name: '상담대기' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '상담대기' }).click();
  // await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // // 차트 삭제
  // await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  // await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '삭제하기' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '삭제하기' }).click();
  // await expect(page.locator('div').filter({ hasText: '접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요' }).nth(3)).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();

});