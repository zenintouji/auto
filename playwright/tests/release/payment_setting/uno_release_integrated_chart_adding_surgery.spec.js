import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Surgery } from '../../../pages/Surgery';
import { AddSurgery } from '../../../pages/AddSurgery';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Adding Surgery', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const surgery = new Surgery(page);
  const addsurgery = new AddSurgery(page);

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

await surgery.enterSurgery();
await surgery.enterSurgeryModal();

await addsurgery.selectCreateSurgeryCode();
await addsurgery.selectAddCategory();

// 카테고리 추가
await addsurgery.addCategory();
await addsurgery.selectSaveCategory();
await addsurgery.checkSaveSuccessText();

await addsurgery.selectCategory();
await addsurgery.addSurgeryName();
await addsurgery.addCountOfSurgery();
await addsurgery.selectTaxCheckBox();
await addsurgery.addPrice();
await addsurgery.addList();
await addsurgery.addNonTaxSurgeryName();

await addsurgery.saveSurgery();
await addsurgery.checkSaveSuccessText();

await addsurgery.closeAddSurgeryModal();
await addsurgery.closeIntegratedChart();

// 수납코드 설정 진입
await addsurgery.enterPaymentCode();
await addsurgery.searchCategory();
await addsurgery.searchSurgeryName();

await addsurgery.selectSearchButton();

// 삭제
await addsurgery.deleteNonTax();
await addsurgery.enterDeleteModal();

await addsurgery.checkDeleteSuccessText();

// 시/수술명 미사용
await addsurgery.nonUsingSurgery();
await addsurgery.enterNonUsingModal();

await addsurgery.checkNonUsingSuccessText();

// 시/수술명 사용
await addsurgery.usingSurgery();
await addsurgery.enterUsingModal();

await addsurgery.checkUsingSuccessText();

// 카테고리 미사용
await addsurgery.nonUsingCategory();
await addsurgery.enterNonUsingModal();

await addsurgery.checkNonUsingSuccessText();

// 카테고리 삭제
await addsurgery.deleteCategory();
await addsurgery.enterDeleteModal();

await addsurgery.checkDeleteCategorySuccessText();

});