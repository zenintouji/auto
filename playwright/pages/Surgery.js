import { expect } from "playwright/test";

class Surgery {
    constructor(page) {
    this.page = page;
    this.surgery = page.locator("li span", { hasText: /^시\/수술/ }).nth(3);

    this.addSurgeryButton = page.getByRole('button', { name: '+ 시/수술 추가' });
    this.addSurgeryHeader = page.getByRole('heading', { name: '시/수술 추가 close' });

    // 시/수술 추가 팝업 쪽
    this.createSurgeryCode = page.getByRole('button', { name: '+시/수술코드 생성' });

    this.searchSurgeryCategory = page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' });
    this.searchSurgeryName = page.getByRole('combobox', { name: '시/수술명을 검색하세요' });

    this.searchedSurgeryCategory = '';
    this.searchedSurgeryName = '';

    // 선택
    this.selectOptionValue = page.getByRole('option').nth(0);
    this.editOptionValue = page.getByRole('option').nth(1);

    this.searchButton = page.getByRole('button', { name: '검색' });
    this.addingButton = page.getByRole('button', { name: '추가' }).first();

    this.registerSuccessText = page.getByText('등록되었습니다');
    this.closeModalButton = page.getByRole('button', { name: 'close' });

    // 시/수술 진행 
    this.progressSurgeryButton = page.getByText('1회차');

    this.progressSurgeryHeader = page.getByText('시/수술 진행', { exact: true });

    // 의사
    this.doctorTitle = page.locator('label').filter({ hasText: '의사' });
    this.doctorType = page.getByRole('combobox', { name: '의사를 선택하세요' });
    this.selectedDoctorText = '';

    // 어시스트
    this.assistTitle = page.locator('label').filter({ hasText: '어시스트' });
    this.assistType = page.getByRole('combobox', { name: '어시스트를 선택하세요' });
    this.selectedAssistText = '';

    // 시/수술내용
    this.memoTitle = page.locator('label').filter({ hasText: '시/수술내용' });
    this.memoTemplate = page.getByText('자주 쓰는 상용구');
    this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
    this.enteredMemoText = '';


    // 펜차트 샘플함
    this.loadedImageLabel = '';
    this.loadButton = page.getByRole('button', { name: '불러오기' });
    this.penchartSampleButton = page.getByRole('button', { name: 'icon-image 펜차트 샘플함' });
    this.penchartTitle = page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함');
    this.loadedImageCount = 0;

    this.loadImageSuccessText = page.getByText('차트를 불러왔습니다');

    this.saveButton = page.getByRole('button', { name: '저장' });

    this.createSuccessText = page.getByText('시수술을 생성했습니다');

    // 수정
    this.progressSurgeryTitle = page.getByText('시/수술 진행', { exact: true })
    this.editButton = page.getByRole('button', { name: '수정완료' });
    this.editSuccessText = page.locator('text=시수술을 수정했습니다. 연결된 접수정보가 업데이트 됩니다');

    // 삭제
    this.selectChart = page.locator('input[type="checkbox"][data-indeterminate="false"]').nth(1);
    this.deleteButton = page.getByRole('button', { name: '삭제' });
    this.deletePopupText = page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?');
    this.includePenchart = page.getByText('펜차트 포함 삭제');
    this.onlyChart = page.getByText('차트만 삭제');
    this.confirmButton = page.getByRole('button', { name: '확인' });
    this.deleteSuccessText = page.getByText('삭제되었습니다');

    // 시/수술
    this.deleteIconButton = page.locator('td button svg[width="10"][height="12"]');
    this.deleteSurgeryText = page.getByText('시/수술 항목을 삭제하시겠습니까?');
    this.deleteSurgeryPopupText = page.getByText('삭제되었습니다');
    }

    async enterSurgery() {
        await expect(this.surgery).toBeVisible();
        await this.surgery.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log("시/수술 진입 성공");
    }

    async enterSurgeryModal() {
        await expect(this.addSurgeryButton).toBeVisible();
        await this.addSurgeryButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.addSurgeryHeader).toBeVisible();

        console.log('시/수술 추가 팝업 진입 성공');
    }

    async addSurgery() {
        await expect(this.addSurgeryHeader).toBeVisible();
        await expect(this.searchSurgeryCategory).toBeVisible();
        await this.searchSurgeryCategory.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryCategory = await this.selectOptionValue.innerText(); 
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 카테고리: ', this.searchedSurgeryCategory);

        await expect(this.searchSurgeryName).toBeVisible();
        await this.searchSurgeryName.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryName = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술명: ', this.searchedSurgeryName);

        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 검색 성공~');

        await expect(this.addingButton).toBeVisible();
        await this.addingButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 추가 성공~');
    }

    async checkRegisterSuccessText() {
        await expect(this.registerSuccessText).toBeVisible();
        console.log('등록 스낵바 확인 성공');
    }

    async closeAddModal() {
        await expect(this.closeModalButton).toBeVisible();
        await this.closeModalButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 추가 팝업 닫기 성공');
    }

    async checkAddSurgery() {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();

        console.log('시/수술 추가 잘 됐어여~~');
    }

    async enterProgressSurgery() {
        await expect(this.progressSurgeryButton).toBeVisible();
        await this.progressSurgeryButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.progressSurgeryHeader).toBeVisible();

        console.log('시/수술 진행 진입 성공~');
    }

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

    async selectAssist() {
        await expect(this.assistTitle).toBeVisible();
        await expect(this.assistType).toBeVisible();
        await this.assistType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedAssistText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('어시스트: ', this.selectedAssistText);
        await this.page.waitForLoadState('domcontentloaded');
    }


    async checkProgressSurgery() {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName }).nth(1)).toBeVisible();

        console.log('시/수술 추가 잘 됐어여~~');
    }

    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('시/수술_내용_입력_자동화', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('시/수술 내용: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

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

    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('저장 버튼 선택 성공');
    }

    async checkCreateSuccessText() {
        await expect(this.createSuccessText).toBeVisible();
        console.log('저장 스낵바 확인 성공');
    }

    async checkSurgerySuccess() {
        // 오늘 날짜 가져옴
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.verifyVisibleByName('cell', this.selectedDoctorText);
        await this.verifyVisibleByName('cell', this.selectedAssistText);
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
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
        await expect(this.progressSurgeryTitle).toBeVisible();
        console.log('시/수술 수정 진입 성공');
    }

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

    async editAssist() {
        await expect(this.assistTitle).toBeVisible();
        await expect(this.assistType).toBeVisible();
        await this.assistType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedAssistText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('어시스트 수정: ', this.selectedAssistText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async editMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.fill('');
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('시/수술_내용_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('시/수술 내용 수정: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectEditButton() {
        await expect(this.editButton).toBeVisible();
        await this.editButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('시/수술 수정완료 버튼 선택 성공');
    }

    async checkEditSuccessText() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('시/수술 수정완료 스낵바 확인 성공');
    }

    async selectSurgery() {
        await expect(this.selectChart).toBeVisible();
        await this.selectChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('차트 선택 성공');
    }

    async selectDeleteButton() {
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('삭제 버튼 선택 성공');
    }

    async deletePopup() {
        await expect(this.deletePopupText).toBeVisible();
        await expect(this.includePenchart).toBeVisible();
        await this.includePenchart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('펜차트 포함 선택 성공');

        await expect(this.onlyChart).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('시/수술 삭제 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('삭제 스낵바 확인 성공');
    }

    async deleteRemainingSurgery() {
        await expect(this.deleteIconButton).toBeVisible();
        await this.deleteIconButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('시/수술 항목 삭제 버튼 선택 성공');
    }

    async deleteSurgeryPopup() {
        await expect(this.deleteSurgeryText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('시/수술 삭제 성공');
    }

    async checkDeleteSurgerySuccessText() {
        await expect(this.deleteSurgeryPopupText).toBeVisible();
        console.log('시/수술 항목 삭제 스낵바 확인 성공');
    }

} export { Surgery };
