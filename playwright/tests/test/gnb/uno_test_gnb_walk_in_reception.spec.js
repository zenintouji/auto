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
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await expect(page.getByRole('textbox', { name: '비밀번호를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('asdf1234!');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 진입
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 고객 검색
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객명, 전화번호' }).fill('자동화');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '조회', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '조회', exact: true }).click();
  await page.waitForTimeout(1000);
  // 고객조회 팝업
  await expect(page.getByRole('heading', { name: '고객조회 close' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await expect(page.locator('th').filter({ hasText: '접수' })).toBeVisible();
  await expect(page.getByRole('button', { name: '접수' }).nth(0)).toBeVisible();
  await page.getByRole('button', { name: '접수' }).nth(0).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('오늘 예약이 없는 고객입니다.접수하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  // 당일접수
  await expect(page.getByRole('heading', { name: '접수 자동화_신규고객 (여성/32/940505)' })).toBeVisible();
  await expect(page.getByText('자동화_신규고객 (여성/32/940505)')).toBeVisible();
  // 접수종류
  await expect(page.getByText('접수종류')).toBeVisible();
  await expect(page.getByRole('combobox').nth(0)).toBeVisible();
  await page.getByRole('combobox').nth(0).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '상담접수' })).toBeVisible();
  await page.getByRole('option', { name: '상담접수' }).click();
  await page.waitForTimeout(1000);
  // 접수부서
  await expect(page.getByText('접수부서')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '상담-상담사A2' })).toBeVisible();
  await page.getByRole('option', { name: '상담-상담사A2' }).click();
  await page.waitForTimeout(1000);
  // 일자
  await expect(page.getByText('일자')).toBeVisible();
  // 방문시간
  await expect(page.getByText('방문시간')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '-' })).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '9:00', exact: true })).toBeVisible();
  await page.getByRole('option', { name: '9:00', exact: true }).click();
  await page.waitForTimeout(1000);
  // 예상소요시간
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^시간분$/ }).nth(2)).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('menuitem', { name: '0시간 30분', exact: true })).toBeVisible();
  await page.getByRole('menuitem', { name: '0시간 30분', exact: true }).click();
  // 내원경로
  await expect(page.getByText('내원경로', { exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '직원소개' })).toBeVisible();
  await page.getByRole('option', { name: '직원소개' }).click();
  await page.waitForTimeout(1000);
  // 의사
  await expect(page.getByText('의사', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '최지안' })).toBeVisible();
  await page.getByRole('option', { name: '최지안' }).click();
  await page.waitForTimeout(1000);
  // 상담사
  await expect(page.getByText('상담사', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '노윤이' })).toBeVisible();
  await page.getByRole('option', { name: '노윤이' }).click();
  await page.waitForTimeout(1000);
  // 어시스트
  await expect(page.getByText('어시스트')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '어시스트를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '홍명희' })).toBeVisible();
  await page.getByRole('option', { name: '홍명희' }).click();
  await page.waitForTimeout(1000);
  // 작성자
  await expect(page.getByText('작성자')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '작성자를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '황범석' })).toBeVisible();
  await page.getByRole('option', { name: '황범석' }).click();
  await page.waitForTimeout(1000);
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '피부 시술' })).toBeVisible();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await page.waitForTimeout(1000);
  // 시/수술명
  await expect(page.getByText('시/수술명')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술명을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '인모드' })).toBeVisible();
  await page.getByRole('option', { name: '인모드' }).click();
  await page.waitForTimeout(1000);
  // 접수메모
  await expect(page.getByText('접수메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').first().fill('당일 접수 메모 입력 자동화');
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수를 생성했습니다')).toBeVisible();
  // 예약 캘린더 > 당일접수 확인
  await expect(page.getByRole('button', { name: 'icon-calendar 예약 캘린더' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-calendar 예약 캘린더' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('신당자동화_신규고객/F/만 30세')).toBeVisible(); // 신당 > 신 | 당 | 이름 순
  // 고객조회
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  // 고객명 검색
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '고객명', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('cell', { name: '고객명' }).nth(0)).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  // 통합차트
  await expect(page.getByRole('button', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('통합차트')).toBeVisible();
  // 통합차트 > 접수차트
  await expect(page.getByText('접수 (1)')).toBeVisible();
  await page.getByText('접수 (1)').click();
  await page.waitForTimeout(1000);
  // 접수 수정
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)')).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td:nth-child(2)').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수 수정')).toBeVisible();
  // 접수종류
  await expect(page.locator('label').filter({ hasText: '접수종류' })).toBeVisible();
  // await expect(page.getByRole('combobox', { name: '-' })).toBeVisible();
  // await page.getByRole('combobox', { name: '-' }).click();
  await expect(page.getByRole('combobox').nth(1)).toBeVisible();
  await page.getByRole('combobox').nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '진료접수' })).toBeVisible();
  await page.getByRole('option', { name: '진료접수' }).click();
  await page.waitForTimeout(1000);
  // 접수부서
  await expect(page.getByText('접수부서')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '부서를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '상담-상담사B' })).toBeVisible();
  await page.getByRole('option', { name: '상담-상담사B' }).click();
  await page.waitForTimeout(1000);
  // 일자
  await expect(page.getByText('일자')).toBeVisible();
  // 방문시간
  await expect(page.getByText('방문시간')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '-' })).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '9:30', exact: true })).toBeVisible();
  await page.getByRole('option', { name: '9:30', exact: true }).click();
  await page.waitForTimeout(1000);
  // 예상 소요시간
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^시간분$/ }).nth(2)).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('menuitem', { name: '1시간 0분', exact: true })).toBeVisible();
  await page.getByRole('menuitem', { name: '1시간 0분', exact: true }).click();
  await page.waitForTimeout(1000);
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '내원경로를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: 'SNS' }).nth(0)).toBeVisible();
  await page.getByRole('option', { name: 'SNS' }).nth(0).click();
  await page.waitForTimeout(1000);
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '황범석' })).toBeVisible();
  await page.getByRole('option', { name: '황범석' }).click();
  await page.waitForTimeout(1000);
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '김지현' })).toBeVisible();
  await page.getByRole('option', { name: '김지현' }).click();
  await page.waitForTimeout(1000);
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '어시스트를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '최지안' })).toBeVisible();
  await page.getByRole('option', { name: '최지안' }).click();
  await page.waitForTimeout(1000);
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '작성자를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '노윤이' })).toBeVisible();
  await page.getByRole('option', { name: '노윤이' }).click();
  await page.waitForTimeout(1000);
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '성형', exact: true })).toBeVisible();
  await page.getByRole('option', { name: '성형', exact: true }).click();
  await page.waitForTimeout(1000);
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술명을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '눈매교정' }).click();
  // 시/수술 카테고리 추가
  await expect(page.getByRole('button', { name: '+', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '+', exact: true }).click();
  // 시/수술 카테고리 추가 
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요.' }).nth(1)).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요.' }).nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '피부 시술' })).toBeVisible();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await page.waitForTimeout(1000);
  // 시/수술명 추가
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술명을 선택하세요.' }).nth(1)).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요.' }).nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '인모드' })).toBeVisible();
  await page.getByRole('option', { name: '인모드' }).click();
  await page.waitForTimeout(1000);
  // 접수메모
  await expect(page.getByText('접수메모')).toBeVisible();
  await expect(page.getByText('자주 쓰는 상용구')).toBeVisible();
  await expect(page.locator('pre').getByText('당일 접수 메모 입력 자동화')).toBeVisible();
  await page.locator('pre').getByText('당일 접수 메모 입력 자동화').click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').filter({ hasText: '당일 접수 메모 입력 자동화' }).fill('당일 접수 메모 입력 자동화 수정');
  // 수정완료
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수를 변경했습니다')).toBeVisible();
  // 수정 확인
  await expect(page.getByRole('cell', { name: '상담대기' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '당일접수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '진료접수' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담사B' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '황범석' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '김지현' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'SNS', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '피부 시술' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '성형' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '인모드' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '눈매교정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '노윤이' }).nth(2)).toBeVisible();
  await expect(page.getByRole('cell', { name: '당일 접수 메모 입력 자동화 수정' })).toBeVisible();
  // 접수 취소
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '접수취소' })).toBeVisible();
  await page.getByRole('button', { name: '접수취소' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수가 취소됩니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수가 취소되었습니다')).toBeVisible();
  // 접수 취소 확인
  await expect(page.getByRole('cell', { name: '접수취소' })).toBeVisible();
  // 삭제
  await expect(page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first()).toBeVisible();
  await page.locator('div:nth-child(2) > .sc-hmdomO > .sc-bXCLTC > tr > td').first().click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();












});