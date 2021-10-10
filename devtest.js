const axios = require('axios');
const top_pages = require('./index');

async function login() {
  console.log('logging in...')

  const response = await axios.post('https://www.spyfu.com/auth/login', {
    username: 'admin@logicinbound.com',
    password: '65S$OUjE%U2a',
    rememberMe: false,
  });
  const cookies = response.headers['set-cookie'];

  return cookies;
}

async function recentActivity(cookies) {
  console.log(cookies);
  const response = await axios.get('https://www.spyfu.com/NsaApi/Account/GetBillingInfo', {
    headers: {
      Cookie: cookies,
      // Connection: 'keep-alive',
      Referer: 'https://www.spyfu.com/account'
    },
  });
  console.log(response);
}

async function topPages(cookies) {
  console.log('getting top pages');
  const websiteUrl = 'http://www.catchnews.com';
  let domain = 'http://www.catchnews.com';
  const response = await axios.get('https://www.spyfu.com/NsaApi/Serp/GetTopPages', {
    headers: {
      referer: `https://www.spyfu.com/seo/top-pages?query=${encodeURI(websiteUrl)}&startingRow=1`,
      Cookie: cookies,
    },
    params: {
      domain: domain,
      pageSize: 50,
      sortOrder: 'descending',
      sortBy: 'estMonthlySeoClicks',
      filter: '',
      startingRow: '1',
      isOverview: 'false'
    },
  });

  if (response.data.totalPages) {
    console.log(response.data.totalPages)
  } else {
    console.log(response.data);
  }

  return response;

  const raw_pages = response.data.topPages

  let pages = []
  if(raw_pages && raw_pages.length && raw_pages.length > 0){
    for (const page of raw_pages) {
      // skip blank urls if the data is hidden
      if (page.url.length == 0) {
        continue
      }
      pages.push(page)
    }
  }
  console.log(pages)

  console.log(pages.length)
  // console.log(response.body.topPages);

  return response;
}

// topPages();
async function init() {
  let topPages = await top_pages('https://www.hayksaakian.com', {
    username: 'admin@logicinbound.com',
    password: '65S$OUjE%U2a',
  });

  console.log('top pages');
  console.log(topPages)


  // let cookies = await login();
  // // await recentActivity(cookies);
  // let counter = 1;
  // let loop = true;
  // while(loop && counter <= 200) {
  //   try {
  //     topPages(cookies);
  //     counter++;
  //   } catch( error) {
  //     loop = false;
  //   }
  // }
  //
  // console.log(counter)
}

init();

//
// {
//   status: 200,
//     statusText: 'OK',
//   headers: {
//   'cache-control': 'no-cache',
//     pragma: 'no-cache',
//     expires: '-1',
//     vary: 'Accept-Encoding, Origin',
//     server: 'Microsoft-IIS/10.0',
//     'x-powered-by': 'ASP.NET, ASP.NET',
//     'x-aspnet-version': '4.0.30319',
//     date: 'Sat, 09 Oct 2021 06:39:26 GMT',
//     'content-length': '0',
//     connection: 'close'
// },
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//         forcedJSONParsing: true,
//         clarifyTimeoutError: false
//     },
//     adapter: [Function: httpAdapter],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//       xsrfCookieName: 'XSRF-TOKEN',
//       xsrfHeaderName: 'X-XSRF-TOKEN',
//       maxContentLength: -1,
//       maxBodyLength: -1,
//       validateStatus: [Function: validateStatus],
//     headers: {
//       Accept: 'application/json, text/plain, */*',
//         referer: 'https://www.spyfu.com/seo/top-pages?query=http://www.catchnews.com&startingRow=1',
//         Cookie: [Array],
//         'User-Agent': 'axios/0.22.0'
//     },
//     params: {
//       domain: 'http://www.catchnews.com',
//         pageSize: 50,
//         sortOrder: 'descending',
//         sortBy: 'estMonthlySeoClicks',
//         filter: '',
//         startingRow: '1',
//         isOverview: 'false'
//     },
//     method: 'get',
//       url: 'https://www.spyfu.com/NsaApi/Serp/GetTopPages',
//       data: undefined
//   },
//   request: <ref *1> ClientRequest {
//   _events: [Object: null prototype] {
//     abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       prefinish: [Function: requestOnPrefinish]
//   },
//   _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: false,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: false,
//     maxRequestsOnConnectionReached: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: false,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     _contentLength: 0,
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     _closed: false,
//     socket: TLSSocket {
//     _tlsOptions: [Object],
//       _secureEstablished: true,
//       _securePending: false,
//       _newSessionPending: false,
//       _controlReleased: true,
//       secureConnecting: false,
//       _SNICallback: null,
//       servername: 'www.spyfu.com',
//       alpnProtocol: false,
//       authorized: true,
//       authorizationError: null,
//       encrypted: true,
//       _events: [Object: null prototype],
//     _eventsCount: 10,
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'www.spyfu.com',
//       _readableState: [ReadableState],
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: undefined,
//       _server: null,
//       ssl: [TLSWrap],
//       _requestCert: true,
//       _rejectUnauthorized: true,
//       parser: null,
//       _httpMessage: [Circular *1],
//       [Symbol(res)]: [TLSWrap],
//       [Symbol(verified)]: true,
//       [Symbol(pendingSession)]: null,
//       [Symbol(async_id_symbol)]: 401,
//       [Symbol(kHandle)]: [TLSWrap],
//       [Symbol(kSetNoDelay)]: false,
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(connect-options)]: [Object],
//       [Symbol(RequestTimeout)]: undefined
//   },
//   _header: 'GET /NsaApi/Serp/GetTopPages?domain=http:%2F%2Fwww.catchnews.com&pageSize=50&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=false HTTP/1.1\r\n' +
//   'Accept: application/json, text/plain, */*\r\n' +
//   'referer: https://www.spyfu.com/seo/top-pages?query=http://www.catchnews.com&startingRow=1\r\n' +
//   'Cookie: ASP.NET_SessionId=w2k1ahm4rplfahdfoa5iz10m; path=/; HttpOnly; SameSite=Lax; uid=; path=/; .ASPXAUTH=EC9F761964EB519C7A4945AE7CC2CD9A5FBB289C582CD6D7DC3E7BBCABEB2E352D205002CAE50FFBBDB27924325497F4CD87DFE03D984CDF7C8C3A05111B0411739E93A0F8D9BF0A9A5B846126DB2AA401D4F4A6541BD295138F42054D91B7660B5EC57CC8FC334219BDF33681968B643E7B9A6F; domain=.spyfu.com; path=/; HttpOnly; SameSite=Lax; .ASPXAUTH=; expires=Tue, 12-Oct-1999 07:00:00 GMT; path=/; HttpOnly\r\n' +
//   'User-Agent: axios/0.22.0\r\n' +
//   'Host: www.spyfu.com\r\n' +
//   'Connection: close\r\n' +
//   '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: nop],
//   agent: Agent {
//     _events: [Object: null prototype],
//     _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 443,
//       protocol: 'https:',
//       options: [Object: null prototype],
//     requests: [Object: null prototype] {},
//     sockets: [Object: null prototype],
//     freeSockets: [Object: null prototype] {},
//     keepAliveMsecs: 1000,
//       keepAlive: false,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 55,
//       maxCachedSessions: 100,
//       _sessionCache: [Object],
//       [Symbol(kCapture)]: false
//   },
//   socketPath: undefined,
//     method: 'GET',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     path: '/NsaApi/Serp/GetTopPages?domain=http:%2F%2Fwww.catchnews.com&pageSize=50&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=false',
//     _ended: true,
//     res: IncomingMessage {
//     _readableState: [ReadableState],
//       _events: [Object: null prototype],
//     _eventsCount: 3,
//       _maxListeners: undefined,
//       socket: [TLSSocket],
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       rawHeaders: [Array],
//       rawTrailers: [],
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 200,
//       statusMessage: 'OK',
//       client: [TLSSocket],
//       _consuming: false,
//       _dumped: false,
//       req: [Circular *1],
//       responseUrl: 'https://www.spyfu.com/NsaApi/Serp/GetTopPages?domain=http:%2F%2Fwww.catchnews.com&pageSize=50&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=false',
//       redirects: [],
//       [Symbol(kCapture)]: false,
//       [Symbol(kHeaders)]: [Object],
//       [Symbol(kHeadersCount)]: 24,
//       [Symbol(kTrailers)]: null,
//       [Symbol(kTrailersCount)]: 0,
//       [Symbol(RequestTimeout)]: undefined
//   },
//   aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     host: 'www.spyfu.com',
//     protocol: 'https:',
//     _redirectable: Writable {
//     _writableState: [WritableState],
//       _events: [Object: null prototype],
//     _eventsCount: 2,
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 0,
//       _requestBodyBuffers: [],
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'https://www.spyfu.com/NsaApi/Serp/GetTopPages?domain=http:%2F%2Fwww.catchnews.com&pageSize=50&sortOrder=descending&sortBy=estMonthlySeoClicks&filter=&startingRow=1&isOverview=false',
//       [Symbol(kCapture)]: false
//   },
//   [Symbol(kCapture)]: false,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//     accept: [Array],
//       referer: [Array],
//       cookie: [Array],
//       'user-agent': [Array],
//       host: [Array]
//   }
// },
//   data: ''
// }