import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { AddSurgery } from '../../../pages/AddSurgery';
import { PaymentCode } from '../../../pages/PaymentCode';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Code Setting', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const addsurgery = new AddSurgery(page);
  const paymentcode = new PaymentCode(page);

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

  // 수납코드 진입
  await addsurgery.enterPaymentCode();

  // 카테고리 추가
  await paymentcode.selectAddSurgeryButton();
  await paymentcode.selectAddCategory();
  await paymentcode.addCategory();
  await paymentcode.selectSaveCategory();
  await paymentcode.checkSaveSuccessText();

  // 카테고리 추가되고, 시/수술 팝업으로 ㄱㄱㄱㄱㄱ
  await paymentcode.selectCategory();
  await paymentcode.addSurgeryName();
  await paymentcode.addCountOfSurgery();
  await paymentcode.selectTermOfSurgery();
  await paymentcode.addPrice();
  await paymentcode.addList();
  await paymentcode.addNonTaxSurgeryName();
  await paymentcode.saveSurgery();
  await paymentcode.checkSaveSuccessText();

  await paymentcode.checkSaveResult();

  // 시/수술 삭제
  await paymentcode.deleteNonTax();
  await paymentcode.enterDeleteModal();
  await paymentcode.checkDeleteSuccessText();

  // 시/수술 미사용
  await paymentcode.nonUsingSurgery();
  await paymentcode.enterNonUsingModal();
  await paymentcode.checkNonUsingSuccessText();
  
  // 시/수술 사용
  await paymentcode.usingSurgery();
  await paymentcode.enterUsingModal();
  await paymentcode.checkUsingSuccessText();

  // 카테고리 미사용
  await paymentcode.nonUsingCategory();
  await paymentcode.enterNonUsingModal();
  await paymentcode.checkNonUsingSuccessText();

  // 카테고리 삭제
  await paymentcode.deleteCategory();
  await paymentcode.enterDeleteModal();
  await paymentcode.checkDeleteCategorySuccessText();

});