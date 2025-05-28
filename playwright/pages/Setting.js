import { expect } from "playwright/test";

class Setting {
    constructor(page) {
        this.page = page;
        
        this.integratedChartTitle = page.getByText('통합차트');
        this.settingButton = page.locator('.settings-btn');

        this.settingTitle = page.getByRole('heading', { name: '통합차트 설정' });
        
        this.settingInfoText1 = page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다');
        this.settingInfoText2 = page.getByText('탭 순서와 보고싶은 탭만 지정할 수 있습니다');
        this.settingInfoText3 = page.getByText('핀 고정시 해당 메뉴가 기본으로 노출됩니다');

        this.registerDefaultTitle = page.getByText('등록화면 기본 노출');
        this.registerDefaultButton = this.page.locator('input.PrivateSwitchBase-input.MuiSwitch-input');

        this.reservationTitle = page.getByText(/등록$/).nth(2);
        this.processingTitle = page.getByText(/진행$/).nth(1);

        // 통합차트 닫기~
        this.closeIntegratedChart = page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3);
        this.confirmButton = page.getByRole('button', { name: '확인' });

        // 메뉴 모음

        this.reservation = page.locator("li span", { hasText: /^예약/ }).nth(3);
        this.reservationSetting = page.getByRole('checkbox', { name: '예약' });

        this.reception = page.locator("li span", { hasText: /^접수/ }).nth(1);
        this.receptionSetting = page.getByRole('checkbox', { name: '접수' });

        this.consultation = page.locator("li span", { hasText: /^상담/ }).nth(6);
        this.consultationSetting = page.getByRole('checkbox', { name: '상담' });

        this.treatment = page.locator("li span", { hasText: /^진료/ }).nth(1);
        this.treatmentSetting = page.getByRole('checkbox', { name: '진료' });

        this.surgery = page.locator("li span", { hasText: /^시\/수술/ }).nth(3);
        this.surgerySetting = page.getByRole('checkbox', { name: '시/수술' });

        this.surgicalNursing = page.locator("li span", { hasText: /^수술간호/ }).nth(1);
        this.surgicalNursingSetting = page.getByRole('checkbox', { name: '수술간호' });

        this.nursing = page.locator(".header-bar+div li span", { hasText: /^간호/ });
        this.nursingSetting = page.locator('[data-rbd-drag-handle-draggable-id="NURSE_CARE"] input[type="checkbox"]');

        this.skinCare = page.locator("li span", { hasText: /^피부관리/ });
        this.skinCareSetting = page.getByRole('checkbox', { name: '피부관리' });

        this.payment = page.locator("li span", { hasText: /^수납/ }).nth(2);
        this.paymentSetting = page.getByRole('checkbox', { name: '수납' });

        this.penchart = page.locator("li span", { hasText: /^펜차트/ }).nth(1);
        this.penchartSetting = page.getByRole('checkbox', { name: '펜차트' });

        this.message = page.locator("li span", { hasText: /^메시지/ }).nth(3);
        this.messageSetting = page.getByRole('checkbox', { name: '메시지' });

        this.phoneCall = page.locator("li span", { hasText: /^통화/ });
        this.phoneCallSetting = page.getByRole('checkbox', { name: '통화' });

        this.prescription = page.locator("li span", { hasText: /^처방전/ }).nth(4);
        this.prescriptionSetting = page.getByRole('checkbox', { name: '처방전' });

        this.historyTaking = page.locator("li span", { hasText: /^문진/ }).nth(2);
        this.historyTakingSetting = page.getByRole('checkbox', { name: '문진' });

        // 검색
        this.searchBox = page.getByRole('textbox', { name: '고객명, 전화번호' });
        this.searchButton = page.getByRole('button', { name: '조회', exact: true });

        this.nameCategory = page.getByRole('cell', { name: '고객명' });
        this.resultSearchName = page.getByRole('cell', { name: '자동화_신규고객' });

        // 통합차트 진입
        this.integratedChartTitle = page.getByText('통합차트');
        this.customerName = page.getByRole('cell', { name: '자동화_신규고객' });

        this.cannotUncheckText = page.getByText('핀 고정된 메뉴는 숨김 처리할 수 없습니다');

        // 전체선택
        this.selectAllButton = page.getByText('전체선택', { exact: true });

        // 창분할
        ///////
        this.seperateScreenButton = page.locator('.dual-mode-btn');
        this.singleScreenButton = page.locator('.single-mode-btn');
        this.seperateInfoText = page.getByText('보고싶은 메뉴를 선택하면 해당메뉴의 화면이 추가됩니다');
        this.addMenuButton = page.getByRole('button', { name: '+ 메뉴 추가하기' });

        // 접수 차트
        this.receptionChart = page.getByRole('menuitem', { name: '접수차트' });
        this.registerReception = page.getByRole('button', { name: '+ 접수등록' });
        this.receptionChange = page.locator('div').filter({ hasText: /^접수차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 상담 차트
        this.consultationChart = page.getByRole('menuitem', { name: '상담차트' });
        this.registerConsultation = page.getByRole('button', { name: '+ 상담등록' });
        this.consultationChange = page.locator('div').filter({ hasText: /^상담차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 진료 차트
        this.treatmentChart = page.getByRole('menuitem', { name: '진료차트' });
        this.registerTreatment = page.getByRole('button', { name: '+ 진료등록' });
        this.treatmentChange = page.locator('div').filter({ hasText: /^진료차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 시/수술 차트
        this.surgeryChart = page.getByRole('menuitem', { name: '시/수술차트' });
        this.registerSurgery = page.getByRole('button', { name: '+ 시/수술등록' });
        this.surgeryChange = page.locator('div').filter({ hasText: /수술차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 수술간호 차트
        this.surgicalNursingChart = page.getByRole('menuitem', { name: '수술간호차트' });
        this.registerSurgicalNursing = page.getByRole('button', { name: '+ 수술간호등록' });
        this.surgicalNursingChange = page.locator('div').filter({ hasText: /수술간호차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 간호 차트
        this.nursingChart = page.getByRole('menuitem', { name: '간호차트', exact: true });
        this.registerNursing = page.getByRole('button', { name: '+ 간호등록' });
        this.nursingChange = page.locator('div').filter({ hasText: /간호차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 피부관리 차트
        this.skinCareChart = page.getByRole('menuitem', { name: '피부관리차트' });
        this.registerSkinCare = page.getByRole('button', { name: '+ 피부관리등록' });
        this.skinCareChange = page.locator('div').filter({ hasText: /피부관리차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 수납차트
        this.paymentChart = page.getByRole('menuitem', { name: '수납차트' });
        this.registerPayment = page.getByRole('button', { name: '+ 수납등록' });
        this.paymentChange = page.locator('div').filter({ hasText: /수납차트(\s*\(\d+\))?$/ }).getByRole('img');

        // 펜차트
        this.penchartChart = page.getByRole('menuitem', { name: '펜차트' });
        this.penchartTitle = page.getByText('펜차트', { exact: true });
        this.penchartChange = page.locator('div').filter({ hasText: /펜차트(\s*\(\d+\))?$/ }).nth(0);
        // this.penchartChange = page.locator('div').filter({ hasText: /펜차트(\s*\(\d+\))?$/ }).locator('svg[width="8"][height="5"]').nth(0);
        

        // 메시지 전송 내역
        this.messageChart = page.getByRole('menuitem', { name: '메시지 전송 내역' });
        this.messageStatus = page.getByRole('cell', { name: '전송상태' });
        this.messageChange = page.locator('div').filter({ hasText: /메시지 전송 내역(\s*\(\d+\))?$/ }).getByRole('img');

        // 통화 내역
        this.phoneCallChart = page.getByRole('menuitem', { name: '통화 내역' });
        this.phoneCallMemo = page.getByRole('cell', { name: '통화메모' });
        this.phoneCallChange = page.locator('div').filter({ hasText: /통화 내역(\s*\(\d+\))?$/ }).getByRole('img');

        // 처방전
        this.prescriptionChart = page.getByRole('menuitem', { name: '처방전' });
        this.resigterPrescription = page.getByRole('button', { name: '처방전 작성' });
        this.prescriptionChange = page.locator('div').filter({ hasText: /처방전(\s*\(\d+\))?$/ }).getByRole('img').nth(2);

        // 문진
        this.historyTakingChart = page.getByRole('menuitem', { name: '문진' });
        this.registerHistoryTaking = page.getByRole('button', { name: '+ 문진등록' });
        this.historyTakingChange = page.locator('div').filter({ hasText: /문진(\s*\(\d+\))?$/ }).getByRole('img').nth(3);

    }

    async enterSetting() {
        await expect(this.integratedChartTitle).toBeVisible();
        await expect(this.settingButton).toBeVisible();
        await this.settingButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('통합차트 설정 진입 성공');
        await expect(this.settingTitle).toBeVisible();
    }

    async checkSettingInfoText() {
        await expect(this.settingInfoText1).toBeVisible();
        console.log('설정 안내 문구1 노출 확인 성공');
        await expect(this.settingInfoText2).toBeVisible();
        console.log('설정 안내 문구2 노출 확인 성공');
        await expect(this.settingInfoText3).toBeVisible();
        console.log('설정 안내 문구3 노출 확인 성공');
    }

    async registerDefaultON() {
        await expect(this.registerDefaultTitle).toBeVisible();
        await expect(this.registerDefaultButton).toBeVisible();
        await expect(this.registerDefaultButton).toBeChecked();
        console.log('등록화면 기본노출 토글 ON 상태~~');
    }

    async registerDefaultOFF() {
        await expect(this.registerDefaultTitle).toBeVisible();
        await expect(this.registerDefaultButton).toBeVisible();
        await expect(this.registerDefaultButton).not.toBeChecked();
        console.log('등록화면 기본노출 토글 ON 상태~~');
    }

    async isReservationVisible() {
        return await this.reservationTitle.isVisible().catch(() => false);
    }

    async isProcessingVisible() {
        return await this.processingTitle.isVisible().catch(() => false);
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
        console.log('고객명 검색 성공');
    }

    async enterInIntegratedChart() {
        await expect(this.customerName).toBeVisible();
        await this.customerName.dblclick();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.integratedChartTitle).toBeVisible();
        console.log('통합차트 진입 성공');
    }

    async registerDefault() {

        const isChecked = await this.registerDefaultButton.isChecked();
        // 등록화면 기본 노출 ON 상태 일 때,
        if (isChecked) {

            // 등록화면 기본 노출 off로 변경하는 거~
            await expect(this.registerDefaultButton).toBeVisible();
            await this.registerDefaultButton.click();
            await this.page.waitForTimeout(1000);
            await this.page.waitForLoadState("domcontentloaded");
            await expect(this.registerDefaultButton).not.toBeChecked();
            console.log('등록화면 기본노출 토글 ON 상태여서 OFF상태로 바꿨어요~~');

            await expect(this.confirmButton).toBeVisible();
            await this.confirmButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForTimeout(1000);

            await expect(this.integratedChartTitle).toBeVisible();
            await expect(this.closeIntegratedChart).toBeVisible();
            await this.closeIntegratedChart.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('통합차트 닫기 선택 후 메인 화면');
            await this.page.waitForTimeout(1000);

            await this.searchCustomerName();
            await this.enterInIntegratedChart();

            await this.page.waitForLoadState("domcontentloaded");

            await this.page.waitForTimeout(1000);

            await this.singleScreenButton.click();
            console.log('혹시 화면 분할이 선택되어 있을 수 있어서, 싱글모드 한 번 선택해여~~');

            expect(await this.isReservationVisible() || await this.isProcessingVisible()).toBe(false); // 등록 혹은 진행 화면 노출 안됨, OFF 해서
            console.log('각 차트별 등록 및 진행 화면 안나와여~~~');

            await this.enterSetting();
            await this.registerDefaultOFF();

            await expect(this.registerDefaultButton).toBeVisible();
            await this.registerDefaultButton.click();
            await this.page.waitForTimeout(1000);
            await this.page.waitForLoadState("domcontentloaded");
            await expect(this.registerDefaultButton).toBeChecked();
            console.log('등록화면 기본노출 토글 OFF 상태에서 ON상태로 바꿨어요~~');

            await expect(this.confirmButton).toBeVisible();
            await this.confirmButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForTimeout(1000);


            // 등록화면 기본 노출 OFF 상태 일 때,
        } else if (!isChecked) {

            await expect(this.registerDefaultButton).toBeVisible();
            await this.registerDefaultButton.click();
            await this.page.waitForTimeout(1000);
            await this.page.waitForLoadState("domcontentloaded");
            await expect(this.registerDefaultButton).toBeChecked();
            console.log('등록화면 기본노출 토글 OFF 상태여서 ON상태로 바꿨어요~~');

            await expect(this.confirmButton).toBeVisible();
            await this.confirmButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            await this.page.waitForTimeout(1000);

            await expect(this.integratedChartTitle).toBeVisible();
            await expect(this.closeIntegratedChart).toBeVisible();
            await this.closeIntegratedChart.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('통합차트 닫기 선택 후 메인 화면');
            await this.page.waitForTimeout(1000);

            await this.searchCustomerName();
            await this.enterInIntegratedChart();

            await this.page.waitForLoadState("domcontentloaded");

            await this.page.waitForTimeout(2000);
            console.log('등록 보임?', await this.isReservationVisible());
            console.log('진행 보임?', await this.isProcessingVisible());
            expect(await this.isReservationVisible() || await this.isProcessingVisible()).toBe(true); // 등록 혹은 진행 화면 노출 됨, ON 해서
            console.log('각 차트별 등록 및 진행 화면 나와여~~~');
        }
    }

    async uncheckHistoryTaking() {
        await expect(this.historyTakingSetting).toBeVisible();

        const historyTakingChecked = await this.historyTakingSetting.isChecked();

        if (historyTakingChecked) {
            await expect(this.historyTakingSetting).toBeVisible();
            await this.historyTakingSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('문진 체크 해제 했어여~');

        } else if (!historyTakingChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('문진 해제 되어 있어여~');

        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForTimeout(2000);
        await expect(this.historyTaking).not.toBeVisible();
        console.log('문진 해제되어서 안보여요~');
    }

    async uncheckPrescription() {
        await expect(this.prescriptionSetting).toBeVisible();

        const prescriptionChecked = await this.prescriptionSetting.isChecked();

        if (prescriptionChecked) {
            await expect(this.prescriptionSetting).toBeVisible();
            await this.prescriptionSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('처방전 체크 해제 했어여~');

        } else if (!prescriptionChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('처방전 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.prescription).not.toBeVisible();
        console.log('처방전 해제되어서 안보여요~');
    }

    async uncheckPhoneCall() {
        await expect(this.phoneCallSetting).toBeVisible();

        const phoneCallChecked = await this.phoneCallSetting.isChecked();

        if (phoneCallChecked) {
            await expect(this.phoneCallSetting).toBeVisible();
            await this.phoneCallSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('통화 체크 해제 했어여~');
        } else if (!phoneCallChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('통화 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.phoneCall).not.toBeVisible();
        console.log('통화 해제되어서 안보여요~');
    }

    async uncheckMessage() {
        await expect(this.messageSetting).toBeVisible();

        const messageChecked = await this.messageSetting.isChecked();

        if (messageChecked) {
            await expect(this.messageSetting).toBeVisible();
            await this.messageSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('메시지 체크 해제 했어여~');
        } else if (!messageChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('메시지 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.message).not.toBeVisible();
        console.log('메시지 해제되어서 안보여요~');
    }

    async uncheckPayment() {
        await expect(this.paymentSetting).toBeVisible();

        const paymentChecked = await this.paymentSetting.isChecked();

        if (paymentChecked) {
            await expect(this.paymentSetting).toBeVisible();
            await this.paymentSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('수납 체크 해제 했어여~');
        } else if (!paymentChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('수납 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.payment).not.toBeVisible();
        console.log('수납 해제되어서 안보여요~');
    }

    async uncheckPenchart() {
        await expect(this.penchartSetting).toBeVisible();

        const penchartChecked = await this.penchartSetting.isChecked();

        if (penchartChecked) {
            await expect(this.penchartSetting).toBeVisible();
            await this.penchartSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('펜차트 체크 해제 했어여~');
        } else if (!penchartChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('펜차트 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.penchart).not.toBeVisible();
        console.log('펜차트 해제되어서 안보여요~');
    }

    async uncheckSkinCare() {
        await expect(this.skinCareSetting).toBeVisible();

        const skinCareChecked = await this.skinCareSetting.isChecked();

        if (skinCareChecked) {
            await expect(this.skinCareSetting).toBeVisible();
            await this.skinCareSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('피부관리 체크 해제 했어여~');
        } else if (!skinCareChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('피부관리 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.skinCare).not.toBeVisible();
        console.log('피부관리 해제되어서 안보여요~');
    }

    async uncheckNursing() {
        await expect(this.nursingSetting).toBeVisible();

        const nursingChecked = await this.nursingSetting.isChecked();

        if (nursingChecked) {
            await expect(this.nursingSetting).toBeVisible();
            await this.nursingSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('간호 체크 해제 했어여~');
        } else if (!nursingChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('간호 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.nursing).not.toBeVisible();
        console.log('간호 해제되어서 안보여요~');
    }

    async uncheckSurgicalNursing() {
        await expect(this.surgicalNursingSetting).toBeVisible();

        const surgicalNursingChecked = await this.surgicalNursingSetting.isChecked();

        if (surgicalNursingChecked) {
            await expect(this.surgicalNursingSetting).toBeVisible();
            await this.surgicalNursingSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('수술간호 체크 해제 했어여~');
        } else if (!surgicalNursingChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('수술간호 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.surgicalNursing).not.toBeVisible();
        console.log('수술간호 해제되어서 안보여요~');
    }

    async uncheckSurgery() {
        await expect(this.surgerySetting).toBeVisible();

        const surgeryChecked = await this.surgerySetting.isChecked();

        if (surgeryChecked) {
            await expect(this.surgerySetting).toBeVisible();
            await this.surgerySetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('시/수술 체크 해제 했어여~');
        } else if (!surgeryChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('시/수술 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.surgery).not.toBeVisible();
        console.log('시/수술 해제되어서 안보여요~');
    }

    async uncheckTreatment() {
        await expect(this.treatmentSetting).toBeVisible();

        const treatmentChecked = await this.treatmentSetting.isChecked();

        if (treatmentChecked) {
            await expect(this.treatmentSetting).toBeVisible();
            await this.treatmentSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('진료 체크 해제 했어여~');
        } else if (!treatmentChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('진료 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.treatment).not.toBeVisible();
        console.log('진료 해제되어서 안보여요~');
    }

    async uncheckConsultation() {
        await expect(this.consultationSetting).toBeVisible();

        const consultationChecked = await this.consultationSetting.isChecked();

        if (consultationChecked) {
            await expect(this.consultationSetting).toBeVisible();
            await this.consultationSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('상담 체크 해제 했어여~');
        } else if (!consultationChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('상담 해제 되어 있어여~');
        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.consultation).not.toBeVisible();
        console.log('상담 해제되어서 안보여요~');
    }

    async uncheckReception() {
        await expect(this.receptionSetting).toBeVisible();

        const receptionChecked = await this.receptionSetting.isChecked();

        if (receptionChecked) {
            await expect(this.receptionSetting).toBeVisible();
            await this.receptionSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('접수 체크 해제 했어여~');

        } else if (!receptionChecked) {
            await expect(this.confirmButton).toBeVisible();
            console.log('접수 해제 되어 있어여~');

        }

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await this.page.waitForTimeout(2000);

        await expect(this.reception).not.toBeVisible();
        console.log('접수 해제되어서 안보여요~');
    }

    async cannotUncheckTextCheck() {
        await expect(this.cannotUncheckText).toBeVisible();
        console.log('핀 고정 메뉴는 숨김 처리 안됨 스낵바 확인 성공');
    }

    async uncheckReservation() {
        await expect(this.reservationSetting).toBeVisible();

        const reservationChecked = await this.reservationSetting.isChecked();

        if (reservationChecked) {
            await expect(this.reservationSetting).toBeVisible();
            await this.reservationSetting.click();
            await this.page.waitForLoadState("domcontentloaded");
            await this.cannotUncheckTextCheck();
            console.log('예약 체크해제 안돼여~');

            await this.page.waitForTimeout(2000);

            await expect(this.confirmButton).toBeVisible();
            await this.confirmButton.click();
            await this.page.waitForLoadState("domcontentloaded");

            await this.page.waitForTimeout(2000);

            await expect(this.reservation).toBeVisible();
            console.log('예약 삭제 안되고, 메뉴에 남아 있어여~~');

        } else if (!reservationChecked) {

            await expect(this.confirmButton).toBeVisible();
            console.log('예약 해제 되어 있어여~');

            await expect(this.confirmButton).toBeVisible();
            await this.confirmButton.click();
            await this.page.waitForLoadState("domcontentloaded");
            
            await this.page.waitForTimeout(2000);
            
            await expect(this.reservation).not.toBeVisible();
            console.log('예약 해제되어서 안보여요~');

        }

    }

    async selectAll() {
        await expect(this.selectAllButton).toBeVisible();
        await this.selectAllButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('전체선택 선택 성공');
        
        await this.receptionSetting.isChecked();
        await this.consultationSetting.isChecked();
        await this.treatmentSetting.isChecked();
        await this.surgerySetting.isChecked();
        await this.surgicalNursingSetting.isChecked();
        await this.nursingSetting.isChecked();
        await this.skinCareSetting.isChecked();
        await this.paymentSetting.isChecked();
        await this.penchartSetting.isChecked();
        await this.messageSetting.isChecked();
        await this.phoneCallSetting.isChecked();
        await this.prescriptionSetting.isChecked();
        await this.historyTakingSetting.isChecked();

        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        
        await this.page.waitForTimeout(2000);
        
        await expect(this.reception).toBeVisible();
        await expect(this.consultation).toBeVisible();
        await expect(this.treatment).toBeVisible();
        await expect(this.surgery).toBeVisible();
        await expect(this.surgicalNursing).toBeVisible();
        await expect(this.nursing).toBeVisible();
        await expect(this.skinCare).toBeVisible();
        await expect(this.payment).toBeVisible();
        await expect(this.penchart).toBeVisible();
        await expect(this.message).toBeVisible();
        await expect(this.phoneCall).toBeVisible();
        await expect(this.prescription).toBeVisible();
        await expect(this.historyTaking).toBeVisible();

        console.log('전체 메뉴 정상적으로 잘 보여요~');

    }

    async seperateScreen() {
        await expect(this.seperateScreenButton).toBeVisible();
        await this.seperateScreenButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('창 분할 버튼 선택 성공');
        
        await expect(this.seperateInfoText).toBeVisible();
        await expect(this.addMenuButton).toBeVisible();

        console.log('창 분할 성공');
    }
    
    async seperateScreenReception() {
        await expect(this.addMenuButton).toBeVisible();
        await this.addMenuButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('메뉴 추가하기 버튼 선택');

        await expect(this.receptionChart).toBeVisible();
        await this.receptionChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('접수차트 선택');

        await expect(this.registerReception).toBeVisible();
        console.log('접수 등록 확인 했어여~');
    }

    async seperateScreenConsultation() {
        await expect(this.receptionChange).toBeVisible();
        await this.receptionChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.consultationChart).toBeVisible();
        await this.consultationChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('상담차트 선택');

        await expect(this.registerConsultation).toBeVisible();
        console.log('상담 등록 확인 했어여~');

    }

    async seperateScreenTreatment() {
        await expect(this.consultationChange).toBeVisible();
        await this.consultationChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.treatmentChart).toBeVisible();
        await this.treatmentChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('진료차트 선택');

        await expect(this.registerTreatment).toBeVisible();
        console.log('진료 등록 확인 헀어여~~');
    }

    async seperateScreenSurgery() {
        await expect(this.treatmentChange).toBeVisible();
        await this.treatmentChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.surgeryChart).toBeVisible();
        await this.surgeryChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술차트 선택');

        await expect(this.registerSurgery).toBeVisible();
        console.log('시/수술 등록 확인 했어여~~');
    }

    async seperateScreenSurgicalNursing() {
        await expect(this.surgeryChange).toBeVisible();
        await this.surgeryChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.surgicalNursingChart).toBeVisible();
        await this.surgicalNursingChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('수술간호차트 선택');

        await expect(this.registerSurgicalNursing).toBeVisible();
        console.log('수술간호 등록 확인 했어여~~');
    }

    async seperateScreenNursing() {
        await expect(this.surgicalNursingChange).toBeVisible();
        await this.surgicalNursingChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.nursingChart).toBeVisible();
        await this.nursingChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('간호차트 선택');

        await expect(this.registerNursing).toBeVisible();
        console.log('간호 등록 확인 헀어여~~');

    }

    async seperateScreenSkinCare() {
        await expect(this.nursingChange).toBeVisible();
        await this.nursingChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.skinCareChart).toBeVisible();
        await this.skinCareChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('피부관리차트 선택');

        await expect(this.registerSkinCare).toBeVisible();
        console.log('피부관리 등록 확인 헀어여~~');
    }

    async seperateScreenPayment() {
        await expect(this.skinCareChange).toBeVisible();
        await this.skinCareChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.paymentChart).toBeVisible();
        await this.paymentChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('수납차트 선택');

        await expect(this.registerPayment).toBeVisible();
        console.log('수납 등록 확인 헀어여~~');
    }

    async seperateScreenMessage() {
        await expect(this.paymentChange).toBeVisible();
        await this.paymentChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.messageChart).toBeVisible();
        await this.messageChart.click();

        console.log('메시지 전송 내역 선택');

        await expect(this.messageStatus).toBeVisible();
        console.log('메시지 전송 내역 진입 후, 전송상태 영역 확인 했어여~~');
    }

    async seperateScreenPhoneCall() {
        await expect(this.messageChange).toBeVisible();
        await this.messageChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.prescriptionChart).toBeVisible();
        await this.prescriptionChart.click();

        console.log('처방전 선택');

        await expect(this.resigterPrescription).toBeVisible();
        console.log('처방전 작성 확인 했어여~~');
    }

    async seperateScreenHistoryTaking() {
        await expect(this.prescriptionChange).toBeVisible();
        await this.prescriptionChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.historyTakingChart).toBeVisible();
        await this.historyTakingChart.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('문진 선택');

        await expect(this.registerHistoryTaking).toBeVisible();
        console.log('문진 등록 확인 했어여~~');
    }

    async seperateScreenPenchart() {
        await expect(this.historyTakingChange).toBeVisible();
        await this.historyTakingChange.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('변경할 차트 리스트 노출 확인');

        await expect(this.penchartChart).toBeVisible();
        await this.penchartChart.click();

        console.log('펜차트 선택');

        await expect(this.penchartTitle).toBeVisible();
        console.log('펜차트 진입 후, 펜차트 제목 확인 했어여~~');
    }

    async singleScreen() {
        await expect(this.singleScreenButton).toBeVisible();
        await this.singleScreenButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.penchartTitle).not.toBeVisible();

        console.log('화면 분할에서 한 화면으로 바꿨어여~~~');
    }

} export { Setting };