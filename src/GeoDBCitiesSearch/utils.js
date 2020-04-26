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

  const HOST = key ? DEFAULT_HOST : FREE_END_POINT;
  const queryParams = buildParams(params, namePrefix);

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

const printableNumber = num => (num < 0 ? "" : "+") + num;

const parseLocation = location => {
    const { lat, lng } = location;
    return `${printableNumber(lat)}${printableNumber(lng)}`
};

export async function geocoder(location, key) {
  const locationId = parseLocation(location);
  const HOST = key ? DEFAULT_HOST : FREE_END_POINT;
  const url = `https://${HOST}/v1/geo/locations/${locationId}/nearbyCities?limit=1&radius=100`;
  const headers = {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": key
  };
  const response = await fetch(url, {
    method: 'GET',
    headers
  });
  let json = await response.json();
  const { data, errors } = json;
  if (errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
}
