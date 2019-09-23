const initialState = {
  isAuthenticated: false,
  loading: false,
  user: '',
  first_name: ''
};

const authenticationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'LOADING':
      return { ...state, loading: true };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authenticationReducer;
