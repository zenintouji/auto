import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { EmployeeManagement } from '../../../pages/EmployeeManagement';

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
  const employeeManagement = new EmployeeManagement(page);

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

  await employeeManagement.enterInEmployeeManagement();
  await employeeManagement.selectRegister();
  await employeeManagement.enterEmail();
  await employeeManagement.enterPassword();
  await employeeManagement.enterName();
  await employeeManagement.selectJobRole();
  await employeeManagement.selectPosition();
  await employeeManagement.enterPhoneNumber();
  await employeeManagement.enterExtensionNumber();
  await employeeManagement.enterBirthday();
  await employeeManagement.selectDepartment();
  await employeeManagement.selectSaveButton();

  await employeeManagement.keepProcessingModal();
  await employeeManagement.checkMovedToAuthorizationSetting();

  await employeeManagement.statusBoardMakeOn();
  await employeeManagement.statusBoardByOwnerMakeOn();
  await employeeManagement.reservationCalendarMakeOn();
  await employeeManagement.ctiCallManagementMakeOn();
  await employeeManagement.counselingManagementMakeOn();
  await employeeManagement.messageManagementMakeOn();
  await employeeManagement.researchMakeOn();
  await employeeManagement.accountingReportMakeOn();
  await employeeManagement.statisticsMakeOn();
  await employeeManagement.prescriptionMakeOn();
  await employeeManagement.settingMakeOn();
  await employeeManagement.secureSettingMakeOn();
  await employeeManagement.hospitalManagementMakeOn();

  // 정보 권한 설정
  await employeeManagement.checkInfoAuthorizationExist();
  await employeeManagement.deleteAuthorizationMakeOn();
  await employeeManagement.downloadAuthorizationMakeOn();
  await employeeManagement.penchartViewAuthorizationMakeOn();

  await employeeManagement.selectSaveButton();
  await employeeManagement.checkSaveSuccessText();

  // // 메뉴 권한 설정
  // // 저장
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('저장되었습니다')).toBeVisible();
  // // 직원관리 화면
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();
  // // 이름 검색
  // await expect(page.locator('#scrollSampleListener').getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름' }).fill('자동화');
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이름' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원 자동화 삭제용' })).toBeVisible();
  // // 초기화
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // // 이메일 검색
  // await expect(page.getByText('이메일 (ID)')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이메일 (ID)' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이메일 (ID)' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이메일 (ID)' }).fill('autotest');
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이메일(ID)' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: 'autotest@test.com' })).toBeVisible();
  // // 초기화
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();
  // // 이름 검색
  // await expect(page.locator('#scrollSampleListener').getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름' }).fill('자동화');
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이름' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원 자동화 삭제용' })).toBeVisible();
  // // 직원 수정
  // await expect(page.getByRole('cell').filter({ hasText: /^$/ }).nth(1)).toBeVisible();
  // await page.getByRole('cell').filter({ hasText: /^$/ }).nth(1).click();
  // await page.waitForTimeout(1000);
  // // 정보 입력
  // await expect(page.getByRole('heading', { name: '정보 입력' })).toBeVisible();
  // // 이름
  // await expect(page.getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름을 입력하세요' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름을 입력하세요' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름을 입력하세요' }).fill('직원 자동화 삭제용 수정');
  // await page.waitForTimeout(2000);
  // // 직무
  // await expect(page.getByText('직무')).toBeVisible();
  // await expect(page.getByRole('combobox', { name: '직무선택' })).toBeVisible();
  // await page.getByRole('combobox', { name: '직무선택' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('option', { name: '상담사' })).toBeVisible();
  // await page.getByRole('option', { name: '상담사' }).click();
  // // 직급
  // await expect(page.getByText('직급')).toBeVisible();
  // await expect(page.getByRole('combobox', { name: '직급을 선택하세요' })).toBeVisible();
  // await page.getByRole('combobox', { name: '직급을 선택하세요' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('option', { name: '대표원장' })).toBeVisible();
  // await page.getByRole('option', { name: '대표원장' }).click();
  // // 휴대폰번호
  // await expect(page.getByText('휴대폰 번호')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '휴대폰번호를 입력하세요' })).toBeVisible();
  // await page.getByRole('textbox', { name: '휴대폰번호를 입력하세요' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '휴대폰번호를 입력하세요' }).fill('01082828282');
  // // 내선번호
  // await expect(page.getByText('내선번호')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '내선번호를 입력하세요' })).toBeVisible();
  // await page.getByRole('textbox', { name: '내선번호를 입력하세요' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '내선번호를 입력하세요' }).fill('01085858585');
  // // 생년월일
  // await expect(page.getByText('생년월일')).toBeVisible();
  // // 입사일
  // await expect(page.getByText('입사일')).toBeVisible();
  // // 소속부서
  // await expect(page.getByText('소속부서')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '우노병원 Open' }).getByLabel('Open')).toBeVisible();
  // await page.getByRole('cell', { name: '우노병원 Open' }).getByLabel('Open').click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('option', { name: '추추가' })).toBeVisible();
  // await page.getByRole('option', { name: '추추가' }).click();
  // // 저장
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('수정되었습니다')).toBeVisible();
  // // 직원 관리
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();
  // // 이름 검색
  // await expect(page.locator('#scrollSampleListener').getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름' }).fill('자동화');
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이름' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원 자동화 삭제용' })).toBeVisible();
  // // 권한설정 
  // await expect(page.getByRole('cell', { name: '권한설정' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '설정', exact: true })).toBeVisible();
  // await page.getByRole('button', { name: '설정', exact: true }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('메뉴 권한 설정')).toBeVisible();
  // // 현황판
  // await expect(page.getByText('현황판').nth(1)).toBeVisible();
  // await expect(page.locator('.PrivateSwitchBase-input').first()).toBeVisible();
  // await page.locator('.PrivateSwitchBase-input').first().uncheck();
  // await page.waitForTimeout(1000);
  // // 예약 캘린더
  // await expect(page.locator('#bodyContentsWrapper').getByText('예약 캘린더')).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().uncheck();
  // await page.waitForTimeout(1000);
  // // CTI 통화관리
  // await expect(page.locator('#bodyContentsWrapper').getByText('CTI 통화관리')).toBeVisible();
  // await expect(page.locator('div:nth-child(3) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first()).toBeVisible();
  // await page.locator('div:nth-child(3) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().uncheck();
  // await page.waitForTimeout(1000);
  // // 상담문의 관리
  // await expect(page.locator('#bodyContentsWrapper').getByText('상담문의 관리')).toBeVisible();
  // await expect(page.locator('div:nth-child(4) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(4) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 메시지 관리
  // await expect(page.locator('#bodyContentsWrapper').getByText('메시지 관리')).toBeVisible();
  // await expect(page.locator('div:nth-child(5) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(5) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 조회
  // await expect(page.locator('#bodyContentsWrapper').getByText('조회')).toBeVisible();
  // await expect(page.locator('div:nth-child(6) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(6) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 결산
  // await expect(page.locator('#bodyContentsWrapper').getByText('결산')).toBeVisible();
  // await expect(page.locator('div:nth-child(7) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(7) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 통계
  // await expect(page.locator('#bodyContentsWrapper').getByText('통계')).toBeVisible();
  // await expect(page.locator('div:nth-child(8) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(8) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 처방전
  // await expect(page.getByText('처방전', { exact: true }).nth(1)).toBeVisible();
  // await expect(page.locator('div:nth-child(9) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(9) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 환경설정
  // await expect(page.getByText('환경설정')).toBeVisible();
  // await expect(page.locator('div:nth-child(10) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(10) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 보안설정
  // await expect(page.getByText('보안설정')).toBeVisible();
  // await expect(page.locator('div:nth-child(11) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(11) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 병원관리 
  // await expect(page.getByText('병원관리', { exact: true })).toBeVisible();
  // await expect(page.locator('div:nth-child(12) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(12) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 정보 권한 설정
  // await expect(page.getByText('정보 권한 설정')).toBeVisible();
  // // 삭제권한
  // await expect(page.getByText('삭제권한').first()).toBeVisible();
  // await expect(page.locator('div:nth-child(3) > div > div > div > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first()).toBeVisible();
  // await page.locator('div:nth-child(3) > div > div > div > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').first().uncheck();
  // await page.waitForTimeout(1000);
  // // 내려받기 권한
  // await expect(page.getByLabel('엑셀 내려받기, 펜차트 다운로드 및 인쇄, 차트 출력 권한을 설정할 수 있습니다')).toBeVisible();
  // await expect(page.locator('div:nth-child(3) > div > div > div:nth-child(2) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(3) > div > div > div:nth-child(2) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 펜차트 열람 권한
  // await expect(page.getByText('펜차트 열람 권한')).toBeVisible();
  // await expect(page.locator('div:nth-child(3) > div > div > div:nth-child(3) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input')).toBeVisible();
  // await page.locator('div:nth-child(3) > div > div > div:nth-child(3) > div:nth-child(2) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
  // await page.waitForTimeout(1000);
  // // 저장
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('저장되었습니다')).toBeVisible();
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();
  // // 이름 검색
  // await expect(page.locator('#scrollSampleListener').getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름' }).fill('자동화');
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이름' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원 자동화 삭제용' })).toBeVisible();
  // // 미사용
  // await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '미사용' })).toBeVisible();
  // await page.getByRole('button', { name: '미사용' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('수정되었습니다')).toBeVisible();
  // // 초기화
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();
  // // 이름, 미사용 검색
  // await expect(page.locator('#scrollSampleListener').getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름' }).fill('자동화');
  // await expect(page.getByText('사용여부')).toBeVisible();
  // await expect(page.getByRole('combobox', { name: '전체' })).toBeVisible();
  // await page.getByRole('combobox', { name: '전체' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('option', { name: '미사용' })).toBeVisible();
  // await page.getByRole('option', { name: '미사용' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이름' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원 자동화 삭제용 수정' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '사용' })).toBeVisible();
  // await page.getByRole('button', { name: '사용' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('수정되었습니다')).toBeVisible();
  // // 초기화
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();
  // // 이름 검색
  // await expect(page.locator('#scrollSampleListener').getByText('이름')).toBeVisible();
  // await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
  // await page.getByRole('textbox', { name: '이름' }).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('textbox', { name: '이름' }).fill('자동화');
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('cell', { name: '이름' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '직원 자동화 삭제용' })).toBeVisible();
  // // 삭제
  // await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // // 초기화
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '초기화' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.locator('#scrollSampleListener').getByRole('button', { name: '조회' })).toBeVisible();
  // await page.locator('#scrollSampleListener').getByRole('button', { name: '조회' }).click();
  // await page.waitForTimeout(1000);
  // await expect(page.getByRole('heading', { name: '직원 관리' })).toBeVisible();


});
