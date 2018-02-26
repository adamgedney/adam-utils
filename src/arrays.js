/**
 * Fn Index: 
 *  array_toCSV
*/

/**
 * Format array to comma separated string
 * @param {array} array 
 */
export const array_toCSV = array => {
  if (array.length) {
    let str = "";
    array.forEach((t, i) => {
      if (array.length - 1 !== i) str += `${t}, `;
      else str += t;
    });

    return str;
  } else return "N/A";
};