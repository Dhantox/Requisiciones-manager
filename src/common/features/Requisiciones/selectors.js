export const getRequisicionesTipos = store =>
  store.requisiciones.requisicionesTipos.map(requisicion => ({
    ...requisicion
  }));
