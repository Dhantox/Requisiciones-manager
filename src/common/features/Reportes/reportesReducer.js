const initialState = {
  reportes: [],
  selectedReporte: null
};

export default (state = initialState, { type, payload }) => {
  let reporte;
  switch (type) {
    case 'CARGAR_REPORTES_SUCCESS':
      return { ...state, reportes: payload };
    case 'SELECT_REPORTE':
      reporte = state.reportes.find(reporte => reporte.id === payload);
      reporte = JSON.parse(JSON.stringify(reporte));
      return { ...state, selectedReporte: reporte };
    case 'FLUSH_REPORTES':
      return { ...state, reportes: [] };
    default:
      return state;
  }
};
