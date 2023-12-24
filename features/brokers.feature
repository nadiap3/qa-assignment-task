Feature: Verify Broker Information on Search

  Scenario: Verify broker details on search result view

    Given I navigate to the broker page
    When I load all brokers details
    Then I should see their full info displayed
