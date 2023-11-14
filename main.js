const { crawlPage } = require('./crawl.js');

//We check for length>3 (more than 3 arguments) because the first command line argument is the 'interpreter' / name of the program (in this case Node) and the second argument is the name of our code file (in this case 'main.js'). The third argument is the URL that we are passing in to the program.
//baseURL refers to the 3rd argument (therefore index[2] which is the URL we provide in the command line)
//The function ends with crawlPage (calling that function from our crawl.js file)

function main() {
  if (process.argv.length < 3) {
    console.log("No URL provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("Too many command line arguments provided");
    process.exit(1);
  }
  const baseURL = process.argv[2];

  console.log(`Starting crawl of ${baseURL}`);
  crawlPage(baseURL)
}

main();
