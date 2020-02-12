const router = require("express").Router();
const { Article } = require("../db/models");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.sciencedaily.com/news/mind_brain/mental_health/";

request(url, (error, response, html) => {
  const $ = cheerio.load(html),
    jsonTab = [];

  for (let i = 0; i < 10; i++) {
    const article = $(".latest-head")[i].children[0],
      artObj = {};
    // artObj.id = i + 1;
    artObj.title = article.children[0].data;
    artObj.url = `https://www.sciencedaily.com${article.attribs.href}`;
    jsonTab.push(artObj);
  }

  return jsonTab;
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
    const articles = await request(url);
    if (articles && articles.length) {
      Article.destroy({
        where: {},
        truncate: true
      });
      await Article.bulkCreate(articles);
      const newArticles = await Article.findAll();
      if (!newArticles) return res.sendStatus(404);
      res.status(200).json(newArticles);
    } else res.json({ message: "No available articles !" });
  } catch (error) {
    next(error);
  }
});

// ------------------------------ TESTING 1 ------------------------------ //
// const fs = require("fs");
// const request = require("request");
// const cheerio = require("cheerio");

// const jsonTab = [];

// function writeFile() {
//   // Will write the json file
//   fs.writeFile("output.json", JSON.stringify(jsonTab, null, 4), err => {
//     console.log("File successfully written!");
//   });
// }

// // The URL of the advanced search feature with our keywords
// const url = "https://www.sciencedaily.com/news/mind_brain/mental_health/";

// /* The first request call, our goal here is to get the number of results and then
// to calculate the number of pages */
// request(url, (error, response, html) => {
//   const $ = cheerio.load(html);

//   // All the variables we will use later
//   let number;
//   let description;
//   let date;
//   let title;
//   let link;

//   // if (!error) {
//   //   console.log("FIRST -", $(".latest-head")[0].children[0]);
//   //   $(".latest-head")
//   //     .slice(0, 10)
//   //     .filter(x => {
//   //       const data = $(this);

//   //       const str = data
//   //         .children("strong")
//   //         .text()
//   //         .trim();
//   //       // console.log("DATA -", typeof x);
//   //       number = parseInt(
//   //         str.substring(0, str.indexOf("e")).replace(/\s/g, ""),
//   //         10
//   //       );
//   //     });
//   // }

//   for (let i = 0; i < 10; i++) {
//     const article = $(".latest-head")[i].children[0],
//       artObj = {};
//     artObj.id = i + 1;
//     artObj.title = article.children[0].data;
//     artObj.link = `https://www.sciencedaily.com${article.attribs.href}`;
//     jsonTab.push(artObj);
//   }

//   console.log("INSIDE 2 -", jsonTab);

//   let count = 1;

//   for (let i = 1; i <= number / 10; i++) {
//     const urlPerPage =
//       'http://www.lemonde.fr/recherche/?keywords="Rap+"+"hip-hop"+"hip%20hop"+"rappeur"+"rappeurs"+"raps"+"rappers"&page_num=' +
//       i +
//       "&operator=or&exclude_keywords=&qt=recherche_texte_title&author=&period=custom_date&start_day=01&start_month=01&start_year=1970&end_day=20&end_month=09&end_year=2017&sort=asc";

//     request(urlPerPage, (err, response2, html2) => {
//       if (!err) {
//         const $ = cheerio.load(html2);

//         $(".grid_11.omega.resultat").filter(() => {
//           const json = {
//             date: "",
//             title: "",
//             description: "",
//             url: ""
//           };
//           const data = $(this);

//           title = data
//             .children("h3")
//             .children("a")
//             .text()
//             .trim();
//           link =
//             "http://lemonde.fr" +
//             data
//               .children("h3")
//               .children("a")
//               .attr("href")
//               .trim();
//           description = data
//             .children("p")
//             .text()
//             .trim();
//           const dateStr = data.children("span").text();
//           date = dateStr.replace(/.+?(?=\d)/, "");

//           json.title = title;
//           json.url = link;
//           json.description = description;
//           json.date = date;
//           jsonTab.push(json);
//         });
//       } else if (err) {
//         console.log(err);
//       }

//       console.log("INSIDE 2 -", count, jsonTab);

//       count += 1;

//       // Write the file once we iterated through all the pages.
//       if (count === parseInt(number / 10, 10)) {
//         writeFile();
//       }
//     });
//   }
// });

// ------------------------------ TESTING 2 ------------------------------ //

// const fs = require("fs");
// const request = require("request");
// const cheerio = require("cheerio");

// const jsonTab = []; // We create our table

// function writeFile() {
//   // Will write the json file
//   fs.writeFile("output.json", JSON.stringify(jsonTab, null, 4), err => {
//     console.log("File successfully written!");
//   });
// }

// // The URL of the advanced search feature with our keywords
// const url =
//   'http://www.lemonde.fr/recherche/?keywords="Rap+"+"hip-hop"+"hip%20hop"+"rappeur"+"rappeurs"+"raps"+"rappers"&page_num=1&operator=or&exclude_keywords=&qt=recherche_texte_title&author=&period=custom_date&start_day=01&start_month=01&start_year=1970&end_day=20&end_month=09&end_year=2017&sort=asc';

// /* The first request call, our goal here is to get the number of results and then
// to calculate the number of pages */
// request(url, (error, response, html) => {
//   const $ = cheerio.load(html);

//   // All the variables we will use later
//   let number;
//   let description;
//   let date;
//   let title;
//   let link;

//   if (!error) {
//     $(".bg_gris_clair").filter(() => {
//       /* We want to select all the HTML
//       elements with the class ".bg_gris_clair" (and we already know there is
//       only one) */
//       const data = $(this);
//       const str = data
//         .children("strong")
//         .text()
//         .trim();
//       number = parseInt(
//         str.substring(0, str.indexOf("e")).replace(/\s/g, ""),
//         10
//       );
//     });
//   }

//   console.log("INSIDE --", number, jsonTab);

//   let count = 1;

//   for (let i = 1; i <= number / 10; i++) {
//     const urlPerPage =
//       'http://www.lemonde.fr/recherche/?keywords="Rap+"+"hip-hop"+"hip%20hop"+"rappeur"+"rappeurs"+"raps"+"rappers"&page_num=' +
//       i +
//       "&operator=or&exclude_keywords=&qt=recherche_texte_title&author=&period=custom_date&start_day=01&start_month=01&start_year=1970&end_day=20&end_month=09&end_year=2017&sort=asc";

//     request(urlPerPage, (err, response2, html2) => {
//       if (!err) {
//         const $ = cheerio.load(html2);

//         $(".grid_11.omega.resultat").filter(() => {
//           const json = {
//             date: "",
//             title: "",
//             description: "",
//             url: ""
//           };
//           const data = $(this);

//           title = data
//             .children("h3")
//             .children("a")
//             .text()
//             .trim();
//           link =
//             "http://lemonde.fr" +
//             data
//               .children("h3")
//               .children("a")
//               .attr("href")
//               .trim();
//           description = data
//             .children("p")
//             .text()
//             .trim();
//           const dateStr = data.children("span").text();
//           date = dateStr.replace(/.+?(?=\d)/, "");

//           json.title = title;
//           json.url = link;
//           json.description = description;
//           json.date = date;
//           jsonTab.push(json);
//         });
//       } else if (err) {
//         console.log(err);
//       }

//       count += 1;

//       console.log("INSIDE 2 -", count, jsonTab);

//       // Write the file once we iterated through all the pages.
//       if (count === parseInt(number / 10, 10)) {
//         writeFile();
//       }
//     });
//   }
// });
