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
  await page.getByText('처방전 (0)').click();
  // 처방전
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.getByRole('button', { name: '처방전 작성' })).toBeVisible();
  // 처방전 작성
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: '처방전 작성' }).click();
  const page1 = await page1Promise;
  // 처방전 작성 > 안내 팝업
  await expect(page1.getByRole('heading', { name: '안내' })).toBeVisible();
  // 처방전 작성 > 안내 팝업 닫기
  await expect(page1.getByRole('heading', { name: '안내' }).getByRole('button')).toBeVisible();
  await page1.getByRole('heading', { name: '안내' }).getByRole('button').click();
  // 처방전 제출 용도
  await expect(page1.getByRole('button', { name: '[ ]본인보관용' })).toBeVisible(); // 처방전 제출 용도
  await expect(page1.getByRole('button', { name: '[V]약국제출용' })).toBeVisible();
  // 처방전
  await expect(page1.getByRole('heading', { name: '처    방    전' })).toBeVisible(); // 처방전
  // 처방전 종류
  await expect(page1.getByRole('button', { name: '[ ]건강보험' })).toBeVisible(); // 처방전 종류
  await expect(page1.getByRole('button', { name: '[ ]의료급여' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '[ ]산업재해보험' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '[ ]자동차보험' })).toBeVisible();
  await expect(page1.getByRole('button', { name: '[V]기타 ( )' })).toBeVisible();
  await expect(page1.getByText('* [ ]에는 해당되는 곳에 "V"표시를 합니다')).toBeVisible(); // 처방전 종류 선택 안내
  // 요양기관번호
  await expect(page1.getByRole('cell', { name: '요양기관기호 :' })).toBeVisible(); // 요양기관기호
  // 성명
  await expect(page1.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible(); // 성명
  // 주민번호 앞
  await expect(page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').first()).toBeVisible();
  await expect(page1.getByRole('cell', { name: '- 1234567' }).getByRole('textbox').nth(1)).toBeVisible(); 
  // 의료기관
  await expect(page1.getByRole('cell', { name: '의료기관' })).toBeVisible(); // 의료기관
  await expect(page1.getByRole('cell', { name: 'dev' }).nth(0)).toBeVisible(); // 명칭
  await expect(page1.getByRole('cell', { name: '0101234123' })).toBeVisible(); // 전화번호
  await expect(page1.getByRole('cell', { name: '021234322', exact: true })).toBeVisible(); // 팩스 번호
  // 처방전 중간 안내문구
  await expect(page1.getByRole('cell', { name: '환자가 요구하면 질병분류기호를 적지 않습니다' })).toBeVisible();
  // 묶음 처방 리스트
  await expect(page1.getByText('묶음 처방 리스트')).toBeVisible();
  // 의약품 등록
  await expect(page1.getByRole('row', { name: '등록 1' }).getByRole('button')).toBeVisible();
  await page1.getByRole('row', { name: '등록 1' }).getByRole('button').click();
  // 작성 완료
  await page1.waitForTimeout(2000);
  await expect(page1.getByRole('button', { name: '작성완료' })).toBeVisible();
  await page1.getByRole('button', { name: '작성완료' }).click();
  await expect(page1.getByText('저장되었습니다')).toBeVisible();
  await page.bringToFront();
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  // 처방전 작성 확인
  await expect(page.getByRole('cell', { name: 'dev' }).first()).toBeVisible(); // 작성자
  await expect(page.getByRole('cell', { name: '기타' })).toBeVisible(); // 보험종류
  await expect(page.getByRole('cell', { name: 'dev' }).nth(1)).toBeVisible(); // 처방의사 
  await expect(page.getByRole('cell', { name: '세파록스캡슐(세파클러수화물)_(0.25g/1' })).toBeVisible(); // 처방내역
  await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible();
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(3)')).toBeVisible();
  // 처방전 수정
  const page3Promise = page.waitForEvent('popup');
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td:nth-child(3)').click();
  const page3 = await page3Promise;
  // 처방전 수정 > 안내 팝업
  await expect(page3.getByRole('heading', { name: '안내' })).toBeVisible();
  await expect(page3.getByRole('heading', { name: '안내' }).getByRole('button')).toBeVisible();
  await page3.getByRole('heading', { name: '안내' }).getByRole('button').click();
  // 처방전 수정
  await expect(page3.getByRole('heading', { name: '처    방    전' })).toBeVisible();
  // 처방전 의약품 첫번째 항목 삭제
  await page3.locator('.btn-del').first().click();
  // 처방전 용법 첫번째 항목 입력
  await page3.locator('input[placeholder="입력하세요"]').first().click();
  await page3.locator('input[placeholder="입력하세요"]').first().fill('용법 자동화');  // '입력하세요'라는 placeholder를 가진 입력 필드에 '테스트' 입력
  // 작성완료
  await page3.waitForTimeout(2000);
  await expect(page3.getByRole('button', { name: '작성완료' })).toBeVisible();
  await page3.getByRole('button', { name: '작성완료' }).click();
  await expect(page3.getByText('저장되었습니다')).toBeVisible();
  await page.bringToFront();
  await expect(page.getByRole('paragraph').filter({ hasText: '처방전' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'dev' }).first()).toBeVisible(); // 작성자
  await expect(page.getByRole('cell', { name: '기타' })).toBeVisible(); // 보험종류
  await expect(page.getByRole('cell', { name: 'dev' }).nth(1)).toBeVisible(); // 처방의사
  await expect(page.getByRole('cell', { name: '키도멜라인장용정(브로멜라인)_(0.1g/1정) 외 2건' })).toBeVisible(); // 처방내역
  await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible(); // 상태
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > .sc-jsJBEP > td').first().click();
  // 처방전 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
});