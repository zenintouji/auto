import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://staging.unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 진입
  await page.waitForTimeout(3000);
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
  // 통합 차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 시/수술 
  await page.getByText('시/수술 (0)').click();
  await expect(page.getByText('시/수술차트 (0)')).toBeVisible();
  await expect(page.getByText('잔여 있는 시/수술 내역이 없습니다')).toBeVisible();
  await expect(page.getByText('시/수술 진행내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 시/수술 추가 팝업
  await expect(page.getByRole('button', { name: '+ 시/수술 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 시/수술 추가' }).click();
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  // 시/수술코드 생성
  await expect(page.getByRole('button', { name: '+시/수술코드 생성' })).toBeVisible();
  await page.getByRole('button', { name: '+시/수술코드 생성' }).click();
  // 시/수술 추가 팝업 진입 > 카테고리 추가
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  await expect(page.getByRole('button', { name: '카테고리 추가' })).toBeVisible();
  await page.getByRole('button', { name: '카테고리 추가' }).click();
  // 카테고리 추가 팝업 > 카테고리 추가
  await expect(page.getByRole('heading', { name: '카테고리 추가 close' })).toBeVisible();
  await expect(page.getByLabel('카테고리 추가').getByText('카테고리', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '추가할 카테고리명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '추가할 카테고리명을 입력하세요' }).fill('카테고리 자동화 삭제용 추가');
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 저장되면서 시/수술 추가 팝업 자동 이동 > 생성한 카테고리 먼저 선택
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  await expect(page.getByRole('dialog').getByText('카테고리', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: '카테고리를 선택해주세요' }).click();
  await expect(page.getByRole('option', { name: '카테고리 자동화 삭제용 추가' })).toBeVisible();
  await page.getByRole('option', { name: '카테고리 자동화 삭제용 추가' }).click();
  // 시/수술 추가 
  // 시/수술 추가 > 시/수술명
  await expect(page.getByRole('cell', { name: '시/수술명 *' })).toBeVisible();
  await page.getByRole('textbox', { name: '시/수술명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '시/수술명을 입력하세요' }).fill('시/수술 자동화 삭제용 과세 추가');
  // 시/수술횟수
  await expect(page.getByRole('cell', { name: '시/수술횟수 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '- 1 + 회' }).locator('button[name="plus"]')).toBeVisible();
  await page.getByRole('cell', { name: '- 1 + 회' }).locator('button[name="plus"]').click();
  // 적정시술주기
  await expect(page.getByRole('cell', { name: '적정시술주기 *' })).toBeVisible();
  await page.getByRole('combobox', { name: '없음' }).click();
  await page.getByRole('option', { name: '1일 후' }).click();
  // 과세
  await expect(page.getByRole('cell', { name: '과세 *' })).toBeVisible();
  await expect(page.getByRole('table').locator('tbody').getByRole('cell').filter({ hasText: /^$/ }).locator('div').nth(1)).toBeVisible();
  await page.getByRole('table').locator('tbody').getByRole('cell').filter({ hasText: /^$/ }).locator('div').nth(1).click();
  // 금액
  await expect(page.getByRole('cell', { name: '금액 *' })).toBeVisible();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('100,000');
  // VAT 제외
  await expect(page.getByRole('cell', { name: 'VAT 제외' })).toBeVisible();
  // 시/수술 추가 +
  await expect(page.getByRole('cell', { name: '+', exact: true }).getByRole('button')).toBeVisible();
  await page.getByRole('cell', { name: '+', exact: true }).getByRole('button').click();
  // 시/수술명 추가 
  await expect(page.getByRole('cell', { name: '시/수술명 *' })).toBeVisible();
  await page.getByPlaceholder('시/수술명을 입력하세요.').nth(1).click();
  await page.getByPlaceholder('시/수술명을 입력하세요.').nth(1).fill('시/수술 자동화 삭제용 비과세 추가');
  await expect(page.getByRole('cell', { name: '시/수술횟수 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '적정시술주기 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '과세 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '금액 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'VAT 제외' })).toBeVisible();
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 저장되면서 시/수술 추가 팝업 
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  // 시/수술 추가 팝업 닫기
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  // 통합차트 닫기
  await expect(page.getByText('통합차트', { exact: true })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3)).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  // 수납코드 설정 진입
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-settings 환경 설정' })).toBeVisible();
  await expect(page.getByRole('button', { name: '수납코드 설정' })).toBeVisible();
  await page.getByRole('button', { name: '수납코드 설정' }).click();
  // 수납코드 설정 
  await expect(page.getByRole('heading', { name: '수납코드 설정' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '카테고리 검색' })).toBeVisible();
  await page.getByRole('textbox', { name: '카테고리 검색' }).click();
  await page.getByRole('textbox', { name: '카테고리 검색' }).fill('삭제용');
  await expect(page.getByRole('textbox', { name: '시/수술명 검색' })).toBeVisible();
  await page.getByRole('textbox', { name: '시/수술명 검색' }).click();
  await page.getByRole('textbox', { name: '시/수술명 검색' }).fill('삭제용');
  // 검색
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  // 검색 결과 확인
  // 카테고리
  await expect(page.getByText('카테고리 자동화 삭제용 추가')).toBeVisible();
  // 시/수술명
  await expect(page.getByText('시/수술 자동화 삭제용 과세 추가')).toBeVisible();
  await expect(page.getByText('시/수술 자동화 삭제용 비과세 추가')).toBeVisible();
  // 시/수술 횟수
  await expect(page.getByText('2회')).toBeVisible();
  await expect(page.getByText('1회')).toBeVisible();
  // 적정시술주기
  await expect(page.getByText('일 후')).toBeVisible();
  await expect(page.getByText('-', { exact: true })).toBeVisible();
  // 과세여부
  await expect(page.getByText('과세', { exact: true })).toBeVisible();
  await expect(page.getByText('비과세', { exact: true })).toBeVisible();
  // 금액
  await expect(page.getByText('100,000')).toBeVisible();
  await expect(page.getByText('0', { exact: true }).nth(2)).toBeVisible();
  // VAT 제외
  await expect(page.getByText('90,909')).toBeVisible();
  await expect(page.getByText('0', { exact: true }).nth(3)).toBeVisible();
  // 시/수술명 비과세 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(2)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(2).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByText('시/수술 자동화 삭제용 비과세 추가')).not.toBeVisible();
  // 시/수술명 미사용
  await expect(page.getByRole('button', { name: '미사용' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '미사용' }).nth(1).click();
  await expect(page.getByText('미사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '미사용' }).nth(1)).not.toBeVisible();
  // 시/수술명 사용
  await expect(page.getByRole('button', { name: '사용', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '사용', exact: true }).click();
  await expect(page.getByText('사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('사용 처리되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '사용', exact: true })).not.toBeVisible();
  // 카테고리 미사용
  await expect(page.getByRole('button', { name: '미사용' }).first()).toBeVisible();
  await page.getByRole('button', { name: '미사용' }).first().click();
  await expect(page.getByText('미사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '미사용' }).first()).not.toBeVisible();
  // 카테고리 사용
  await expect(page.getByRole('button', { name: '사용' }).first()).toBeVisible();
  await page.getByRole('button', { name: '사용' }).first().click();
  await expect(page.getByText('사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('사용 처리되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '사용' }).first()).not.toBeVisible();
  // 카테고리 삭제
  await expect(page.getByRole('heading', { name: '수납코드 설정' })).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' }).first()).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).first().click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByText('카테고리 자동화 삭제용 추가')).not.toBeVisible();
});