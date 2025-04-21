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
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('차팅이력');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '차팅이력_확인용' })).toBeVisible();
  await page.getByRole('button', { name: '차팅이력_확인용' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  // 차팅이력
  await expect(page.getByRole('tab', { name: '차팅이력' })).toBeVisible();
  // 차팅이력 > 부서선택
  await page.getByRole('button', { name: '부서선택' }).click();
  await expect(page.getByRole('option', { name: '상담 - 상담사A2' })).toBeVisible();
  await page.getByRole('option', { name: '상담 - 상담사A2' }).click();
  // 배경 선택
  await page.locator('.MuiBackdrop-root').click();
  // 부서선택 확인
  await expect(page.locator('#chartItemsDiv').getByText('예약').first()).toBeVisible();
  // 차팅이력 > 부서선택
  await page.getByRole('button', { name: '상담 - 상담사A2' }).click();
  await expect(page.getByRole('option', { name: '상담 - 상담사B' })).toBeVisible();
  await page.getByRole('option', { name: '상담 - 상담사B' }).click();
  // 배경 선택
  await page.locator('.MuiBackdrop-root').click();
  await expect(page.locator('#chartItemsDiv').getByText('예약').first()).toBeVisible();
  await expect(page.locator('#chartItemsDiv').getByText('예약').nth(2)).toBeVisible();
  // 차팅이력 > 부서선택
  await page.getByRole('button', { name: '상담 - 상담사A2, 상담 - 상담사B' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '상담 - 상담사C' })).toBeVisible();
  await page.getByRole('option', { name: '상담 - 상담사C' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '상담 - 상담사D' })).toBeVisible();
  await page.getByRole('option', { name: '상담 - 상담사D' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '쁘띠 - 리쥬란' })).toBeVisible();
  await page.getByRole('option', { name: '쁘띠 - 리쥬란' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '쁘띠 - 울쎄라' })).toBeVisible();
  await page.getByRole('option', { name: '쁘띠 - 울쎄라' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '쁘띠 - 슈링크' })).toBeVisible();
  await page.getByRole('option', { name: '쁘띠 - 슈링크' }).click();
  await page.waitForTimeout(1000);
  // 배경 선택
  await page.locator('.MuiBackdrop-root').click();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(0)).toBeVisible();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(1)).toBeVisible();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(2)).toBeVisible();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(3)).toBeVisible();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(4)).toBeVisible();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(5)).toBeVisible();
  await expect(page.locator('div[type="APPOINTMENT"]').nth(6)).toBeVisible();
  // 차팅이력 > 전체접기
  await expect(page.getByRole('button', { name: '전체 접기' })).toBeVisible();
  await page.getByRole('button', { name: '전체 접기' }).click();
  await expect(page.getByRole('button', { name: '전체 펼치기' })).toBeVisible();
  // 차팅이력 > 전체접기 > 전체 펼치기
  await expect(page.getByRole('button', { name: '전체 펼치기' })).toBeVisible();
  await page.getByRole('button', { name: '전체 펼치기' }).click();
  await expect(page.getByRole('button', { name: '전체 접기' })).toBeVisible();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  // 차팅이력 > 부서 선택 해제
  await page.getByRole('button', { name: '상담 - 상담사A2, 상담 - 상담사B' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('상담 - 상담사A2', { exact: true })).toBeVisible();
  await page.getByText('상담 - 상담사A2', { exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('상담 - 상담사B', { exact: true })).toBeVisible();
  await page.getByText('상담 - 상담사B', { exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('상담 - 상담사C', { exact: true })).toBeVisible();
  await page.getByText('상담 - 상담사C', { exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('상담 - 상담사D', { exact: true })).toBeVisible();
  await page.getByText('상담 - 상담사D', { exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('쁘띠 - 리쥬란', { exact: true })).toBeVisible();
  await page.getByText('쁘띠 - 리쥬란', { exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('쁘띠 - 울쎄라', { exact: true })).toBeVisible();
  await page.getByText('쁘띠 - 울쎄라', { exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#menu-').getByText('쁘띠 - 슈링크')).toBeVisible();
  await page.getByText('쁘띠 - 슈링크', { exact: true }).nth(1).click();
  await page.waitForTimeout(1000);
  // 배경 선택
  await page.locator('.MuiBackdrop-root').click();
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();







});