import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  sideMenu: SideMenuComponent;
  transferReceiverInput: Locator;
  transferToInput: Locator;
  transferAmountInput: Locator;
  transferButton: Locator;
  actionCloseButton: Locator;
  messages: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferToInput = this.page.getByTestId('form_account_to');
    this.transferAmountInput = this.page.getByTestId('form_amount');
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.actionCloseButton = this.page.getByTestId('close-button');
    this.messages = this.page.locator('#show_messages');
  }
}
