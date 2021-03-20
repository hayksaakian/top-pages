# top-pages
Fetch the most popular pages on a given domain, with options to use various data sources

This package is intended to be used as either
- a CLI tool
- a module within other libraries

Configure your API keys and credentials in a .env file

# Google Analytics Integration
Use Google Analytics by placing a keys.json file within the root directory

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


