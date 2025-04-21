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
  // 고객명 검색
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호를 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호를 검색하세요' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).click();
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).fill('pwa_자동화');
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('columnheader', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'pwa_자동화_' })).toBeVisible();
  // 펜차트 > 차트보기
  await expect(page.getByRole('columnheader', { name: '펜차트' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '차트보기' })).toBeVisible();
  // 차트보기 
  await expect(page.getByRole('button', { name: '차트보기' })).toBeVisible();
  await page.getByRole('button', { name: '차트보기' }).click();
  await expect(page.getByText('님의 펜차트')).toBeVisible();
  // 이미지 등록 안내
  await expect(page.getByText('이미지 등록 안내?')).toBeVisible();
  await page.getByText('이미지 등록 안내?').click();
  await expect(page.getByRole('heading', { name: '이미지 등록 안내 close' })).toBeVisible();
  await expect(page.getByText('jpg, png 파일만 등록할 수 있습니다')).toBeVisible();
  await expect(page.getByText('이미지 파일 크기가 50MB')).toBeVisible();
  // 이미지 등록 안내 닫기
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  // + 버튼
  await expect(page.getByRole('button', { name: 'DriveView speed dial' })).toBeVisible();
  await page.getByRole('button', { name: 'DriveView speed dial' }).click();
  // 펜차트 샘플함
  await expect(page.getByRole('menuitem').first()).toBeVisible();
  await page.getByRole('menuitem').first().click();
  await expect(page.getByRole('button', { name: '선택' })).toBeVisible();
  await page.getByRole('button', { name: '선택' }).click();
  await expect(page.getByRole('button', { name: '전체선택' })).toBeVisible();
  // 임의의 폴더 선택
  await expect(page.getByRole('paragraph').filter({ hasText: '자동화' }).nth(0)).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: '자동화' }).nth(0).click();
  // 임의의 사진 선택
  await expect(page.getByText('자동화_확인용.jpg').nth(0)).toBeVisible();
  await page.getByText('자동화_확인용.jpg').click();
  // 업로드
  await expect(page.getByRole('button', { name: '업로드' })).toBeVisible();
  await page.getByRole('button', { name: '업로드' }).click();
  await expect(page.getByText('선택한 파일 및 폴더를 업로드했습니다')).toBeVisible();
  // 고객 펜차트 진입
  await expect(page.getByText('님의 펜차트')).toBeVisible();
  // 폴더명 검색
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('자동화');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  // 폴더 복사
  await expect(page.locator('div').filter({ hasText: /^폴더자동화$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^폴더자동화$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '복사' })).toBeVisible();
  await page.getByRole('menuitem', { name: '복사' }).click();
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  // 폴더 이름 변경
  await expect(page.getByText('자동화', { exact: true })).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: /^$/ }).nth(2)).toBeVisible();
  await expect(page.getByRole('button').nth(2)).toBeVisible();
  await page.getByRole('button').nth(2).click();
  await expect(page.getByRole('menuitem', { name: '이름 변경' })).toBeVisible();
  await page.getByRole('menuitem', { name: '이름 변경' }).click();
  // 폴더 이름 변경 > 팝업
  await expect(page.getByRole('heading', { name: '이름변경' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '폴더 이름' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더 이름' }).click();
  await page.getByRole('textbox', { name: '폴더 이름' }).fill('수정');
  await expect(page.getByRole('button', { name: '변경' })).toBeVisible();
  await page.getByRole('button', { name: '변경' }).click();
  await expect(page.getByText('폴더 이름을 변경했습니다')).toBeVisible();
  // 변경 폴더 이름 검색
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('수정');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  // 폴더 삭제
  await expect(page.getByText('수정').nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^폴더수정$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^폴더수정$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  // 삭제 > 팝업
  await expect(page.getByText('삭제하시겠습니까?')).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('폴더를 삭제했습니다')).toBeVisible();
  await expect(page.getByText('수정').nth(1)).not.toBeVisible();
  // 파일명 검색
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('자동화_확인용');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  // 파일 복사
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^파일자동화_확인용\.jpg$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^파일자동화_확인용\.jpg$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '복사' })).toBeVisible();
  await page.getByRole('menuitem', { name: '복사' }).click();
  await expect(page.getByText('파일을 복사했습니다')).toBeVisible();
  // 파일 이름 변경
  await expect(page.getByText('자동화_확인용(1).jpg')).toBeVisible();
  await expect(page.getByRole('button').nth(2)).toBeVisible();
  await page.getByRole('button').nth(2).click();
  await expect(page.getByRole('menuitem', { name: '이름 변경' })).toBeVisible();
  await page.getByRole('menuitem', { name: '이름 변경' }).click();
  // 이름 변경 > 팝업
  await expect(page.getByRole('heading', { name: '이름변경' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '파일 이름' })).toBeVisible();
  await page.getByRole('textbox', { name: '파일 이름' }).click();
  await page.getByRole('textbox', { name: '파일 이름' }).fill('파일_수정');
  await expect(page.getByRole('button', { name: '변경' })).toBeVisible();
  await page.getByRole('button', { name: '변경' }).click();
  await expect(page.getByText('파일 이름을 변경했습니다')).toBeVisible();
  // 파일명 검색
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('파일_수정');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  // 파일 삭제
  await expect(page.locator('div').filter({ hasText: /^파일파일_수정$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^파일파일_수정$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('파일을 삭제했습니다')).toBeVisible();
  await expect(page.getByText('파일_수정')).not.toBeVisible();
  // 검색어 초기화
  await expect(page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명, 파일명을 검색하세요' }).fill('');
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
//   await expect(page.getByText('자동화(1)')).toBeVisible();
  await expect(page.getByText('자동화').nth(1)).toBeVisible();
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  // 파일 삭제
  await expect(page.getByText('파일')).toBeVisible();
  await expect(page.getByText('자동화_확인용.jpg')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^파일자동화_확인용\.jpg$/ }).getByRole('button')).toBeVisible();
  await page.locator('div').filter({ hasText: /^파일자동화_확인용\.jpg$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('파일을 삭제했습니다')).toBeVisible();
  await page.waitForTimeout(2000);
  // 폴더 삭제
  await expect(page.getByText('폴더')).toBeVisible();
  await expect(page.getByText('자동화').nth(1)).toBeVisible();
  await expect(page.locator('[data-testid="MoreVertIcon"]')).toBeVisible();
  await page.locator('[data-testid="MoreVertIcon"]').click();
//   await expect(page.locator('div').filter({ hasText: /^폴더자동화\(1\)$/ }).getByRole('button')).toBeVisible();
//   await page.locator('div').filter({ hasText: /^폴더자동화\(1\)$/ }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('폴더를 삭제했습니다')).toBeVisible();




});