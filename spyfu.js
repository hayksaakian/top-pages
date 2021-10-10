const { origin_from_url } = require('./helpers/common');
const axios = require('axios');

const got = require('got');

async function login({username, password}) {
  console.log('logging in to spyfu...')

  const response = await axios.post('https://www.spyfu.com/auth/login', {
    username: 'admin@logicinbound.com',
    password: '65S$OUjE%U2a',
    rememberMe: false,
  });
  const cookies = response.headers['set-cookie'];

  return cookies;
}

async function get_top_pages_from_spyfu(websiteUrl, config = {}) {
  console.log('getting top pages from spyfu...');
  let pageSize = config.pageSize ? config.pageSize : 50;
  let startingRow = config.startingRow ? config.startingRow : 1;

  let headers = {
    referer: `https://www.spyfu.com/seo/top-pages?query=${encodeURI(websiteUrl)}&startingRow=${startingRow}`
  }

  if (config.cookies) {
    headers.Cookie = config.cookies;
  }

  const response = await axios.get('https://www.spyfu.com/NsaApi/Serp/GetTopPages', {
    headers: headers,
    params: {
      domain: websiteUrl,
      pageSize: pageSize,
      sortOrder: 'descending',
      sortBy: 'estMonthlySeoClicks',
      filter: '',
      startingRow: '1',
      isOverview: 'false'
    },
  });

  return response.data;
}

async function get_raw_data(websiteUrl, config = {}) {
  let domain = origin_from_url(websiteUrl)
  let raw_pages = []
  try {
    let cookies = null;
    if (config.username && config.password) {
      cookies = await login(config)
    }

    // TODO: specify pageSize and row
    let responseData = await get_top_pages_from_spyfu(domain, {
      cookies,
    });

    raw_pages = responseData.topPages
  } catch (error) {
    console.log(error);
  }

  return raw_pages.filter(o => {
    // filter blank urls
    return o.url.length > 0;
  });
}

async function get_top_pages(websiteUrl, config = {}) {
  let pages = await get_raw_data(websiteUrl, config)


  return pages.reduce((acc, value) => {
    let url = value.url;

    if (!acc[url]) {
      acc[url] = value.estMonthlySeoClicks;
    } else {
      acc[url] += value.estMonthlySeoClicks;
    }

    return acc;
  }, {});
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