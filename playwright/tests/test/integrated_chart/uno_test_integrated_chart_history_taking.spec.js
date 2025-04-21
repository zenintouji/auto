import { test, expect } from '@playwright/test';

test.setTimeout(60000);

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
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' }).nth(0)).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 통합차트
  await expect(page.getByText('통합차트').nth(0)).toBeVisible();
  await page.getByText('문진 (0)').click();
  await expect(page.getByRole('button', { name: '+ 문진등록' })).toBeVisible();
  // 문진 진입
  await expect(page.getByRole('button', { name: '+ 문진등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 문진등록' }).click();
  // 문진 선택
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await page.getByRole('row', { name: '문진 자동화' }).getByRole('cell').nth(1).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  // 문진 등록
  await expect(page.getByRole('heading', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 }).nth(0)).toHaveText(/^문진 등록/);
  // 문진 타이틀
  await expect(page.getByRole('heading', { name: '문진 자동화' })).toBeVisible();
  // 문진 상단 안내 문구
  await expect(page.getByText('문진 상단 안내 문구 자동화')).toBeVisible();
  // 질문1
  await expect(page.getByRole('heading', { name: '주관식 질문*' })).toBeVisible();
  await page.getByRole('textbox', { name: '답변 입력란' }).click();
  await page.getByRole('textbox', { name: '답변 입력란' }).fill('주관식 답변 자동화');
  // 질문2
  await expect(page.getByRole('heading', { name: '객관식 1건 선택 *' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('항목1')).toBeVisible();
  await page.getByRole('radio', { name: '항목1' }).check();
  // 질문2 > 항목 선택해제
  await page.getByRole('button', { name: '선택해제' }).click();
  await expect(page.getByRole('radiogroup').getByText('항목2')).toBeVisible();
  await page.getByRole('radio', { name: '항목2' }).check();
  // 질문3
  await expect(page.getByRole('heading', { name: '객관식 다건 선택*' })).toBeVisible();
  await expect(page.getByText('항목1').nth(1)).toBeVisible();
  await page.getByRole('checkbox', { name: '항목1' }).check();
  await expect(page.getByText('항목2').nth(1)).toBeVisible();
  await page.getByRole('checkbox', { name: '항목2' }).check();
  await expect(page.getByText('항목3').nth(1)).toBeVisible();
  await page.getByRole('checkbox', { name: '항목3' }).check();
  // 질문4
  await expect(page.getByRole('heading', { name: '이용동의*' })).toBeVisible();
  await expect(page.getByText('1. 개인정보의 수집･이용 목적 : 2')).toBeVisible();
  await expect(page.getByText('개인정보의 수집 및 이용에 동의합니다')).toBeVisible();
  await page.getByRole('checkbox', { name: '개인정보의 수집 및 이용에 동의합니다' }).check();
  await expect(page.getByRole('button', { name: '저장', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  // 저장
  await expect(page.getByText('문진 저장을 성공하였습니다')).toBeVisible();
  // 문진 등록 확인
  await expect(page.getByRole('cell', { name: '완료' })).toBeVisible(); // 상태
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible(); // 제목
  await expect(page.getByRole('cell', { name: 'dev' })).toBeVisible(); // 작성자
  // 문진 선택
  await page.getByRole('button', { name: '+ 문진등록' }).click();
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await page.getByRole('row', { name: '문진 자동화' }).getByRole('cell').nth(1).click();
  await page.getByRole('button', { name: '확인' }).click();
  // 문진 등록
  await expect(page.getByRole('heading', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('button', { name: '임시저장' })).toBeVisible();
  await page.getByRole('button', { name: '임시저장' }).click();
  // 임시 저장
  await expect(page.getByText('임시저장을 성공하였습니다')).toBeVisible();
  // 문진 임시 저장 확인
  await expect(page.getByRole('cell', { name: '미완료' })).toBeVisible(); // 상태
  await expect(page.getByRole('cell', { name: '문진 자동화' }).first()).toBeVisible(); // 제목
  await expect(page.getByRole('cell', { name: 'dev' }).nth(1)).toBeVisible(); // 작성자
  // 문진 전체 선택 > 삭제
  await page.locator('.survey-list-table-wrapper > .sc-hmdomO > thead > tr > th').first().click();
  await expect(page.getByRole('button', { name: '삭제' }).nth(1)).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).nth(1).click();
  // 삭제 안내 팝업
  await expect(page.getByText('정말로 삭제하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('문진이 삭제되었습니다')).toBeVisible();
});