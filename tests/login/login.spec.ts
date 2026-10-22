import test, { Browser, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

(async() => {
    let browser: Browser;
    let page: Page;

    test.describe('Navego en la página SwagLabs e inicio sesión con un usuario y contraseña válidas', () => {
        const users = [
            { user: 'standard_user', password: 'secret_sauce' }
        ];

        for(const user of users) {
            test(`El usuario "${user.user}" intenta iniciar sesión`, async ({ page }) => {
                const loginPage = new LoginPage(page);
                const homePage = new HomePage(page);
                await test.step('El usuario accede a la página principal y logra ver el titulo "SwagLabs"', async () => {
                    await page.goto('/');
                    await loginPage.login(user.user, user.password);
                    await expect(homePage.productsTitle, 'El Titulo de "Productos" no es correcto').toHaveText('Products');
                });
            });
        }
    });
})();