Feature: Yavlena brokers website

  Scenario Outline: As a user, I can see the full info for all brokers

    Given I am on the broker page
    When I search for every individual broker details
    Then I should see their full info displayed
