import { Given, When, Then } from "@wdio/cucumber-framework";
import { waitforInvisible } from "../helpers/utils.js";

import BrokersPage from "../pageobjects/brokers.page.js";

const pages = {
  broker: BrokersPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

When(/^I search for every individual broker details$/, async () => {
  const allBrokers = await BrokersPage.allBrokerNames;
  console.log("Before========: ", allBrokers.length);
  await BrokersPage.loadMoreBrokers();

  const allBrokersAfter = await BrokersPage.allBrokerNames;
  console.log("After =========: ", allBrokersAfter.length);

  const allBrokerNames = await allBrokersAfter.map((el) => el.getText());
  console.log("allBrokerNames: ", allBrokerNames);

  await BrokersPage.searchForBroker(allBrokerNames[0]);

  console.log("Loading indicator disapeared...");
});

Then(/^I should see their full info displayed$/, () => {
  console.log("then step");
});
