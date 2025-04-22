import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Nursing } from '../../../pages/Nursing';

test.setTimeout(60000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Nursing Chart Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const nursing = new Nursing(page);
  
  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login("jwpark@v2test.com", "uunn2345%%");

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

  await nursing.enterNursingChart();

  await nursing.selectRegistNursing();

  await nursing.selectDoctor();
  await nursing.selectNurse();
  await nursing.selectSurgicalCategory();
  await nursing.selectSurgery();
  await nursing.vitalBodyWeight();
  await nursing.vitalPresure();
  await nursing.selectMedicine();
  await nursing.enterAmountMedicine();
  await nursing.enterMemo();

  await nursing.saveNursingChart();
  await nursing.checkSaveSuccess();

  await nursing.checkNursingSuccess();

  // 간호 차트 수정
  await nursing.enterEditChart();

  await nursing.editDoctor();
  await nursing.editNurse();
  await nursing.editSurgicalCategory();
  await nursing.editSurgery();
  await nursing.editVitalBodyWeight();
  await nursing.editVitalPresure();
  await nursing.editMedicine();
  await nursing.editAmountMedicine();
  await nursing.editMemo();

  await nursing.editNursingChart();
  await nursing.checkEditSuccess();

  // 삭제
  await nursing.selectChart();
  await nursing.selectDelete();
  await nursing.deletePopup();
  await nursing.checkDeleteSuccess();
















  // // 통합차트
  // await expect(page.getByText('통합차트')).toBeVisible();
  // // 간호차트
  // await page.getByText('간호 (0)', { exact: true }).click();
  // await expect(page.getByRole('button', { name: '+ 간호등록' })).toBeVisible();
  // // 간호 등록
  // await page.getByRole('button', { name: '+ 간호등록' }).click();
  // await expect(page.getByText('간호 등록')).toBeVisible();
  // // 의사
  // await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '최지안' }).click();
  // // 간호사
  // await expect(page.locator('label').filter({ hasText: '간호사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '간호사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '홍명희' }).click();
  // // 시/수술 카테고리
  // await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  // await page.getByRole('option', { name: '성형', exact: true }).click();
  // // 시/수술명
  // await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  // await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  // await page.getByRole('option', { name: '눈매교정' }).click();
  // // 바이탈
  // await expect(page.getByText('바이탈')).toBeVisible();
  // // 바이탈 > 몸무게
  // await expect(page.getByText('몸무게 (kg)')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(0).click();
  // await page.locator('input[placeholder="-"]').nth(0).fill('10');
  // await page.locator('input[placeholder="-"]').nth(1).click();
  // await page.locator('input[placeholder="-"]').nth(1).fill('20');
  // await page.locator('input[placeholder="-"]').nth(2).click();
  // await page.locator('input[placeholder="-"]').nth(2).fill('30');
  // await page.locator('input[placeholder="-"]').nth(3).click();
  // await page.locator('input[placeholder="-"]').nth(3).fill('40');
  // await page.locator('input[placeholder="-"]').nth(4).click();
  // await page.locator('input[placeholder="-"]').nth(4).fill('50');
  // await page.locator('input[placeholder="-"]').nth(5).click();
  // await page.locator('input[placeholder="-"]').nth(5).fill('60');
  // await page.locator('input[placeholder="-"]').nth(6).click();
  // await page.locator('input[placeholder="-"]').nth(6).fill('70');
  // await page.locator('input[placeholder="-"]').nth(7).click();
  // await page.locator('input[placeholder="-"]').nth(7).fill('80');
  // await page.locator('input[placeholder="-"]').nth(8).click();
  // await page.locator('input[placeholder="-"]').nth(8).fill('90');
  // await page.locator('input[placeholder="-"]').nth(9).click();
  // await page.locator('input[placeholder="-"]').nth(9).fill('100');
  // // 바이탈 > 혈압
  // await expect(page.getByText('혈압 (mmHg)')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(10).click();
  // await page.locator('input[placeholder="-"]').nth(10).fill('20');
  // await page.locator('input[placeholder="-"]').nth(11).click();
  // await page.locator('input[placeholder="-"]').nth(11).fill('30');
  // await page.locator('input[placeholder="-"]').nth(12).click();
  // await page.locator('input[placeholder="-"]').nth(12).fill('40');
  // await page.locator('input[placeholder="-"]').nth(13).click();
  // await page.locator('input[placeholder="-"]').nth(13).fill('50');
  // await page.locator('input[placeholder="-"]').nth(14).click();
  // await page.locator('input[placeholder="-"]').nth(14).fill('60');
  // await page.locator('input[placeholder="-"]').nth(15).click();
  // await page.locator('input[placeholder="-"]').nth(15).fill('70');
  // await page.locator('input[placeholder="-"]').nth(16).click();
  // await page.locator('input[placeholder="-"]').nth(16).fill('80');
  // await page.locator('input[placeholder="-"]').nth(17).click();
  // await page.locator('input[placeholder="-"]').nth(17).fill('90');
  // await page.locator('input[placeholder="-"]').nth(18).click();
  // await page.locator('input[placeholder="-"]').nth(18).fill('100');
  // await page.locator('input[placeholder="-"]').nth(19).click();
  // await page.locator('input[placeholder="-"]').nth(19).fill('110');
  // // 투약 약품명
  // await expect(page.getByText('투약 약품명')).toBeVisible();
  // await page.getByRole('combobox', { name: '투약 약품명을 선택하세요' }).click();
  // await page.getByRole('option', { name: '수액' }).click();
  // // 투약량
  // await expect(page.getByText('투약량')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(60).click();
  // await page.locator('input[placeholder="-"]').nth(60).fill('100');
  // // 간호내용
  // await expect(page.locator('label').filter({ hasText: '간호내용' })).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  // await page.locator('pre div').first().fill('간호내용 입력 자동화');
  // // 간호차트 등록
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await expect(page.getByText('간호를 생성했습니다')).toBeVisible();
  // // 간호차트 등록 확인
  // await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '간호내용 입력 자동화' })).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)')).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  // // 간호차트 수정
  // await expect(page.getByText('간호 수정')).toBeVisible();
  // // 의사 수정
  // await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '황범석' }).click();
  // // 간호사 수정
  // await expect(page.locator('label').filter({ hasText: '간호사' })).toBeVisible();
  // await page.getByRole('combobox', { name: '간호사를 선택하세요' }).click();
  // await page.getByRole('option', { name: '최지안' }).click();
  // // 시/수술 카테고리 수정
  // await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  // await page.getByRole('option', { name: '피부 시술' }).click();
  // // 시/수술명 수정
  // await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  // await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  // await page.getByRole('option', { name: '써마지' }).click();
  // // 시/수술 카테고리 추가 및 삭제
  // await page.getByRole('button', { name: '+' }).nth(3).click();
  // await page.getByRole('button', { name: '+' }).nth(3).click();
  // await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // // 시/수술 카테고리 추가 
  // await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // await page.getByPlaceholder('시/수술 카테고리를 선택하세요.').nth(1).click();
  // await page.getByRole('option', { name: '성형' }).nth(0).click();
  // // 시/수술명 추가
  // await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  // await page.getByPlaceholder('시/수술명을 선택하세요.').nth(1).click();
  // await page.getByRole('option', { name: '눈매교정' }).click();
  // // 바이탈 수정
  // await expect(page.getByText('바이탈')).toBeVisible();
  // // 바이탈 > 몸무게 수정
  // await expect(page.getByText('몸무게 (kg)')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(0).click();
  // await page.locator('input[placeholder="-"]').nth(0).fill('11');
  // await page.locator('input[placeholder="-"]').nth(1).click();
  // await page.locator('input[placeholder="-"]').nth(1).fill('22');
  // await page.locator('input[placeholder="-"]').nth(2).click();
  // await page.locator('input[placeholder="-"]').nth(2).fill('33');
  // await page.locator('input[placeholder="-"]').nth(3).click();
  // await page.locator('input[placeholder="-"]').nth(3).fill('44');
  // await page.locator('input[placeholder="-"]').nth(4).click();
  // await page.locator('input[placeholder="-"]').nth(4).fill('55');
  // await page.locator('input[placeholder="-"]').nth(5).click();
  // await page.locator('input[placeholder="-"]').nth(5).fill('66');
  // await page.locator('input[placeholder="-"]').nth(6).click();
  // await page.locator('input[placeholder="-"]').nth(6).fill('77');
  // await page.locator('input[placeholder="-"]').nth(7).click();
  // await page.locator('input[placeholder="-"]').nth(7).fill('88');
  // await page.locator('input[placeholder="-"]').nth(8).click();
  // await page.locator('input[placeholder="-"]').nth(8).fill('99');
  // await page.locator('input[placeholder="-"]').nth(9).click();
  // await page.locator('input[placeholder="-"]').nth(9).fill('110');
  // // 바이탈 > 혈압 수정
  // await expect(page.getByText('혈압 (mmHg)')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(10).click();
  // await page.locator('input[placeholder="-"]').nth(10).fill('22');
  // await page.locator('input[placeholder="-"]').nth(11).click();
  // await page.locator('input[placeholder="-"]').nth(11).fill('33');
  // await page.locator('input[placeholder="-"]').nth(12).click();
  // await page.locator('input[placeholder="-"]').nth(12).fill('44');
  // await page.locator('input[placeholder="-"]').nth(13).click();
  // await page.locator('input[placeholder="-"]').nth(13).fill('55');
  // await page.locator('input[placeholder="-"]').nth(14).click();
  // await page.locator('input[placeholder="-"]').nth(14).fill('66');
  // await page.locator('input[placeholder="-"]').nth(15).click();
  // await page.locator('input[placeholder="-"]').nth(15).fill('77');
  // await page.locator('input[placeholder="-"]').nth(16).click();
  // await page.locator('input[placeholder="-"]').nth(16).fill('88');
  // await page.locator('input[placeholder="-"]').nth(17).click();
  // await page.locator('input[placeholder="-"]').nth(17).fill('99');
  // await page.locator('input[placeholder="-"]').nth(18).click();
  // await page.locator('input[placeholder="-"]').nth(18).fill('110');
  // await page.locator('input[placeholder="-"]').nth(19).click();
  // await page.locator('input[placeholder="-"]').nth(19).fill('121');
  // // 투약 약품명 수정
  // await expect(page.getByText('투약 약품명')).toBeVisible();
  // await page.getByRole('combobox', { name: '투약 약품명을 선택하세요' }).click();
  // await page.getByRole('option', { name: '약품' }).click();
  // // 투약량 수정
  // await expect(page.getByText('투약량')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(60).click();
  // await page.locator('input[placeholder="-"]').nth(60).fill('50');
  // // 투약 약품명 추가 및 삭제 버튼 선택
  // await page.getByRole('button', { name: '+' }).nth(4).click();
  // await page.getByRole('button', { name: '+' }).nth(4).click();
  // await page.locator('button:has-text("-")').nth(4).click();
  // // 투약 약품명 추가
  // await expect(page.getByText('투약 약품명')).toBeVisible();
  // await page.getByPlaceholder('투약 약품명을 선택하세요.').nth(1).click();
  // await page.getByRole('option', { name: '우루사' }).click();
  // // 투약량 추가
  // await expect(page.getByText('투약량')).toBeVisible();
  // await page.locator('input[placeholder="-"]').nth(61).click();
  // await page.locator('input[placeholder="-"]').nth(61).fill('100');
  // // 간호내용 수정
  // await expect(page.locator('label').filter({ hasText: '간호내용' })).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.locator('pre').getByText('간호내용 입력 자동화').click();
  // await page.locator('pre div').filter({ hasText: '간호내용 입력 자동화' }).fill('간호내용 입력 자동화 수정');
  // // 간호 수정완료
  // await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  // await page.getByRole('button', { name: '수정완료' }).click();
  // await expect(page.getByText('간호를 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // // 간호 수정 확인
  // await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '써마지' })).toBeVisible(); // 시/수술명 추가
  // await expect(page.getByRole('cell', { name: '간호내용 입력 자동화 수정' })).toBeVisible(); //간호내용 
  // // 간호 차트 삭제
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // // 삭제 안내 팝업
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
});