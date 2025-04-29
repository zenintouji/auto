import { expect } from "playwright/test";

class Prescription {
    constructor(page) {
        this.page = page;
        // this.page1 = page1;
        this.precsription = page.locator("li span", { hasText: /^처방전/ }).nth(4);

        this.createPrescriptionButton = page.getByRole('button', { name: '처방전 작성' });

        // this.alertPopupTitle = page1.getByRole('heading', { name: '안내' });
        // this.alertPopupCloseButton = page1.getByRole('heading', { name: '안내' }).getByRole('button');
    }

    async enterPrescription() {
        await expect(this.precsription).toBeVisible();
        await this.precsription.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('처방전 진입 성공');
    }

    async enterCreatePrescription() {
        await expect(this.createPrescriptionButton).toBeVisible();
        const page1Promise = this.page.waitForEvent('popup');
        await this.createPrescriptionButton.click();
        this.page1 = await page1Promise;
        console.log('처방전 작성 선택 확인 성공');
    }

    async closeAlertPopup() {
        const alertPopupTitle = this.page1.getByRole('heading', { name: '안내' });
        const alertPopupCloseButton = this.page1.getByRole('heading', { name: '안내' }).getByRole('button');

        await expect(alertPopupTitle).toBeVisible();
        await expect(alertPopupCloseButton).toBeVisible();
        await alertPopupCloseButton.click();
        console.log('안내 팝업 닫기 선택 확인 성공');
    }
}

export { Prescription };