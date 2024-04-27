const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

//We check for length>3 (more than 3 arguments) because the first command line argument is the 'interpreter' / name of the program (in this case Node) and the second argument is the name of our code file (in this case 'main.js'). The third argument is the URL that we are passing in to the program.
//baseURL refers to the 3rd argument (therefore index[2] which is the URL we provide in the command line)
//The function ends with crawlPage (calling that function from our crawl.js file)

async function main(baseURL) {

  console.log(`Starting crawl of ${baseURL}`);
  //Starting with baseURL, baseURL which is the current URL, and an empty pages object:
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
  // for (const page of Object.entries(pages)){
  //   console.log(page)
  // }
}

module.exports = {
  main
};
