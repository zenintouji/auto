import { expect } from "playwright/test";

class EmployeeManagement {
    constructor(page) {
        this.page = page; 
        
        this.employeeManagementButton = page.getByRole('button', { name: '직원 관리' });
        this.employeeManagementTitle = page.getByRole('heading', { name: '직원 관리' });

        this.registerNewEmployeeButton = page.getByRole('button', { name: '신규 등록' }); // 신규등록

        // 정보 입력 
        // 이메일
        this.emailValue = '';
        this.emailInput = page.getByRole('textbox', { name: '이메일(ID)를 입력하세요' });
        // 비밀번호
        this.passwordValue = '';
        this.passwordInput = page.getByRole('textbox', { name: '~20자 영문자, 숫자, 특수기호 조합하여 입력하세요' });
        // 이름
        this.nameValue = '';
        this.nameInput = page.getByRole('textbox', { name: '이름을 입력하세요' });

        // 직무 및 직급할때 선택 ㅇㅇㅇ
        this.selectOptionValue = page.getByRole('option').nth(0);

        // 직무
        this.jobRoleValue = '';
        this.jobRoleCombobox = page.getByRole('combobox', { name: '직무선택' });
        // 직급
        this.positionValue = '';
        this.positionCombobox = page.getByRole('combobox', { name: '직급을 선택하세요' });
        // 휴대폰
        this.phoneNumberValue = '';
        this.phoneNumberInput = page.getByRole('textbox', { name: '휴대폰번호를 입력하세요' });
        // 내선번호
        this.extensionNumberValue = '';
        this.extensionNumberInput = page.getByRole('textbox', { name: '내선번호를 입력하세요' });
        // 생년월일
        this.birthValue = '';
        this.birthInput = page.locator('input[placeholder="YYYY-MM-DD"]').first();
        // 소속부서
        this.departValue = '';
        this.departInput = page.getByRole('cell', { name: /Open$/ }).nth(2);
        
        this.saveButton = page.getByRole('button', { name: '저장' });

        // 계속 진행
        this.keepProcessText = page.getByText('등록한 직원의 권한 설정을 계속 진행하시겠습니까?');
        this.confirmButton = page.getByRole('button', { name: '확인' });
        
        // 메뉴 권한 설정
        this.menuAuthorizationSettingText = page.getByText('메뉴 권한 설정');
        // 현황판
        this.statusBoardSetting = page.locator('#bodyContentsWrapper').getByText(/^현황판$/).first();
        this.statusBoardToggle = page.locator('#bodyContentsWrapper').getByText(/^현황판$/).locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 담당자별 현황판
        this.statusBoardByOwnerSetting = page.locator('#bodyContentsWrapper').getByText('담당자별 현황판');
        this.statusBoardByOwnerToggle = page.locator('#bodyContentsWrapper').getByText('담당자별 현황판').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 예약 캘린더
        this.reservationCalendarSetting = page.locator('#bodyContentsWrapper').getByText('예약 캘린더');
        this.reservationCalendarToggle = page.locator('#bodyContentsWrapper').getByText('예약 캘린더').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // CTI 통화관리
        this.ctiCallManagementSetting = page.locator('#bodyContentsWrapper').getByText('CTI 통화관리');
        this.ctiCallManagementToggle = page.locator('#bodyContentsWrapper').getByText('CTI 통화관리').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 상담문의 관리
        this.counselingManagementSetting = page.locator('#bodyContentsWrapper').getByText('상담문의 관리');
        this.counselingManagementToggle = page.locator('#bodyContentsWrapper').getByText('상담문의 관리').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 메시지  관리
        this.messageManagementSetting = page.locator('#bodyContentsWrapper').getByText('메시지 관리');
        this.messageManagementToggle = page.locator('#bodyContentsWrapper').getByText('메시지 관리').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 조회
        this.researchSetting = page.locator('#bodyContentsWrapper').getByText('조회');
        this.researchToggle = page.locator('#bodyContentsWrapper').getByText('조회').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 결산
        this.accountingReportSetting = page.locator('#bodyContentsWrapper').getByText('결산');
        this.accountingReportToggle = page.locator('#bodyContentsWrapper').getByText('결산').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 통계
        this.statisticsSetting = page.locator('#bodyContentsWrapper').getByText('통계');
        this.statisticsToggle = page.locator('#bodyContentsWrapper').getByText('통계').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 처방전
        this.prescriptionSetting = page.locator('#bodyContentsWrapper').getByText(/^처방전$/).first();
        this.prescriptionToggle = page.locator('#bodyContentsWrapper').getByText(/^처방전$/).locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 환경설정
        this.settingAuthorizationSetting = page.locator('#bodyContentsWrapper').getByText('환경설정');
        this.settingAuthorizationToggle = page.locator('#bodyContentsWrapper').getByText('환경설정').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 보안설정
        this.secureSetting = page.locator('#bodyContentsWrapper').getByText('보안설정');
        this.secureToggle = page.locator('#bodyContentsWrapper').getByText('보안설정').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 병원관리
        this.hospitalManagementSetting = page.locator('#bodyContentsWrapper').getByText(/^병원관리$/).first();
        this.hospitalManagementToggle = page.locator('#bodyContentsWrapper').getByText(/^병원관리$/).locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');

        // this.onOffToggle = page.locator('.PrivateSwitchBase-input').nth(1);

        // 정보 권한 설정
        this.infoAuthorizationSetting = page.getByText('정보 권한 설정');
        // 삭제권한
        this.deleteAuthorization = page.locator('#bodyContentsWrapper').getByText('삭제권한').first();
        this.deleteAuthorizationToggle = page.locator('#bodyContentsWrapper').getByText('삭제권한').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 내려받기 권한
        this.downloadAuthorization = page.locator('#bodyContentsWrapper').getByText('내려받기 권한');
        this.downloadAuthorizationToggle = page.locator('#bodyContentsWrapper').getByText('내려받기 권한').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');
        // 펜차트 열람 권한
        this.penchartViewAuthorization = page.locator('#bodyContentsWrapper').getByText('펜차트 열람 권한');
        this.penchartViewAuthorizationToggle = page.locator('#bodyContentsWrapper').getByText('펜차트 열람 권한').locator('xpath=ancestor::div[contains(@class, "menu-container")]').locator('input.PrivateSwitchBase-input');

        // 저장버튼
        this.saveButton = page.getByRole('button', { name: '저장' });
        this.saveSuccessText = page.getByText('저장되었습니다');

    }

    async enterInEmployeeManagement() {
        await expect(this.employeeManagementButton).toBeVisible();
        await this.employeeManagementButton.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.employeeManagementTitle).toBeVisible();
        console.log('✅ 직원관리 진입 성공');
    }

    async selectRegister() {
        await expect(this.registerNewEmployeeButton).toBeVisible();
        await this.registerNewEmployeeButton.click();
        await this.page.waitForLoadState('domcontentloaded');

        console.log('✅ 직원 신규등록 진입 성공');
    }

    async enterEmail() {
        await expect(this.emailInput).toBeVisible();
        await this.emailInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.emailInput.type('autotest@test.com', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.emailValue = await this.emailInput.inputValue();
        console.log('🔍 입력한 이메일: ', this.emailValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterPassword() {
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.passwordInput.type('asdf1234!', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.passwordValue = await this.passwordInput.inputValue();
        console.log('🔍 입력한 비밀번호: ', this.emailValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterName() {
        await expect(this.nameInput).toBeVisible();
        await this.nameInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.nameInput.type('직원_자동화_삭제용', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.nameValue = await this.nameInput.inputValue();
        console.log('🔍 입력한 이름: ', this.nameValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 직무
    async selectJobRole() {
        await expect(this.jobRoleCombobox).toBeVisible();
        await this.jobRoleCombobox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.jobRoleValue = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 입력한 직무: ', this.jobRoleValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 직급
    async selectPosition() {
        await expect(this.positionCombobox).toBeVisible();
        await this.positionCombobox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.positionValue = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 입력한 직급: ', this.positionValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 핸드폰 번호
    async enterPhoneNumber() {
        await expect(this.phoneNumberInput).toBeVisible();
        await this.phoneNumberInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.phoneNumberInput.type('01084848484', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.phoneNumberValue = await this.phoneNumberInput.inputValue();
        console.log('🔍 입력한 핸드폰 번호: ', this.phoneNumberValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterExtensionNumber() {
        await expect(this.extensionNumberInput).toBeVisible();
        await this.extensionNumberInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.extensionNumberInput.type('01084848484', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.extensionNumberValue = await this.extensionNumberInput.inputValue();
        console.log('🔍 입력한 내선번호: ', this.extensionNumberValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterBirthday() {
        await expect(this.birthInput).toBeVisible();
        await this.birthInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.birthInput.type('2000-01-01', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.birthValue = await this.birthInput.inputValue();
        console.log('🔍 입력한 생년월일: ', this.birthValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectDepartment() {
        await expect(this.departInput).toBeVisible();
        await this.departInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.departValue = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 선택한 소속부서: ', this.departValue);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 저장 버튼 선택 성공');
    }

    async keepProcessingModal() {
        await expect(this.keepProcessText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 권한 설정 진입 알림 모달 > 확인 선택 성공');
    }

    // 메뉴 권한 설정
    async checkMovedToAuthorizationSetting() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.menuAuthorizationSettingText).toBeVisible();
        console.log('✅ 메뉴 권한 설정 진입 성공');
        await this.page.waitForTimeout(1000);
    }

    async statusBoardMakeOn() {
        await expect(this.statusBoardSetting).toBeVisible();
        await expect(this.statusBoardToggle).toBeVisible();

        await this.statusBoardToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.statusBoardToggle.isChecked();

        console.log(isOn ? '✅ 현황판 토글 ON으로 설정됨' : '❌ 현황판 토글 여전히 OFF 상태');
    }

    async statusBoardByOwnerMakeOn() {
        await expect(this.statusBoardByOwnerSetting).toBeVisible();
        await expect(this.statusBoardByOwnerToggle).toBeVisible();

        await this.statusBoardByOwnerToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.statusBoardByOwnerToggle.isChecked();

        console.log(isOn ? '✅ 담당자별 현황판 토글 ON으로 설정됨' : '❌ 담당자별 현황판 토글 여전히 OFF 상태');
    }

    async reservationCalendarMakeOn() {
        await expect(this.reservationCalendarSetting).toBeVisible();
        await expect(this.reservationCalendarToggle).toBeVisible();

        await this.reservationCalendarToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.reservationCalendarToggle.isChecked();

        console.log(isOn ? '✅ 예약 캘린더 토글 ON으로 설정됨' : '❌ 예약 캘린더 토글 여전히 OFF 상태');
    }

    async ctiCallManagementMakeOn() {
        await expect(this.ctiCallManagementSetting).toBeVisible();
        await expect(this.ctiCallManagementToggle).toBeVisible();

        await this.ctiCallManagementToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.ctiCallManagementToggle.isChecked();

        console.log(isOn ? '✅ CTI 통화관리 토글 ON으로 설정됨' : '❌ CTI 통화관리 토글 여전히 OFF 상태');
    }

    async counselingManagementMakeOn() {
        await expect(this.counselingManagementSetting).toBeVisible();
        await expect(this.counselingManagementToggle).toBeVisible();

        await this.counselingManagementToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.counselingManagementToggle.isChecked();

        console.log(isOn ? '✅ 상담문의 관리 토글 ON으로 설정됨' : '❌ 상담문의 관리 토글 여전히 OFF 상태');
    }

    async messageManagementMakeOn() {
        await expect(this.messageManagementSetting).toBeVisible();
        await expect(this.messageManagementToggle).toBeVisible();

        await this.messageManagementToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.messageManagementToggle.isChecked();

        console.log(isOn ? '✅ 메시지 관리 토글 ON으로 설정됨' : '❌ 메시지 관리 토글 여전히 OFF 상태');
    }

    async researchMakeOn() {
        await expect(this.researchSetting).toBeVisible();
        await expect(this.researchToggle).toBeVisible();

        await this.researchToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.researchToggle.isChecked();

        console.log(isOn ? '✅ 조회 토글 ON으로 설정됨' : '❌ 조회 토글 여전히 OFF 상태');
    }

    async accountingReportMakeOn() {
        await expect(this.accountingReportSetting).toBeVisible();
        await expect(this.accountingReportToggle).toBeVisible();

        await this.accountingReportToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.accountingReportToggle.isChecked();

        console.log(isOn ? '✅ 결산 토글 ON으로 설정됨' : '❌ 결산 토글 여전히 OFF 상태');
    }

    async statisticsMakeOn() {
        await expect(this.statisticsSetting).toBeVisible();
        await expect(this.statisticsToggle).toBeVisible();

        await this.statisticsToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.statisticsToggle.isChecked();

        console.log(isOn ? '✅ 통계 토글 ON으로 설정됨' : '❌ 통계 토글 여전히 OFF 상태');
    }

    async prescriptionMakeOn() {
        await expect(this.prescriptionSetting).toBeVisible();
        await expect(this.prescriptionToggle).toBeVisible();

        await this.prescriptionToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.prescriptionToggle.isChecked();

        console.log(isOn ? '✅ 처방전 토글 ON으로 설정됨' : '❌ 처방전 토글 여전히 OFF 상태');
    }

    async settingMakeOn() {
        await expect(this.settingAuthorizationSetting).toBeVisible();
        await expect(this.settingAuthorizationToggle).toBeVisible();

        await this.settingAuthorizationToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.settingAuthorizationToggle.isChecked();

        console.log(isOn ? '✅ 환경설정 토글 ON으로 설정됨' : '❌ 환경설정 토글 여전히 OFF 상태');
    }

    async secureSettingMakeOn() {
        await expect(this.secureSetting).toBeVisible();
        await expect(this.secureToggle).toBeVisible();

        await this.secureToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.secureToggle.isChecked();

        console.log(isOn ? '✅ 보안설정 토글 ON으로 설정됨' : '❌ 보안설정 토글 여전히 OFF 상태');
    }

    async hospitalManagementMakeOn() {
        await expect(this.hospitalManagementSetting).toBeVisible();
        await expect(this.hospitalManagementToggle).toBeVisible();

        await this.hospitalManagementToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.hospitalManagementToggle.isChecked();

        console.log(isOn ? '✅ 병원관리 토글 ON으로 설정됨' : '❌ 병원관리 토글 여전히 OFF 상태');
    }

    // 정보 권한 설정 
    async checkInfoAuthorizationExist() {
        await expect(this.infoAuthorizationSetting).toBeVisible();
        console.log('✅ 정보 권한 설정 메뉴 노출 확인 성공');
    }

    async deleteAuthorizationMakeOn() {
        await expect(this.deleteAuthorization).toBeVisible();
        await expect(this.deleteAuthorizationToggle).toBeVisible();

        await this.deleteAuthorizationToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.deleteAuthorizationToggle.isChecked();

        console.log(isOn ? '✅ 삭제권한 토글 ON으로 설정됨' : '❌ 삭제권한 토글 여전히 OFF 상태');
    }

    async downloadAuthorizationMakeOn() {
        await expect(this.downloadAuthorization).toBeVisible();
        await expect(this.downloadAuthorizationToggle).toBeVisible();

        await this.downloadAuthorizationToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.downloadAuthorizationToggle.isChecked();

        console.log(isOn ? '✅ 내려받기 권한 토글 ON으로 설정됨' : '❌ 내려받기 권한 토글 여전히 OFF 상태');
    }

    async penchartViewAuthorizationMakeOn() {
        await expect(this.penchartViewAuthorization).toBeVisible();
        await expect(this.penchartViewAuthorizationToggle).toBeVisible();

        await this.penchartViewAuthorizationToggle.click();
        await this.page.waitForLoadState('domcontentloaded');

        const isOn = await this.penchartViewAuthorizationToggle.isChecked();

        console.log(isOn ? '✅ 펜차트 열람 권한 토글 ON으로 설정됨' : '❌ 펜차트 열람 권한 토글 여전히 OFF 상태');
    }

    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');

        console.log('✅ 직원관리 설정 후 저장 버튼 선택 성공');
    }

    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('✅ 저장 스낵바 확인 성공');
    }


} export { EmployeeManagement };