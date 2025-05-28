import { expect } from '@playwright/test';

class SurgicalNursing {
    constructor(page) {
        this.page = page;
        this.surgicalNursingChart = page.locator("li span", { hasText: /^수술간호/ }).nth(1);

        // 버튼 
        this.registButton = page.getByRole("button", { name: "+ 수술간호등록" });
        this.saveButton = page.getByRole('button', { name: '저장' });
        this.editSuccessButton = page.getByRole('button', { name: '수정완료' });
        this.deleteButton = page.getByRole('button', { name: '삭제' });
        this.confirmButton = page.getByRole('button', { name: '확인' });

        // 타이틀
        this.registSurgicalNursingTitle = page.getByText('수술간호 등록');
        this.editSurgicalNursingTitle = page.getByText('수술간호 수정');

        // 선택
        this.selectOptionValue = page.getByRole("option").nth(0);
        this.editOptionValue = page.getByRole("option").nth(1);

        // 의사
        this.doctorTitle = page.locator("label").filter({ hasText: "의사" });
        this.doctorType = page.getByRole("combobox", { name: "의사를 선택하세요" });
        this.selectedDoctorText = "";

        // 간호사
        this.nurseTitle = page.locator("label").filter({ hasText: "간호사" });
        this.nurseType = page.getByRole("combobox", {name: "간호사를 선택하세요" });
        this.selectedNurseText = "";

        // 시/수술 카테고리
        this.surgicalCategoryTitle = page.locator("label").filter({ hasText: "시/수술 카테고리" });
        this.surgicalCategoryType = page.getByRole("combobox", {name: "시/수술 카테고리를 선택하세요"});
        this.editSurgicalCategoryType = page.getByRole("combobox", { name: "시/수술 카테고리를 선택하세요" }).nth(1);
        this.selectedSurgicalCategoryText = "";

        // 시/수술명
        this.surgeryTitle = page.locator("label").filter({ hasText: "시/수술명" });
        this.surgeryType = page.getByRole("combobox", {name: "시/수술명을 선택하세요"});
        this.editSurgeryType = page.getByRole("combobox", { name: "시/수술명을 선택하세요" }).nth(1);
        this.selectedSurgeryText = "";

        // 수술 시작시간 및 종료 시간 ㄱㄱㄱ
        this.surgeryStartHourTitle = page.getByText('수술시작시간');

        this.startHour = page.locator('input[name="startHour"]');
        this.startMinute = page.locator('input[name="startMinute"]');
        // 종료
        this.surgeryEndHourTitle = page.getByText('수술종료시간');

        this.endHour = page.locator('input[name="endHour"]');
        this.endMinute = page.locator('input[name="endMinute"]');

        // 시/수술내용
        this.memoTitle = page.locator('label').filter({ hasText: '수술간호내용' });
        this.memoTemplate = page.getByText('자주 쓰는 상용구');
        this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
        this.enteredMemoText = '';

        this.createSuccessText = page.getByText('수술간호를 생성했습니다');
        this.editSuccessText = page.getByText('수술간호를 수정했습니다. 연결된 접수정보가 업데이트 됩니다');

        // 삭제
        this.selectChart = page.locator('input[type="checkbox"][data-indeterminate="false"]').nth(1);
        this.deletePopupText = page.getByText('정말로 삭제하시겠습니까?');
        this.deleteSuccessText = page.getByText('삭제되었습니다');
    }

    async enterSurgicalNursingChart() {
        await expect(this.surgicalNursingChart).toBeVisible();
        await this.surgicalNursingChart.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log("수술간호 차트 진입 성공");
    }

    async selectRegistNursing() {
        await expect(this.registButton).toBeVisible();
        await this.registButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.registSurgicalNursingTitle).toBeVisible();
        console.log("간호 등록 진입 성공");
    }

    // 의사
    async selectDoctor() {
        await expect(this.doctorTitle).toBeVisible();
        await expect(this.doctorType).toBeVisible();
        await this.doctorType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedDoctorText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log("의사: ", this.selectedDoctorText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    // 간호사
    async selectNurse() {
        await expect(this.nurseTitle).toBeVisible();
        await expect(this.nurseType).toBeVisible();
        await this.nurseType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedNurseText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log("간호사: ", this.selectedNurseText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    // 시/수술 카테고리
    async selectSurgicalCategory() {
        await expect(this.surgicalCategoryTitle).toBeVisible();
        await expect(this.surgicalCategoryType).toBeVisible();
        await this.surgicalCategoryType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgicalCategoryText =
        await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log("시/수술 카테고리: ", this.selectedSurgicalCategoryText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    // 시/수술명
    async selectSurgery() {
        await expect(this.surgeryTitle).toBeVisible();
        await expect(this.surgeryType).toBeVisible();
        await this.surgeryType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgeryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log("시/수술명: ", this.selectedSurgeryText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async enterSurgeryStartTime() {
        await expect(this.surgeryStartHourTitle).toBeVisible();
        await expect(this.startHour).toBeVisible();
        await this.startHour.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.startHour.type('9', { delay: 50 });
        console.log('수술 시작시간 ~시 작성 성공~');

        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.startMinute).toBeVisible();
        await this.startMinute.type('00', { delay: 50 });
        console.log('수술 시작시간 ~분 작성 성공~');
    }

    async enterSurgeryEndTime() {
        await expect(this.surgeryEndHourTitle).toBeVisible();
        await expect(this.endHour).toBeVisible();
        await this.endHour.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.endHour.type('9', { delay: 50 });
        console.log('수술 종료시간 ~시 작성 성공');

        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.endMinute).toBeVisible();
        await this.endMinute.type('00', { delay: 50 });
        console.log('수술 종료시간 ~분 작성 성공~');
    }

    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('수술간호_내용_입력_자동화', { delay: 50 });
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('수술간호 내용: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
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

    // 성공 후 체크 
    async checkSurgerySuccess() {
        // 오늘 날짜 가져옴
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;

        await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible();
        console.log('일자 잘 들어가 있어여 => ', formattedDate);
        await this.verifyVisibleByName('cell', this.selectedDoctorText);
        await this.verifyVisibleByName('cell', this.selectedNurseText);
        await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
        console.log('수술 카테고리 잘 들어가 있어여 => ', this.selectedSurgicalCategoryText);
        await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
        console.log('수술명 잘 들어가 있어여 => ', this.selectedSurgeryText);
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        console.log('수술간호 내용 잘 들어가 있어여 => ', this.enteredMemoText);

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

    ///////////////
    // 수정

    async selectEdit() {
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.page.getByRole('cell', { name: this.enteredMemoText }).dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editSurgicalNursingTitle).toBeVisible();
        console.log('수술간호 수정 진입 성공');
    }

    // 의사
    async editDoctor() {
        await expect(this.doctorTitle).toBeVisible();
        await expect(this.doctorType).toBeVisible();
        await this.doctorType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.editOptionValue).toBeVisible();
        this.selectedDoctorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log("의사: ", this.selectedDoctorText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    // 간호사
    async editNurse() {
        await expect(this.nurseTitle).toBeVisible();
        await expect(this.nurseType).toBeVisible();
        await this.nurseType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.editOptionValue).toBeVisible();
        this.selectedNurseText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log("간호사: ", this.selectedNurseText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    // 시/수술 카테고리
    async editSurgicalCategory() {
        await expect(this.surgicalCategoryTitle).toBeVisible();
        await expect(this.surgicalCategoryType).toBeVisible();
        await this.surgicalCategoryType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.editOptionValue).toBeVisible();
        this.selectedSurgicalCategoryText =
        await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log("시/수술 카테고리: ", this.selectedSurgicalCategoryText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    // 시/수술명
    async editSurgery() {
        await expect(this.surgeryTitle).toBeVisible();
        await expect(this.surgeryType).toBeVisible();
        await this.surgeryType.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedSurgeryText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log("시/수술명: ", this.selectedSurgeryText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async editMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.memoEnter.fill("");
        await this.page.waitForLoadState("domcontentloaded");
        await this.memoEnter.type("수술간호내용_입력_자동화_수정", { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log("간호내용: ", this.enteredMemoText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async editNursingChart() {
        await expect(this.editSuccessButton).toBeVisible();
        await this.editSuccessButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log("간호 수정 성공");
    }
    
    async checkEditSuccess() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('수정 스낵바 확인 성공')
    }

    ///////
    // 삭제

    async selectSurgeryChart() {
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
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('수술간호차트 삭제 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('삭제 스낵바 확인 성공');
    }

} export { SurgicalNursing };