import { expect } from "playwright/test";

class Reservation {
    constructor(page) {
        this.page = page;
        this.reservation = page.locator("li span", { hasText: /^예약/ }).nth(3);

        // 예약 등록
        this.createReservationButton = page.getByRole('button', { name: '+ 예약등록' });
        this.createReservationTitle = page.getByText('예약 등록');

        
        // 첫 번째 옵션
        this.selectOptionValue = page.getByRole('option').nth(0);
        this.selectMenuitemValue = page.getByRole('menuitem').nth(0);
        // 수정할때 사용
        this.editOptionValue = page.getByRole('option').nth(1);
        this.editMenuitemValue = page.getByRole('menuitem').nth(1);

        // 예약 종류
        this.reservationType = page.locator(`input[role="combobox"][value="상담예약"]`);
        this.reservationTitle = page.locator('label').filter({ hasText: '예약종류' });
        this.selectedReservationText = '';

        // 예약 부서
        this.departmentTitle = page.locator('label').filter({ hasText: '예약부서' });
        this.departmentType = page.getByRole('combobox', { name: '부서를 선택하세요' });
        this.selectedDepartmentText = '';
 
        // 방문 시간
        this.visitTimeTitle = page.locator('label').filter({ hasText: '방문시간' });
        this.visitTimeType = page.getByRole('combobox', { name: '-' });
        this.selectVisitTimeText = '';

        // 예상소요시간
        this.expectedTimeTitle = page.locator('label').filter({ hasText: '예상 소요시간' });
        this.expectedTimeType = page.locator('div').filter({ hasText: /^시간분$/ }).nth(2);
        this.selectedExpectedTimeText = '';

        // 내원경로
        this.visitRouteTitle = page.locator('label').filter({ hasText: '내원경로' });
        this.visitRouteType = page.getByRole('combobox', { name: '내원경로를 선택하세요' });
        this.selectedVisitRouteText = '';

        // 의사
        this.doctorTitle = page.locator('label').filter({ hasText: '의사' });
        this.doctorType = page.getByRole('combobox', { name: '의사를 선택하세요' });
        this.selectedDoctorText = '';
 
        // 상담사
        this.counselorTitle = page.locator('label').filter({ hasText: '상담사' });
        this.counselorType = page.getByRole('combobox', { name: '상담사를 선택하세요' });
        this.selectedCounselorText = '';

        // 어시스트
        this.assistTitle = page.locator('label').filter({ hasText: '어시스트' });
        this.assistType = page.getByRole('combobox', { name: '어시스트를 선택하세요' });
        this.selectedAssistText = '';
 
        // 작성자
        this.writerTitle = page.locator('label').filter({ hasText: '작성자' });
        this.editWriterTitle = page.getByText('작성자').nth(1);
        this.writerType = page.getByRole('combobox', { name: '작성자를 선택하세요' });
        this.selectedWriterText = '';

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
        this.memoTitle = page.locator('label').filter({ hasText: '예약메모' });
        this.memoTemplate = page.getByText('자주 쓰는 상용구');
        this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
        // page.getByRole('paragraph').filter({ hasText: /^$/ });
        this.enteredMemoText = '';

        // 저장버튼
        this.saveButton = page.getByRole('button', { name: '저장' });
        this.savedTime = '';

        // 스낵바
        this.saveSuccessText = page.getByText('예약을 등록했습니다');
        this.editSuccessText = page.getByText('예약 및 예약문자를 변경했습니다');
        this.cancelSuccessText = page.getByText('예약이 취소되었습니다');
        this.deleteSuccessText = page.getByText('삭제되었습니다');

        // 예약 수정
        ////

        this.reservationEditTitle = page.getByText('예약 수정');
        this.addingSurgeryCategoryButton = page.getByRole('button', { name: '+', exact: true });
        this.editCompleteButton = page.getByRole('button', { name: '수정완료' });

        
    }

    async enterReservation() {
        await expect(this.reservation).toBeVisible();
        await this.reservation.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('예약 진입 성공');
    }

    async selectCreateReservation() {
        await expect(this.createReservationButton).toBeVisible();
        await this.createReservationButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.createReservationTitle).toBeVisible();
        console.log('예약 등록 진입 성공');
    }

    // 예약 종류 선택
    async selectType() {
        await expect(this.reservationTitle).toBeVisible();
        await expect(this.reservationType).toBeVisible();
        await this.reservationType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedReservationText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('예약종류: ', this.selectedReservationText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 예약 부서 선택
    async selectDepartment() {
        await expect(this.departmentTitle).toBeVisible();
        await expect(this.departmentType).toBeVisible();
        await this.departmentType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedDepartmentText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('예약부서: ', this.selectedDepartmentText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 일자 확인
    async checkDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${yyyy}/${mm}/${dd}`;

        const dateValue = await this.page.locator('input[name="date"]').inputValue();
        console.log('오늘날짜: ', formattedToday);
        console.log('일자: ', dateValue);
        expect(dateValue).toBe(formattedToday);
    }

    // 방문 시간
    async selectVisitTime() {
        await expect(this.visitTimeTitle).toBeVisible();
        await expect(this.visitTimeType).toBeVisible();
        await this.visitTimeType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectVisitTimeText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('방문시간: ', this.selectVisitTimeText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 예상소요시간
    async selectExpectedtime() {
        await expect(this.expectedTimeTitle).toBeVisible();
        await expect(this.expectedTimeType).toBeVisible();
        await this.expectedTimeType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectMenuitemValue).toBeVisible();
        this.selectedExpectedTimeText = await this.selectMenuitemValue.innerText();
        await this.selectMenuitemValue.click();
        console.log('예상소요시간: ', this.selectedExpectedTimeText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 내원경로
    async selectVisitRoute() {
        await expect(this.visitRouteTitle).toBeVisible();
        await expect(this.visitRouteType).toBeVisible();
        await this.visitRouteType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedVisitRouteText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('내원경로: ', this.selectedVisitRouteText);
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
        console.log('의사: ', this.selectedDoctorText);
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
        console.log('상담사: ', this.selectedCounselorText);
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

    // 작성자
    async selectWriter() {
        await expect(this.writerTitle).toBeVisible();
        await expect(this.writerType).toBeVisible();
        await this.writerType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedWriterText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('작성자: ', this.selectedWriterText);
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

    // 예약 메모
    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('당일_접수_메모_입력_자동화', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('예약메모: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 저장버튼
    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('예약 저장 성공');

        const now = new Date();

        const hh = String(now.getHours()).padStart(2, '0');
        const mi = String(now.getMinutes()).padStart(2, '0');

        const formattedTime = `${hh}:${mi}`;
        
        this.savedTime = formattedTime;
        console.log('저장 시간: ', this.savedTime);
    }

    // 저장 완료 스낵바 확인
    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('저장 완료 스낵바 확인 성공');
    }

    async checkReservationSuccess() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await this.page.waitForLoadState('domcontentloaded');


        let time = this.selectVisitTimeText.trim();

        // if (/^\d:\d{2}$/.test(time)) {
        //     time = '0' + time;
        // }

        time = time.replace(/\s*\(\d+\)$/, ''); // 9:00 (1) > 9:00
        
        const [hh = '', mi = ''] = time.split(':');
        time = `${hh.padStart(2, '0')}:${mi}`;

        const combinedText = `${formattedDate} ${time}`;
        await expect(this.page.getByRole('cell', { name: combinedText })).toBeVisible();
        console.log('일시: ', combinedText);
        await expect(this.page.getByRole('cell', { name: this.selectedReservationText })).toBeVisible(); 
        
        const departmentInfo = this.selectedDepartmentText.split('-');
        const category = departmentInfo[0];
        const detail = departmentInfo[1];

        console.log('부서: ', category);
        console.log('세부부서: ', detail);

        await expect(this.page.getByRole('cell', { name: category, exact: true })).toBeVisible();
        console.log('부서 잘 들어가 있네여~');
        await expect(this.page.getByRole('cell', { name: detail, exact: true })).toBeVisible();
        console.log('세부부서 잘 들어가 있네여~');

        await this.verifyVisibleByName('cell', this.selectedDoctorText);
        await this.verifyVisibleByName('cell', this.selectedCounselorText);
        await this.verifyVisibleByName('cell', this.selectedAssistText);
        
        await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.verifyVisibleByName('cell', this.selectedWriterText);
        const combinedTime = `${formattedDate} ${this.savedTime}`;
        await expect(this.page.getByRole('cell', { name: combinedTime })).toBeVisible(); 
        console.log('작성일: ', combinedTime);
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

    
    // 예약 수정
    ///////////
    
    async selectEdit() {
        await expect(this.page.getByRole('cell', { name: this.selectedReservationText })).toBeVisible();
        await this.page.getByRole('cell', { name: this.selectedReservationText }).dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.reservationEditTitle).toBeVisible();
        console.log('예약 수정 진입 성공');
    }

    async editType() {
        await expect(this.reservationTitle).toBeVisible();
        await expect(this.reservationType).toBeVisible();
        await this.reservationType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedReservationText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('예약종류 수정: ', this.selectedReservationText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async editDepartment() {
        await expect(this.departmentTitle).toBeVisible();
        await expect(this.departmentType).toBeVisible();
        await this.departmentType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedDepartmentText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('예약부서 수정: ', this.selectedDepartmentText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 일자 확인
    async checkDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${yyyy}/${mm}/${dd}`;

        const dateValue = await this.page.locator('input[name="date"]').inputValue();
        console.log('오늘날짜 수정: ', formattedToday);
        console.log('일자 수정: ', dateValue);
        expect(dateValue).toBe(formattedToday);
    }

    // 방문시간
    async editVisitTime() {
        await expect(this.visitTimeTitle).toBeVisible();
        await expect(this.visitTimeType).toBeVisible();
        await this.visitTimeType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectVisitTimeText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('방문시간 수정: ', this.selectVisitTimeText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 예상소요시간
    async editExpectedtime() {
        await expect(this.expectedTimeTitle).toBeVisible();
        await expect(this.expectedTimeType).toBeVisible();
        await this.expectedTimeType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editMenuitemValue).toBeVisible();
        this.selectedExpectedTimeText = await this.editMenuitemValue.innerText();
        await this.editMenuitemValue.click();
        console.log('예상소요시간 수정: ', this.selectedExpectedTimeText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 내원경로
    async editVisitRoute() {
        await expect(this.visitRouteTitle).toBeVisible();
        await expect(this.visitRouteType).toBeVisible();
        await this.visitRouteType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedVisitRouteText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('내원경로 수정: ', this.selectedVisitRouteText);
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
        console.log('의사 수정: ', this.selectedDoctorText);
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
        console.log('상담사 수정: ', this.selectedCounselorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 어시스트
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

    // 작성자
    async editWriter() {
        await expect(this.writerTitle).toBeVisible();
        await expect(this.writerType).toBeVisible();
        await this.writerType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedWriterText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('작성자 수정: ', this.selectedWriterText);
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

     // 예약 메모 수정
     async editMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('당일_접수_메모_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('예약메모 수정: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectEditCompleteButton() {
        await expect(this.editCompleteButton).toBeVisible();
        await this.editCompleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('예약 수정 성공');

        const now = new Date();

        const hh = String(now.getHours()).padStart(2, '0');
        const mi = String(now.getMinutes()).padStart(2, '0');

        const formattedTime = `${hh}:${mi}`;
        
        this.savedTime = formattedTime;
        console.log('수정 시간: ', this.savedTime);
    }

    async checkEditSuccessText() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('예약 수정 스낵바 확인 성공');
    }

    


} export { Reservation };