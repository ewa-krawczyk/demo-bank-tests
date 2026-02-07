# Test Automation training form jaktestowac.pl
## Links
- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site
https://demo-bank.vercel.app/  
If link broken check first lesson for update:
https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands
- check `NodeJS` version    
`node -v`
- new project with Playwright:  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
`npx playwright test`
- run test with browser GUI:  
`npx playwright test --headed`
- viewing report  
`npx playwright show-report`
## Playwright Config modifications
- config file `playwright.config.ts`
- disabling browsers, i.e. Firefox:
    ```json
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

    ## Visual Studio Code
    - Preview: for README.md
    - Autosave: in File -> Auto Save
    - Timeline: file context menu
    - Formating: editor -> context menu -> Format document

    ##Playwrigt snippets
    - tests:
    ```javascript
    test('test description', async({page})) => {});

    - running one test `test.only`
    - describe('Group descripton', () => {})

    - repeat test: --repeat-each=20
    -- repeat tests 3x: test.describe.configure({retries: 3});
