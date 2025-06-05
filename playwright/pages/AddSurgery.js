import { expect } from "playwright/test";

class AddSurgery {
    constructor(page) {
        this.page = page;
        
        this.createSurgeryCodeButton = page.getByRole('button', { name: '+시/수술코드 생성' });
        this.addCategoryButton = page.getByRole('button', { name: '카테고리 추가' });

        this.inputCategoryName = page.getByRole('textbox', { name: '추가할 카테고리명을 입력하세요' });
        this.categoryNameText = '';
        this.inputSurgeryName = page.getByRole('textbox', { name: '시/수술명을 입력하세요' });
        this.surgeryNameText = '';
        this.surgeryNonTaxNameText = '';

        this.saveButton = page.getByRole('button', { name: '저장' });
        this.saveSuccessText = page.getByText('저장되었습니다');

        this.categoryCombobox = page.getByRole('combobox', { name: '카테고리를 선택해주세요' });

        this.addSurgeryCount = page.getByRole('cell', { name: '- 1 + 회' }).locator('button[name="plus"]');
        this.taxCheckBox = page.getByRole('table').locator('tbody').getByRole('cell').filter({ hasText: /^$/ }).locator('div').nth(1)
        this.inputPrice = page.getByRole('textbox').nth(2);
        this.surgeryPriceText = '';

        this.addListButton = page.getByRole('cell', { name: '+', exact: true }).getByRole('button');

        this.closeAddSurgeryModalButton = page.getByRole('button', { name: 'close' });
        this.closeIntegratedChartButton = page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3);

        this.paymentCodeMenu = page.getByRole('button', { name: '수납코드 설정' });

        this.inputSearchCategory = page.getByRole('textbox', { name: '카테고리 검색' });
        this.inputSearchSurgeryName = page.getByRole('textbox', { name: '시/수술명 검색' });

        this.searchButton = page.getByRole('button', { name: '검색' });
        this.deleteButton = page.getByRole('button', { name: '삭제' });
        this.confirmButton = page.getByRole('button', { name: '확인' });
        this.nonUsingButton = page.getByRole('button', { name: '미사용' });
        this.usingButton = page.getByRole('button', { name: '사용', exact: true });

        this.deleteModalText = page.getByText('정말로 삭제하시겠습니까?');
        this.nonUsingModalText = page.getByText('미사용 처리 하시겠습니까?');
        this.usingModalText = page.getByText('사용 처리 하시겠습니까?');

        this.deleteSuccessText = page.getByText('삭제되었습니다');
        this.nonUsingSuccessText = page.getByText('미사용 처리되었습니다');
        this.usingSuccessText = page.getByText('사용 처리되었습니다');

        

    }

    async selectCreateSurgeryCode() {
        await expect(this.createSurgeryCodeButton).toBeVisible();
        await this.createSurgeryCodeButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 추가 팝업 진입 성공');
    }

    async selectAddCategory() {
        await expect(this.addCategoryButton).toBeVisible();
        await this.addCategoryButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 추가 > 카테고리 추가 팝업 진입 성공');
    }

    async addCategory() {
        await expect(this.inputCategoryName).toBeVisible();
        await this.inputCategoryName.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputCategoryName.type('카테고리_자동화_삭제용_추가', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.categoryNameText = await this.inputCategoryName.inputValue();

        console.log('🟢 카테고리 이름 입력 성공');
        console.log('🟢 카테고리 이름: ', this.categoryNameText);
    }
    async selectSaveCategory() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();

        console.log('✅ 카테고리 저장 버튼 선택 성공');
    }

    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('✅ 저장 완료 스낵바 확인 성공');
    }
    // 카테고리 추가완료요~~~
    ////////////////////

    async selectCategory() {
        await expect(this.categoryCombobox).toBeVisible();
        await this.categoryCombobox.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 카테고리 박스 선택 성공');

        await expect(this.page.getByRole('option', { name: this.categoryNameText })).toBeVisible();
        await this.page.getByRole('option', { name: this.categoryNameText }).click();
        console.log('🟢 카테고리 항목 선택 성공');
    }

    async addSurgeryName() {
        await expect(this.inputSurgeryName).toBeVisible();
        await this.inputSurgeryName.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputSurgeryName.type('시/수술_자동화_삭제용_과세_추가');
        await this.page.waitForLoadState("domcontentloaded");
        this.surgeryNameText = await this.inputSurgeryName.inputValue();

        console.log('🟢 시/수술 이름 입력 성공');
        console.log('🟢 시/수술명: ', this.surgeryNameText);
    }

    async addCountOfSurgery() {
        await expect(this.addSurgeryCount).toBeVisible();
        await this.addSurgeryCount.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 시/수술 횟수 증가 성공');
    }

    async selectTaxCheckBox() {
        await expect(this.taxCheckBox).toBeVisible();
        await this.taxCheckBox.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 시/수술 과세 선택 성공');
    }

    async addPrice() {
        await expect(this.inputPrice).toBeVisible();
        await this.inputPrice.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputPrice.type('100,000', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.surgeryPriceText = await this.inputPrice.inputValue();
        
        console.log('🟢 시/수술 금액 입력 성공');
        console.log('🟢 시/수술 금액: ', this.surgeryPriceText);
    }

    async addList() {
        await expect(this.addListButton).toBeVisible();
        await this.addListButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        console.log('🟢 시/수술 항목 추가 성공');
    }

    async addNonTaxSurgeryName() {
        await expect(this.inputSurgeryName.nth(1)).toBeVisible();
        await this.inputSurgeryName.nth(1).click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputSurgeryName.nth(1).type('시/수술_자동화_삭제용_비과세_추가', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.surgeryNonTaxNameText = await this.inputSurgeryName.nth(1).inputValue();

        console.log('🟢 시/수술 추가 항목 이름 입력 성공');
        console.log('🟢 시/수술명 추가: ', this.surgeryNonTaxNameText);
    }

    async saveSurgery() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        console.log('✅ 시/수술 저장 성공');
    }

    async closeAddSurgeryModal() {
        await expect(this.closeAddSurgeryModalButton).toBeVisible();
        await this.closeAddSurgeryModalButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 추가 팝업 닫기 성공');
    }

    async closeIntegratedChart() {
        await expect(this.closeIntegratedChartButton).toBeVisible();
        await this.closeIntegratedChartButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 통합차트 닫기 성공');
    }

    // 수납코드 설정 ㄱㄱ
    ////////////////

    async enterPaymentCode() {
        await expect(this.paymentCodeMenu).toBeVisible();
        await this.paymentCodeMenu.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 수납코드 설정 진입 성공');
    }

    async searchCategory() {
        await expect(this.inputSearchCategory).toBeVisible();
        await this.inputSearchCategory.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputSearchCategory.type('삭제용', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 수납코드 설정 카테고리 검색어 입력 성공');
    }

    async searchSurgeryName() {
        await expect(this.inputSearchSurgeryName).toBeVisible();
        await this.inputSearchSurgeryName.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputSearchSurgeryName.type('삭제용', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 수납코드 설정 시/수술명 검색어 입력 성공');
    }

    async selectSearchButton() {
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 수납코드 설정 검색 성공');

        await expect(this.page.getByText(this.categoryNameText)).toBeVisible();
        await expect(this.page.getByText(this.surgeryNameText)).toBeVisible();
        await expect(this.page.getByText(this.surgeryNonTaxNameText)).toBeVisible();

        console.log('🟢 카테고리, 시/수술명 잘 노출돼요~');
    }

    // 삭제
    async deleteNonTax() {
        await expect(this.deleteButton.nth(2)).toBeVisible();
        await this.deleteButton.nth(2).click();
        await this.page.waitForLoadState("domcontentloaded");
        
        console.log('🟢 삭제 버튼 선택 성공');
    }

    async enterDeleteModal() {
        await expect(this.deleteModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 삭제 처리 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 삭제 완료 스낵바 확인 성공');

        await expect(this.page.getByText(this.surgeryNonTaxNameText)).not.toBeVisible();
        console.log('🟢 삭제 항목 안보여요~');
    }

    // 시/수술명 미사용
    async nonUsingSurgery() {
        await expect(this.nonUsingButton.nth(1)).toBeVisible();
        await this.nonUsingButton.nth(1).click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 미사용 버튼 선택 성공');
    }

    async enterNonUsingModal() {
        await expect(this.nonUsingModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 미사용 처리 성공');
    }

    async checkNonUsingSuccessText() {
        await expect(this.nonUsingSuccessText).toBeVisible();

        console.log('✅ 미사용 완료 스낵바 확인 성공');
    }

    // 시/수술명 사용
    async usingSurgery() {
        await expect(this.usingButton).toBeVisible();
        await this.usingButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 사용 선택 성공');
    }

    async enterUsingModal() {
        await expect(this.usingModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 사용 버튼 선택 성공');
    }

    async checkUsingSuccessText() {
        await expect(this.usingSuccessText).toBeVisible();

        console.log('✅ 사용 완료 스낵바 확인 성공');
    }

    // 카테고리 미사용
    async nonUsingCategory() {
        await expect(this.nonUsingButton.first()).toBeVisible();
        await this.nonUsingButton.first().click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 카테고리 미사용 버튼 선택 성공');
    }

    // 카테고리 삭제
    async deleteCategory() {
        await expect(this.deleteButton.first()).toBeVisible();
        await this.deleteButton.first().click();
        await this.page.waitForLoadState("domcontentloaded");
        
        console.log('🟢 삭제 버튼 선택 성공');
    }

    async checkDeleteCategorySuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 삭제 완료 스낵바 확인 성공');

        await expect(this.page.getByText(this.categoryNameText)).not.toBeVisible();
        console.log('🟢 삭제 항목 안보여요~');
    }




} export { AddSurgery };