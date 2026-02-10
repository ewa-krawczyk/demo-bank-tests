import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = loginData.userName;
    const userPassword = loginData.userPassword;
    const expectedUserName = loginData.expectedUserName;

    // Act
    await loginPage.login(userName, userPassword);

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectUserName = 'tester';
    const expectedError = 'identyfikator ma min. 8 znaków';

    // Act
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
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedError);
  });
});
