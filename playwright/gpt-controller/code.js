import { LoginPage } from '../pages/LoginPage';
import { Exception } from '../pages/Exception';

export async function action(page) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('jwpark@v2test.com', 'uunn2345%%');

    await page.waitForTimeout(2000);
    await Exception.closePopupIfExists();

    await page.waitForTimeout(1000);
    await Exception.closeBannerIfExists();

    await page.waitForTimeout(2000);
    expect(await loginPage.isLoggedin()).toBeTruthy();

    await page.getByRole('button', { name: 'icon-calendar 예약 캘린더' }).click();
    
}