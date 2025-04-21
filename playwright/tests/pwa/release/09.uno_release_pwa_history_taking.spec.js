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
  await expect(page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).click();
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).fill('pwa_자동화');
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('columnheader', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'pwa_자동화_수정' })).toBeVisible();
  // 고객정보
  await page.getByRole('cell', { name: 'pwa_자동화_수정' }).click();
  await expect(page.getByText('님의 고객정보')).toBeVisible();
  // 고객정보 > 문진 탭
  await expect(page.getByRole('tab', { name: '문진' })).toBeVisible();
  await page.getByRole('tab', { name: '문진' }).click();
  await expect(page.getByRole('columnheader', { name: 'No.' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '상태' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '일자' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '제목' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: '작성자' })).toBeVisible();
  // 문진 등록
  await expect(page.getByRole('button', { name: '문진등록' })).toBeVisible();
  await page.getByRole('button', { name: '문진등록' }).click();
  // 문진 선택 팝업
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('button', { name: '문진 자동화' })).toBeVisible();
  await page.getByRole('button', { name: '문진 자동화' }).click();
  // 문진 작성 진입
  await expect(page.locator('div').filter({ hasText: /^pwa_자동화_수정\(F\/만 30세\/940706\)$/ }).nth(1)).toBeVisible();
  // 타이틀
  await expect(page.getByRole('heading', { name: '문진 자동화' })).toBeVisible();
  // 문진 내용
  await expect(page.getByText('문진 상단 안내 문구 자동화')).toBeVisible();
  // 주관식 질문
  await expect(page.getByRole('heading', { name: '주관식 질문*' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '답변 입력란' })).toBeVisible();
  await page.getByRole('textbox', { name: '답변 입력란' }).click();
  await page.getByRole('textbox', { name: '답변 입력란' }).fill('주관식 답변');
  // 객관식 1건 질문
  await expect(page.getByRole('heading', { name: '객관식 1건 선택*' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('항목1')).toBeVisible();
  await expect(page.getByRole('radio', { name: '항목1' })).toBeVisible();
  await page.getByRole('radio', { name: '항목1' }).check();
  // 객관식 다건 질문
  await expect(page.getByRole('heading', { name: '객관식 다건 선택*' })).toBeVisible();
  await expect(page.getByText('항목1').nth(1)).toBeVisible();
  await expect(page.getByRole('checkbox', { name: '항목1' })).toBeVisible();
  await page.getByRole('checkbox', { name: '항목1' }).check();
  await expect(page.getByText('항목2').nth(1)).toBeVisible();
  await expect(page.getByRole('checkbox', { name: '항목2' })).toBeVisible();
  await page.getByRole('checkbox', { name: '항목2' }).check();
  await expect(page.getByText('항목3').nth(1)).toBeVisible();
  await expect(page.getByRole('checkbox', { name: '항목3' })).toBeVisible();
  await page.getByRole('checkbox', { name: '항목3' }).check();
  // 이용동의
  await expect(page.getByRole('heading', { name: '이용동의*' })).toBeVisible();
  await expect(page.getByText('1. 개인정보의 수집･이용 목적 : 2')).toBeVisible();
  await expect(page.getByText('개인정보의 수집 및 이용에 동의합니다')).toBeVisible();
  await expect(page.getByRole('checkbox', { name: '개인정보의 수집 및 이용에 동의합니다' })).toBeVisible();
  await page.getByRole('checkbox', { name: '개인정보의 수집 및 이용에 동의합니다' }).check();
  // 저장
  await expect(page.getByRole('button', { name: '저장', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await expect(page.getByText('문진 저장을 성공하였습니다')).toBeVisible();
  // 저장 완료 
  await expect(page.getByRole('heading', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByText('모든 문항 응답을 완료했으며, 정상적으로 제출되었습니다. 감사합니다')).toBeVisible();
  // 뒤로가기
  await expect(page.getByRole('button')).toBeVisible();
  await page.getByRole('button').click();
  // 고객정보
  await expect(page.getByText('님의 고객정보')).toBeVisible();
  await expect(page.getByRole('tab', { name: '문진' })).toBeVisible();
  // 문진 등록 확인
  await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '완료' })).toBeVisible();
  const today = new Date();
  const todayStrISO = today.toISOString().slice(5,10);
  await expect(page.getByRole('cell', { name: `${todayStrISO}` })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'v2' })).toBeVisible();
  // 임시저장용 문진 등록
  await expect(page.getByRole('button', { name: '문진등록' })).toBeVisible();
  await page.getByRole('button', { name: '문진등록' }).click();
  // 문진 선택 팝업
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('button', { name: '문진 자동화' })).toBeVisible();
  await page.getByRole('button', { name: '문진 자동화' }).click();
  // 문진 등록
  await expect(page.locator('div').filter({ hasText: /^pwa_자동화_수정\(F\/만 30세\/940706\)$/ }).nth(1)).toBeVisible();
  // 타이틀
  await expect(page.getByRole('heading', { name: '문진 자동화' })).toBeVisible();
  // 문진 내용
  await expect(page.getByText('문진 상단 안내 문구 자동화')).toBeVisible();
  // 주관식 질문
  await expect(page.getByRole('heading', { name: '주관식 질문*' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '답변 입력란' })).toBeVisible();
  await page.getByRole('textbox', { name: '답변 입력란' }).click();
  await page.getByRole('textbox', { name: '답변 입력란' }).fill('주관식 답변');
  // 객관식 1건 질문
  await expect(page.getByRole('heading', { name: '객관식 1건 선택*' })).toBeVisible();
  await expect(page.getByRole('radiogroup').getByText('항목1')).toBeVisible();
  await expect(page.getByRole('radio', { name: '항목1' })).toBeVisible();
  await page.getByRole('radio', { name: '항목1' }).check();
  // 임시저장
  await expect(page.getByRole('button', { name: '임시저장' })).toBeVisible();
  await page.getByRole('button', { name: '임시저장' }).click();
  await expect(page.getByText('임시저장을 성공하였습니다')).toBeVisible();
  // 임시저장 등록 확인
  await expect(page.getByRole('cell', { name: '2', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '미완료' })).toBeVisible();
  await expect(page.getByRole('cell', { name: `${todayStrISO}` }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'v2' }).first()).toBeVisible();


});