/**
 * Fn Index: 
 *  async_waitForVar
*/

/**
 * Waits for a var to be available.
 * Defaults optional timeout to 10 sec.
 * Usage:
 * async_waitForVar(() => myVarToTest, () => {
 *  // THis is the resume callback. It runs once the var is no longer undefined
 * }, 10000, 250);
 */
export const async_waitForVar = (
  tryVar = () => false,
  resume = () => { },
  timeout = 5000,
  rate = 250
) => {
  let elapsedTime = 0;
  const varCheck = setInterval(function () {
    if (typeof tryVar() !== 'undefined') {
      clearInterval(varCheck);
      resume();
    } else {
      if (elapsedTime >= timeout) {
        // Resume anyway so we don't hang the interface. 
        // Let undefined be handled by the caller
        clearInterval(varCheck);
        resume();
      } else {
        elapsedTime = elapsedTime + rate;
      }
    }
  }, rate);
};