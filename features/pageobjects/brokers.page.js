import { $ } from "@wdio/globals";
import Page from "./page.js";
import { waitforInvisible } from "../helpers/utils.js";

class BrokersPage extends Page {
  // Selectors
  get loadMoreBtn() {
    return $("a[data-container='load-more-brokers']");
  }

  get allBrokerNames() {
    return $$(".broker-card .broker-data > .header-group .name > a");
  }

  get searchInputField() {
    return $(
      "div[data-container='filter-broker-section'] input[data-container='broker-keyword']"
    );
  }

  get loadingIndicator() {
    return $(".brokers-loading");
  }

  get brokerAddress() {
    return $(".broker-data .office");
  }

  get brokerNumOfProperties() {
    return $(".broker-data .position > a");
  }

  get brokerPhoneNumbers() {
    return $$(".broker-data .tel-group .tel");
  }

  // Methods
  open() {
    return super.open("broker");
  }

  async loadMoreBrokers() {
    await this.loadMoreBtn.click();
    await this.loadingIndicator.waitForDisplayed();
    await waitforInvisible(this.loadingIndicator);
  }

  async searchForBroker(brokerName) {
    await this.searchInputField.setValue(brokerName);
    await this.loadingIndicator.waitForDisplayed();
    await waitforInvisible(this.loadingIndicator);
  }

  async getBrokerDetails() {
    const [landlinePhone, mobilePhone] = await this.brokerPhoneNumbers;
    const brokerDetails = {
      name: await this.allBrokerNames[0].getText(),
      address: await this.brokerAddress.getText(),
      numOfProperties: await this.brokerNumOfProperties.getText(),
      landlinePhone: landlinePhone ? landlinePhone.getText() : undefined,
      mobilePhone: mobilePhone ? mobilePhone.getText() : undefined,
    };
    return brokerDetails;
  }
}

export default new BrokersPage();
