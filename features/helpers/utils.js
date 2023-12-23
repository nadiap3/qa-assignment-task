export const waitforInvisible = async (element, maxWaitTime = 20000) => {
  await browser.waitUntil(async () => !(await element.isDisplayed()), {
    timeout: maxWaitTime,
    timeoutMsg: `Expected element to disappear in less than ${maxWaitTime}`,
  });
};
