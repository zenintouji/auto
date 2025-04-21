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
  // 고객등록
  await expect(page.getByRole('button', { name: '+ 고객 등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 고객 등록' }).click();
  await expect(page.getByText('고객등록')).toBeVisible();
  // 고객등록 > 기본정보
  await expect(page.getByRole('heading', { name: '기본정보' })).toBeVisible();
  // 차트번호
  await expect(page.getByText('차트번호')).toBeVisible();
  await expect(page.getByRole('button', { name: '직접입력' })).toBeVisible();
  await page.getByRole('button', { name: '직접입력' }).click();
  await expect(page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).click();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('7654321');
  // 고객명
  await expect(page.getByText('고객명')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '고객명을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '고객명을 입력하세요' }).fill('고객명_pwa_자동화');
  // 전화번호
  await expect(page.getByText('전화번호', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '전화번호를 입력하세요' }).first()).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).first().click();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).first().fill('010-141-41414');
  // 주민등록번호 앞자리
  await expect(page.getByText('주민등록번호')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '앞 6자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '앞 6자리' }).click();
  await page.getByRole('textbox', { name: '앞 6자리' }).fill('940707');
  // 주민등록번호 뒷자리
  await expect(page.getByRole('textbox', { name: '1자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '1자리' }).click();
  await page.getByRole('textbox', { name: '1자리' }).fill('1');
  // 생년월일
  await expect(page.getByText('생년월일 (만 나이 자동계산)')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Choose date, selected date is' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Choose date, selected date is' }).click();
  await expect(page.getByRole('gridcell', { name: '6', exact: true })).toBeVisible();
  await page.getByRole('gridcell', { name: '6', exact: true }).click();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  // 성별
  await expect(page.getByText('성별')).toBeVisible();
  await expect(page.getByText('남성')).toBeVisible();
  // 청구번호
  await expect(page.getByText('청구번호')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '청구번호 7자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).click();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).fill('1234567');
  // 내/외국인
  await expect(page.getByText('내/외국인')).toBeVisible();
  await expect(page.getByText('내국인')).toBeVisible();
  // 문자수신동의
  await expect(page.getByText('문자수신동의')).toBeVisible();
  await expect(page.getByText('문자수신', { exact: true })).toBeVisible();
  await expect(page.getByText('마케팅문자 포함')).toBeVisible();
  await expect(page.getByRole('checkbox').nth(1)).toBeVisible();
  await page.getByRole('checkbox').nth(1).uncheck();
  await expect(page.getByRole('checkbox').nth(0)).toBeVisible();
  await page.getByRole('checkbox').nth(0).uncheck();
  // 최초 내원경로
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '내원경로를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '굿닥' })).toBeVisible();
  await page.getByRole('option', { name: '굿닥' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('option', { name: 'SNS' }).nth(0)).toBeVisible();
  await page.getByRole('option', { name: 'SNS' }).nth(0).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('option', { name: '병원홈페이지' })).toBeVisible();
  await page.getByRole('option', { name: '병원홈페이지' }).click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  // 소개자
  await expect(page.getByText('소개자')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '소개자를 검색하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).click();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).fill('김정연');
  await page.waitForTimeout(3000);
  await expect(page.getByText('-8948-4318')).toBeVisible();
  await page.getByText('-8948-4318').click();
  // 메모
  await expect(page.locator('label').filter({ hasText: /^메모$/ })).toBeVisible();
  await expect(page.getByRole('paragraph')).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.locator('pre div').first().fill('메모 입력 자동화');
  // 청구 연동 고객메모
  await expect(page.getByText('청구 연동 고객메모')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).fill('청구 연동 고객메모 입력 자동화');
  // 추가정보1 
  await expect(page.getByText('추가정보1')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first()).toBeVisible();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first().click();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).first().fill('추가정보1 자동화');
  // 추가정보2
  await expect(page.getByText('추가정보2')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(1)).toBeVisible();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(1).click();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(1).fill('추가정보2 자동화');
  // 추가정보3
  await expect(page.getByText('추가정보3')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(2)).toBeVisible();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(2).click();
  await page.getByRole('textbox', { name: '추가정보를 입력하세요 (20자 이내)' }).nth(2).fill('추가정보3 자동화');
  // 고객등록 > 진료정보
  await expect(page.getByRole('heading', { name: '진료정보' })).toBeVisible();
  // 담당상담사
  await expect(page.getByText('담당상담사')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).nth(0).click();
  // 담당의사
  await expect(page.getByText('담당의사')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '김정연' }).nth(0).click();
  // 관심항목
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '관심항목을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '관심항목을 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '성형' })).toBeVisible();
  await page.getByRole('option', { name: '성형' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('option', { name: '피부 시술' })).toBeVisible();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('option', { name: '리프팅' })).toBeVisible();
  await page.getByRole('option', { name: '리프팅' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  // 고객등급
  await expect(page.getByText('고객등급')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '고객등급을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '고객등급을 선택하세요' }).click();
  await page.getByRole('option', { name: 'BEST' }).click();
  // 진료정보 > 상세정보 탭
  await expect(page.getByRole('tab', { name: '상세정보' })).toBeVisible();
  // 주소
  await expect(page.getByText('주소', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '주소를 검색하세요' })).toBeVisible();
//   await page.getByRole('textbox', { name: '주소를 검색하세요' }).click();
//   /// 프레임 지정
//   const addressFrame = page.frameLocator('iframe[title="우편번호서비스 레이어 프레임"]');
//   await expect(addressFrame.getByText('예) 판교역로 166, 분당 주공, 백현동')).toBeVisible();
//   await addressFrame.getByText('예) 판교역로 166, 분당 주공, 백현동').click();
//   await addressFrame.getByText('예) 판교역로 166, 분당 주공, 백현동').fill('역삼로2길 16');
//   await expect(addressFrame.getByRole('button', { name: '검색' })).toBeVisible();
//   await addressFrame.getByRole('button', { name: '검색' }).click();
  ////
  // 상세주소
  await expect(page.getByText('상세주소')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '상세주소를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).fill('상세주소 자동화');
  // 직업
  await expect(page.getByText('직업')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '직업을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '직업을 선택하세요' }).click();
  await page.getByRole('option', { name: '회사원' }).click();
  // 결혼여부
  await expect(page.getByText('결혼여부')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '결혼 여부를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '결혼 여부를 선택하세요' }).click();
  await page.getByRole('option', { name: '미혼' }).click();
  // 국가/지역
  await expect(page.getByText('국가/지역')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '국가/지역을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '국가/지역을 선택하세요' }).click();
  await page.getByRole('option', { name: '기타' }).click();
  // 불만사항
  await expect(page.getByText('불만사항')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '불만사항을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '불만사항을 선택하세요' }).click();
  await page.getByRole('option', { name: '시설' }).click();
  // 이메일
  await expect(page.getByText('이메일')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).fill('jungyun.kim@carelabs.co.krr');
  // 전화번호2
  await expect(page.getByText('전화번호2')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '전화번호를 입력하세요' }).nth(1)).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).nth(1).click();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).nth(1).fill('010-424-24242');
  // 진료정보 > 가족관계 탭
  await expect(page.getByRole('tab', { name: '가족관계' })).toBeVisible();
  await page.getByRole('tab', { name: '가족관계' }).click();
  await expect(page.getByText('가족관계').nth(1)).toBeVisible();
  await expect(page.getByRole('combobox', { name: '가족관계를 등록하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).click();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).fill('김정연');
  await page.waitForTimeout(3000);
  await expect(page.getByText('-8948-4318')).toBeVisible();
  await page.getByText('-8948-4318').click(); 
  // 진료정보 > 신체정보 탭
  await expect(page.getByRole('tab', { name: '신체정보' })).toBeVisible();
  await page.getByRole('tab', { name: '신체정보' }).click();
  // 키
  await expect(page.getByText('키')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '키를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).fill('160');
  // 혈액형
  await expect(page.getByText('혈액형')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '혈액형' })).toBeVisible();
  await page.getByRole('combobox', { name: '혈액형' }).click();
  await page.getByRole('option', { name: 'A', exact: true }).click();
  // 몸무게
  await expect(page.getByText('몸무게')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '몸무게를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).fill('60');
  // 고객등록
  await expect(page.getByRole('button', { name: '등록', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '등록', exact: true }).click();
  await expect(page.getByText('등록되었습니다')).toBeVisible();








});