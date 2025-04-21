import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://test.unocare.co.kr/login'); // 로그인 화면 진입
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 통합차트 
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('접수 (0)').click();
  // 통합차트 > 접수
  await expect(page.getByText('접수차트 (0)')).toBeVisible();
  await page.getByRole('button', { name: '+ 접수등록' }).click();
  // 접수 등록
  await expect(page.getByText('접수 등록')).toBeVisible();
  // 접수 종류
  await expect(page.locator('label').filter({ hasText: '접수종류' })).toBeVisible();
  // 접수 부서
  await expect(page.getByText('접수부서')).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.getByRole('option', { name: '파트-세부_일반형_1' }).click();
  // 일자
  await expect(page.getByText('일자')).toBeVisible();
  // 방문시간
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.getByRole('option', { name: '9:00' }).click();
  // 예상 소요 시간
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.getByRole('menuitem', { name: '0시간 30분' }).click();
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '굿닥' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 접수 메모
  await expect(page.getByText('접수메모')).toBeVisible();
  await page.locator('pre').getByRole('paragraph').click();
  await page.locator('pre div').first().fill('접수메모 자동화');
  // 접수 완료
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('접수를 생성했습니다')).toBeVisible();
  await expect(page.getByText('접수차트 (1)')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  // 접수 조회 진입
  await expect(page.getByRole('button', { name: '접수 조회' })).toBeVisible();
  await page.getByRole('button', { name: '접수 조회' }).click();
  // 접수 조회
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 검색 > 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  // 통합차트 > 접수 조회
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 차트번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '차트번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '차트번호' }).click();
  await page.getByRole('textbox', { name: '차트번호' }).fill('1234567890');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '차트번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234567890' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 전화번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).click();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).fill('9998');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 전화번호 검색 > 메시지 전송
  await page.getByRole('cell', { name: '-9999-9998' }).getByRole('button').click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.locator('.send-message-wrapper > div > div:nth-child(2) > .MuiButtonBase-root').click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 전화번호 검색 > 메시지 전송 (카카오톡)
  await page.getByRole('cell', { name: '-9999-9998' }).locator('path').nth(1).click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 상세 필터 
  await expect(page.getByRole('button', { name: '+ 상세필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상세필터' }).click();
  // 접수 상태 검색
  await expect(page.getByText('접수상태').first()).toBeVisible();
  await page.locator('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '상담대기' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '접수상태' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담대기' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 접수 종류 검색
  await expect(page.getByText('접수종류').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '상담접수' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '접수종류' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담접수' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 부서 검색
  await expect(page.getByText('부서').first()).toBeVisible();
  await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.locator('li[role="option"][aria-selected="false"] input[type="checkbox"]').nth(0).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '부서', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 세부부서 검색
  await expect(page.getByText('세부부서').first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const inputField1 = page.locator('input[role="combobox"]').nth(3);
  await inputField1.fill('파트 - 세부_일반형_1');
  await page.getByRole('option', { name: '파트 - 세부_일반형_1' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '세부부서' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '세부_일반형_1' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 접수 방법 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '접수방법' })).toBeVisible();
  await page.locator('div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '당일접수' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '접수방법' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '당일접수' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 내원경로 검색
  await expect(page.getByText('내원경로').nth(1)).toBeVisible();
  await page.locator('div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '굿닥' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내원경로', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '굿닥' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 의사
  await expect(page.getByText('의사', { exact: true }).first()).toBeVisible();
  await page.locator('.extra-filter-wrapper > div > div:nth-child(2) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '의사', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' }).first()).toBeVisible();
  // 상담사
  await expect(page.getByText('상담사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '상담사', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 어시스트
  await expect(page.getByText('어시스트').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'nt2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'nt2' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 시/수술 카테고리
  await expect(page.getByText('카테고리').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const inputField2 = page.locator('input[role="combobox"]').nth(9);
  await inputField2.fill('성형');
  await page.getByRole('option', { name: '성형' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 시/수술명
  await expect(page.getByText('시/수술명').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '성형 - 눈매교정' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 신/구환 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('전체')).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 신/구환 > 신환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('신환')).toBeVisible();
  await page.getByRole('radio', { name: '신환' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 신/구환 > 구환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('구환')).toBeVisible();
  await page.getByRole('radio', { name: '구환' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '구환' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 상세필터 > 고객정보 필터
  await expect(page.getByRole('button', { name: '+ 고객정보 필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 고객정보 필터' }).click();
  // 고객정보 필터 > 생년 From 선택
  await expect(page.getByText('생년', { exact: true })).toBeVisible();
//   await page.getByText('생년-').click();
  const inputField3 = page.locator('input[aria-expanded="false"]').nth(11);
  await inputField3.click();
  await page.getByRole('option', { name: '1994년' }).click();
  // 고객정보 필터 > 생년 To 선택 후 검색
  await expect(page.getByText('생년', { exact: true })).toBeVisible();
  const inputField4 = page.locator('input[aria-expanded="false"]').nth(12);
  await inputField4.click();
  await page.getByRole('option', { name: '1995년' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-07-06' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 생일 검색
  await expect(page.getByText('생일')).toBeVisible();
  await page.getByRole('button', { name: '월' }).nth(1).click();
  await page.getByRole('option', { name: '07월' }).click();
  await page.getByRole('button', { name: '일' }).nth(1).click();
  await page.getByRole('option', { name: '06일' }).click();
  await expect(page.getByText('생일')).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-07-06' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 성별 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('div:nth-child(4) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 성별 > 여성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '여성' })).toBeVisible();
  await page.getByRole('radio', { name: '여성' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 성별 > 남성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.getByText('남성')).toBeVisible();
  await page.getByRole('radio', { name: '남성' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 내/외국인 > 전체 검색 
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내국인' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 내/외국인 > 내국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '내국인' })).toBeVisible();
  await page.getByRole('radio', { name: '내국인' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내국인' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 내/외국인 > 외국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.getByText('외국인', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 신환구분일 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 신환구분일 > 있음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('있음')).toBeVisible();
  await page.getByRole('radio', { name: '있음' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 신환구분일 > 없음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('없음')).toBeVisible();
  await page.getByRole('radio', { name: '없음' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 문자 수신 > 전체 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 문자 수신 > 수신 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('수신').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 문자 수신 > 거부 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('거부').first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('거부').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 마케팅 수신 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '거부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 마케팅 수신 > 수신 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('수신').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 마케팅 수신 > 거부 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('거부').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('거부').check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '거부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 최초 내원경로 검색
  await expect(page.locator('span').filter({ hasText: '최초내원경로' })).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '굿닥' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내원경로', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '굿닥' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 담당 상담사 검색
  await expect(page.getByText('담당상담사')).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '변준영' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '담당 상담사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '변준영' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible(); 
  // 고객정보 필터 > 담당 의사 검색
  await expect(page.getByText('담당의사')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'nt2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '담당 의사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 관심항목 검색
  await expect(page.getByText('관심항목').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(3) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const inputField5 = page.locator('input[role="combobox"]').nth(16);
  await inputField5.fill('성형');
  await page.getByRole('option', { name: '성형' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '관심항목' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 고객등급 검색
  await expect(page.getByText('고객등급').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'WELCOME', exact: true }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객등급' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'WELCOME' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 고객색상 검색
  await expect(page.getByText('고객색상').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').click();
  const optionElement1 = page.locator('li[role="option"]').first();
  await optionElement1.click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객색상' })).toBeVisible();
  await expect(page.locator('td:nth-child(33)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 직업 검색
  await expect(page.getByText('직업').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'IT, 인터넷' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '직업' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'IT, 인터넷' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 결혼여부 > 미입력 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미입력')).toBeVisible();
  await page.getByRole('checkbox', { name: '미입력' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 결혼여부 > 미혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미혼')).toBeVisible();
  await page.getByRole('checkbox', { name: '미혼' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 결혼여부 > 기혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '기혼' })).toBeVisible();
  await page.getByRole('checkbox', { name: '기혼' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '기혼' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 국가/지역 검색
  await expect(page.getByText('국가/지역').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '한국/서울' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '국가/지역' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '한국/서울' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 불만사항 검색
  await expect(page.getByText('불만사항').first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '주차' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '불만사항' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '주차' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객정보 필터 > 주소 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '주소' })).toBeVisible();
  await page.getByRole('textbox', { name: '주소/상세주소' }).click();
  await page.getByRole('textbox', { name: '주소/상세주소' }).fill('상세주소');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '주소', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상세주소 자동화 수정' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('접수조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  // 삭제
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(1).click();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업 
  await expect(page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();
});