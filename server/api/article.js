const router = require("express").Router();
const { Article } = require("../db/models");
const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.sciencedaily.com/news/mind_brain/mental_health/";
let jsonTab = [];

request(url, (error, response, html) => {
  const $ = cheerio.load(html);
  jsonTab = [];

  for (let i = 0; i < 10; i++) {
    const article = $(".latest-head")[i].children[0],
      artObj = {};
    // artObj.id = i + 1;
    artObj.title = article.children[0].data;
    artObj.url = `https://www.sciencedaily.com${article.attribs.href}`;
    jsonTab.push(artObj);
  }

  // return jsonTab;
});

// ------------------------------ ROUTES ------------------------------ //
router.get("/", async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    if (!articles) return res.sendStatus(404);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (jsonTab.length) {
      Article.destroy({
        where: {},
        truncate: true
      });
      await Article.bulkCreate(jsonTab);
      const newArticles = await Article.findAll();
      if (!newArticles) return res.sendStatus(404);
      res.status(200).json(newArticles);
    } else res.json({ message: "No available articles !" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
