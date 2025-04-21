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
  await expect(page.getByRole('button', { name: 'icon-settings 환경 설정' })).toBeVisible();
  await expect(page.getByRole('button', { name: '수납코드 설정' })).toBeVisible();
  await page.getByRole('button', { name: '수납코드 설정' }).click();
  // 수납코드 설정
  await expect(page.getByRole('heading', { name: '수납코드 설정' })).toBeVisible();
  await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
  await page.getByRole('button', { name: '추가' }).click();
  // 시/수술 추가 팝업
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  await expect(page.getByLabel('시/수술 추가').getByText('카테고리', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '카테고리 추가' })).toBeVisible();
  await page.getByRole('button', { name: '카테고리 추가' }).click();
  // 시/수술 추가 팝업 > 카테고리 추가
  await expect(page.getByRole('heading', { name: '카테고리 추가 close' })).toBeVisible();
  await expect(page.getByLabel('카테고리 추가').getByText('카테고리', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가할 카테고리명을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '추가할 카테고리명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '추가할 카테고리명을 입력하세요' }).fill('수납코드 설정 카테고리 자동화 삭제용');
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 카테고리 추가되고 시/수술 추가 팝업으로
  await expect(page.getByRole('heading', { name: '시/수술 추가 close' })).toBeVisible();
  await expect(page.getByLabel('시/수술 추가').getByText('카테고리', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '카테고리를 선택해주세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '카테고리를 선택해주세요' }).click();
  await expect(page.getByRole('option', { name: '수납코드 설정 카테고리 자동화 삭제용' })).toBeVisible();
  await page.getByRole('option', { name: '수납코드 설정 카테고리 자동화 삭제용' }).click();
  // 시/수술 추가 팝업 > 시/수술 추가
  await expect(page.getByRole('cell', { name: '시/수술명 *' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '시/수술명을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '시/수술명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '시/수술명을 입력하세요' }).fill('수납코드 설정 시/수술명 자동화 삭제용');
  // 시/수술횟수
  await expect(page.getByRole('cell', { name: '시/수술횟수 *' })).toBeVisible();
  await expect(page.locator('button[name="plus"]')).toBeVisible();
  await page.locator('button[name="plus"]').click();
  // 적정시술주기
  await expect(page.getByRole('cell', { name: '적정시술주기 *' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '없음' })).toBeVisible();
  await page.getByRole('combobox', { name: '없음' }).click();
  await page.getByRole('option', { name: '1일 후' }).click();
  // 과세
  await expect(page.getByRole('cell', { name: '과세 *' })).toBeVisible();
  await expect(page.getByRole('checkbox')).toBeVisible();
  await page.getByRole('checkbox').check();
  // 금액
  await expect(page.getByRole('cell', { name: '금액 *' })).toBeVisible();
  await expect(page.getByRole('textbox').nth(2)).toBeVisible();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('100,000');
  // VAT 제외
  await expect(page.getByRole('cell', { name: 'VAT 제외' })).toBeVisible();
  // 시/수술 추가 +
  await expect(page.getByRole('cell', { name: '+', exact: true }).getByRole('button')).toBeVisible();
  await page.getByRole('cell', { name: '+', exact: true }).getByRole('button').click();
  // 시/수술 추가 + > 시/수술명
  await expect(page.getByRole('cell', { name: '시/수술명 *' })).toBeVisible();
  await page.getByPlaceholder('시/수술명을 입력하세요.').nth(1).click();
  await page.getByPlaceholder('시/수술명을 입력하세요.').nth(1).fill('수납코드 설정 시/수술명 비과세 자동화 삭제용');
  await expect(page.getByRole('cell', { name: '시/수술횟수 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '적정시술주기 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '과세 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '금액 *' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'VAT 제외' })).toBeVisible();
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('저장되었습니다')).toBeVisible();
  // 저장되고, 수납코드 설정 화면으로 이동
  await expect(page.getByRole('heading', { name: '수납코드 설정' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '카테고리 검색' })).toBeVisible();
  await page.getByRole('textbox', { name: '카테고리 검색' }).click();
  await page.getByRole('textbox', { name: '카테고리 검색' }).fill('삭제용');
  await expect(page.getByRole('textbox', { name: '시/수술명 검색' })).toBeVisible();
  await page.getByRole('textbox', { name: '시/수술명 검색' }).click();
  await page.getByRole('textbox', { name: '시/수술명 검색' }).fill('삭제용');
  await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
  await page.getByRole('button', { name: '검색' }).click();
  // 검색 확인
  // 카테고리
  await expect(page.getByText('수납코드 설정 카테고리 자동화 삭제용')).toBeVisible();
  // 시/수술명
  await expect(page.getByText('수납코드 설정 시/수술명 자동화 삭제용')).toBeVisible();
  await expect(page.getByText('수납코드 설정 시/수술명 비과세 자동화 삭제용')).toBeVisible();
  // 시/수술 횟수
  await expect(page.getByText('2회')).toBeVisible();
  await expect(page.getByText('1회')).toBeVisible();
  // 적정시술주기
  await expect(page.getByText('일 후')).toBeVisible();
  await expect(page.getByText('-', { exact: true })).toBeVisible();
  // 과세여부
  await expect(page.getByText('과세', { exact: true })).toBeVisible();
  await expect(page.getByText('비과세', { exact: true })).toBeVisible();
  // 금액
  await expect(page.getByText('100,000')).toBeVisible();
  await expect(page.getByText('0', { exact: true }).nth(2)).toBeVisible();
  // VAT 제외
  await expect(page.getByText('90,909')).toBeVisible();
  await expect(page.getByText('0', { exact: true }).nth(3)).toBeVisible();
  // 시/수술명 삭제
  await expect(page.getByRole('button', { name: '삭제' }).nth(2)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(2).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByText('수납코드 설정 시/수술명 비과세 자동화 삭제용')).not.toBeVisible();
  // 카테고리 삭제
  await expect(page.getByRole('button', { name: '삭제' }).first()).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).first().click();
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByText('수납코드 설정 카테고리 자동화 삭제용')).not.toBeVisible();

});