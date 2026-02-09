import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Paymeny tests', () => {
  test.beforeEach(async ({ page }) => {
    const userName = loginData.userName;
    const userPassword = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5612 3444 44444';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
