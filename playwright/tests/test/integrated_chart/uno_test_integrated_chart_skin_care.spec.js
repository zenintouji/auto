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
  // 통합 차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 피부관리
  await page.getByText('피부관리 (0)').click();
  await expect(page.getByText('피부관리차트 (0)')).toBeVisible();
  await expect(page.getByText('잔여 있는 피부관리 내역이 없습니다')).toBeVisible();
  await expect(page.getByText('피부관리 진행내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 시/수술 추가' })).toBeVisible();
  await page.getByRole('button', { name: '+ 시/수술 추가' }).click();
  // 시/수술 추가 팝업
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' }).click();
  await page.getByRole('option', { name: '성형', exact: true }).click();
  await page.getByRole('combobox', { name: '시/수술명을 검색하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
  await page.getByRole('button', { name: '추가' }).click();
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  // 피부관리 차트
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible(); // 잔여
  // 피부관리 진행
  await expect(page.getByRole('button', { name: '+ 피부관리 진행' })).toBeVisible();
  await page.getByRole('button', { name: '+ 피부관리 진행' }).click();
  await expect(page.getByText('피부관리 진행', { exact: true })).toBeVisible();
  // 피부관리사
  await expect(page.locator('label').filter({ hasText: '피부관리사' })).toBeVisible();
  await page.getByRole('combobox', { name: '피부관리사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '황범석' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 진행 시/수술
  await expect(page.getByText('진행 시/수술')).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(3)).toBeVisible();
  await expect(page.getByRole('cell', { name: '회차' }).nth(4)).toBeVisible(); // 회차
  // 피부관리내용
  await expect(page.locator('label').filter({ hasText: '피부관리내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('피부관리내용 입력 자동화');
  // 피부관리 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('피부관리를 생성했습니다')).toBeVisible();
  // 피부관리 진행내역
  await expect(page.getByText('피부관리 진행내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '피부관리내용 입력 자동화' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1회차' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible(); // 사용
  // 수정
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  await expect(page.getByText('피부관리 진행', { exact: true })).toBeVisible();
  // 피부관리사
  await expect(page.locator('label').filter({ hasText: '피부관리사' })).toBeVisible();
  await page.getByRole('combobox', { name: '피부관리사를 선택하세요' }).click();
  await page.getByRole('option', { name: '홍명희' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '이지혜' }).click();
  // 진행 시/수술
  await expect(page.getByText('진행 시/수술')).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(3)).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '회차' }).nth(3)).toBeVisible();
  // 피부관리내용
  await expect(page.locator('label').filter({ hasText: '피부관리내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('피부관리내용 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '피부관리내용 입력 자동화' }).fill('피부관리내용 입력 자동화 수정');
  // 수정완료
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('피부관리를 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  await expect(page.getByText('잔여 있는 피부관리 내역이 없습니다')).toBeVisible();
  await expect(page.getByText('피부관리 진행내역')).toBeVisible();
  // 피부관리차트 수정 확인
  await expect(page.getByRole('cell', { name: '피부관리내용 입력 자동화 수정' })).toBeVisible(); // 피부관리내용
  await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '이지혜' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1회차' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible(); // 사용
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // 피부관리차트 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 피부관리 잔여 삭제
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  await expect(page.getByText('시/수술 항목을 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByText('잔여 있는 피부관리 내역이 없습니다')).toBeVisible();
});