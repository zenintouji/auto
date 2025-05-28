import { expect } from "playwright/test";

class SeeDoctor {
    constructor(page) {
        this.page = page;
        this.treatment = page.locator("li span", { hasText: /^진료/ }).nth(1);
        this.changedPrescrptionTitle = page.locator("li span", { hasText: /^처방전/ }).nth(4);

        this.createTreatmentButton = page.getByRole('button', { name: '+ 진료등록' });
        this.createTreatmentTitle = page.getByText('진료 등록');

        // 첫 번째 옵션
        this.selectOptionValue = page.getByRole('option').nth(0);
        this.selectMenuitemValue = page.getByRole('menuitem').nth(0);

        // 수정할때 사용
        this.editOptionValue = page.getByRole('option').nth(1);
        this.editMenuitemValue = page.getByRole('menuitem').nth(1);

        // 의사
        this.doctorTitle = page.locator('label').filter({ hasText: '의사' });
        this.doctorType = page.getByRole('combobox', { name: '의사를 선택하세요' });
        this.selectedDoctorText = '';

        // 시/수술 카테고리
        this.surgicalCategoryTitle = page.locator('label').filter({ hasText: '시/수술 카테고리' });
        this.surgicalCategoryType = page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' });
        this.editSurgicalCategoryType = page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).nth(1);
        this.selectedSurgicalCategoryText = '';

        // 시/수술명
        this.surgeryTitle = page.locator('label').filter({ hasText: '시/수술명' });
        this.surgeryType = page.getByRole('combobox', { name: '시/수술명을 선택하세요' });
        this.editSurgeryType = page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).nth(1);
        this.selectedSurgeryText = '';

        // 접수메모
        this.memoTitle = page.locator('label').filter({ hasText: '진료내용' });
        this.memoTemplate = page.getByText('자주 쓰는 상용구');
        this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
        // page.getByRole('paragraph').filter({ hasText: /^$/ });
        this.enteredMemoText = '';

        // 저장버튼
        this.saveButton = page.getByRole('button', { name: '저장' });
        this.savedTime = '';
        this.saveSuccessText = page.getByText('진료를 생성했습니다');

        // 처방전
        this.prescriptionHeader = page.locator('label').filter({ hasText: '처방전' });
        this.createPrescriptionButton = page.getByRole('button', { name: '처방전 작성' });
        
        this.prescriptionTextBefore = '';
        this.prescriptionCountBefore = 0;


        // 펜차트 샘플함
        this.loadedImageLabel = '';
        this.loadButton = page.getByRole('button', { name: '불러오기' });
        this.penchartSampleButton = page.getByRole('button', { name: 'icon-image 펜차트 샘플함' });
        this.penchartTitle = page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함');
        this.loadedImageCount = 0;

        this.loadImageSuccessText = page.getByText('차트를 불러왔습니다');

        // 진료 수정
        this.editTreatmentTitle = page.getByText('진료 수정');
        this.addingSurgeryCategoryButton = page.getByRole('button', { name: '+', exact: true });
        this.editCompleteButton = page.getByRole('button', { name: '수정완료' });

        this.editSuccessText = page.getByText('진료를 수정했습니다. 연결된 접수정보가 업데이트 됩니다');

        // 진료 삭제
        //////////

        this.deleteButton = page.getByRole('button', { name: '삭제' });

        this.deleteModalText = page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?');
        this.deleteIncludePenchart = page.getByText('펜차트 포함 삭제');
        this.deleteOnlyChart = page.getByText('차트만 삭제');

        this.confirmButton = page.getByRole('button', { name: '확인' });

        this.deleteSuccessText = page.getByText('삭제되었습니다');


        // 차트 출력
        //////////

        this.printChartButton = page.getByRole('button', { name: '차트 출력' });

        this.selectChart = page.getByRole('cell').filter({ hasText: /^$/ }).nth(2);

        this.notSending = page.getByRole('button', { name: '미전송' });
        this.checkCancelStatus = page.getByRole('cell', { name: '예약취소' });

        this.printChartModalHeader = page.getByRole('heading', { name: '차트 출력 close' });
        this.checkUserInfoHeader = page.getByRole('heading', { name: '정보 확인' });

        this.chartNumberHeader = page.getByLabel('차트 출력').getByText('차트번호');
        this.chartNumber = '';

        this.patientNameHeader = page.getByText('환자 성명');
        this.patientName = '';

        this.patientIDnumberHeader = page.getByText('주민등록번호');

        this.patientPhoneNumberHeader = page.getByLabel('차트 출력').getByText('전화번호');
        this.patientPhoneNumber = '';

        this.prescriptionSelectHeader = page.getByRole('heading', { name: '처방전 선택' });
        
        this.cancelButton = page.getByRole('button', { name: '취소' });

        this.patientAddress = page.getByLabel('차트 출력').getByText('주소');

        // 처방전
        ////////

        this.precsription = page.locator("li span", { hasText: /^처방전/ }).nth(4);

        this.prescriptionItem = page.getByRole('checkbox').nth(1);
        this.deleteButtonInPrescription = page.getByRole('button', { name: '삭제' });

        this.deletePopupText = page.getByText('정말로 삭제하시겠습니까?');
        this.confirmButtonInPrescription = page.getByRole('button', { name: '확인' });

        this.deleteSuccessText = page.getByText('삭제되었습니다');



    }

    async enterTreatment() {
        await expect(this.treatment).toBeVisible();
        await this.treatment.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('진료 진입 성공');
    }

    async selectCreateTreatment() {
        await expect(this.createTreatmentButton).toBeVisible();
        await this.createTreatmentButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.createTreatmentTitle).toBeVisible();
        console.log('진료 등록 진입 성공');
    }

    // 의사
    async selectDoctor() {
        await expect(this.doctorTitle).toBeVisible();
        await expect(this.doctorType).toBeVisible();
        await this.doctorType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedDoctorText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('의사: ', this.selectedDoctorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 시/수술 카테고리
    async selectSurgicalCategory() {
        await expect(this.surgicalCategoryTitle).toBeVisible();
        await expect(this.surgicalCategoryType).toBeVisible();
        await this.surgicalCategoryType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgicalCategoryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('시/수술 카테고리: ', this.selectedSurgicalCategoryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 시/수술명
    async selectSurgery() {
        await expect(this.surgeryTitle).toBeVisible();
        await expect(this.surgeryType).toBeVisible();
        await this.surgeryType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgeryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('시/수술명: ', this.selectedSurgeryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 진료 내용
    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('진료_내용_입력_자동화', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('진료내용: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 처방전
    async enterPrescription() {
        await expect(this.prescriptionHeader).toBeVisible();
        await expect(this.createPrescriptionButton).toBeVisible();

        this.prescriptionTextBefore = await this.changedPrescrptionTitle.textContent();
        this.prescriptionCountBefore = parseInt(this.prescriptionTextBefore?.match(/\((\d+)\)/)?.[1] || '0', 10);

        const page1Promise = this.page.waitForEvent('popup');
        await this.createPrescriptionButton.click();
        this.page1 = await page1Promise;
        console.log('처방전 작성 선택 확인 성공');
    }

    // 처방전 안내 닫기
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
        await this.page.waitForLoadState("domcontentloaded");

    }

    async checkPrescriptionSuccess() {
        await this.page.waitForTimeout(1000);

        const prescriptionTextAfter = await this.changedPrescrptionTitle.textContent();
        console.log('prescriptionTextAfter: ', prescriptionTextAfter);

        const prescriptionCountAfter = parseInt(prescriptionTextAfter?.match(/\((\d+)\)/)?.[1] || '0', 10);
        console.log('prescriptionCountAfter: ', prescriptionCountAfter);

        console.log('presciprtionCountBefore: ', this.prescriptionCountBefore);

        expect(prescriptionCountAfter).toBe(this.prescriptionCountBefore + 1);
        console.log('처방전 잘 저장되어서 숫자 1 증가 했어여~');
    }

    // 펜차트 이미지
    ////////////

    async selectPenchart() {
        await expect(this.penchartSampleButton).toBeVisible();
        await this.penchartSampleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('펜차트 샘플함 선택 성공');
        await expect(this.penchartTitle).toBeVisible();
    }

    async loadImageToCustomer() {
        const firstImage = this.page.locator('[aria-label$=".jpg"], [aria-label$=".png"]').first();
        await expect(firstImage).toBeVisible();
        this.loadedImageLabel = await firstImage.getAttribute('aria-label');
        console.log('선택한 이미지 라벨: ', this.loadedImageLabel);
        await firstImage.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('임의의 이미지 선택 성공');
        await expect(this.loadButton).toBeVisible();
        await this.loadButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('이미지 불러오기 성공');

        this.loadedImageCount += 1;
    }

    async checkLoadImageSuccessText() {
        await expect(this.loadImageSuccessText).toBeVisible();
        console.log('이미지 불러오기 스낵바 확인 성공');
    }

    // 저장버튼
    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('진료 저장 성공');
    }

    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('저장 완료 스낵바 확인 성공');
    }


    /// 잘 들어갔는지? 

    async checkTreatmentSuccess() {

        // 오늘 날짜 가져옴
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.verifyVisibleByName('cell', this.selectedDoctorText);
        await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.loadedImageCount}건` })).toBeVisible();
        console.log('펜차트 몇 건: ', this.loadedImageCount);

    }

    async verifyVisibleByName(role, nameText) {
        const elements = this.page.getByRole(role, { name: nameText });
        const count = await elements.count();

        if (count > 1) {
            for (let i = 0; i < count; i++) {
                const text = await elements.nth(i).innerText();
                if (text.trim() === nameText.trim()) {
                    await expect(elements.nth(i)).toBeVisible();
                    console.log(`${nameText} 이거 겹치네여~~~ 잘 들어가 있어여~~`);
                    return true;
                }
            }
            console.log(`${nameText} 중복 항목 일치 항목 없어여~~`);
            return false;
        } else if (count === 1) {
            await expect(elements.first()).toBeVisible();
            console.log('항목 하나 밖에 없네유, 잘 들어 있어여~~');
            return true;
        } else {
            console.log(`${nameText} 항목이 없어여~~`);
            return false;
        }
    }

    async selectEdit() {
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.page.getByRole('cell', { name: this.enteredMemoText }).dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editTreatmentTitle).toBeVisible();
        console.log('진료 수정 진입 성공');
    }

    // 의사
    async editDoctor() {
        await expect(this.doctorTitle).toBeVisible();
        await expect(this.doctorType).toBeVisible();
        await this.doctorType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedDoctorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('의사 수정: ', this.selectedDoctorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 추가
    async addingSurgeryCategory() {
        await expect(this.addingSurgeryCategoryButton).toBeVisible();
        await this.addingSurgeryCategoryButton.click();
        console.log('시/수술 카테고리 추가 성공');
    }

    // 시/수술 카테고리
    async editSurgicalCategory() {
        await expect(this.surgicalCategoryTitle).toBeVisible();
        await expect(this.editSurgicalCategoryType).toBeVisible();
        await this.editSurgicalCategoryType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedSurgicalCategoryText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('시/수술 카테고리 수정: ', this.selectedSurgicalCategoryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 시/수술명
    async editSurgery() {
        await expect(this.surgeryTitle).toBeVisible();
        await expect(this.editSurgeryType).toBeVisible();
        await this.editSurgeryType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgeryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('시/수술명 수정: ', this.selectedSurgeryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

     // 진료 메모 수정
    async editMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('진료_내용_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('진료내용 수정: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectEditCompleteButton() {
        await expect(this.editCompleteButton).toBeVisible();
        await this.editCompleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('진료 수정 성공');
    }
    

    async checkEditSuccessText() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('진료 수정 스낵바 확인 성공');
    }

    // 차트출력
    /////////

    async selectPrintTreatment() {
        await expect(this.selectChart).toBeVisible();
        await expect(this.printChartButton).toBeDisabled();
        console.log('차트 미선택 시, 버튼 비활성화 확인 성공');

        await this.selectChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('차트 선택 성공');

        await expect(this.printChartButton).toBeVisible();
        await expect(this.printChartButton).toBeEnabled();
        console.log('차트출력 버튼 선택 가능 확인 성공');

        await this.printChartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('차트출력 모달 진입 성공');
    }

    async checkPrintTreatment() {
        await expect(this.printChartModalHeader).toBeVisible();
        await expect(this.checkUserInfoHeader).toBeVisible();

        await expect(this.chartNumberHeader).toBeVisible();
        this.chartNumber = await this.page.locator('input.MuiInputBase-input.Mui-disabled[value]').first().inputValue();
        console.log('차트번호 가져오기: ', this.chartNumber);

        await expect(this.patientNameHeader).toBeVisible();
        this.patientName = await this.page.locator('input.MuiInputBase-input.Mui-disabled[value]').nth(1).inputValue();
        console.log('환자 성명 가져오기: ', this.patientName);

        await expect(this.patientPhoneNumberHeader).toBeVisible();
        this.patientPhoneNumber = await this.page.locator('input.MuiInputBase-input.Mui-disabled[value]').nth(3).inputValue();
        console.log('환자 전화번호 가져오기: ', this.patientPhoneNumber);

        await expect(this.prescriptionSelectHeader).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('차트 출력 모달 닫기 성공');
    }

    async compareValueFromPrintModal() {
        await expect(this.page.locator('.chart-number')).toHaveText(this.chartNumber);
        console.log('통합차트 > 고객정보에 차트번호랑 같아여~');
        await expect(this.page.locator('div.name').filter({ hasText: this.patientName })).toBeVisible();
        console.log('통합차트 > 고객정보에 이름이랑 같아여~');
        await expect(this.page.locator('div.MuiStack-root').filter({ hasText: this.patientPhoneNumber })).toBeVisible();
        console.log('통합차트 > 고객정보에 전화번호랑 같아여~');
    }

    // 진료 삭제
    //////////

    async selectDeleteButton() {
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.deleteModalText).toBeVisible();
        console.log('진료 삭제 팝업 노출 확인 성공');
    }

    async deleteChart() {
        await expect(this.deleteModalText).toBeVisible();
        await expect(this.deleteIncludePenchart).toBeVisible();
        console.log('펜차트 포함 삭제 라디오 버튼 노출 확인 성공');
        await this.deleteIncludePenchart.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.deleteOnlyChart).toBeVisible();
        console.log('차트만 삭제 라디오 버튼 노출 확인 성공');

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('차트 삭제 버튼 선택 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('차트 삭제 스낵바 확인 성공');
    }

    // 처방전 진입
    ///////////

    async enterPrescriptionMenu() {
        await expect(this.precsription).toBeVisible();
        await this.precsription.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('처방전 진입 성공');
    }

    async deletePrescription() {
        await expect(this.prescriptionItem).toBeVisible();
        await this.prescriptionItem.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForTimeout(2000);
        await expect(this.deleteButtonInPrescription).toBeVisible();
        await this.deleteButtonInPrescription.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('처방전 삭제 버튼 선택 성공');
    }

    async deletePopup() {
        await expect(this.deletePopupText).toBeVisible();
        await expect(this.confirmButtonInPrescription).toBeVisible();
        await this.confirmButtonInPrescription.click();
        console.log('처방전 삭제 확인 성공');
    }

    async checkDeleteSuccess() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('삭제 스낵바 확인 성공');
    }



} export { SeeDoctor };