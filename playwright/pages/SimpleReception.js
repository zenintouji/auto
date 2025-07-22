import { expect } from "playwright/test";

class SimpleReception {
    constructor(page) {
        this.page = page;
        this.simpleReceptionButton = this.page.getByText('간편접수').nth(0);

    }

    async enterInSimplReception() {
        await expect(this.simpleReceptionButton).toBeVisible();
        const page1Promise = this.page.waitForEvent('popup');
        await this.simpleReceptionButton.click();
        this.page1 = await page1Promise;
        console.log('✅ 간편접수 팝업 진입 성공');
        
    }

    async closeSimpleReceptionModal() {
        const closeButton = this.page1.getByRole('button').first();

        await expect(closeButton).toBeVisible();
        await closeButton.click();
        console.log('✅ 간편접수 팝업 닫기 성공');
    }
} export { SimpleReception };