import { expect } from "playwright/test";

class Prescription {
    constructor(page) {
        this.page = page;
        this.precsription = page.locator("li span", { hasText: /^처방전/ }).nth(4);

        this.createPrescriptionButton = page.getByRole('button', { name: '처방전 작성' });
        this.prescriptionHeader = page.getByRole('paragraph').filter({ hasText: '처방전' });
        
        this.doctorName = '';
        this.doctorNameLocation = page.getByRole('paragraph').first();
        // this.doctorNameLocation = page.getByRole('checkbox').

        this.temporarySave = this.page.getByRole('cell', { name: '임시저장' });
        this.fullySaved = this.page.getByRole('cell', { name: '작성완료' });
        this.othersStatus = this.page.getByRole('cell', { name: '기타' });
        this.healthInsuranceStatus = this.page.getByRole('cell', { name: '건강보험' });

        this.prescriptionItem = page.getByRole('checkbox').first();
        this.deleteButton = page.getByRole('button', { name: '삭제' });

        this.deletePopupText = page.getByText('정말로 삭제하시겠습니까?');
        this.confirmButton = page.getByRole('button', { name: '확인' });

        this.deleteSuccessText = page.getByText('삭제되었습니다');

    }

    async doctorNameTaking() {
        await expect(this.doctorNameLocation).toBeVisible();
        this.doctorName = await this.doctorNameLocation.innerText();
        console.log('의사 이름: ', this.doctorName);

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

        const temporaryButton = this.page1.getByRole('button', { name: '임시저장' });
        const temporarySuccessText = this.page1.getByText('임시 저장되었습니다.');

        await expect(temporaryButton).toBeVisible();
        await temporaryButton.click();
        await this.page1.waitForLoadState("domcontentloaded");
        console.log('처방전 작성완료 성공');
        await expect(temporarySuccessText).toBeVisible();
        console.log('임시저장 스낵바 확인 성공');
        await this.page.bringToFront();
        await expect(this.prescriptionHeader).toBeVisible();
        console.log('통합차트로 이동 확인 성공');
    }

    async checkRegister() {
        await expect(this.prescriptionHeader).toBeVisible();

        // 오늘 날짜 가져옴
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: this.doctorName })).toBeVisible();

        const matchedCell = this.page.getByRole('cell', { name: this.doctorName });
        const count = await matchedCell.count();
        console.log(`같은 의사이름 수: ${count}`);
        
        for (let i = 0; i < count; i++) {
            const cell = matchedCell.nth(i);
            const text = await cell.innerText();
            if (text.trim() === this.doctorName.trim()) {
                await expect(cell).toBeVisible();
                console.log('의사 이름: ', cell);
                break;
            }
        }
        await expect(this.othersStatus).toBeVisible();
        await expect(this.temporarySave).toBeVisible();

        console.log('처방전 작성 완료 잘 되어 있어요~');
    }

    async enterEditPrescription() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;

        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
        
        const page3Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('cell', { name: formattedDate }).dblclick();
        this.page3 = await page3Promise;
        console.log('처방전 수정 진입 성공');

    }


    async closeEditAlert() {
        const alertPopupTitle = this.page3.getByRole('heading', { name: '안내' });
        const alertPopupCloseButton = this.page3.getByRole('heading', { name: '안내' }).getByRole('button');

        await expect(alertPopupTitle).toBeVisible();
        await expect(alertPopupCloseButton).toBeVisible();
        await alertPopupCloseButton.click();
        console.log('안내 팝업 닫기 선택 확인 성공');
    }

    async editPrescription() {
        const prescriptionTitle = this.page3.getByRole('heading', { name: '처    방    전' });
        await expect(prescriptionTitle).toBeVisible();

        const healthInsurance = this.page3.getByRole('button', { name: '[ ]건강보험' });
        await healthInsurance.click();
        await this.page3.waitForLoadState("domcontentloaded");
        console.log('처방전 종류 건강보험 선택 성공');
        
        await this.page3.waitForTimeout(2000);
        const usageDirectionInput = this.page3.locator('input[placeholder="입력하세요"]').first();
        await usageDirectionInput.click();
        await this.page3.waitForLoadState("domcontentloaded");
        await usageDirectionInput.type('용법_입력_자동화', { delay: 50 });
        await this.page3.waitForLoadState("domcontentloaded");

        const completeButton = this.page3.getByRole('button', { name: '작성완료' });
        const completeSuccessText = this.page3.getByText('저장되었습니다');

        await expect(completeButton).toBeVisible();
        await completeButton.click();
        await this.page3.waitForLoadState("domcontentloaded");
        console.log('처방전 작성완료 성공');

        await expect(completeSuccessText).toBeVisible();
        console.log('작성완료 스낵바 확인 성공');

        await this.page.bringToFront();
        await expect(this.prescriptionHeader).toBeVisible();
        console.log('통합차트로 이동 확인 성공');
    }

    async checkEdit() {
        await expect(this.prescriptionHeader).toBeVisible();

        // 오늘 날짜 가져옴
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: this.doctorName })).toBeVisible();

        const matchedCell = this.page.getByRole('cell', { name: this.doctorName });
        const count = await matchedCell.count();
        console.log(`같은 의사이름 수: ${count}`);
        
        for (let i = 0; i < count; i++) {
            const cell = matchedCell.nth(i);
            const text = await cell.innerText();
            if (text.trim() === this.doctorName.trim()) {
                await expect(cell).toBeVisible();
                console.log('의사 이름: ', cell);
                break;
            }
        }
        await expect(this.othersStatus).not.toBeVisible();
        await expect(this.healthInsuranceStatus).toBeVisible();
        console.log('기타 => 건강보험 변경 확인~');
        await expect(this.temporarySave).not.toBeVisible();
        await expect(this.fullySaved).toBeVisible();
        console.log('임시저장 => 저장완료 변경 확인~~');

        console.log('처방전 수정 완료 잘 되어 있어요~');
    }

    async deletePrescription() {
        await expect(this.prescriptionItem).toBeVisible();
        await this.prescriptionItem.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('처방전 삭제 버튼 선택 성공');
    }

    async deletePopup() {
        await expect(this.deletePopupText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        console.log('처방전 삭제 확인 성공');
    }

    async checkDeleteSuccess() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('삭제 스낵바 확인 성공');
    }

    
}

export { Prescription };