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
  // 공지사항 영역 접기
  await expect(page.getByRole('button', { name: '공지사항' })).toBeVisible();
  await page.getByRole('button', { name: '공지사항' }).click();
  await page.waitForTimeout(1000);
  // 공지사항 영역 펴기
  await expect(page.getByRole('button', { name: '공지사항' })).toBeVisible();
  await page.getByRole('button', { name: '공지사항' }).click();
  await page.waitForTimeout(1000);
  // 공지사항 작성
  await expect(page.getByRole('button', { name: '작성' })).toBeVisible();
  await page.getByRole('button', { name: '작성' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('종류선택')).toBeVisible();
  // 공지사항 작성 취소
  await expect(page.getByRole('button', { name: '취소', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await page.waitForTimeout(1000);
  // 공지사항 작성
  await expect(page.getByRole('button', { name: '작성' })).toBeVisible();
  await page.getByRole('button', { name: '작성' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('종류선택')).toBeVisible();
  // 일일공지
  await expect(page.getByRole('button', { name: '일일공지' })).toBeVisible();
  await page.getByRole('button', { name: '일일공지' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('게시기간')).toBeVisible();
  // 일일공지 내용 입력
  await page.locator('pre div').first().click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').first().fill('일일공지 작성 자동화');
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  await expect(page.getByText('일일공지 작성 자동화')).toBeVisible();
  await page.getByText('일일공지 작성 자동화').hover();
  await page.waitForTimeout(1000);
  // 일일공지 수정
  await page.locator('div').filter({ hasText: /dev일일공지 작성 자동화모든 공지를 불러왔습니다\.$/ }).getByRole('button').nth(1).click();
  await expect(page.getByRole('button', { name: '일일공지' })).toBeVisible();
  await expect(page.getByText('게시기간')).toBeVisible();
  await expect(page.getByText('일일공지 작성 자동화')).toBeVisible();
  // 일일공지 내용 수정
  await page.getByText('일일공지 작성 자동화').click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').filter({ hasText: '일일공지 작성 자동화' }).fill('일일공지 작성 자동화 수정');
  await expect(page.getByRole('button', { name: '취소', exact: true })).toBeVisible();
  await page.waitForTimeout(1000);
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  // 일일공지 수정 확인
  await expect(page.getByRole('button', { name: '공지사항' })).toBeVisible();
  await expect(page.getByText('일일공지 작성 자동화 수정')).toBeVisible();
  await page.getByText('일일공지 작성 자동화 수정').hover();
  await page.waitForTimeout(1000);
  // 일일공지 고정
  await page.locator('div').filter({ hasText: /dev일일공지 작성 자동화 수정모든 공지를 불러왔습니다\.$/ }).getByRole('button').nth(3).click();
  await expect(page.getByText('일일공지 작성 자동화 수정')).toBeVisible();
  await page.getByText('일일공지 작성 자동화').hover();
  await page.waitForTimeout(1000);
  // 일일공지 삭제
  await page.locator('div').filter({ hasText: /dev일일공지 작성 자동화 수정모든 공지를 불러왔습니다\.$/ }).getByRole('button').nth(2).click();
  await expect(page.getByText('게시글을 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // 공지사항
  await expect(page.getByRole('button', { name: '공지사항' })).toBeVisible();
  await expect(page.getByRole('button', { name: '작성' })).toBeVisible();
  await page.getByRole('button', { name: '작성' }).click();
  await page.waitForTimeout(1000);
  // 전체공지 작성
  await expect(page.getByText('종류선택')).toBeVisible();
  await expect(page.getByRole('button', { name: '전체공지' })).toBeVisible();
  await page.getByRole('button', { name: '전체공지' }).click();
  await page.waitForTimeout(1000);
  // 전체공지 내용 입력
  await page.locator('pre div').first().click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').first().fill('전체공지 작성 자동화');
  // save
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  // 전체공지 작성 확인
  await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  await page.getByText('전체공지 작성 자동화').hover();
  await page.waitForTimeout(1000);
  // await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(3).waitFor();
  // await page.waitForTimeout(1000);
  await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(3).click();
  // 전체공지 수정
  await expect(page.getByText('종류선택')).toBeVisible();
  await expect(page.getByRole('button', { name: '전체공지' })).toBeVisible();
  await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  await page.getByText('전체공지 작성 자동화').click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').filter({ hasText: '전체공지 작성 자동화' }).fill('전체공지 작성 자동화 수정');
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('전체공지 작성 자동화 수정')).toBeVisible();
  // 전체공지 고정
  await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  await page.getByText('전체공지 작성 자동화').hover();
  await page.waitForTimeout(1000);
  await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(5).click();
  // 전체공지 고정 확인
  await expect(page.getByText('전체공지 작성 자동화 수정')).toBeVisible();
  // 전체공지 삭제
  await expect(page.getByText('전체공지 작성 자동화')).toBeVisible();
  await page.getByText('전체공지 작성 자동화').hover();
  await page.waitForTimeout(1000);
  await page.locator('.MuiButtonBase-root.MuiIconButton-root').nth(4).click();
  // 전체공지 삭제 안내 팝업
  await expect(page.getByText('게시글을 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();


  







});