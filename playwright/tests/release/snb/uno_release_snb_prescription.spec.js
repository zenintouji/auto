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
  await expect(page.getByRole('button', { name: 'icon-prescriptions 처방전' })).toBeVisible();
  await expect(page.getByRole('button', { name: '처방전 발급' })).toBeVisible();
  await page.getByRole('button', { name: '처방전 발급' }).click();
  await page.waitForTimeout(1000);
  // 처방전 발급 
  await expect(page.getByRole('heading', { name: '안내' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '안내' }).getByRole('button')).toBeVisible();
  await page.getByRole('heading', { name: '안내' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  // 처방전 
  await expect(page.getByText('처방전 발급').nth(2)).toBeVisible();
  await expect(page.getByRole('button', { name: '[ ]본인보관용' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[V]약국제출용' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '처    방    전' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[ ]건강보험' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[ ]의료급여' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[ ]산업재해보험' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[ ]자동차보험' })).toBeVisible();
  await expect(page.getByRole('button', { name: '[V]기타 ( )' })).toBeVisible();
  await expect(page.getByText('* [ ]에는 해당되는 곳에 "V"표시를 합니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '요양기관기호 :' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '발급 연월일 및 번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성명', exact: true })).toBeVisible();
  // 처방전 > 고객 선택
  await page.getByRole('textbox', { name: '고객명 입력 후 엔터를 누르세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객명 입력 후 엔터를 누르세요' }).fill('자동화');
  await page.getByRole('textbox', { name: '고객명 입력 후 엔터를 누르세요' }).press('Enter');
  await page.waitForTimeout(2000);
  // 처방전 > 고객조회 팝업
  await expect(page.getByRole('heading', { name: '고객조회 close' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  // 처방전에 고객 등록
  await page.getByRole('cell', { name: '자동화_신규고객' }).dblclick();
  // 처방전 확인
  await expect(page.getByRole('cell', { name: '주민등록번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '의료기관' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '명칭', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '팩스번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '처방 의료인의 성명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '면허종류' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '면허번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '환자가 요구하면 질병분류기호를 적지 않습니다' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '처방 의약품의 명칭' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '회 투약량' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '일 투여횟수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '총 투약일수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '용법' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '처방 의약품의 명칭' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '회 투약량' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '일 투여횟수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '총 투약일수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '용법' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '주사제 처방명세 ( [ ]원 내 조제, [V' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '조제시 참고사항' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '사용기간', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '사용기간 내에 약국에 제출하여야 합니다' })).toBeVisible();
  // 처방전 > 의약품 조제명세 확인
  await expect(page.getByRole('cell', { name: '의약품 조제명세' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '조제명세', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '조제기관의 명칭' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '조제약사' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '조제량 (조제일수)' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '조제연월일' })).toBeVisible();
  // 처방전 > 묶음 처방 리스트 확인
  await expect(page.getByText('묶음 처방 리스트')).toBeVisible();
  await expect(page.locator('th').filter({ hasText: '등록' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'no.' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '묶음처방명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '의약용품명' })).toBeVisible();
  // 묶음처방 등록
  await expect(page.getByRole('button').nth(81)).toBeVisible();
  await page.getByRole('button').nth(81).click();
  await page.waitForTimeout(1000);
  // 처방전 > 용법 입력
  await expect(page.getByPlaceholder('입력하세요').nth(0)).toBeVisible();
  await page.getByPlaceholder('입력하세요').nth(0).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('입력하세요').nth(0).fill('용법 자동화');
  // 임시 저장
  await expect(page.getByRole('button', { name: '임시저장' })).toBeVisible();
  await page.getByRole('button', { name: '임시저장' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('임시 저장되었습니다')).toBeVisible();
  // 작성 완료
  await expect(page.getByRole('button', { name: '작성완료' })).toBeVisible();
  await page.getByRole('button', { name: '작성완료' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // SNB > 처방전 조회 진입
  await expect(page.getByRole('button', { name: '처방전 조회' })).toBeVisible();
  await page.getByRole('button', { name: '처방전 조회' }).click();
  await page.waitForTimeout(1000);
  // 처방전 조회 > 고객명 검색
  await expect(page.getByRole('combobox', { name: '고객명' })).toBeVisible();
  await page.getByRole('combobox', { name: '고객명' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: '고객명' }).fill('자동화');
  await expect(page.getByText('-3535-3535')).toBeVisible();
  await page.getByText('-3535-3535').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  // 검색 확인
  // 작성자
  await expect(page.getByRole('cell', { name: 'v2' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'v2' }).nth(2)).toBeVisible();
  // 교부번호
  await expect(page.getByRole('cell', { name: '-' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '-' }).nth(3)).toBeVisible();
  // 보험종류
  await expect(page.getByRole('cell', { name: '기타' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '기타' }).nth(1)).toBeVisible();
  // 고객명
  await expect(page.getByRole('cell', { name: '자동화_신규고객' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' }).nth(1)).toBeVisible();
  // 차트번호
  await expect(page.getByRole('cell', { name: '1234568' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234568' }).nth(1)).toBeVisible();
  // 처방의사
  await expect(page.getByRole('cell', { name: 'v2' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: 'v2' }).nth(3)).toBeVisible();
  // 상태
  await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '임시저장' })).toBeVisible();
  // 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '임시저장' })).not.toBeVisible();
  // 수정
  await expect(page.locator('#bodyContentsWrapper tbody').getByRole('cell').filter({ hasText: /^$/ })).toBeVisible();
  await page.locator('#bodyContentsWrapper tbody').getByRole('cell').filter({ hasText: /^$/ }).click();
  await page.waitForTimeout(1000);
  // 처방전 수정 진입
  await expect(page.getByRole('heading', { name: '안내' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '안내' }).getByRole('button')).toBeVisible();
  await page.getByRole('heading', { name: '안내' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('처방전 발급').nth(2)).toBeVisible();
  await expect(page.getByRole('button').nth(73)).toBeVisible();
  await page.getByRole('button').nth(73).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '[ ]본인보관용' })).toBeVisible();
  await page.getByRole('button', { name: '[ ]본인보관용' }).click();
  await page.waitForTimeout(1000);
  // 작성완료
  await expect(page.getByRole('button', { name: '작성완료' })).toBeVisible();
  await page.getByRole('button', { name: '작성완료' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // SNB > 처방전 조회
  await expect(page.getByRole('button', { name: '처방전 조회' })).toBeVisible();
  await page.getByRole('button', { name: '처방전 조회' }).click();
  await page.waitForTimeout(1000);
  // 고객명 검색
  await expect(page.getByRole('combobox', { name: '고객명' })).toBeVisible();
  await page.getByRole('combobox', { name: '고객명' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: '고객명' }).fill('자동화');
  await expect(page.getByText('-3535-3535')).toBeVisible();
  await page.getByText('-3535-3535').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  // 검색 확인
  await expect(page.getByRole('cell', { name: 'v2' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '-', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '기타' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234568' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'v2' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '작성완료' })).toBeVisible();
  // 삭제
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '작성완료' })).not.toBeVisible();




});