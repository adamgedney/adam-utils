/**
 * Fn Index: 
 *  slug_unmake
 *  slug_make
*/

/**
 * Unmakes a slug into a capitalized, readable string
 * @param slug
 * @returns {1828|string}
 */
export const slug_unmake = slug => {
  let s = slug.split('-'),
    capStr = '';

  // Uppercase first letter
  s.forEach(val => {
    capStr += val[0].toUpperCase() + val.slice(1) + ' ';
  });

  return capStr.trim();
};

/**
 * https://gist.github.com/mathewbyrne/1280286
 * @param {*} text 
 */
export const slug_make = text => text.toString().toLowerCase()
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '')             // Trim - from start of text
  .replace(/-+$/, '');            // Trim - from end of text