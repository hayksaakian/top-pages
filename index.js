// index.js

async function top_pages(url, options={}) {
  let spyfu = require('./spyfu.js')
  let google_analytics = require('./google-analytics.js')
  let pages = []
  // try GA first. TODO: cache this.
  try {
    pages = await ga.get_top_pages(website_url, options)    
  } catch (error) {
    console.log(error)
  }
  if(pages.length > 0){
    return pages
  }
  // if we get nothing from GA, try spyfu
  pages = await spyfu.get_top_pages(website_url)
  return pages
}


module.exports = top_pages