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
  // 메인 화면
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await page.getByRole('button', { name: '로그인' }).click();
  // 고객 조회
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 통합차트
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 예약 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('예약 (0)').click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 예약 등록
  await page.getByRole('button', { name: '+ 예약등록' }).click();
  await expect(page.getByText('예약 등록')).toBeVisible();
  // 예약 종류
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click(); 
  await page.getByRole('option', { name: '상담예약' }).click();
  // 예약 부서 
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await expect(page.getByRole('option', { name: '파트-세부_일반형_1' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('option', { name: '파트-세부_일반형_1' }).click();
  await expect(page.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  // 방문 시간 선택
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '9:00' }).click();
  // 예상 소요 시간 
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^예상 소요시간시간분$/ }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '1시간 0분' }).click();
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '굿닥' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.locator('div:nth-child(5) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.locator('div:nth-child(5) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '김정연' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.locator('.sc-fUBkdm > .sc-iXzfSG > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '성형' }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.locator('.sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 예약 메모
  await expect(page.getByText('예약메모')).toBeVisible();
  await page.locator('pre').getByRole('paragraph').click();
  await page.locator('pre div').first().fill('예약 메모 입력 자동화');
  // 예약 저장
  await page.getByRole('button', { name: '저장' }).click(); // 저장 
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약을 등록했습니다')).toBeVisible();
  // 예약 등록 확인
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible(); // 상담내용
  await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  await expect(page.getByRole('cell', { name: '상담예약' })).toBeVisible(); // 예약 종류
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible(); // 부서
  await expect(page.getByRole('cell', { name: '세부_일반형_1' })).toBeVisible(); // 세부 부서
  await expect(page.getByRole('cell', { name: '김정연' }).nth(1)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: '김정연' }).nth(2)).toBeVisible(); // 의사
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(2)).toBeVisible(); // 어시스트
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '김정연' }).nth(3)).toBeVisible(); // 작성자
  // 예약 수정 
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').click();
  await expect(page.getByText('예약 수정')).toBeVisible();
  // 예약 종류 수정
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '진료예약' }).click();
  // 예약 부서 수정
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '파트-세부_일반형_2' }).click();
  // 방문시간 수정
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '9:30' }).click();
  // 예상 소요시간 수정
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^예상 소요시간시간분$/ }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '1시간 0분' }).click();
  // 내원경로 수정
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.locator('div:nth-child(3) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: 'SNS' }).click();
  // 의사 수정
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  // 상담사 수정
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.locator('div:nth-child(4) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 어시스트 수정
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.locator('div:nth-child(5) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '변준영' }).click();
  // 작성자 수정
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.locator('div:nth-child(5) > div:nth-child(2) > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '간편접수', exact: true }).click();
  // 시/수술 카테고리 추가 및 삭제
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // 시/수술 카테고리 추가
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.locator('.sc-fUBkdm > div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 예약 메모 수정
  await expect(page.getByText('예약메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('예약 메모 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '예약 메모 입력 자동화' }).fill('예약 메모 입력 자동화 수정');
  // 예약 수정 > 수정완료 버튼 선택 
  await page.getByRole('button', { name: '수정완료' }).click();
//   const checkmessage = await expect(page.getByText('[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?')).toBeVisible();
//   if (checkmessage) {
//     await expect(page.getByText('[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?')).toBeVisible();
//     await expect(page.getByText('다른 예약문자 취소는 [문자설정]에서 가능합니다')).toBeVisible();
//     await page.getByRole('button', { name: '미전송' }).click();
//     await expect(page.getByText('예약 및 예약문자를 변경했습니다')).toBeVisible();
//   }
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약 및 예약문자를 변경했습니다')).toBeVisible();
  // 예약 수정 확인
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화 수정' })).toBeVisible(); // 예약 메모
  await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  await expect(page.getByRole('cell', { name: '진료예약' })).toBeVisible(); // 예약 종류
  await expect(page.getByRole('cell', { name: '파트' })).toBeVisible(); // 부서
  await expect(page.getByRole('cell', { name: '세부_일반형_2' })).toBeVisible(); // 세부 부서 
  await expect(page.getByRole('cell', { name: '변준영' }).nth(2)).toBeVisible(); // 상담사
  await expect(page.getByRole('cell', { name: 'nt2' }).nth(2)).toBeVisible(); // 의사
  await expect(page.getByRole('cell', { name: '변준영' }).nth(3)).toBeVisible(); // 어시스트
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술 카테고리 추가
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible(); // 시/수술명 추가
  await expect(page.getByRole('cell', { name: '간편접수' })).toBeVisible(); // 작성자
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('button', { name: '예약 조회' })).toBeVisible();
  await page.getByRole('button', { name: '예약 조회' }).click();
  // 예약조회 
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 검색 > 통합차트 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  // 고객명 검색 > 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-Vu$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
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
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 전화번호 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).click();
  await page.getByRole('textbox', { name: '전화번호 뒤 4자리' }).fill('9998');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-9999-9998' })).toBeVisible();
  // 전화번호 > 메시지 전송 
  await page.getByRole('cell', { name: '-9999-9998' }).getByRole('button').click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.locator('.send-message-wrapper > div > div:nth-child(2) > .MuiButtonBase-root').click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 전화번호 > 메시지 전송 (카카오톡)
  await page.getByRole('cell', { name: '-9999-9998' }).locator('path').nth(1).click();
  await expect(page.getByRole('heading', { name: '메시지 전송' })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 상세필터
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  await page.getByRole('button', { name: '+ 상세필터' }).click();
  // 예약상태 검색
  await expect(page.getByText('예약상태').first()).toBeVisible();
  await page.locator('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '미방문' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '예약상태' })).toBeVisible();
  await expect(page.locator('td:nth-child(8)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 예약종류 검색
  await expect(page.getByText('예약종류').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '진료예약' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '예약종류' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '진료예약' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 예약시간 검색
  await expect(page.getByText('예약시간')).toBeVisible();
  // 예약시간 > 시작
  await page.getByRole('button', { name: 'HH' }).first().click();
  await page.getByRole('option', { name: '09시' }).click();
  await page.getByRole('button', { name: 'MM' }).first().click();
  await page.getByRole('option', { name: '30분' }).click();
  await expect(page.getByText('예약시간')).toBeVisible();
  // 예약시간 > 끝
  await page.getByRole('button', { name: 'HH' }).click();
  await page.getByRole('option', { name: '10시' }).click();
  await page.getByRole('button', { name: 'MM' }).click();
  await page.getByRole('option', { name: '30분' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '예약일시' })).toBeVisible();
//   await expect(page.getByRole('cell', { name: /09:30 - 10:30/ })).nth().toBeVisible();
//   await expect(page.locator('td[role="cell"][name*="09:30 - 10:30"]').nth(1)).toBeVisible(); // 여기 정규식 써서 확인 해보는데, 테스트 해보면서 확인 해봐야 함
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 부서 검색
  await expect(page.getByText('부서', { exact: true }).first()).toBeVisible();
  await page.locator('div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.locator('li[role="option"]:has-text("1파트")').nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '부서', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '파트' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 세부부서 검색
  await expect(page.getByText('세부부서').first()).toBeVisible();
  await page.locator('div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.locator('[placeholder="전체"]').nth(3).fill('세부_일반형_2');
  await page.getByRole('option', { name: '파트 - 세부_일반형_2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '세부부서' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '세부_일반형_2' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 내원경로 검색
  await expect(page.getByText('내원경로').nth(1)).toBeVisible();
  await page.locator('.extra-filter-wrapper > div > div:nth-child(2) > div > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: 'SNS' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '내원경로', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'SNS' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 의사 검색
  await expect(page.getByText('의사', { exact: true }).first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: 'nt2' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '의사', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'nt2' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 상담사 검색
  await expect(page.getByText('상담사').nth(1)).toBeVisible();
  await page.locator('div:nth-child(3) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '변준영' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '상담사', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '변준영' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 어시스트 검색
  await expect(page.getByText('어시스트').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '변준영' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '변준영' }).nth(1)).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 카테고리 검색
  await expect(page.getByText('카테고리').first()).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.locator('[role="combobox"]').nth(8).fill('성형');
  await expect(page.getByRole('option', { name: '성형' })).toBeVisible();
  await page.getByRole('option', { name: '성형' }).click();
  await page.locator('[role="combobox"]').nth(8).fill('피부 시술');
  await expect(page.getByRole('option', { name: '피부 시술' })).toBeVisible();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).first()).toBeVisible();
//   await expect(page.getByRole('cell', { name: '피부 시술' }))..toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 시/수술명 검색
  await expect(page.getByText('시/수술명').first()).toBeVisible();
  await page.locator('div:nth-child(6) > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '성형 - 눈매교정' }).click();
  await page.getByRole('option', { name: '피부 시술 - 인모드' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '인모드' }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 신/구환 > 전체 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('전체')).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 신/구환 > 신환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('신환')).toBeVisible();
  await page.getByRole('radio', { name: '신환' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신환', exact: true }).first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 신/구환 > 구환 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '신/구환' })).toBeVisible();
//   await expect(page.getByText('구환', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '구환' }).check();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '신/구환' })).toBeVisible();
  await expect(page.locator('td:nth-child(4)').first()).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 연동채널 검색
  await expect(page.getByText('연동채널').first()).toBeVisible();
  await page.locator('div:nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').first().click();
  await page.getByRole('option', { name: '네이버' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 초기화
  await page.getByRole('button', { name: '초기화' }).click();
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('예약조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객명_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '고객명_자동화' }).click();
  // 고객명 > 통합차트 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.getByText('예약차트 (1)')).toBeVisible();
  // 예약 삭제 
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click(); // 삭제 안내 팝업 > 삭제 확인
  await page.waitForTimeout(3000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});
