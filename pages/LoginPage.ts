import { test, expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errMsg: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#doLogin');
        this.errMsg = page.locator('div.alert.alert-danger');
    }

    async goto() {
        await test.step('Go to Admin Page', async () => {
            await this.page.goto('/admin');
        });
    }

    async login(username: string, password: string) {
        await test.step(`Login with username: ${username} and password: ${password}`, async () => {
           await this.usernameField.fill(username);
           await this.passwordField.fill(password);
           await this.loginButton.click(); 
        });
    }

    async expectNoErrorMsg() {
        await test.step('Verify invalid credentials error message is not shown', async () => {
            await expect(this.errMsg).toBeHidden();
        });
    }

    async expectErrorMsg() {
        await test.step('Verify invalid credentials error message is shown', async () => {
            await expect(this.errMsg).toBeVisible();
            await expect(this.errMsg).toHaveText('Invalid credentials');
        });
    }

}