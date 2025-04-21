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
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 수납 진입
  await page.getByText('수납 (0)').click();
  await expect(page.getByText('수납차트 (0)')).toBeVisible();
  await expect(page.getByText('총 청구액0')).toBeVisible();
  await expect(page.getByText('총 매출액')).toBeVisible();
  await expect(page.getByText('총 수납액')).toBeVisible();
  await expect(page.getByText('총 환불액')).toBeVisible();
  await expect(page.getByText('실시간 미수액')).toBeVisible();
  await expect(page.getByText('총 할인금액')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 수납등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 수납등록' }).click();
  // 수납등록
  await expect(page.getByText('수납 등록')).toBeVisible();
  // 시/수술 추가
  await expect(page.getByRole('button', { name: '+ 시/수술 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 시/수술 추가' }).click();
  // 수납항목 추가 팝업
  await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  await expect(page.getByRole('button', { name: '시/수술 추가', exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' }).click();
  await page.getByRole('option', { name: '수납자동화 카테고리' }).click();
  await page.getByRole('combobox', { name: '시/수술명을 검색하세요' }).click();
  await page.getByRole('option', { name: '수납자동화 시/수술명' }).click();
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('tooltip').getByRole('button', { name: '추가', exact: true })).toBeVisible();
  await page.getByRole('tooltip').getByRole('button', { name: '추가', exact: true }).click();
  // 수납항목 추가 팝업 닫기
  await expect(page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button').click();
  // 수납항목 추가 확인
  await expect(page.locator('#app').getByRole('cell', { name: '수납자동화 카테고리' })).toBeVisible();
  await expect(page.locator('#app').getByRole('cell', { name: '수납자동화 시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '650,000 650,000' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible();
  await expect(page.locator('#app').getByRole('cell', { name: '650,000', exact: true })).toBeVisible(); // 청구액
  // 제품 추가
  await expect(page.getByRole('button', { name: '+ 제품 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 제품 추가' }).click();
  // 수납항목 추가 팝업
  await expect(page.getByRole('heading', { name: '수납항목 추가' })).toBeVisible();
  await expect(page.getByRole('button', { name: '제품 추가', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '제품명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '제품명을 입력하세요' }).fill('자동화');
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  await expect(page.getByRole('button', { name: '추가', exact: true }).nth(0)).toBeVisible();
  await page.getByRole('button', { name: '추가', exact: true }).nth(0).click();
  await expect(page.getByRole('button', { name: '추가', exact: true }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '추가', exact: true }).nth(1).click();
  // 수납항목 추가 팝업 닫기
  await expect(page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^수납항목 추가$/ }).getByRole('button').click();
  // 제품 추가 확인
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible(); // 제품명
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '45,455' })).toBeVisible(); // 금액, VAT 제외
  await expect(page.getByRole('cell', { name: '100,000 100,000' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(1)).toBeVisible(); // 할인
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '50,000', exact: true })).toBeVisible(); // 청구액
  await expect(page.getByRole('cell', { name: '100,000', exact: true })).toBeVisible();
  // 결제 수단 입력
  await expect(page.getByText('결제수단 입력')).toBeVisible();
  // 수납일
  await expect(page.getByText('수납일')).toBeVisible();
  // 담당자
  await expect(page.locator('label').filter({ hasText: '담당자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김지현' }).click();
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '굿닥', exact: true }).click();
  // 수납메모
  await expect(page.getByText('수납메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('수납메모 > 수납대기');
  // 수납대기 저장
  await expect(page.getByRole('button', { name: '수납대기로 저장' })).toBeVisible();
  await page.getByRole('button', { name: '수납대기로 저장' }).click();
  await expect(page.getByText('수납을 생성했습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납대기', exact: true })).toBeVisible();
  // 수납대기 확인
  await expect(page.getByRole('cell', { name: '수납대기', exact: true })).toBeVisible(); // 상태
  await expect(page.getByRole('cell', { name: '수납자동화 카테고리' })).toBeVisible(); // 카테고리
  await expect(page.getByRole('cell', { name: '수납자동화 시/수술명' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible(); // 회차
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(3)).toBeVisible();
  await expect(page.getByRole('cell', { name: '비과세' }).first()).toBeVisible(); // 과세여부
  await expect(page.getByRole('cell', { name: '과세', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '비과세' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '(650,000)' })).toBeVisible(); // 금액, VAT 제외
  await expect(page.getByRole('cell', { name: '(45,455)' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '(100,000)' })).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(11)')).toBeVisible();
  await expect(page.locator('tr:nth-child(2) > td:nth-child(6)').nth(1)).toBeVisible();
  await expect(page.locator('tr:nth-child(3) > td:nth-child(6)').nth(0)).toBeVisible();
  await expect(page.getByRole('cell', { name: '800,000' })).toBeVisible(); // 청구액
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(13)')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(14)')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(15)')).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(16)')).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납메모 > 수납대기' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김지현' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible(); // 담당자
  // 수납대기 카테고리 선택
  await expect(page.getByRole('button', { name: '수납대기' })).toBeVisible();
  await page.getByRole('button', { name: '수납대기' }).click();
  await expect(page.getByRole('cell', { name: '수납대기', exact: true })).toBeVisible();
  // 마우스를 오버한 후 버튼이 보일 때까지 기다리고 클릭
  await page.locator('div:nth-child(2) > table > tbody > tr > td:nth-child(13)').hover();
  await page.getByRole('button', { name: '수납처리' }).click();
  // 수납 수정
  await expect(page.getByText('수납 수정')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 시/수술 추가' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 제품 추가' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 카테고리' }).nth(1)).toBeVisible(); // 카테고리
  await expect(page.getByRole('cell', { name: '수납자동화 시/수술명' }).nth(1)).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '650,000 650,000' })).toBeVisible(); // 금액, VAT 제외
  await expect(page.getByRole('cell', { name: '650,000', exact: true })).toBeVisible(); // 청구액
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' }).nth(1)).toBeVisible(); // 제품명
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '50,000 45,455' })).toBeVisible(); // 금액, VAT 제외
  await expect(page.getByRole('cell', { name: '100,000 100,000' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '50,000', exact: true })).toBeVisible(); // 청구액
  await expect(page.getByRole('cell', { name: '100,000', exact: true })).toBeVisible();
  // 결제수단 입력
  await expect(page.getByText('결제수단 입력')).toBeVisible();
  // 과세
  await expect(page.getByRole('paragraph').filter({ hasText: /^과세$/ })).toBeVisible();
  // 카드
  await expect(page.getByText('카드').nth(1)).toBeVisible();
  // 카드 > 전액 선택
  await page.locator('.sc-eifrsQ').first().click();
  // 수납일
  await expect(page.locator('label').filter({ hasText: '수납일' })).toBeVisible();
  // 담당자
  await expect(page.locator('label').filter({ hasText: '담당자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 상담자
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: 'SNS' }).nth(0).click();
  // 수납메모
  await expect(page.getByText('수납메모', { exact: true })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('수납메모 > 수납대기').click();
  await page.locator('pre div').filter({ hasText: '수납메모 > 수납대기' }).fill('수납메모 > 수납대기 > 미수');
  // 저장 버튼 선택
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  // 저장 안내 팝업
  await expect(page.getByText('담당자: 노윤이')).toBeVisible();
  await expect(page.getByText('위 내용으로 결산/통계 내용이 업데이트 됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('수납을 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // 수납차트 > 수납대기 확인
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 수납차트 > 미수 확인
  await expect(page.getByRole('button', { name: '미수' })).toBeVisible();
  await page.getByRole('button', { name: '미수' }).click();
  await expect(page.getByRole('cell', { name: '미수', exact: true })).toBeVisible(); // 상태
  await expect(page.getByRole('cell', { name: '수납자동화 카테고리' })).toBeVisible(); // 카테고리
  await expect(page.getByRole('cell', { name: '수납자동화 시/수술명' })).toBeVisible(); // 시/수술명(제품명)
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수납자동화 제품명 비과세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible(); // 회차(개수)
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(3)).toBeVisible();
  await expect(page.getByRole('cell', { name: '비과세' }).first()).toBeVisible(); // 과세여부
  await expect(page.getByRole('cell', { name: '과세', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '비과세' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '(650,000)' })).toBeVisible(); // 금액(VAT 제외)
  await expect(page.getByRole('cell', { name: '(45,455)' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '(100,000)' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true }).first()).toBeVisible(); // 할인
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(3)).toBeVisible();
  await expect(page.getByRole('cell', { name: '800,000' })).toBeVisible(); // 청구액
  await expect(page.getByRole('cell', { name: '50,000', exact: true }).first()).toBeVisible(); // 매출액
  await expect(page.getByRole('cell', { name: '50,000', exact: true }).nth(1)).toBeVisible(); // 수납액
  await expect(page.getByRole('cell', { name: '0', exact: true }).nth(1)).toBeVisible(); // 환불액
  await expect(page.getByRole('cell', { name: '750,000' })).toBeVisible(); // 미수액
  await expect(page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수' })).toBeVisible(); // 메모
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible(); // 담당자
  // 수납차트 > 펼치기
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').first().click();
  // 결제 영역
  await expect(page.getByRole('cell', { name: '수납', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'dev', exact: true })).toBeVisible(); // 수납자
  await expect(page.getByRole('cell', { name: '카드', exact: true })).toBeVisible(); // 결제
  await expect(page.getByRole('cell', { name: '-', exact: true })).toBeVisible(); // 카드사/은행명
  await expect(page.getByRole('cell', { name: '+ 50,000', exact: true })).toBeVisible(); // 금액
  await expect(page.getByRole('cell', { name: '미발행', exact: true })).toBeVisible(); // 현금 영수증
  // 마우스 오버
  await page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수' }).hover();
  await page.getByRole('button', { name: '수납취소' }).nth(1).click();
  // 수납 취소
  await expect(page.getByText('전체 수납(미수)취소 처리됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('수납취소 처리되었습니다')).toBeVisible();
  // 수납차트 > 미수 확인
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 수납차트 > 수납취소 카테고리 이동
  await expect(page.getByRole('button', { name: '수납취소' })).toBeVisible();
  await page.getByRole('button', { name: '수납취소' }).click();
  // 수납취소 상태 확인
  await expect(page.getByRole('cell', { name: '수납취소', exact: true })).toBeVisible();
  // 마우스 오버
  await page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수' }).hover();
  await page.getByRole('button', { name: '수납처리' }).click();
  // 수납 수정
  await expect(page.getByText('수납 수정')).toBeVisible();
  // 결제수단 입력
  await expect(page.getByText('결제수단 입력')).toBeVisible();
  // 과세
  await expect(page.getByRole('paragraph').filter({ hasText: /^과세$/ })).toBeVisible();
  // 과세 > 카드 > 전액 선택
  await page.locator('.sc-eifrsQ').first().click();
  // 비과세
  await expect(page.getByRole('paragraph').filter({ hasText: '비과세' })).toBeVisible();
  // 비과세 > 현금
  await page.getByRole('textbox', { name: 'CashPaymentField' }).nth(1).click();
  await page.getByRole('textbox', { name: 'CashPaymentField' }).nth(1).fill('750,000');
  // 현금영수증 
  await expect(page.getByText('현금영수증(계좌이체, 현금)').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^비과세현금영수증\(계좌이체, 현금\)$/ }).getByLabel('현금영수증(계좌이체, 현금)').check();
  // 수납메모
  await expect(page.getByText('수납메모', { exact: true })).toBeVisible();
  await page.locator('pre').getByText('수납메모 > 수납대기 > 미수').click();
  await page.locator('pre div').filter({ hasText: '수납메모 > 수납대기 > 미수' }).fill('수납메모 > 수납대기 > 미수 > 완납');
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  // 저장 안내 팝업
  await expect(page.getByText('담당자: 노윤이')).toBeVisible();
  await expect(page.getByText('위 내용으로 결산/통계 내용이 업데이트 됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('수납을 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 수납차트 > 완납 선택
  await expect(page.getByRole('button', { name: '완납' })).toBeVisible();
  await page.getByRole('button', { name: '완납' }).click();
  await expect(page.getByRole('cell', { name: '완납', exact: true })).toBeVisible(); 
  // 결제 영역 확인
  await expect(page.getByRole('cell', { name: '수납', exact: true }).first()).toBeVisible(); // 구분
  await expect(page.getByRole('cell', { name: 'dev', exact: true }).first()).toBeVisible(); // 수납자
  await expect(page.getByRole('cell', { name: '카드' }).nth(2)).toBeVisible(); // 결제
  await expect(page.getByRole('cell', { name: '현금', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '+' }).nth(1)).toBeVisible(); // 금액 
  await expect(page.getByRole('cell', { name: '+ 750,000', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '미발행' }).nth(1)).toBeVisible(); // 현금 영수증 
  await expect(page.getByRole('cell', { name: '발행', exact: true })).toBeVisible();
  // 환불 
  await page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수 > 완납' }).hover();
  await page.getByRole('button', { name: '환불', exact: true }).click();
  // 환불 진입
  await expect(page.getByRole('heading', { name: '환불 close' })).toBeVisible();
  // 과세
  await expect(page.getByLabel('환불').getByText('과세', { exact: true })).toBeVisible();
  // 카드 > 전액 선택
  await page.getByRole('button', { name: '전액' }).first().click();
  // 환불일
  await expect(page.getByText('환불일')).toBeVisible();
  // 담당자
  await expect(page.getByLabel('환불').getByText('담당자')).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 환불 > 수납 메모
  await expect(page.getByText('수납메모', { exact: true })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByLabel('환불').getByText('수납메모 > 수납대기 > 미수 > 완납').click();
  await page.locator('pre div').filter({ hasText: '수납메모 > 수납대기 > 미수 > 완납' }).fill('수납메모 > 수납대기 > 미수 > 완납 > 부분환불');
  // 환불 완료
  await expect(page.getByRole('button', { name: '환불완료' })).toBeVisible();
  await page.getByRole('button', { name: '환불완료' }).click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 수납차트 > 부분환불 진입
  await expect(page.getByRole('button', { name: '부분환불' })).toBeVisible();
  await page.getByRole('button', { name: '부분환불' }).click();
  await expect(page.getByRole('cell', { name: '부분환불', exact: true })).toBeVisible();
  // 결제 영역 확인
  await expect(page.getByRole('cell', { name: '환불', exact: true })).toBeVisible(); // 구분
  await expect(page.getByRole('cell', { name: 'dev', exact: true }).first()).toBeVisible(); // 수납자
  await expect(page.getByRole('cell', { name: '카드' }).nth(2)).toBeVisible(); // 결제
  await expect(page.getByRole('cell', { name: '- 50,000', exact: true })).toBeVisible(); // 금액
  await expect(page.getByRole('cell', { name: '미발행' }).nth(1)).toBeVisible(); // 현금 영수증
  // 환불 
  await page.getByRole('cell', { name: '수납메모 > 수납대기 > 미수 > 완납 > 부분환불' }).hover();
  await page.getByRole('button', { name: '환불', exact: true }).click();
  // 환불 진입
  await expect(page.getByRole('heading', { name: '환불 close' })).toBeVisible();
  // 비과세
  await expect(page.getByLabel('환불').getByText('비과세')).toBeVisible();
  // 환불액
  await expect(page.getByText('환불액').nth(3)).toBeVisible();
  await page.getByRole('button', { name: '전액' }).nth(3).click();
  // 환불일
  await expect(page.getByText('환불일')).toBeVisible();
  // 담당자
  await expect(page.getByLabel('환불').getByText('담당자')).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 수납메모
  await expect(page.getByText('수납메모', { exact: true })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByLabel('환불').getByText('수납메모 > 수납대기 > 미수 > 완납 > 부분환불').click();
  await page.locator('pre div').filter({ hasText: '수납메모 > 수납대기 > 미수 > 완납 > 부분환불' }).fill('수납메모 > 수납대기 > 미수 > 완납 > 부분환불 > 전체환불');
  // 환불완료 선택
  await expect(page.getByRole('button', { name: '환불완료' })).toBeVisible();
  await page.getByRole('button', { name: '환불완료' }).click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 수납차트 > 전체환불 진입
  await expect(page.getByRole('button', { name: '전체환불' })).toBeVisible();
  await page.getByRole('button', { name: '전체환불' }).click();
  await expect(page.getByRole('cell', { name: '전체환불', exact: true })).toBeVisible();
  // 결제 영역 확인
  await expect(page.getByRole('cell', { name: '환불', exact: true }).first()).toBeVisible(); // 구분
  await expect(page.getByRole('cell', { name: 'dev', exact: true }).first()).toBeVisible(); // 수납자
  await expect(page.getByRole('cell', { name: '현금' }).nth(2)).toBeVisible(); // 결제
  await expect(page.getByRole('cell', { name: '- 750,000', exact: true })).toBeVisible(); // 금액
  await expect(page.getByRole('cell', { name: '발행', exact: true }).first()).toBeVisible(); // 현금 영수증
  // 수납차트 > 전체
  await expect(page.getByRole('button', { name: '전체', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '전체', exact: true }).click();
  await expect(page.getByRole('cell', { name: '전체환불', exact: true })).toBeVisible();
  await expect(page.locator('div:nth-child(2) > table > tbody > tr > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > table > tbody > tr > td').first().click();
  // 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('수납에 연계된 시수술∙피부관리 내역이 있을 경우 함께 삭제됩니다.수납차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [수납취소]로')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});