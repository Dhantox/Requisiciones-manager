export const getUsuarios = store =>
  store.usuarios.usuarios.map(usuario => ({ ...usuario }));
