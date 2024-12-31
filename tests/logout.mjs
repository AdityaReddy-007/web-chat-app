import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe("Web Chat Application Logout Test", function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/email"); // Adjust this URL if needed
    await login(driver, "demo@gmail.com", "1234");
  });

  after(async function () {
    await driver.quit();
  });

  it("should log out the user", async function () {
    // Assume we are already on the page where the logout button is visible after login

    // Click the logout button
    const logoutButton = await driver.findElement(By.css('button[title="logout"]'));
    await logoutButton.click();

    // Verify that the user is logged out
    // You might want to check if the login page is visible or if some logout indicator is present
    await driver.wait(until.urlContains('/email'), 20000); // Adjust URL as needed
    const emailInput = await driver.findElement(By.id('email'));
    expect(await emailInput.isDisplayed()).to.be.true; // Check if login page elements are visible
  });

  async function login(driver, email, password) {
    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys(email);
    await driver.sleep(2000);

    const emailSubmitButton = await driver.findElement(
      By.className(
        "bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
      )
    );
    await emailSubmitButton.click();
    await driver.sleep(2000);

    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys(password);
    await driver.sleep(2000);

    const passwordSubmitButton = await driver.findElement(
      By.className(
        "bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
      )
    );
    await passwordSubmitButton.click();
    await driver.sleep(3000);
  }
});

