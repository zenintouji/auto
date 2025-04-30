import { expect } from "playwright/test";

class Prescription {
    constructor(page) {
        this.page = page;
        // this.page1 = page1;
        this.precsription = page.locator("li span", { hasText: /^처방전/ }).nth(4);

        this.createPrescriptionButton = page.getByRole('button', { name: '처방전 작성' });
        this.prescriptionHeader = page.getByRole('paragraph').filter({ hasText: '처방전' })

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

    async registerPrescription() {
        // 체크 항목
        // 처방전 제출 용도
        const personalCopy = this.page1.getByRole('button', { name: '[ ]본인보관용' });
        const pharmacyCopy = this.page1.getByRole('button', { name: '[V]약국제출용' });
        await expect(personalCopy).toBeVisible();
        await expect(pharmacyCopy).toBeVisible();
        console.log('처방전 제출 용도 확인 성공');
        
        // 처방전 제목
        const prescriptionTitle = this.page1.getByRole('heading', { name: '처    방    전' });
        await expect(prescriptionTitle).toBeVisible();
        console.log('처방전 제목 확인 성공');

        // 처방전 종류
        const healthInsurance = this.page1.getByRole('button', { name: '[ ]건강보험' }); 
        const medicalAid = this.page1.getByRole('button', { name: '[ ]의료급여' }); 
        const industrialAccident = this.page1.getByRole('button', { name: '[ ]산업재해보험' }); 
        const autoInsurance = this.page1.getByRole('button', { name: '[ ]자동차보험' }); 
        const others = this.page1.getByRole('button', { name: '[V]기타 ( )' }); 
        const infoText = this.page1.getByText('* [ ]에는 해당되는 곳에 "V"표시를 합니다');

        await expect(healthInsurance).toBeVisible();
        await expect(medicalAid).toBeVisible();
        await expect(industrialAccident).toBeVisible();
        await expect(autoInsurance).toBeVisible();
        await expect(others).toBeVisible();
        await expect(infoText).toBeVisible();
        console.log('처방전 종류 확인 성공');

        // 요양기관번호
        const providerCode = this.page1.getByRole('cell', { name: '요양기관기호 :' });
        // 이름
        const patientName = this.page1.getByRole('cell', { name: '자동화_신규고객' });
        // 주민번호
        const rrnFront = this.page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').first();
        const rrnBack = this.page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').nth(1);

        await expect(providerCode).toBeVisible();
        console.log('요양기관번호 확인 성공');
        await expect(patientName).toBeVisible();
        await expect(rrnFront).toBeVisible();
        await expect(rrnBack).toBeVisible();
        console.log('환자 정보 확인 성공');
        
        // 요양기관
        const clinicTitle = this.page1.getByRole('cell', { name: '의료기관' });
        const clinicName = this.page1.getByRole('cell', { name: '우노CRM' });
        const infoText2 = this.page1.getByRole('cell', { name: '환자가 요구하면 질병분류기호를 적지 않습니다' });

        await expect(clinicTitle).toBeVisible();
        await expect(clinicName).toBeVisible();
        await expect(infoText2).toBeVisible();
        console.log('요양기관 정보 확인 성공');

        // 묶음 처방 리스트
        const bundlePrescriptionsTitle = this.page1.getByText('묶음 처방 리스트');
        const registerButton = this.page1.getByRole('row', { name: '등록 1' }).getByRole('button');

        await expect(bundlePrescriptionsTitle).toBeVisible();
        await expect(registerButton).toBeVisible();
        await registerButton.click();
        await this.page1.waitForLoadState("domcontentloaded");
        console.log('묶음 처방 리스트의 등록 성공');
        await this.page1.waitForTimeout(2000);

        const completeButton = this.page1.getByRole('button', { name: '작성완료' });
        const completeSuccessText = this.page1.getByText('저장되었습니다');

        await expect(completeButton).toBeVisible();
        await completeButton.click();
        await this.page1.waitForLoadState("domcontentloaded");
        console.log('처방전 작성완료 성공');
        await expect(completeSuccessText).toBeVisible();
        console.log('작성완료 스낵바 확인 성공');
        await this.page.bringToFront();
        await expect(this.prescriptionHeader).toBeVisible();
        console.log('통합차트로 이동 확인 성공');
    }
}

export { Prescription };