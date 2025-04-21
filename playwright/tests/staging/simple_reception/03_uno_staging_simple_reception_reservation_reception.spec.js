import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://app.staging.unocare.co.kr/login'); // 간편접수 로그인 화면
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일' }).click();
  await page.getByRole('textbox', { name: '이메일' }).fill('sample@test.com');
  await expect(page.getByRole('textbox', { name: '●●●●●●●●' })).toBeVisible();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).click();
  await page.getByRole('textbox', { name: '●●●●●●●●' }).fill('samp2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 화면 진입
  await expect(page.getByText('전화번호로 접수를 시작합니다')).toBeVisible();
  // 휴대폰 번호 입력
  await expect(page.getByRole('button', { name: '8' })).toBeVisible();
  await page.getByRole('button', { name: '8' }).click();
  await expect(page.getByRole('button', { name: '1' })).toBeVisible();
  await page.getByRole('button', { name: '1' }).click();
  await expect(page.getByRole('button', { name: '8' })).toBeVisible();
  await page.getByRole('button', { name: '8' }).click();
  await expect(page.getByRole('button', { name: '1' })).toBeVisible();
  await page.getByRole('button', { name: '1' }).click();
  await expect(page.getByRole('button', { name: '8' })).toBeVisible();
  await page.getByRole('button', { name: '8' }).click();
  await expect(page.getByRole('button', { name: '1' })).toBeVisible();
  await page.getByRole('button', { name: '1' }).click();
  await expect(page.getByRole('button', { name: '8' })).toBeVisible();
  await page.getByRole('button', { name: '8' }).click();
  await expect(page.getByRole('button', { name: '1' })).toBeVisible();
  await page.getByRole('button', { name: '1' }).click();
  // 다음
  await expect(page.getByRole('button', { name: '다음' })).toBeVisible();
  await page.getByRole('button', { name: '다음' }).click();
  // 접수 화면 진입
  await expect(page.getByText('다음과 같은 고객 정보가 조회되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '새로운 고객으로 접수하겠습니다' })).toBeVisible();
  await expect(page.getByRole('button', { name: '접수하기' })).toBeVisible();
  await page.getByRole('button', { name: '접수하기' }).click();
  await expect(page.getByText('초 뒤에 첫 화면으로 돌아갑니다.')).toBeVisible();
  await expect(page.getByRole('button', { name: '메인화면으로 이동' })).toBeVisible();
  await page.waitForTimeout(5000);
  // 시간 대기 후, 번호 입력 화면 돌아옴
  await expect(page.getByText('전화번호로 접수를 시작합니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '1' })).toBeVisible();

  


});