const URL = require("url").URL;
const psl = require('psl')
const moment = require('moment');
function hostname_from_url(url) {
  // NOTE: I'm not surewhy I ever got this psl module ...
  // LATER NOTE: ingest_amazon_links only works if we use PSL -- i forget why
  return psl.get(new URL(url).hostname)
  // return new URL(url).hostname
}

function origin_from_url(url) {
  // need a way to handle this if we already specified a domain to begin with
  if (url.toLowerCase().indexOf('http') == 0) {
    // if url starts with http
    return new URL(url).origin
  }
  // assuming you specified a domain if it doesn't start with http
  return url
}

function trim_non_alphanumeric(str) {
  return str.replace(/[^a-zA-Z0-9]$/, '');
}

function formatDate(date) {
  if (date) {
    return moment(date).format('L hh:mm a')
  } else {
    return '';
  }
}

module.exports = {
  hostname_from_url,
  origin_from_url,
  trim_non_alphanumeric,
  formatDate
}