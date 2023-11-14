//So we can use the JSDOM package:
const { JSDOM } = require("jsdom");

//3rd function: an async function, to take in a current URL then makes a fetch request to that URL (the resp part), to get back the HTML
//Update to the crawlPage function: take 3 arguments. baseURL, currentURL, and pages object. To crawl a full site. 'pages' keeps track of all crawled pages.
async function crawlPage(baseURL, currentURL, pages) {
  //Making sure we only crawl on our desired root domain, no external links:
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  //Checking if we already crawled this page, and if so, increment the count so we can measure number of internal links:
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`Actively crawling ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Status code ${resp.status} on page ${currentURL}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non-HTML response: ${contentType} on page ${currentURL}`
      );
      return pages;
    }
    const htmlBody = await resp.text();
    //Extract the links from the HTML:
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    //Recursively crawl all the links, and update our pages object:
    //Recursive function means it crawls itself
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
  }
  return pages;
}

//Function to find URLs in the HTML of a page, and return an array of strings representing these URLs.
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative URL
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      //absolute URL
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

//Function to parse a URL string into a URL object, and return hostname + pathname as a string.
//Using the slice method to determine if there is a trailing slash on a URL, we want to exclude that slash when we return the URL.
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  } else {
    return hostPath;
  }
}

// Makes these functions available to other JS files that want to import and use them:
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
