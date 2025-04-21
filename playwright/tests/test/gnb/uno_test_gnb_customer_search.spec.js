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
  // 고객명 검색
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객명, 전화번호' }).fill('자동화');
  await expect(page.getByRole('button', { name: '조회', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '조회', exact: true }).click();
  await page.waitForTimeout(1000);
  // 고객조회 팝업
  await expect(page.getByRole('heading', { name: '고객조회 close' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  // 전화번호 검색
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객명, 전화번호' }).fill('01035353535');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '조회', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '조회', exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '고객조회 close' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '전화번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-3535-3535' })).toBeVisible();
  // 틀린 차트번호 검색
  await expect(page.getByRole('textbox', { name: '차트번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '차트번호' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '차트번호' }).fill('1234567');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('cell', { name: '검색된 고객이 없습니다' })).toBeVisible();
  // 맞는 차트번호 검색
  await expect(page.getByRole('textbox', { name: '차트번호' })).toBeVisible();
  await page.getByRole('textbox', { name: '차트번호' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '차트번호' }).fill('1234568');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('cell', { name: '차트번호' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234568' })).toBeVisible();
  // 틀린 생년월일 검색
  await expect(page.getByRole('textbox', { name: '생년월일 6자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '생년월일 6자리' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '생년월일 6자리' }).fill('940506');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('cell', { name: '검색된 고객이 없습니다' })).toBeVisible();
  // 맞는 생년월일 검색
  await expect(page.getByRole('textbox', { name: '생년월일 6자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '생년월일 6자리' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '생년월일 6자리' }).fill('940505');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '조회' })).toBeVisible();
  await page.getByRole('button', { name: '조회' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('cell', { name: '생년월일' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '-05-05' })).toBeVisible();
  // 고객조회 팝업 닫기
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  await page.waitForTimeout(1000);

});