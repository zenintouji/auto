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
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 진료
  await page.getByText('진료 (0)').click();
  await expect(page.getByRole('button', { name: '+ 진료등록' })).toBeVisible();
  // 진료 등록
  await expect(page.getByRole('button', { name: '+ 진료등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 진료등록' }).click();
  await expect(page.getByText('진료 등록')).toBeVisible();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '성형', exact: true }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 진료내용
  await expect(page.locator('label').filter({ hasText: '진료내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('pre div').first().fill('진료 내용 입력 자동화');
  // 처방전
  await expect(page.locator('label').filter({ hasText: '처방전' })).toBeVisible();
  // 처방전 새 탭
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: '+ 처방전 작성' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: '안내' })).toBeVisible();
  await page1.getByRole('heading', { name: '안내' }).getByRole('button').click();
  await expect(page1.getByRole('heading', { name: '처    방    전' })).toBeVisible();
  await expect(page1.getByRole('textbox', { name: '고객명 입력 후 엔터를 누르세요' })).toBeVisible();
  await expect(page1.getByRole('cell', { name: '우노CRM' })).toBeVisible();
  await expect(page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').first()).toBeVisible();
  await expect(page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').nth(1)).toBeVisible();
  await expect(page1.getByText('묶음 처방 리스트')).toBeVisible();
  await expect(page1.getByRole('row', { name: '등록 1' }).getByRole('button')).toBeVisible();
  await page1.getByRole('row', { name: '등록 1' }).getByRole('button').click();
  await page1.waitForTimeout(2000);
  await expect(page1.getByRole('button', { name: '작성완료' })).toBeVisible();
  await page1.getByRole('button', { name: '작성완료' }).click();
  await expect(page1.getByText('저장되었습니다')).toBeVisible();
  // 처방전 추가 확인
  await page.bringToFront();
  await expect(page.getByText('진료 등록')).toBeVisible();
  await expect(page.getByText('처방전 (1)')).toBeVisible();
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-image 펜차트 샘플함' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  // 펜차트 > 펜차트 샘플함
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await page.getByLabel('고객상담차트.jpg').getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await expect(page.getByText('차트를 불러왔습니다')).toBeVisible();
  // 저장
  await expect(page.getByText('진료 등록')).toBeVisible();
  await expect(page.getByText('고객상담차트.jpg')).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('진료를 생성했습니다')).toBeVisible();
  // 진료 등록 확인
  await expect(page.getByRole('cell', { name: '진료 내용 입력 자동화' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트
  // 진료 수정
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(2)').click();
  await expect(page.getByText('진료 수정')).toBeVisible();
  // 의사 수정
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '황범석' }).click();
  // 시/수술 카테고리 수정
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  // 시/수술명 수정
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '인모드' }).click();
  // 시/수술 카테고리 추가 및 삭제
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '-', exact: true }).nth(1).click();
  // 시/수술 카테고리 추가
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('button', { name: 'Open' }).nth(3).click();
  await page.getByRole('option', { name: '성형' }).nth(0).click();
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('button', { name: 'Open' }).nth(4).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 진료 내용 수정
  await expect(page.locator('label').filter({ hasText: '진료내용' })).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.locator('pre').getByText('진료 내용 입력 자동화').click();
  await page.locator('pre div').filter({ hasText: '진료 내용 입력 자동화' }).fill('진료 내용 입력 자동화 수정');
  // 처방전
  await expect(page.locator('label').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 처방전 작성' })).toBeVisible();
  // 펜차트
  await expect(page.getByText('펜차트', { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-image 펜차트 샘플함' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  // 펜차트 > 펜차트 샘플함
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  await page.getByLabel('강쥐.jpg').getByRole('checkbox').check();
  await page.getByLabel('고양이(1).jpeg').getByRole('checkbox').check();
  await page.getByLabel('ray.jpg').getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await expect(page.getByText('차트를 불러왔습니다')).toBeVisible();
  await expect(page.getByText('진료 수정')).toBeVisible();
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('진료를 수정했습니다. 연결된 접수정보가 업데이트 됩니다')).toBeVisible();
  // 진료 수정 확인
  await expect(page.getByRole('cell', { name: '진료 내용 입력 자동화 수정' })).toBeVisible(); // 진료 내용 수정
  await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '건' })).toBeVisible(); // 펜차트 수정
  // 차트 출력
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await expect(page.getByRole('button', { name: '차트 출력' })).toBeVisible();
  await page.getByRole('button', { name: '차트 출력' }).click();
  // 차트 출력 카테고리 출력
  await expect(page.getByRole('heading', { name: '차트 출력 close' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '정보 확인' })).toBeVisible();
  await expect(page.getByLabel('차트 출력').getByText('차트번호')).toBeVisible();
  await expect(page.getByText('환자 성명')).toBeVisible();
  await expect(page.getByText('주민등록번호')).toBeVisible();
  await expect(page.getByLabel('차트 출력').getByText('전화번호')).toBeVisible();
  await expect(page.getByLabel('차트 출력').getByText('주소')).toBeVisible();
  await expect(page.getByRole('heading', { name: '처방전 선택' })).toBeVisible();
  await expect(page.getByRole('button', { name: '취소' })).toBeVisible();
  await page.getByRole('button', { name: '취소' }).click();
  await expect(page.getByText('통합차트')).toBeVisible();
  // 진료 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  await expect(page.getByText('연동된 펜차트를 함께 삭제 하시겠습니까?')).toBeVisible();
  await expect(page.getByText('펜차트 포함 삭제')).toBeVisible();
  await expect(page.getByText('차트만 삭제')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // 처방전 
  await expect(page.getByText('처방전 (1)')).toBeVisible();
  await page.getByText('처방전 (1)').click();
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // 처방전 삭제
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});