import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('jwpark@v2test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForTimeout(1000);
  // 메인 화면 진입
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회 진입
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 수납 진입
  await page.getByText('수납 (0)').click();
  await expect(page.getByText('수납차트 (0)')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 수납등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 수납등록' }).click();
  // 수납 등록
  await expect(page.getByText('수납 등록')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 제품 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 제품 추가' }).click();
  // 수납항목 추가
  await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  await expect(page.getByRole('button', { name: '제품 추가', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '+제품코드 생성' })).toBeVisible();
  await page.getByRole('button', { name: '+제품코드 생성' }).click();
  // 제품 추가 팝업
  await expect(page.getByRole('heading', { name: '제품 추가 close' })).toBeVisible();
  // 제품명
  await expect(page.getByRole('cell', { name: '제품명 *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '제품명을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '제품명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '제품명을 입력하세요' }).fill('제품 추가 자동화 삭제용');
  // 과세
  await expect(page.getByRole('cell', { name: '과세 *' })).toBeVisible();
  await expect(page.getByRole('checkbox')).toBeVisible();
  await page.getByRole('checkbox').check();
  // 금액
  await expect(page.getByRole('cell', { name: '금액 *' })).toBeVisible();
  await expect(page.getByRole('textbox').nth(1)).toBeVisible();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('10,0000');
  // VAT 제외
  await expect(page.getByRole('cell', { name: 'VAT 제외' })).toBeVisible();
  // 제품 추가 +
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
  await page.getByRole('button', { name: '+' }).click();
  // 제품 추가 + 제품명 
  await expect(page.getByRole('cell', { name: '제품명 *' })).toBeVisible();
  await expect(page.getByPlaceholder('제품명을 입력하세요.').nth(2)).toBeVisible();
  await page.getByPlaceholder('제품명을 입력하세요.').nth(2).click();
  await page.getByPlaceholder('제품명을 입력하세요.').nth(2).fill('제품 추가 비과세 자동화 삭제용');
  await expect(page.getByRole('cell', { name: '과세 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '금액 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'VAT 제외' })).toBeVisible();
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  // 등록 되면서, 수납항목 추가 팝업 이동 > 닫기
  await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button').click();
  // 통합차트 닫기
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3)).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  // 수납코드 설정 진입
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-settings 환경 설정' })).toBeVisible();
  await expect(page.getByRole('button', { name: '수납코드 설정' })).toBeVisible();
  await page.getByRole('button', { name: '수납코드 설정' }).click();
  // 수납코드 설정
  await expect(page.getByRole('heading', { name: '수납코드 설정' })).toBeVisible();
  await expect(page.getByRole('tab', { name: '제품' })).toBeVisible();
  await page.getByRole('tab', { name: '제품' }).click();
  // 검색
  await expect(page.getByRole('textbox', { name: '제품명' })).toBeVisible();
  await page.getByRole('textbox', { name: '제품명' }).click();
  await page.getByRole('textbox', { name: '제품명' }).fill('삭제용');
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  // 검색 확인
  // 카테고리
  await expect(page.getByRole('cell', { name: '제품 추가 비과세 자동화 삭제용' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '제품 추가 자동화 삭제용' })).toBeVisible();
  // 과세여부
  await expect(page.getByRole('cell', { name: '비과세', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '과세', exact: true })).toBeVisible();
  // VAT 제외
  await expect(page.getByRole('cell', { name: '0' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '90,909' })).toBeVisible();
  // 금액
  await expect(page.getByRole('cell', { name: '0' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '100,000' })).toBeVisible();
  // 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '제품 추가 자동화 삭제용' })).not.toBeVisible();
  // 미사용
  await expect(page.getByRole('button', { name: '미사용' })).toBeVisible();
  await page.getByRole('button', { name: '미사용' }).click();
  await expect(page.getByText('미사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '미사용' })).not.toBeVisible();
  // 사용
  await expect(page.getByRole('button', { name: '사용' })).toBeVisible();
  await page.getByRole('button', { name: '사용' }).click();
  await expect(page.getByText('사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('사용 처리되었습니다')).toBeVisible();
  // 삭제
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '제품 추가 비과세 자동화 삭제용' })).not.toBeVisible();

});