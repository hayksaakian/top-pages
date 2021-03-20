// test.js

// input: a root domain
// output:
// list of URL: Users pairs
// scoped to the last 30 days or last month

let ga = require('./google-analytics.js')

async function test_ga(website_url) {
  let top_pages = await ga.get_top_pages(website_url)
  console.log(website_url,'top pages according to Google Analytics:')
  console.log(top_pages)
}
async function test_ga_error() {
  let top_pages = await ga.get_top_pages("https://www.example-of-a-website-we-cannot-access.com/")
  console.log(website_url, 'top pages according to Google Analytics:')
  console.log(top_pages)
}

async function run() {
  await test_ga('https://www.hayksaakian.com')  
  // await test_ga_error()

}

// run tests
run()
