import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const AccessContainer = ({ access, children }) => {
  const group = useSelector(store => store.authenticationReducer.user.group);
  const componentToRender = null;
  let isAuthorized;
  try {
    isAuthorized = access.find(
      authorizedGroup => authorizedGroup.toLowerCase() === group.toLowerCase()
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
