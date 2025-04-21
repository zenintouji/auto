import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('jwpark@v2test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForTimeout(1000);
  // 메인 화면 진입
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
  // 시/수술 코드 생성 팝업 > 시/수술 추가 팝업
  await expect(page.getByRole('button', { name: '+시/수술코드 생성' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 검색하세요' }).click();
  await page.getByRole('option', { name: '성형', exact: true }).click();
  await page.getByRole('combobox', { name: '시/수술명을 검색하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
  await page.getByRole('button', { name: '추가' }).click();
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  // 시/수술 추가 팝업 닫기
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  // 시/수술차트 등록으로
  await expect(page.getByRole('cell', { name: '성형' }).nth(0)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '1', exact: true }).first()).toBeVisible(); // 총 횟수 
  await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible(); // 누적사용
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible(); // 잔여
  // 시/수술 차트
  await expect(page.getByText('1회차')).toBeVisible();
  await page.getByText('1회차').click();
  // 시/수술 진행
  await expect(page.getByText('시/수술 진행', { exact: true })).toBeVisible();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: '홍명희' }).click();
  // 진행 시/수술 카테고리 
  await expect(page.getByText('진행 시/수술')).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' }).nth(1)).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible(); // 총 횟수
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(3)).toBeVisible(); // 잔여
  await expect(page.getByRole('cell', { name: '회차' }).nth(4)).toBeVisible();
  // 시/수술내용
  await expect(page.locator('label').filter({ hasText: '시/수술내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('시/수술내용 입력 자동화');
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  // 펜차트 > 펜차트 샘플함
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await page.getByLabel('강쥐.jpg').getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('차트를 불러왔습니다')).toBeVisible();
  await expect(page.getByText('시/수술 진행', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('시수술을 생성했습니다')).toBeVisible();
  // 시/수술차트 > 잔여 있는 시/수술
  await expect(page.getByText('잔여 있는 시/수술', { exact: true })).toBeVisible();
  await expect(page.getByText('잔여 있는 시/수술 내역이 없습니다')).toBeVisible();
  // 시/수술 진행내역 
  await expect(page.getByText('시/수술 진행내역')).toBeVisible();
  // 시/수술 진행내역 확인
  await expect(page.getByRole('cell', { name: '시/수술내용 입력 자동화' })).toBeVisible(); // 시/수술 내용
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible(); // 시/수술 카테고리
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible(); // 시/수술명
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1회차' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible(); // 사용
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트
  // 시/수술 진행내역 수정
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  await expect(page.getByText('시/수술 진행', { exact: true })).toBeVisible();
  // 의사 수정
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '황범석' }).click();
  // 어시스트 수정
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 진행 시/수술 
  await expect(page.getByText('진행 시/수술')).toBeVisible();
  // 시/수술 내용
  await expect(page.locator('label').filter({ hasText: '시/수술내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('시/수술내용 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '시/수술내용 입력 자동화' }).fill('시/수술내용 입력 자동화 수정');
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-image 펜차트 샘플함' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  // 펜차트 > 펜차트 샘플함
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await page.getByLabel('고양이(1).jpeg').getByRole('checkbox').check();
  await page.getByLabel('ray.jpg').getByRole('checkbox').check();
  await page.getByLabel('고객상담차트.jpg').getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('차트를 불러왔습니다')).toBeVisible();
  // 시/수술 진행내역 수정완료
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await page.locator('text=시수술을 수정했습니다. 연결된 접수정보가 업데이트 됩니다').waitFor({ state: 'visible' });
  await expect(page.locator('text=시수술을 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // 시/수술 진행내역 수정 확인
  await expect(page.getByRole('cell', { name: '시/수술내용 입력 자동화 수정' }).locator('div').nth(1)).toBeVisible(); // 시/수술 내용
//   await expect(page.getByRole('cell', { name: '시/수술내용 입력 자동화 수정' })).toBeVisible(); // 시/수술 내용
  await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '1회차' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트
  // 시/수술 삭제
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?')).toBeVisible();
  await expect(page.getByText('펜차트 포함 삭제')).toBeVisible();
  await expect(page.getByText('차트만 삭제')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('text=삭제되었습니다').waitFor({ state: 'visible' });
  await expect(page.locator('text=삭제되었습니다')).toBeVisible();
//   await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // 시/수술 진행내역 내용 없음 확인
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 잔여 있는 시/수술 삭제
  await expect(page.getByRole('listitem').filter({ hasText: '잔여 있는 시/수술' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '0', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1', exact: true }).nth(1)).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // 삭제 안내 팝업
  await expect(page.getByText('시/수술 항목을 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.locator('text=삭제되었습니다').waitFor({ state: 'visible' });
  await expect(page.locator('text=삭제되었습니다')).toBeVisible();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByText('잔여 있는 시/수술 내역이 없습니다')).toBeVisible();
});