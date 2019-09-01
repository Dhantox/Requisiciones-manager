const initialState = {
  selectedProject: {},
  status: 'awaiting_pomodoro',
  pomodoroDuration: 1,
  start: null,
  end: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'start_pomodoro':
      return { ...state, status: 'pomodoro_started' };
    case 'cancel_pomodoro':
      return { ...state, status: 'awaiting_pomodoro' };
    case 'start_break':
      return { ...state, status: 'break_started' };
    case 'cancel_break':
      return { ...state, status: 'awaiting_pomodoro' };

    default:
      return state;
  }
};
