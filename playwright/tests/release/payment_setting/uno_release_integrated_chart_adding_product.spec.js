import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Payment } from '../../../pages/Payment';
import { AddProduct } from '../../../pages/AddProduct';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Adding Product', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const payment = new Payment(page);
  const addproduct = new AddProduct(page);


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
  
  await payment.enterPaymentChart();
  await payment.registPayment();

  await addproduct.enterAddProduct();
  await addproduct.enterCreateProductCode();
  await addproduct.addProductTax();
  await addproduct.addList();
  await addproduct.addProductNonTax();
  await addproduct.saveProduct();
  await addproduct.checkSaveSuccessText();

  await addproduct.closeAddProductModal();
  await addproduct.closeIntegratedChart();

  await addproduct.enterPaymentSetting();
  await addproduct.enterProductCategory();

  await addproduct.searchProduct();
  
  await addproduct.checkSearchProduct();

  // 삭제
  await addproduct.selectDeleteTaxProduct();
  await addproduct.deleteModal();
  await addproduct.checkDeleteSuccessText();

  // 미사용
  await addproduct.selectNonUsingProduct();
  await addproduct.nonUsingModal(); 
  await addproduct.checkNonUsingSuccessText();

  // 사용
  await addproduct.selectUsingProduct();
  await addproduct.usingModal();
  await addproduct.checkUsingSuccessText();

  await addproduct.selectDeleteNonTaxProduct();
  await addproduct.deleteModal();
  await addproduct.checkDeleteSuccessText();

});