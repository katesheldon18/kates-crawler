//Imports the 'normalizeURL' function from our crawl.js file:
const { normalizeURL } = require("./crawl.js");

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
