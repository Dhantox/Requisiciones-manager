export const getProveedores = store =>
  store.proveedores.proveedores.map(proveedor => ({ ...proveedor }));
