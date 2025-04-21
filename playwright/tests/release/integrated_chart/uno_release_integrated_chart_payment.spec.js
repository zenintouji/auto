import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { Exception } from '../../../pages/Exception';
import { customerSearch } from '../../../pages/CustomerSearch';
import { WalkInReception } from '../../../pages/WalkInReception';
import { Payment } from '../../../pages/Payment';

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
  const payment = new Payment(page);

  // 로그인 페이지 접속
  await loginPage.goto();

  // 로그인
  await loginPage.login("jwpark@v2test.com", "uunn2345%%");

  // 팝업 처리
  await page.waitForTimeout(2000);
  await exception.closePopupIfExists();

  // const popupButton = page.getByText('오늘하루 보지않기');
  // if (await popupButton.isVisible()) {
  //   await popupButton.click();
  // }

  // 로그인 성공 여부 확인
  await page.waitForTimeout(2000);
  expect(await loginPage.isLoggedin()).toBeTruthy();

  // 고객 조회
  await search.searchCustomerName();
  // 통합 차트 진입
  await walkInReception.enterInIntegratedChart();

  // 수납 차트
  await payment.enterPaymentChart();
  
  // 수납 등록 진입
  await payment.registPayment();
  
  await payment.addSurgery();
  await payment.checkAddSurgery();

  await payment.addProduction();
  await payment.checkAddProduction();

  await payment.checkPayDayAndMethod();

  await payment.selectManager();
  await payment.selectDoctor();
  await payment.selectCounselor();
  await payment.selectVisitRoute();
  await payment.enterMemo();

  await payment.selectPending(); // 수납대기
  await payment.checkPendingSuccess();

  await payment.checkPendingResult();

  // 수납대기 카테고리 선택
  await payment.selectPendingCategory();

  // 수납처리 ㄱㄱ
  await payment.hoverOnMemo();
  await payment.processPayment();

  await payment.checkEditSurgery();
  await payment.checkEditProduction();

  await payment.payWithCard();
  await payment.editManager();
  await payment.editDoctor();
  await payment.editCounselor();
  await payment.editVisitRoute();
  await payment.editMemo();

  await payment.selectSaveButton();
  await payment.editInfoModal();
  await payment.checkEditSuccess();

  await payment.checkNoData();

  // 미수 확인 
  await payment.selectUnpaidCategory();
  await payment.checkUnpaidResult();
  await payment.checkPaymentInfo();

  // 수납취소
  await payment.hoverOnMemo();
  await payment.cancelPayment();
  await payment.cancelPopup();
  await payment.checkCancelSuccess();

  await payment.checkNoData();

  await payment.selectCancelCategory();
  await payment.checkCancelResult();
  await payment.checkPaymentInfo();

  // 완납 ㄱㄱ
  await payment.hoverOnMemo();
  await payment.processPayment();
  await payment.payAll();

  await payment.selectSaveButton();
  await payment.editInfoModal();
  await payment.checkEditSuccess();

  await payment.checkNoData();

  await payment.selectPayFullCategory();
  await payment.checkPayFullResult();











  // // 수납차트 > 완납 선택
  // await expect(page.getByRole('button', { name: '완납' })).toBeVisible();
  // await page.getByRole('button', { name: '완납' }).click();
  // await expect(page.getByRole('cell', { name: '완납', exact: true })).toBeVisible(); 
  
  // // 결제 영역 확인
  // await expect(page.getByRole('cell', { name: '수납', exact: true }).first()).toBeVisible(); // 구분
  // await expect(page.getByRole('cell', { name: 'v2', exact: true }).first()).toBeVisible(); // 수납자
  // await expect(page.getByRole('cell', { name: '카드' }).nth(2)).toBeVisible(); // 결제
  // await expect(page.getByRole('cell', { name: '현금', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '+' }).nth(1)).toBeVisible(); // 금액 
  // await expect(page.getByRole('cell', { name: '+ 750,000', exact: true })).toBeVisible();
  // await expect(page.getByRole('cell', { name: '미발행' }).nth(1)).toBeVisible(); // 현금 영수증 
  // await expect(page.getByRole('cell', { name: '발행', exact: true })).toBeVisible();
  // // 환불 
  // await page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수 > 완납' }).hover();
  // await page.getByRole('button', { name: '환불', exact: true }).click();
  // // 환불 진입
  // await expect(page.getByRole('heading', { name: '환불 close' })).toBeVisible();
  // // 과세
  // await expect(page.getByLabel('환불').getByText('과세', { exact: true })).toBeVisible();
  // // 카드 > 전액 선택
  // await page.getByRole('button', { name: '전액' }).first().click();
  // // 환불일
  // await expect(page.getByText('환불일')).toBeVisible();
  // // 담당자
  // await expect(page.getByLabel('환불').getByText('담당자')).toBeVisible();
  // await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  // await page.getByRole('option', { name: '최지안' }).click();
  // // 환불 > 수납 메모
  // await expect(page.getByText('수납메모', { exact: true })).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.getByLabel('환불').getByText('수납메모 > 수납대기 > 미수 > 완납').click();
  // await page.locator('pre div').filter({ hasText: '수납메모 > 수납대기 > 미수 > 완납' }).fill('수납메모 > 수납대기 > 미수 > 완납 > 부분환불');
  // // 환불 완료
  // await expect(page.getByRole('button', { name: '환불완료' })).toBeVisible();
  // await page.getByRole('button', { name: '환불완료' }).click();
  // await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // // 수납차트 > 부분환불 진입
  // await expect(page.getByRole('button', { name: '부분환불' })).toBeVisible();
  // await page.getByRole('button', { name: '부분환불' }).click();
  // await expect(page.getByRole('cell', { name: '부분환불', exact: true })).toBeVisible();
  // // 결제 영역 확인
  // await expect(page.getByRole('cell', { name: '환불', exact: true })).toBeVisible(); // 구분
  // await expect(page.getByRole('cell', { name: 'v2', exact: true }).first()).toBeVisible(); // 수납자
  // await expect(page.getByRole('cell', { name: '카드' }).nth(2)).toBeVisible(); // 결제
  // await expect(page.getByRole('cell', { name: '- 50,000', exact: true })).toBeVisible(); // 금액
  // await expect(page.getByRole('cell', { name: '미발행' }).nth(1)).toBeVisible(); // 현금 영수증
  // // 환불 
  // await page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수 > 완납 > 부분환불' }).hover();
  // await page.getByRole('button', { name: '환불', exact: true }).click();
  // // 환불 진입
  // await expect(page.getByRole('heading', { name: '환불 close' })).toBeVisible();
  // // 비과세
  // await expect(page.getByLabel('환불').getByText('비과세')).toBeVisible();
  // // 환불액
  // await expect(page.getByText('환불액').nth(3)).toBeVisible();
  // await page.getByRole('button', { name: '전액' }).nth(3).click();
  // // 환불일
  // await expect(page.getByText('환불일')).toBeVisible();
  // // 담당자
  // await expect(page.getByLabel('환불').getByText('담당자')).toBeVisible();
  // await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  // await page.getByRole('option', { name: '노윤이' }).click();
  // // 수납메모
  // await expect(page.getByText('수납메모', { exact: true })).toBeVisible();
  // await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  // await page.getByLabel('환불').getByText('수납메모 > 수납대기 > 미수 > 완납 > 부분환불').click();
  // await page.locator('pre div').filter({ hasText: '수납메모 > 수납대기 > 미수 > 완납 > 부분환불' }).fill('수납메모 > 수납대기 > 미수 > 완납 > 부분환불 > 전체환불');
  // // 환불완료 선택
  // await expect(page.getByRole('button', { name: '환불완료' })).toBeVisible();
  // await page.getByRole('button', { name: '환불완료' }).click();
  // await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // // 수납차트 > 전체환불 진입
  // await expect(page.getByRole('button', { name: '전체환불' })).toBeVisible();
  // await page.getByRole('button', { name: '전체환불' }).click();
  // await expect(page.getByRole('cell', { name: '전체환불', exact: true })).toBeVisible();
  // // 결제 영역 확인
  // await expect(page.getByRole('cell', { name: '환불', exact: true }).first()).toBeVisible(); // 구분
  // await expect(page.getByRole('cell', { name: 'v2', exact: true }).first()).toBeVisible(); // 수납자
  // await expect(page.getByRole('cell', { name: '현금' }).nth(2)).toBeVisible(); // 결제
  // await expect(page.getByRole('cell', { name: '- 750,000', exact: true })).toBeVisible(); // 금액
  // await expect(page.getByRole('cell', { name: '발행', exact: true }).first()).toBeVisible(); // 현금 영수증
  // // 수납차트 > 전체
  // await expect(page.getByRole('button', { name: '전체', exact: true })).toBeVisible();
  // await page.getByRole('button', { name: '전체', exact: true }).click();
  // await expect(page.getByRole('cell', { name: '전체환불', exact: true })).toBeVisible();
  // await expect(page.locator('div:nth-child(2) > table > tbody > tr > td').first()).toBeVisible();
  // await page.locator('div:nth-child(2) > table > tbody > tr > td').first().click();
  // // 삭제
  // await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // // 삭제 안내 팝업
  // await expect(page.getByText('수납에 연계된 시수술∙피부관리 내역이 있을 경우 함께 삭제됩니다.수납차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [수납취소]로')).toBeVisible();
  // await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // await page.getByRole('button', { name: '삭제' }).click();
  // await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});