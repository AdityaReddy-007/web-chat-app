import { Builder, By, until} from "selenium-webdriver";
import { expect } from "chai";

describe("Web Chat Application Tests", function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/email");
    await driver.sleep(6000);
  });

  after(async function () {
    await driver.quit();
  });

  it("should login an existing user", async function () {
    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys("demo@gmail.com");
    await driver.sleep(6000);
    const emailSubmitButton = await driver.findElement(
      By.className(
        "bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
      )
    );
    await emailSubmitButton.click();
    await driver.sleep(6000);

    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys("1234");
    await driver.sleep(6000);

    const passwordSubmitButton = await driver.findElement(
      By.className(
        "bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
      )
    );
    await passwordSubmitButton.click();
    await driver.sleep(6000);
  });
});
