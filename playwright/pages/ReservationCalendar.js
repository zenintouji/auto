import { expect } from "playwright/test";

class ReservationCalendar {
    constructor(page) {
        this.page = page;
        this.changeStatus = page.locator('li').filter({ hasText: '상태변경' });
        this.delete = page.locator('li').filter({ hasText: '삭제하기' });
        
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

        // 진료대기
        this.seeDoctor = page.getByRole('menuitem', { name: '진료대기' });
        // 진료중
        this.seeingDoctor = page.getByRole('menuitem', { name: '진료중' });

        // 시/수술 대기
        this.waitForSurgery = page.getByRole('menuitem', { name: '시/수술대기' });
        // 시/수술중
        this.takingsurgery = page.getByRole('menuitem', { name: '시/수술중' });

        // 수납대기
        this.payment = page.getByRole('menuitem', { name: '수납대기' });

        // 완료
        this.complete = page.getByRole('menuitem', { name: '완료' });

        // 퇴원
        this.discharging = page.getByRole('menuitem', { name: '퇴원' });

        // 통합차트 타이틀
        this.integratedChart = page.getByText('통합차트');

        // 상태 변경 스낵바
        this.changeStatusSuccessText = page.getByText('상태가 변경되었습니다');
        this.changeStatusToDischargingText = page.getByText('퇴원으로 변경되었습니다');

        this.changeStatusText = page.locator('div').filter({ hasText: '[즉시 전송 문자]가 있습니다. 전송하시겠습니까?' }).nth(3);
        this.notSendingButton = page.getByRole('button', { name: '미전송' });

        this.closeIntegratedChartButton = page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3);

        // 삭제
        this.deleteSuccessText = page.getByText('접수가 삭제되었습니다');
        
        this.deleteText = page.locator('div').filter({ hasText: '접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요' }).nth(3);
        this.confirmButton = page.getByRole('button', { name: '확인' });

        // 날짜 변경


    }

    async closeIntegratedChart() {
        await expect(this.closeIntegratedChartButton).toBeVisible();
        await this.closeIntegratedChartButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 통합차트 닫기 성공');
    }

    async checkDeleteText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 삭제 스낵바 확인 성공');
    }

    async checkChangeStatusText() {
        await expect(this.changeStatusSuccessText).toBeVisible();
        console.log('✅ 상태변경 스낵바 확인 성공');
    }

    async checkChangeStatusToDischargingText() {
        await expect(this.changeStatusToDischargingText).toBeVisible();
        console.log('✅ 퇴원 스낵바 확인 성공');
    }

    // 미방문 ㅇㅇㅇㅇ
    async notVisitStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);
        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.notVisit).toBeVisible();
        await this.notVisit.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 미방문 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }
        await this.checkNotVisitText();
    }

    async checkNotVisitText() {
        await expect(this.notVisitSuccessText).toBeVisible();
        console.log('✅ 미방문 스낵바 확인 성공');
    }

    // 미방문으로 변경
    async changeStatusToNotVisit() {
        await this.notVisitStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////    

    async reservatedStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);
        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

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
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    
    async waitForConsultationStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.waitForConsult).toBeVisible();
        await this.waitForConsult.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 상담대기 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();
    }

    async changeStatusToWaitForConsultation() {
        await this.waitForConsultationStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    async consultingStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.consulting).toBeVisible();
        await this.consulting.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 상담중 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToConsulting() {
        await this.consultingStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    async seeDoctorStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.seeDoctor).toBeVisible();
        await this.seeDoctor.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 진료대기 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToSeeDoctor() {
        await this.seeDoctorStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////


    async seeingDoctorStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.seeingDoctor).toBeVisible();
        await this.seeingDoctor.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 진료중 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToSeeingDoctor() {
        await this.seeingDoctorStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    async waitForSurgeryStatus(patientName) { 
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.waitForSurgery).toBeVisible();
        await this.waitForSurgery.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 시/수술대기 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToWaitForSurgery() {
        await this.waitForSurgeryStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////


    async takingSurgeryStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.takingsurgery).toBeVisible();
        await this.takingsurgery.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 시/수술중 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToTakingSurgery() {
        await this.takingSurgeryStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////


    async paymentStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.payment).toBeVisible();
        await this.payment.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 수납대기 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToPayment() {
        await this.paymentStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////


    async completeStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.complete).toBeVisible();
        await this.complete.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 완료 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusText();

    }

    async changeStatusToComplete() {
        await this.completeStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////


    async dischargingStatus(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 우클릭 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await this.changeStatus.hover();

        await expect(this.discharging).toBeVisible();
        await this.discharging.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 퇴원 상태 선택 성공');

        if (await this.changeStatusText.isVisible()) {
            await expect(this.notSendingButton).toBeVisible();
            await this.notSendingButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log("✅ 문자 미전송 선택 성공");
        } else {
            console.log('✅ 문자 전송 팝업 없이 진행됨~');
        }

        await this.checkChangeStatusToDischargingText();

    }

    async changeStatusToDischarging() {
        await this.dischargingStatus('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    async enterIntegratedChart(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 더블클릭 대상 확인됨`);

        await tile.dblclick();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.integratedChart).toBeVisible();
        console.log(`✅ 통합차트 진입 성공`);
    }

    async dbclickToEnter() {
        await this.enterIntegratedChart('자동화_신규고객');
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////

    async deleteChart(patientName) {
        await this.paymentStatus(patientName);
        console.log('🟢 삭제 전, 상태 변경 성공');

        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        console.log(`✅ 예약캘린더 [${patientName}] 삭제 대상 확인됨`);

        await tile.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.delete).toBeVisible();
        await this.delete.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.deleteText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();

        console.log(`✅ 삭제 성공`);

        await this.checkDeleteText();
    }

    async letsDelete() {
        await this.deleteChart('자동화_신규고객');
    }



} export { ReservationCalendar };