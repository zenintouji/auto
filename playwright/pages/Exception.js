import { expect } from '@playwright/test';

class Exception {
    constructor(page) {
        this.page = page;
    }

    async closePopupIfExists() {
        const popupButton = this.page.getByText('오늘하루 보지않기');

        if (await popupButton.isVisible()) {
            await popupButton.click();
        }
        console.log('✅ 팝업 종료 성공');
    }

    async closeBannerIfExists() {
        const refreshButton = this.page.getByText(/^새로고침$/);
        
        if (await refreshButton.isVisible()) {
            await refreshButton.click();
            await this.page.waitForTimeout(2000);
            await this.page.waitForLoadState('domcontentloaded');
        }
        console.log('✅ 새로고침 선택 후 대기 성공')
    }

}



export { Exception };