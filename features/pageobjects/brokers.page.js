import { $ } from "@wdio/globals";
import Page from "./page.js";

class BrokersPage extends Page {
  // Selectors
  get loadMoreBtn() {
    return $("a[data-container='load-more-brokers']");
  }

  get allBrokerNames() {
    return $$(".broker-card .broker-data > .header-group .name > a");
  }
  get inputUsername() {
    return $("#username");
  }

  get inputPassword() {
    return $("#password");
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  // Methods
  open() {
    return super.open("broker");
  }

  async loadMoreBrokers() {
    await this.loadMoreBtn.click();
  }
}

export default new BrokersPage();
