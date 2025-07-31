import { expect } from '@playwright/test';

class SimpleAppLoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: '이메일' });
        this.passwordInput = page.getByRole('textbox', { name: '●●●●●●●●' })
        this.loginButton = page.getByRole("button", { name: "로그인" });
        this.loggedInCheck = page.getByText('전화번호로 접수를 시작합니다');
        this.logo = page.getByRole("img", {name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"'});
    }

    async goto() {
        await this.page.goto("https://app.unocare.co.kr/login");
        await this.logo.isVisible();
    }

    async login(username, password, retryCount = 0) {
        const MAX_RETRY = 5;

        console.log(`⚠️ 로그인 시도: ${retryCount + 1}회차`);

        await expect(this.emailInput).toBeVisible();
        await this.emailInput.fill(username);
        // await this.page.waitForTimeout(1000);
        
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(password);

        await expect(this.loginButton).toBeVisible();

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
            this.loginButton.click()
        ]);

        await this.page.waitForURL(/\/(login|simple-registrations|appointments)/);
        const currentURL = await this.page.url();
        console.log('📍 현재 URL: ', currentURL); // 이모찌 ㅋㅋㅋ

        if (currentURL.includes('/login') || await this.loginButton.isVisible()) {
            if (retryCount >= MAX_RETRY) {
                throw new Error("❌ 로그인 실패 => 최대 시도 초과함")
            }

            console.log('⚠️ 로그인 실패 감지됨 → 다시 시도함');
            await this.page.reload();
            await this.login(username, password, retryCount + 1);
            return;
        }

        const VALID_PATHS = [
            'simple-registrations',
            'appointments',
        ];
        const urlRegex = new RegExp(`(${VALID_PATHS.map(p => p.replace(/[-\/]/g, '\\$&')).join('|')})`);
        await expect(this.page).toHaveURL(urlRegex);
        console.log('✅ 로그인 성공');
    }

    async isLoggedin() {
        return await this.loggedInCheck.isVisible();
    }

    // 로그인 실패하면
    async isLoginFailed() {
        return await this.loginButton.isVisible();
    }

  // async retryLogin(username, password) {
  //   await this.page.reload();
  //   await this.login(username, password);
  // }
}

export { SimpleAppLoginPage };