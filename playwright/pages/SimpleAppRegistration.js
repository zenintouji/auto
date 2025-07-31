import { expect } from '@playwright/test';

class SimpleAppRegistration {
    constructor(page) {
        this.page = page;

        this.eightButton = page.getByRole('button', { name: '8' });
        this.oneButton = page.getByRole('button', { name: '1' });

        this.nextButton = page.getByRole('button', { name: '다음' });
        this.nextButtonInSearch = page.locator('button', { hasText: '다음' });

        this.researchInfoText = page.getByText('다음과 같은 고객 정보가 조회되었습니다');
        this.receptionInfoText = page.getByText('전화번호로 접수를 시작합니다');

        this.registerButton = page.getByRole('button', { name: '접수하기' });

        this.moveButton = page.getByRole('button', { name: '메인화면으로 이동' });
        
        this.purposeTitle = this.page.locator('div.title', { hasText: '방문목적' });
        this.purposeButton = this.page.locator('button:has(.button-text)');
    }

    async pressPhoneNumber(numberString) {
        // await expect(this.eightButton).toBeVisible();
        // await this.eightButton.click();
        // await this.page.waitForLoadState('domcontentloaded');
        // console.log('✅ 8 선택 성공');

        // await expect(this.oneButton).toBeVisible();
        // await this.oneButton.click();
        // await this.page.waitForLoadState('domcontentloaded');
        // console.log('✅ 1 선택 성공');

        for (const digit of numberString) {
            if (!isNaN(digit)) {
                const button = this.eightButton = this.page.getByRole('button', { name: digit });
                await expect(button).toBeVisible();
                await button.click();
                console.log(`✅ ${digit} 선택 성공`);
                await this.page.waitForLoadState('domcontentloaded');
            }
        }
        await expect(this.nextButton).toBeVisible();
        await this.nextButton.click();
        console.log('✅ 번호 입력 후, 다음 버튼 선택 성공');
    }

    async pressNextButton() {
        await this.page.locator('[role="presentation"]').waitFor({ state: 'detached' });
        // 오버레이가 사라질 때까지 기다렸다가 진행

        await this.page.waitForTimeout(2000);
        await expect(this.nextButtonInSearch.nth(1)).toBeVisible();
        await this.nextButtonInSearch.nth(1).click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 고객 정보 화면에서 다음 버튼 선택 성공');
    }

    // 접수하기
    async pressRegisterButton() {
        await expect(this.registerButton).toBeVisible();
        await this.registerButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 버튼 선택 성공');
    }

    // 방문목적이 켜져있을 때,
    async selectPurpose() {
        await expect(this.purposeTitle).toBeVisible();

        const count = await this.purposeButton.count();
        console.log(`🟡 방문목적 버튼 개수: ${count}`);

        for (let i = 0; i < Math.min(count, 3); i++) {
            const button = this.purposeButton.nth(i);
            await expect(button).toBeVisible();
            await button.click();
            console.log(`🟢 방문목적 버튼 ${i + 1} 클릭 성공`);

            await this.page.waitForTimeout(500); // 0.5초씩 좀 천천히 
        }
    }

    async checkSuccessRegistration() {
        await expect(this.moveButton).toBeVisible();
        console.log('✅ 메인화면 이동 버튼 확인 성공');
        await this.page.waitForTimeout(3000);
    }

    async checkPurposeOn() {
        const isVisible = await this.purposeTitle.isVisible();
        if (isVisible) {
            await this.page.waitForTimeout(2000);
            await this.selectPurpose();
            await this.pressRegisterButton();
            console.log('✅ 방문목적 켜져 있어서, 선택 후 접수~');
        } else {
            await this.page.waitForTimeout(2000);
            await this.pressRegisterButton();
            console.log('✅ 방문목적 꺼져 있어서, 바로 접수~');
        }
    }
} export { SimpleAppRegistration };