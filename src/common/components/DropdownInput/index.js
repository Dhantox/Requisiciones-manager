import React from 'react';
import { Dropdown } from 'semantic-ui-react';

/**
 * function that add the necesary properties to
 * display a react drodopwn component correctly
 * @param {string} keyName
 * @param {string} valueName
 */
export default props => {
  const options = props.options.map(option => {
    option.key = option[props.keyName] || option.id;
    option.value = option[props.keyName] || option.id;
    option.text = option[props.valueName] || option.name;
    return option;
  });
  return <Dropdown {...props} options={options} />;
};
