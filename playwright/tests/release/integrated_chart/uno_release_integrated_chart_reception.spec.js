import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Reception } from '../../../pages/Reception';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Reception Test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const reception = new Reception(page);


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
  // 통합차트
  await reception.enterReception();

  // 접수 등록
  await reception.selectCreateReception();
  await reception.selectType(); // 접수 종류
  await reception.selectDepartment(); // 접수 부서
  await reception.checkDate(); // 일자
  await reception.selectVisitTime(); // 방문시간
  await reception.selectExpectedtime(); // 예상소요시간
  await reception.selectVisitRoute(); // 내원경로
  await reception.selectDoctor(); // 의사
  await reception.selectCounselor(); // 상담사
  await reception.selectAssist(); // 어시스트
  await reception.selectWriter(); // 작성자
  await reception.selectSurgicalCategory(); // 시/수술 카테고리
  await reception.selectSurgery(); // 시/수술명
  await reception.enterMemo(); // 접수 메모

  await reception.selectSaveButton(); // 저장
  await reception.checkSaveSuccessText(); // 스낵바 확인 

  await reception.checkReceptionSuccess(); // 선택값 잘 들어가 있음????

  // 접수 수정
  await reception.selectEdit();
  await reception.editType();
  await reception.editDepartment();
  await reception.checkDate()
  await reception.editVisitTime();
  await reception.editExpectedtime();
  await reception.editVisitRoute();
  await reception.editDoctor();
  await reception.editCounselor();
  await reception.editAssist();
  await reception.editWriter();
  await reception.addingSurgeryCategory();
  await reception.editSurgicalCategory();
  await reception.editSurgery();
  await reception.editMemo();

  await reception.selectEditCompleteButton();
  await reception.checkEditSuccessText();

  await reception.checkReceptionSuccess();

  // 접수 취소
  await reception.cancelReception();
  await reception.checkCancelSuccessText();

  await reception.cancelStatus();

  // 접수 삭제
  await reception.deleteReception();
  await reception.checkDeleteSuccessText();

  await reception.checkDeleteSucess();






  // // 접수 수정
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').click();
  // await expect(page.getByText('접수 수정')).toBeVisible();
  // // 접수 종류
  // await expect(page.locator('label').filter({ hasText: '접수종류' })).toBeVisible();
  // // await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  // await expect(page.getByRole('combobox').nth(0)).toBeVisible();
  // await page.getByRole('combobox').nth(0).click();
  // await page.getByRole('option', { name: '진료접수' }).click();
  // // 접수 부서
  // await expect(page.getByText('접수부서')).toBeVisible();
  // await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  // await page.getByRole('option', { name: '상담-상담사B' }).click();
  // // 방문 시간
  // await expect(page.getByText('방문시간')).toBeVisible();
  // await page.getByRole('combobox', { name: '-' }).click();
  // await page.getByRole('option', { name: '9:30', exact: true }).click();
  // // 예상 소요시간
  // await expect(page.getByText('예상 소요시간')).toBeVisible();
  // await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  // await page.getByRole('menuitem', { name: '1시간 0분', exact: true }).click();
  // // 내원경로
  // await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  // await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  // await page.getByRole('option', { name: '직원소개' }).click();
  // // 의사
  // await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '강슬아D' }).click();
  // // 상담사
  // await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '노윤이' }).click();
  // // 어시스트
  // await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  // await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  // await page.getByRole('option', { name: '홍명희' }).click();
  // // 작성자
  // await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  // await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  // await page.getByRole('option', { name: '최지안' }).click();
  // // 시/수술 카테고리
  // await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // // 시/수술 카테고리 추가 버튼
  // await page.getByRole('button', { name: '+', exact: true }).click();
  // await page.getByRole('button', { name: '+', exact: true }).click();
  // await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // // await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .sc-hYmls').click();
  // // 시/수술 카테고리 추가
  // await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // // await page.locator('.sc-fUBkdm > div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  // await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).nth(1).click();
  // // await page.locator('[role="combobox"]').nth(22).click();
  // await page.getByRole('option', { name: '성형', exact: true }).click();
  // // 시/수술명 추가
  // await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  // // await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  // await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).nth(1).click();
  // await page.getByRole('option', { name: '눈매교정' }).click();
  // // 접수 메모
  // await expect(page.getByText('접수메모')).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.locator('pre').getByText('접수 메모 입력 자동화').click();
  // await page.locator('pre div').filter({ hasText: '접수 메모 입력 자동화' }).fill('접수 메모 입력 자동화 수정');
  // // 수정 완료
  // await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  // await page.getByRole('button', { name: '수정완료' }).click();
  // await expect(page.getByText('접수를 변경했습니다')).toBeVisible();
  // // 수정 확인
  // await expect(page.getByRole('cell', { name: '상담대기' })).toBeVisible(); // 접수상태
  // await expect(page.getByRole('cell', { name: '당일접수' })).toBeVisible(); // 접수방법
  // await expect(page.getByRole('cell', { name: '진료접수' })).toBeVisible(); // 접수종류
  // await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '상담사B' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '강슬아D' })).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(11)')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원소개', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(16)')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '접수 메모 입력 자동화 수정' })).toBeVisible(); // 접수 메모
  // // 접수 차트 선택
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  // // 접수취소 
  // await expect(page.getByRole('button', { name: '접수취소' })).toBeVisible();
  // await page.getByRole('button', { name: '접수취소' }).click();
  // await expect(page.getByText('접수가 취소됩니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('접수가 취소되었습니다')).toBeVisible();
  // // 접수 취소 확인
  // await expect(page.getByRole('cell', { name: '접수취소' })).toBeVisible();
  // // 접수 차트 선택
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  // // 삭제
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // await expect(page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();
});