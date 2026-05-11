import { test, expect } from '@playwright/test';
import { Header } from "../../pages/components/Header";
import { LoginPage } from "../../pages/LoginPage";

test.describe('Login Tests', () => {
    let loginPage: LoginPage;
    let header: Header;
    
    test.beforeEach(async ({ page }) => {
       loginPage = new LoginPage(page);
       header = new Header(page);
       
       await loginPage.goto();
    });

    // UI / Page Load
    test.describe("Page Load & UI Elements", () => {
        test("should load the login page successfully", async ({ page }) => {
            await expect(page).toHaveURL("/admin");
            await expect(page).toHaveTitle("Restful-booker-platform demo");
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
            await loginPage.expectNoErrorMsg();

            await expect(loginPage.usernameField).toBeVisible();
            await expect(loginPage.passwordField).toBeVisible();
            await expect(loginPage.passwordField).toHaveAttribute("type", "password");
            await expect(loginPage.loginButton).toBeVisible();
        });
    });

    // Functional Tests
    test.describe("Functional Tests", () => {
        test('Admin is able to login with correct username and password @sanity @admin', async ({ page }) => {
            loginPage.login('admin', 'password');
    
            // should redirect to admin room after successful login
            await expect(page).toHaveURL("/admin/rooms");
            // logout button should be visible after successful login
            await expect(header.logoutButton).toBeVisible();
        });
    
        test('Admin is not able to login with empty username @admin', async () => {
            loginPage.login('', 'password');
            await loginPage.expectErrorMsg();
        });
        
        test('Admin is not able to login with empty password @admin', async () => {
            loginPage.login('admin', '');
            await loginPage.expectErrorMsg();
        });
    
        test('Admin is not able to login with incorrect password @admin', async () => {
            loginPage.login('admin', 'wrong_password');
            await loginPage.expectErrorMsg();
        });
        
        test('Admin is not able to login with incorrect username @admin', async () => {
            loginPage.login('wrong_admin', 'password');
            await loginPage.expectErrorMsg();
        });
    });
    
    // Security Tests
    test.describe("Security Tests", () => {
        test("should redirect unauthenticated users back to login when accessing admin directly", async ({ page }) => {
            await page.goto("/admin/rooms");
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
        });
    });

});
