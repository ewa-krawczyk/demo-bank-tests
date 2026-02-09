import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userName = loginData.userName;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  // test.describe.configure({ retries: 3 });
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiver.selectOption(receiverID);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.actionCloseButton.click();

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
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiverInput.selectOption(topUpReceiver);
    await pulpitPage.topupAmount.fill(topuUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topUpReceiver = '500 xxx xxx';
    const topuUpAmount = '50';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topuUpAmount);

    // Act
    await pulpitPage.topupReceiverInput.selectOption(topUpReceiver);
    await pulpitPage.topupAmount.fill(topuUpAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
