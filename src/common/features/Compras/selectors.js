export const getRequisicionesTipos = store =>
  store.requisiciones.requisicionesTipos.map(requisicion => ({
    ...requisicion
  }));

export const getSelectedRequisicion = store =>
  store.requisiciones.selectedRequisicion;

export const getEstadosCategorias = store =>
  store.requisiciones.requisicionesEstadosCategorias.map(categoria => ({
    ...categoria
  }));

export const getRequisicionesEstatus = store =>
  store.requisiciones.requisicionesEstatus.map(estatus => ({ ...estatus }));
