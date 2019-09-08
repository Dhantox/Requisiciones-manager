const initialState = {
  requisiciones: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CARGAR_CLIENTES_SUCCESS':
      return { ...state, clientes: payload };

    default:
      return state;
  }
};
