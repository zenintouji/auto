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
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('수납 (0)').click();
  // 통합차트 > 수납
  await expect(page.getByText('수납차트 (0)')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 수납등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 수납등록' }).click();
  // 수납 등록
  await expect(page.getByText('수납 등록')).toBeVisible();
  // 수납 등록 > 시/수술 추가 
  await expect(page.getByRole('button', { name: '+ 시/수술 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 시/수술 추가' }).click();
  // 수납 등록 > 수납항목 추가 팝업
  await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  await expect(page.getByRole('button', { name: '시/수술 추가', exact: true })).toBeVisible();
  // 수납 등록 > 수납항목 추가 팝업 > 시/수술 카테고리 추가
  await page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' }).click();
  await page.getByRole('option', { name: '수납자동화 카테고리' }).click();
  // 수납 등록 > 수납항목 추가 팝업 > 시/수술명 추가
  await page.getByRole('combobox', { name: '시/수술명을 검색하세요' }).click();
  await page.getByRole('option', { name: '수납자동화 시/수술명' }).click();
  await page.getByRole('button', { name: '검색' }).click();
  await page.getByRole('button', { name: '추가', exact: true }).click();
  await expect(page.locator('#app').getByRole('cell', { name: '수납자동화 카테고리' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button').click();
  // 수납 등록 > 제품 추가
  await expect(page.getByRole('button', { name: '+ 제품 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 제품 추가' }).click();
  // 수납 등록 > 수납항목 추가 팝업
  await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  await expect(page.getByRole('button', { name: '제품 추가', exact: true })).toBeVisible();
  // 수납 등록 > 수납항목 추가 팝업 > 제품 추가
  await page.getByRole('textbox', { name: '제품명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '제품명을 입력하세요' }).fill('자동화');
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await page.getByRole('button', { name: '추가', exact: true }).first().click();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  await page.getByRole('button', { name: '추가', exact: true }).nth(1).click();
  await expect(page.locator('#app').getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button').click();
  // 수납 등록 
  await expect(page.getByText('수납 등록')).toBeVisible();
  // 수납 등록 > 시/수술 카테고리 영역
  await expect(page.getByRole('cell', { name: '카테고리' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '시/수술명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '횟수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '과세' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '금액 (VAT제외)' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '650,000 650,000' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '할인' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '청구액' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '650,000', exact: true })).toBeVisible();
  // 수납 등록 > 제품 영역
  await expect(page.getByRole('cell', { name: '제품명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '개수', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '과세' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '금액 (VAT제외)' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '45,455' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '100,000 100,000' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '할인' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '청구액' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '50,000', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '100,000', exact: true })).toBeVisible();
  // 수납 등록 > 결제수단 입력 영역
  await expect(page.getByText('결제수단 입력')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: /^과세$/ })).toBeVisible();
  await expect(page.getByText('비과세', { exact: true })).toBeVisible();
  // 수납 등록 > 수납일
  await expect(page.getByText('수납일')).toBeVisible();
  // 수납 등록 > 담당자
  await expect(page.locator('label').filter({ hasText: '담당자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 수납 등록 > 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 수납 등록 > 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '굿닥' }).click();
  // 수납 등록 > 수납메모
  await expect(page.getByText('수납메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('수납 메모 입력 자동화');
  await expect(page.getByRole('button', { name: '저장', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  // 수납 등록 > 저장 
  await expect(page.getByText('수납을 생성했습니다')).toBeVisible();
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.getByText('수납차트 (1)')).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('button', { name: '수납 조회' })).toBeVisible();
  // 수납 조회
  await page.getByRole('button', { name: '수납 조회' }).click();
  // 수납 조회 > 청구일 기준
  await expect(page.getByRole('tab', { name: '청구일 기준' })).toBeVisible();
  // 수납조회 내역 합계
  await expect(page.getByText('수납조회 내역 합계')).toBeVisible();
  await expect(page.getByRole('cell', { name: '청구 건수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '금액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '할인' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '총 청구액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '매출액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '총 수납액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '카드' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '계좌이체' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '현금', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '환불액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '총 환불액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '카드' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '계좌이체' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '현금', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '미수액' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '현금영수증' }).first()).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  const button = page.locator('button:has-text("조회")').nth(1);
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 검색 > 통합차트 
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 차트번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '차트번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '차트번호' }).click();
  await page.getByRole('textbox', { name: '차트번호' }).fill('1234567890');
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '차트번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234567890' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 전화번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).click();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).fill('9998');
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 차트번호 > 메시지 전송
  await page.getByRole('cell', { name: '-9999-9998' }).getByRole('button').click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.locator('.send-message-wrapper > div > div:nth-child(2) > .MuiButtonBase-root').click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 차트번호 > 메시지 전송 (카카오톡)
  await page.getByRole('cell', { name: '-9999-9998' }).locator('path').nth(1).click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터
  await expect(page.getByRole('button', { name: '+ 상세필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상세필터' }).click();
  // 상세 필터 > 수납상태 검색
  await expect(page.getByText('수납상태').first()).toBeVisible();
  await page.locator('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미수' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '수납상태' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 카테고리 검색
  await expect(page.getByText('카테고리').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const selectCategory = page.locator('input[role="combobox"]').nth(1);
  await selectCategory.fill('수납자동화 카테고리');
  await page.getByRole('option', { name: '수납자동화 카테고리' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '카테고리', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 카테고리' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 시/수술명 검색
  await expect(page.getByText('시/수술명', { exact: true })).toBeVisible();
  await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '수납자동화 카테고리 - 수납자동화 시/수술명' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '시/수술명(제품명)' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 시/수술명' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 제품명 검색
  await expect(page.getByText('제품명', { exact: true })).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const selectProduct = page.locator('input[role="combobox"]').nth(3);
  await selectProduct.fill('자동화');
  await page.getByRole('option', { name: '수납자동화 제품명 과세' }).click();
  await selectProduct.fill('자동화');
  await page.getByRole('option', { name: '수납자동화 제품명 비과세' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 담당자 검색
  await expect(page.getByText('담당자').nth(1)).toBeVisible();
  await page.locator('div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const selectManager = page.locator('input[role="combobox"]').nth(4);
  await selectManager.fill('김정연');
  await page.getByRole('option', { name: '김정연' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '담당자' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 신/구환 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('전체')).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 신/구환 > 신환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('신환')).toBeVisible();
  await page.getByRole('radio', { name: '신환' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 신/구환 > 구환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('구환')).toBeVisible();
  await page.getByRole('radio', { name: '구환' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 접수 방법 검색
  await expect(page.getByText('접수방법').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper > div > div:nth-child(2) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '접수없음' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '접수방법' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '접수없음' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 내원경로 검색
  await expect(page.getByText('내원경로').nth(1)).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '굿닥' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '내원경로', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '굿닥' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 의사 검색
  await expect(page.getByText('의사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '의사' })).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(11)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 상담사 검색
  await expect(page.getByText('상담사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '상담사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김정연' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 어시스트 검색
  await expect(page.getByText('어시스트').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미입력' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(13)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 할인사유 검색 
  await expect(page.getByText('할인사유').first()).toBeVisible();
  await page.locator('div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '담당자 권한 할인' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '할인사유' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터
  await expect(page.getByRole('button', { name: '+ 고객정보 필터' })).toBeVisible();
  await page.getByRole('button', { name: '+ 고객정보 필터' }).click();
  // 상세 필터 > 고객정보 필터 > 생년 검색
  await expect(page.getByText('생년', { exact: true })).toBeVisible();
  const selectBirth_From = page.locator('input[role="combobox"]').nth(11);
  await selectBirth_From.click();
  await page.getByRole('option', { name: '1994년' }).click();
  const selectBirth_To = page.locator('input[role="combobox"]').nth(12);
  await selectBirth_To.click();
  await page.getByRole('option', { name: '1995년' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-07-06' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 생일 검색
  await expect(page.getByText('생일')).toBeVisible();
  await page.getByRole('button', { name: '월' }).nth(1).click();
  await page.getByRole('option', { name: '07월' }).click();
  await page.getByRole('button', { name: '일' }).nth(1).click();
  await page.getByRole('option', { name: '06일' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-07-06' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('div:nth-child(4) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 여성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '여성' })).toBeVisible();
  await page.getByRole('radio', { name: '여성' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '여성' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 성별 > 남성 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.getByText('남성')).toBeVisible();
  await page.getByRole('radio', { name: '남성' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '성별' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내국인' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 내국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '내국인' })).toBeVisible();
  await page.getByRole('radio', { name: '내국인' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내국인' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 내/외국인 > 외국인 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.getByText('외국인', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '내/외국인' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.locator('div:nth-child(2) > div > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.locator('td:nth-child(39)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 있음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('있음')).toBeVisible();
  await page.getByRole('radio', { name: '있음' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 신환구분일 > 없음 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신환구분일' })).toBeVisible();
  await expect(page.getByText('없음', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '없음' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '신환구분일' })).toBeVisible();
  await expect(page.locator('td:nth-child(39)')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자 수신 > 전체 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자 수신 > 수신 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('수신').check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '동의' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 문자 수신 > 거부 검색
  await expect(page.getByText('문자 수신')).toBeVisible();
  await expect(page.getByText('거부').first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^문자 수신전체수신거부$/ }).getByLabel('거부').check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '문자수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.locator('div:nth-child(3) > .MuiFormGroup-root > label > .MuiTypography-root').first()).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '거부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 수신 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('수신', { exact: true }).nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('수신').check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 마케팅 수신 > 거부 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '마케팅 수신' })).toBeVisible();
  await expect(page.getByText('거부').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^마케팅 수신전체수신거부$/ }).getByLabel('거부').check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '마케팅 수신' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '거부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 최초 내원경로 검색
  await expect(page.locator('span').filter({ hasText: '최초내원경로' })).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '굿닥' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '최초 내원경로' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '굿닥' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 담당 상담사 검색
  await expect(page.getByText('담당상담사')).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '변준영' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 담당 의사 검색
  await expect(page.getByText('담당의사')).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(2) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'nt2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 관심항목 검색
  await expect(page.getByText('관심항목').first()).toBeVisible();
  await page.locator('.extra-filter-wrapper-2 > div > div:nth-child(3) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  const selectInteresting = page.locator('input[role="combobox"]').nth(16);
  await selectInteresting.fill('성형');
  await page.getByRole('option', { name: '성형' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '관심항목' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 고객등급 검색
  await expect(page.getByText('고객등급').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'WELCOME', exact: true }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '고객등급' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'WELCOME' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 고객색상 검색
  await expect(page.getByText('고객색상')).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.locator('li[role="option"]').first().click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 직업 검색
  await expect(page.getByText('직업').first()).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: 'IT, 인터넷' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '직업' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'IT, 인터넷' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 미입력 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미입력')).toBeVisible();
  await page.getByRole('checkbox', { name: '미입력' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 미혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.getByText('미혼')).toBeVisible();
  await page.getByRole('checkbox', { name: '미혼' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 결혼여부 > 기혼 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '결혼여부' })).toBeVisible();
  await expect(page.locator('span').filter({ hasText: '기혼' })).toBeVisible();
  await page.getByRole('checkbox', { name: '기혼' }).check();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '결혼여부' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '기혼' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 국가/지역 검색
  await expect(page.getByText('국가/지역').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '한국/서울' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '국가/지역' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '한국/서울' })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 불만사항 검색
  await expect(page.getByText('불만사항').first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('option', { name: '주차' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '불만사항' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '주차' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 상세 필터 > 고객정보 필터 > 주소 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '주소' })).toBeVisible();
  await page.getByRole('textbox', { name: '주소/상세주소' }).click();
  await page.getByRole('textbox', { name: '주소/상세주소' }).fill('상세주소');
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '주소', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상세주소 자동화 수정' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 검색 > 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('수납조회 내역', { exact: true })).toBeVisible();
  await page.locator('div:nth-child(3) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // 삭제
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업
  await expect(page.getByText('수납에 연계된 시수술∙피부관리 내역이 있을 경우 함께 삭제됩니다.수납차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [수납취소]로')).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});