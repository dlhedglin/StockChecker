const express = require("express");
const app = express();
const prisma = require("./db");
const transporter = require("./mailer");
const Prisma = require("@prisma/client");
const scraper = require("./scraper");
const getHtml = require("./browser");

// Server port
var HTTP_PORT = 8000;

app.use(express.json());
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

app.get("/api/products", async (req, res, next) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.get("/api/query", async (req, res, next) => {
  const items = await prisma.item.findMany();
  // let results = [];

  // await Promise.all(
  //   items.map(async (item) => {
  //     return await checkWord(item["url"], item["keyword"]);
  //   })
  // ).then((found) => {
  //   results = found;
  //   // console.log(found);
  //   // res.json(found);
  // });
  let results = await Promise.all(
    items.map(async (item) => {
      return await getHtml(item["url"], item["keyword"]);
    })
  )
  for (i = 0; i < items.length; i++) {
    await prisma.item.update({
      where: {
        id: items[i]["id"],
      },
      data: {
        in_stock: scraper.checkWord(results[i], items[i]["keyword"]) == -1 ? true : false,
        prices:{
          create:{
            price: scraper.parseData(results[i])
          }
        }
      },
    });


    // console.log(results[i]);
    // if (results[i] == -1) {
    //   var message = {
    //     from: "dlhedglin@mail.csuchico.edu",
    //     to: "clasiics@gmail.com",
    //     subject: "Item " + items[i]["name"] + " is back in stock!",
    //     html: '<a href="' + items[i]["url"] + '"> Click Here</a>',
    //   };
    //   console.log(message);
    //   transporter.sendMail(message);
    // }
  }
  res.json(results);
});

app.post("/api/create", async (req, res, next) => {
  const createItem = await prisma.item.create({
    data: {
      name: req.body.name,
      url: req.body.url,
      keyword: req.body.keyword,
      prices: {
        create: [{ price: new Prisma.Decimal(99.99) }],
      },
    },
  });
  res.json(createItem);
});
app.post("/api/delete", async (req, res, next) => {
  await prisma.price.deleteMany({
    where: {
      itemId: {
        in: req.body.id,
      },
    },
  });
  const deleteItem = await prisma.item.deleteMany({
    where: {
      id: {
        in: req.body.id,
      },
    },
  });
  res.json(deleteItem);
});

app.use(function (req, res) {
  res.status(404);
});
