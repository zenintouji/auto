import { expect } from "playwright/test";

class Skincare {
    constructor(page) {
        this.page = page;
        this.skinCare = page.locator("li span", { hasText: /^피부관리/ });

        this.addingSurgeryButton = page.getByRole('button', { name: '+ 시/수술 추가' });
        this.addingSurgeryTitle = page.getByRole('heading', { name: '시/수술 추가 close' });

        // 선택
        this.selectOptionValue = page.getByRole('option').nth(0);
        this.editOptionValue = page.getByRole('option').nth(1);

        // 시/수술 추가
        this.searchSurgeryCategory = page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' });
        this.searchSurgeryName = page.getByRole('combobox', { name: '시/수술명을 검색하세요' });

        this.searchedSurgeryCategory = '';
        this.searchedSurgeryName = '';

        this.searchButton = page.getByRole('button', { name: '검색' });

        this.addingButton = page.getByRole('button', { name: '추가' }).first();

        this.addingSuccessText = page.getByText('등록되었습니다');

        this.closeButton = page.getByRole('button', { name: 'close' });

        // 피부관리 진행
        this.progressSkincareButton = page.getByRole('button', { name: '+ 피부관리 진행' });
        this.progressSkincareTitle = page.getByText('피부관리 진행', { exact: true });

        // 피부관리사
        this.skincareCounselorTitle = page.locator('label').filter({ hasText: '피부관리사' });
        this.skincareCounselorType = page.getByRole('combobox', { name: '피부관리사를 선택하세요' });
        this.selectedSkincareCounselorText = '';

        // 의사
        this.doctorTitle = page.locator('label').filter({ hasText: '의사' });
        this.doctorType = page.getByRole('combobox', { name: '의사를 선택하세요' });
        this.selectedDoctorText = '';

        // 상담사
        this.counselorTitle = page.locator('label').filter({ hasText: '상담사' });
        this.counselorType = page.getByRole('combobox', { name: '상담사를 선택하세요' });
        this.selectedCounselorText = '';

        // 피부관리내용
        this.memoTitle = page.locator('label').filter({ hasText: '피부관리내용' });
        this.memoTemplate = page.getByText('자주 쓰는 상용구');
        this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
        // page.getByRole('paragraph').filter({ hasText: /^$/ });
        this.enteredMemoText = '';

        this.saveButton = page.getByRole('button', { name: '저장' });
        this.saveSuccessText = page.getByText('피부관리를 생성했습니다');

        //////
        // 저장
        this.editButton = page.getByRole('button', { name: '수정완료' });
        this.editSuccessText = page.getByText('피부관리를 수정했습니다. 연결된 접수정보가 업데이트 됩니다');

        // 삭제
        this.selectChart = page.locator('input[type="checkbox"][data-indeterminate="false"]').nth(1);
        this.deleteButton = page.getByRole('button', { name: '삭제' });
        this.deletePopupText = page.getByText('정말로 삭제하시겠습니까?');
        this.confirmButton = page.getByRole('button', { name: '확인' });

        this.deleteSuccessText = page.getByText('삭제되었습니다');
        this.deleteIconButton = page.locator('td button svg[width="10"][height="12"]');
        this.deleteSurgeryText = page.getByText('시/수술 항목을 삭제하시겠습니까?');

        this.deleteSurgeryPopupText = page.getByText('삭제되었습니다');
    }

    async enterSkincare() {
        await expect(this.skinCare).toBeVisible();
        await this.skinCare.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 피부관리 진입 성공');
    }

    async enterAddSurgery() {
        await expect(this.addingSurgeryButton).toBeVisible();
        await this.addingSurgeryButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 추가 팝업 진입 성공');
    }

    async addSurgery() {
        await expect(this.addingSurgeryTitle).toBeVisible();
        await expect(this.searchSurgeryCategory).toBeVisible();
        await this.searchSurgeryCategory.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryCategory = await this.selectOptionValue.innerText(); 
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🔍 시/수술 카테고리: ', this.searchedSurgeryCategory);

        await expect(this.searchSurgeryName).toBeVisible();
        await this.searchSurgeryName.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryName = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🔍 시/수술명: ', this.searchedSurgeryName);

        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 검색 성공~');

        await expect(this.addingButton).toBeVisible();
        await this.addingButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 추가 성공~');
    }

    async checkAddingSuccessText() {
        await expect(this.addingSuccessText).toBeVisible();
        
        console.log('✅ 추가 성공 스낵바 확인 성공~~~');
    }

    async closeSurgeryModal() {
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.addingSurgeryTitle).not.toBeVisible();

        console.log('✅ 시/수술 추가 모달 닫기 성공~~');
    }

    async checkAddSurgery() {
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();

        console.log('✅ 시/수술 추가 잘 됐어여~~');
    }

    ///// 피부관리 진행

    async enterProgressSkincare() {
        await expect(this.progressSkincareButton).toBeVisible();
        await this.progressSkincareButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.progressSkincareTitle).toBeVisible();

        console.log('✅ 피부관리 진행 선택 성공~~');
    }

    // 피부 관리사
    async selectSkincareCounselor() {
        await expect(this.skincareCounselorTitle).toBeVisible();
        await expect(this.skincareCounselorType).toBeVisible();
        await this.skincareCounselorType.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSkincareCounselorText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();

        console.log('🔍 피부관리사: ', this.selectedSkincareCounselorText);

        await this.page.waitForLoadState('domcontentloaded');
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

        console.log('🔍 의사: ', this.selectedDoctorText);

        await this.page.waitForLoadState('domcontentloaded');
    }
    
    // 상담사
    async selectCounselor() {
        await expect(this.counselorTitle).toBeVisible();
        await expect(this.counselorType).toBeVisible();
        await this.counselorType.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.selectOptionValue).toBeVisible();
        this.selectedCounselorText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click(); 

        console.log('🔍 상담사: ', this.selectedCounselorText);

        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkAddedSurgery() {
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName }).nth(1)).toBeVisible();

        console.log('🔍 추가된 시/수술 카테고리: ', this.searchedSurgeryCategory);
        console.log('🔍 추가된 시/수술명: ', this.searchedSurgeryName);
    }

    // 피부관리내용
    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();

        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('피부_관리_내용_입력_자동화', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');

        this.enteredMemoText = await this.memoEnter.innerText();

        console.log('🔍 피부관리내용: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async saveSkincare() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click(); 
        await this.page.waitForLoadState('domcontentloaded');

        console.log('✅ 피부관리 저장 성공~~');
    }

    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('✅ 저장 스낵바 확인 성공~');
    }

    // 확인
    async checkSkincareSuccess() {

        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible(); 
        console.log('🔍 일자: ', formattedDate);
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible(); 

        await this.verifyVisibleByName('cell', this.selectedSkincareCounselorText);
        await this.verifyVisibleByName('cell', this.selectedDoctorText);
        await this.verifyVisibleByName('cell', this.selectedCounselorText);

        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();

        console.log('✅ 선택 값들 전부 내역에 잘 들어가 있어요~');s
    }

    async verifyVisibleByName(role, nameText) {
        const elements = this.page.getByRole(role, { name: nameText });
        const count = await elements.count();

        if (count > 1) {
            for (let i = 0; i < count; i++) {
                const text = await elements.nth(i).innerText();
                if (text.trim() === nameText.trim()) {
                    await expect(elements.nth(i)).toBeVisible();
                    console.log(`✅ ${nameText} 이거 겹치네여~~~ 잘 들어가 있어여~~`);
                    return true;
                }
            }
            console.log(`✅ ${nameText} 중복 항목 일치 항목 없어여~~`);
            return false;
        } else if (count === 1) {
            await expect(elements.first()).toBeVisible();
            console.log('✅ 항목 하나 밖에 없네유, 잘 들어 있어여~~');
            return true;
        } else {
            console.log(`🚫 ${nameText} 항목이 없어여~~`);
            return false;
        }
    }

    async selectEdit() {
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.page.getByRole('cell', { name: this.enteredMemoText }).dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.progressSkincareTitle).toBeVisible();
        console.log('✅ 예약 수정 진입 성공');
    }

    // 피부 관리사
    async editSkincareCounselor() {
        await expect(this.skincareCounselorTitle).toBeVisible();
        await expect(this.skincareCounselorType).toBeVisible();
        await this.skincareCounselorType.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.editOptionValue).toBeVisible();
        this.selectedSkincareCounselorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();

        console.log('🔍 피부관리사 수정: ', this.selectedSkincareCounselorText);

        await this.page.waitForLoadState('domcontentloaded');
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

        console.log('🔍 의사 수정: ', this.selectedDoctorText);

        await this.page.waitForLoadState('domcontentloaded');
    }

    // 상담사
    async editCounselor() {
        await expect(this.counselorTitle).toBeVisible();
        await expect(this.counselorType).toBeVisible();
        await this.counselorType.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.editOptionValue).toBeVisible();
        this.selectedCounselorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click(); 

        console.log('🔍 상담사 수정: ', this.selectedCounselorText);

        await this.page.waitForLoadState('domcontentloaded');
    }

    // 피부관리내용
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
        await this.memoEnter.type('피부_관리_내용_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');

        this.enteredMemoText = await this.memoEnter.innerText();

        console.log('🔍 피부관리내용 수정: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async editSkincare() {
        await expect(this.editButton).toBeVisible();
        await this.editButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 피부관리 수정 버튼 선택 성공');
    }

    async checkEditSuccessText() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('✅ 수정 스낵바 확인 성공');
    }

    async selectSkincare() {
        await expect(this.selectChart).toBeVisible();
        await this.selectChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 차트 선택 성공');
    }

    async deleteSkincare() {
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 삭제 버튼 선택 성공');
    }

    async deletePopup() {
        await expect(this.deletePopupText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 삭제 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 삭제 스낵바 확인 성공');
    }

    async deleteRemainingSkincare() {
        await expect(this.deleteIconButton).toBeVisible();
        await this.deleteIconButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 시/수술 항목 삭제 버튼 선택 성공');
    }

    async deleteSurgeryPopup() {
        await expect(this.deleteSurgeryText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 시/수술 삭제 성공');
    }

    async checkDeleteSurgerySuccessText() {
        await expect(this.deleteSurgeryPopupText).toBeVisible();
        console.log('✅ 시/수술 항목 삭제 스낵바 확인 성공');
    }

} export { Skincare };