const cheerio = require('cheerio');

function checkWord(html, keyword) {
  let n = html.search(keyword);
  return n;
}

function parseData(html, url)
{
  if(url.search("amazon.com") != -1){
    return parseAmazon(html);
  }
  else if(url.search("bestbuy.com") != -1){
    return parseBestBuy(html);
  }
  else if(url.search("newegg.com") != -1){
    return parseNewEgg(html);
  }
  else
    return -1;
}
function parseBestBuy(html)
{
    let $ = cheerio.load(html);
    let price = $(".price-box").children('div').children('div').children('div').children('span').first().text()
    return Number(price.replace(/[^0-9.-]+/g,""))
}
function parseAmazon(html)
{
    let $ = cheerio.load(html);
    let price = $("#priceblock_saleprice").text()
    return Number(price.replace(/[^0-9.-]+/g,""))
}
function parseNewEgg(html)
{
    let $ = cheerio.load(html);
    let price = $(".product-price").children(".price").children(".price-current").text()
    return Number(price.replace(/[^0-9.-]+/g,""))
}


module.exports.checkWord = checkWord
module.exports.parseData = parseData
