import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Payment } from '../../../pages/Payment';
import { Penchart } from '../../../pages/Penchart';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
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
  await penchart.addToImportantCharts();
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
  await penchart.unmarkImportant();
  await penchart.moveToImportantChart();
  await penchart.checkNothingInFolder();

  await penchart.moveToAllChart();
  await penchart.checkMovedFolder();

  // 폴더 삭제
  await penchart.selectDeleteModal();
  await penchart.deleteFolder();

  await penchart.checkDeleteSuccessText();

  // 펜차트 샘플함 진입
  await penchart.selectPenchartSample();
  await penchart.checkEnterPenchartSampleModal();

  // 임의의 이미지 불러오기
  await penchart.loadImageToCustomer();
  await penchart.checkLoadSuccessText();















  // // 펜차트 샘플함
  // await expect(page.getByRole('button', { name: 'icon-image 펜차트 샘플함' })).toBeVisible();
  // await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  // await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  // // 폴더 선택
  // await page.getByLabel('자동화').locator('div').first().dblclick();
  // // 이미지 선택
  // await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  // await page.getByLabel('자동화 샘플.jpg').getByRole('checkbox').check();
  // await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // await page.getByLabel('자동화 샘플2.jpg').getByRole('checkbox').check();
  // await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  // await page.getByRole('button', { name: '불러오기' }).click();
  // await expect(page.getByText('차트를 불러왔습니다')).toBeVisible();
  // await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  // await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // // 이미지 즐겨찾기
  // await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '중요차트함에 추가' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '중요차트함에 추가' }).click();
  // await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  // await page.locator('div').filter({ hasText: /^자동화 샘플2\.jpg$/ }).locator('div').nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '중요차트함에 추가' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '중요차트함에 추가' }).click();
  // await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  // await page.waitForTimeout(3000);
  // // 중요 차트함 확인
  // await page.getByRole('menuitem', { name: '중요차트함' }).click();
  // await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  // await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // // 전체 폴더 이동
  // await expect(page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1)).toBeVisible();
  // await page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1).click();
  // await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  // await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // // 이미지 즐겨찾기 해제
  // await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '중요차트함에서 제거' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '중요차트함에서 제거' }).click();
  // await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  // await page.locator('div').filter({ hasText: /^자동화 샘플2\.jpg$/ }).locator('div').nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '중요차트함에서 제거' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '중요차트함에서 제거' }).click();
  // await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  // await page.waitForTimeout(2000);
  // // 중요 차트함 확인
  // await page.getByRole('menuitem', { name: '중요차트함' }).click();
  // await expect(page.getByText('등록된 차트가 없습니다')).toBeVisible();
  // // 전체 폴더 이동
  // await expect(page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1)).toBeVisible();
  // await page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1).click();
  // // 이미지 > '전' 선택
  // await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg전후$/ }).getByLabel('전').check();
  // // 이미지 > '후' 선택
  // await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg전후$/ }).getByLabel('후').check();
  // //////////////////////////
  // // 샘플 그리기 시작 //////////
  // //////////////////////////
  // const page2Promise = page.waitForEvent('popup');
  // await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).dblclick();
  // const page2 = await page2Promise;
  // await expect(page2.locator('div').filter({ hasText: /^텍스트$/ }).getByRole('button')).toBeVisible();
  // await page2.locator('div').filter({ hasText: /^텍스트$/ }).getByRole('button').click();
  // await page2.locator('canvas').nth(1).click({
  //   position: {
  //     x: 930,
  //     y: 467
  //   }
  // });
  // await page2.getByRole('textbox').fill('자동화');
  // await page2.locator('canvas').nth(1).click({
  //   position: {
  //     x: 1615,
  //     y: 477
  //   }
  // });
  // await expect(page2.locator('div').filter({ hasText: /^오늘날짜$/ }).getByRole('button')).toBeVisible();
  // await page2.locator('div').filter({ hasText: /^오늘날짜$/ }).getByRole('button').click();
  // await expect(page2.getByRole('button', { name: '저장' })).toBeVisible();
  // await page2.getByRole('button', { name: '저장' }).click();
  // await expect(page2.getByText('수정되었습니다')).toBeVisible();
  // await page.bringToFront();
  // await expect(page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1)).toBeVisible();
  // // 파일 추가
  // await expect(page.getByRole('button', { name: 'icon-image 파일 추가' })).toBeVisible();
  // await page.getByRole('button', { name: 'icon-image 파일 추가' }).click();
  // // 새 파일 팝업
  // await expect(page.locator('div').filter({ hasText: /^새 파일$/ })).toBeVisible();
  // // 저장 시도
  // await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  // await page.getByRole('button', { name: '저장' }).click();
  // await expect(page.getByText('파일을 선택하세요')).toBeVisible();
  // // 취소
  // await expect(page.getByRole('button', { name: '취소' })).toBeVisible();
  // await page.getByRole('button', { name: '취소' }).click();
  // await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  // // 이미지 삭제
  // await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '삭제' }).click();
  // await expect(page.getByText('선택한 1개의 항목을 정말로 삭제하시겠습니까?삭제 시 복원이 불가능하며, 펜차트 앱에서도 삭제됩니다')).toBeVisible();
  // await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).click();
  // // 이미지2 삭제
  // await expect(page.getByText('개의 항목이 삭제되었습니다.')).toBeVisible();
  // await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // await page.locator('div').filter({ hasText: /^자동화 샘플2\.jpg$/ }).locator('div').nth(1).click({
  //   button: 'right'
  // });
  // await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  // await page.getByRole('menuitem', { name: '삭제' }).click();
  // await expect(page.getByText('선택한 1개의 항목을 정말로 삭제하시겠습니까?삭제 시 복원이 불가능하며, 펜차트 앱에서도 삭제됩니다')).toBeVisible();
  // await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).click();
  // await expect(page.getByText('개의 항목이 삭제되었습니다.')).toBeVisible();
});