class Temperatura {
  valorCelsius: number;

  constructor(celsius: number) {
    this.valorCelsius = celsius;
  }

  aFahrenheit(): number {
    return this.valorCelsius * 9 / 5 + 32;
  }

  aKelvin(): number {
    return this.valorCelsius + 273.15;
  }

  describir(): string {
    return (
      `${this.valorCelsius}°C = ` +
      `${this.aFahrenheit()}°F = ` +
      `${this.aKelvin()}K`
    );
  }
}

const hervor = new Temperatura(100);
const congelacion = new Temperatura(0);

console.log(hervor.describir());     // 100°C = 212°F = 373.15K
console.log(congelacion.describir()); // 0°C = 32°F = 273.15K

// EJERCICIO: crear una clase TemperaturaFahrenheit que reciba un valor en Fahrenheit y tenga métodos para convertir de Fahrenheit a Celsius.

class temperatura {
  valorfa: number;

  constructor(celsius: number) {
    this.valorfa = celsius;
  }

  aCelsius(): number {
    return (this.valorfa - 32) * 9 / 5;
  }

  aKelvin(): number {
    return this.aCelsius() + 273.15;
  }

  describir(): string {
    return (
      `${this.valorfa}°C = ` +
      `${this.aCelsius()}°F = ` +
      `${this.aKelvin()}K`
    );
  }
}

const Hervor = new Temperatura(100);
const Congelacion = new Temperatura(0);

console.log(Hervor.describir());     // 100°C = 212°F = 373.15K
console.log(Congelacion.describir()); // 0°C = 32°F = 273.15K