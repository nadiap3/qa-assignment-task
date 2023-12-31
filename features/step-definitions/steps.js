import { Given, When, Then } from "@wdio/cucumber-framework";
import allureReporter from "@wdio/allure-reporter";

import BrokersPage from "../pageobjects/brokers.page.js";

const pages = {
  broker: BrokersPage,
};

Given(/^I navigate to the (\w+) page$/, async (page) => {
  await pages[page].open();
});

When(/^I load all brokers details$/, async () => {
  await BrokersPage.loadMoreBrokers();
});

Then(/^I should see their full info displayed$/, async () => {
  const allBrokers = await BrokersPage.allBrokerNames;
  const allBrokerNames = await allBrokers.map((el) => el.getText());

  const allBrokerWithDetails = [];

  for (const brokerName of allBrokerNames) {
    await BrokersPage.searchForBroker(brokerName);

    const brokerDetails = await BrokersPage.getBrokerDetails();
    await allBrokerWithDetails.push(brokerDetails);
  }

  const errorList = [];
  await allBrokerWithDetails.forEach((broker) => {
    for (const key in broker) {
      if (!broker[key]) {
        // If a field is missing, add the broker details to the error list
        errorList.push(broker);
        break;
      }
    }
  });

  if (errorList.length > 0) {
    errorList.forEach((broker) => {
      // Print error message for each broker
      console.error(`Error: Fields are missing for broker: ${broker.name}`);
      allureReporter.addStep(
        `Error: Fields are missing for broker: ${broker.name}`
      );
    });
    throw new Error(
      "Data is missing for the following brokers: ",
      errorList.map((broker) => broker.name)
    );
  }

  await expect(errorList.length).toBe(0);
});
