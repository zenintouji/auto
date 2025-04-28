import { expect } from "playwright/test";

class Penchart {
    constructor(page) {
        this.page = page;
        this.penChart = page.locator("li span", { hasText: /^펜차트/ }).nth(1);
        this.penchartTitle = page.getByText('펜차트', { exact: true });
        this.penchartSubTitle = page.getByRole('button', { name: '전체', exact: true });

        // 새 폴더
        this.newFolderButton = page.getByRole('button', { name: '새 폴더' });
        this.newFolderModalText = page.getByRole('heading', { name: '새 폴더' });
        this.inputNewFolderName = page.getByRole('textbox', { name: '폴더명을 입력하세요' });
        this.enteredFolderNameText = '';

        this.saveButton = page.getByRole('button', { name: '저장' });
        this.deleteModalButton = page.getByRole('menuitem', { name: '삭제' });
        this.deleteButton = page.getByRole('button', { name: '삭제' }); 
        this.loadButton = page.getByRole('button', { name: '불러오기' });

        this.createSuccessText = page.getByText('폴더를 생성하였습니다');
        this.changeSuccessText = page.getByText('수정되었습니다');
        this.deleteSuccessText = page.getByText('개의 항목이 삭제되었습니다.');
        this.loadSuccessText = page.getByText('차트를 불러왔습니다');

        // 만든 폴더 항목
        this.createdFolder = '';
        page.locator('div').filter({ hasText: '새_폴더_자동화' });
        this.addToImportantButton = page.getByRole('menuitem', { name: '중요차트함에 추가' });
        this.unmarkFromImportantButton = page.getByRole('menuitem', { name: '중요차트함에서 제거' });

        // 중요 차트함
        this.importantChart = page.getByRole('menuitem', { name: '중요차트함' });
        this.allChart = page.locator('div').filter({ hasText: /^전체$/ }).nth(1);

        // 폴더 이름 변경
        this.changeName = page.getByRole('menuitem', { name: '이름변경' });

        this.changeNameModalHeader = page.getByText('이름 변경');
        this.inputChangeNameField = page.getByRole('textbox', { name: '변경할 이름을 입력하세요' });

        // 차트 없음
        this.nothingInFolderText = page.getByText('등록된 차트가 없습니다');

        // 차트 삭제 모달
        this.deleteModalText = page.getByText('선택한 1개의 항목을 정말로 삭제하시겠습니까?삭제 시 복원이 불가능하며, 펜차트 앱에서도 삭제됩니다');

        // 펜차트 샘플함
        this.penchartSampleButton = page.getByRole('button', { name: 'icon-image 펜차트 샘플함' });
        this.penchartSampleHeader = page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함');

    }

    async enterPenchart() {
        await expect(this.penChart).toBeVisible();
        await this.penChart.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('펜차트 진입 성공');
    }

    async checkEnteredPenchart() {
        await expect(this.penchartTitle).toBeVisible();
        await expect(this.penchartSubTitle).toBeVisible();
        console.log('펜차트 진입 체크 확인 성공');
    }

    async enteredNewFolder() {
        await expect(this.newFolderButton).toBeVisible();
        await this.newFolderButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.newFolderModalText).toBeVisible();
        console.log('새 폴더 모달 진입 확인 성공');
    }

    async createNewFolder() {
        await expect(this.newFolderModalText).toBeVisible();
        await expect(this.inputNewFolderName).toBeVisible();
        await this.inputNewFolderName.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputNewFolderName.type('새_폴더_자동화', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.enteredFolderNameText = await this.inputNewFolderName.inputValue();
        console.log('새 폴더 이름: ', this.enteredFolderNameText);
        this.createdFolder = this.page.getByLabel(this.enteredFolderNameText).locator('div').filter({ hasText: this.enteredFolderNameText });
        console.log('createdFolder: ', this.createdFolder);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async selectSaveButton() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('저장 버튼 선택 성공');
    }

    async checkCreateSuccessText() {
        await expect(this.createSuccessText).toBeVisible();
        console.log('폴더 생성 스낵바 확인 성공');
    }

    async addToImportantCharts() {
        await expect(this.createdFolder).toBeVisible();
        console.log('createdfolder: ', this.createdFolder);
        await this.createdFolder.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.addToImportantButton).toBeVisible();
        await this.addToImportantButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('중요 차트함에 추가 성공');
    }

    async moveToImportantChart() {
        await expect(this.importantChart).toBeVisible();
        await this.importantChart.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('중요 차트함 진입 성공');
    }

    async checkMovedFolder() {
        await expect(this.createdFolder).toBeVisible();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('폴더 이동 성공 확인');
    }

    async moveToAllChart() {
        await expect(this.allChart).toBeVisible();
        await this.allChart.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('전체 차트함 진입 성공');
    }

    async checkChangeNameModal() {
        await expect(this.createdFolder).toBeVisible();
        await this.createdFolder.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.changeName).toBeVisible();
        await this.changeName.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('이름변경 선택 성공');
    }

    async changeFolderName() {
        await expect(this.changeNameModalHeader).toBeVisible();
        await expect(this.inputChangeNameField).toBeVisible();
        await this.inputChangeNameField.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputChangeNameField.fill(''); // 입력값 초기화
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.inputChangeNameField).toBeVisible();
        await this.inputChangeNameField.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.inputChangeNameField.type('새_폴더_자동화_이름_변경', { delay: 50 });
        await this.page.waitForLoadState("domcontentloaded");
        this.enteredFolderNameText = await this.inputChangeNameField.innerText();
        console.log('수정 폴더 이름: ', this.enteredFolderNameText);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async checkChangeSuccessText() {
        await expect(this.changeSuccessText).toBeVisible();
        console.log('변경 완료 스낵바 노출 확인 성공');
    }

    async unmarkImportant() {
        await expect(this.createdFolder).toBeVisible();
        await this.createdFolder.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.unmarkFromImportantButton).toBeVisible();
        await this.unmarkFromImportantButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('중요 차트함에서 제거 성공');
    }

    async checkNothingInFolder() {
        await expect(this.nothingInFolderText).toBeVisible();
        console.log('폴더에 차트 없음 확인 성공');
    }

    async selectDeleteModal() {
        await expect(this.createdFolder).toBeVisible();
        await this.createdFolder.click({ button: 'right' });
        await this.page.waitForLoadState("domcontentloaded");
        await expect(this.deleteModalButton).toBeVisible();
        await this.deleteModalButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('폴더 삭제 선택 성공');
    }

    async deleteFolder() {
        await expect(this.deleteModalText).toBeVisible();
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('폴더 삭제 성공');
    }

    async checkDeleteSuccessText() {
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('삭제 스낵바 확인 성공');
    }

    async selectPenchartSample() {
        await expect(this.penchartSampleButton).toBeVisible();
        await this.penchartSampleButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('펜차트 샘플함 선택 성공 확인');
    }

    async checkEnterPenchartSampleModal() {
        await expect(this.penchartSampleHeader).toBeVisible();
        console.log('펜차트 샘플함 진입 확인 성공');
    }

    async loadImageToCustomer() {
        const firstImage = this.page.locator('[aria-label$=".jpg"], [aria-label$=".png"]').first();
        await expect(firstImage).toBeVisible();
        await firstImage.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('임의의 이미지 선택 성공');
        await expect(this.loadButton).toBeVisible();
        await this.loadButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('이미지 불러오기 성공');
    }

    async loadFolderToCustomer() {
        const dialog = this.page.getByRole('dialog');
        await expect(dialog).toBeVisible(); // 모달 열려있나 확인

        const folderItems = dialog.locator('[data-testid="FolderIcon"]');
        const autoFolder = folderItems.locator('xpath=ancestor::div[contains(., "자동화_폴더")]').first();

        if (await folderItems.filter({ hasText: '자동화_폴더' }).count() > 0) {
            await expect(autoFolder).toBeVisible();
            await autoFolder.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('자동화 폴더 있어서 그거 선택했어요~~');
        } else {
            const firstFolder = folderItems.first();
            await expect(firstFolder).toBeVisible();
            await firstFolder.click();
            await this.page.waitForLoadState("domcontentloaded");
            console.log('자동화 폴더 안보여서 첫 번째 폴더 선택했어요~~');
        }
        await expect(this.loadButton).toBeVisible();
        await this.loadButton.click();
        await this.page.waitForLoadState("domcontentloaded");
        console.log('이미지 불러오기 성공');
    }

    async checkLoadSuccessText() {
        await expect(this.loadSuccessText).toBeVisible();
        console.log('불러오기 완료 스낵바 확인 성공');
    }

    


}

export { Penchart };