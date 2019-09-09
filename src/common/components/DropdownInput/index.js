import React from 'react';
import { Form } from 'semantic-ui-react';

/**
 * function that add the necesary properties to
 * display a react drodopwn component correctly
 * @param {string} keyName
 * @param {string} valuename
 */
export default props => {
  let options = null;
  if (props.options) {
    options = props.options.map(option => {
      option.key = option[props.keyName] || option.id;
      option.value = option[props.keyName] || option.id;
      option.text = option[props.valuename] || option.name;
      return option;
    });
  }
  return <Form.Dropdown {...props} options={options} />;
};
