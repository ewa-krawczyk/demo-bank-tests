import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { log } from 'node:console';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = loginData.userName;
    const userPassword = loginData.userPassword;
    const expectedUserName = loginData.expectedUserName;

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectUserName = 'tester';
    const expectedError = 'identyfikator ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserName);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedError);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userName = loginData.userName;
    const incorrectUserPassword = 'test';
    const expectedError = 'hasło ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedError);
  });
});
