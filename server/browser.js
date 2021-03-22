// const configPage = require('./browserConfig');
const puppeteer = require("puppeteer");

async function checkWord(url, keyword) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
  );
  await page.goto(url);
  let html = await page.evaluate(() => document.body.innerText);
  let n = html.search(keyword);
  // console.log(n);
  return n;
}
module.exports = checkWord;
