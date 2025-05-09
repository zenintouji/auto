import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { SeeDoctor } from '../../../pages/SeeDoctor';

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
  const seedoctor = new SeeDoctor(page);

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
  // 통합차트 > 진료차트
  await seedoctor.enterTreatment();
  
  // 진료 등록
  //////////

  await seedoctor.selectCreateTreatment();
  await seedoctor.selectDoctor();
  await seedoctor.selectSurgicalCategory();
  await seedoctor.selectSurgery();
  await seedoctor.enterMemo();
  await seedoctor.enterPrescription();
  await seedoctor.closeAlertPopup();
  await seedoctor.registerPrescription();

  await seedoctor.checkPrescriptionSuccess();

  await seedoctor.selectPenchart();
  await seedoctor.loadImageToCustomer();
  await seedoctor.checkLoadImageSuccessText();

  await seedoctor.selectSaveButton();
  await seedoctor.checkSaveSuccessText();

  await seedoctor.checkTreatmentSuccess();


  // 진료 수정
  //////////

  await seedoctor.selectEdit();
  await seedoctor.editDoctor();
  await seedoctor.addingSurgeryCategory();
  await seedoctor.editSurgicalCategory();
  await seedoctor.editSurgery();
  await seedoctor.editMemo();

  await seedoctor.selectPenchart();
  await seedoctor.loadImageToCustomer();
  await seedoctor.checkLoadImageSuccessText();

  await seedoctor.selectEditCompleteButton();
  await seedoctor.checkEditSuccessText();

  await seedoctor.checkTreatmentSuccess();











  
  
  // // 차트 출력
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  // await expect(page.getByRole('button', { name: '차트 출력' })).toBeVisible();
  // await page.getByRole('button', { name: '차트 출력' }).click();
  // // 차트 출력 카테고리 출력
  // await expect(page.getByRole('heading', { name: '차트 출력 close' })).toBeVisible();
  // await expect(page.getByRole('heading', { name: '정보 확인' })).toBeVisible();
  // await expect(page.getByLabel('차트 출력').getByText('차트번호')).toBeVisible();
  // await expect(page.getByText('환자 성명')).toBeVisible();
  // await expect(page.getByText('주민등록번호')).toBeVisible();
  // await expect(page.getByLabel('차트 출력').getByText('전화번호')).toBeVisible();
  // await expect(page.getByLabel('차트 출력').getByText('주소')).toBeVisible();
  // await expect(page.getByRole('heading', { name: '처방전 선택' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '취소' })).toBeVisible();
  // await page.getByRole('button', { name: '취소' }).click();
  // await expect(page.getByText('통합차트')).toBeVisible();
  // // 진료 삭제
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // await expect(page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?')).toBeVisible();
  // await expect(page.getByText('펜차트 포함 삭제')).toBeVisible();
  // await expect(page.getByText('차트만 삭제')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await page.waitForTimeout(3000);
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // // 처방전 
  // await expect(page.getByText('처방전 (1)')).toBeVisible();
  // await page.getByText('처방전 (1)').click();
  // await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // // 처방전 삭제
  // await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // // 삭제 안내 팝업
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});