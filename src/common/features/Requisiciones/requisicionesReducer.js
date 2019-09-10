const initialState = {
  requisiciones: [],
  requisicionesTipos: [],
  requisicionesEstadosCategorias: [],
  requisicionesEstatus: [],
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
    case 'CARGAR_REQUISICIONES_ESTADOS_CATEGORIAS_SUCCESS':
      return { ...state, requisicionesEstadosCategorias: payload };
    case 'CARGAR_REQUISICIONES_ESTATUS_SUCCESS':
      return { ...state, requisicionesEstatus: payload };
    default:
      return state;
  }
};
