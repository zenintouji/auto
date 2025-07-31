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
        //

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
        // 입사일
        this.enterDateValue = '';
        this.enterDateInput = page.locator('input[placeholder="YYYY-MM-DD"]').nth(1);
        // 소속부서
        this.departValue = '';
        this.departInput = page.getByRole('cell', { name: /Open$/ }).nth(2);
        
        
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
        
    }
} export { EmployeeManagement };