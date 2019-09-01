const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_PROJECT':
      return { ...state, ...payload };

    default:
      return state;
  }
};
