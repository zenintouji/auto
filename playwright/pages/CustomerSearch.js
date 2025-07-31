import { expect } from '@playwright/test';

class customerSearch {
    constructor(page){
        this.page = page;
        
        this.searchBox = page.getByRole('textbox', { name: '고객명, 전화번호' });
        this.searchChartBox = page.getByRole('textbox', { name: '차트번호' });
        this.searchBirthBox = page.getByRole('textbox', { name: '생년월일 6자리' });

        this.searchButton = page.getByRole('button', { name: '조회', exact: true });
        this.closeButton = page.getByRole('button', { name: 'close' });
        // this.popupSearch = page.getByRole('button', { name: '조회' });

        this.nameCategory = page.getByRole('cell', { name: '고객명' });
        this.resultSearchName = page.getByRole('cell', { name: '자동화_신규고객' });
        this.resultSimpleReceptionName = page.getByRole('cell', { name: '간편접수_확인' });

        this.chartCategory = page.getByRole('cell', { name: '차트번호' });
        this.resultSearchChart = page.getByRole('cell', { name: '1234568' });

        this.numberCategory = page.getByRole('cell', { name: '전화번호' });
        this.resultSearchNumber = page.getByRole('cell', { name: '-3535-3535' });

        this.birthCategory = page.getByRole('cell', { name: '생년월일' });
        this.resultSearchBirth = page.getByRole('cell', { name: '-05-05' });

        this.notFoundMessage = page.getByRole('cell', { name: '검색된 고객이 없습니다' });
        
    }

    async searchCustomerName() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('자동화_신규고객');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        // 고객조회 팝업 등장하면서 노출 확인 
        await this.nameCategory.waitFor();
        await this.resultSearchName.waitFor();
        // await this.page.waitForLoadState('domcontentloaded');
        await expect(this.nameCategory).toBeVisible();
        await expect(this.resultSearchName).toBeVisible();
        console.log('✅ 고객명 검색 성공');
    }

    async searchSimpleReceptionName() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('간편접수_확인');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        // 고객조회 팝업 등장하면서 노출 확인 
        await this.nameCategory.waitFor();
        await this.resultSimpleReceptionName.waitFor();
        // await this.page.waitForLoadState('domcontentloaded');
        await expect(this.nameCategory).toBeVisible();
        await expect(this.resultSimpleReceptionName).toBeVisible();
        console.log('✅ 고객명 검색 성공');
    }

    async searhCustomerNumber() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('01035353535');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        // 고객조회 팝업 등장하면서 노출 확인
        await this.numberCategory.waitFor();
        await this.resultSearchNumber.waitFor();
        await expect(this.numberCategory).toBeVisible();
        await expect(this.resultSearchNumber).toBeVisible();
        console.log('✅ 전화번호 검색 성공');
    }

    async chartClose() {
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 닫기 버튼 선택 성공');
    }

    async searchWrongChartNumber() {
        await expect(this.searchChartBox).toBeVisible();
        await this.searchChartBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchChartBox.fill('1234567');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.notFoundMessage).toBeVisible();
        console.log('✅ 틀린 차트번호 결과 확인 성공');
    }

    async searchChartNumber() {
        await expect(this.searchChartBox).toBeVisible();
        await this.searchChartBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchChartBox.fill('1234568');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.chartCategory.waitFor();
        await this.resultSearchChart.waitFor();
        await expect(this.chartCategory).toBeVisible();
        await expect(this.resultSearchChart).toBeVisible();
        console.log('고객 차트번호 검색 성공');
    }

    async searchWrongBirth() {
        await expect(this.searchBirthBox).toBeVisible();
        await this.searchBirthBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBirthBox.fill('940506');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.notFoundMessage).toBeVisible();
        console.log('✅ 고객의 틀린 생일 검색 결과 확인 성공');
    }

    async searchBirth() {
        await expect(this.searchBirthBox).toBeVisible();
        await this.searchBirthBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBirthBox.fill('940505');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.birthCategory).toBeVisible();
        await expect(this.resultSearchBirth).toBeVisible();
        console.log('✅ 고객의 생일 검색 결과 확인 성공');
    }

    


}

export { customerSearch };