const { crawlPage } = require("./crawl.js");
const { getPages } = require("./report.js");



async function main(baseURL) {
  const pages = await crawlPage(baseURL, baseURL, {});
  return getPages(pages);
}

module.exports = {
  main
};
