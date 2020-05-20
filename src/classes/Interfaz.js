/**
 * *Clase destinada a funciones comunes de la interfaz
 * 2020.05.10
 */
export default class Interfaz {
  constructor() {}
  /**
   * Funcion que permite elegir el color de las cuentas segun el numero
   * 'color' introducido
   * @param {*} color Numero entre 1 y 7 del color elegido
   */
  elegirColor(color) {
    if (color == 1) {
      //Negro
      return "#29282C"; //Negro
    } else if (color == 2) {
      //VIOLETA
      return "#6B2C91"; //Violeta
    } else if (color == 3) {
      //AMARILLO
      return "#F9A825"; //Amarillo
    } else if (color == 4) {
      //VERDE
      return "#A1BF5B"; //Verde
    } else if (color == 5) {
      //AZUL OSCURO
      return "#273B89"; //Azul oscuro
    } else if (color == 6) {
      //NARANJA
      return "#F15A2B"; //Naranja oscuro
    } else if (color == 7) {
      //AZUL VERDOSO
      return "#52D0A1"; //Azul Verdoso
    }
  }
  
}
