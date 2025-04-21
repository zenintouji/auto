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
  // 고객 조회
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 통합차트
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('button', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 예약 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 예약등록' })).toBeVisible();
  // 예약 등록
  await expect(page.getByRole('button', { name: '+ 예약등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 예약등록' }).click();
  await expect(page.getByText('예약 등록')).toBeVisible();
  // 예약 종류
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: '상담예약' }).click();
  // 예약 부서 
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.getByRole('option', { name: '상담-상담사A2' }).click();
  // 방문 시간 선택
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.getByRole('option', { name: '9:00', exact: true }).click();
  // 예상 소요 시간 
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.getByRole('menuitem', { name: '0시간 30분', exact: true }).click
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '전화상담' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '보톡스', exact: true }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '필러' }).click();
  // 예약 메모
  await expect(page.getByText('예약메모')).toBeVisible();
  await page.locator('pre').getByRole('paragraph').click();
  await page.locator('pre div').first().fill('예약 메모 입력 자동화');
  // 예약 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click(); // 저장 
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약을 등록했습니다')).toBeVisible();
  // 예약 등록 확인
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible(); // 상담내용
  await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  await expect(page.getByRole('cell', { name: '상담예약' })).toBeVisible(); // 예약 종류
  await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담사A2' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '보톡스' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '필러' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();// 작성자
  // 예약 수정 
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').click();
  await expect(page.getByText('예약 수정')).toBeVisible();
  // 예약 종류 수정
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.getByRole('combobox').nth(1).click();
  // await page.locator('.sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').first().click();
  await page.getByRole('option', { name: '진료예약' }).click();
  // 예약 부서 수정
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.getByRole('option', { name: '상담-상담사B' }).click();
  // 방문시간 수정
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.getByRole('option', { name: '9:30', exact: true }).click();
  // 예상 소요시간 수정
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.getByRole('menuitem', { name: '1시간 0분', exact: true }).click();
  // 내원경로 수정
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '기타' }).click();
  // 의사 수정
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '테스트의사' }).click();
  // 상담사 수정
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 어시스트 수정
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: '강슬아D' }).click();
  // 작성자 수정
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '홍명희' }).click();
  // 시/수술 카테고리 추가 및 삭제
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // 시/수술 카테고리 추가
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // await page.locator('.sc-fUBkdm > div:nth-child(2) > div > .sc-lnPyaJ > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).nth(1).click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  // await page.locator('div:nth-child(2) > div:nth-child(2) > .sc-lnPyaJ > .sc-hBtRBD > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).nth(1).click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 예약 메모 수정
  await expect(page.getByText('예약메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('예약 메모 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '예약 메모 입력 자동화' }).fill('예약 메모 입력 자동화 수정');
  // 예약 수정 > 수정완료 버튼 선택 
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약 및 예약문자를 변경했습니다')).toBeVisible();
  // 예약 수정 확인
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화 수정' })).toBeVisible(); // 예약 메모
  await expect(page.getByRole('cell', { name: '예약', exact: true })).toBeVisible(); // 예약 상태
  await expect(page.getByRole('cell', { name: '진료예약' })).toBeVisible(); // 예약 종류
  await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담사B' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '테스트의사' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '강슬아D' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '보톡스' }).nth(2)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '필러' })).toBeVisible(); // 시/수술 카테고리 추가
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible(); // 시/수술명 추가
  await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible(); // 작성자
  // 예약 취소
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '예약취소' })).toBeVisible();
  await page.getByRole('button', { name: '예약취소' }).click(); // 예약 취소 버튼 선택
  // 예약 취소 안내 팝업 진입 확인
  await expect(page.getByText('[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기')).toBeVisible();
  await expect(page.getByRole('button', { name: '미전송' })).toBeVisible();
  await page.getByRole('button', { name: '미전송' }).click(); // 미전송 선택
  await page.waitForTimeout(3000);
  // 예약 취소 확인
  await expect(page.getByText('예약이 취소되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약취소' })).toBeVisible();
  // 예약 삭제 
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click(); // 삭제 안내 팝업 > 삭제 확인
  await page.waitForTimeout(3000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});
