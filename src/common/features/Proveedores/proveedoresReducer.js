const initialState = {
  proveedores: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CARGAR_PROVEEDORES_SUCCESS':
      return { ...state, proveedores: payload };

    default:
      return state;
  }
};
