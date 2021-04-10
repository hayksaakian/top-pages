// test.js

// input: a root domain
// output:
// list of URL: Users pairs
// scoped to the last 30 days or last month

let ga_keys = require('./keys.json')

let ga = require('./google-analytics.js')
let tp = require('./index.js')
let spyfu = require('./spyfu.js')

async function test_ga(website_url, options={}) {
  let top_pages = await ga.get_top_pages(website_url, options)
  console.log(website_url,'top pages according to Google Analytics:')
  console.log(top_pages)
}
async function test_ga_error() {
  let website_url = "https://www.example-of-a-website-we-cannot-access.com/"
  let top_pages = await ga.get_top_pages(website_url, { ga_keys: ga_keys })
  console.log(website_url, 'top pages according to Google Analytics:')
  console.log(top_pages)
}

async function test_spyfu(website_url) {
  let top_pages = await spyfu.get_top_pages(website_url)
  console.log(website_url, 'top pages according to Spyfu:')
  console.log(top_pages)
  
}

async function test_tp(website_url, options={}) {
  options.ga_keys = ga_keys
  let top_pages = await tp(website_url, options)
  console.log(website_url, 'top pages, GA Keys loaded')
  console.log(top_pages)
}

async function test_tp_no_ga_keys(website_url) {
  let top_pages = await tp(website_url)
  console.log(website_url, 'top pages without GA Keys')
  console.log(top_pages)
}

async function run() {
  // test without a view ID
  await test_ga('https://www.hayksaakian.com', { ga_keys: ga_keys })

  // test WITH a view ID
  await test_ga('https://www.hayksaakian.com', { 'viewId': '208072427', ga_keys: ga_keys})

  // test with a view we don't have access to
  await test_ga_error()

  await test_spyfu('https://ryanknorrlawncare.com/simplelawnguide/')

  // test with existing GA access, specifying a view
  await test_tp('https://www.hayksaakian.com', { 'viewId': '208072427', ga_keys: ga_keys })

  // test with existing GA access, not specifying a view
  await test_tp('https://www.hayksaakian.com', { ga_keys: ga_keys })

  // test with no GA access
  await test_tp('https://www.example.com')

  // test with no GA access, without supplying keys
  await test_tp_no_ga_keys('https://www.example.com')

  // test nonexistant website, with no GA access, without supplying keys
  await test_tp_no_ga_keys('https://www.exampleofnonexistantwebsitedomain.com')

  // test without HTTPs
  await test_tp_no_ga_keys('example.com')
}

// run tests
run()
