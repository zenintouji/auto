import { expect } from "playwright/test";

class AddProduct {
    constructor(page) {
        this.page = page;
        
        this.addProductButton = page.getByRole('button', { name: '+ 제품 추가' });
        this.createProductCodeButton = page.getByRole('button', { name: '+제품코드 생성' });
        this.addListButton = page.getByRole('button', { name: '+' });
        this.saveButton = page.getByRole('button', { name: '저장' });
        
        this.addProductTitle = page.getByRole('heading', { name: '수납항목 추가' });
        this.addProductModalTitle = page.getByRole('heading', { name: '제품 추가 close' });

        this.inputProductName = page.getByRole('textbox', { name: '제품명을 입력하세요' }).first();
        this.taxProductText = '';

        this.inputProductName2 = page.getByRole('textbox', { name: '제품명을 입력하세요' }).nth(1); 
        this.nonTaxProductText = '';

        this.inputPriceTaxProduct = page.getByRole('textbox').nth(1);
        this.taxProductPriceText = '';

        this.taxCheckBox = page.getByRole('checkbox');

        this.createSuccessText = page.getByText('등록되었습니다');
        this.addProductModalCloseButton = page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button');
        this.integratedChartCloseButton = page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3);

        this.paymentSettingMenu = page.getByRole('button', { name: '수납코드 설정' });
        this.productCategory = page.getByRole('tab', { name: '제품' });

        this.inputSearchBox = page.getByRole('textbox', { name: '제품명' });

        this.searchButton = page.getByRole('button', { name: '검색' });

        this.deleteTaxButton = page.getByRole('button', { name: '삭제' });
        this.nonUsingButton = page.getByRole('button', { name: '미사용' });
        this.usingButton = page.getByRole('button', { name: '사용' });

        this.deleteSuccessText = page.getByText('삭제되었습니다');
        this.nonUsingSuccessText = page.getByText('미사용 처리되었습니다');
        this.usingSuccessText = page.getByText('사용 처리되었습니다');

        this.deleteModalText = page.getByText('정말로 삭제하시겠습니까?');
        this.nonUsingModalText = page.getByText('미사용 처리 하시겠습니까?');
        this.usingModalText = page.getByText('사용 처리 하시겠습니까?');

        this.confirmButton = page.getByRole('button', { name: '확인' });

        
        
    }

    async enterAddProduct() {
        await expect(this.addProductButton).toBeVisible();
        await this.addProductButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.addProductTitle).toBeVisible();
        console.log('✅ 수납항목 추가 팝업 진입 성공');
    }

    async enterCreateProductCode() {
        await expect(this.createProductCodeButton).toBeVisible();
        await this.createProductCodeButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.addProductModalTitle).toBeVisible();
        console.log('✅ 수납항목 추가 팝업 > 제품 추가 팝업 진입 성공');
    }

    async addProductTax() {
        await expect(this.inputProductName).toBeVisible();
        await this.inputProductName.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputProductName.type('제품_추가_자동화_삭제용', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.taxProductText = await this.inputProductName.inputValue();
        console.log('🟢 과세제품 > 이름 입력 성공');
        console.log('🟢 과세제품 이름: ', this.taxProductText);

        await expect(this.taxCheckBox).toBeVisible();
        await this.taxCheckBox.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 과세제품 > 과세 선택 성공');

        await expect(this.inputPriceTaxProduct).toBeVisible();
        await this.inputPriceTaxProduct.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputPriceTaxProduct.type('10,0000', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.taxProductPriceText = await this.inputPriceTaxProduct.inputValue();
        console.log('🟢 과세제품 > 금액 입력 성공');
        console.log('🟢 과세제품 금액: ', this.taxProductPriceText);
    }

    async addList() {
        await expect(this.addListButton).toBeVisible();
        await this.addListButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 과세제품 > 항목 추가 성공');
    }

    async addProductNonTax() {
        await expect(this.inputProductName2).toBeVisible();
        await this.inputProductName2.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputProductName2.type('제품_추가_비과세_자동화_삭제용', { delay: 50 });
        this.nonTaxProductText = await this.inputProductName.inputValue();
        console.log('🟢 비과세제품 > 이름 입력 성공');
        console.log('🟢 비과세제품 이름: ', this.nonTaxProductText);
    }

    async saveProduct() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 제품 추가 성공');
    }

    async checkSaveSuccessText() {
        await expect(this.createSuccessText).toBeVisible();
        console.log('✅ 추가 완료 스낵바 확인 성공');
    }

    async closeAddProductModal() {
        await expect(this.addProductModalCloseButton).toBeVisible();
        await this.addProductModalCloseButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 수납항목 추가 팝업 닫기 성공');
    }

    async closeIntegratedChart() {
        await expect(this.integratedChartCloseButton).toBeVisible();
        await this.integratedChartCloseButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 통합차트 팝업 닫기 성공');
    }

    async enterPaymentSetting() {
        await expect(this.paymentSettingMenu).toBeVisible();
        await this.paymentSettingMenu.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 수납코드 설정 진입 성공');
    }

    async enterProductCategory() {
        await expect(this.productCategory).toBeVisible(); 
        await this.productCategory.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 수납코드 > 제품 카테고리 진입 성공');
    }

    async searchProduct() {
        await expect(this.inputSearchBox).toBeVisible();
        await this.inputSearchBox.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputSearchBox.type('삭제용', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        console.log('🟢 제품 검색어 입력 성공');

        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 제품 검색 성공');
        
    }

    async checkSearchProduct() {
        await expect(this.page.getByRole('cell', { name: this.taxProductText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.nonTaxProductText })).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: this.taxProductPriceText })).toBeVisible();
        console.log('🟢 추가한 카테고리 전부 잘 들어가 있어요~');
    }

    async selectDeleteTaxProduct() {
        await expect(this.deleteTaxButton.nth(1)).toBeVisible();
        await this.deleteTaxButton.nth(1).click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 제품 삭제 선택 성공');
    }

    async deleteModal() {
        await expect(this.deleteModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        console.log('✅ 제품 삭제 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 삭제 완료 스낵바 확인 성공');

        await expect(this.page.getByRole('cell', { name: this.taxProductText })).not.toBeVisible();
    }

    async selectNonUsingProduct() {
        await expect(this.nonUsingButton).toBeVisible();
        await this.nonUsingButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 제품 미사용 선택 성공');
    }

    async nonUsingModal() {
        await expect(this.nonUsingModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        console.log('✅ 제품 미사용 처리 성공');
    }

    async checkNonUsingSuccessText() {
        await expect(this.nonUsingSuccessText).toBeVisible();
        console.log('✅ 미사용 처리 완료 스낵바 확인 성공')
    }

    async selectUsingProduct() {
        await expect(this.usingButton).toBeVisible();
        await this.usingButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 제품 사용 선택 성공');
    }

    async usingModal() {
        await expect(this.usingModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        console.log('✅ 제품 사용 처리 성공');
    }

    async checkUsingSuccessText() {
        await expect(this.usingSuccessText).toBeVisible();
        console.log('✅ 사용 처리 완료 스낵바 확인 성공')
    }

    async selectDeleteNonTaxProduct() {
        await expect(this.deleteTaxButton).toBeVisible();
        await this.deleteTaxButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('✅ 제품 삭제 선택 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 삭제 완료 스낵바 확인 성공');

        await expect(this.page.getByRole('cell', { name: this.nonTaxProductText })).not.toBeVisible();
    }

} export { AddProduct };