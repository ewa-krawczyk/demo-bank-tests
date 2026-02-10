import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  sideMenu: SideMenuComponent;
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  topupReceiverInput: Locator;
  topupAmount: Locator;
  topupAgreementCheckbox: Locator;
  transferButton: Locator;
  topupExecuteButton: Locator;
  actionCloseButton: Locator;
  messageText: Locator;
  moneyValueText: Locator;
  userNameText: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');

    this.topupReceiverInput = this.page.locator('#widget_1_topup_receiver');
    this.topupAmount = this.page.locator('#widget_1_topup_amount');
    this.topupAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement > span',
    );

    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.topupExecuteButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');
    this.moneyValueText = this.page.locator('#money_value');
    this.userNameText = this.page.getByTestId('user-name');
  }

  async executeQuickTransfer(
    receiverId: string,
    amount: string,
    title: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(amount);
    await this.transferTitle.fill(title);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async executeMobileTopUp(receiver: string, amount: string): Promise<void> {
    await this.topupReceiverInput.selectOption(receiver);
    await this.topupAmount.fill(amount);
    await this.topupAgreementCheckbox.click();
    await this.topupExecuteButton.click();
    await this.actionCloseButton.click();
  }

  async getInitialBalance(): Promise<number> {
    const text = await this.moneyValueText.innerText();
    return Number(text);
  }
}
