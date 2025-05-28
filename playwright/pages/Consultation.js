import { expect } from '@playwright/test';

class Consultation {
    constructor(page) {
        this.page = page;
        this.consultationChart = page.locator('li span', { hasText: /^상담/ }).nth(6);

        this.confirmButton = page.getByRole('button', { name: '확인' });
        this.regiConsultButton = page.getByRole('button', { name: '+ 상담등록' });
        this.deleteButton = page.getByRole('button', { name: '삭제' });
        this.gettingButton = page.getByRole('button', { name: '불러오기' });
        this.saveButton = page.getByRole('button', { name: '저장' });
        this.editSuccessButton = page.getByRole('button', { name: '수정완료' });
        this.editButton = page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)');
        this.addingSurgeryCategory = page.getByRole('button', { name: '+', exact: true });
        this.selectConsultChart = page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first();

        this.selectOptionValue = page.getByRole('option').nth(0);
        this.editOptionValue = page.getByRole('option').nth(1); // 수정

        /////
        this.gettingSuccessText = page.getByText('차트를 불러왔습니다');
        this.savingSuccessText = page.getByText('상담을 생성했습니다');
        this.editSuccessText = page.getByText('상담을 수정했습니다. 연결된 접수정보가 업데이트 됩니다');
        this.deleteSuccessText = page.getByText('삭제되었습니다');

        /// 삭제 팝업
        this.deleteInfoText = page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?');
        this.deletePenchartToo = page.getByText('펜차트 포함 삭제');
        this.deleteOnlyChart = page.getByText('차트만 삭제');

        /////
        
        // 상담사
        this.counselorTitle = page.locator('label').filter({ hasText: '상담사' });
        this.counselorType = page.getByRole('combobox', { name: '상담사를 선택하세요' });
        
        this.selectedCounselorText = '';

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

        // 상담결과
        this.consultResultTitle = page.locator('label').filter({ hasText: '상담결과' });
        this.consultResultType = page.getByRole('combobox', { name: '-' });
        this.editConsultResultType = page.getByRole('combobox', { name: '-' }).nth(1);
        this.selectedConsultResultText = '';

        // 상담내용
        this.memoTitle = page.locator('label').filter({ hasText: '상담내용' });
        this.memoTemplate = page.getByText('자주 쓰는 상용구');
        this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
        // page.getByRole('paragraph').filter({ hasText: /^$/ });
        this.enteredMemoText = '';
        
        // 펜차트
        this.penchartTitle = page.getByText('펜차트', { exact: true }).nth(1);
        this.penchartButton = page.getByRole('button', { name: 'icon-image 펜차트 샘플함' });

        this.sampleboxTitle = page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함');
        this.enterSampleFolder = page.getByLabel('자동화_폴더', { exact: true }).getByTestId('FolderIcon');
        this.selectImageSample = page.getByLabel('1_고객상담차트.jpg').getByRole('checkbox');
        this.addImageSample1 = page.getByLabel('2_자동화_샘플.jpg').getByRole('checkbox');
        this.addImageSample2 = page.getByLabel('2-1_자동화_샘플.jpg').getByRole('checkbox');

        this.imageRemoveButton = page.locator('div').filter({ hasText: /^2-1_자동화_샘플\.jpg$/ }).getByRole('button').nth(1);
        this.removeTarget = page.locator('div').filter({ hasText: /^2-1_자동화_샘플\.jpg$/ }).locator('div').nth(2);
        

    }

    // 상담차트 진입
    async enterConsultationChart() {
        await expect(this.consultationChart).toBeVisible();
        await this.consultationChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('상담차트 진입 성공');
    }

    // 상담등록 선택
    async selectRegistration() {
        await expect(this.regiConsultButton).toBeVisible();
        await this.regiConsultButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('상담등록 진입 성공');
    }

    // 상담사
    async selectCounselor() {
        await expect(this.counselorTitle).toBeVisible();
        await expect(this.counselorType).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.counselorType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedCounselorText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click(); 
        console.log('상담사: ', this.selectedCounselorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 시/수술 카테고리
    async selectSurgicalCategory() {
        await expect(this.surgicalCategoryTitle).toBeVisible();
        await expect(this.surgicalCategoryType).toBeVisible();
        await this.page.waitForTimeout(1000);
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
        await this.page.waitForTimeout(1000);
        await this.surgeryType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgeryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('시/수술명: ', this.selectedSurgeryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 상담결과
    async selectResult() {
        await expect(this.consultResultTitle).toBeVisible();
        await expect(this.consultResultType).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.consultResultType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedConsultResultText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('상담결과: ', this.selectedConsultResultText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 상담내용
    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('상담_내용_입력_자동화', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('접수메모: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterPenchart() {
        await expect(this.penchartTitle).toBeVisible();
        await expect(this.penchartButton).toBeVisible();
        await this.penchartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('펜차트 진입 성공');
    }

    async gettingPenchart() {
        await expect(this.enterSampleFolder).toBeVisible();
        await this.enterSampleFolder.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectImageSample).toBeVisible();
        await this.selectImageSample.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.gettingButton).toBeVisible();
        await this.gettingButton.click();
        console.log('이미지 불러오기 성공');
    }

    async checkGettingSuccessText() {
        await expect(this.gettingSuccessText).toBeVisible();
        console.log('샘플함 이미지 불러오기 성공');
    }

    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async saveSuccessText() {
        await expect(this.savingSuccessText).toBeVisible();
        console.log('상담 생성 성공');
    }

    async checkConsultationSuccess() {
        // 오늘 날짜 가져옴
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;

        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();      
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();    
        // await expect(this.page.getByRole('cell', { name: this.selectedCounselorText })).toBeVisible();

        const matchedCell = this.page.getByRole('cell', { name: this.selectedCounselorText });
        const count = await matchedCell.count();
        console.log(`같은 텍스트 셀 수: ${count}`);
        
        for (let i = 0; i < count; i++) {
            const cell = matchedCell.nth(i);
            const text = await cell.innerText();
            if (text.trim() === this.selectedCounselorText.trim()) {
                await expect(cell).toBeVisible();
                console.log('상담사: ', cell);
                break;
            }
        }

        await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.selectedConsultResultText })).toBeVisible();

        console.log('상담 생성 내용 확인 성공');
    }
    
    //////////////
    //// 수정 시작
    //////////////
    /////


    async selectEdit() {
        await expect(this.editButton).toBeVisible();
        await this.editButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('상담 수정 진입 성공')
    }

    // 상담사
    async editCounselor() {
        await expect(this.counselorTitle).toBeVisible();
        await expect(this.counselorType).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.counselorType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedCounselorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click(); 
        console.log('상담사 수정: ', this.selectedCounselorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addSurgeryCategory() {
        await expect(this.addingSurgeryCategory).toBeVisible();
        await this.addingSurgeryCategory.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 시/수술 카테고리
    async editSurgicalCategory() {
        await expect(this.surgicalCategoryTitle).toBeVisible();
        await expect(this.editSurgicalCategoryType).toBeVisible();
        await this.page.waitForTimeout(1000);
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
        await this.page.waitForTimeout(1000);
        await this.editSurgeryType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgeryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('시/수술명 수정: ', this.selectedSurgeryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 상담결과
    async editResult() {
        await expect(this.consultResultTitle).toBeVisible();
        await expect(this.consultResultType).toBeVisible();
        await this.page.waitForTimeout(1000);
        await this.consultResultType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedConsultResultText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('상담결과 수정: ', this.selectedConsultResultText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 상담내용
    async editMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('상담_내용_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('접수메모 수정: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addingPenchart() {
        await expect(this.enterSampleFolder).toBeVisible();
        await this.enterSampleFolder.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.addImageSample1).toBeVisible();
        await this.addImageSample1.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.addImageSample2).toBeVisible();
        await this.addImageSample2.click(); 
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.gettingButton).toBeVisible();
        await this.gettingButton.click();
        console.log('이미지 불러오기 성공');
    }

    async removeImage() {
        await expect(this.removeTarget).toBeVisible();
        await this.removeTarget.hover();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.imageRemoveButton).toBeVisible();
        await this.imageRemoveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.removeTarget).not.toBeVisible();
        console.log('펜차트 이미지 수정 중 삭제 성공');
    }

    async selectEditButton() {
        await expect(this.editSuccessButton).toBeVisible();
        await this.editSuccessButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('상담 수정 진입 성공');
    }

    async editSucceessText() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('상담 수정 성공');
    }

    async selectChart() {
        await expect(this.selectConsultChart).toBeVisible();
        await this.selectConsultChart.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectDelete() {
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async deletePopup() {
        await expect(this.deleteInfoText).toBeVisible();
        console.log('삭제 팝업 진입 성공');
        await expect(this.deletePenchartToo).toBeVisible();
        await expect(this.deleteOnlyChart).toBeVisible();
        await this.deletePenchartToo.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectConfirm() {
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('상담 삭제 성공');
    }

}

export { Consultation };