import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
// import { Payment } from '../../../pages/Payment';
import { Penchart } from '../../../pages/Penchart';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Integrated Chart > Penchart Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const exception = new Exception(page);
  const search = new customerSearch(page);
  const walkInReception = new WalkInReception(page);
  const penchart = new Penchart(page);

  
  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login("jwpark@v2test.com", "uunn2345%%");

  // 팝업 처리
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // 배너 처리
  await page.waitForTimeout(1000);
  await exception.closeBannerIfExists();

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  // 고객 조회
  await search.searchCustomerName();
  // 통합 차트 진입
  await walkInReception.enterInIntegratedChart();
  await penchart.enterPenchart();

  // 새 폴더 생성
  await penchart.checkEnteredPenchart();
  await penchart.enteredNewFolder();
  await penchart.createNewFolder();
  await penchart.selectSaveButton();
  await penchart.checkCreateSuccessText();

  // 폴더 중요차트함에 추가
  await penchart.folderToImportantCharts();
  await penchart.moveToImportantChart();
  await penchart.checkMovedFolder();

  await penchart.moveToAllChart();
  await penchart.checkMovedFolder();

  // 이름 변경
  await penchart.checkChangeNameModal();
  await penchart.changeFolderName();
  await penchart.selectSaveButton();
  await penchart.checkChangeSuccessText();

  // 중요 차트함에서 제거
  await penchart.unmarkFolderImportant();
  await penchart.moveToImportantChart();
  await penchart.checkNothingInFolder();

  await penchart.moveToAllChart();
  await penchart.checkMovedFolder();

  // 폴더 삭제
  await penchart.selectFolderDelete();
  await penchart.delete();

  await penchart.checkDeleteSuccessText();

  // 펜차트 샘플함 진입
  await penchart.selectPenchartSample();
  await penchart.checkEnterPenchartSampleModal();

  // 임의의 이미지 불러오기
  await penchart.loadImageToCustomer();
  await penchart.checkLoadSuccessText();

  await penchart.imageToImportantCharts();
  await penchart.moveToImportantChart();

  await penchart.checkMovedImage();

  await penchart.moveToAllChart();
  await penchart.checkMovedImage();

  // 이름 변경
  await penchart.checkChangeImageName();
  await penchart.changeImageName();
  await penchart.selectSaveButton();
  await penchart.checkChangeSuccessText();

  // 중요 차트함에서 제거
  await penchart.unmarkImageImportant();
  await penchart.moveToImportantChart();
  await penchart.checkNothingInFolder();

  await penchart.moveToAllChart();
  await penchart.checkUnmarkedImage();

  await penchart.drawingOnImage();

  // 이미지 삭제
  await penchart.selectImageDelete();
  await penchart.delete();

  await penchart.checkDeleteSuccessText();

});