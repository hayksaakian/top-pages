const { origin_from_url } = require('./helpers/common');

const got = require('got');

async function get_top_pages(websiteUrl) {
  let domain = origin_from_url(websiteUrl)
  let pages = []
  try {
    const response = await got('https://www.spyfu.com/NsaApi/Serp/GetTopPages', {
      searchParams: {
        domain: domain,
        pageSize: 20,
        sortOrder: 'descending',
        sortBy: 'estMonthlySeoClicks',
        filter: '',
        startingRow: '1',
        isOverview: 'false'
      },
      responseType: 'json'
    })
    // console.log(response.body);
    //=> '<!doctype html> ...'
    pages = response.body.topPages
  } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
  }

  let results = []

  for (const page of pages) {
    // skip blank urls if the data is hidden
    if(page.url.length == 0){
      continue
    }
    let row = {}
    row[page.url] = page.estMonthlySeoClicks
    results.push(row)
  }

  return results
}

module.exports = {
  get_top_pages
}