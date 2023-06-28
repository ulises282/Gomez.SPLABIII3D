import Personaje from "./personaje.js";

export class Heroe extends Personaje {
  constructor(id, nombre, alias, editorial, fuerza, arma) {
    super(id, nombre, fuerza);
    this.alias = alias;
    this.editorial = editorial;
    this.arma = arma;
  }
}