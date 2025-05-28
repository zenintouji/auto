import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { SurgicalNursing } from '../../../pages/SurgicalNursing';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Surgical Nursing Test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const surgicalNursing = new SurgicalNursing(page);


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

  // 통합차트 > 수술간호 진입
  await surgicalNursing.enterSurgicalNursingChart();

  /////////////
  // 수술간호 등록 
  await surgicalNursing.selectRegistNursing();

  await surgicalNursing.selectDoctor();
  await surgicalNursing.selectNurse();

  await surgicalNursing.selectSurgicalCategory();
  await surgicalNursing.selectSurgery();

  await surgicalNursing.enterSurgeryStartTime();
  await surgicalNursing.enterSurgeryEndTime();
  await surgicalNursing.enterMemo();

  await surgicalNursing.selectSaveButton();
  await surgicalNursing.checkCreateSuccessText();

  await surgicalNursing.checkSurgerySuccess();

  /////////////
  // 수술간호 수정

  await surgicalNursing.selectEdit();

  await surgicalNursing.editDoctor();
  await surgicalNursing.editNurse();
  
  await surgicalNursing.editSurgicalCategory();
  await surgicalNursing.editSurgery();
  await surgicalNursing.editMemo();

  await surgicalNursing.editNursingChart();

  await surgicalNursing.checkEditSuccess();

  await surgicalNursing.checkSurgerySuccess();

  /////////////
  // 수술간호 삭제

  await surgicalNursing.selectSurgeryChart();
  await surgicalNursing.selectDeleteButton();

  await surgicalNursing.deletePopup();

  await surgicalNursing.checkDeleteSuccessText();
  
  // // 수술간호차트 삭제
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