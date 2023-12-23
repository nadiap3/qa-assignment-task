import { Given, When, Then } from "@wdio/cucumber-framework";

import BrokersPage from "../pageobjects/brokers.page.js";

const pages = {
  broker: BrokersPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

When(/^I search for every individual broker details$/, () => {
  console.log("When step");
});

Then(/^I should see their full info displayed$/, () => {
  console.log("then step");
});
