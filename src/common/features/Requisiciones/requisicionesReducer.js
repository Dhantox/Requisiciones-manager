const initialState = {
  requisiciones: [],
  requisicionesTipos: [],
  selectedRequisicion: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CARGAR_REQUISICIONES_SUCCESS':
      return { ...state, requisiciones: payload };
    case 'CARGAR_REQUISICIONES_TIPOS_SUCCESS':
      return { ...state, requisicionesTipos: payload };
    case 'SELECT_REQUISICION':
      return { ...state, selectedRequisicion: payload };

    default:
      return state;
  }
};
