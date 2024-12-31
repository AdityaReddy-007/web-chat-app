import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe("Web Chat Application Tests - Offline Status", function () {
  this.timeout(70000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    
    // Login as demo user
    await driver.get("http://localhost:3000/email");
    await login(driver, "demo@gmail.com", "1234");
    
    // Navigate to demo1's chat interface
    await driver.get("http://localhost:3000/676644051459027004a965dc"); // Adjust URL as needed
    await driver.sleep(2000);

    // Wait for the chat interface to load
    await driver.wait(until.elementLocated(By.id('text')), 20000);
  });

  after(async function () {
    await driver.quit();
  });

  it("should show demo1 user as offline", async function () {
    // Observe the status of demo1
    const offlineStatusSelector = By.css('p.text-sm span.text-slate-400');
    let statusElement;

    try {
      statusElement = await driver.wait(until.elementLocated(offlineStatusSelector), 20000);
      const status = await statusElement.getText();
      expect(status).to.equal('offline'); // Adjust 'offline' based on your actual status
    } catch (error) {
      console.error("Error finding or reading status element:", error);
      throw error;
    }
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
    await driver.sleep(2000);
  }
});