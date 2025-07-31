import { test, expect } from '@playwright/test';
import { SimpleAppLoginPage } from '../../../pages/SimpleAppLoginPage';
import { SimpleAppRegistration } from '../../../pages/SimpleAppRegistration';

test.setTimeout(90000);

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test('Simple Reception > Reception on app', async ({ page }) => {
  const simpleAppLoginPage = new SimpleAppLoginPage(page);
  const simpleAppRegistration = new SimpleAppRegistration(page);

  await simpleAppLoginPage.goto();

  await simpleAppLoginPage.login('simplee@test.com', 'asdf1234!');

  await simpleAppRegistration.pressPhoneNumber('8181-8181');
  await simpleAppRegistration.pressNextButton();

  await simpleAppRegistration.checkPurposeOn();

  await simpleAppRegistration.checkSuccessRegistration();

});