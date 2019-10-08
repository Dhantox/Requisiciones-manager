export const getProveedores = store =>
  store.proveedores.proveedores.map(proveedores => ({ ...proveedores }));
