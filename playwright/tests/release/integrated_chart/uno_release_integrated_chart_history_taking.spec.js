import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { Exception } from "../../../pages/Exception";
import { customerSearch } from "../../../pages/CustomerSearch";
import { WalkInReception } from "../../../pages/WalkInReception";
import { HistoryTaking } from "../../../pages/HistoryTaking";

test.setTimeout(60000);

test.use({
  viewport: {
    height: 1080,
    width: 1920,
  },
});

test("Integrated Chart > History Taking Test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const historyTaking = new HistoryTaking(page);

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

  // 문진 차트
  await historyTaking.enterHistoryTakingChart();

  await historyTaking.registHistoryTaking();

  await historyTaking.selectHistoryTaking();

  await historyTaking.enterHistoryTaking();
  await historyTaking.essayQuestionAnswer();
  await historyTaking.choiceOne();
  await historyTaking.choiceMultiple();
  await historyTaking.checkAgreeToUse();
  await historyTaking.saveForm();
  await historyTaking.checkSaveSuccess();

  await historyTaking.checkHistoryTaking();

  await historyTaking.registHistoryTaking();
  await historyTaking.selectHistoryTaking();

  // 임시 저장
  await historyTaking.TemporarySave();
  await historyTaking.checkTemporarySaveSuccess();

  await historyTaking.checkIncompleteHistoryTaking();

  await historyTaking.selectForm();
  await historyTaking.deleteForm();
  await historyTaking.deletePopup();
  await historyTaking.deleteSuccess();


});
