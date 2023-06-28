export function filtrar(editorial, datos) {
  if (editorial === "Todos") return datos;
  return datos.filter((heroe) => heroe.editorial === editorial);
}

export function calcularPromedio(datos) {
  const total = datos.reduce((acc, heroe) => acc + heroe.fuerza, 0);
  const promedio = total / datos.length;
  return promedio.toFixed(2);
}
