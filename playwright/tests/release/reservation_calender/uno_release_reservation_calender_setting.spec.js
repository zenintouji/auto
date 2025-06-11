import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Reservation } from '../../../pages/Reservation';

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


  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  // 예약 캘린더
  await expect(page.getByRole('button', { name: 'icon-calendar 예약 캘린더' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-calendar 예약 캘린더' }).click();
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 가로모드 > 세로모드 변경
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.locator('div').filter({ hasText: /^신자동화_신규고객\/F\/만 30세$/ }).first()).toBeVisible();
//   await expect(page.getByLabel('[신]자동화_신규고객/F/만 30세/940505').getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 세로 맞춤 > 세로 1x
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '세로 맞춤' })).toBeVisible();
  await page.getByRole('button', { name: '세로 맞춤' }).click();
  await expect(page.getByRole('menuitem', { name: '세로 1x' })).toBeVisible();
  await page.getByRole('menuitem', { name: '세로 1x' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  await expect(page.getByText('보톡스 - 필러').nth(0)).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 세로 1x > 세로 2x
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '세로 1x' })).toBeVisible();
  await page.getByRole('button', { name: '세로 1x' }).click();
  await expect(page.getByRole('menuitem', { name: '세로 2x' })).toBeVisible();
  await page.getByRole('menuitem', { name: '세로 2x' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 세로 2x > 세로 3x
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '세로 2x' })).toBeVisible();
  await page.getByRole('button', { name: '세로 2x' }).click();
  await expect(page.getByRole('menuitem', { name: '세로 3x' })).toBeVisible();
  await page.getByRole('menuitem', { name: '세로 3x' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 세로 3x > 세로 맞춤
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '세로 3x' })).toBeVisible();
  await page.getByRole('button', { name: '세로 3x' }).click();
  await expect(page.getByRole('menuitem', { name: '세로 맞춤' })).toBeVisible();
  await page.getByRole('menuitem', { name: '세로 맞춤' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 세로모드 > 가로모드 변경
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 가로맞춤 > 가로 1x
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '가로 맞춤' })).toBeVisible();
  await page.getByRole('button', { name: '가로 맞춤' }).click();
  await page.getByRole('menuitem', { name: '가로 1x' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 가로 1x > 가로 2x
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '가로 1x' })).toBeVisible();
  await page.getByRole('button', { name: '가로 1x' }).click();
  await expect(page.getByRole('menuitem', { name: '가로 2x' })).toBeVisible();
  await page.getByRole('menuitem', { name: '가로 2x' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 가로 2x > 가로 3x
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '가로 2x' })).toBeVisible();
  await page.getByRole('button', { name: '가로 2x' }).click();
  await expect(page.getByRole('menuitem', { name: '가로 3x' })).toBeVisible();
  await page.getByRole('menuitem', { name: '가로 3x' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 가로 3x > 가로 맞춤
  await expect(page.getByText('보기 및 비율 설정')).toBeVisible();
  await expect(page.getByRole('button', { name: '가로 3x' })).toBeVisible();
  await page.getByRole('button', { name: '가로 3x' }).click();
  await expect(page.getByRole('menuitem', { name: '가로 맞춤' })).toBeVisible();
  await page.getByRole('menuitem', { name: '가로 맞춤' }).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 캘린더 표기 정보
  await expect(page.getByText('캘린더 표기 정보')).toBeVisible();
  await expect(page.getByText('캘린더 테이블 박스 고객정보입니다')).toBeVisible();
  // 일/주 고객 정보 > 전체선택
  await expect(page.getByText('일/주 고객 정보')).toBeVisible();
  await expect(page.getByText('전체선택').first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^일\/주 고객 정보전체선택$/ }).getByLabel('전체선택').check();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  // await expect(page.getByText('최지안 | 노윤이 | 상담예약')).toBeVisible();
  await expect(page.getByText('최지안 | 최지안 | 상담예약')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 일/주 고객 정보 > 시/수술 카테고리
  await expect(page.getByText('일/주 고객 정보')).toBeVisible();
  await page.locator('span.MuiTypography-root:has-text("시/수술 카테고리 - 시/수술명")').nth(0).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  await expect(page.getByText('최지안 | 최지안 | 상담예약')).toBeVisible();
  // await expect(page.getByText('최지안 | 노윤이 | 상담예약')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 일/주 고객 정보 > 의사 
  await expect(page.getByText('일/주 고객 정보')).toBeVisible();
  await page.locator('span.MuiTypography-root:has-text("의사")').nth(1).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  await expect(page.getByText('최지안 | 상담예약')).toBeVisible();
  // await expect(page.getByText('노윤이 | 상담예약')).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 일/주 고객 정보 > 상담사
  await expect(page.getByText('일/주 고객 정보')).toBeVisible();
  await page.locator('span.MuiTypography-root:has-text("상담사")').nth(1).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('자동화_신규고객')).toBeVisible();
  await expect(page.getByText('상담예약').nth(0)).toBeVisible();
  // 예약 캘린더 설정
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByRole('button', { name: '예약판 설정' }).click();
  await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
  // 일/주 고객 정보 > 예약종류 (접수종류)
  await expect(page.getByText('일/주 고객 정보')).toBeVisible();
  await page.locator('span.MuiTypography-root:has-text("예약종류 (접수종류)")').nth(0).click();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 예약 캘린더 > 예약 확인
  await expect(page.getByText('신자동화_신규고객/F/만 30세')).toBeVisible();
  // 예약 삭제 하러
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 통합차트 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  // 예약내역 확인 
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // 삭제
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // 통합차트 닫기
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();









  ///// 여기 아래는 월 ////////
//   // 예약 캘린더 > 월 선택
//   await expect(page.getByRole('button', { name: '월', exact: true })).toBeVisible();
//   await page.getByRole('button', { name: '월', exact: true }).click();
//   await expect(page.getByRole('button', { name: '월', exact: true })).toBeVisible();
//   // 예약 캘린더 설정
//   await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
//   await page.getByRole('button', { name: '예약판 설정' }).click();
//   await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
//   // 월 고객 정보 > 전체선택
//   await expect(page.getByText('월 고객 정보')).toBeVisible();
//   await expect(page.getByText('전체선택').nth(1)).toBeVisible();
//   await page.locator('div').filter({ hasText: /^월 고객 정보전체선택$/ }).getByLabel('전체선택').check();
//   await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
//   await page.getByRole('button', { name: '저장' }).click();
//   await expect(page.getByText('저장되었습니다')).toBeVisible();
//   // 예약 캘린더 > 예약 확인
//   await expect(page.getByText('신09:00자동화_신규고객/F/만 30세[상담-상담사')).toBeVisible();
//   await expect(page.getByText('신09:00자동화_신규고객/F/만 30세[상담-상담사A2]보톡스 - 필러')).toBeVisible();
//   // 예약 캘린더 설정
//   await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
//   await page.getByRole('button', { name: '예약판 설정' }).click();
//   await expect(page.getByRole('dialog').getByText('예약판 설정')).toBeVisible();
//   // 월 고객 정보 > 시/수술 카테고리 해제
//   await expect(page.getByText('월 고객 정보')).toBeVisible();
//   await page.locator('text=시/수술 카테고리 - 시/수술명').nth(1).click();
//   await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
//   await page.getByRole('button', { name: '저장' }).click();
//   await expect(page.getByText('저장되었습니다')).toBeVisible();
//   // 예약 캘린더 > 예약 확인
//   await expect(page.getByText('신09:00자동화_신규고객/F/만 30세[상담-상담사A2]보톡스 - 필러')).toBeVisible();





















});