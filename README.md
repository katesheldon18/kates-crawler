Instructions: to start the crawl use 'npm start https:www.examplewebsite.com' and the crawl will begin. URLs will log in the terminal as the crawl goes.


For this project I created a link-to-link web crawler using Node.js with the help of a tutorial on youtube. This involved:
  - Wrote functions to normalise URL structure of links (root domain vs path-only, http protocol, trailing slash)
  - Wrote an asynchronous function to fetch the HTML of a given page
  - Discover all the links within that HTML, and return these links as an array
  - Iterate through the array, check if each link in the array has already been crawled. If yes, increment a counter that keeps track of all the incoming internal links. If no, add that link to the queue to be crawled.


How it works:
- As the crawl runs it console logs a list of all links crawled
- At the end you will get a list of all links crawled, and how many internal links point to each
- Messages will appear in the terminal as the crawl begins, and error messages will show up if the URL is invalid


Files in this project:
- crawl.js is where most of the functionality is
- main.js checks if the starting URL that was provided is valid, and console logs a message
- report.js provides the report output and formats it as a list
- Any 'test' file was used to write tests using JEST to check each function
