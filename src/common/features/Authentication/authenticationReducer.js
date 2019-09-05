const initialState = {
  isAuthenticated: true
};

const authenticationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    default:
      return state;
  }
};

export default authenticationReducer;
