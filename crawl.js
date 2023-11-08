//So we can use the JSDOM package:
const { JSDOM } = require("jsdom");

//Function to find URLs in the HTML of a page, and return an array of strings representing these URLs.
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative URL
      urls.push(`${baseURL}${linkElement.href}`);
    } else {
      //absolute URL
      urls.push(linkElement.href);
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
};
