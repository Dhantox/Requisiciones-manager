import React from 'react';
import { Input } from 'semantic-ui-react';

export default () => {
  return (
    <Input
      className="full-width"
      field
      icon={'search'}
      loading={null}
      placeholder="Buscar..."
    />
  );
};
