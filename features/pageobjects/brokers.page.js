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

  get brokerLandlinePhone() {
    return $$(".broker-data .tel-group .tel")[0];
  }
  get brokerMobilePhone() {
    return $$(".broker-data .tel-group .tel")[1];
  }
  // Methods
  open() {
    return super.open("broker");
  }

  async loadMoreBrokers() {
    await this.loadMoreBtn.click();
    await waitforInvisible(this.loadingIndicator);
  }

  async searchForBroker(brokerName) {
    await this.searchInputField.setValue(brokerName);
    await waitforInvisible(this.loadingIndicator);
  }

  async getBrokerDetails() {
    const brokerDetails = {
      name: await this.allBrokerNames[0].getText(),
      address: await this.brokerAddress.getText(),
      numOfProperties: await this.brokerNumOfProperties.getText(),
      landlinePhone: await this.brokerLandlinePhone.getText(),
      mobilePhone: await this.brokerMobilePhone.getText(),
    };
    return brokerDetails;
  }
}

export default new BrokersPage();
