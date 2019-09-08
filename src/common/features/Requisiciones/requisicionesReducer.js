const initialState = {
  requisiciones: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CARGAR_REQUISICIONES_SUCCESS':
      return { ...state, requisiciones: payload };

    default:
      return state;
  }
};
