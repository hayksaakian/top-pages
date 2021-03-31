const { origin_from_url } = require('./helpers/common');

const { google } = require('googleapis');

const scopes = 'https://www.googleapis.com/auth/analytics.readonly';

let jwt;
//  = new google.auth.JWT(gaKeys.client_email, null, gaKeys.private_key, scopes)

async function set_jwt(ga_keys) {
  jwt = new google.auth.JWT(ga_keys.client_email, null, ga_keys.private_key, scopes)
}

async function get_profile_list() {
  let profiles = []
  try {
    await jwt.authorize()
    const result = await google.analytics('v3').management.profiles.list({
      'auth': jwt,
      accountId: '~all',
      webPropertyId: '~all'
    })

    profiles = result.data.items;
  } catch (error) {
    console.log('Error fetching profile list from GA')
    console.log(error)
  }
  return profiles
}

async function validate_view_id(viewId) {

  try {
    await jwt.authorize()
    const result = await google.analytics('v3').management.profiles.list({
      'auth': jwt,
      accountId: '~all',
      webPropertyId: '~all'
    })

    const profiles = result.data.items;

    for (const profile of profiles) {
      if (viewId == profile.id) {
        return true;
      }
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function get_top_pages(websiteUrl, options={}) {
  if (!jwt && options.ga_keys) {
    await set_jwt(options.ga_keys)
  }
  let viewId = options['viewId'] || null
  if(!viewId){
    // note: this is a data security issue if you have a multi user application
    // your one set of keys has access to all views from all users who have shared
    // their data with your ID
    // user A could specify a website owned by user B
    // and gain access to their data
    // consider doing this validation earlier in the call stack
    let profiles = await get_profile_list()
    let origin = origin_from_url(websiteUrl)
    for (const profile of profiles) {
      console.log('website url is:', profile.websiteUrl)
      // todo: trim these to origin and take the first one that works
      if (origin == origin_from_url(profile.websiteUrl)) {
        viewId = profile.id
        break
      }
    }
  }
  if(!viewId){
    // throw an error since we can't get any data without a view ID
    console.warn(`No View ID specified, and no View ID found for website URL: ${websiteUrl}`)
    return []
  }

  await jwt.authorize()
  const result = await google.analytics('v3').data.ga.get({
    'auth': jwt,
    'ids': 'ga:' + viewId,
    'start-date': '30daysAgo',
    'end-date': 'today',
    'metrics': 'ga:users',
    'dimensions': 'ga:pagePath'
  });

  const rows = result.data.rows;
  if (rows) {
    const websiteOrigin = origin_from_url(websiteUrl);

    rows.sort((a, b) => b[1] - a[1])

    return rows.reduce((acc, value) => {
      let key = websiteOrigin + value[0];
      if (!acc[key]) {
        acc[key] = parseInt(value[1] || 0);
      } else {
        acc[key] += parseInt(value[1] || 0);
      }

      return acc;
    }, {});
  } else {
    return [];
  }
}

module.exports = {
  get_top_pages,
  validate_view_id,
  set_jwt
}