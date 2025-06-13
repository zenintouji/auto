import { expect } from "playwright/test";

class ReservationSetting {
    constructor(page) {
        this.page = page;
        this.closeIntegratedChartButton = page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3);

        this.calendarMenu = page.getByRole('button', { name: 'icon-calendar 예약 캘린더' });
        this.calendarSettingButton = page.getByRole('button', { name: '예약판 설정' });

        this.visionMode = page.getByRole('button').filter({ hasText: /^$/ }).nth(1);
        
        this.setOnHeight = page.getByRole('button', { name: '세로 맞춤' });
        this.setOnWidth = page.getByRole('button', { name: '가로 맞춤' });

        this.widthBasicButton = page.getByRole('button', { name: '가로 1x' });
        this.widthDouble = page.getByRole('menuitem', { name: '가로 2x' });
        this.widthDoubleButton = page.getByRole('button', { name: '가로 2x' });
        this.widthTriple = page.getByRole('menuitem', { name: '가로 3x' });

        this.heightTripleButton = page.getByRole('button', { name: '세로 3x' });
        this.heightDouble = page.getByRole('menuitem', { name: '세로 2x' });
        this.heightDoubleButton = page.getByRole('button', { name: '세로 2x' });
        this.heightBasic = page.getByRole('menuitem', { name: '세로 1x' });
        

        this.saveButton = page.getByRole('button', { name: '저장' });

        this.saveSuccessText = page.getByText('저장되었습니다');

        // 예약판 설정 > 일/주 고객정보 ㄱㄱㄱㄱㄱㄱㄱㄱ
        this.selectAllButton = page.getByText('전체선택').first();
        this.surgeryButton = page.locator('span.MuiTypography-root:has-text("시/수술 카테고리 - 시/수술명")').nth(0);

        this.doctorButton = page.locator('span.MuiTypography-root:has-text("의사")').nth(1);
        this.counselorButton = page.locator('span.MuiTypography-root:has-text("상담사")').nth(1);
        this.reservationTypeButton = page.locator('span.MuiTypography-root:has-text("예약종류 (접수종류)")').nth(0);

        ////// 예약판 설정 > 월 고객정보 ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ
        this.selectAllButtonMonthly = page.getByText('전체선택').nth(1);
        this.surgeryButtonMonthly = page.locator('span.MuiTypography-root:has-text("시/수술 카테고리 - 시/수술명")').nth(1);

        this.doctorButtonMonthly = page.locator('span.MuiTypography-root:has-text("의사")').nth(2);
        this.counselorButtonMonthly = page.locator('span.MuiTypography-root:has-text("상담사")').nth(2);
        this.reservationTypeButtonMonthly = page.locator('span.MuiTypography-root:has-text("예약종류 (접수종류)")').nth(1);


        this.monthButton = page.getByRole('button', { name: '월', exact: true });
        /// 월 
        this.page.locator('.monthly-appointment-item', {
            hasText: '자동화_신규고객',
        });
    }

    async closeIntegratedChart() {
        await expect(this.closeIntegratedChartButton).toBeVisible();
        await this.closeIntegratedChartButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 통합차트 닫기 성공');
    }

    async enterReservationCalendar() {
        await expect(this.calendarMenu).toBeVisible();
        await this.calendarMenu.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 예약캘린더 진입 성공');
    }
    async checkReservationTileExist() {
        await this.verifyReservationTile('자동화_신규고객', '만 31세');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    // 예약 캘린더에 보이는지 확인하는 검증
    async verifyReservationTile(patientName, ageText) {
        const tiles = this.page.locator('.daily-appointment-occurrence-wrapper');
        const count = await tiles.count();

        if (count === 0) {
            console.log('🚫 예약 캘린더가 하나도 안 보입니다.');
            expect(false).toBe(true); // 강제 종료 ㄱㅇㅇㅇ
            return;
        }

        for (let i = 0; i < count; i++) {
            const tile = tiles.nth(i);
            const tileText = await tile.innerText();

            if (tileText.includes(patientName) && tileText.includes(ageText)) {
                console.log(`✅ 예약 생성 건 보여요: ${patientName} / ${ageText}`);
                await expect(tile).toBeVisible();
                return;
            }
        }

        console.log(`🚫 ${patientName} (${ageText}) 예약 건이 보이지 않네용.`);
        expect(false).toBe(true);
    }

    async enterCalendarSetting() {
        await expect(this.calendarSettingButton).toBeVisible();
        await this.calendarSettingButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 예약캘린더 설정 진입 성공');
    }

    async checkSaveSuccessText() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('✅ 저장 완료 스낵바 확인 성공');
    }

    async changeHeightToWidth() {
        const isHeightVisible = await this.setOnHeight.isVisible().catch(() => false);

        if (isHeightVisible) {
            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 가로모드 설정 후 저장 성공');

        } else {
            await expect(this.visionMode).toBeVisible();
            await this.visionMode.click();
            await this.page.waitForLoadState("domcontentloaded");

            await expect(this.setOnHeight).toBeVisible();
            console.log('🟢 가로모드 선택 성공');

            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 가로모드 설정 후 저장 성공');
        }
    }

    async compareHeightToWidthMode(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });

        const heightBefore = await tile.boundingBox().then(b => b?.height ?? 0);
        const widthBefore = await tile.boundingBox().then(b => b?.width ?? 0);
        console.log(`📏 세로모드 - 높이: ${heightBefore}, 가로: ${widthBefore}`);

        await this.enterCalendarSetting();
        await this.page.waitForTimeout(1000);
        await this.changeHeightToWidth();
        await this.page.waitForTimeout(1000);
        await this.checkSaveSuccessText();
        await this.page.waitForTimeout(2000);

        const heightAfter = await tile.boundingBox().then(b => b?.height ?? 0);
        const widthAfter = await tile.boundingBox().then(b => b?.width ?? 0);
        console.log(`📐 가로모드 - 높이: ${heightAfter}, 가로: ${widthAfter}`);

        if (heightAfter < heightBefore || widthAfter > widthBefore) {
            console.log(`✅ 가로모드 전환 성공! 타일 높이 ↓ 또는 너비 ↑`);
        } else {
            console.log(`🚫 가로모드 전환 안 된 것 같은데;;.`);
            expect(false).toBe(true);
        }
    }

    async checkHeightToWidthMode() {
        await this.compareHeightToWidthMode('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    ///////////////////////////
    // 가로 1x > 2x

    async changeWidthBasicToDouble() {
        await expect(this.widthBasicButton).toBeVisible();
        await this.widthBasicButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.widthDouble).toBeVisible();
        await this.widthDouble.click();
        console.log('🟢 가로 2x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 가로 2x 설정 후 저장 성공');
    }

    async compareWidthSize(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        
        const sizeBefore = parseInt(await tile.getAttribute('size') || 0); 
        console.log(`📏 변경 전 size: ${sizeBefore}`);

        await this.enterCalendarSetting();
        await this.changeWidthBasicToDouble();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const sizeAfter = parseInt(await tile.getAttribute('size') || 0);
        console.log(`📏 변경 후 size: ${sizeAfter}`);
        
        if (sizeAfter > sizeBefore) {
            console.log(`✅ 가로 2x 변경 성공! (size ${sizeBefore} → ${sizeAfter})`);
        } else {
            console.log(`🚫 size가 증가하지 않았습니다 (size ${sizeBefore} → ${sizeAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkWidthBasicToDouble() {
        await this.compareWidthSize('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    /////////////////////
    // 2 > 3x 

    ////////

    async changeWidthDoubleToTriple() {
        await expect(this.widthDoubleButton).toBeVisible();
        await this.widthDoubleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.widthTriple).toBeVisible();
        await this.widthTriple.click();
        console.log('🟢 가로 3x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 가로 3x 설정 후 저장 성공');
    }

    async compareWidthSizeToTriple(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        
        const sizeBefore = parseInt(await tile.getAttribute('size') || 0); 
        console.log(`📏 변경 전 size: ${sizeBefore}`);

        await this.enterCalendarSetting();
        await this.changeWidthDoubleToTriple();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const sizeAfter = parseInt(await tile.getAttribute('size') || 0);
        console.log(`📏 변경 후 size: ${sizeAfter}`);
        
        if (sizeAfter > sizeBefore) {
            console.log(`✅ 가로 3x 변경 성공! (size ${sizeBefore} → ${sizeAfter})`);
        } else {
            console.log(`🚫 size가 증가하지 않았어요~ (size ${sizeBefore} → ${sizeAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkWidthDoubleToTriple() {
        await this.compareWidthSizeToTriple('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    ///////////////////////////////
    // 가로모드 > 세로모드 ㄱㄱㄱㄱㄱㄱㄱ
    /////////////////

    async changeWidthToHeight() {
        const isWidthVisible = await this.setOnWidth.isVisible().catch(() => false);

        if (isWidthVisible) {
            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 세로모드 설정 후 저장 성공');

        } else {
            await expect(this.visionMode).toBeVisible();
            await this.visionMode.click();
            await this.page.waitForLoadState("domcontentloaded");

            await expect(this.setOnWidth).toBeVisible();
            console.log('🟢 세로모드 선택 성공');

            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 세로모드 설정 후 저장 성공');
        }
    }
    ////// 세로
    /////////// 3x > 2x
    async changeHeightTripleToDouble() {
        await expect(this.heightTripleButton).toBeVisible();
        await this.heightTripleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.heightDouble).toBeVisible();
        await this.heightDouble.click();
        console.log('🟢 세로 2x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 세로 2x 설정 후 저장 성공');
    }

    async compareHeightTripleToDouble(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        
        const sizeBefore = parseInt(await tile.getAttribute('size') || 0); 
        console.log(`📏 변경 전 size: ${sizeBefore}`);

        await this.enterCalendarSetting();
        await this.changeHeightTripleToDouble();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const sizeAfter = parseInt(await tile.getAttribute('size') || 0);
        console.log(`📏 변경 후 size: ${sizeAfter}`);
        
        if (sizeAfter < sizeBefore) {
            console.log(`✅ 세로 2x 변경 성공! (size ${sizeBefore} → ${sizeAfter})`);
        } else {
            console.log(`🚫 size가 감소하지 않았어요~ (size ${sizeBefore} → ${sizeAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkHeightTripleToDouble() {
        await this.compareHeightTripleToDouble('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    ////// 세로
    /////////// 2x > 1x
    async changeHeightDoubleToBasic() {
        await expect(this.heightDoubleButton).toBeVisible();
        await this.heightDoubleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.heightBasic).toBeVisible();
        await this.heightBasic.click();
        console.log('🟢 세로 1x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 세로 1x 설정 후 저장 성공');
    }

    async compareHeightDoubleToBasic(patientName) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });
        
        const sizeBefore = parseInt(await tile.getAttribute('size') || 0); 
        console.log(`📏 변경 전 size: ${sizeBefore}`);

        await this.enterCalendarSetting();
        await this.changeHeightDoubleToBasic();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const sizeAfter = parseInt(await tile.getAttribute('size') || 0);
        console.log(`📏 변경 후 size: ${sizeAfter}`);
        
        if (sizeAfter < sizeBefore) {
            console.log(`✅ 세로 1x 변경 성공! (size ${sizeBefore} → ${sizeAfter})`);
        } else {
            console.log(`🚫 size가 감소하지 않았어요~ (size ${sizeBefore} → ${sizeAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkHeightDoubleToBasic() {
        await this.compareHeightDoubleToBasic('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    //
    async selectAll() {
        await expect(this.selectAllButton).toBeVisible();
        await this.selectAllButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 전체선택 체크박스 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 전체선택 후 저장 성공');
    }

    async verifyAdditionalAppointmentInfo(patientName, expectedText) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.selectAll();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkSelectAll(reservation) {
        const doctor = reservation.selectedDoctorText;
        const counselor = reservation.selectedCounselorText;
        const reservationType = reservation.selectedReservationText;
        const surgerycatetory = reservation.selectedSurgicalCategoryText;
        const surgery = reservation.selectedSurgeryText;

        const expectedText = `${surgerycatetory} - ${surgery}\n${doctor} | ${counselor} | ${reservationType}`;

        await this.verifyAdditionalAppointmentInfo('자동화_신규고객', expectedText);
        console.log('✅ 전체선택 적용 성공');
    }

    ////////////////////////
    // 시/수술 부분 해제
    async uncheckSurgery() {
        await expect(this.surgeryButton).toBeVisible();
        await this.surgeryButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 시/수술 카테고리 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 카테고리 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptSurgery(patientName, expectedText) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckSurgery();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedSurgery(reservation) {
        const doctor = reservation.selectedDoctorText;
        const counselor = reservation.selectedCounselorText;
        const reservationType = reservation.selectedReservationText;

        const expectedText = `${doctor} | ${counselor} | ${reservationType}`;

        await this.verifyInfoExceptSurgery('자동화_신규고객', expectedText);
        console.log('✅ 시/수술 체크 해제 적용 성공');
    }



    ////////////////////////
    // 의사 부분 해제
    async uncheckDoctor() {
        await expect(this.doctorButton).toBeVisible();
        await this.doctorButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 의사 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 의사 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptDoctor(patientName, expectedText) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckDoctor();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedDoctor(reservation) {
        const counselor = reservation.selectedCounselorText;
        const reservationType = reservation.selectedReservationText;

        const expectedText = `${counselor} | ${reservationType}`;

        await this.verifyInfoExceptDoctor('자동화_신규고객', expectedText);
        console.log('✅ 의사 체크 해제 적용 성공');
    }


    ////////////////////////
    // 상담사 부분 해제
    async uncheckCounselor() {
        await expect(this.counselorButton).toBeVisible();
        await this.counselorButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 상담사 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 상담사 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptCounselor(patientName, expectedText) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckCounselor();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedCounselor(reservation) {
        const reservationType = reservation.selectedReservationText;

        const expectedText = `${reservationType}`;

        await this.verifyInfoExceptCounselor('자동화_신규고객', expectedText);
        console.log('✅ 상담사 체크 해제 적용 성공');
    }


    ////////////////////////
    // 예약종류 부분 해제
    async uncheckReservationType() {
        await expect(this.reservationTypeButton).toBeVisible();
        await this.reservationTypeButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 예약종류 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 예약종류 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptReservationType(patientName, expectedText) {
        const tile = this.page.locator('.daily-appointment-occurrence-wrapper', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckReservationType();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedReservationType(reservation) {
        const expectedText = ``;

        await this.verifyInfoExceptReservationType('자동화_신규고객', expectedText);
        console.log('✅ 예약종류 체크 해제 적용 성공');
    }




    //////
    //////
    //////
    async changeMonthlyHeightToWidth() {
        const isHeightVisible = await this.setOnHeight.isVisible().catch(() => false);

        if (isHeightVisible) {
            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 가로모드 설정 후 저장 성공');

        } else {
            await expect(this.visionMode).toBeVisible();
            await this.visionMode.click();
            await this.page.waitForLoadState("domcontentloaded");

            await expect(this.setOnHeight).toBeVisible();
            console.log('🟢 가로모드 선택 성공');

            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 가로모드 설정 후 저장 성공');
        }
    }

    async selectMonthCalender() {
        await expect(this.monthButton).toBeVisible();
        await this.monthButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🗓️ 예약 캘린더 > 월 선택 성공');
    }

    async compareMonthlyHeightToWidthMode(patientName) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });

        const heightBefore = await tile.boundingBox().then(b => b?.height ?? 0);
        const widthBefore = await tile.boundingBox().then(b => b?.width ?? 0);
        console.log(`📏 세로모드 - 높이: ${heightBefore}, 가로: ${widthBefore}`);

        await this.enterCalendarSetting();
        await this.page.waitForTimeout(1000);
        await this.changeMonthlyHeightToWidth();
        await this.page.waitForTimeout(1000);
        await this.checkSaveSuccessText();
        await this.page.waitForTimeout(2000);

        const heightAfter = await tile.boundingBox().then(b => b?.height ?? 0);
        const widthAfter = await tile.boundingBox().then(b => b?.width ?? 0);
        console.log(`📐 가로모드 - 높이: ${heightAfter}, 가로: ${widthAfter}`);

        if (heightAfter < heightBefore || widthAfter > widthBefore) {
            console.log(`✅ 가로모드 전환 성공! 타일 높이 ↓ 또는 너비 ↑`);
        } else {
            console.log(`🚫 가로모드 전환 안 된 것 같은데;;.`);
            expect(false).toBe(true);
        }
    }

    async checkMonthlyHeightToWidthMode() {
        await this.compareMonthlyHeightToWidthMode('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    /// 가로 1x > 가로 2x
    ////////

    async changeMonthlyWidthBasicToDouble() {
        await expect(this.widthBasicButton).toBeVisible();
        await this.widthBasicButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.widthDouble).toBeVisible();
        await this.widthDouble.click();
        console.log('🟢 가로 2x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 가로 2x 설정 후 저장 성공');
    }

    async compareMonthlyWidthSize(patientName) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });
        
        const boxBefore = await tile.boundingBox();
        const widthBefore = boxBefore?.width ?? 0;
        console.log(`📏 변경 전 width: ${widthBefore}`);

        await this.enterCalendarSetting();
        await this.changeMonthlyWidthBasicToDouble();
        await this.checkSaveSuccessText();
        await this.page.waitForTimeout(2000);

        const boxAfter = await tile.boundingBox();
        const widthAfter = boxAfter.width ?? 0;
        console.log(`📏 변경 후 width: ${widthAfter}`);
        
        if (widthAfter > widthBefore) {
            console.log(`✅ 가로 2x 변경 성공! (size ${widthBefore} → ${widthAfter})`);
        } else {
            console.log(`🚫 width가 증가하지 않았습니다 (size ${widthBefore} → ${widthAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkMonthlyWidthBasicToDouble() {
        await this.compareMonthlyWidthSize('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    /// 2x > 3x
    ///////////

    async changeMonthlyWidthDoubleToTriple() {
        await expect(this.widthDoubleButton).toBeVisible();
        await this.widthDoubleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.widthTriple).toBeVisible();
        await this.widthTriple.click();
        console.log('🟢 가로 3x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 가로 3x 설정 후 저장 성공');
    }

    async compareMonthlyWidthSizeToTriple(patientName) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });
        
        const boxBefore = await tile.boundingBox();
        const widthBefore = boxBefore?.width ?? 0;
        console.log(`📏 변경 전 width: ${widthBefore}`);

        await this.enterCalendarSetting();
        await this.changeMonthlyWidthDoubleToTriple();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const boxAfter = await tile.boundingBox();
        const widthAfter = boxAfter?.width ?? 0;
        console.log(`📏 변경 후 width: ${widthAfter}`);
        
        if (widthAfter > widthBefore) {
            console.log(`✅ 가로 3x 변경 성공! (size ${widthBefore} → ${widthAfter})`);
        } else {
            console.log(`🚫 width가 증가하지 않았어요~ (size ${widthBefore} → ${widthAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkMonthlyWidthDoubleToTriple() {
        await this.compareMonthlyWidthSizeToTriple('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    // 가로 > 세로 ㄱㄱㄱㄱㄱㄱㄱ
    ///////////////////////
    async changeMonthlyWidthToHeight() {
        const isWidthVisible = await this.setOnWidth.isVisible().catch(() => false);

        if (isWidthVisible) {
            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 세로모드 설정 후 저장 성공');

        } else {
            await expect(this.visionMode).toBeVisible();
            await this.visionMode.click();
            await this.page.waitForLoadState("domcontentloaded");

            await expect(this.setOnWidth).toBeVisible();
            console.log('🟢 세로모드 선택 성공');

            await expect(this.saveButton).toBeVisible();
            await this.saveButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            console.log('✅ 세로모드 설정 후 저장 성공');
        }
    }


    ////////// 
    /// 세로 3x > 2x 
    ////////
    async changeMonthlyHeightTripleToDouble() {
        await expect(this.heightTripleButton).toBeVisible();
        await this.heightTripleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.heightDouble).toBeVisible();
        await this.heightDouble.click();
        console.log('🟢 세로 2x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 세로 2x 설정 후 저장 성공');
    }

    async compareMonthlyHeightTripleToDouble(patientName) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });
        
        const boxBefore = await tile.boundingBox();
        const heightBefore = boxBefore?.height ?? 0;
        console.log(`📏 변경 전 height: ${heightBefore}`);

        await this.enterCalendarSetting();
        await this.changeMonthlyHeightTripleToDouble();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const boxAfter = await tile.boundingBox();
        const heightAfter = boxAfter?.height ?? 0;
        console.log(`📏 변경 후 height: ${heightAfter}`);
        
        if (heightAfter < heightBefore) {
            console.log(`✅ 세로 2x 변경 성공! (size ${heightBefore} → ${heightAfter})`);
        } else {
            console.log(`🚫 height가 감소하지 않았어요~ (size ${heightBefore} → ${heightAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkMonthlyHeightTripleToDouble() {
        await this.compareMonthlyHeightTripleToDouble('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    /// 세로 //////
    /////////
    /// 2x > 1x
    async changeMonthlyHeightDoubleToBasic() {
        await expect(this.heightDoubleButton).toBeVisible();
        await this.heightDoubleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await expect(this.heightBasic).toBeVisible();
        await this.heightBasic.click();
        console.log('🟢 세로 1x 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 세로 1x 설정 후 저장 성공');
    }

    async compareMonthlyHeightDoubleToBasic(patientName) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });
        
        const boxBefore = await tile.boundingBox();
        const heightBefore = boxBefore?.height ?? 0;
        console.log(`📏 변경 전 height: ${heightBefore}`);

        await this.enterCalendarSetting();
        await this.changeMonthlyHeightDoubleToBasic();
        await this.checkSaveSuccessText();

        await this.page.waitForTimeout(2000);

        const boxAfter = await tile.boundingBox();
        const heightAfter = boxAfter?.height ?? 0;
        console.log(`📏 변경 후 height: ${heightAfter}`);
        
        if (heightAfter < heightBefore) {
            console.log(`✅ 세로 1x 변경 성공! (size ${heightBefore} → ${heightAfter})`);
        } else {
            console.log(`🚫 height가 감소하지 않았어요~ (size ${heightBefore} → ${heightAfter})`);
            expect(false).toBe(true);
        }
    }

    async checkMonthlyHeightDoubleToBasic() {
        await this.compareMonthlyHeightDoubleToBasic('자동화_신규고객');
        console.log('✅ 예약캘린더에 예약 건 보여요~');
    }

    /////////
    ///
    ///
    ///
    async selectAllMonthly() {
        await expect(this.selectAllButtonMonthly).toBeVisible();
        await this.selectAllButtonMonthly.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 전체선택 체크박스 선택 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 전체선택 후 저장 성공');
    }

    async verifyAdditionalAppointmentInfoMonthly(patientName, expectedText) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.selectAllMonthly();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkSelectAllMonthly(reservation) {
        const doctor = reservation.selectedDoctorText;
        const counselor = reservation.selectedCounselorText;
        const reservationType = reservation.selectedReservationText;
        const surgerycatetory = reservation.selectedSurgicalCategoryText;
        const surgery = reservation.selectedSurgeryText;

        const expectedText = `${surgerycatetory} - ${surgery}\n${doctor} | ${counselor} | ${reservationType}`;

        await this.verifyAdditionalAppointmentInfoMonthly('자동화_신규고객', expectedText);
        console.log('✅ 전체선택 적용 성공');
    }

    ////////////////////////
    // 시/수술 부분 해제
    async uncheckSurgeryMonthly() {
        await expect(this.surgeryButtonMonthly).toBeVisible();
        await this.surgeryButtonMonthly.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 시/수술 카테고리 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 시/수술 카테고리 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptSurgeryMonthly(patientName, expectedText) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckSurgeryMonthly();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedSurgeryMonthly(reservation) {
        const doctor = reservation.selectedDoctorText;
        const counselor = reservation.selectedCounselorText;
        const reservationType = reservation.selectedReservationText;

        const expectedText = `${doctor} | ${counselor} | ${reservationType}`;

        await this.verifyInfoExceptSurgeryMonthly('자동화_신규고객', expectedText);
        console.log('✅ 시/수술 체크 해제 적용 성공');
    }



    ////////////////////////
    // 의사 부분 해제
    async uncheckDoctorMonthly() {
        await expect(this.doctorButtonMonthly).toBeVisible();
        await this.doctorButtonMonthly.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 의사 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 의사 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptDoctorMonthly(patientName, expectedText) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckDoctorMonthly();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedDoctorMonthly(reservation) {
        const counselor = reservation.selectedCounselorText;
        const reservationType = reservation.selectedReservationText;

        const expectedText = `${counselor} | ${reservationType}`;

        await this.verifyInfoExceptDoctorMonthly('자동화_신규고객', expectedText);
        console.log('✅ 의사 체크 해제 적용 성공');
    }


    ////////////////////////
    // 상담사 부분 해제
    async uncheckCounselorMonthly() {
        await expect(this.counselorButtonMonthly).toBeVisible();
        await this.counselorButtonMonthly.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 상담사 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 상담사 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptCounselorMonthly(patientName, expectedText) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckCounselorMonthly();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedCounselorMonthly(reservation) {
        const reservationType = reservation.selectedReservationText;

        const expectedText = `${reservationType}`;

        await this.verifyInfoExceptCounselorMonthly('자동화_신규고객', expectedText);
        console.log('✅ 상담사 체크 해제 적용 성공');
    }


    ////////////////////////
    // 예약종류 부분 해제
    async uncheckReservationTypeMonthly() {
        await expect(this.reservationTypeButtonMonthly).toBeVisible();
        await this.reservationTypeButtonMonthly.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('🟢 예약종류 체크 해제 성공');

        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('✅ 예약종류 체크 해제 후 저장 성공');
    }

    async verifyInfoExceptReservationTypeMonthly(patientName, expectedText) {
        const tile = this.page.locator('.monthly-appointment-item', {
            hasText: patientName,
        });

        await this.enterCalendarSetting();
        await this.uncheckReservationTypeMonthly();
        await this.checkSaveSuccessText();
        
        await this.page.waitForTimeout(2000);
        
        const tileText = await tile.innerText();
        if (tileText.includes(expectedText)) {
            console.log(`✅ 예약 항목에 추가 정보 [${expectedText}] 포함되어 있음!`);
        } else {
            console.log(`🚫 예약 항목에 [${expectedText}] 없음`);
            expect(false).toBe(true);
        }
    }

    async checkUncheckedReservationTypeMonthly(reservation) {
        const expectedText = ``;

        await this.verifyInfoExceptReservationTypeMonthly('자동화_신규고객', expectedText);
        console.log('✅ 예약종류 체크 해제 적용 성공');
    }


} export { ReservationSetting };