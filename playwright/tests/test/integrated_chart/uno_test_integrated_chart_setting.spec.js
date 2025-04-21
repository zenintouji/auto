import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await expect(page.getByRole('textbox', { name: '비밀번호를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
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
  await expect(page.getByRole('cell', { name: '고객명' }).nth(0)).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  await expect(page.getByText('등록화면 기본 노출')).toBeVisible();
  await expect(page.getByText('탭 순서와 보고싶은 탭만 지정할 수 있습니다')).toBeVisible();
  await expect(page.getByText('핀 고정시 해당 메뉴가 기본으로 노출됩니다')).toBeVisible();
  // 문진 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(13).click();
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(13).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 처방전 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(12).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 통화 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(11).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 메시지 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(10).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 수납 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(9).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 펜차트 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(8).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 피부관리 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(7).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 간호 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(6).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 수술간호 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(5).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 시/수술 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(4).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 진료 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(3).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 상담 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(2).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 접수 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(1).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 설정
  await page.locator('.settings-btn').click();
  await expect(page.getByRole('heading', { name: '통합차트 설정' })).toBeVisible();
  await expect(page.getByText('통합차트 열람 시 등록화면의 기본 값을 지정할 수 있습니다')).toBeVisible();
  // 예약 체크 해제
  await page.locator('div.sc-cTTdyq .MuiCheckbox-root input[type="checkbox"]').nth(0).click();
  await expect(page.getByText('핀 고정된 메뉴는 숨김 처리할 수 없습니다')).toBeVisible();
  // 통합차트 설정 > 전체선택 
  await expect(page.getByText('전체선택', { exact: true })).toBeVisible();
  await page.getByText('전체선택', { exact: true }).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  // 통합차트
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 통합차트 > 창분할
  await page.locator('.dual-mode-btn').click();
  await expect(page.getByText('보고싶은 메뉴를 선택하면 해당메뉴의 화면이 추가됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 메뉴 추가하기' })).toBeVisible();
  await page.getByRole('button', { name: '+ 메뉴 추가하기' }).click();
  // 창분할 > 접수차트
  await expect(page.getByRole('menuitem', { name: '접수차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '접수차트' }).click();
  await expect(page.getByRole('button', { name: '+ 접수등록' })).toBeVisible();
  // 창분할 > 상담차트
  await page.locator('div').filter({ hasText: /^접수차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '상담차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '상담차트' }).click();
  await expect(page.getByRole('button', { name: '+ 상담등록' })).toBeVisible();
  // 창분할 > 진료차트
  await page.locator('div').filter({ hasText: /^상담차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '진료차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '진료차트' }).click();
  await expect(page.getByRole('button', { name: '+ 진료등록' })).toBeVisible();
  // 창분할 > 시/수술차트
  await page.locator('div').filter({ hasText: /^진료차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '시/수술차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '시/수술차트' }).click();
  await expect(page.getByRole('button', { name: '+ 시/수술등록' })).toBeVisible();
  // 창분할 > 수술간호차트
  await page.locator('div').filter({ hasText: /^시\/수술차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '수술간호차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '수술간호차트' }).click();
  await expect(page.getByRole('button', { name: '+ 수술간호등록' })).toBeVisible();
  // 창분할 > 간호차트
  await page.locator('div').filter({ hasText: /^수술간호차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '간호차트', exact: true })).toBeVisible();
  await page.getByRole('menuitem', { name: '간호차트', exact: true }).click();
  await expect(page.getByRole('button', { name: '+ 간호등록' })).toBeVisible();
  // 창분할 > 피부관리차트
  await page.locator('div').filter({ hasText: /^간호차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '피부관리차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '피부관리차트' }).click();
  await expect(page.getByRole('button', { name: '+ 피부관리등록' })).toBeVisible();
  // 창분할 > 수납차트
  await page.locator('div').filter({ hasText: /^피부관리차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '수납차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '수납차트' }).click();
  await expect(page.getByRole('button', { name: '+ 수납등록' })).toBeVisible();
  // 창분할 > 펜차트
  await page.locator('div').filter({ hasText: /^수납차트 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '펜차트' })).toBeVisible();
  await page.getByRole('menuitem', { name: '펜차트' }).click();
  await expect(page.getByText('펜차트', { exact: true })).toBeVisible();
  // 창분할 > 메시지 전송 내역
  await page.locator('.css-1h8ti4g > svg').click();
  await expect(page.getByRole('menuitem', { name: '메시지 전송 내역' })).toBeVisible();
  await page.getByRole('menuitem', { name: '메시지 전송 내역' }).click();
  await expect(page.getByRole('cell', { name: '전송상태' })).toBeVisible();
  // 창분할 > 통화 내역
  await page.locator('.css-1h8ti4g > svg').click();
  await expect(page.getByRole('menuitem', { name: '통화 내역' })).toBeVisible();
  await page.getByRole('menuitem', { name: '통화 내역' }).click();
  await expect(page.getByRole('cell', { name: '통화메모' })).toBeVisible();
  // 창분할 > 처방전
  await page.locator('.css-1h8ti4g > svg').click();
  await expect(page.getByRole('menuitem', { name: '처방전' })).toBeVisible();
  await page.getByRole('menuitem', { name: '처방전' }).click();
  await expect(page.getByRole('button', { name: '처방전 작성' })).toBeVisible();
  // 창분할 > 문진
  await page.locator('div').filter({ hasText: /^처방전 \(0\)$/ }).getByRole('img').click();
  await expect(page.getByRole('menuitem', { name: '문진' })).toBeVisible();
  await page.getByRole('menuitem', { name: '문진' }).click();
  await expect(page.getByRole('button', { name: '+ 문진등록' })).toBeVisible();
  // 통합차트
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  await page.locator('.single-mode-btn').click();
  await expect(page.getByRole('button', { name: '+ 문진등록' })).not.toBeVisible();


  

});