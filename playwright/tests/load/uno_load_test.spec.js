// import { Cluster } from 'playwright-cluster';
import { Cluster } from 'puppeteer-cluster';
import { customerSearch } from '../../pages/CustomerSearch';
import { LoginPage } from '../../pages/LoginPage';

const USER_CREDENTIALS = {
    username: 'jwpark@v2test.com',
    password: 'uunn2345%%'
};
(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 10, // 동시 실행할 브라우저 수
        timeout: 60 * 1000,
        puppeteerOptions: {
            headless: true,
        }
    });

    let success = 0;
    let fail = 0;

    await cluster.task(async ({page, data}) => {
        const start = Date.now();
        try {
            const login = new LoginPage(page);
            const search = new customerSearch(page);
 
            console.log(`▶️ ${data.userId} 유저 ㄱㄱㄱ`);
            await login.goto();
            await login.login(USER_CREDENTIALS.username, USER_CREDENTIALS.password);
            await search.searchCustomerName();
            await search.searchChartNumber();
            await search.searchBirth();
            const duration = ((Date.now() - start) / 1000).toFixed(2);
            console.log(`✅ ${data.userId} 동작 완료!`);
        } catch (err) {
            fail++;
            console.error(`❌ ${data.userId} 실패:`, err.message);
            // 실패한 vu도 다시 던질 수 있게, 큐 재시도
            if ((data.retryCount || 0) < 2) {
                cluster.queue({ ...data, retryCount: (data.retryCount || 0) + 1});
                console.log(`🔁 ${data.userId} 재시도 등록 (${(data.retryCount || 0) + 1}회차)`);
            }
        }
    });

    const vus = 10;
    for (let i = 1; i <= vus; i++) {
        const delay = Math.floor(Math.random() * 3000); // 최대 3초 랜덤으로 지연하는거~
        setTimeout(() => {
            cluster.queue({ userId: `유저 - ${i}`, retryCount: 0 });
        }, delay);
    }

    await cluster.idle();
    await cluster.close();

    console.log(`\n📊 테스트 결과: 성공 ${success}명 / 실패 ${fail}명`);
})();