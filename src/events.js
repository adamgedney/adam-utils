/**
 * Fn Index: 
 *  evt_listen
 *  evt_trigger
*/

/** 
 * Basic event listener hook, callback style
*/
export const evt_listen = (name, cb) => {
    document.addEventListener(name, cb);
};

/**
 * Basic event trigger
 * @param {*} name 
 * @param {*} data 
 */
export const evt_trigger = (name, data={}) => {
  document.dispatchEvent(
      new CustomEvent(name, data)
    );
};