/**
 * Fn Index: 
 *  obj_dotToLiteral
 *  obj_deepMerge
 *  obj_createDeepFromDotNames
*/

/**
 * Return a string property accessor value to the actual object value
 * @param str
 * @param obj
 */
export const obj_dotToLiteral = (str, obj) => str.split('.').reduce((o, i) => o ? o[i] : {}, obj);

/**
	 * Merge nested objects:
	 * Source: https://github.com/jashkenas/underscore/issues/88
	 * @param target
	 * @param source
	 * @returns {*}
	 */
export const obj_deepMerge = (target, source) => {
  for (let key in source) {
    let original = target[key];
    let next = source[key];
    if (original && next && typeof next == "object") {
      appUtils.deepMerge(original, next);
    } else {
      target[key] = next;
    }
  }
  return target;
};

/** 
 * Converts an object using dot syntax property names to a deep object.
 * Created by Maikel, 10.23.17
 * ie. 
 *  { "parent.child.grand" : "test val"} becomes
 *  {
 *    parent : {
 *      child : {
 *        grand : "test val"
 *      }
 *    }
 *  }
*/
export const obj_createDeepFromDotNames = obj => {
  const finalObj = {};

  Object.keys(obj).forEach(key => {
    let tmpObj = finalObj;
    let lastPart = '';
    const keyParts = key.split('.');

    for(let i = 0; i < keyParts.length -1; i++){
      const currentPart = keyParts[i];
      if(!tmpObj[currentPart]){
        tmpObj[currentPart] = {};
      }
      tmpObj = tmpObj[currentPart];
    }
    tmpObj[keyParts[keyParts.length - 1]] = obj[key]
  }
  )
  return finalObj;
};