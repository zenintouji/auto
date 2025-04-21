import { expect } from "playwright/test";

class LogoutPage {
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
    this.logoutModalText = page.getByText('로그아웃하시겠습니까?');
    this.confirmButton = page.getByRole('button', { name: '확인' });
    this.logoutSuccessText = page.getByText('로그아웃되었습니다');
    this.logo = page.getByRole('img', { name: '고객을 관리하는 가장 좋은 선택 \"UNO CRM\"' });
  }

  async goto() {
    await this.page.goto("https://unocare.co.kr/login");
    await expect(this.logo).toBeVisible();
  }

  async login(username, password) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(username);
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.loginButton).toBeVisible();
    // await this.loginButton.click();
    // await this.page.waitForTimeout(1000);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.loginButton.click()
    ]);

    if (await this.isLoginFailed()) {
      console.log("Login failed, then retry");
      await this.retryLogin(username, password);
    }

    await expect(this.page).not.toHaveURL('https://unocare.co.kr/login');
    console.log('로그인 성공');
  }

  async isLoggedIn() {
    return await this.logoutButton.isVisible();
  }

  async isLoggedOut() {
    return await this.loginButton.isVisible();
  }
  
  async LoggedOutSuccessCheeck() {
    await expect(this.logoutSuccessText).toBeVisible();
  }

  async logout() {
    await expect(this.logoutButton).toBeVisible();
    await this.logoutButton.click();
    await expect(this.logoutModalText).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
    await this.confirmButton.click();
    console.log('로그아웃 성공');
  }

  async isLoginFailed() {
    return this.loginButton.isVisible();
  }

  async retryLogin(username, password) {
    await this.page.reload();
    await this.login(username, password);
  }
}

export { LogoutPage };