import { $ } from "@wdio/globals";
import Page from "./page.js";

class BrokersPage extends Page {
  // Selectors
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
}

export default new BrokersPage();
