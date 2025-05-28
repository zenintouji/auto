import { expect } from '@playwright/test';

class ChartHistory {
    constructor(page) {
        this.page = page;

        this.searchBox = page.getByRole('textbox', { name: '고객명, 전화번호' });

        this.searchButton = page.getByRole('button', { name: '조회', exact: true });

        this.nameCategory = page.getByRole('cell', { name: '고객명' });
        this.resultSearchName = page.getByRole('cell', { name: '차팅이력_확인용' });
        this.customerName = page.getByRole('cell', { name: '차팅이력_확인용' });

        this.integratedChartTitle = page.getByText('통합차트');

        this.nameCharting = page.getByRole('tab', { name: '차팅이력' });

        // 부서 선택 관련
        this.comboDepartment = page.getByRole('button', { name: '부서선택' });
        this.comboDepart = page.getByRole('button', { name: '상담 -' });
        this.department = page.locator('li[role="option"]');
        this.focusOnBackground = page.locator('.MuiBackdrop-root');

        // 예약배지
        this.reservationBadge = page.locator('#chartItemsDiv').getByText('예약');

        // 접기 / 펼치기
        this.foldList = page.getByRole('button', { name: '전체 접기' });
        this.spreadList = page.getByRole('button', { name: '전체 펼치기' });


    }

    async searchCustomerName() {
        await expect(this.searchBox).toBeVisible();
        await this.searchBox.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchBox.fill('차팅이력_확인용');
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        // 고객조회 팝업 등장하면서 노출 확인 
        await this.nameCategory.waitFor();
        await this.resultSearchName.waitFor();
        // await this.page.waitForLoadState('domcontentloaded');
        await expect(this.nameCategory).toBeVisible();
        await expect(this.resultSearchName).toBeVisible();
        console.log('고객명 검색 성공');
    }

    async enterInIntegratedChart() {
        await expect(this.customerName).toBeVisible();
        await this.customerName.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.integratedChartTitle).toBeVisible();
        console.log('통합차트 진입 성공');
    }

    async checkChartHistoryName() {
        await expect(this.nameCharting).toBeVisible();
    }

    async selectDepartment() {
        await expect(this.comboDepartment).toBeVisible();
        await this.comboDepartment.click();
    }

    async checkChartHistory() {
        for (let i = 0; i < 7; i++) {
            const selectDepartment = this.department.nth(i);
            const optionCheck = await selectDepartment.innerText();
            console.log(`부서 ${i + 1}:`, optionCheck);

            if (i === 0) {
                await selectDepartment.click();
            } else {
                await expect(this.comboDepart).toBeVisible();
                await this.comboDepart.click();
                await selectDepartment.click();
            }
            await this.page.waitForTimeout(1000);
            await this.focusOnBackground.click();
            for (let j = 0; j < 7; j +=2) {
                await expect(this.reservationBadge.nth(j)).toBeVisible();
                console.log('예약 찾기 성공');
                await expect(this.comboDepart).toBeVisible();
                break;
            }
        }
    }

    async selectDepart() {
        await expect(this.comboDepart).toBeVisible();
        await this.comboDepart.click();
        console.log('부서 선택 성공');
    }

    async uncheckDepartment() {
        for (let i = 0; i < 7; i++) {
            const selectDepartment = this.department.nth(i);
            const uncheckOption = await selectDepartment.innerText();
            console.log(`해제한 부서 ${i + 1}:`, uncheckOption);
            await selectDepartment.click();
            await this.page.waitForTimeout(1000);
        }
        await this.focusOnBackground.click();
        await expect(this.comboDepartment).toBeVisible();
    }

    async foldHistoryList() {
        await expect(this.foldList).toBeVisible();
        await this.foldList.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.foldList).not.toBeVisible();
        console.log('차팅이력 영역 접기 성공');
    }

    async spreadHistoryList() {
        await expect(this.spreadList).toBeVisible();
        await this.spreadList.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.spreadList).not.toBeVisible();
        console.log('차팅이력 영역 펼치기 성공');
    }

}

export { ChartHistory };