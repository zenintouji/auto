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







  // // 등록 되면서, 수납항목 추가 팝업 이동 > 닫기
  // await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  // await expect(page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button')).toBeVisible();
  // await page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button').click();
  // // 통합차트 닫기
  // await expect(page.getByText('통합차트')).toBeVisible();
  // await expect(page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3)).toBeVisible();
  // await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  // // 수납코드 설정 진입
  // await expect(page.getByText('고객조회 내역')).toBeVisible();
  // await expect(page.getByRole('button', { name: 'icon-settings 환경 설정' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '수납코드 설정' })).toBeVisible();
  // await page.getByRole('button', { name: '수납코드 설정' }).click();
  // // 수납코드 설정
  // await expect(page.getByRole('heading', { name: '수납코드 설정' })).toBeVisible();
  // await expect(page.getByRole('tab', { name: '제품' })).toBeVisible();
  // await page.getByRole('tab', { name: '제품' }).click();
  // // 검색
  // await expect(page.getByRole('textbox', { name: '제품명' })).toBeVisible();
  // await page.getByRole('textbox', { name: '제품명' }).click();
  // await page.getByRole('textbox', { name: '제품명' }).fill('삭제용');
  // await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  // await page.getByRole('button', { name: '검색' }).click();
  // // 검색 확인
  // // 카테고리
  // await expect(page.getByRole('cell', { name: '제품 추가 비과세 자동화 삭제용' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '제품 추가 자동화 삭제용' })).toBeVisible();
  // // 과세여부
  // await expect(page.getByRole('cell', { name: '비과세', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '과세', exact: true })).toBeVisible();
  // // VAT 제외
  // await expect(page.getByRole('cell', { name: '0' }).first()).toBeVisible();
  // await expect(page.getByRole('cell', { name: '90,909' })).toBeVisible();
  // // 금액
  // await expect(page.getByRole('cell', { name: '0' }).nth(1)).toBeVisible();
  // await expect(page.getByRole('cell', { name: '100,000' })).toBeVisible();
  // // 삭제
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '제품 추가 자동화 삭제용' })).not.toBeVisible();
  // // 미사용
  // await expect(page.getByRole('button', { name: '미사용' })).toBeVisible();
  // await page.getByRole('button', { name: '미사용' }).click();
  // await expect(page.getByText('미사용 처리 하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  // await expect(page.getByRole('button', { name: '미사용' })).not.toBeVisible();
  // // 사용
  // await expect(page.getByRole('button', { name: '사용' })).toBeVisible();
  // await page.getByRole('button', { name: '사용' }).click();
  // await expect(page.getByText('사용 처리 하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('사용 처리되었습니다')).toBeVisible();
  // // 삭제
  // await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).click();
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '제품 추가 비과세 자동화 삭제용' })).not.toBeVisible();

});