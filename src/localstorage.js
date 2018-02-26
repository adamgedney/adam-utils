/**
 * Fn Index: 
 *  storage_getItem
 *  storage_setItem
*/

/**
 * Utility fn for getting localstorage data & try/catching it
 * getLocalStoreItem("oh.prefs.props")
 */
export const storage_getItem = key => {
  let item = localStorage.getItem(key);

  if (item) {
    try {
      item = JSON.parse(item);
    } catch (e) {
      item = false;
    }
  }

  return item;
};

/**
 * Sets the storage item after JSON.stringifying it
 * @param {*} key 
 * @param {*} data 
 */
export const storage_setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
} 