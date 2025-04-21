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
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('간호 (0)', { exact: true }).click();
  // 간호차트
  await expect(page.getByText('간호차트 (0)')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 간호등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 간호등록' }).click();
  // 간호 등록
  await expect(page.getByText('간호 등록')).toBeVisible();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 간호사
  await expect(page.locator('label').filter({ hasText: '간호사' })).toBeVisible();
  await page.getByRole('combobox', { name: '간호사를 선택하세요' }).click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 바이탈
  await expect(page.getByText('바이탈')).toBeVisible();
  // 바이탈 > 몸무게
  await expect(page.getByText('몸무게 (kg)')).toBeVisible();
  await page.locator('input[placeholder="-"]').nth(0).click();
  await page.locator('input[placeholder="-"]').nth(0).fill('10');
  await page.locator('input[placeholder="-"]').nth(1).click();
  await page.locator('input[placeholder="-"]').nth(1).fill('20');
  await page.locator('input[placeholder="-"]').nth(2).click();
  await page.locator('input[placeholder="-"]').nth(2).fill('30');
  await page.locator('input[placeholder="-"]').nth(3).click();
  await page.locator('input[placeholder="-"]').nth(3).fill('40');
  await page.locator('input[placeholder="-"]').nth(4).click();
  await page.locator('input[placeholder="-"]').nth(4).fill('50');
  await page.locator('input[placeholder="-"]').nth(5).click();
  await page.locator('input[placeholder="-"]').nth(5).fill('60');
  await page.locator('input[placeholder="-"]').nth(6).click();
  await page.locator('input[placeholder="-"]').nth(6).fill('70');
  await page.locator('input[placeholder="-"]').nth(7).click();
  await page.locator('input[placeholder="-"]').nth(7).fill('80');
  await page.locator('input[placeholder="-"]').nth(8).click();
  await page.locator('input[placeholder="-"]').nth(8).fill('90');
  await page.locator('input[placeholder="-"]').nth(9).click();
  await page.locator('input[placeholder="-"]').nth(9).fill('100');
  // 바이탈 > 혈압
  await expect(page.getByText('혈압 (mmHg)')).toBeVisible();
  await page.locator('input[placeholder="-"]').nth(10).click();
  await page.locator('input[placeholder="-"]').nth(10).fill('20');
  await page.locator('input[placeholder="-"]').nth(11).click();
  await page.locator('input[placeholder="-"]').nth(11).fill('30');
  await page.locator('input[placeholder="-"]').nth(12).click();
  await page.locator('input[placeholder="-"]').nth(12).fill('40');
  await page.locator('input[placeholder="-"]').nth(13).click();
  await page.locator('input[placeholder="-"]').nth(13).fill('50');
  await page.locator('input[placeholder="-"]').nth(14).click();
  await page.locator('input[placeholder="-"]').nth(14).fill('60');
  await page.locator('input[placeholder="-"]').nth(15).click();
  await page.locator('input[placeholder="-"]').nth(15).fill('70');
  await page.locator('input[placeholder="-"]').nth(16).click();
  await page.locator('input[placeholder="-"]').nth(16).fill('80');
  await page.locator('input[placeholder="-"]').nth(17).click();
  await page.locator('input[placeholder="-"]').nth(17).fill('90');
  await page.locator('input[placeholder="-"]').nth(18).click();
  await page.locator('input[placeholder="-"]').nth(18).fill('100');
  await page.locator('input[placeholder="-"]').nth(19).click();
  await page.locator('input[placeholder="-"]').nth(19).fill('110');
  // 투약 약품명
  await expect(page.getByText('투약 약품명')).toBeVisible();
  await page.getByRole('combobox', { name: '투약 약품명을 선택하세요' }).click();
  await page.getByRole('option', { name: '우루사' }).click();
  // 투약량
  await expect(page.getByText('투약량')).toBeVisible();
  await page.locator('input[placeholder="-"]').nth(60).click();
  await page.locator('input[placeholder="-"]').nth(60).fill('100');
  // 간호내용
  await expect(page.locator('label').filter({ hasText: '간호내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('간호내용 입력 자동화');
  // 간호차트 등록
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('간호를 생성했습니다')).toBeVisible();
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.getByText('간호차트 (1)')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('button', { name: '간호 조회', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '간호 조회', exact: true }).click();
  // 간호 조회
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 검색 > 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 차트번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '차트번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '차트번호' }).click();
  await page.getByRole('textbox', { name: '차트번호' }).fill('1234567890');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '차트번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234567890' })).toBeVisible();  
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 전화번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).click();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).fill('9998');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 전화번호 > 메시지 전송
  await page.getByRole('cell', { name: '-9999-9998' }).getByRole('button').click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.locator('.send-message-wrapper > div > div:nth-child(2) > .MuiButtonBase-root').click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 전화번호 > 메시지 전송 (카카오톡)
  await page.getByRole('cell', { name: '-9999-9998' }).locator('path').nth(1).click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 
  await expect(page.getByRole('button', { name: '+ 상세필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상세필터' }).click();
  await expect(page.getByRole('button', { name: '+ 상세필터' })).toBeVisible();
  // 상세 필터 > 접수방법 검색
  await expect(page.getByText('접수방법').first()).toBeVisible();
  await page.locator('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '접수없음' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '접수방법' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '접수없음' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 내원경로 검색
  await expect(page.getByText('내원경로').nth(1)).toBeVisible();
  await page.locator('div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내원경로' })).toBeVisible();
  await expect(page.locator('td:nth-child(8)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 의사 검색
  await expect(page.getByText('의사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '의사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 간호사 검색
  await expect(page.getByText('간호사').first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '간호사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'nt2' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 상담사 검색
  await expect(page.getByText('상담사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '상담사' })).toBeVisible();
  await expect(page.locator('td:nth-child(11)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 어시스트 검색
  await expect(page.getByText('어시스트').first()).toBeVisible();
  await page.locator('div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  await expect(page.locator('td:nth-child(12)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 카테고리 검색
  await expect(page.getByText('카테고리').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper > div > div:nth-child(2) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const selectCategory = page.locator('input[role="combobox"]').nth(6);
  await selectCategory.fill('성형');
  await page.getByRole('option', { name: '성형' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 시/수술명 검색
  await expect(page.getByText('시/수술명').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '성형 - 눈매교정' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 신/구환 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('전체')).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 신/구환 > 신환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('신환')).toBeVisible();
  await page.getByRole('radio', { name: '신환' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 신/구환 > 구환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByText('구환', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '구환' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터
  await expect(page.getByRole('button', { name: '+ 고객정보 필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 고객정보 필터' }).click();
  await expect(page.getByRole('button', { name: '+ 고객정보 필터' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 생년 검색
  await expect(page.getByText('생년', { exact: true })).toBeVisible();
  const selectBirth_From = page.locator('input[role="combobox"]').nth(8);
  await selectBirth_From.click();
  await page.getByRole('option', { name: '1994년' }).click();
  const selectBirth_To = page.locator('input[role="combobox"]').nth(9);
  await selectBirth_To.click();
  await page.getByRole('option', { name: '1995년' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-07-06' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 생일 검색
  await expect(page.getByText('생일')).toBeVisible();
  await page.getByRole('button', { name: '월' }).nth(1).click();
  await page.getByRole('option', { name: '07월' }).click();
  await page.getByRole('button', { name: '일' }).nth(1).click();
  await page.getByRole('option', { name: '06일' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-07-06' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('div:nth-child(4) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 여성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '여성' })).toBeVisible();
  await page.getByRole('radio', { name: '여성' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 남성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.getByText('남성')).toBeVisible();
  await page.getByRole('radio', { name: '남성' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내국인' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 내국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '내국인' })).toBeVisible();
  await page.getByRole('radio', { name: '내국인' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내국인' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 외국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.getByText('외국인', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.locator('td:nth-child(20)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 있음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('있음')).toBeVisible();
  await page.getByRole('radio', { name: '있음' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 없음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('없음', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '없음' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.locator('td:nth-child(20)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자수신 > 전체 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자수신 > 수신 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('수신').check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자수신 > 거부 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('거부').first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('거부').check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(3) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '거부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 수신 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('수신').check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 거부 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('거부').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('거부').check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '거부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 최초 내원경로 검색 
  await expect(page.locator('span').filter({ hasText: '최초내원경로' })).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '굿닥' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 담당 상담사 검색
  await expect(page.getByText('담당상담사')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '변준영' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 담당 의사 검색
  await expect(page.getByText('담당의사')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'nt2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 관심항목 검색
  await expect(page.getByText('관심항목').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(3) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const selectInteresting = page.locator('input[role="combobox"]').nth(13);
  await selectInteresting.fill('성형');
  await page.getByRole('option', { name: '성형' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 고객등급 검색 
  await expect(page.getByText('고객등급').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'WELCOME', exact: true }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객등급' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'WELCOME' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 고객색상 검색
  await expect(page.getByText('고객색상').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.locator('li[role="option"]').nth(0).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 직업 검색
  await expect(page.getByText('직업').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'IT, 인터넷' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '직업' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'IT, 인터넷' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 미입력 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미입력')).toBeVisible();
  await page.getByRole('checkbox', { name: '미입력' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 미혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미혼')).toBeVisible();
  await page.getByRole('checkbox', { name: '미혼' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 기혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '기혼' })).toBeVisible();
  await page.getByRole('checkbox', { name: '기혼' }).check();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '기혼' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 국가/지역 검색
  await expect(page.getByText('국가/지역').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '한국/서울' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '국가/지역' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '한국/서울' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 불만사항 검색
  await expect(page.getByText('불만사항').first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '주차' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '불만사항' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '주차' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 주소 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '주소' })).toBeVisible();
  await page.getByRole('textbox', { name: '주소/상세주소' }).click();
  await page.getByRole('textbox', { name: '주소/상세주소' }).fill('상세주소');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '주소', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상세주소 자동화 수정' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: '간호 조회' })).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 검색 > 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await page.locator('.sc-eeDRCY').first().click();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // 삭제
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업
  await expect(page.getByText('삭제 후 복구 불가능합니다. 그래도 진행하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();

















});