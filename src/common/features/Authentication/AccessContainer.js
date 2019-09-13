import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const AccessContainer = ({ access, children }) => {
  let group = useSelector(store => store.authenticationReducer.user.group);
  group = group ? group.toLowerCase() : group;
  let isAuthorized;
  try {
    isAuthorized = access.find(
      authorizedGroup => authorizedGroup.toLowerCase() === group
    );
  } catch (e) {
    console.error('Debes especificar el atributo access', e);
  }
  return <>{isAuthorized ? children : null}</>;
};

AccessContainer.propTypes = {
  children: PropTypes.element.isRequired,
  access: PropTypes.array.isRequired
};

export default AccessContainer;
