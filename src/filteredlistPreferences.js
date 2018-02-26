/**
 * Fn Index: 
 *  prefs_merge
 *  prefs_createInitial
*/

/**
 * Curried : Combines existing localStored preferences with the incoming changes
 * @param {*} lsPrefs 
 */
export const prefs_merge = lsPrefs => {
  return (prop, checked, viewId) => {
    // Check if the view exists yet in the stored preferences
    const hasViewPref = lsPrefs.filter(view => view && view.view === viewId).length > 0;

    if (hasViewPref) {
      lsPrefs = lsPrefs.map(view => {

        // The view exists, merge props
        if (viewId === view.view) {
          let props = view.data.props || [];
          /**
           * pref.data.props[] needs to be checked if the current key is 
           * already there, then updated or else push the current key into the 
           * array & return the new prefs object 
           */
          if (_.findWhere(props, { key: prop })) {
            props = props.map(prefProp => prefProp.key === prop ? { ...prefProp, ...{ display: checked } } : prefProp);
          } else {
            props.push({
              key: prop,
              display: checked
            });
          }
          view.data.props = props;
        }

        return view;
      });
    } else {
      // This creates the new view's props being added
      lsPrefs.push({
        view: viewId,
        data: {
          props: [
            {
              key: prop,
              display: checked
            }
          ]
        }
      });
    }

    return lsPrefs;
  }
}

/**
 * Curried : Structures the initial props localstorage item
 * @param {*} selectedView 
 */
export const prefs_createInitial = selectedView => {
  return (prop, checked) => {
    return [{
      view: selectedView.id,
      data: {
        props: selectedView.props
          .map(viewProp => viewProp.key === prop
            ? { ...viewProp, ...{ display: checked } }
            : viewProp
          )
      }
    }]
  }
}