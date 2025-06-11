import { expect } from "playwright/test";

class ReservationSetting {
    constructor(page) {
        this.page = page;
        this.closeIntegratedChartButton = page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3);
    }

    async closeIntegratedChart() {
        await expect(this.closeIntegratedChartButton).toBeVisible();

        await this.page.waitForLoadState("domcontentloaded");
    }
} export { ReservationSetting };