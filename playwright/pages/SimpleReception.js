import { expect } from "playwright/test";

class SimpleReception {
    constructor(page) {
        this.page = page;
        this.simpleReceptionButton = this.page.getByText('간편접수').nth(0);

        this.reservationCalendar = page.getByRole('button', { name: 'icon-calendar 예약 캘린더' });

        this.logoutButton = page.getByRole('button', { name: '로그아웃' });
        
        this.customerName = page.getByText('간편접수_확인');
        this.integratedChartTitle = page.getByText('통합차트');

        this.reception = page.locator("li span", { hasText: /^접수/ }).nth(1);

        // 삭제
        this.deleteSuccessText = page.getByText('접수가 삭제되었습니다');

        this.confirmButton = page.getByRole('button', { name: '확인' });

        this.deleteReceptionButton = page.getByRole('button', { name: '삭제' });
        this.selectChart = page.getByRole('cell').filter({ hasText: /^$/ }).first(); // nth(2)
        this.deleteMessage = page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요');

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

    async checkMovedToMain() {
        await expect(this.logoutButton).toBeVisible();
        console.log('✅ 메인 이동 성공');
    }

    // 간편접수 > 접수 버튼 선택 하는
    async selectReception() {
        const receptionTitle = this.page1.locator('span', { hasText: '간편접수 확인' });
        
        const row = this.page1.locator('tr', { has: this.page1.getByRole('button', { name: '간편접수_확인' }) });
        const receptionButton = row.getByRole('button', { name: /^접수$/ });

        await expect(receptionTitle).toBeVisible();
        await expect(receptionButton).toBeVisible();

        await receptionButton.click();
        await this.page1.waitForLoadState('domcontentloaded');
        console.log('✅ 간편접수_확인 행에 있는 접수 버튼 선택 성공');
    }

    async checkReceptionSuccessText() {
        const snackBarText = this.page1.getByText('접수되었습니다');

        await this.page1.waitForTimeout(1000);
        await expect(snackBarText).toBeVisible();
        console.log('✅ 접수 스낵바 확인 성공');
    }

    async moveToCalendar() {
        await expect(this.reservationCalendar).toBeVisible();
        await this.reservationCalendar.click();
        await this.page.waitForLoadState('domcontentloaded');

        console.log('✅ 예약 캘린더 진입 성공');
    }

    // 통합차트
    async enterInIntegratedChart() {
        await expect(this.customerName).toBeVisible();
        await this.customerName.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.integratedChartTitle).toBeVisible();
        console.log('✅ 통합차트 진입 성공');
    }

    // 접수차트 진입
    async enterReception() {
        await expect(this.reception).toBeVisible();
        await this.reception.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 접수 진입 성공');
    }

    // 삭제
    async deleteReception() {
        await expect(this.selectChart).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.selectChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 차트 선택 성공');

        await expect(this.deleteReceptionButton).toBeVisible();
        await this.deleteReceptionButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 삭제 선택 성공');
        
        await expect(this.deleteMessage).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 삭제 버튼 선택 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 접수 삭제 성공');
    }


} export { SimpleReception };