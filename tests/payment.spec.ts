import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Paymeny tests', () => {
  test.beforeEach(async ({ page }) => {
    const userName = loginData.userName;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const paymentPage = new PaymentPage(page);
    await paymentPage.paymentsLink.click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5612 3444 44444';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferToInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);

    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();

    // Assert
    await expect(paymentPage.messages).toHaveText(expectedMessage);
  });
});
