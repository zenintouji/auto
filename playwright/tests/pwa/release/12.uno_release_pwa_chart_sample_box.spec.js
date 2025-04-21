import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  // web setting =>
//   viewport: {
//     height: 1080,
//     width: 1920
//   }
  // mobile setting =>
  viewport: { width: 820, height: 1180 }, // ipad 크기로 진행해봄
  deviceScaleFactor: 2, // 고해상도 디스플레이
  isMobile: true, // 모바일 환경으로 인식 ㄱㄱ
  hasTouch: true, // 터치 지원
});

test('test', async ({ page }) => {
  await page.goto('https://app.unocare.co.kr/login'); // 로그인 화면
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일' }).click();
  await page.getByRole('textbox', { name: '이메일' }).fill('jwpark@v2test.com');
  await expect(page.getByRole('textbox', { name: '●●●●●●●●' })).toBeVisible();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 
  await expect(page.getByRole('button', { name: '+ 고객 등록' })).toBeVisible();
  // 메뉴
  await expect(page.getByRole('button', { name: 'menu' })).toBeVisible();
  await page.getByRole('button', { name: 'menu' }).click();
  // 메뉴 닫기
  await expect(page.getByRole('button').filter({ hasText: /^$/ })).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  // 메뉴
  await expect(page.getByRole('button', { name: 'menu' })).toBeVisible();
  await page.getByRole('button', { name: 'menu' }).click();
  // 상단 사용자 정보
  await expect(page.getByText('우노CRM').first()).toBeVisible();
  await expect(page.getByText('v2').nth(0)).toBeVisible();
  await expect(page.getByText('jwpark@v2test.com')).toBeVisible();
  await expect(page.getByText('전자서명 미등록')).toBeVisible();
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 차트샘플함
  await expect(page.getByRole('listitem').filter({ hasText: '차트샘플함' })).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: '차트샘플함' }).click();
  await expect(page.getByText('차트샘플함')).toBeVisible();
  // 이미지 등록 안내 
  await expect(page.getByText('이미지 등록 안내?')).toBeVisible();
  await page.getByText('이미지 등록 안내?').click();
  // 이미지 등록 안내 팝업
  await expect(page.getByRole('heading', { name: '이미지 등록 안내 close' })).toBeVisible();
  await expect(page.getByText('jpg, png 파일만 등록할 수 있습니다')).toBeVisible();
  await expect(page.getByText('이미지 파일 크기가 50MB')).toBeVisible();
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  // 차트 샘플함 항목 
  await expect(page.getByText('차트샘플함')).toBeVisible();
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  await expect(page.getByText('파일').nth(0)).toBeVisible();
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  // 등록일 오래된 순
  await expect(page.locator('#orderby-drive-input')).toBeVisible();
  await page.locator('#orderby-drive-input').click();
  await page.locator('#orderby-drive-input').selectOption('createdAt asc');
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('추가테스트', { exact: true })).toBeVisible();
  await expect(page.getByText('파일').nth(0)).toBeVisible();
  await expect(page.getByText('ic-call-recall.png')).toBeVisible();
  // 이름 오름차순
  await expect(page.locator('#orderby-drive-input')).toBeVisible();
  await page.locator('#orderby-drive-input').click();
  await page.locator('#orderby-drive-input').selectOption('name asc');
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('자동화')).toBeVisible();
  await expect(page.getByText('파일').nth(0)).toBeVisible();
  await expect(page.getByText('.jpg', { exact: true })).toBeVisible();
  // 이름 내림차순
  await expect(page.locator('#orderby-drive-input')).toBeVisible();
  await page.locator('#orderby-drive-input').click();
  await page.locator('#orderby-drive-input').selectOption('name desc');
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('(하나)', { exact: true })).toBeVisible();
  await expect(page.getByText('파일').nth(0)).toBeVisible();
  await expect(page.getByText('확장자테스트')).toBeVisible();
  // 등록일 최신순
  await expect(page.locator('#orderby-drive-input')).toBeVisible();
  await page.locator('#orderby-drive-input').click();
  await page.locator('#orderby-drive-input').selectOption('createdAt desc');
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  await expect(page.getByText('파일').nth(0)).toBeVisible();
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  // 검색
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('자동화');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  // 검색 확인
  await expect(page.getByText('폴더')).toBeVisible();
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  await expect(page.getByText('파일')).toBeVisible();
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  // 폴더 복사
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^폴더자동화$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^폴더자동화$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '복사' })).toBeVisible();
  await page.getByRole('menuitem', { name: '복사' }).click();
  await expect(page.getByText('폴더를 복사했습니다')).toBeVisible();
  // 파일 복사
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^파일자동화_확인용\.jpg$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^파일자동화_확인용\.jpg$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '복사' })).toBeVisible();
  await page.getByRole('menuitem', { name: '복사' }).click();
  await expect(page.getByText('파일을 복사했습니다')).toBeVisible();
  await expect(page.getByText('자동화_확인용(1).jpg')).toBeVisible();
  // 폴더 이름 변경
  await expect(page.getByText('자동화(1)')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^폴더자동화\(1\)자동화$/ }).getByRole('button').first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^폴더자동화\(1\)자동화$/ }).getByRole('button').first().click();
  // 폴더 이름 변경 팝업
  await expect(page.getByRole('menuitem', { name: '이름 변경' })).toBeVisible();
  await page.getByRole('menuitem', { name: '이름 변경' }).click();
  await expect(page.getByRole('heading', { name: '이름변경' })).toBeVisible();
  await expect(page.getByText('폴더 이름')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '폴더 이름' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더 이름' }).click();
  await page.getByRole('textbox', { name: '폴더 이름' }).fill('폴더_수정본');
  await expect(page.getByRole('button', { name: '변경' })).toBeVisible();
  await page.getByRole('button', { name: '변경' }).click();
  await expect(page.getByText('폴더 이름을 변경했습니다')).toBeVisible();
  // 파일 이름 변경
  await expect(page.getByText('자동화_확인용(1).jpg')).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: /^$/ }).nth(2)).toBeVisible();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await expect(page.getByRole('menuitem', { name: '이름 변경' })).toBeVisible();
  await page.getByRole('menuitem', { name: '이름 변경' }).click();
  await expect(page.getByRole('heading', { name: '이름변경' })).toBeVisible();
  await expect(page.getByText('파일 이름')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '파일 이름' })).toBeVisible();
  await page.getByRole('textbox', { name: '파일 이름' }).click();
  await page.getByRole('textbox', { name: '파일 이름' }).fill('파일_수정본');
  await expect(page.getByRole('button', { name: '변경' })).toBeVisible();
  await page.getByRole('button', { name: '변경' }).click();
  await expect(page.getByText('파일 이름을 변경했습니다')).toBeVisible();
  // 이름 수정 파일 및 폴더 검색
  await expect(page.getByText('차트샘플함')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('수정본');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  // 검색 확인
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('폴더_수정본')).toBeVisible();
  await expect(page.getByText('파일', { exact: true })).toBeVisible();
  await expect(page.getByText('파일_수정본')).toBeVisible();
  // 폴더 삭제
  await expect(page.getByText('폴더', { exact: true })).toBeVisible();
  await expect(page.getByText('폴더_수정본')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^폴더폴더_수정본$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^폴더폴더_수정본$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('폴더를 삭제했습니다')).toBeVisible();
  // 파일 삭제
  await expect(page.getByText('파일', { exact: true })).toBeVisible();
  await expect(page.getByText('파일_수정본')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^파일파일_수정본$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^파일파일_수정본$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('파일을 삭제했습니다')).toBeVisible();
  // 수정본 검색 재검색
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('수정본');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  // 검색 초기화
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();



});