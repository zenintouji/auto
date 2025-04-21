import { expect } from '@playwright/test';

class Announcement {
    constructor(page){
        this.page = page;

        this.announcement = page.getByRole('button', { name: '공지사항' });
        this.dailyAnnouncement = page.getByRole('button', { name: '일일공지' });
        this.fullAnnouncement =  page.getByRole('button', { name: '전체공지' });
        
        this.typeOfAnnounce = page.getByText('종류선택');


        this.createButton = page.getByRole('button', { name: '작성' });
        this.saveButton = page.getByRole('button', { name: '저장' });
        this.cancelButton = page.getByRole('button', { name: '취소', exact: true });
        this.confirmButton = page.getByRole('button', { name: '확인' });

        // 일일 공지 관련 버튼
        this.dailyEditButton = page.locator('div').filter({ hasText: /v2공지_작성_자동화모든 공지를 불러왔습니다\.$/ }).getByRole('button').nth(1);
        this.dailyFixButton = page.locator('div').filter({ hasText: /v2공지_작성_자동화_수정모든 공지를 불러왔습니다\.$/ }).getByRole('button').nth(3);
        this.dailyDeleteButton = page.locator('div').filter({ hasText: /v2공지_작성_자동화_수정모든 공지를 불러왔습니다\.$/ }).getByRole('button').nth(2);

        // 전체 공지 관련 버튼
        this.fullEditButton = page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(3);
        this.fullFixButton = page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(5);
        this.fullDeleteButton = page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(4);

        this.deleteModalText = page.getByText('게시글을 삭제하시겠습니까?');

        this.announceInput = page.locator('pre div').first();

        this.saveSuccessText = page.getByText('등록되었습니다');
        this.deleteSuccessText = page.getByText('삭제되었습니다');
        
        this.ANNOUNCE_TEXT = "공지_작성_자동화";
        this.ANNOUNCE_TEXT_EDIT = "공지_작성_자동화_수정";

        this.announceText = page.getByText(this.ANNOUNCE_TEXT);
        this.announceEditText = page.getByText(this.ANNOUNCE_TEXT_EDIT);
        // this.announceText = page.getByText('공지_작성_자동화');

    }

    // 공지사항 접기
    async foldAnnounce() {
        await expect(this.announcement).toBeVisible();
        await this.announcement.click();
        await expect(this.createButton).not.toBeVisible();
        console.log('공지사항 접기 성공');
    }
    
    // 공지사항 펼치기
    async spreadAnnounce() {
        await expect(this.createButton).not.toBeVisible();
        await expect(this.announcement).toBeVisible();
        await this.announcement.click();
        await expect(this.createButton).toBeVisible();
        console.log('공지사항 펼치기 성공');
    }

    // 작성 선택
    async clickCreate() {
        await expect(this.createButton).toBeVisible();
        await this.createButton.click();
        await expect(this.typeOfAnnounce).toBeVisible();
        console.log('공지사항 작성 선택 성공');
    }

    // 작성 취소
    async cancelCreate() {
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        await expect(this.typeOfAnnounce).not.toBeVisible();
        console.log('공지사항 작성 취소 성공');
    }

    
    // 일일공지 선택
    async selectDaily() {
        await expect(this.dailyAnnouncement).toBeVisible();
        await this.dailyAnnouncement.click();
        await expect(this.typeOfAnnounce).toBeVisible();
        console.log('일일공지 선택');
    }
    
    // 전체공지 선택
    async selectFull() {
        await expect(this.fullAnnouncement).toBeVisible();
        await this.fullAnnouncement.click();
        await expect(this.typeOfAnnounce).toBeVisible();
        console.log('전체공지 선택');
    }

    // 일일공지 내용 작성 까지만
    async writeDaily() {
        await expect(this.announceInput).toBeVisible();
        await this.announceInput.click();
        await this.announceInput.fill(this.ANNOUNCE_TEXT);
        // await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 전체공지 내용 작성 까지만
    async writeFull() {
        await expect(this.announceInput).toBeVisible();
        await this.announceInput.click();
        await this.announceInput.fill(this.ANNOUNCE_TEXT);
        // await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 저장 버튼 선택
    async saveAnnounce() {
        await expect(this.saveButton).toBeVisible();
        await this.saveButton.click();
    }


    // 저장 성공 스낵바 문구
    async saveSuccessCheck() {
        await expect(this.saveSuccessText).toBeVisible();
        console.log('공지 저장 성공');
    }

    // 일일공지 수정 선택 까지만
    async editDailyAnnounce() {
        await expect(this.announceText).toBeVisible();
        await expect(this.announceText).toBeEnabled();
        await this.announceText.hover();
        // await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.dailyEditButton).toBeVisible();
        await this.dailyEditButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.typeOfAnnounce).toBeVisible();
        await expect(this.announceText).toBeVisible();
    }

    // 전체공지 수정 선택 까지만
    async editFullAnnounce() {
        await expect(this.announceText).toBeVisible();
        await this.announceText.hover();
        // await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.fullEditButton).toBeVisible();
        await this.fullEditButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.typeOfAnnounce).toBeVisible();
        await expect(this.announceText).toBeVisible();
    }

    // 공지 내용 수정 작성 까지만
    async editAnnounce() {
        await expect(this.announceText).toBeVisible();
        await this.announceInput.click();
        await this.announceInput.fill(this.ANNOUNCE_TEXT_EDIT);
        // await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('domcontentloaded');
    }

    // 공지내용 수정 확인
    async checkAnnounceEdit() {
        await expect(this.announceEditText).toBeVisible();
        console.log('공지 수정 성공');
    }

    // 일일공지 고정 선택 까지
    async fixDailyAnnounce() {
        await expect(this.announceEditText).toBeVisible();
        await expect(this.announceEditText).toBeEnabled();
        await this.announceEditText.hover();
        // await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.dailyFixButton).toBeVisible();
        await this.dailyFixButton.click();
        await expect(this.announceEditText).toBeVisible();
    }

    // 전체공지 고정 선택 까지
    async fixFullAnnounce() {
        await expect(this.announceEditText).toBeVisible();
        await expect(this.announceEditText).toBeEnabled();
        await this.announceEditText.hover();
        // await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.fullFixButton).toBeVisible();
        await this.fullFixButton.click();
        await expect(this.announceEditText).toBeVisible();
    }

    // 일일공지 삭제
    async deleteDailyAnnounce() {
        await expect(this.announceEditText).toBeVisible();
        await expect(this.announceEditText).toBeEnabled();
        await this.announceEditText.hover();
        // await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.dailyDeleteButton).toBeVisible();
        await this.dailyDeleteButton.click();
        await expect(this.deleteModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('일일공지 삭제 성공');
    }

    async deleteFullAnnounce() {
        await expect(this.announceEditText).toBeVisible();
        await expect(this.announceEditText).toBeEnabled();
        await this.announceEditText.hover();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.fullDeleteButton).toBeVisible();
        await this.fullDeleteButton.click();
        await expect(this.deleteModalText).toBeVisible();
        await expect(this.confirmButton).toBeVisible();
        await this.confirmButton.click();
        await expect(this.deleteSuccessText).toBeVisible();
        console.log('전체공지 삭제 성공');
    }

    

}

export { Announcement };