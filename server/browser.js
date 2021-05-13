const puppeteer = require("puppeteer");

async function getHtml(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
    );
    await page.goto(url);
    let html = await page.evaluate(() => document.body.innerHTML);
    await page.close();
    await browser.close();
    return html;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getHtml;
