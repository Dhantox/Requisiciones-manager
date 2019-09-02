import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

const PomodoroButton = ({ pomodoroState }) => {
  const dispatch = useDispatch();
  let button = {
    text: '',
    action: {}
  };
  switch (pomodoroState) {
    case 'awaiting_pomodoro':
      button = {
        text: 'Start Pomodoro',
        action: 'start_pomodoro'
      };
      break;
    case 'awaiting_break':
      button = {
        text: 'Break',
        action: 'start_break'
      };
      break;
    case 'pomodoro_started':
      button = {
        text: 'Cancel Pomodoro',
        action: 'cancel_pomodoro'
      };
      break;
    case 'break_started':
      button = {
        text: 'Cancel Break',
        action: 'cancel_break'
      };
      break;
    default:
      break;
  }
  return (
    <Button onClick={() => dispatch({ type: button.action })}>
      {button.text}
    </Button>
  );
};

export default PomodoroButton;
