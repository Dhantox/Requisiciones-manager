export const getClientes = store =>
  store.clientes.clientes.map(cliente => ({ ...cliente }));
