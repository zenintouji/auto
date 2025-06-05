import { expect } from '@playwright/test';

class Nursing {
  constructor(page) {
    this.page = page;
    this.nursingChart = page.locator("li span", { hasText: /^간호/ }).nth(2);

    this.saveButton = page.getByRole('button', { name: '저장' });
    this.editSuccessButton = page.getByRole('button', { name: '수정완료' });
    this.deleteButton = page.getByRole('button', { name: '삭제' });
    this.confirmButton = page.getByRole('button', { name: '확인' });

    this.selectOptionValue = page.getByRole("option").nth(0);
    this.editOptionValue = page.getByRole("option").nth(1);

    this.saveSuccessText = page.getByText('간호를 생성했습니다');
    this.editSuccessText = page.getByText('간호를 수정했습니다. 연결된 접수정보가 업데이트 됩니다');
    this.deleteSuccessText = page.getByText('삭제되었습니다');

    this.registButton = page.getByRole("button", { name: "+ 간호등록" });
    this.editButton = page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)');

    this.selectChartButton = page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first();

    // 의사
    this.doctorTitle = page.locator("label").filter({ hasText: "의사" });
    this.doctorType = page.getByRole("combobox", { name: "의사를 선택하세요" });
    this.selectedDoctorText = "";

    // 간호사
    this.nurseTitle = page.locator("label").filter({ hasText: "간호사" });
    this.nurseType = page.getByRole("combobox", {name: "간호사를 선택하세요"});
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

    // 바이탈
    this.vitalTitle = page.getByText("바이탈");
    this.vitalBodyWeightTitle = page.getByText("몸무게 (kg)");
    this.vitalWeightInput = page.locator('input[placeholder="-"]');

    // 혈압
    this.vitalPresureTitle = page.getByText("혈압 (mmHg)");

    // 투약 약품명
    this.nameOfMedicine = page.getByText("투약 약품명");
    this.medicineTitle = page.getByRole("combobox", {name: "투약 약품명을 선택하세요"});
    this.selectedMedicine = "";

    // 투약량
    this.amountMedicine = page.getByText("투약량");
    this.amountMedicineText = "";

    // 간호 내용
    this.memoTitle = page.locator('label').filter({ hasText: '간호내용' });
    this.memoTemplate = page.getByText('자주 쓰는 상용구');
    this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
    this.enteredMemoText = '';

    // 삭제
    this.deleteTitle = page.getByText('정말로 삭제하시겠습니까?');


  }

  async enterNursingChart() {
    await expect(this.nursingChart).toBeVisible();
    await this.nursingChart.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log("✅ 간호 차트 진입 성공");
  }

  async selectRegistNursing() {
    await expect(this.registButton).toBeVisible();
    await this.registButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log("✅ 간호 등록 진입 성공");
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
    console.log("🔍 의사: ", this.selectedDoctorText);
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
    console.log("🔍 간호사: ", this.selectedNurseText);
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
    console.log("🔍 시/수술 카테고리: ", this.selectedSurgicalCategoryText);
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
    console.log("🔍 시/수술명: ", this.selectedSurgeryText);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // 바이탈
  async vitalBodyWeight() {
    await expect(this.vitalTitle).toBeVisible();
    await expect(this.vitalBodyWeightTitle).toBeVisible();
    for (let i = 0; i < 10; i++) {
      const value = (i + 1) * 10;
      await this.vitalWeightInput.nth(i).click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.vitalWeightInput.nth(i).fill(String(value));
    }
    console.log("✅ 바이탈 입력 성공");
  }

  // 혈압
  async vitalPresure() {
    await expect(this.vitalPresureTitle).toBeVisible();
    for (let i = 10; i < 20; i++) {
      const value = i * 2;
      await this.vitalWeightInput.nth(i).click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.vitalWeightInput.nth(i).fill(String(value));
    }
    console.log("✅ 혈압 입력 성공");
  }

  // 투약 약품명
  async selectMedicine() {
    await expect(this.nameOfMedicine).toBeVisible();
    await expect(this.medicineTitle).toBeVisible();
    await this.medicineTitle.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.selectOptionValue).toBeVisible();
    this.selectedMedicine = await this.selectOptionValue.innerText();
    await this.selectOptionValue.click();
    console.log("🔍 투약 약품명: ", this.selectedMedicine);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // 투약량
  async enterAmountMedicine() {
    await expect(this.amountMedicine).toBeVisible();
    await expect(this.vitalWeightInput.nth(60)).toBeVisible();
    await this.vitalWeightInput.nth(60).click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.vitalWeightInput.nth(60).fill("100");
    this.amountMedicineText = await this.vitalWeightInput.nth(60).inputValue();
    console.log("🔍 투약량: ", this.amountMedicineText);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // 간호 내용
  async enterMemo() {
    await expect(this.memoTitle).toBeVisible();
    await expect(this.memoTemplate).toBeVisible();
    await expect(this.memoEnter).toBeVisible();
    await this.memoEnter.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.memoEnter.type("간호내용_입력_자동화", { delay: 50 });
    await this.page.waitForLoadState("domcontentloaded");
    this.enteredMemoText = await this.memoEnter.innerText();
    console.log("🔍 간호내용: ", this.enteredMemoText);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async saveNursingChart() {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log("✅ 간호 등록 성공");
  }

  async checkSaveSuccess() {
    await expect(this.saveSuccessText).toBeVisible();
    console.log('✅ 저장 스낵바 확인 성공')
  }

  async checkNursingSuccess() {

    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `-${mm}-${dd}`;
    await this.page.waitForLoadState('domcontentloaded');

    await expect(this.page.getByRole('cell', { name: formattedDate })).toBeVisible(); 
    console.log('🔍 일자: ', formattedDate);
    const ifDoctorNameSame = this.page.getByRole('cell', { name: this.selectedDoctorText });
    const ifNurseNameSame = this.page.getByRole('cell', { name: this.selectedNurseText });
    const doctorCount = await ifDoctorNameSame.count();
    const nurseCount = await ifNurseNameSame.count();
    let verified = false;
    let checked = false;

    if (doctorCount > 1) {
        for (let i = 0; i < doctorCount; i++) {
            const text = await ifDoctorNameSame.nth(i).innerText();
            if (text.trim() === this.selectedDoctorText.trim()) {
                await expect(ifDoctorNameSame.nth(i)).toBeVisible();
                verified = true;
                break;
            }
        }
        if (!verified) {
            console.log(`❌ 의사 부분 망했습니다.`);
        } else {
            console.log(`✅ 의사 이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
        }
    } else if (doctorCount === 1) {
        const text = await ifDoctorNameSame.nth(0).innerText();
        if (text.trim() === this.selectedDoctorText.trim()) {
            await expect(ifDoctorNameSame.nth(0)).toBeVisible();
            console.log('✅ 의사 이름 1개여도 잘 들어가 있네요: ', this.selectedDoctorText);
        } else {
            console.log('❌ 의사 망했네요, 1개인데 값이 안맞음;;');
        }
    }

    if (nurseCount > 1) {
        for (let j = 0; j < nurseCount; j++) {
            const temp = await ifNurseNameSame.nth(j).innerText();
            if (temp.trim() === this.selectedNurseText.trim()) {
                await expect(ifNurseNameSame.nth(j)).toBeVisible();
                checked = true;
                break;
            }
        }
        if (!checked) {
            console.log(`❌ 간호사 부분 망했습니다.`);
        } else {
            console.log(`✅ 간호사 이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
        }
    } else if (nurseCount === 1) {
        const text = await ifNurseNameSame.nth(0).innerText();
        if (text.trim() === this.selectedNurseText.trim()) {
            await expect(ifNurseNameSame.nth(0)).toBeVisible();
            console.log('✅ 간호사 이름 1개여도 잘 들어가 있네요: ', this.selectedNurseText);
        } else {
            console.log('❌ 간호사 망했네요, 1개인데 값이 안맞음;;;;')
        }
    }
    await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
    await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
    console.log('✅ 간호 등록 결과 확인 성공');
  }

  async enterEditChart() {
    await expect(this.editButton).toBeVisible();
    await this.editButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log('✅ 수정 진입 성공');
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
    console.log("🔍 의사: ", this.selectedDoctorText);
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
    console.log("🔍 간호사: ", this.selectedNurseText);
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
    console.log("🔍 시/수술 카테고리: ", this.selectedSurgicalCategoryText);
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
    console.log("🔍 시/수술명: ", this.selectedSurgeryText);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async editVitalBodyWeight() {
    await expect(this.vitalTitle).toBeVisible();
    await expect(this.vitalBodyWeightTitle).toBeVisible();
    for (let i = 0; i < 10; i++) {
      const value = (i + 2) * 10;
      await this.vitalWeightInput.nth(i).click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.vitalWeightInput.nth(i).fill("");
      await this.page.waitForLoadState("domcontentloaded");
      await this.vitalWeightInput.nth(i).fill(String(value));
    }
    console.log("✅ 바이탈 수정 성공");
  }

  async editVitalPresure() {
    await expect(this.vitalPresureTitle).toBeVisible();
    for (let i = 10; i < 20; i++) {
      const value = i * 3;
      await this.vitalWeightInput.nth(i).click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.vitalWeightInput.nth(i).fill("");
      await this.page.waitForLoadState("domcontentloaded");
      await this.vitalWeightInput.nth(i).fill(String(value));
    }
    console.log("✅ 혈압 수정 성공");
  }

  // 투약 약품명
  async editMedicine() {
    await expect(this.nameOfMedicine).toBeVisible();
    await expect(this.medicineTitle).toBeVisible();
    await this.medicineTitle.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.editOptionValue).toBeVisible();
    this.selectedMedicine = await this.editOptionValue.innerText();
    await this.editOptionValue.click();
    console.log("🔍 투약 약품명: ", this.selectedMedicine);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // 투약량
  async editAmountMedicine() {
    await expect(this.amountMedicine).toBeVisible();
    await expect(this.vitalWeightInput.nth(60)).toBeVisible();
    await this.vitalWeightInput.nth(60).click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.vitalWeightInput.nth(60).fill("");
    await this.page.waitForLoadState("domcontentloaded");
    await this.vitalWeightInput.nth(60).fill("200");
    await this.page.waitForLoadState("domcontentloaded");
    this.amountMedicineText = await this.vitalWeightInput.nth(60).inputValue();
    console.log("🔍 투약량: ", this.amountMedicineText);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // 간호 내용
  async editMemo() {
    await expect(this.memoTitle).toBeVisible();
    await expect(this.memoTemplate).toBeVisible();
    await expect(this.memoEnter).toBeVisible();
    await this.memoEnter.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.memoEnter.fill("");
    await this.page.waitForLoadState("domcontentloaded");
    await this.memoEnter.type("🧾 간호내용_입력_자동화_수정", { delay: 50 });
    await this.page.waitForLoadState("domcontentloaded");
    this.enteredMemoText = await this.memoEnter.innerText();
    console.log("🔍 간호내용: ", this.enteredMemoText);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async editNursingChart() {
    await expect(this.editSuccessButton).toBeVisible();
    await this.editSuccessButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log("✅ 간호 수정 성공");
  }

  async checkEditSuccess() {
    await expect(this.editSuccessText).toBeVisible();
    console.log('✅ 수정 스낵바 확인 성공')
  }

  async selectChart() {
    await expect(this.selectChartButton).toBeVisible();
    await this.selectChartButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.deleteButton).toBeVisible();
    console.log('✅ 차트 선택 성공');
  }

  async selectDelete() {
    await expect(this.deleteButton).toBeVisible();
    await this.deleteButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.deleteTitle).toBeVisible();
    console.log('✅ 삭제 버튼 선택 성공');
  }

  async deletePopup() {
    await expect(this.deleteTitle).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
    await this.confirmButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    console.log('✅ 간호차트 삭제 성공');
  }

  async checkDeleteSuccess() {
    await expect(this.deleteSuccessText).toBeVisible();
    console.log('✅ 삭제 스낵바 확인 성공');
  }


}

export { Nursing };