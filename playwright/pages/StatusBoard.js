import { expect } from "playwright/test";

class StatusBoard {
    constructor(page) {
        this.page = page;
        this.statusBoardButton = page.getByRole('button', { name: 'icon-home 현황판' });
        this.yesterdayButton = page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).first();
        this.tomorrowButton = page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).nth(1);

        this.name = '자동화_신규고객';
    }

    async moveToStatusBoard() {
        await expect(this.statusBoardButton).toBeVisible();
        await this.statusBoardButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 현황판 진입 성공');
    }

    async checkCustomerOnDay() {
        await expect(this.page.getByText(this.name)).toBeVisible();
        console.log('🔍 고객 찾기 성공 : ', this.name);
    }

    async reEnterInChart() {
        await expect(this.page.getByText(this.name)).toBeVisible();
        await this.page.getByText(this.name).dblclick();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 고객명 더블클릭 후 통합차트 진입 성공');
    }

    async moveToYesterday() {
        await expect(this.yesterdayButton).toBeVisible();
        await this.yesterdayButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 어제 날짜 변경 성공');
    }

    async moveToTomorrow() {
        await expect(this.tomorrowButton).toBeVisible();
        await this.tomorrowButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 내일 날짜 변경 성공');
    }

} export { StatusBoard };