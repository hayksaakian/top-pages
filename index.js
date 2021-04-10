// index.js
let google_analytics = require('./google-analytics.js')

async function top_pages(url, options={}) {
  let spyfu = require('./spyfu.js')
  let pages = []
  if(options.ga_keys){
    // try GA first. TODO: cache this.
    try {
      pages = await google_analytics.get_top_pages(url, options)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log('pages.length is ', Object.keys(pages).length)
  if(Object.keys(pages).length > 0){
    return pages
  }
  // if we get nothing from GA, try spyfu
  pages = await spyfu.get_top_pages(url)
  return pages
}


module.exports = top_pages