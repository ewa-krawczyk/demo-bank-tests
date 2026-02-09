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
    const userName = 'tester';
    const expectedError = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedError);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userName = loginData.userName;
    const userPassword = 'test';
    const expectedError = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedError,
    );
  });
});
