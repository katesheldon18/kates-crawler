//Function to parse a URL string into a URL object, and return hostname + pathname as a string.
//Using the slice method to determine if there is a trailing slash on a URL, we want to exclude that slash when we return the URL.
function normalizeURL(urlString) {
  const urlObj = new URL(urlString)
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1)
  } else {
    return hostPath
  }
}

// Makes the 'normalizeURL' function available to other JS files that want to import it:
module.exports = {
    normalizeURL
}