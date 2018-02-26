/**
 * Fn Index: 
 *  string_capFirstLetter
 *  string_validate
*/

/**
 * Just captializes the first letter of a string
 * @param string
 * @returns {string}
 */
export const string_capFirstLetter = string =>
  string
    .charAt(0)
    .toUpperCase()
  + string.slice(1);

/**
 * Validates a string against a regex pattern
 * @param str
 * @param regEx
 * @returns {boolean}
 */
export const string_validate = (str, regEx) => {
  const patt = new RegExp(regEx);

  return patt.test(str);
};