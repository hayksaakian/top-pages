# top-pages
Fetch the most popular pages on a given domain, with options to use various data sources

This package is intended to be used as either
- a module within other libraries (prototype ready)
- a CLI tool (not coded yet)

To use Google Analytics to pull data from your own sites, you must get a keys.json file.

See notes about Google Analytics Integration below

Configure your API keys and credentials in a .env file

# Usage

See test.js for more examples

```javascript
let get_top_pages = require('top-pages')

// load your key file
let ga_keys = require('./keys.json')

// use this inside of an async block of code

// when you supply keys, you can use google analytics data
// without ga keys, the tool relies on competitive analytics tools
// in the future this package will support a variety of libraries
let top_pages = await get_top_pages('https://www.example.com', { ga_keys: ga_keys })

let top_url = Object.keys(top_pages)[0]

let top_url_views = top_pages[top_url]

```

# Google Analytics Integration
Use Google Analytics by placing a keys.json file and loading it.

## Follow this video, up until you get the JSON file

Involves creating a 'service account' with Google

https://www.youtube.com/watch?v=r6cWB0xnOwE

Then sharing access to this account from your analytics admin section

## Remember to enable "Google Analytics Reporting API"

https://console.developers.google.com/apis/api/analyticsreporting.googleapis.com/overview?project=1049178100145


## Quirks

### Pagination

Google Analytics API returns up to 10,000 results per request.

You will have to make additional requests to get more data. 

However, this also means you might not need all the data and it can be achieved in two ways: 
- filtering or 
- limiting the amount of pages.


