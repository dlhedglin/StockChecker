// const configPage = require('./browserConfig');
const puppeteer = require("puppeteer");
const scraper = require("./scraper");

async function getHtml(url, keyword) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
    );
    await page.goto(url);
    // let pageText = await page.evaluate(() => document.body.innerText);
    let html = await page.evaluate(() => document.body.innerHTML);
    await page.close();
    await browser.close();
    // let n = pageText.search(keyword);
    // scraper.parseData(html);
    // console.log(n);
    return html;
  } catch (error) {
    console.log(error);
  } 
  // finally {

  //   await browser.close();
  // }
}
module.exports = getHtml;
