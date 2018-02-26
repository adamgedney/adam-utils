/**
 * Fn Index: 
 *  date_humanToUTC
 *  date_MMddYYYY
 *  date_yyyymmdd
 * date_ddMonthyyTime
 */

export const date_humanToUTC = dt => Date.parse(dt);

/**
* Converts date string to MM/dd/YYYY string format
* @param dt
* @param separator
*/
export const date_MMddYYYY = (dt, separator = "/") => { //TODO clean this function up
  let date = new Date(dt);

  if (isNaN(date.getTime())) {
    date = new Date(parseInt(dt));
  }
  try {
    let day = date.getUTCDate().toString();
    let month = (date.getUTCMonth() + 1).toString();
    // Months use 0 index.

    let dateString = (month[1] ? month : '0' + month[0]) + separator +
      (day[1] ? day : '0' + day[0]) + separator +
      date.getUTCFullYear();
    //@todo fix TBD hack
    if (isNaN(Date.parse(dateString)))
      return "TBD";
    else return dateString;
  } catch (e) {
    console.log(e);
    return "TBD";
  }
};

/**
	 * Converts date string to yyyy/mm/dd string format
	 * @param dt
	 * @param separator
	 */
export const date_yyyymmdd = (dt, separator = "/") => { //TODO clean this function up
  let date = new Date(dt);

  if (isNaN(date.getTime())) {
    date = new Date(parseInt(dt));
  }

  try {
    let day = date.getUTCDate().toString();
    let month = (date.getUTCMonth() + 1).toString();
    // Months use 0 index.

    return date.getUTCFullYear() + separator + (month[1] ? month : '0' + month[0]) + separator +
      (day[1] ? day : '0' + day[0]);
  } catch (e) {}
};


/**
	 * Converts date string to ddMonthyyTime
	 * @param UNIX_timestamp
	 */
  export const date_ddMonthyyTime = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`;
  };