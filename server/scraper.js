const cheerio = require('cheerio');

function checkWord(html, keyword) {
  let n = html.search(keyword);
  return n;
}

function parseData(html)
{
    let $ = cheerio.load(html);
    let price = $(".priceView-customer-price").children().first().text();
    console.log("Price: " + price);
    return Number(price.replace(/[^0-9.-]+/g,""))
}

module.exports.checkWord = checkWord
module.exports.parseData = parseData
