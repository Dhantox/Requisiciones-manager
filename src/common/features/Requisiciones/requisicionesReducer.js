const initialState = {
  requisiciones: [],
  requisicionesFiltradas: [],
  requisicionesTipos: [],
  requisicionesEstadosCategorias: [],
  requisicionesEstatus: [],
  requisicionEstado: {},
  selectedRequisicion: null,
  totalRequisicion: null,
  totalCategoria: null,
  totalTipo: null
};

export default (state = initialState, { type, payload }) => {
  let requisicion;
  switch (type) {
    case 'CARGAR_REQUISICIONES_SUCCESS':
      return { ...state, requisiciones: payload };
    case 'CARGAR_REQUISICIONES_TIPOS_SUCCESS':
      return { ...state, requisicionesTipos: payload };
    case 'SELECT_REQUISICION':
      requisicion = state.requisiciones.find(
        requisicion => requisicion.id === payload
      );
      requisicion = JSON.parse(JSON.stringify(requisicion));
      return { ...state, selectedRequisicion: requisicion };
    case 'CARGAR_REQUISICIONES_ESTADOS_CATEGORIAS_SUCCESS':
      return { ...state, requisicionesEstadosCategorias: payload };
    case 'CARGAR_REQUISICIONES_ESTATUS_SUCCESS':
      return { ...state, requisicionesEstatus: payload };
    case 'CARGAR_REQUISICION_ESTADO':
      return { ...state, requisicionEstado: payload };
    case 'CARGAR_TOTAL_REQUISICIONES':
      return { ...state, totalRequisicion: payload };
    case 'CARGAR_TOTAL_CATEGORIAS':
      return { ...state, totalCategoria: payload };
    case 'CARGAR_TOTAL_TIPOS':
      return { ...state, totalTipo: payload };
    case 'REQUISICIONES_FLUSH':
      return { ...state, totalCategoria: [] };
    case 'CARGAR_REQUISICIONES_FILTRADAS_SUCCESS':
      return { ...state, requisicionesFiltradas: payload };
    default:
      return state;
  }
};
