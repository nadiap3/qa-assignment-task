import { Given, When, Then } from "@wdio/cucumber-framework";

import BrokersPage from "../pageobjects/brokers.page.js";

const pages = {
  broker: BrokersPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

When(/^I search for every individual broker details$/, async () => {
  const allBrokers = await BrokersPage.allBrokerNames;
  //   console.log("Before========: ", allBrokers.length);
  await BrokersPage.loadMoreBrokers();

  //   TODO: Refactor this to use a waitUntil() function
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const allBrokersAfter = await BrokersPage.allBrokerNames;
  //   console.log("After =========: ", allBrokersAfter.length);

  const allBrokerNames = allBrokersAfter.map((el) => el.getText());
  console.log("allBrokerNames: ", allBrokerNames);
});

Then(/^I should see their full info displayed$/, () => {
  console.log("then step");
});
