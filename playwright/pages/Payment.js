import { expect } from "playwright/test";

class Payment {
    constructor(page) {
        this.page = page;
        this.paymentChart = page.locator("li span", { hasText: /^수납/ }).nth(2);

        // 시/수술, 제품 등록
        this.registPaymentButton = page.getByRole('button', { name: '+ 수납등록' });
        this.searchButton = page.getByRole('button', { name: '검색' });
        this.addingButton = page.getByRole('tooltip').getByRole('button', { name: '추가', exact: true });
        this.closePopupButton = page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button');
        this.registPaymentTitle = page.getByText('수납 등록');
        this.editPaymentTitle = page.getByText('수납 수정');
        
        this.addingSurgeryButton = page.getByRole('button', { name: '+ 시/수술 추가' });
        this.addingProductionButton = page.getByRole('button', { name: '+ 제품 추가' });

        this.addingPopupTitle = page.getByRole('heading', { name: '수납항목 추가' });
        this.addingSurgeryTabTitle = page.getByRole('button', { name: '시/수술 추가', exact: true });
        this.addingProductionTabTitle = page.getByRole('button', { name: '제품 추가', exact: true });

        this.payMethodTitle = page.getByText('결제수단 입력');
        this.dayOfPaymentTitle = page.getByText('수납일');

        this.searchSurgeryCategory = page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' });
        this.searchSurgeryName = page.getByRole('combobox', { name: '시/수술명을 검색하세요' });
        this.searchProduction = page.getByRole('textbox', { name: '제품명을 입력하세요' });
        
        this.searchedSurgeryCategory = '';
        this.searchedSurgeryName = '';
        this.surgeryPrice = ''; // 금액
        this.surgeryVat = ''; // vat 제외

        this.productionName = ''; // 과세
        this.productionNameFree = ''; // 비과세

        this.productPrice = ''; // 과세
        this.productPriceVat = ''; 
        this.productFreePrice = ''; // 비과세
        this.productFreePriceVat = '';

        this.selectOptionValue = page.getByRole('option').nth(0);
        this.editOptionValue = page.getByRole('option').nth(1);

        // 담당자
        this.managerTitle = page.locator('label').filter({ hasText: '담당자' }); 
        this.managerType = page.getByRole('combobox', { name: '작성자를 선택하세요' });
        this.selectedManagerText = '';

        // 의사
        this.doctorTitle = page.locator('label').filter({ hasText: '의사' });
        this.doctorType = page.getByRole('combobox', { name: '의사를 선택하세요' });
        this.selectedDoctorText = '';

        // 상담사
        this.counselorTitle = page.locator('label').filter({ hasText: '상담사' });
        this.counselorType = page.getByRole('combobox', { name: '상담사를 선택하세요' });
        this.selectedCounselorText = '';

        // 내원경로
        this.visitRouteTitle = page.locator('label').filter({ hasText: '내원경로' });
        this.visitRouteType = page.getByRole('combobox', { name: '내원경로를 선택하세요' });
        this.selectedVisitRouteText = '';

         // 접수메모
         this.memoTitle = page.locator('label').filter({ hasText: '수납메모' });
         this.memoTemplate = page.getByText('자주 쓰는 상용구');
         this.memoEnter = page.locator('.ql-editor p'); // quill 에디터 라서 일부러 locator 이용
         // page.getByRole('paragraph').filter({ hasText: /^$/ });
         this.enteredMemoText = '';
        
         this.pendingButton = page.getByRole('button', { name: '수납대기로 저장' });
         this.pendingCategory = page.getByRole('button', { name: '수납대기' }).nth(1);
         
         this.pendingSuccessText = page.getByText('수납을 생성했습니다');
         this.editSuccessText = page.getByText('수납을 수정했습니다. 연결된 접수정보가 업데이트 됩니다.');

         this.pendingStatus = page.getByRole('cell', { name: '수납대기', exact: true });

         // 수납처리
         this.processPaymentButton = page.getByRole('button', { name: '수납처리' });

         // 과세
         this.notFreeTitle = page.getByRole('paragraph').filter({ hasText: /^과세$/ });
         // 비과세
         this.freeTitle = page.getByRole('paragraph').filter({ hasText: '비과세' });
         // 카드
         this.cardTitle = page.getByText('카드').nth(1);
         this.cardFullAmount = page.locator('.sc-eifrsQ').first();

         // 현금
         this.cashTitle = page.getByText('현금').nth(4);
         this.cashInput = page.getByRole('textbox', { name: 'CashPaymentField' }).nth(1);
         this.inputCashPrice = '750000';
         
         this.saveButton = page.getByRole('button', { name: '저장' });
         this.confirmButton = page.getByRole('button', { name: '확인' });
         this.editModalInforText = page.getByText('위 내용으로 결산/통계 내용이 업데이트 됩니다');

         this.noDataText = page.getByRole('cell', { name: '등록된 내용이 없습니다' });

         // 미수
         this.unpaidCategory = page.getByRole('button', { name: '미수' });
         this.unpaidStatus = page.getByRole('cell', { name: '미수', exact: true });

         // 수납취소
         this.cancelButton = page.getByRole('button', { name: '수납취소' }).nth(1);
         this.cancelInfoText = page.getByText('전체 수납(미수)취소 처리됩니다');
         this.cancelSuccessText = page.getByText('수납취소 처리되었습니다');

         this.cancelCategory = page.getByRole('button', { name: '수납취소' });

         this.cancelStatus = page.getByRole('cell', { name: '수납취소', exact: true });

         // 현금 영수증
         this.cashReceipt = page.getByText('현금영수증(계좌이체, 현금)').nth(1);

         // 완납
         this.payFullCategory = page.getByRole('button', { name: '완납' });
         this.payFullStatus = page.getByRole('cell', { name: '완납', exact: true });


    }

    async enterPaymentChart() {
        await expect(this.paymentChart).toBeVisible();
        await this.paymentChart.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log("수납 차트 진입 성공");
    }

    async registPayment() {
        await expect(this.registPaymentButton).toBeVisible();
        await this.registPaymentButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('수납 등록 진입 성공 확인');
        await expect(this.registPaymentTitle).toBeVisible();
    }  
    
    async addSurgery() {
        await expect(this.addingSurgeryButton).toBeVisible();
        await this.addingSurgeryButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 추가 팝업 진입 성공 확인');

        await expect(this.addingPopupTitle).toBeVisible();
        await expect(this.addingSurgeryTabTitle).toBeVisible();

        // 시/수술 카테고리 검색 > 선택
        await expect(this.searchSurgeryCategory).toBeVisible();
        await this.searchSurgeryCategory.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryCategory = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 카테고리 :', this.searchedSurgeryCategory);

        // 시/수술명 검색 > 선택

        await expect(this.searchSurgeryName).toBeVisible();
        await this.searchSurgeryName.click();
        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.selectOptionValue).toBeVisible();
        this.searchedSurgeryName = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술명: ', this.searchedSurgeryName);

        // 검색

        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 카테고리, 시/수술명 검색 성공 확인');

        // 값 전부 넣기
        this.surgeryPrice = await this.page.getByRole('row', { name: this.searchedSurgeryCategory }).getByRole('textbox').nth(1).inputValue();
        this.surgeryVat = await this.page.getByRole('row', { name: this.searchedSurgeryCategory }).getByRole('textbox').nth(2).inputValue();

        await expect(this.addingButton).toBeVisible();
        await this.addingButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('시/수술 카테고리 추가 성공 확인');
        console.log('시/수술 가격: ', this.surgeryPrice);
        console.log('시/수술 VAT제외 가격: ', this.surgeryVat);

        // 팝업 닫기
        await expect(this.closePopupButton).toBeVisible();
        await this.closePopupButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('시/수술 카테고리 추가 팝업 닫기 성공 확인');
    }

    async addProduction() {
        await expect(this.addingProductionButton).toBeVisible();
        await this.addingProductionButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('제품 추가 팝업 진입 성공 확인');

        await expect(this.addingPopupTitle).toBeVisible();
        await expect(this.addingProductionTabTitle).toBeVisible();
        // 검색 제품 입력
        await expect(this.searchProduction).toBeVisible();
        await this.searchProduction.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.searchProduction.fill('수납자동화 제품명');
        await this.page.waitForLoadState("domcontentloaded");

        // 검색
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded");

        console.log('제품 검색 성공 확인');
        
        this.productionName = await this.page.getByRole('cell', { name: '수납자동화 제품명 과세' }).innerText();
        this.productionNameFree = await this.page.getByRole('cell', { name: '수납자동화 제품명 비과세' }).innerText();
        ////////////
        this.productPrice = await this.page.getByRole('cell', { name: '50,000', exact: true }).getByRole('textbox').inputValue();
        this.productPriceVat = await this.page.getByRole('cell', { name: '45,455' }).getByRole('textbox').inputValue();
        this.productFreePrice = await this.page.getByRole('row', { name: new RegExp(`^추가 ${this.productionNameFree}`) }).getByRole('textbox').nth(1).inputValue();
        this.productFreePriceVat = await this.page.getByRole('row', { name: new RegExp(`^추가 ${this.productionNameFree}`) }).getByRole('textbox').nth(2).inputValue();
        // 검색 추가
        console.log('과세 제품 이름: ', this.productionName);
        console.log('비과세 제품 이름: ', this.productionNameFree);
        ///////////
        console.log('과세 제품 가격: ', this.productPrice);
        console.log('과세 제품 VAT제외 가격: ', this.productPriceVat);
        console.log('비과세 제품 가격: ', this.productFreePrice);
        console.log('비과세 제품 VAT제외 가격: ', this.productFreePriceVat);
        await expect(this.addingButton.nth(0)).toBeVisible();
        await this.addingButton.nth(0).click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('첫 번째 제품 추가 성공 확인');
        await expect(this.addingButton.nth(1)).toBeVisible();
        await this.addingButton.nth(1).click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('두 번째 제품 추가 성공 확인');
        /// 팝업 닫기
        await expect(this.closePopupButton).toBeVisible();
        await this.closePopupButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('시/수술 카테고리 추가 팝업 닫기 성공 확인');
    }

    async checkAddSurgery() {
        await expect(this.registPaymentTitle).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: `${this.surgeryPrice} ${this.surgeryVat}` })).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: this.surgeryPrice, exact: true })).toBeVisible();
        console.log('시/수술 카테고리 추가한 내용들 정상적으로 들어가있어요~~~');
    }

    async checkAddProduction() {
        await expect(this.registPaymentTitle).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionNameFree })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productPrice} ${this.productPriceVat}` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productFreePrice} ${this.productFreePriceVat}` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productPrice, exact: true })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productFreePrice, exact: true })).toBeVisible();
        console.log('제품 추가한 내용들도 정상적으로 들어가있어요~~~~~~');
    }

    async checkPayDayAndMethod() {
        await expect(this.payMethodTitle).toBeVisible();
        await expect(this.dayOfPaymentTitle).toBeVisible();
    }

    async selectManager() {
        await expect(this.managerTitle).toBeVisible();
        await expect(this.managerType).toBeVisible();
        await this.managerType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.selectOptionValue).toBeVisible();
        this.selectedManagerText = await this.selectOptionValue.innerText();
        await this.selectOptionValue.click();
        console.log('담당자: ', this.selectedManagerText);
        await this.page.waitForLoadState('domcontentloaded');
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

    async enterMemo() {
        await expect(this.memoTitle).toBeVisible();
        await expect(this.memoTemplate).toBeVisible();
        await expect(this.memoEnter).toBeVisible();
        await this.memoEnter.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.memoEnter.type('수납_메모_입력_자동화', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('접수메모: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectPending() {
        await expect(this.pendingButton).toBeVisible();
        await this.pendingButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('수납대기 저장 성공 확인');
    }

    async checkPendingSuccess() {
        await expect(this.pendingSuccessText).toBeVisible();
        console.log('수납대기 성공 스낵바 확인');
    }

    async checkPendingResult() {
        await expect(this.pendingStatus).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionNameFree })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.surgeryPrice} (${this.surgeryVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productPrice} (${this.productPriceVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productFreePrice} (${this.productFreePriceVat})` })).toBeVisible();
        
        const regex = new RegExp(`^${this.productPrice.trim()}`);
        await expect(this.page.getByRole('cell', { name: regex })).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: this.productPrice, exact: true })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productFreePrice})).toBeVisible();
        ///
        const surgery = Number(this.surgeryPrice.replace(/,/g, ''));
        const product = Number(this.productPrice.replace(/,/g, ''));
        const productFree = Number(this.productFreePrice.replace(/,/g, ''));

        const totalPrice = surgery + product + productFree;

        const formattedTotalPrice = totalPrice.toLocaleString();
        await expect(this.page.getByRole('cell', { name: formattedTotalPrice })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        const ifNameSame = this.page.getByRole('cell', { name: this.selectedCounselorText });
        const nameCount = await ifNameSame.count();

        let verified = false;

        if (nameCount > 1) {
            for (let i = 0; i < nameCount; i++) {
                const text = await ifNameSame.nth(i).innerText();
                if (text.trim() === this.selectedDoctorText.trim()) {
                    await expect(ifNameSame.nth(i)).toBeVisible();
                    verified = true;
                    break;
                }
            }
            if (!verified) {
                console.log(`망했습니다.`);
            } else {
                console.log(`이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
            }
        } else {
            await expect(this.page.getByRole('cell', { name: this.selectedCounselorText })).toBeVisible();
            await expect(this.page.getByRole('cell', { name: this.selectedManagerText })).toBeVisible();
            console.log('차트 들어간 값들 문제 없어요~~');
        }        
    }

    async selectPendingCategory() {
        await expect(this.pendingCategory).toBeVisible();
        await this.pendingCategory.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.pendingStatus).toBeVisible();
        console.log('수납대기 카테고리 진입 성공 확인');
    }
    
    async hoverOnMemo() {
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        await this.page.getByRole('cell', { name: this.enteredMemoText }).hover();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('메모에 마우스 오버 성공 확인');
    }

    async processPayment() {
        await expect(this.processPaymentButton).toBeVisible();
        await this.processPaymentButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editPaymentTitle).toBeVisible();
        console.log('수납 수정 진입 성공 확인');
    }

    async checkEditSurgery() {
        await expect(this.editPaymentTitle).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: this.searchedSurgeryCategory }).nth(1)).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: this.searchedSurgeryName }).nth(1)).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: `${this.surgeryPrice} ${this.surgeryVat}` })).toBeVisible();
        await expect(this.page.locator('#app').getByRole('cell', { name: this.surgeryPrice, exact: true })).toBeVisible();
        console.log('시/수술 카테고리 등록했던 내용들 정상적으로 들어가있어요~~~');
    }

    async checkEditProduction() {
        await expect(this.editPaymentTitle).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionName }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionNameFree }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productPrice} ${this.productPriceVat}` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productFreePrice} ${this.productFreePriceVat}` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productPrice, exact: true })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productFreePrice, exact: true })).toBeVisible();
        console.log('제품 등록했던 내용들도 정상적으로 들어가있어요~~~~~~');
    }

    async payWithCard() {
        await expect(this.payMethodTitle).toBeVisible();
        await expect(this.notFreeTitle).toBeVisible();
        await expect(this.cardTitle).toBeVisible();
        await expect(this.cardFullAmount).toBeVisible();
        await this.cardFullAmount.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('카드 전액 선택 확인 성공');
    }

    async editManager() {
        await expect(this.managerTitle).toBeVisible();
        await expect(this.managerType).toBeVisible();
        await this.managerType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedManagerText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('담당자: ', this.selectedManagerText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async editDoctor() {
        await expect(this.doctorTitle).toBeVisible();
        await expect(this.doctorType).toBeVisible();
        await this.doctorType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedDoctorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('의사: ', this.selectedDoctorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async editCounselor() {
        await expect(this.counselorTitle).toBeVisible();
        await expect(this.counselorType).toBeVisible();
        await this.counselorType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedCounselorText = await this.editOptionValue.innerText();
        await this.editOptionValue.click();
        console.log('상담사: ', this.selectedCounselorText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async editVisitRoute() {
        await expect(this.visitRouteTitle).toBeVisible();
        await expect(this.visitRouteType).toBeVisible();
        await this.visitRouteType.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.editOptionValue).toBeVisible();
        this.selectedVisitRouteText = await this.editOptionValue.innerText();
        await this.editOptionValue.click(); 
        console.log('내원경로: ', this.selectedVisitRouteText);
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
        await this.memoEnter.type('수납_메모_입력_자동화_수정', { delay: 50});
        await this.page.waitForLoadState('domcontentloaded');
        this.enteredMemoText = await this.memoEnter.innerText();
        console.log('접수메모: ', this.enteredMemoText);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('저장 버튼 선택 확인');
    }

    async editInfoModal() {
        await expect(this.editModalInforText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('수정 내용 저장 완료 확인');
    }

    async checkEditSuccess() {
        await expect(this.editSuccessText).toBeVisible();
        console.log('수정 완료 스낵바 확인');
    }

    async checkNoData() {
        await expect(this.noDataText).toBeVisible();
        console.log('내역 없음 확인');
    }

    async selectUnpaidCategory() {
        await expect(this.unpaidCategory).toBeVisible();
        await this.unpaidCategory.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('미수 카테고리 진입 성공 확인');
    }

    async checkUnpaidResult() {
        await expect(this.unpaidStatus).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionNameFree })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.surgeryPrice} (${this.surgeryVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productPrice} (${this.productPriceVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productFreePrice} (${this.productFreePriceVat})` })).toBeVisible();
        
        const regex = new RegExp(`^${this.productPrice.trim()}`);
        await expect(this.page.getByRole('cell', { name: regex }).nth(0)).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: '50,000' }).nth(0)).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productFreePrice})).toBeVisible();
        ///
        const surgery = Number(this.surgeryPrice.replace(/,/g, ''));
        const product = Number(this.productPrice.replace(/,/g, ''));
        const productFree = Number(this.productFreePrice.replace(/,/g, ''));

        const totalPrice = surgery + product + productFree;

        const formattedTotalPrice = totalPrice.toLocaleString();
        await expect(this.page.getByRole('cell', { name: formattedTotalPrice })).toBeVisible();

        await expect(this.page.getByRole('cell', { name: this.productPrice }).first()).toBeVisible(); // 매출액
        await expect(this.page.getByRole('cell', { name: this.productPrice }).nth(1)).toBeVisible(); // 수납액

        const unpaidPrice = totalPrice - product;
        const formattedUnpaidPrice = unpaidPrice.toLocaleString();
        await expect(this.page.getByRole('cell', { name: formattedUnpaidPrice })).toBeVisible(); // 미수액
        console.log('미수액: ', formattedUnpaidPrice);

        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        const ifNameSame = this.page.getByRole('cell', { name: this.selectedCounselorText });
        const ifManagerSame = this.page.getByRole('cell', { name: this.selectedManagerText });
        const nameCount = await ifNameSame.count();
        const managerCount = await ifManagerSame.count();

        let verified = false;
        let managerVerified = false;

        if (nameCount > 1) {
            for (let i = 0; i < nameCount; i++) {
                const text = await ifNameSame.nth(i).innerText();
                if (text.trim() === this.selectedDoctorText.trim()) {
                    await expect(ifNameSame.nth(i)).toBeVisible();
                    verified = true;
                    break;
                }
            }
            if (!verified) {
                console.log(`망했습니다.`);
            } else {
                console.log(`이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
            }
        } else if (managerCount > 1) {
            for (let j = 0; j < managerCount; j++) {
                const text2 = await ifManagerSame.nth(j).innerText();
                if (text2.trim() === this.selectedManagerText.trim()) {
                    await expect(ifManagerSame.nth(j)).toBeVisible();
                    managerVerified = true;
                    break;
                }
            }
            if (!managerVerified) {
                console.log('망했어요..');
            } else {
                console.log('이름 중복값 다 잘 들어갔어여~~');
            }
        } else {
            await expect(this.page.getByRole('cell', { name: this.selectedCounselorText })).toBeVisible();
            await expect(this.page.getByRole('cell', { name: this.selectedManagerText })).toBeVisible();
            console.log('차트 들어간 값들 문제 없어요~~');
        }        
    }

    async checkPaymentInfo() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await this.page.waitForLoadState('domcontentloaded');
    
        await expect(this.page.getByRole('cell', { name: formattedDate }).nth(2)).toBeVisible();
        console.log('수납일: ', formattedDate);
        await expect(this.page.getByRole('cell', { name: `+ ${this.productPrice}`, exact: true })).toBeVisible();
        console.log('결제 정보 영역 확인');
    }

    async cancelPayment() {
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('수납 취소 버튼 선택 확인');
    }

    async cancelPopup() {
        await expect(this.cancelInfoText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('수납 취소 성공 확인');
    }

    async checkCancelSuccess() {
        await expect(this.cancelSuccessText).toBeVisible();
        console.log('수납취소 성공 스낵바 확인');
    }

    async selectCancelCategory() {
        await expect(this.cancelCategory).toBeVisible();
        await this.cancelCategory.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('수납취소 카테고리 진입 성공 확인');
    }

    async checkCancelResult() {
        await expect(this.cancelStatus).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionNameFree })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.surgeryPrice} (${this.surgeryVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productPrice} (${this.productPriceVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productFreePrice} (${this.productFreePriceVat})` })).toBeVisible();
        
        const regex = new RegExp(`^${this.productPrice.trim()}`);
        await expect(this.page.getByRole('cell', { name: regex })).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: this.productPrice, exact: true })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productFreePrice})).toBeVisible();
        ///
        const surgery = Number(this.surgeryPrice.replace(/,/g, ''));
        const product = Number(this.productPrice.replace(/,/g, ''));
        const productFree = Number(this.productFreePrice.replace(/,/g, ''));

        const totalPrice = surgery + product + productFree;

        const formattedTotalPrice = totalPrice.toLocaleString();
        await expect(this.page.getByRole('cell', { name: formattedTotalPrice })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        const ifNameSame = this.page.getByRole('cell', { name: this.selectedCounselorText });
        const ifManagerSame = this.page.getByRole('cell', { name: this.selectedManagerText });
        const nameCount = await ifNameSame.count();
        const managerCount = await ifManagerSame.count();

        let verified = false;
        let managerVerified = false;

        if (nameCount > 1) {
            for (let i = 0; i < nameCount; i++) {
                const text = await ifNameSame.nth(i).innerText();
                if (text.trim() === this.selectedDoctorText.trim()) {
                    await expect(ifNameSame.nth(i)).toBeVisible();
                    verified = true;
                    break;
                }
            }
            if (!verified) {
                console.log(`망했습니다.`);
            } else {
                console.log(`이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
            }
        } else if (managerCount > 1) {
            for (let j = 0; j < managerCount; j++) {
                const text2 = await ifManagerSame.nth(j).innerText();
                if (text2.trim() === this.selectedManagerText.trim()) {
                    await expect(ifManagerSame.nth(j)).toBeVisible();
                    managerVerified = true;
                    break;
                }
            }
            if (!managerVerified) {
                console.log('망했어요..');
            } else {
                console.log('이름 중복값 다 잘 들어갔어여~~');
            }
        } else {
            await expect(this.page.getByRole('cell', { name: this.selectedCounselorText })).toBeVisible();
            await expect(this.page.getByRole('cell', { name: this.selectedManagerText })).toBeVisible();
            console.log('차트 들어간 값들 문제 없어요~~');
        }  
        
    }

    async payAll() {
        await expect(this.payMethodTitle).toBeVisible();
        await expect(this.notFreeTitle).toBeVisible();
        await expect(this.cardTitle).toBeVisible();
        await expect(this.cardFullAmount).toBeVisible();
        await this.cardFullAmount.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('카드 전액 선택 확인 성공');
        
        await expect(this.freeTitle).toBeVisible();
        await expect(this.cashTitle).toBeVisible();
        await expect(this.cashInput).toBeVisible();
        await this.cashInput.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.cashInput.type(this.inputCashPrice);
        await this.page.waitForLoadState('domcontentloaded');
        console.log('현금 입력 성공 확인');

        // 현금 영수증
        await expect(this.cashReceipt).toBeVisible();
        await this.cashReceipt.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('현금 영수증 선택 성공 확인');
    }

    async selectPayFullCategory() {
        await expect(this.payFullCategory).toBeVisible();
        await this.payFullCategory.click();
        await this.page.waitForLoadState('domcontentloaded');
        console.log('완납 카테고리 진입 성공 확인');
    }

    async checkPayFullInfo() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `-${mm}-${dd}`;
        await this.page.waitForLoadState('domcontentloaded');
    
        await expect(this.page.getByRole('cell', { name: formattedDate }).nth(2)).toBeVisible();
        console.log('수납일: ', formattedDate);
        await expect(this.page.getByRole('cell', { name: `+ ${this.productPrice}`, exact: true }).nth(0)).toBeVisible();
        console.log('결제 정보 영역 확인');
    }

    async checkPayFullResult() {
        await expect(this.payFullStatus).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryCategory })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.searchedSurgeryName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionName })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productionNameFree })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.surgeryPrice} (${this.surgeryVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productPrice} (${this.productPriceVat})` })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: `${this.productFreePrice} (${this.productFreePriceVat})` })).toBeVisible();
        
        const regex = new RegExp(`^${this.productPrice.trim()}`);
        await expect(this.page.getByRole('cell', { name: regex })).toBeVisible();
        // await expect(this.page.getByRole('cell', { name: this.productPrice, exact: true })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: this.productFreePrice})).toBeVisible();
        ///
        const surgery = Number(this.surgeryPrice.replace(/,/g, ''));
        const product = Number(this.productPrice.replace(/,/g, ''));
        const productFree = Number(this.productFreePrice.replace(/,/g, ''));

        const totalPrice = surgery + product + productFree;

        const formattedTotalPrice = totalPrice.toLocaleString();
        //
        const ifPriceSame = this.page.getByRole('cell', { name: formattedTotalPrice });
        const priceCount = await ifPriceSame.count();

        let verify = false;

        if (priceCount > 1) {
            for (let j = 0; j < priceCount; j++) {
                const temp = await ifPriceSame.nth(j).innerText();
                if (temp.trim() === formattedTotalPrice.trim()) {
                    await expect(ifPriceSame.nth(j)).toBeVisible();
                    verify = true;
                    break;
                }
            }
            if (!verify) {
                console.log('망헀어요...');
            } else {
                console.log('청구액이랑 나머지 중복 값들 다 잘 들어가있어요~~~');
            }
        } else {
            await expect(this.page.getByRole('cell', { name: formattedTotalPrice }).first()).toBeVisible();
            await expect(this.page.getByRole('cell', { name: formattedTotalPrice }).nth(1)).toBeVisible();
            await expect(this.page.getByRole('cell', { name: formattedTotalPrice }).nth(2)).toBeVisible();
        }

        await expect(this.page.getByRole('cell', { name: this.enteredMemoText })).toBeVisible();
        const ifNameSame = this.page.getByRole('cell', { name: this.selectedCounselorText });
        const nameCount = await ifNameSame.count();

        let verified = false;

        if (nameCount > 1) {
            for (let i = 0; i < nameCount; i++) {
                const text = await ifNameSame.nth(i).innerText();
                if (text.trim() === this.selectedDoctorText.trim()) {
                    await expect(ifNameSame.nth(i)).toBeVisible();
                    verified = true;
                    break;
                }
            }
            if (!verified) {
                console.log(`망했습니다.`);
            } else {
                console.log(`이름에 중복값이 있을 경우, 전부 다 잘 들어있어요~`);
            }
        } else {
            await expect(this.page.getByRole('cell', { name: this.selectedCounselorText })).toBeVisible();
            await expect(this.page.getByRole('cell', { name: this.selectedManagerText })).toBeVisible();
            console.log('차트 들어간 값들 문제 없어요~~');
        }        
    }



}

export { Payment };