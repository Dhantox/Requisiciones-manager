export const getRequisicionesTipos = store =>
  store.requisiciones.requisicionesTipos.map(requisicion => ({
    ...requisicion
  }));

export const getSelectedRequisicion = store =>
  store.requisiciones.selectedRequisicion;
