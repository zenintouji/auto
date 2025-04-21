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
  await page.waitForTimeout(3000);
  // 메인 화면 진입
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ 신규고객등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 신규고객등록' }).click();
  await page.waitForTimeout(1000);
  // 고객등록
  await expect(page.getByRole('heading', { name: '고객등록' })).toBeVisible();
  // 차트번호
  await expect(page.getByText('차트번호').nth(0)).toBeVisible();
  await expect(page.getByText('직접입력')).toBeVisible();
  await page.getByText('직접입력').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('1234567'); 
  // await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('1234566'); // 간편접수용
  // await page.getByRole('textbox', { name: '고객 등록완료 시 자동발급' }).fill('1234569'); // 당일접수용
  // 고객명
  await expect(page.getByText('고객명')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이름을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '이름을 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '이름을 입력하세요' }).fill('신규고객_자동화');
  // await page.getByRole('textbox', { name: '이름을 입력하세요' }).fill('간편접수_확인'); // 간편접수 만들기용
  // await page.getByRole('textbox', { name: '이름을 입력하세요' }).fill('당일접수_확인'); // 당일접수용
  // 전화번호
  await expect(page.getByText('전화번호')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '전화번호를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).fill('010-424-24242');
  // await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).fill('010-818-18181'); // 간편접수 만들기용
  // await page.getByRole('textbox', { name: '전화번호를 입력하세요' }).fill('010-717-17171'); // 당일접수용
  // 주민등록번호
  await expect(page.getByText('주민등록번호')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '앞 6자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '앞 6자리' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '앞 6자리' }).fill('940505');
  await expect(page.getByRole('textbox', { name: '1자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '1자리' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '1자리' }).fill('1');
  // 생년월일
  await expect(page.getByText('생년월일 (만 나이 자동계산)')).toBeVisible();
  // 성별
  await expect(page.getByText('성별')).toBeVisible();
  await expect(page.getByText('남성')).toBeVisible();
  // 청구번호
  await expect(page.getByText('청구번호')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '청구번호 7자리' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구번호 7자리' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '청구번호 7자리' }).fill('1234567');
  // 내/외국인
  await expect(page.getByText('내/외국인')).toBeVisible();
  await expect(page.getByText('내국인')).toBeVisible();
  // 문자수신동의
  await expect(page.getByText('문자수신동의')).toBeVisible();
  // 최초 내원경로
  await expect(page.getByText('최초 내원경로 (최대 3')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '내원경로를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '제휴회사' })).toBeVisible();
  await page.getByRole('option', { name: '제휴회사' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '굿닥', exact: true })).toBeVisible();
  await page.getByRole('option', { name: '굿닥', exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '바비톡' }).nth(0)).toBeVisible();
  await page.getByRole('option', { name: '바비톡' }).nth(0).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.waitForTimeout(1000);
  // 소개자
  await expect(page.getByText('소개자', { exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '소개자를 검색하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: '소개자를 검색하세요' }).fill('김정연');
  await page.waitForTimeout(2000);
  await page.getByText('김정연1').first().click();
  // 메모
  await expect(page.getByText('메모', { exact: true })).toBeVisible();
  await expect(page.getByRole('paragraph')).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.waitForTimeout(1000);
  await page.locator('pre div').first().fill('메모 자동화');
  // 청구 연동 고객메모
  await expect(page.getByRole('dialog').getByText('청구 연동 고객메모')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '청구 연동 고객메모를 입력하세요' }).fill('청구 연동 고객메모');
  // 상세입력
  await expect(page.getByRole('button', { name: '+ 상세입력' })).toBeVisible();
  await page.getByRole('button', { name: '+ 상세입력' }).click();
  await page.waitForTimeout(1000);
  // 상세입력 > 진료정보
  await expect(page.getByText('진료정보')).toBeVisible();
  // 진료정보 > 추가정보1
  const addInfo1 = page.locator('input.MuiInputBase-input').nth(11);
  await expect(addInfo1).toBeVisible();
  await addInfo1.click();
  await page.waitForTimeout(1000);
  await addInfo1.fill('추가정보1 자동화');
  // 진료정보 > 추가정보2
  const addInfo2 = page.locator('input.MuiInputBase-input').nth(12);
  await expect(addInfo2).toBeVisible();
  await addInfo2.click();
  await page.waitForTimeout(1000);
  await addInfo2.fill('추가정보2 자동화');
  // 진료정보 > 추가정보3
  const addInfo3 = page.locator('input.MuiInputBase-input').nth(13);
  await expect(addInfo3).toBeVisible();
  await addInfo3.click();
  await page.waitForTimeout(1000);
  await addInfo3.fill('추가정보3 자동화');
  await page.waitForTimeout(1000);
  // 진료정보 > 담당상담사
  await expect(page.getByRole('dialog').getByText('담당상담사')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '상담사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '최지안' })).toBeVisible();
  await page.getByRole('option', { name: '최지안' }).click();
  await page.waitForTimeout(1000);
  // 진료정보 > 담당의사
  await expect(page.getByRole('dialog').getByText('담당의사')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '의사를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '최지안' })).toBeVisible();
  await page.getByRole('option', { name: '최지안' }).click();
  await page.waitForTimeout(1000);
  // 진료정보 > 관심항목
  await expect(page.getByText('관심항목 (최대 3개)')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '관심항목을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '관심항목을 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '리프팅' })).toBeVisible();
  await page.getByRole('option', { name: '리프팅' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '보톡스' })).toBeVisible();
  await page.getByRole('option', { name: '보톡스' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '이관', exact: true })).toBeVisible();
  await page.getByRole('option', { name: '이관', exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.waitForTimeout(1000);
  // 진료정보 > 고객등급
  await expect(page.getByRole('dialog').getByText('고객등급')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '고객등급을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '고객등급을 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: 'BEST' })).toBeVisible();
  await page.getByRole('option', { name: 'BEST' }).click();
  await page.waitForTimeout(1000);
  // 진료정보 > 상세정보
  await expect(page.getByText('상세정보')).toBeVisible();
  // 상세정보 > 주소
  await expect(page.getByRole('dialog').getByText('주소', { exact: true })).toBeVisible();
  await expect(page.getByText('상세주소', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: '상세주소를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '상세주소를 입력하세요' }).fill('상세주소 자동화');
  // 상세정보 > 직업
  await expect(page.getByRole('dialog').getByText('직업')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '직업을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '직업을 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '전문특수직' })).toBeVisible();
  await page.getByRole('option', { name: '전문특수직' }).click();
  await page.waitForTimeout(1000);
  // 상세정보 > 결혼여부
  await expect(page.getByRole('dialog').getByText('결혼여부')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '결혼 여부를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '결혼 여부를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '미혼' })).toBeVisible();
  await page.getByRole('option', { name: '미혼' }).click();
  await page.waitForTimeout(1000);
  // 상세정보 > 국가/지역
  await expect(page.getByRole('dialog').getByText('국가/지역')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '국가/지역을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '국가/지역을 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '캐나다' })).toBeVisible();
  await page.getByRole('option', { name: '캐나다' }).click();
  await page.waitForTimeout(1000);
  // 상세정보 > 불만사항
  await expect(page.getByRole('dialog').getByText('불만사항')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '불만사항을 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '불만사항을 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '대기시간' })).toBeVisible();
  await page.getByRole('option', { name: '대기시간' }).click();
  await page.waitForTimeout(1000);
  // 상세정보 > 이메일
  await expect(page.getByRole('dialog').getByText('이메일')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '이메일을 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '이메일을 입력하세요' }).fill('jungyun.kim@carelabs.com');
  // 상세정보 > 전화번호2
  await expect(page.getByRole('dialog').getByText('전화번호2')).toBeVisible();
  const phoneNumber2 = page.locator('input.MuiInputBase-input').nth(25);
  await expect(phoneNumber2).toBeVisible();
  await phoneNumber2.click();
  await page.waitForTimeout(1000);
  await phoneNumber2.fill('010-123-41234');
  // 진료정보 > 가족관계
  await expect(page.getByRole('list').getByText('가족관계')).toBeVisible();
  await page.getByRole('list').getByText('가족관계').click();
  await page.waitForTimeout(1000);
  // 가족관계 > 가족관계
  await expect(page.locator('label').filter({ hasText: '가족관계' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: '가족관계를 등록하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: '가족관계를 등록하세요' }).fill('김정연');
  await page.waitForTimeout(2000);
  await expect(page.locator('div').filter({ hasText: /-8989-8989/ }).first()).toBeVisible();
  await page.locator('div').filter({ hasText: /-8989-8989/ }).first().click();
  // 진료정보 > 신체정보
  await expect(page.getByText('신체정보')).toBeVisible();
  await page.getByText('신체정보').click();
  await page.waitForTimeout(1000);
  // 신체정보 > 키
  await expect(page.getByRole('dialog').getByText('키')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '키를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '키를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '키를 입력하세요' }).fill('170');
  // 신체정보 > 혈액형
  await expect(page.getByRole('dialog').getByText('혈액형')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '혈액형' })).toBeVisible();
  await page.getByRole('combobox', { name: '혈액형' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: 'A', exact: true })).toBeVisible();
  await page.getByRole('option', { name: 'A', exact: true }).click();
  await page.waitForTimeout(1000);
  // 신체정보 > 몸무게
  await expect(page.getByRole('dialog').getByText('몸무게')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '몸무게를 입력하세요' })).toBeVisible();
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '몸무게를 입력하세요' }).fill('70');
  // 등록완료
  await expect(page.getByRole('button', { name: '등록완료' })).toBeVisible();
  await page.getByRole('button', { name: '등록완료' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('등록되었습니다')).toBeVisible();
});