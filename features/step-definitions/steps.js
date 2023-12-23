import { Given, When, Then } from "@wdio/cucumber-framework";

import BrokersPage from "../pageobjects/brokers.page.js";

const pages = {
  broker: BrokersPage,
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

When(/^I search for every individual broker details$/, async () => {
  await BrokersPage.loadMoreBrokers();
});

Then(/^I should see their full info displayed$/, async () => {
  const allBrokers = await BrokersPage.allBrokerNames;
  const allBrokerNames = await allBrokers.map((el) => el.getText());

  const allBrokerWithDetails = [];

  for (const brokerName of allBrokerNames) {
    await BrokersPage.searchForBroker(brokerName);
    // await BrokersPage.verifyOnlySearchedBrokerDisplayed(brokerName);

    const brokerDetails = await BrokersPage.getBrokerDetails();
    allBrokerWithDetails.push(brokerDetails);
  }

  const errorList = [];
  allBrokerWithDetails.forEach((broker) => {
    // Simulate a missing field
    // if (Math.random() > 0.5) {
    //   broker.address = "";
    // }

    // Iterate through the properties of the broker details
    for (const key in broker) {
      if (!broker[key]) {
        // If a field is missing, add the broker details to the error list
        errorList.push(broker);
        break;
      }
    }
  });

  // If the error list is not empty, throw an error and print the list
  if (errorList.length > 0) {
    errorList.forEach((broker) => {
      console.error(
        `Error: One or more fields are missing in broker: ${broker.name}`
      );
    });
    throw new Error("Data is missing for one or more brokers");
  }
});
