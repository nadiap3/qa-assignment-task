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
}

export default new BrokersPage();
