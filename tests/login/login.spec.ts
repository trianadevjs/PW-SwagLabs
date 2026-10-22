import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', {
    tag: ['@login']
}, () => {
    test.describe('Login positive scenarios', {
        tag: ['@positive']
    }, () => {

        test('should redirect to the inventory page with valid credentials', {
            tag: ['@smoke']
        }, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);
    
            const username = 'standard_user';
            const password = 'secret_sauce';
    
            await page.goto('/');
            await loginPage.login(username, password);
    
            await expect(page).toHaveURL(/\/inventory\.html$/);
            await expect(inventoryPage.productsTitle).toHaveText('Products');
        });

        test.describe('Login with special users credentials', {
            tag: ['@special']
        }, () => {
            
            test('should redirect to the inventory page with "problem_user" username but product images display a wrong picture', 
                async ({ page }) => {
                const loginPage = new LoginPage(page);
                const inventoryPage = new InventoryPage(page);
    
                const username = 'problem_user';
                const password = 'secret_sauce';
                
                await page.goto('/');
                await loginPage.login(username, password);
    
                await expect(inventoryPage.productsTitle).toBeVisible();
                await expect(inventoryPage.saucelabsBackPackImage).toBeVisible();
                await expect(inventoryPage.saucelabsBackPackImage).toHaveAttribute('src', '/assets/sl-404-Cq1a9k9X.jpg');
            });
    
            test('should redirect to the inventory page with "performance_glitch_user" username with a delay', async ({ page }) => {
                const loginPage = new LoginPage(page);
                const inventoryPage = new InventoryPage(page);

                const username = 'performance_glitch_user';
                const password = 'secret_sauce';

                await page.goto('/');
                await loginPage.login(username, password);

                await expect(page).toHaveURL(/\/inventory\.html$/);
                await expect(inventoryPage.productsTitle).toBeVisible();
                await expect(inventoryPage.productsTitle).toHaveText('Products');
            });
        })
        
    });
    

    test.describe('Login negative scenarios', {
        tag: ['@negative']
    }, () => {
        test('should display a required-field error when username is empty', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = '';
            const password = 'secret_sauce';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.usernameRequiredMessage).toBeVisible();
        });

        test('should display a required-field error when password is empty', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = 'standard_user';
            const password = '';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.passwordRequiredMessage).toBeVisible();
        });
        
        test('should display an authentication failed error when username is incorrect', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = 'standard_users';
            const password = 'secret_sauce';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });
        
        test('should display an authentication failed error when password is incorrect', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = 'standard_user';
            const password = 'secret_sauces';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });

        test('should display an authentication failed error when username and password are incorrect', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = 'standard_users';
            const password = 'secret_sauces';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });

        test('should display an authentication failed error when username has a space', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = 'standard_users ';
            const password = 'secret_sauce';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.invalidCredentialMessage).toBeVisible();
        });
        
        test('should display a locked error message when username is "locked_out_user"', async ({ page }) => {
            const loginPage = new LoginPage(page);

            const username = 'locked_out_user';
            const password = 'secret_sauce';

            await page.goto('/');
            await loginPage.login(username, password);
            await expect(loginPage.lockedOutUserMessage).toBeVisible();
            await expect(loginPage.lockedOutUserMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        });
        

        
    });
    
});