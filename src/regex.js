/**
 * Description: A place to store regex patterns
 * Index: 
 *  regex_smpte_exact
 *  regex_smpte
*/

export const regex_smpte_exact = '(?:(?:[0-1][0-9]|[0-2][0-3]):)(?:[0-5][0-9]:){2}(?:[0-2][0-9])'; //https://gist.github.com/allensarkisyan/5441601
export const regex_smpte = '^(\\d+):(\\d+):(\\d+):(\\d+)$';