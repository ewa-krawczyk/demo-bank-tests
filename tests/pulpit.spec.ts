import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  test.beforeEach(async ({ page }) => {
    const userName = loginData.userName;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userName, userPassword);
    pulpitPage = new PulpitPage(page);
  });
  // test.describe.configure({ retries: 3 });
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    await pulpitPage.executeQuickTransfer(
      receiverId,
      transferAmount,
      transferTitle,
    );

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successeful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topuUpAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topuUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topuUpAmount);

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topuUpAmount = '50';
    const initialBalance = await pulpitPage.getInitialBalance();
    const expectedBalance = initialBalance - Number(topuUpAmount);

    // Act
    await pulpitPage.executeMobileTopUp(topUpReceiver, topuUpAmount);

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
