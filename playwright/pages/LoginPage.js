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

  async login(username, password) {
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

    if (await this.isLoginFailed()) {
      console.log("Login failed, then retry");
      await this.retryLogin(username, password);
    }

    await expect(this.page).not.toHaveURL('https://unocare.co.kr/login');
    console.log('로그인 성공');
  }

  async isLoggedin() {
    return await this.logoutButton.isVisible();
  }

  // 로그인 실패하면
  async isLoginFailed() {
    return this.loginButton.isVisible();
  }

  async retryLogin(username, password) {
    await this.page.reload();
    await this.login(username, password);
  }
}

export { LoginPage };