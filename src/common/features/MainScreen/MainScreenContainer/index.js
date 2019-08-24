import React, { useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import MainContainer from '../../../components/MainContainer';

const displayModes = { TABLE: 'TABLE', MAP: 'MAP' };

export default () => {
  return <MainContainer title="Pomodoro">Timer</MainContainer>;
};
