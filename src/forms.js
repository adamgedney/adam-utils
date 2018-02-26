/**
 * Fn Index: 
 *  form_parse
*/

/**
 * Given a form element, its values get parsed and converted to an object.
 * @todo need to build in  dot syntax element name handling, creating multidimensional objects
 */
export const form_parse = formClassName => {
  const form = document.querySelector(`.${formClassName}`);
  if (!form) { return false; }

  const elements = form.elements;

  return [].reduce.call(elements, (data, element) => {
    if (element.name) {
      data[element.name] = element.value;
    }

    return data;
  }, {});
};