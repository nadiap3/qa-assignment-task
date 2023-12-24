# Interview task

Interview testing project. The main goal is to test the https://www.yavlena.com/broker/ website and how the brokers are being displayed on the page.

## Installation process

- Clone the repository
- npm i
- npm run test

## Scripts

- npm run test -> Running all tests
- npm run report -> Generates and opens sample Allure report.

## Notes:

- For waits I'm using the following approach - waiting for the Loader to show - then waiting for the laoder to hide
  The reason for that is because I noticed that for every search a new API request was made. Therefore we can expect the loader to always be displayed.
- The default time for test executions is increased to 3 minutes.
