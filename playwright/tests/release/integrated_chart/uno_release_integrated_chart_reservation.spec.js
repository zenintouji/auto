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

  // 예약 수정
  /////////

  await reservation.selectEdit();
  await reservation.editType();
  await reservation.editDepartment();
  await reservation.checkDate();
  await reservation.editVisitTime();
  await reservation.editExpectedtime();
  await reservation.editVisitRoute();
  await reservation.editDoctor();
  await reservation.editCounselor();
  await reservation.editAssist();
  await reservation.editWriter();
  await reservation.addingSurgeryCategory();
  await reservation.editSurgicalCategory();
  await reservation.editSurgery();
  await reservation.editMemo();
  await reservation.selectEditCompleteButton();
  await reservation.checkEditSuccessText();

  await reservation.checkReservationSuccess();

  
  







  // // 예약 등록 확인
  // await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible(); // 상담내용
  // await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  // await expect(page.getByRole('cell', { name: '상담예약' })).toBeVisible(); // 예약 종류
  // await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담사A2' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' }).first()).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' }).nth(2)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '보톡스' }).nth(2)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '필러' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();// 작성자
  // // 예약 수정 
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').click();
  // await expect(page.getByText('예약 수정')).toBeVisible();
  // // 예약 종류 수정
  // await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  // await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  // await page.getByRole('option', { name: '진료예약' }).click();
  // // 예약 부서 수정
  // await expect(page.getByText('예약부서')).toBeVisible();
  // await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  // await page.getByRole('option', { name: '상담-상담사B' }).click();
  // // 방문시간 수정
  // await expect(page.getByText('방문시간')).toBeVisible();
  // await page.getByRole('combobox', { name: '-' }).click();
  // await page.getByRole('option', { name: '9:30', exact: true }).click();
  // // 예상 소요시간 수정
  // await expect(page.getByText('예상 소요시간')).toBeVisible();
  // await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  // await page.getByRole('menuitem', { name: '1시간 0분', exact: true }).click();
  // // 내원경로 수정
  // await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  // await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  // await page.getByRole('option', { name: '기타' }).click();
  // // 의사 수정
  // await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '테스트의사' }).click();
  // // 상담사 수정
  // await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '노윤이' }).click();
  // // 어시스트 수정
  // await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  // await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  // await page.getByRole('option', { name: '강슬아D' }).click();
  // // 작성자 수정
  // await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  // await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  // await page.getByRole('option', { name: '홍군' }).click();
  // // 시/수술 카테고리 추가 및 삭제
  // await page.getByRole('button', { name: '+', exact: true }).click();
  // await page.getByRole('button', { name: '+', exact: true }).click();
  // await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // // 시/수술 카테고리 추가
  // await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // await page.locator('.sc-fUBkdm > div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  // await page.getByRole('option', { name: '피부 시술' }).click();
  // // 시/수술명 추가
  // await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  // await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  // await page.getByRole('option', { name: '인모드' }).click();
  // // 예약 메모 수정
  // await expect(page.getByText('예약메모')).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.locator('pre').getByText('예약 메모 입력 자동화').click();
  // await page.locator('pre div').filter({ hasText: '예약 메모 입력 자동화' }).fill('예약 메모 입력 자동화 수정');
  // // 예약 수정 > 수정완료 버튼 선택 
  // await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  // await page.getByRole('button', { name: '수정완료' }).click();
  // await page.waitForTimeout(3000);
  // await expect(page.getByText('예약 및 예약문자를 변경했습니다')).toBeVisible();
  // // 예약 수정 확인
  // await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화 수정' })).toBeVisible(); // 예약 메모
  // await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  // await expect(page.getByRole('cell', { name: '진료예약' })).toBeVisible(); // 예약 종류
  // await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담사B' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '테스트의사' }).nth(2)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '강슬아D' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '보톡스' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  // await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible(); // 시/수술명
  // await expect(page.getByRole('cell', { name: '필러' })).toBeVisible(); // 시/수술 카테고리 추가
  // await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible(); // 시/수술명 추가
  // await expect(page.getByRole('cell', { name: '홍군' })).toBeVisible(); // 작성자
  // // 예약 취소
  // await expect(page.getByText('통합차트')).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  // await expect(page.getByRole('button', { name: '예약취소' })).toBeVisible();
  // await page.getByRole('button', { name: '예약취소' }).click(); // 예약 취소 버튼 선택
  // // 예약 취소 안내 팝업 진입 확인
  // await expect(page.getByText('[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기')).toBeVisible();
  // await expect(page.getByRole('button', { name: '미전송' })).toBeVisible();
  // await page.getByRole('button', { name: '미전송' }).click(); // 미전송 선택
  // await page.waitForTimeout(3000);
  // // 예약 취소 확인
  // await expect(page.getByText('예약이 취소되었습니다')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '예약취소' })).toBeVisible();
  // // 예약 삭제 
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // // 삭제 안내 팝업
  // await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click(); // 삭제 안내 팝업 > 삭제 확인
  // await page.waitForTimeout(3000);
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
});
