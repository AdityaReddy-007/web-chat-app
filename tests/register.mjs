import { Builder, By } from "selenium-webdriver";
import path from "path";
import { getDirname } from './utils.mjs';

const __dirname = getDirname(import.meta.url);

describe("Web Chat Application Tests - Registration", function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await new Builder()
      .forBrowser("chrome")
      .build();
    await driver.get("http://localhost:3000/register");
    await driver.sleep(4000);
  });

  after(async function () {
    await driver.quit();
  });

  it("should register a new user", async function () {
    await driver.findElement(By.id("name")).sendKeys("Demo1");
    await driver.sleep(3000);

    await driver.findElement(By.id("email")).sendKeys("demo1@gmail.com");
    await driver.sleep(3000);

    await driver.findElement(By.id("password")).sendKeys("@demo1");
    await driver.sleep(3000);

    const filePath = path.resolve(__dirname, "C:\\Users\\adity\\Downloads\\Demo1.jpeg");
    await driver.findElement(By.id('profile_pic')).sendKeys(filePath);
    await driver.sleep(5000);

    await driver.findElement(By.className("bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide")).click();
    await driver.sleep(4000);
  });
});
