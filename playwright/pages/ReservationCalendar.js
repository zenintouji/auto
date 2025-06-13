import { expect } from "playwright/test";

class ReservationCalendar {
    constructor(page) {
        this.page = page;
        this.changeStatus = page.locator('li').filter({ hasText: '상태변경' });
        
        // 미방문
        this.notVisit = page.getByRole('menuitem', { name: '미방문' });
        this.notVisitSuccessText = page.getByText('미방문으로 변경되었습니다');

        // 예약
        this.reservated = page.getByRole('menuitem', { name: '예약' });
        this.reservationSuccessText = page.getByText('예약으로 변경되었습니다');

        // 상담대기
        this.waitForConsult = page.getByRole('menuitem', { name: '상담대기' });
        // 상담중
        this.consulting = page.getByRole('menuitem', { name: '상담중' });


        // 상태 변경 스낵바
        this.changeStatusSuccessText = page.getByText('상태가 변경되었습니다');



        this.changeStatusText = page.locator('div').filter({ hasText: '[즉시 전송 문자]가 있습니다. 전송하시겠습니까?' }).nth(3);
        this.notSendingButton = page.getByRole('button', { name: '미전송' });

    }

    async checkChangeStatusText() {
        await expect(this.changeStatusSuccessText).toBeVisible();
        console.log('✅ 상태변경 스낵바 확인 성공');
    }

    // 미방문 ㅇㅇㅇㅇ
    async notVisitStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {hasText: patientName,});
        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.notVisit).toBeVisible();
        await this.notVisit.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 미방문 상태 선택 성공');

        await expect(this.changeStatusText).toBeVisible();
        await expect(this.notSendingButton).toBeVisible();
        await this.notSendingButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.checkNotVisitText();
    }

    async checkNotVisitText() {
        await expect(this.notVisitSuccessText).toBeVisible();
        console.log('✅ 미방문 스낵바 확인 성공');
    }

    // 미방문으로 변경
    async changeStatusToNotVisit() {
        await this.notVisitStatus('자동화_신규고객');
        console.log('✅ 예약캘린더에 우클릭할 대상 보여여~');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////    

    async reservatedStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {hasText: patientName,});
        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.reservated).toBeVisible();
        await this.reservated.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 예약 상태 선택 성공');

        await this.checkReservationText();

    }

    async checkReservationText() {
        await expect(this.reservationSuccessText).toBeVisible();
        console.log('✅ 예약 스낵바 확인 성공');
    }

    // 예약 변경
    async changeStatusToReservated() {
        await this.reservatedStatus('자동화_신규고객');
        console.log('✅ 예약캘린더에 우클릭할 대상 보여여~');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    async waitForConsultationStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {hasText: patientName,});
        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.waitForConsult).toBeVisible();
        await this.waitForConsult.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 상담대기 상태 선택 성공');

        await this.checkChangeStatusText();
    }

    async changeStatusToWaitForConsultation() {
        await this.waitForConsultationStatus('자동화_신규고객');
        console.log('✅ 예약캘린더에 우클릭할 대상 보여여~');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    async consultingStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {hasText: patientName,});
        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
    }

    async changeStatusToConsulting() {
        await this.consultingStatus('자동화_신규고객');
        console.log('✅ 예약캘린더에 우클릭할 대상 보여여~');
    }


} export { ReservationCalendar };