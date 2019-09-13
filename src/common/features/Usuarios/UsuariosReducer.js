const initialState = {
  usuarios: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CARGAR_USUARIOS_SUCCESS':
      return { ...state, usuarios: payload };

    default:
      return state;
  }
};
