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
  // 고객 조회
  await expect(page.getByRole('button', { name: '고객 조회' })).toBeVisible();
  await page.getByRole('button', { name: '고객 조회' }).click();
  // 통합차트
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await page.getByRole('textbox', { name: '고객명', exact: true }).click();
  await page.getByRole('textbox', { name: '고객명', exact: true }).fill('자동화');
  await page.locator('#bodyContentsWrapper').getByRole('button', { name: '조회' }).click();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 예약 진입
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('예약 (0)').click();
  await expect(page.getByRole('cell', { name: '등록된 내용이 없습니다' })).toBeVisible();
  // 예약 등록
  await expect(page.getByRole('button', { name: '+ 예약등록' })).toBeVisible();
  await page.getByRole('button', { name: '+ 예약등록' }).click();
  await expect(page.getByText('예약 등록')).toBeVisible();
  // 예약 종류
  await expect(page.locator('label').filter({ hasText: '예약종류' })).toBeVisible();
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: '상담예약' }).click();
  // 예약 부서 
  await expect(page.getByText('예약부서')).toBeVisible();
  await page.getByRole('combobox', { name: '부서를 선택하세요' }).click();
  await page.getByRole('option', { name: '상담-상담사A2' }).click();
  // 방문 시간 선택
  await expect(page.getByText('방문시간')).toBeVisible();
  await page.getByRole('combobox', { name: '-' }).click();
  await page.getByRole('option', { name: '9:00', exact: true }).click();
  // 예상 소요 시간 
  await expect(page.getByText('예상 소요시간')).toBeVisible();
  await page.locator('div').filter({ hasText: /^시간분$/ }).nth(2).click();
  await page.getByRole('menuitem', { name: '0시간 30분', exact: true }).click
  // 내원경로
  await expect(page.locator('label').filter({ hasText: '내원경로' })).toBeVisible();
  await page.getByRole('combobox', { name: '내원경로를 선택하세요' }).click();
  await page.getByRole('option', { name: '전화상담' }).click();
  // 의사
  await expect(page.locator('label').filter({ hasText: '의사' })).toBeVisible();
  await page.getByRole('combobox', { name: '의사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 상담사
  await expect(page.locator('label').filter({ hasText: '상담사' })).toBeVisible();
  await page.getByRole('combobox', { name: '상담사를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 어시스트
  await expect(page.locator('label').filter({ hasText: '어시스트' })).toBeVisible();
  await page.getByRole('combobox', { name: '어시스트를 선택하세요' }).click();
  await page.getByRole('option', { name: '최지안' }).click();
  // 작성자
  await expect(page.locator('label').filter({ hasText: '작성자' })).toBeVisible();
  await page.getByRole('combobox', { name: '작성자를 선택하세요' }).click();
  await page.getByRole('option', { name: '노윤이' }).click();
  // 시/수술 카테고리
  await expect(page.getByText('시/수술 카테고리')).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술 카테고리를 선택하세요' }).click();
  await page.getByRole('option', { name: '보톡스', exact: true }).click();
  // 시/수술명
  await expect(page.locator('label').filter({ hasText: '시/수술명' })).toBeVisible();
  await page.getByRole('combobox', { name: '시/수술명을 선택하세요' }).click();
  await page.getByRole('option', { name: '필러' }).click();
  // 예약 메모
  await expect(page.getByText('예약메모')).toBeVisible();
  await page.locator('pre').getByRole('paragraph').click();
  await page.locator('pre div').first().fill('예약 메모 입력 자동화');
  // 예약 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click(); // 저장 
  await page.waitForTimeout(3000);
  await expect(page.getByText('예약을 등록했습니다')).toBeVisible();
  // 통합차트 닫기
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  // 예약 캘린더
  await expect(page.getByRole('button', { name: 'icon-calendar 예약 캘린더' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-calendar 예약 캘린더' }).click();
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  // 상태 변경 > 미방문
  await expect(page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러')).toBeVisible();
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '미방문' })).toBeVisible();
  await page.getByRole('menuitem', { name: '미방문' }).click();
  await expect(page.locator('div').filter({ hasText: '[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기' }).nth(3)).toBeVisible();
  await expect(page.getByRole('button', { name: '미전송' })).toBeVisible();
  await page.getByRole('button', { name: '미전송' }).click();
  await expect(page.getByText('미방문으로 변경되었습니다')).toBeVisible();
  // 상태 변경 > 예약
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '예약' })).toBeVisible();
  await page.getByRole('menuitem', { name: '예약' }).click();
  await expect(page.getByText('예약으로 변경되었습니다')).toBeVisible();
  // 상태 변경 > 상담대기
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '상담대기' })).toBeVisible();
  await page.getByRole('menuitem', { name: '상담대기' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 상담대기 > 상담중
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '상담중' })).toBeVisible();
  await page.getByRole('menuitem', { name: '상담중' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 진료대기
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '진료대기' })).toBeVisible();
  await page.getByRole('menuitem', { name: '진료대기' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 진료대기 > 진료중
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '진료중' })).toBeVisible();
  await page.getByRole('menuitem', { name: '진료중' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 시/수술 대기
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '시/수술대기' })).toBeVisible();
  await page.getByRole('menuitem', { name: '시/수술대기' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 시/수술 대기 > 시/수술중
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '시/수술중' })).toBeVisible();
  await page.getByRole('menuitem', { name: '시/수술중' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 수납대기
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '수납대기' })).toBeVisible();
  await page.getByRole('menuitem', { name: '수납대기' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 완료 
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '완료' })).toBeVisible();
  await page.getByRole('menuitem', { name: '완료' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 상태 변경 > 퇴원
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.locator('li').filter({ hasText: '상태변경' })).toBeVisible();
  await page.locator('li').filter({ hasText: '상태변경' }).hover();
  await expect(page.getByRole('menuitem', { name: '퇴원' })).toBeVisible();
  await page.getByRole('menuitem', { name: '퇴원' }).click();
  await expect(page.locator('div').filter({ hasText: '[즉시 전송 예약문자]가 있습니다.전송하시겠습니까?다른 예약문자 취소는 [문자설정]에서 가능합니다.미리보기' }).nth(3)).toBeVisible();
  await expect(page.getByRole('button', { name: '미전송' })).toBeVisible();
  await page.getByRole('button', { name: '미전송' }).click();
  await expect(page.getByText('변경되었습니다')).toBeVisible();
  // 예약캘린더 > 통합차트 진입
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').dblclick();
  await expect(page.getByText('통합차트')).toBeVisible();
  await expect(page.getByRole('button', { name: '취소', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await expect(page.getByRole('cell', { name: '예약문자' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '설정' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약상태' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '내원', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약종류' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담예약' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '부서', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '세부부서' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담사A2' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '상담사', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '노윤이' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '의사', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '최지안' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '어시스트' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '홍명희' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '카테고리' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '보톡스' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '시/수술명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '필러' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '작성자' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'v2' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '예약 메모 입력 자동화' })).toBeVisible();
  // 예약 선택
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(2).click();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  // 예약 삭제
  await page.getByRole('button', { name: '삭제' }).click();
  // 삭제 안내 팝업
  await expect(page.getByText('예약차트를 삭제하시겠습니까?삭제 후 복구할 수 없습니다.취소 건은 [예약취소] 로 처리 하세요')).toBeVisible();
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('삭제되었습니다')).toBeVisible();
  // 통합차트 닫기
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.locator('div').filter({ hasText: /^3D Meta-VuMark-Vu$/ }).getByRole('button').nth(3).click();
  // 예약 상태 변경 후 차트 삭제
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await page.locator('li').filter({ hasText: '상태변경' }).click();
  await expect(page.getByRole('menuitem', { name: '상담대기' })).toBeVisible();
  await page.getByRole('menuitem', { name: '상담대기' }).click();
  await expect(page.getByText('상태가 변경되었습니다')).toBeVisible();
  // 차트 삭제
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();
  await page.getByText('신자동화_신규고객/F/만 30세보톡스 - 필러').click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '삭제하기' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제하기' }).click();
  await expect(page.locator('div').filter({ hasText: '접수차트를 삭제하시겠습니까? [예약차트 함께 삭제]삭제 후 복구할 수 없습니다.예약 상태로 변경하려면 캘린더에서 [예약전환] 처리 하세요' }).nth(3)).toBeVisible();
  await expect(page.getByRole('button', { name: '확인' })).toBeVisible();
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.getByText('접수가 삭제되었습니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '예약판 설정' })).toBeVisible();

});