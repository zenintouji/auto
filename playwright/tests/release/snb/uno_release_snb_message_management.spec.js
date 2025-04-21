import { test, expect } from '@playwright/test';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('test', async ({ page }) => {
  await page.goto('https://unocare.co.kr/login');
  // 로그인
  await expect(page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"' })).toBeVisible();
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '아이디(이메일)를 입력하세요' }).fill('jwpark@v2test.com');
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '비밀번호를 입력하세요' }).fill('unoc2024$$');
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForTimeout(1000);
  // 메인 화면 진입
  await expect(page.getByRole('button', { name: '로그아웃' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'icon-sms 메시지 관리' })).toBeVisible();
  await expect(page.getByRole('button', { name: '메시지 설정' })).toBeVisible();
  await page.getByRole('button', { name: '메시지 설정' }).click();
  await page.waitForTimeout(1000);
  /////////////////////////////////////
  // 메시지 설정 > 상용구
  /////////////////////////////////////
  await expect(page.getByRole('paragraph').filter({ hasText: '메시지 설정' })).toBeVisible();
  await expect(page.getByRole('tab', { name: '상용구' })).toBeVisible();
  // 메시지 설정 탭 카테고리 문구 확인
  await expect(page.getByRole('cell', { name: '분류' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '제목/내용' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '이미지', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
  await page.getByRole('button', { name: '추가' }).click();
  await page.waitForTimeout(1000);
  // 상용구 추가 팝업
  await expect(page.getByRole('heading', { name: '상용구 추가 close' })).toBeVisible();
  await expect(page.getByLabel('상용구 추가').getByText('분류')).toBeVisible();
  // 상용구 분류
  await expect(page.getByRole('textbox', { name: '예시) 예약완료 상용문구' })).toBeVisible();
  await page.getByRole('textbox', { name: '예시) 예약완료 상용문구' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '예시) 예약완료 상용문구' }).fill('상용구 입력 자동화 삭제 예정');
  // 상용구 내용
  await expect(page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' })).toBeVisible();
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).fill('상용구 내용 입력 자동화');
  // 특수기호
  await expect(page.getByText('특수기호')).toBeVisible();
  await page.getByText('특수기호').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('○')).toBeVisible();
  await page.getByText('○').click();
  await page.waitForTimeout(1000);
  // 상용구
  await expect(page.getByLabel('상용구 추가').getByText('상용구', { exact: true })).toBeVisible();
  await page.getByLabel('상용구 추가').getByText('상용구', { exact: true }).click();
  await page.waitForTimeout(1000);
  // 상용구 선택 팝업
  await expect(page.getByRole('heading', { name: '상용구 선택 close' })).toBeVisible();
  await expect(page.getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await page.waitForTimeout(1000);
  // 상용구 선택 팝업에서 임의로 추가 후 상용구 추가 팝업 이동
  await expect(page.getByRole('heading', { name: '상용구 추가 close' })).toBeVisible();
  // 변환문구
  await expect(page.getByText('변환문구')).toBeVisible();
  await page.getByText('변환문구').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('listitem').filter({ hasText: '#{고객명}' })).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: '#{고객명}' }).click();
  await page.waitForTimeout(1000);
  // 이미지
  await expect(page.getByLabel('상용구 추가').getByText('이미지')).toBeVisible();
  // 문진
  await expect(page.getByLabel('상용구 추가').getByText('문진')).toBeVisible();
  await page.getByLabel('상용구 추가').getByText('문진').click();
  await page.waitForTimeout(1000);
  // 문진 > 문진 선택 팝업
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('row', { name: '문진 자동화' }).getByRole('button')).toBeVisible();
  await page.getByRole('row', { name: '문진 자동화' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  // 문진 선택 후 상용구 추가 팝업으로 이동
  await expect(page.getByRole('heading', { name: '상용구 추가 close' })).toBeVisible();
  await expect(page.getByText('예약안내전송 기본 상용구로 사용?')).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  // 저장 완료
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  await expect(page.getByRole('paragraph').filter({ hasText: '메시지 설정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상용구 입력 자동화 삭제 예정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j수정합니다. #{고객명}#{문진URL}' })).toBeVisible();
  await expect(page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).locator('img')).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  // 미사용
  await expect(page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('미사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  // 미사용 > 사용
  await expect(page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1)).toBeVisible();
  await page
  .getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' })
  .getByRole('button', { name: '사용' })
  .click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('사용 처리되었습니다')).toBeVisible();
  // 미사용 > 사용
  await expect(page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1)).toBeVisible();
  await page
  .getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' })
  .getByRole('button', { name: '사용' })
  .click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('사용 처리 하시겠습니까?')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('사용 처리되었습니다')).toBeVisible();
  // 삭제
  await expect(page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('row', { name: '상용구 입력 자동화 삭제 예정 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1).click();
  await expect(page.getByText('정말로 삭제하시겠습니까?삭제 시 복원이 불가능합니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '상용구 입력 자동화 삭제 예정' })).not.toBeVisible();
  /////////////////////////////////////
  // 메시지 설정 > 자동전송
  /////////////////////////////////////
  await expect(page.getByRole('tab', { name: '자동전송', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: '자동전송', exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('전송 조건이 변경되어 자동전송을 못하는 경우에는 가 표시됩니다')).toBeVisible();
  // 자동전송 탭 카테고리 확인
  await expect(page.getByRole('cell', { name: '전송상황' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '부서', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '메시지 전송시점' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '제목/내용' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '이미지', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '발신번호' })).toBeVisible();
  await expect(page.getByText('알림톡 승인 상태')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  // 자동전송 추가
  await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
  await page.getByRole('button', { name: '추가' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '자동전송 입력 close' })).toBeVisible();
  // 발신번호 선택
  await expect(page.getByRole('combobox', { name: '발신번호를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '발신번호를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '-1111-1111' })).toBeVisible();
  await page.getByRole('option', { name: '-1111-1111' }).click();
  await page.waitForTimeout(1000);
  // 자동전송 메시지 입력
  await expect(page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' })).toBeVisible();
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).fill('자동전송 입력 자동화');
  // 자동전송 메시지 > 특수기호
  await expect(page.getByText('특수기호')).toBeVisible();
  await page.getByText('특수기호').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('☆')).toBeVisible();
  await page.getByText('☆').click();
  await page.waitForTimeout(1000);
  // 자동전송 메시지 > 상용구
  await expect(page.getByLabel('자동전송 입력').getByText('상용구')).toBeVisible();
  await page.getByLabel('자동전송 입력').getByText('상용구').click();
  await page.waitForTimeout(1000);
  // 상용구 선택 팝업
  await expect(page.getByRole('heading', { name: '상용구 선택 close' })).toBeVisible();
  await page.getByRole('button', { name: '선택' }).nth(0).click();
  await page.waitForTimeout(1000);
  // 상용구 선택 후 자동전송 입력 팝업 이동
  await expect(page.getByRole('heading', { name: '자동전송 입력 close' })).toBeVisible();
  await expect(page.getByRole('dialog', { name: '자동전송 입력 close' }).locator('img')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' })).toBeVisible();
  // 자동전송 메시지 > 변환문구
  await expect(page.getByText('변환문구')).toBeVisible();
  await page.getByText('변환문구').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('listitem').filter({ hasText: '#{고객명}' })).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: '#{고객명}' }).click();
  await page.waitForTimeout(1000);
  // 자동전송 메시지 > 이미지
  await expect(page.getByLabel('이미지 등록 시 MMS로 전환되며, 1MB이하의').getByText('이미지')).toBeVisible();
  // 자동전송 메시지 > 문진
  await expect(page.getByLabel('자동전송 입력').getByText('문진')).toBeVisible();
  await page.getByLabel('자동전송 입력').getByText('문진').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('row', { name: '문진 자동화' }).getByRole('cell').nth(1)).toBeVisible();
  await page.getByRole('row', { name: '문진 자동화' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  // 문진 등록 
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  // 문진 등록 후 자동전송 입력 팝업 이동
  await expect(page.getByRole('heading', { name: '자동전송 입력 close' })).toBeVisible();
  await expect(page.getByLabel('자동전송 입력').getByText('전송상황')).toBeVisible();
  await page.getByRole('combobox', { name: '전송상황을 선택하세요' }).click();
  await page.getByRole('option', { name: '퇴원' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  // 저장 안내 팝업
  await expect(page.getByText('예약 문자를 추가하시겠습니까?현재 등록된 예약 건 모두 업데이트됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('등록되었습니다')).toBeVisible();
  // 자동전송 수정
  await expect(page.getByRole('row', { name: '퇴원 전체 즉시발송 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j수정합니다. #{고객명}#{문진URL} 문진 자동화 010-1111-1111 이미지가 첨부된 경우에는 알림톡 템플릿 심사 요청을 하지 않습니다. 미사용', exact: true }).getByRole('button').first()).toBeVisible();
  await page.getByRole('row', { name: '퇴원 전체 즉시발송 예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j수정합니다. #{고객명}#{문진URL} 문진 자동화 010-1111-1111 이미지가 첨부된 경우에는 알림톡 템플릿 심사 요청을 하지 않습니다. 미사용', exact: true }).getByRole('button').first().click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '자동전송 입력 close' })).toBeVisible();
  // 자동전송 수정 > 발신번호
  await expect(page.getByRole('combobox', { name: '발신번호를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '발신번호를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '[미사용] 010-3189-3650 test' })).toBeVisible();
  await page.getByRole('option', { name: '[미사용] 010-3189-3650 test' }).click();
  await page.waitForTimeout(1000);
  // 자동전송 수정 > 특수기호
  await expect(page.getByText('특수기호')).toBeVisible();
  await page.getByText('특수기호').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('○', { exact: true })).toBeVisible();
  await page.getByText('○', { exact: true }).click();
  await page.waitForTimeout(1000);
  // 자동전송 수정 > 변환문구
  await expect(page.getByText('변환문구')).toBeVisible();
  await page.getByText('변환문구').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('listitem').filter({ hasText: '#{고객명}' })).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: '#{고객명}' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  // 저장
  await expect(page.getByText('예약 문자를 수정하시겠습니까?현재 등록된 예약 건 모두 업데이트됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('수정되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약안내전송 #{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j수정합니다. #{고객명}#{문진URL}' }).first()).toBeVisible();
  // 자동전송 미사용
  await expect(page.getByRole('row', { name: '퇴원 전체 즉시발송 예약안내전송 ○#{고객명}#{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('row', { name: '퇴원 전체 즉시발송 예약안내전송 ○#{고객명}#{고객명} #{병원명} #{예약일} #{예약시간} #{대부서명} #{세부부서명} j' }).getByRole('button').nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('자동 문자를 미사용 처리하시겠습니까?현재 등록된 예약 건 모두 발송 취소되며, 전송대기 중인 문자가 많을 경우 처리 시간이 오래 걸릴 수 있습니')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).not.toBeVisible();
  // 미사용항목 보지 않기 해제
  await expect(page.getByText('미사용항목 보지않기')).toBeVisible();
  await page.locator('input[type="checkbox"]').click();
  await page.waitForTimeout(1000);
  /////////////////////////////////////
  // 메시지 설정 > 주기별 자동전송
  /////////////////////////////////////
  await expect(page.getByRole('tab', { name: '주기별 자동전송' })).toBeVisible();
  await page.getByRole('tab', { name: '주기별 자동전송' }).click();
  await page.waitForTimeout(1000);
  // 주기별 자동전송 카테고리 확인
  await expect(page.getByRole('cell', { name: '시/수술명', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '메시지 전송주기 (마지막 시/수술일 기준)' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '제목/내용' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '이미지', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '발신번호' })).toBeVisible();
  await expect(page.getByText('알림톡 승인 상태')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  // 주기별 자동전송 추가
  await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
  await page.getByRole('button', { name: '추가' }).click();
  await page.waitForTimeout(1000);
  // 주기별 자동전송 > 주기별 자동전송 입력 팝업
  await expect(page.getByRole('heading', { name: '주기별 자동전송 입력 close' })).toBeVisible();
  // 주기별 자동전송 입력 > 발신번호
  await expect(page.getByRole('combobox', { name: '발신번호를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '발신번호를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '[미사용] 010-3189-3650 test' })).toBeVisible();
  await page.getByRole('option', { name: '[미사용] 010-3189-3650 test' }).click();
  await page.waitForTimeout(1000);
  // 주기별 자동전송 입력 > 내용
  await expect(page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' })).toBeVisible();
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).fill('주기별 자동전송 입력 자동화');
  // 주기별 자동전송 입력 > 특수기호
  await expect(page.getByText('특수기호')).toBeVisible();
  await page.getByText('특수기호').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('○', { exact: true })).toBeVisible();
  await page.getByText('○', { exact: true }).click();
  await page.waitForTimeout(1000);
  // 주기별 자동전송 입력 > 상용구
  await expect(page.getByLabel('주기별 자동전송 입력').getByText('상용구')).toBeVisible();
  await page.getByLabel('주기별 자동전송 입력').getByText('상용구').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '상용구 선택 close' })).toBeVisible();
  await expect(page.getByRole('row', { name: '선택 약도안내 약도입니다. 이렇게 오시면 됩니다' }).getByRole('button')).toBeVisible();
  await page.getByRole('row', { name: '선택 약도안내 약도입니다. 이렇게 오시면 됩니다' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  // 주기별 자동전송 입력 > 변환문구
  await expect(page.getByText('변환문구')).toBeVisible();
  await page.getByText('변환문구').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('#{고객명}', { exact: true })).toBeVisible();
  await page.getByText('#{고객명}', { exact: true }).click();
  await page.waitForTimeout(1000);
  // 주기별 자동전송 입력 > 문진
  await expect(page.getByLabel('주기별 자동전송 입력').getByText('문진')).toBeVisible();
  await page.getByLabel('주기별 자동전송 입력').getByText('문진').click();
  await page.waitForTimeout(1000);
  // 문진 선택
  await expect(page.getByRole('heading', { name: '문진 선택' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('row', { name: '문진 자동화' }).getByRole('button')).toBeVisible();
  await page.getByRole('row', { name: '문진 자동화' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  // 문진 선택 하고 주기별 자동전송 입력 화면 이동
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '피부 시술' })).toBeVisible();
  await page.getByRole('option', { name: '피부 시술' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.waitForTimeout(1000);
  // 시/수술명
  await expect(page.getByLabel('주기별 자동전송 입력').getByText('시/수술명')).toBeVisible();
  await expect(page.getByRole('combobox', { name: '시/수술 카테고리를 우선 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 우선 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '인모드' })).toBeVisible();
  await page.getByRole('option', { name: '인모드' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('button', { name: 'Close', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.waitForTimeout(1000);
  // 발송주기
  await expect(page.getByText('발송주기')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '0', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: '0', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '0', exact: true }).fill('10');
  // 발송횟수
  await expect(page.getByText('발송횟수')).toBeVisible();
  await expect(page.getByRole('textbox', { name: '1' })).toBeVisible();
  await page.getByRole('textbox', { name: '1' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '1' }).fill('02');
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('주기별 문자를 추가하시겠습니까?현재 등록된 예약 건 모두 업데이트됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('등록되었습니다')).toBeVisible();  
  // 수정
  await expect(page.getByRole('cell', { name: '문진 자동화' })).toBeVisible();
  await expect(page.getByRole('row', { name: '피부 시술 - 인모드 10일 마다 2' }).getByRole('button').first()).toBeVisible();
  await page.getByRole('row', { name: '피부 시술 - 인모드 10일 마다 2' }).getByRole('button').first().click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '주기별 자동전송 입력 close' })).toBeVisible();
  // 발신번호 수정
  await expect(page.getByRole('combobox', { name: '발신번호를 선택하세요' })).toBeVisible();
  await page.getByRole('combobox', { name: '발신번호를 선택하세요' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('option', { name: '[미사용] 010-8426-8026 v2_prod' })).toBeVisible();
  await page.getByRole('option', { name: '[미사용] 010-8426-8026 v2_prod' }).click();
  await page.waitForTimeout(1000);
  // 내용 수정
  await expect(page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' })).toBeVisible();
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: '내용을 입력하세요. 90bytes 초과시 장문(LMS' }).fill('약도입니다. 이렇게 오시면 됩니다.\n#{고객명}#{문진URL}수정');
  // 특수기호
  await expect(page.getByText('특수기호')).toBeVisible();
  await page.getByText('특수기호').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('●')).toBeVisible();
  await page.getByText('●').click();
  await page.waitForTimeout(1000);
  // 변환문구
  await expect(page.getByText('변환문구')).toBeVisible();
  await page.getByText('변환문구').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('listitem').filter({ hasText: '#{고객명}' })).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: '#{고객명}' }).click();
  await page.waitForTimeout(1000);
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  // 시/수술명
  await expect(page.getByLabel('주기별 자동전송 입력').getByText('시/수술명')).toBeVisible();
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('주기별 문자를 수정하시겠습니까?현재 등록된 예약 건 모두 업데이트됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('수정되었습니다')).toBeVisible();
  // 미사용
  await expect(page.getByRole('row', { name: '피부 시술 - 인모드 10일 마다 2' }).getByRole('button').nth(1)).toBeVisible();
  await page.getByRole('row', { name: '피부 시술 - 인모드 10일 마다 2' }).getByRole('button').nth(1).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('주기별 문자를 미사용 처리하시겠습니까?현재 등록된 예약 건 모두 발송 취소되며, 전송대기 중인 문자가 많을 경우 처리 시간이 오래 걸릴 수 있습')).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('미사용 처리되었습니다')).toBeVisible();
  // 미사용항목 보지 않기 해제
  await expect(page.getByText('미사용항목 보지않기')).toBeVisible();
  await page.locator('input[type="checkbox"]').click();
  await page.waitForTimeout(1000);
  /////////////////////////////////////
  // 메시지 설정 > 약도 전송
  /////////////////////////////////////
  await expect(page.getByRole('tab', { name: '약도 전송' })).toBeVisible();
  await page.getByRole('tab', { name: '약도 전송' }).click();
  await page.waitForTimeout(1000);
  // 약도 전송 카테고리 확인
  await expect(page.getByRole('cell', { name: '제목/내용' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '이미지' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '문진' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  /////////////////////////////////////
  // 메시지 설정 > 발신번호
  /////////////////////////////////////
  await expect(page.getByRole('tab', { name: '발신번호' })).toBeVisible();
  await page.getByRole('tab', { name: '발신번호' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('cell', { name: '발신번호' })).toBeVisible();
  await expect(page.locator('th').filter({ hasText: '메모' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'ACTION' })).toBeVisible();
  /////////////////////////////////////
  // 메시지 설정 > 카카오톡 발신프로필
  /////////////////////////////////////
  await expect(page.getByRole('tab', { name: '카카오톡 발신프로필' })).toBeVisible();
  await page.getByRole('tab', { name: '카카오톡 발신프로필' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('GUIDE')).toBeVisible();
  await page.getByText('GUIDE').click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: '카카오톡 발신프로필 등록 가이드 close' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  await page.waitForTimeout(1000);

});
