import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Announcement } from '../../../pages/Announcement';
import { Exception } from '../../../pages/Exception';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Main > Announcement Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const announcement = new Announcement(page);
  const exception = new Exception(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

  // 팝업 처리 
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // 배너 처리
  await page.waitForTimeout(1000);
  await exception.closeBannerIfExists();

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  // 공지사항 영역 접기
  await announcement.foldAnnounce();
  
  // 공지사항 영역 펴기
  await announcement.spreadAnnounce();
  
  // 공지사항 작성 > 취소
  await announcement.clickCreate();
  await announcement.cancelCreate();
  
  // 공지사항 작성 > 일일 공지
  await announcement.clickCreate();

  await announcement.selectDaily();

  await announcement.writeDaily();
  await announcement.saveAnnounce();
  await announcement.saveSuccessCheck();
  // 수정
  await announcement.editDailyAnnounce();

  await announcement.editAnnounce();

  await announcement.saveAnnounce();

  await announcement.checkAnnounceEdit();
  // 고정
  await announcement.fixDailyAnnounce();
  // 삭제
  await announcement.deleteDailyAnnounce();

  // 공지사항 작성 > 전체 공지
  await announcement.clickCreate();

  await announcement.selectFull();
  
  await announcement.writeFull();
  await announcement.saveAnnounce();
  await announcement.saveSuccessCheck();
  // 수정
  await announcement.editFullAnnounce();

  await announcement.editAnnounce();

  await announcement.saveAnnounce();

  await announcement.checkAnnounceEdit();
  // 고정
  await announcement.fixFullAnnounce();
  // 삭제
  await announcement.deleteFullAnnounce();

});