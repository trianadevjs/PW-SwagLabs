import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginInput: Locator;
    private readonly swaglabsTitle: Locator;

    constructor(page: Page) {
        this.userNameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginInput = page.getByRole('button', { name: 'Login' });
        this.swaglabsTitle = page.getByText('Swag Labs', { exact: true });
    }

    async login(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginInput.click();
    }
}