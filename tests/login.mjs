import { Builder, By, until} from "selenium-webdriver";
import { expect } from "chai";

describe("Web Chat Application Tests", function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/email");
    await driver.sleep(4000);
  });

  after(async function () {
    await driver.quit();
  });

  it("should login an existing user", async function () {
    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys("Demo1@gmail.com");
    await driver.sleep(4000);
    const emailSubmitButton = await driver.findElement(
      By.className(
        "bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
      )
    );
    await emailSubmitButton.click();
    await driver.sleep(3000);

    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys("@Demo1");
    await driver.sleep(3000);

    const passwordSubmitButton = await driver.findElement(
      By.className(
        "bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide"
      )
    );
    await passwordSubmitButton.click();
    await driver.sleep(2000);
  });
});
