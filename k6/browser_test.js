import { browser } from 'k6/x/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    console.log("🚀 시작");

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        page.on('console', msg => {
            if (msg.text().includes('Websocket connected')) {
                console.log(`[VU:${__VU}] 📡 웹소켓 연결 성공`);
            }
        });

        await page.goto('https://test.unocare.co.kr/login');

        // ID 입력
        try {
            await page.waitForSelector('input[placeholder="아이디(이메일)를 입력하세요"]', { timeout: 10000 });
            await page.type('input[placeholder="아이디(이메일)를 입력하세요"]', 'dev@test.com');
            await page.waitForTimeout(1000);
        } catch (e) {
            console.log(`[VU:${__VU}] ❌ 아이디 입력 실패`, e.message || e);
        }

        // PW 입력
        try {
            await page.waitForSelector('input[placeholder="비밀번호를 입력하세요"]', { timeout: 10000 });
            await page.type('input[placeholder="비밀번호를 입력하세요"]', 'asdf1234!');
            await page.waitForTimeout(1000);
        } catch (e) {
            console.log(`[VU:${__VU}] ❌ 비밀번호 입력 실패`, e.message || e);
        }

        // 로그인 버튼 클릭
        try {
            await page.waitForFunction(() => {
                return [...document.querySelectorAll('button')].some(
                    (btn) => btn.textContent.includes("로그인")
                );
            }, { timeout: 10000 });

            await Promise.all([
                page.waitForNavigation(), // 페이지 리다이렉트 기다리는 부분
                page.evaluate(() => {
                    const loginBtn = [...document.querySelectorAll('button')].find(
                        (btn) => btn.textContent.includes("로그인")
                    );
                    if (!loginBtn) {
                        console.log('❌ 로그인 버튼 못찾음');
                    } else {
                        loginBtn.click();
                        page.waitForTimeout(1000);
                    }
                }),
            ]);
        } catch (e) {
            console.log(`[VU:${__VU}] ❌ 로그인 클릭 실패`, e.message || e);
        }

        // URL 확인 (로그인 성공 여부 보조 확인)
        console.log(`[VU:${__VU}] 현재 URL:`, page.url());

        // 로그아웃 버튼 체크
        try {
            await page.waitForTimeout(2000); // 로그인 후 렌더링 대기

            const logoutBtnVisible = await page.evaluate(() => {
                const logoutBtn = [...document.querySelectorAll('button')].find(
                    btn => btn.textContent.includes("로그아웃")
                );
                return logoutBtn && logoutBtn.offsetParent !== null;
            });

            page.waitForTimeout(1000);
            check(page, {
                '로그아웃 버튼이 보인다': () => logoutBtnVisible === true,
            }) || console.log(`[VU:${__VU}] ❌ 로그아웃 버튼 탐지 실패`);

            console.log(`[VU:${__VU}] ✅ 로그인 성공`);
        } catch (e) {
            console.log(`[VU:${__VU}] ❌ 로그아웃 버튼 체크 실패`, e.message || e);
        }

        // 조회 버튼 클릭
        try {
            await page.waitForFunction(() => {
                return [...document.querySelectorAll('button')].some(
                    (btn) => btn.textContent.includes("조회")
                );
            }, { timeout: 10000 });

            await page.evaluate(() => {
                const viewBtn = [...document.querySelectorAll('button')].find(
                    (btn) => btn.textContent.includes("조회")
                );
                page.waitForTimeout(1000);
                if (viewBtn) viewBtn.click();
            });
        } catch (e) {
            console.log(`[VU:${__VU}] ❌ 조회 버튼 클릭 실패`, e.message || e);
        }

        // 고객 조회 모달 체크
        try {
            await page.waitForFunction(() => {
                const el = document.querySelector('input[placeholder="고객명, 전화번호"]');
                return el && el.offsetParent !== null;
            }, { timeout: 10000 });

            console.log(`[VU:${__VU}] ✅ 고객 조회 진입 성공`);

            const isVisible = await page.evaluate(() => {
                const el = document.querySelector('input[placeholder="고객명, 전화번호"]');
                return el && el.offsetParent !== null;
            });

            check(page, {
                'Customer Search Modal successful': () => isVisible === true,
            }) || console.log(`[VU:${__VU}] ❌ 고객 조회 체크 실패`);
        } catch (e) {
            console.log(`[VU:${__VU}] ❌ 고객 조회 모달 실패`, e.message || e);
        }

    } catch (error) {
        console.error(`[VU:${__VU}] ❌ 전체 에러 발생:`, error.message || error.stack || JSON.stringify(error));
        throw error;
    } finally {
        console.log(`[VU:${__VU}] 🔚 context 종료 시도`);
        await context.close();
        console.log(`[VU:${__VU}] ✅ context 정상 종료`);
    }
}