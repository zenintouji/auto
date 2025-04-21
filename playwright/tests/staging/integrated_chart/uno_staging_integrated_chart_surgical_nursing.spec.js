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
  // 수술간호
  await page.getByText('수술간호 (0)').click();
  await expect(page.getByRole('button', { name: '+ 수술간호등록' })).toBeVisible();
  // 수술간호 등록
  await expect(page.getByRole('button', { name: '+ 수술간호등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 수술간호등록' }).click();
  await expect(page.getByText('수술간호 등록')).toBeVisible();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 간호사
  await expect(page.locator('label').filter({ hasText: '간호사' })).toBeVisible();
  await page.getByRole('combobox', { name: '간호사를 선택하세요' }).click();
  await page.getByRole('option', { name: '홍명희' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형', exact: true }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 수술시작시간
  await expect(page.getByText('수술시작시간')).toBeVisible();
  await page.locator('input[name="startHour"]').click();
  await page.locator('input[name="startHour"]').fill('9');
  await page.locator('input[name="startMinute"]').click();
  await page.locator('input[name="startMinute"]').fill('0');
  // 수술종료시간
  await expect(page.getByText('수술종료시간')).toBeVisible();
  await page.locator('input[name="endHour"]').click();
  await page.locator('input[name="endHour"]').fill('11');
  await page.locator('input[name="endMinute"]').click();
  await page.locator('input[name="endMinute"]').fill('00');
  // 바이탈
  await expect(page.getByText('바이탈')).toBeVisible();
  await page.getByPlaceholder('단위').nth(0).click();
  await page.getByPlaceholder('단위').nth(0).fill('10');
  await page.getByPlaceholder('단위').nth(1).click();
  await page.getByPlaceholder('단위').nth(1).fill('10');
  await page.getByPlaceholder('단위').nth(2).click();
  await page.getByPlaceholder('단위').nth(2).fill('10');
  await page.getByPlaceholder('단위').nth(3).click();
  await page.getByPlaceholder('단위').nth(3).fill('10');
  await page.getByPlaceholder('단위').nth(4).click();
  await page.getByPlaceholder('단위').nth(4).fill('10');
  // 투약 약품명
  await expect(page.getByText('투약 약품명')).toBeVisible();
  await page.getByRole('combobox', { name: '투약 약품명을 선택하세요' }).click();
  await page.getByRole('option', { name: '테스트' }).click();
  // 투약량
  await expect(page.getByText('투약량')).toBeVisible();
  await page.getByRole('textbox', { name: '-', exact: true }).nth(4).click();
  await page.getByRole('textbox', { name: '-', exact: true }).nth(4).fill('10');
  // 수술간호내용
  await expect(page.locator('label').filter({ hasText: '수술간호내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('수술간호내용 입력 자동화');
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('수술간호를 생성했습니다')).toBeVisible();
  // 수술간호 등록 확인
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수술간호내용 입력 자동화' })).toBeVisible(); // 수술간호내용
  // 수술간호 수정
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  await expect(page.getByText('수술간호 수정')).toBeVisible();
  // 의사 수정
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '황범석' }).click();
  // 간호사 수정
  await expect(page.locator('label').filter({ hasText: '간호사' })).toBeVisible();
  await page.getByRole('combobox', { name: '간호사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 시/수술 카테고리 수정
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 수정
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 시/수술 카테고리 추가 및 삭제 
  await page.getByRole('button', { name: '+' }).nth(3).click();
  await page.getByRole('button', { name: '+' }).nth(3).click();
  await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // 시/수술 카테고리 추가
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByPlaceholder('시/수술 카테고리를 선택하세요.').nth(1).click();
  await page.getByRole('option', { name: '성형' }).nth(0).click();
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByPlaceholder('시/수술명을 선택하세요.').nth(1).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 수술시작시간 수정
  await expect(page.getByText('수술시작시간')).toBeVisible();
  await page.locator('input[name="startHour"]').click();
  await page.locator('input[name="startHour"]').fill('10');
  await page.locator('input[name="startMinute"]').click();
  await page.locator('input[name="startMinute"]').fill('30');
  // 수술종료시간 수정
  await expect(page.getByText('수술종료시간')).toBeVisible();
  await page.locator('input[name="endHour"]').click();
  await page.locator('input[name="endHour"]').fill('13');
  await page.locator('input[name="endMinute"]').click();
  await page.locator('input[name="endMinute"]').fill('30');
  // 바이탈 
  await expect(page.getByText('바이탈', { exact: true })).toBeVisible();
  // 투약 약품명 수정
  await expect(page.getByText('투약 약품명')).toBeVisible();
  await page.getByRole('combobox', { name: '투약 약품명을 선택하세요' }).click();
  await page.getByRole('option', { name: '33' }).click();
  // 투약량 수정
  await expect(page.getByText('투약량')).toBeVisible();
  await page.getByRole('textbox', { name: '-', exact: true }).nth(4).click();
  await page.getByRole('textbox', { name: '-', exact: true }).nth(4).fill('5');
  // 수술간호내용 수정
  await expect(page.locator('label').filter({ hasText: '수술간호내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('수술간호내용 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '수술간호내용 입력 자동화' }).fill('수술간호내용 입력 자동화 수정');
  // 수술간호 수정완료
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('수술간호를 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // 수술간호 수정 확인
  await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '수술간호내용 입력 자동화 수정' })).toBeVisible();
  // 수술간호차트 삭제
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
});