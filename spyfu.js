const { origin_from_url } = require('./helpers/common');

const got = require('got');

async function get_raw_data(websiteUrl) {
  let domain = origin_from_url(websiteUrl)
  let raw_pages = []
  let pages = []
  try {
    const options = {
      headers: {
        referer: `https://www.spyfu.com/seo/top-pages?query=${encodeURI(websiteUrl)}&startingRow=1`
      },
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
    }
    console.log('request options', options)
    const response = await got('https://www.spyfu.com/NsaApi/Serp/GetTopPages', options)
    console.log(response.body);
    //=> '<!doctype html> ...'
    raw_pages = response.body.topPages
  } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
  }
  if(raw_pages && raw_pages.length && raw_pages.length > 0){
    for (const page of raw_pages) {
      // skip blank urls if the data is hidden
      if (page.url.length == 0) {
        continue
      }
      pages.push(page)
    }
  }
  return pages
}

async function get_top_pages(websiteUrl) {
  let pages = await get_raw_data(websiteUrl)

  let results = []
  if(pages && pages.length && pages.length > 0){
    for (const page of pages) {
      // skip blank urls if the data is hidden
      if(page.url.length == 0){
        continue
      }
      let row = {}
      row[page.url] = page.estMonthlySeoClicks
      results.push(row)
    }
  }

  return results
}

module.exports = {
  get_top_pages,
  get_raw_data
}

/*

ahrefs' data structure:
  {
    url: 'https://www.logicinbound.com/how-do-i-contact-instagram/',
    traffic: '1975',
    keyword: 'help/instagram.com',
    search_volume: '8700'
  },
  {
    url: 'https://www.logicinbound.com/how-do-i-contact-google/',
    traffic: '604',
    keyword: 'how to email google',
    search_volume: '200'
  },


  spyfu structure
  revealed page:
    {
      title: 'How Do I Contact Instagram Support by Phone / Email? IG ...',
      url: 'https://www.logicinbound.com/how-do-i-contact-instagram/',
      estMonthlySeoClicks: 3072,
      estMonthlySeoClicksChange: 0,
      keywordCount: 1482,
      topKeyword: 'instagram help',
      urlId: '-1676162815151235607',
      domainId: '6113370594904075878'
    },
  hidden page:
    {
      title: '',
      url: '',
      estMonthlySeoClicks: 221,
      estMonthlySeoClicksChange: 0,
      keywordCount: 295,
      topKeyword: 'how to download instagram photos on pc',
      urlId: '',
      domainId: ''
    },
*/