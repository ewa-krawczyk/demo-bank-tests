import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userName = 'tester12';
    const userPassword = 'tester12';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

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
    const userName = 'tester12';
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
