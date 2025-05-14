import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Setting } from '../../../pages/Setting';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Setting Test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const setting = new Setting(page);

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

  // 설정 진입 > 등록화면 기본 노출 기능 확인
  await setting.enterSetting();
  await setting.checkSettingInfoText();
  
  await setting.registerDefault();

  // 문진 해제
  await setting.enterSetting();
  await setting.uncheckHistoryTaking();

  // 처방전 해제
  await setting.enterSetting();
  await setting.uncheckPrescription();

  // 통화 해제
  await setting.enterSetting();
  await setting.uncheckPhoneCall();

  // 메시지 해제
  await setting.enterSetting();
  await setting.uncheckMessage();

  // 수납 해제
  await setting.enterSetting();
  await setting.uncheckPayment();

  // 펜차트 해제
  await setting.enterSetting();
  await setting.uncheckPenchart();

  // 피부관리 해제
  await setting.enterSetting();
  await setting.uncheckSkinCare();

  // 간호 해제
  await setting.enterSetting();
  await setting.uncheckNursing();

  // 수술간호 해제
  await setting.enterSetting();
  await setting.uncheckSurgicalNursing();

  // 시/수술 해제
  await setting.enterSetting();
  await setting.uncheckSurgery();

  // 진료 해제
  await setting.enterSetting();
  await setting.uncheckTreatment();

  // 상담 해제
  await setting.enterSetting();
  await setting.uncheckConsultation();

  // 접수 해제
  await setting.enterSetting();
  await setting.uncheckReception();

  // 예약 해제
  await setting.enterSetting();
  await setting.uncheckReservation();

  // 전체선택
  await setting.enterSetting();
  await setting.selectAll();

  /// 창분할
  ////////

  await setting.seperateScreen();
  await setting.seperateScreenReception();
  await setting.seperateScreenConsultation();
  await setting.seperateScreenTreatment();
  await setting.seperateScreenSurgery();
  await setting.seperateScreenSurgicalNursing();
  await setting.seperateScreenNursing();
  await setting.seperateScreenSkinCare();
  await setting.seperateScreenPayment();
  await setting.seperateScreenMessage();
  await setting.seperateScreenPhoneCall();
  await setting.seperateScreenHistoryTaking();
  await setting.seperateScreenPenchart();

  await setting.singleScreen();


});