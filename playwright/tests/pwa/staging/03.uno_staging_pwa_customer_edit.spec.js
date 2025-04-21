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
  await page.goto('https://app.staging.unocare.co.kr/login'); // 로그인 화면
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일' }).click();
  await page.getByRole('textbox', { name: '이메일' }).fill('dev@test.com');
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
  await page.getByRole('textbox', { name: '고객명, 전화번호로 검색하세요' }).fill('고객명_pwa');
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('columnheader', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명_pwa_자동화' })).toBeVisible();
  // 고객 정보 화면
  await expect(page.getByRole('cell', { name: '고객명_pwa_자동화' })).toBeVisible();
  await page.getByRole('cell', { name: '고객명_pwa_자동화' }).click();
  await expect(page.getByText('님의 고객정보')).toBeVisible();
  // 고객정보 > 고객정보 탭 내용 확인
  await expect(page.getByRole('tab', { name: '고객정보' })).toBeVisible();
  await expect(page.getByText('7654321')).toBeVisible(); // 차트번호
  await expect(page.getByText('940707-')).toBeVisible(); // 주민등록번호 
  await expect(page.locator('span').filter({ hasText: '-07-06' })).toBeVisible(); // 생년월일
  await expect(page.locator('span').filter({ hasText: /^남성$/ })).toBeVisible(); // 성별
  await expect(page.getByText('내국인')).toBeVisible(); // 내/외국인
  await expect(page.getByText('01014141414')).toBeVisible(); // 전화번호
  await expect(page.getByText('김정연(')).toBeVisible(); // 소개자
  await expect(page.getByText('BEST')).toBeVisible(); // 고객등급
  await expect(page.getByText('-', { exact: true }).first()).toBeVisible(); // 신환 구분일
  await expect(page.getByText('추가정보1 자동화')).toBeVisible(); // 추가정보1
  await expect(page.getByText('추가정보2 자동화')).toBeVisible(); // 추가정보2
  await expect(page.getByText('추가정보3 자동화')).toBeVisible(); // 추가정보3
  await expect(page.getByText('거부').first()).toBeVisible(); // 문자수신
  await expect(page.getByText('거부').nth(1)).toBeVisible(); // 마케팅수신
  await expect(page.getByText('김정연').nth(1)).toBeVisible(); // 담당상담사
  await expect(page.getByText('김정연').nth(2)).toBeVisible(); // 담당의사
  await expect(page.getByText('리프팅, 성형, 피부 시술')).toBeVisible(); // 관심항목
  await expect(page.getByText('굿닥, SNS, 병원홈페이지')).toBeVisible(); // 최초내원경로
  await expect(page.getByText('-', { exact: true }).nth(1)).toBeVisible(); // 주소
  await expect(page.getByText('상세주소 자동화')).toBeVisible(); // 상세주소 자동화
  await expect(page.getByText('회사원')).toBeVisible(); // 회사원
  await expect(page.getByText('미혼')).toBeVisible(); // 결혼여부
  await expect(page.getByText('기타')).toBeVisible(); // 국가/지역
  await expect(page.getByText('시설')).toBeVisible(); // 불만사항
  await expect(page.getByText('jungyun.kim@carelabs.co.krr')).toBeVisible(); // 이메일
  await expect(page.getByText('01042424242')).toBeVisible(); // 전화번호2
  await expect(page.locator('span').filter({ hasText: '김정연/1994-08-08/남성/' })).toBeVisible(); // 가족관계
  await expect(page.getByText('160cm')).toBeVisible(); // 키
  await expect(page.getByText('A형')).toBeVisible(); // 혈액형
  await expect(page.getByText('60kg')).toBeVisible(); // 몸무게
  await expect(page.locator('span').filter({ hasText: /^메모 입력 자동화$/ })).toBeVisible(); // 메모
  await expect(page.getByText('청구 연동 고객메모 입력 자동화')).toBeVisible(); // 청구 연동 고객메모
  // 수정 진입
  await expect(page.getByRole('button', { name: '수정' })).toBeVisible();
  await page.getByRole('button', { name: '수정' }).click();
  await expect(page.getByText('고객명_pwa_자동화(M/만 30세/940706)님의 고객정보 수정')).toBeVisible();
  // 고객수정 > 기본정보
  await expect(page.getByRole('heading', { name: '기본정보' })).toBeVisible();
  // 차트번호
  await expect(page.locator('label').filter({ hasText: '차트번호' })).toBeVisible();
  await expect(page.getByRole('button', { name: '변경' })).toBeVisible();
  await page.getByRole('button', { name: '변경' }).click();
  await expect(page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).click();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('76543210');
  // 고객명
  await expect(page.locator('label').filter({ hasText: '고객명' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '고객명을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '고객명을 입력하세요' }).fill('pwa_자동화_수정');
  // 전화번호
  await expect(page.locator('label').filter({ hasText: /^전화번호$/ })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '전화번호를 입력하세요' }).first()).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).first().click();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).first().fill('010-151-51515');
  // 주민등록번호 앞자리
  await expect(page.locator('label').filter({ hasText: '주민등록번호' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '앞 6자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '앞 6자리' }).click();
  await page.getByRole('textbox', { name: '앞 6자리' }).fill('940706');
  // 주민등록번호 뒷자리
  await expect(page.getByRole('textbox', { name: '1자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '1자리' }).click();
  await page.getByRole('textbox', { name: '1자리' }).fill('2');
  // 생년월일
  await expect(page.getByText('생년월일 (만 나이 자동계산)')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Choose date, selected date is' })).toBeVisible();
  // 성별
  await expect(page.locator('label').filter({ hasText: '성별' })).toBeVisible();
  await expect(page.getByText('여성')).toBeVisible();
  // 청구번호
  await expect(page.getByText('청구번호')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '청구번호 7자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).click();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).fill('1234568');
  // 내/외국인
  await expect(page.locator('label').filter({ hasText: '내/외국인' })).toBeVisible();
  await expect(page.getByText('외국인', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  // 문자수신동의
  await expect(page.getByText('문자수신동의')).toBeVisible();
  // 문자수신 동의
  await expect(page.locator('label').filter({ hasText: /^문자수신$/ })).toBeVisible();
  await expect(page.getByRole('checkbox').first()).toBeVisible();
  await page.getByRole('checkbox').first().check();
  // 마케팅문자 동의
  await expect(page.getByText('마케팅문자 포함')).toBeVisible();
  await expect(page.getByRole('checkbox').nth(1)).toBeVisible();
  await page.getByRole('checkbox').nth(1).check();
  // 최초 내원경로
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await expect(page.getByRole('button', { name: '굿닥' })).toBeVisible();
  await page.getByRole('button', { name: '굿닥' }).click();
  await expect(page.getByRole('option', { name: '병원홈페이지' })).toBeVisible();
  await page.getByRole('option', { name: '병원홈페이지' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('option', { name: 'SNS' }).nth(0)).toBeVisible();
  await page.getByRole('option', { name: 'SNS' }).nth(0).click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  // 소개자
  await expect(page.locator('label').filter({ hasText: '소개자' })).toBeVisible();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).click();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).fill('김정연2');
  await expect(page.getByText('-5858-5858')).toBeVisible();
  await page.getByText('-5858-5858').click();
  // 메모
  await expect(page.locator('label').filter({ hasText: /^메모$/ })).toBeVisible();
  await expect(page.getByRole('paragraph')).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.locator('pre div').filter({ hasText: '메모 입력 자동화' }).fill('메모 입력 자동화 수정');
  // 청구 연동 고객메모
  await expect(page.locator('label').filter({ hasText: '청구 연동 고객메모' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).fill('청구 연동 고객메모 입력 자동화 수정');
  // 추가정보1
  await expect(page.locator('label').filter({ hasText: '추가정보1' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first()).toBeVisible();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first().click();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first().fill('추가정보1 자동화');
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first().fill('추가정보1 자동화 수정');
  // 추가정보2
  await expect(page.locator('label').filter({ hasText: '추가정보2' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(1)).toBeVisible();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(1).click();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(1).fill('추가정보2 자동화 수정');
  // 추가정보3
  await expect(page.locator('label').filter({ hasText: '추가정보3' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(2)).toBeVisible();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(2).click();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(2).fill('추가정보3 자동화 수정');
  // 고객수정 > 진료정보
  await expect(page.getByRole('heading', { name: '진료정보' })).toBeVisible();
  // 담당상담사
  await expect(page.locator('label').filter({ hasText: '담당상담사' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '변준영' }).nth(0).click();
  // 담당의사
  await expect(page.locator('label').filter({ hasText: '담당의사' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '이지혜' }).click();
  // 관심항목
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await expect(page.getByRole('button', { name: '성형' })).toBeVisible();
  await page.getByRole('button', { name: '성형' }).click();
  await page.getByRole('option', { name: '리프팅' }).click();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  // 고객등급
  await expect(page.locator('label').filter({ hasText: '고객등급' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '고객등급을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '고객등급을 선택하세요' }).click();
  await page.getByRole('option', { name: 'TOP' }).click();
  // 고객수정 > 상세정보 탭
  await expect(page.getByRole('tab', { name: '상세정보' })).toBeVisible();
  // 주소
  await expect(page.getByText('주소', { exact: true }).nth(1)).toBeVisible();
  await expect(page.getByRole('textbox', { name: '주소를 검색하세요' })).toBeVisible();
  // 상세주소
  await expect(page.getByText('상세주소').nth(2)).toBeVisible();
  await expect(page.getByRole('textbox', { name: '상세주소를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).fill('상세주소 자동화 수정');
  // 직업
  await expect(page.getByText('직업').nth(1)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '직업을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '직업을 선택하세요' }).click();
  await page.getByRole('option', { name: '전문특수직' }).click();
  // 결혼여부
  await expect(page.getByText('결혼여부').nth(1)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '결혼 여부를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '결혼 여부를 선택하세요' }).click();
  await page.getByRole('option', { name: '기혼' }).click();
  // 국가/지역
  await expect(page.getByText('국가/지역').nth(1)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '국가/지역을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '국가/지역을 선택하세요' }).click();
  await page.getByRole('option', { name: '태국' }).click();
  // 불만사항
  await expect(page.getByText('불만사항').nth(1)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '불만사항을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '불만사항을 선택하세요' }).click();
  await page.getByRole('option', { name: '주차' }).click();
  // 이메일
  await expect(page.getByText('이메일').nth(1)).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).fill('jungyun.kim@carelabs.co.kr');
  // 전화번호
  await expect(page.getByText('전화번호').nth(4)).toBeVisible();
  await expect(page.getByRole('textbox', { name: '전화번호를 입력하세요' }).nth(1)).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).nth(1).click();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).nth(1).fill('010-232-32323');
  // 고객수정 > 가족관계 탭
  await expect(page.getByRole('tab', { name: '가족관계' })).toBeVisible();
  await page.getByRole('tab', { name: '가족관계' }).click();
  // 가족관계
  await expect(page.getByText('가족관계').nth(2)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '가족관계를 등록하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).fill('김정연2');
  await page.waitForTimeout(3000);
  await expect(page.getByText('-5858-5858')).toBeVisible();
  await page.getByText('-5858-5858').click();
  // 가족관계 추가
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
  await page.getByRole('button', { name: '+' }).click();
  // 가족관계 추가
  await expect(page.getByRole('combobox', { name: '가족관계를 등록하세요' }).nth(1)).toBeVisible();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).nth(1).click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).nth(1).fill('김정연');
  await page.waitForTimeout(3000);
  await expect(page.getByText('-8948-4318')).toBeVisible();
  await page.getByText('-8948-4318').click();
  // 고객수정 > 신체정보 탭
  await expect(page.getByRole('tab', { name: '신체정보' })).toBeVisible();
  await page.getByRole('tab', { name: '신체정보' }).click();
  // 키
  await expect(page.getByText('키').nth(1)).toBeVisible();
  await expect(page.getByRole('textbox', { name: '키를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).fill('170');
  await expect(page.getByText('혈액형').nth(1)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '혈액형' })).toBeVisible();
  await page.getByRole('combobox', { name: '혈액형' }).click();
  await page.getByRole('option', { name: 'B', exact: true }).click();
  await expect(page.getByText('몸무게').nth(1)).toBeVisible();
  await expect(page.getByRole('textbox', { name: '몸무게를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).fill('70');
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('수정되었습니다')).toBeVisible();






});