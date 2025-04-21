import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://staging.unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('dev@test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  // 메인 화면 진입
  await page.waitForTimeout(3000);
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 고객 조회
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '고객명' })).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await expect(page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' })).toBeVisible();
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '신규고객_자동화' })).toBeVisible();
  await page.getByRole('button', { name: '신규고객_자동화' }).click();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^신규고객_자동화\(M\/만 30세\/940505\/내\)$/ }).locator('div')).toBeVisible();
  await expect(page.getByText('수정')).toBeVisible();
  // 통합차트 > 고객수정
  await page.getByText('수정').click();
  await expect(page.getByRole('heading', { name: '고객수정' })).toBeVisible();
  // 차트번호 수정
  await expect(page.getByRole('dialog').getByText('차트번호')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^변경$/ })).toBeVisible();
  await page.locator('div').filter({ hasText: /^변경$/ }).click();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).click();
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('1234568');
  // 고객명 수정
  await expect(page.getByRole('dialog').getByText('고객명')).toBeVisible();
  await page.getByRole('textbox', { name: '이름을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이름을 입력하세요' }).fill('자동화_신규고객');
  // 전화번호 수정
  await expect(page.getByRole('dialog').getByText('전화번호', { exact: true })).toBeVisible();
  const phoneNumber1 = page.locator('input[placeholder="전화번호를 입력하세요"]').nth(0);
  await phoneNumber1.click();
  await phoneNumber1.fill('010-353-53535');
  // 주민등록번호 수정
  await expect(page.getByText('주민등록번호')).toBeVisible(); // 앞
  await page.getByRole('textbox', { name: '앞 6자리' }).click();
  await page.getByRole('textbox', { name: '앞 6자리' }).fill('940606');
  await expect(page.getByText('주민등록번호')).toBeVisible(); // 뒷
  await page.getByRole('textbox', { name: '1자리' }).click();
  await page.getByRole('textbox', { name: '1자리' }).fill('2');
  // 내/외국인 수정
  await expect(page.getByRole('dialog').getByText('내/외국인')).toBeVisible();
  await expect(page.getByRole('dialog').getByText('외국인', { exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '외국인' }).check();
  // 문자수신동의 수정
  await expect(page.getByText('문자수신동의')).toBeVisible();
  // 최초 내원경로 수정
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await page.getByRole('button', { name: '굿닥' }).hover();
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await expect(page.getByRole('option', { name: 'SNS' })).toBeVisible();
  await page.getByRole('option', { name: 'SNS' }).click();
  await expect(page.getByRole('option', { name: '직원소개' })).toBeVisible();
  await page.getByRole('option', { name: '직원소개' }).click();
  await expect(page.getByRole('option', { name: '대중교통안내방송' })).toBeVisible();
  await page.getByRole('option', { name: '대중교통안내방송' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  // 소개자 수정
  await expect(page.getByRole('dialog').getByText('소개자')).toBeVisible();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).click();
  await expect(page.locator('.sc-bDpDS > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .sc-fxwrCY > .MuiSvgIcon-root')).toBeVisible();
  await page.locator('.sc-bDpDS > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .sc-fxwrCY > .MuiSvgIcon-root').click();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).fill('김정연');
  await expect(page.getByText('김정연', { exact: true })).toBeVisible();
  await page.getByText('김정연', { exact: true }).nth(1).click();
  // 메모 수정
  await expect(page.getByRole('dialog').getByText('메모', { exact: true })).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.getByRole('dialog').locator('pre div').filter({ hasText: '메모 자동화' }).fill('메모 자동화 수정');
  // 청구 연동 고객메모 수정
  await expect(page.locator('label').filter({ hasText: '청구 연동 고객메모' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).fill('청구 연동 고객메모 수정');
  // 추가정보1 수정
  await expect(page.getByRole('dialog').getByText('추가정보1')).toBeVisible();
  const addInfo1 = page.locator('input[placeholder="추가정보를 입력하세요(20자 이내)"]').nth(0);
  await addInfo1.click();
  await addInfo1.fill('추가정보1 자동화 수정');
  // 추가정보2 수정
  await expect(page.getByRole('dialog').getByText('추가정보2')).toBeVisible();
  const addInfo2 = page.locator('input[placeholder="추가정보를 입력하세요(20자 이내)"]').nth(1);
  await addInfo2.click();
  await addInfo2.fill('추가정보2 자동화 수정');
  // 추가정보3 수정
  await expect(page.getByRole('dialog').getByText('추가정보3')).toBeVisible();
  const addInfo3 = page.locator('input[placeholder="추가정보를 입력하세요(20자 이내)"]').nth(2);
  await addInfo3.click();
  await addInfo3.fill('추가정보3 자동화 수정');
  // 진료정보
  await expect(page.getByText('진료정보')).toBeVisible();
  // 진료정보 > 담당상담사 수정 
  await expect(page.getByRole('dialog').getByText('담당상담사')).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '노윤이' })).toBeVisible();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 진료정보 > 담당의사 수정
  await expect(page.getByRole('dialog').getByText('담당의사')).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '테스트의사' })).toBeVisible();
  await page.getByRole('option', { name: '테스트의사' }).click();
  // 진료정보 > 관심항목 수정
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await page.getByRole('button', { name: '이관' }).hover();
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await page.getByRole('combobox', { name: '관심항목을 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '보톡스' })).toBeVisible();
  await page.getByRole('option', { name: '보톡스' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  // 진료정보 > 고객등급 수정
  await expect(page.getByRole('dialog').getByText('고객등급')).toBeVisible();
  await page.getByRole('combobox', { name: '고객등급을 선택하세요' }).click();
  await expect(page.getByRole('option', { name: 'TOP' })).toBeVisible();
  await page.getByRole('option', { name: 'TOP' }).click();
  // 진료정보 > 신환 구분일 수정
  await expect(page.getByText('신환 구분일')).toBeVisible();
  // 진료정보 > 상세정보 수정
  await expect(page.getByText('상세정보')).toBeVisible();
  // 상세정보 > 상세주소 수정
  await expect(page.getByText('상세주소', { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).fill('상세주소 자동화 수정');
  // 상세정보 > 직업 수정
  await expect(page.getByRole('dialog').getByText('직업')).toBeVisible();
  await page.getByRole('combobox', { name: '직업을 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '생산·제조' })).toBeVisible();
  await page.getByRole('option', { name: '생산·제조' }).click();
  // 상세정보 > 결혼여부 수정
  await expect(page.getByRole('dialog').getByText('결혼여부')).toBeVisible();
  await page.getByRole('combobox', { name: '결혼 여부를 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '기혼' })).toBeVisible();
  await page.getByRole('option', { name: '기혼' }).click();
  // 상세정보 > 국가/지역 수정
  await expect(page.getByRole('dialog').getByText('국가/지역')).toBeVisible();
  await page.getByRole('combobox', { name: '국가/지역을 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '태국' })).toBeVisible();
  await page.getByRole('option', { name: '태국' }).click();
  // 상세정보 > 불만사항 수정
  await expect(page.getByRole('dialog').getByText('불만사항')).toBeVisible();
  await page.getByRole('combobox', { name: '불만사항을 선택하세요' }).click();
  await expect(page.getByRole('option', { name: '부작용' })).toBeVisible();
  await page.getByRole('option', { name: '부작용' }).click();
  // 상세정보 > 이메일 수정
  await expect(page.getByRole('dialog').getByText('이메일')).toBeVisible();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).fill('jungyun.kim@carelabs.co.kr');
  // 상세정보 > 전화번호2 수정
  await expect(page.getByRole('dialog').getByText('전화번호2')).toBeVisible();
  const phoneNumber2 = page.locator('input[placeholder="전화번호를 입력하세요"]').nth(1);
  await phoneNumber2.click();
  await phoneNumber2.fill('010-686-86868');
  // 진료정보 > 가족관계
  await expect(page.getByRole('list').getByText('가족관계')).toBeVisible();
  await page.getByRole('list').getByText('가족관계').click();
  // 가족관계 수정
  await expect(page.locator('label').filter({ hasText: '가족관계' })).toBeVisible();
  // 가족관계 추가 및 삭제 
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click(); // 추가
  await page.getByRole('button', { name: '-' }).nth(1).click(); // 삭제
  const famRelationship = page.locator('input[placeholder="가족관계를 등록하세요"]').nth(1);
  await famRelationship.click();
  await famRelationship.fill('김정연');
  await expect(page.getByText('김정연3')).toBeVisible();
  await page.getByText('김정연3').click();
  // 진료정보 > 신체정보
  await expect(page.getByText('신체정보')).toBeVisible();
  await page.getByText('신체정보').click();
  await expect(page.getByText('신체정보')).toBeVisible();
  // 신체정보 > 키 수정
  await expect(page.getByRole('dialog').getByText('키')).toBeVisible();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).fill('180');
  // 신체정보 > 혈액형 수정
  await expect(page.getByRole('dialog').getByText('혈액형')).toBeVisible();
  await page.getByRole('combobox', { name: '혈액형' }).click();
  await expect(page.getByRole('option', { name: 'B', exact: true })).toBeVisible();
  await page.getByRole('option', { name: 'B', exact: true }).click();
  // 신체정보 > 몸무게 수정
  await expect(page.getByRole('dialog').getByText('몸무게')).toBeVisible();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).click();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).fill('80');
  // 수정완료
  await expect(page.getByRole('button', { name: '수정완료' })).toBeVisible();
  await page.getByRole('button', { name: '수정완료' }).click();
  await expect(page.getByText('수정되었습니다')).toBeVisible();
  // 통합차트
  await expect(page.getByText('통합차트')).toBeVisible();




});