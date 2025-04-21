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
  await expect(page.getByText('고객조회 내역')).toBeVisible();
  await expect(page.getByRole('cell', { name: '고객명' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '자동화_신규고객' })).toBeVisible();
  await page.getByRole('button', { name: '자동화_신규고객' }).click();
  // 통합 차트
  await expect(page.getByText('통합차트')).toBeVisible();
  await page.getByText('펜차트 (0)').click();
  // 펜차트 
  await expect(page.getByText('펜차트', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '전체', exact: true })).toBeVisible();
  // 새 폴더
  await expect(page.getByRole('button', { name: '새 폴더' })).toBeVisible();
  await page.getByRole('button', { name: '새 폴더' }).click();
  await expect(page.getByRole('heading', { name: '새 폴더' })).toBeVisible();
  await page.getByRole('textbox', { name: '폴더명을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '폴더명을 입력하세요' }).fill('새 폴더 자동화');
  // 새 폴더 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('폴더를 생성하였습니다')).toBeVisible();
  await expect(page.getByLabel('새 폴더 자동화').locator('div').filter({ hasText: '새 폴더 자동화' })).toBeVisible();
  // 폴더 즐겨찾기
  await expect(page.getByLabel('새 폴더 자동화').locator('div').filter({ hasText: '새 폴더 자동화' })).toBeVisible();
  await page.getByLabel('새 폴더 자동화').locator('div').filter({ hasText: '새 폴더 자동화' }).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '중요차트함에 추가' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함에 추가' }).click();
  // 중요 차트함 > 새 폴더 즐겨찾기 확인
  await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함' }).click();
  await expect(page.getByLabel('새 폴더 자동화').locator('div').filter({ hasText: '새 폴더 자동화' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^전체$/ }).nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^전체$/ }).nth(1).click();
  // 새 폴더 이름 변경
  await page.getByLabel('새 폴더 자동화').getByText('새 폴더 자동화').click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '이름변경' })).toBeVisible();
  await page.getByRole('menuitem', { name: '이름변경' }).click();
  await expect(page.getByText('이름 변경')).toBeVisible();
  await page.getByRole('textbox', { name: '변경할 이름을 입력하세요' }).click();
  await page.getByRole('textbox', { name: '변경할 이름을 입력하세요' }).fill('폴더 이름 변경 자동화');
  // 저장
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('수정되었습니다')).toBeVisible();
  await expect(page.getByLabel('폴더 이름 변경 자동화').locator('div').filter({ hasText: '폴더 이름 변경 자동화' })).toBeVisible();
  // 새 폴더 즐겨찾기 해제
  await page.getByLabel('폴더 이름 변경 자동화').locator('div').filter({ hasText: '폴더 이름 변경 자동화' }).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '중요차트함에서 제거' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함에서 제거' }).click();
  await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  await page.waitForTimeout(3000);
  // 중요 차트함
  await page.getByRole('menuitem', { name: '중요차트함' }).click();
  await expect(page.getByText('등록된 차트가 없습니다')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^전체$/ }).nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^전체$/ }).nth(1).click();
  await expect(page.getByLabel('폴더 이름 변경 자동화').locator('div').filter({ hasText: '폴더 이름 변경 자동화' })).toBeVisible();
  // 새 폴더 삭제
  await page.getByLabel('폴더 이름 변경 자동화').locator('div').filter({ hasText: '폴더 이름 변경 자동화' }).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('선택한 1개의 항목을 정말로 삭제하시겠습니까?삭제 시 복원이 불가능하며, 펜차트 앱에서도 삭제됩니다')).toBeVisible();
  // 삭제
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('개의 항목이 삭제되었습니다.')).toBeVisible();
  // 펜차트 샘플함
  await expect(page.getByRole('button', { name: 'icon-image 펜차트 샘플함' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 펜차트 샘플함' }).click();
  await expect(page.getByLabel('펜차트 샘플함').getByText('펜차트 샘플함')).toBeVisible();
  // 폴더 선택
  await page.getByLabel('자동화').locator('div').first().dblclick();
  // 이미지 선택
  await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  await page.getByLabel('자동화 샘플.jpg').getByRole('checkbox').check();
  await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  await page.getByLabel('자동화 샘플2.jpg').getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: '불러오기' })).toBeVisible();
  await page.getByRole('button', { name: '불러오기' }).click();
  await expect(page.getByText('차트를 불러왔습니다')).toBeVisible();
  await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // 이미지 즐겨찾기
  await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '중요차트함에 추가' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함에 추가' }).click();
  await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^자동화 샘플2\.jpg$/ }).locator('div').nth(1).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '중요차트함에 추가' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함에 추가' }).click();
  await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  await page.waitForTimeout(3000);
  // 중요 차트함 확인
  await page.getByRole('menuitem', { name: '중요차트함' }).click();
  await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // 전체 폴더 이동
  await expect(page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1)).toBeVisible();
  await page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1).click();
  await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  // 이미지 즐겨찾기 해제
  await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '중요차트함에서 제거' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함에서 제거' }).click();
  await expect(page.getByText('자동화 샘플.jpg')).toBeVisible();
  await page.locator('div').filter({ hasText: /^자동화 샘플2\.jpg$/ }).locator('div').nth(1).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '중요차트함에서 제거' })).toBeVisible();
  await page.getByRole('menuitem', { name: '중요차트함에서 제거' }).click();
  await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  await expect(page.getByRole('menuitem', { name: '중요차트함' })).toBeVisible();
  await page.waitForTimeout(2000);
  // 중요 차트함 확인
  await page.getByRole('menuitem', { name: '중요차트함' }).click();
  await expect(page.getByText('등록된 차트가 없습니다')).toBeVisible();
  // 전체 폴더 이동
  await expect(page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1)).toBeVisible();
  await page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1).click();
  // 이미지 > '전' 선택
  await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg전후$/ }).getByLabel('전').check();
  // 이미지 > '후' 선택
  await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg전후$/ }).getByLabel('후').check();
  //////////////////////////
  // 샘플 그리기 시작 //////////
  //////////////////////////
  const page2Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).dblclick();
  const page2 = await page2Promise;
  await expect(page2.locator('div').filter({ hasText: /^텍스트$/ }).getByRole('button')).toBeVisible();
  await page2.locator('div').filter({ hasText: /^텍스트$/ }).getByRole('button').click();
  await page2.locator('canvas').nth(1).click({
    position: {
      x: 930,
      y: 467
    }
  });
  await page2.getByRole('textbox').fill('자동화');
  await page2.locator('canvas').nth(1).click({
    position: {
      x: 1615,
      y: 477
    }
  });
  await expect(page2.locator('div').filter({ hasText: /^오늘날짜$/ }).getByRole('button')).toBeVisible();
  await page2.locator('div').filter({ hasText: /^오늘날짜$/ }).getByRole('button').click();
  await expect(page2.getByRole('button', { name: '저장' })).toBeVisible();
  await page2.getByRole('button', { name: '저장' }).click();
  await expect(page2.getByText('수정되었습니다')).toBeVisible();
  await page.bringToFront();
  await expect(page.getByRole('treeitem', { name: '전체' }).locator('div').nth(1)).toBeVisible();
  // 파일 추가
  await expect(page.getByRole('button', { name: 'icon-image 파일 추가' })).toBeVisible();
  await page.getByRole('button', { name: 'icon-image 파일 추가' }).click();
  // 새 파일 팝업
  await expect(page.locator('div').filter({ hasText: /^새 파일$/ })).toBeVisible();
  // 저장 시도
  await expect(page.getByRole('button', { name: '저장' })).toBeVisible();
  await page.getByRole('button', { name: '저장' }).click();
  await expect(page.getByText('파일을 선택하세요')).toBeVisible();
  // 취소
  await expect(page.getByRole('button', { name: '취소' })).toBeVisible();
  await page.getByRole('button', { name: '취소' }).click();
  await expect(page.getByText('자동화 샘플.jpg').nth(0)).toBeVisible();
  // 이미지 삭제
  await page.locator('div').filter({ hasText: /^자동화 샘플\.jpg$/ }).locator('div').nth(1).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('선택한 1개의 항목을 정말로 삭제하시겠습니까?삭제 시 복원이 불가능하며, 펜차트 앱에서도 삭제됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  // 이미지2 삭제
  await expect(page.getByText('개의 항목이 삭제되었습니다.')).toBeVisible();
  await expect(page.getByText('자동화 샘플2.jpg')).toBeVisible();
  await page.locator('div').filter({ hasText: /^자동화 샘플2\.jpg$/ }).locator('div').nth(1).click({
    button: 'right'
  });
  await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
  await page.getByRole('menuitem', { name: '삭제' }).click();
  await expect(page.getByText('선택한 1개의 항목을 정말로 삭제하시겠습니까?삭제 시 복원이 불가능하며, 펜차트 앱에서도 삭제됩니다')).toBeVisible();
  await expect(page.getByRole('button', { name: '삭제' })).toBeVisible();
  await page.getByRole('button', { name: '삭제' }).click();
  await expect(page.getByText('개의 항목이 삭제되었습니다.')).toBeVisible();
});