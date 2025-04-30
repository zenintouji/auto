import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Prescription } from '../../../pages/Prescription';

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
  const presription = new Prescription(page);

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
  await presription.enterPrescription();

  await presription.enterCreatePrescription();
  await presription.closeAlertPopup();

  // 처방전 확인 및 등록
  await presription.registerPrescription();






  // await page.getByText('처방전 (0)').click();
  // // 처방전
  // await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // await expect(page.getByRole('button', { name: '처방전 작성' })).toBeVisible();
  // // 처방전 작성
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('button', { name: '처방전 작성' }).click();
  // const page1 = await page1Promise;
  // // 처방전 작성 > 안내 팝업
  // await expect(page1.getByRole('heading', { name: '안내' })).toBeVisible();
  // // 처방전 작성 > 안내 팝업 닫기
  // await expect(page1.getByRole('heading', { name: '안내' }).getByRole('button')).toBeVisible();
  // await page1.getByRole('heading', { name: '안내' }).getByRole('button').click();
  // // 처방전 제출 용도
  // await expect(page1.getByRole('button', { name: '[ ]본인보관용' })).toBeVisible(); // 처방전 제출 용도
  // await expect(page1.getByRole('button', { name: '[V]약국제출용' })).toBeVisible();
  // // 처방전
  // await expect(page1.getByRole('heading', { name: '처    방    전' })).toBeVisible(); // 처방전
  // // 처방전 종류
  // await expect(page1.getByRole('button', { name: '[ ]건강보험' })).toBeVisible(); // 처방전 종류
  // await expect(page1.getByRole('button', { name: '[ ]의료급여' })).toBeVisible();
  // await expect(page1.getByRole('button', { name: '[ ]산업재해보험' })).toBeVisible();
  // await expect(page1.getByRole('button', { name: '[ ]자동차보험' })).toBeVisible();
  // await expect(page1.getByRole('button', { name: '[V]기타 ( )' })).toBeVisible();
  // await expect(page1.getByText('* [ ]에는 해당되는 곳에 "V"표시를 합니다')).toBeVisible(); // 처방전 종류 선택 안내
  // // 요양기관번호
  // await expect(page1.getByRole('cell', { name: '요양기관기호 :' })).toBeVisible(); // 요양기관기호
  // // 성명
  // await expect(page1.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible(); // 성명
  // // 주민번호 앞
  // await expect(page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').first()).toBeVisible();
  // await expect(page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').nth(1)).toBeVisible(); 
  // // 의료기관
  // await expect(page1.getByRole('cell', { name: '의료기관' })).toBeVisible(); // 의료기관
  // await expect(page1.getByRole('cell', { name: '우노CRM' })).toBeVisible(); // 명칭
  // await expect(page1.getByRole('cell', { name: '01012340' })).toBeVisible(); // 전화번호
  // await expect(page1.getByRole('cell', { name: '1111', exact: true })).toBeVisible(); // 팩스 번호
  // // 처방전 중간 안내문구
  // await expect(page1.getByRole('cell', { name: '환자가 요구하면 질병분류기호를 적지 않습니다' })).toBeVisible();
  // // 묶음 처방 리스트
  // await expect(page1.getByText('묶음 처방 리스트')).toBeVisible();
  // // 의약품 등록
  // await expect(page1.getByRole('row', { name: '등록 1' }).getByRole('button')).toBeVisible();
  // await page1.getByRole('row', { name: '등록 1' }).getByRole('button').click();
  // // 작성 완료
  // await page1.waitForTimeout(2000);
  // await expect(page1.getByRole('button', { name: '작성완료' })).toBeVisible();
  // await page1.getByRole('button', { name: '작성완료' }).click();
  // await expect(page1.getByText('저장되었습니다')).toBeVisible();
  // await page.bringToFront();
  // await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // // 처방전 작성 확인
  // await expect(page.getByRole('cell', { name: 'v2' }).first()).toBeVisible(); // 작성자
  // await expect(page.getByRole('cell', { name: '기타' })).toBeVisible(); // 보험종류
  // await expect(page.getByRole('cell', { name: 'v2' }).nth(1)).toBeVisible(); // 처방의사 
  // await expect(page.getByRole('cell', { name: '세파록스캡슐(세파클러수화물)_(0.25g/1' })).toBeVisible(); // 처방내역
  // await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(3)')).toBeVisible();
  // // 처방전 수정
  // const page3Promise = page.waitForEvent('popup');
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(3)').click();
  // const page3 = await page3Promise;
  // // 처방전 수정 > 안내 팝업
  // await expect(page3.getByRole('heading', { name: '안내' })).toBeVisible();
  // await expect(page3.getByRole('heading', { name: '안내' }).getByRole('button')).toBeVisible();
  // await page3.getByRole('heading', { name: '안내' }).getByRole('button').click();
  // // 처방전 수정
  // await expect(page3.getByRole('heading', { name: '처    방    전' })).toBeVisible();
  // // 처방전 의약품 첫번째 항목 삭제
  // await page3.locator('.btn-del').first().click();
  // // 처방전 용법 첫번째 항목 입력
  // await page3.locator('input[placeholder="입력하세요"]').first().click();
  // await page3.locator('input[placeholder="입력하세요"]').first().fill('용법 자동화');  // '입력하세요'라는 placeholder를 가진 입력 필드에 '테스트' 입력
  // // 작성완료
  // await page3.waitForTimeout(2000);
  // await expect(page3.getByRole('button', { name: '작성완료' })).toBeVisible();
  // await page3.getByRole('button', { name: '작성완료' }).click();
  // await expect(page3.getByText('저장되었습니다')).toBeVisible();
  // await page.bringToFront();
  // await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // await expect(page.getByRole('cell', { name: 'v2' }).first()).toBeVisible(); // 작성자
  // await expect(page.getByRole('cell', { name: '기타' })).toBeVisible(); // 보험종류
  // await expect(page.getByRole('cell', { name: 'v2' }).nth(1)).toBeVisible(); // 처방의사
  // await expect(page.getByRole('cell', { name: '키도멜라인장용정(브로멜라인)_(0.1g/1정) 외 2건' })).toBeVisible(); // 처방내역
  // await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible(); // 상태
  // await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // // 처방전 삭제
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // // 삭제 안내 팝업
  // await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  // await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  // await page.getByRole('button', { name: '확인' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});