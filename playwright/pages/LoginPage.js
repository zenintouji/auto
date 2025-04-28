import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", {
      name: "아이디(이메일)를 입력하세요",
    });
    this.passwordInput = page.getByRole("textbox", {
      name: "비밀번호를 입력하세요",
    });
    this.loginButton = page.getByRole("button", { name: "로그인" });
    this.logoutButton = page.getByRole("button", { name: "로그아웃" });
    this.logo = page.getByRole("img", {
      name: '고객을 관리하는 가장 좋은 선택 "UNO CRM"',
    });
  }

  async goto() {
    await this.page.goto("https://unocare.co.kr/login");
    // await this.page.goto("https://staging.unocare.co.kr/login");
    // await this.page.goto("https://dev.unocare.co.kr/login");
    await this.logo.isVisible();
  }

  async login(username, password, retryCount = 0) {
    const MAX_RETRY = 3;

    console.log(`로그인 시도: ${retryCount + 1}회차`);

    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(username);

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);

    await expect(this.loginButton).toBeVisible();
    // await this.loginButton.click();

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.loginButton.click()
    ]);
    // 네트워크 안정화 대기
    // await this.page.waitForLoadState('networkidle');
    // await this.page.waitForLoadState('domcontentloaded'); // <------

    // if (await this.page.url() === 'https://unocare.co.kr/login') {
    //   throw new Error("Login fail: Login screen shows again");
    // }
    const currentURL = await this.page.url();
    console.log('📍현재 URL: ', currentURL); // 이모찌 ㅋㅋㅋ

    if (currentURL.includes('login')) {
      if (retryCount >= MAX_RETRY) {
        throw new Error("로그인 실패 => 최대 시도 초과함")
      }
      
      console.log('⚠️ 로그인 실패 감지됨 → 다시 시도함');
      await this.page.reload();
      await this.login(username, password, retryCount + 1);
    }

    // if (await this.isLoginFailed()) {
    //   if (retryCount >= MAX_RETRY) {
    //     throw new Error("로그인 실패 => 최대 시도 초과함")
    //   }
    //   console.log("Login failed, then retry");
    //   // await this.retryLogin(username, password);
    //   await this.page.reload();
    //   await this.login(username, password, retryCount + 1);
    //   return;
    // }

    // await expect(this.page).not.toHaveURL('https://unocare.co.kr/login');
    const VALID_PATHS = [
      'home',
      'appointment-boards',
      'cti',
      'consulting-requests',
      'consulting-requests-counselors',
      'consulting-requests-connects',
      'message-histories',
      'sms-point',
      'sms-notification-codes',
      'customers',
      'appointments',
      'registrations',
      'consultings',
      'treatments',
      'payments',
      'surgeries',
      'nurses',
      'survey/results',
      'daily-settlements',
      'monthly-settlements',
      'statistics',
      'statistics/sales',
      'statistics/acquisition-channels',
      'statistics/counselors',
      'statistics/doctors',
      'statistics/customers',
      'statistics/surgeries',
      'statistics/regions',
      'statistics/recommenders',
      'statistics/messages',
      'prescription-issue',
      'prescription-list',
      'prescription-statistics',
      'customer-codes',
      'appointment-codes',
      'consulting-codes',
      'payment-codes',
      'nurse-codes',
      'external-linked-codes',
      'survey-codes/templates',
      'simple-registration-codes',
      'access-control',
      'security-log',
      'organizations',
      'organizations-staff',
      'clinic-info',
      'chart-sample',
    ];
    const urlRegex = new RegExp(`/crm/(${VALID_PATHS.map(p => p.replace(/\//g, '\\').replace(/-/g, '\\-')).join('|')})`);
    await expect(this.page).toHaveURL(urlRegex);
    console.log('로그인 성공');
  }

  async isLoggedin() {
    return await this.logoutButton.isVisible();
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

export { LoginPage };