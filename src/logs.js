/**
 * Fn Index: 
 *  log
 *  l
*/
 
/** 
 * This shorthand will only log on localhost
*/
export const log = window.location.hostname === "localhost" ? console.log : () => {};

export const l = log;

