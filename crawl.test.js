//Imports our functions from our crawl.js file so we can test them:
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

//Imports the 'test' and 'expect' functions from Jest:
const { test, expect } = require("@jest/globals");

//Writing our base test with Jest, using the inbuilt 'test' function.
//This uses the 'expect' function to do the test, comparing expected output vs actual output.
// test("normalizeURL", () => {
//   const input = "";
//   const actual = normalizeURL(input);
//   const expected = "";
//   expect(actual).toEqual(expected);
// });

//Because Jest is specified in our JSON file as a script, we can just type 'npm test' in terminal to run the test.

//Test to remove the protocol from a URL, to avoid duplicates when crawling
test("normalizeURL strip protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

//Test to make sure trailing slash is trimmed, to avoid duplicate crawls
test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

//Test to make sure the function gets the href from the HTML and appends it to our array:
test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/">
        Boot.dev Blog 
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

//Testing as above, but to also include relative URL paths as well as absolute paths:
test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
        Boot.dev Blog 
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

//Testing for when there are multiple URLs in the HTML, using BOTH relative & absolute paths:
test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path1/">
        Boot.dev Blog Path One
      </a>
      <a href="/path2/">
        Boot.dev Blog Path Two
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

//Test to deal with invalid URLs:
test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">
        Invalid URL 
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
