import { chromium } from "playwright";
import { LoginPage } from "../pages/LoginPage";
import { action } from './code.js';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    try {
        await action(page, loginPage);
    } catch (err) {
        console.error('❌ 실행 중 에러:', err);
    } finally {
        await browser.close();
    }
})();