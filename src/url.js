/**
 * Fn Index: 
 *  url_set
 *  url_get
 *  url_makeQueryString
 *  url_writeQueryString
 *  url_clearQueryString
 *  url_readQueryString
 *  url_parseParams
 *  url_getParam
 *  url_getPageParams
 *  url_makeObjFromQueryString
 */

export const url_set = path => {
  window.location.href = path;
};

export const url_get = () => window.location.href;

/**
 * Makes a query string from a specifically formatted object
 *        {
 *          date : {
 *           start : 23423429898,
 *           end : 243852437598
 *          },
 *          something : 'A string of some sort',
 *        }
 * @param {*} queryObject 
 */
export const url_makeQueryString = queryObject => {

  // Remove anything with a null value
  // Handles single values and range values
  Object.keys(queryObject).forEach((key) => (queryObject[key] == null
    || ((queryObject[key].hasOwnProperty('start') && queryObject[key].hasOwnProperty('end'))
      && (queryObject[key].start == null && queryObject[key].end == null)))
    && delete queryObject[key]);

  let queryString = _.map(queryObject, (v, k) => {
    let attribute = k,
      value = v,
      tmp_query = '';

    // Handle array values by using key name as attribute and each value separately
    if (_.isArray(value)) {
      value.forEach(val => {
        tmp_query = `${tmp_query}&${attribute}=${val}`;
      });
    } else if (value.hasOwnProperty('start') && value.hasOwnProperty('end')) {
      tmp_query = `${attribute}--start=${value.start}&${attribute}--end=${value.end}`;
    } else {
      tmp_query = `${attribute}=${value}`;
    }

    return tmp_query;
  })
    .reduce((sum, query) => {

      //Handle missing &
      if (query.charAt(0) !== '&') {
        query = '&' + query;
      }

      // Combine query strings
      return sum + query;
    }, '');

  // Handle the ? character at the beginning of the string
  if (queryString.charAt(0) === '&') {
    queryString = queryString.replace(/^&/, '?');
  } else if (queryString.charAt(0) !== '&' || queryString.charAt(0) !== '?') {
    queryString = '?' + queryString;
  }

  return queryString;
};

/**
 * Writes the query string to the url
 * @param queryString
 * @param options
 * @private
 */
export const url_writeQueryString = queryString => {
  // @todo add url_encode and base^4 encode and decode to the write system
  // Only allow if the config file specifies
  if (options.writeQueryStringToURL && (queryString || queryString === null)) {
    const path = window.location.href.split('?')[0].split(window.location.host)[1];

    if (queryString === null) { queryString = ''; }

    let replaceURL = (path + queryString + '&' + url_getPageParams()).replace(/&+$/, "");

    if (options.clearPaginationQueryString) {
      replaceURL = path + queryString;
    }

    url_set(replaceURL);
  }
};

/**
 * Removes everything from the url
 */
export const url_clearQueryString = () => {
  url_set(
    window.location.href
      .split('?')[0]
      .split(window.location.host)[1]
      .replace(/&+$/, "")
  );
};

/**
 * Reads the query string from a url
 */
export const url_readQueryString = () => window.location.href.split('?')[1] || '';

/**
 * From: http://stackoverflow.com/questions/23481979/function-to-convert-url-hash-parameters-into-object-key-value-pairs
 * @param str
 * @returns {{}}
 */
export const url_parseParams = (str = '') => {
  var pieces = str.split("&"), data = {}, i, parts;
  // process each query pair
  for (i = 0; i < pieces.length; i++) {
    parts = pieces[i].split("=");
    if (parts.length < 2) {
      parts.push("");
    }
    data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return data;
};

/**
 * Fetches 
 * @returns {string}
 */
export const url_getParam = (param) => {
  const tmpParams = url_parseParams(url_readQueryString());
  const params = tmpParams.hasOwnProperty(param) ? tmpParams[param] : {};
  let str = '';

  for (let key in params) {
    str += `${key}=${params[key]}&`
  }

  return url_parseParams(str.slice(0, -1))[param];
};

/**
 * Gets the pagination query params from the url to preserve them on write
 */
export const url_getPageParams = (skip = "skip", take = "take", page = "page") => {
  const params = _.pick(url_parseParams(url_readQueryString()), [skip, take, page]);
  let str = '';

  for (let key in params) {
    str += `${key}=${params[key]}&`
  }

  return str.slice(0, -1);// removes the last ampersand
  //return params;
};

/**
 * Converts a query string to a query object.
 * @param str
 */
export const url_makeObjFromQueryString = str => {
  let queryString = decodeURI(str).split("&"),
    queryParams = {},
    segment, value, key;

  for (var i = 0; i < queryString.length; i++) {
    segment = queryString[i].split('=');
    key = segment[0];
    value = (segment[1] && segment[1].charAt(0) === '[')
      ? decodeURIComponent(segment[1])
      : segment[1];

    // Handle sort params nested object
    if (key && key.indexOf('sort-') > -1) {
      if (!queryParams.hasOwnProperty('sort')) {
        queryParams.sort = {};
      }

      queryParams.sort[key.split('sort-')[1]] = value;

    } else {//Filter params

      if (key && queryParams.hasOwnProperty(key)) {
        if (_.isArray(queryParams[key])) {
          queryParams[key].push(value);// Add the new value
        } else {
          queryParams[key] = [queryParams[key]];// Extract the string value and transform to an array
          queryParams[key].push(value);//Add the new value
        }
      } else {
        if (key) {
          queryParams[key] = value;// First run, add the string
        }
      }
    }
  }

  return queryParams;
}