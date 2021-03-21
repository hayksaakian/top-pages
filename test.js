// test.js

// input: a root domain
// output:
// list of URL: Users pairs
// scoped to the last 30 days or last month

let ga = require('./google-analytics.js')

async function test_ga(website_url, options={}) {
  let top_pages = await ga.get_top_pages(website_url, options)
  console.log(website_url,'top pages according to Google Analytics:')
  console.log(top_pages)
}
async function test_ga_error() {
  let top_pages = await ga.get_top_pages("https://www.example-of-a-website-we-cannot-access.com/")
  console.log(website_url, 'top pages according to Google Analytics:')
  console.log(top_pages)
}

async function run() {
  // test without a view ID
  // await test_ga('https://www.hayksaakian.com')

  // test WITH a view ID
  // await test_ga('https://www.hayksaakian.com', { 'viewId': '208072427'})

  // test with a view we don't have access to
  // await test_ga_error()

}

// run tests
run()
