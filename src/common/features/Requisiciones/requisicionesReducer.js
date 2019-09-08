const initialState = {
  requisiciones: [],
  requisicionesTipos: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CARGAR_REQUISICIONES_SUCCESS':
      return { ...state, requisiciones: payload };
    case 'CARGAR_REQUISICIONES_TIPOS_SUCCESS':
      return { ...state, requisicionesTipos: payload };

    default:
      return state;
  }
};
