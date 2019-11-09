import {
  VERSION,
  API,
  DEFAULT_HOST,
  FREE_END_POINT
} from './env';

export function buildURL(query, params, namePrefix) {
  const {
    key,
    version=VERSION,
    api=API,
    types='cities',
  } = query;

  const queryParams = buildParams(params, namePrefix);

  const HOST = key ? DEFAULT_HOST : FREE_END_POINT;
  const PROTOCOL = key ? 'https' : 'http';
  const url = `${PROTOCOL}://${HOST}/${version}/${api}/${types}?${queryParams}`;
  return url;
}

function buildParams(params, namePrefix) {
  // const {
  //   limit=10,
  //   languageCode="en",
  //   countryIds,
  //   includeDeleted,
  //   minPopulation,
  //   location,
  //   radius,
  //   distanceUnit,
  //   offset,
  //   excludedCountryIds,
  //   sort,
  //   timeZoneIds,
  //   asciiMode,
  //   hateoasMode,
  //   types
  // } = params;
  let query = `namePrefix=${namePrefix}`;
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value) query += `&${key}=${value}`;
  });
  return query;
}