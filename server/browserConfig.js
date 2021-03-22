const puppeteer = require("puppeteer");

// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// );

module.exports = (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"
  );
  return page;
})
