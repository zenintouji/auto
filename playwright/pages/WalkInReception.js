import { expect } from '@playwright/test';

class WalkInReception {
    constructor(page) {
        this.page = page;

        this.receptionButton = page.getByRole('button', { name: '접수' });
        
        this.receptionEditTitle = page.getByText('접수 수정');

        this.receptionMessage = page.getByText('오늘 예약이 없는 고객입니다.접수하시겠습니까?');
        this.cancelMessage = page.getByText('접수가 취소됩니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요');
        this.deleteMessage = page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요');

        this.confirmButton = page.getByRole('button', { name: '확인' });
        this.editButton = page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)');
        this.editCompleteButton = page.getByRole('button', { name: '수정완료' });
        this.addingSurgeryCategoryButton = page.getByRole('button', { name: '+', exact: true });
        this.cancelReceptionButton = page.getByRole('button', { name: '접수취소' });
        this.deleteReceptionButton = page.getByRole('button', { name: '삭제' });
        
        // 접수 취소 상태 확인
        this.checkCancelStatus = page.getByRole('cell', { name: '접수취소' });

        // 항목 선택
        this.selectChart = page.getByRole('cell').filter({ hasText: /^$/ }).nth(2);

        this.headerPopup = page.getByRole('heading', { name: '접수 자동화_신규고객 (여성/32/940505)' });
        this.customerInfo = page.getByText('자동화_신규고객 (여성/32/940505)');

        // 첫 번째 옵션
        this.selectOptionValue = page.getByRole('option').nth(0);
        this.selectMenuitemValue = page.getByRole('menuitem').nth(0);
        // 수정할때 사용
        this.editOptionValue = page.getByRole('option').nth(1);
        this.editMenuitemValue = page.getByRole('menuitem').nth(1);

        // 접수 종류
        this.receptionTitle = page.locator('label').filter({ hasText: '접수종류' });
        // this.receptionType = page.getByRole('combobox').nth(0);
        this.editReceptionType = page.locator(`input[role="combobox"][value="상담접수"]`);
        this.selectedReceptionText = '';

        // 접수 부서
        this.departmentTitle = page.locator('label').filter({ hasText: '접수부서' });
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
        this.memoTitle = page.locator('label').filter({ hasText: '접수메모' });
        this.memoTemplate = page.getByText('자주 쓰는 상용구');
        this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
        // page.getByRole('paragraph').filter({ hasText: /^$/ });
        this.enteredMemoText = '';

        // 저장버튼
        this.saveButton = page.getByRole('button', { name: '저장' });
        
        // 스낵바
        this.saveSuccessText = page.getByText('접수를 생성했습니다');
        this.editSuccessText = page.getByText('접수를 변경했습니다');
        this.cancelSuccessText = page.getByText('접수가 취소되었습니다');
        this.deleteSuccessText = page.getByText('접수가 삭제되었습니다');

        // 고객명
        this.customerName = page.getByRole('cell', { name: '자동화_신규고객' });
        this.simpleReceptionName = page.getByRole('cell', { name: '간편접수_확인' });

        // 통합차트
        this.integratedChartTitle = page.getByText('통합차트');
        this.receptionChart = page.locator('li span', { hasText: /^접수/ }).nth(1);

    }

    // 당일접수 신청까지
    async dailyReception() {
        await expect(this.receptionButton).toBeVisible();
        await this.receptionButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.receptionMessage).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 당일접수 신청 성공');
    }

    // 당일접수 차트 진입 확인
    async isChartEntered() {
        await expect(this.headerPopup).toBeVisible();
        await expect(this.customerInfo).toBeVisible();
    }

    // 당일 접수종류 선택
    async selectType() {
        await expect(this.receptionTitle).toBeVisible();
        await expect(this.editReceptionType).toBeVisible();
        await this.editReceptionType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedReceptionText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 접수종류: ', this.selectedReceptionText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 당일 접수부서 선택
    async selectDepartment() {
        await expect(this.departmentTitle).toBeVisible();
        await expect(this.departmentType).toBeVisible();
        await this.departmentType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedDepartmentText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 접수부서: ', this.selectedDepartmentText);
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
        console.log('🔍 오늘날짜: ', formattedToday);
        console.log('🔍 일자: ', dateValue);
        expect(dateValue).toBe(formattedToday);
    }
    
    // 방문시간
    async selectVisitTime() {
        await expect(this.visitTimeTitle).toBeVisible();
        await expect(this.visitTimeType).toBeVisible();
        await this.visitTimeType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedVisitRouteText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 방문시간: ', this.selectedVisitRouteText);
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
        console.log('🔍 예상소요시간: ', this.selectedExpectedTimeText);
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
        console.log('🔍 내원경로: ', this.selectedVisitRouteText);
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

    // 어시스트
    async selectAssist() {
        await expect(this.assistTitle).toBeVisible();
        await expect(this.assistType).toBeVisible();
        await this.assistType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedAssistText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('🔍 어시스트: ', this.selectedAssistText);
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
        console.log('🔍 작성자: ', this.selectedWriterText);
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
        console.log('🔍 시/수술 카테고리: ', this.selectedSurgicalCategoryText);
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
        console.log('🔍 시/수술명: ', this.selectedSurgeryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 접수메모
    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('당일_접수_메모_입력_자동화', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('🔍 접수메모: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 저장버튼
    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 저장 버튼 선택 성공');
    }

    // 저장 완료 스낵바 확인
    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('✅ 저장 완료 스낵바 확인 성공');
    }
    
    // 통합차트 진입
    async enterInIntegratedChart() {
        await expect(this.customerName).toBeVisible();
        await this.customerName.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.integratedChartTitle).toBeVisible();
        console.log('✅ 통합차트 진입 성공');
    }

    // 간편접수 
    async simpleReceptionIntegratedChart() {
        await expect(this.simpleReceptionName).toBeVisible();
        await this.simpleReceptionName.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.integratedChartTitle).toBeVisible();
        console.log('✅ 통합차트 진입 성공');
    }

    // 접수차트 진입
    async enterReceptionChart() {
        await expect(this.receptionChart).toBeVisible();
        await this.receptionChart.click();
        console.log('✅ 접수 차트 진입 성공');
    }
    
    // 
    // async checkReceptionSuccess() {
    //     await expect(this.page.getByRole('cell', { name: this.selectedReceptionText })).toBeVisible(); 
    //     await expect(this.page.getByRole('cell', { name: this.selectedVisitRouteText })).toBeVisible();
    //     const ifNameSame = this.page.getByRole('cell', { name: this.selectedDoctorText });
    //     const nameCount = await ifNameSame.count();

    //     let verified = false;

    //     if (nameCount > 1) {
    //         for (let i = 0; i < nameCount; i++) {
    //             const text = await ifNameSame.nth(i).innerText();
    //             if (text.trim() === this.selectedDoctorText.trim()) {
    //                 await expect(ifNameSame.nth(i)).toBeVisible();
    //                 verified = true;
    //                 break;
    //             }
    //         }
    //         if (!verified) {
    //             console.log(`망했습니다.`);
    //         } else {
    //             console.log(`이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
    //         }
    //     } else {
    //         await expect(this.page.getByRole('cell', { name: this.selectedDoctorText })).toBeVisible();
    //         await expect(this.page.getByRole('cell', { name: this.selectedCounselorText })).toBeVisible();
    //         await expect(this.page.getByRole('cell', { name: this.selectedAssistText })).toBeVisible();
    //         await expect(this.page.getByRole('cell', { name: this.selectedWriterText })).toBeVisible();
    //     }        
    //     await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
    //     await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
    //     await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
    //     console.log('접수 결과 확인 성공');
    // }

    async checkReceptionSuccess() {
        await expect(this.page.getByRole('cell', { name: this.selectedReceptionText })).toBeVisible(); 
        await expect(this.page.getByRole('cell', { name: this.selectedVisitRouteText })).toBeVisible();

        await this.verifyVisibleByName('cell', this.selectedDoctorText);
        await this.verifyVisibleByName('cell', this.selectedCounselorText);
        await this.verifyVisibleByName('cell', this.selectedAssistText);
        await this.verifyVisibleByName('cell', this.selectedWriterText);

        await expect(this.page.getByRole('cell', { name: this.selectedSurgicalCategoryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.selectedSurgeryText })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
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

    ////////
    // 여기서 부터 수정
    /////////

    async selectEdit() {
        await expect(this.page.getByRole('cell', { name: this.selectedVisitRouteText })).toBeVisible();
        await this.page.getByRole('cell', { name: this.selectedVisitRouteText }).dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.receptionEditTitle).toBeVisible();
        console.log('✅ 접수 수정 진입 성공');
    }

    async editType() {
        await expect(this.receptionTitle).toBeVisible();
        await expect(this.editReceptionType).toBeVisible();
        await this.editReceptionType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedReceptionText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('🔍 접수종류 수정: ', this.selectedReceptionText);
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
        console.log('🔍 접수부서 수정: ', this.selectedDepartmentText);
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
        console.log('🔍 오늘날짜 수정: ', formattedToday);
        console.log('🔍 일자 수정: ', dateValue);
        expect(dateValue).toBe(formattedToday);
    }

    // 방문시간
    async editVisitTime() {
        await expect(this.visitTimeTitle).toBeVisible();
        await expect(this.visitTimeType).toBeVisible();
        await this.visitTimeType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedVisitRouteText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('🔍 방문시간 수정: ', this.selectedVisitRouteText);
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
        console.log('🔍 예상소요시간 수정: ', this.selectedExpectedTimeText);
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
        console.log('🔍 내원경로 수정: ', this.selectedVisitRouteText);
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

    // 어시스트
    async editAssist() {
        await expect(this.assistTitle).toBeVisible();
        await expect(this.assistType).toBeVisible();
        await this.assistType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedAssistText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('🔍 어시스트 수정: ', this.selectedAssistText);
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
        console.log('🔍 작성자 수정: ', this.selectedWriterText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 추가
    async addingSurgeryCategory() {
        await expect(this.addingSurgeryCategoryButton).toBeVisible();
        await this.addingSurgeryCategoryButton.click();
        console.log('✅ 시/수술 카테고리 추가 성공');
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
        console.log('🔍 시/수술 카테고리 수정: ', this.selectedSurgicalCategoryText);
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
        console.log('🔍 시/수술명 수정: ', this.selectedSurgeryText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 접수메모 수정
    async editMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('당일_접수_메모_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('🔍 접수메모 수정: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectEditCompleteButton() {
        await expect(this.editCompleteButton).toBeVisible();
        await this.editCompleteButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkEditSuccessText() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('✅ 접수 수정 성공');
    }


    /////
    // 접수 취소
    ////

    async cancelReception() {
        await expect(this.selectChart).toBeVisible();
        await this.selectChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 차트 선택 성공');
        await expect(this.cancelReceptionButton).toBeVisible();
        await this.cancelReceptionButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 취소 선택 성공');
        await expect(this.cancelMessage).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 취소 버튼 선택 성공');
    }

    async checkCancelSuccessText() {
        await expect(this.cancelSuccessText).toBeVisible();
        console.log('✅ 접수 취소 성공');
    }

    async cancelStatus() {
        await expect(this.checkCancelStatus).toBeVisible();
        console.log('✅ 접수 취소 상태 확인 성공');
    }

    /////
    // 접수 삭제
    /////

    async deleteReception() {
        await expect(this.selectChart).toBeVisible();
        await this.selectChart.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 차트 선택 성공');
        await expect(this.deleteReceptionButton).toBeVisible();
        await this.deleteReceptionButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 삭제 선택 성공');
        await expect(this.deleteMessage).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('✅ 접수 삭제 버튼 선택 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('✅ 접수 삭제 성공');
    }

    async checkDeleteSucess() {
        await expect(this.page.getByRole('cell', { name: this.selectedReceptionText })).not.toBeVisible(); 
        console.log('✅ 접수 삭제 상태 확인 성공');
    }

}

export { WalkInReception }