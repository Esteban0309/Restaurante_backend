// narrowing.ts

function describir(valor: string | number | boolean): string {
  if (typeof valor === "string") {
    // Aquí TypeScript sabe que es string
    // Puedes usar .toUpperCase(), .length, etc.
    return `Texto en mayúsculas: ${valor.toUpperCase()}`;
  }

  if (typeof valor === "number") {
    // Aquí TypeScript sabe que es number
    // Puedes usar .toFixed(), Math.sqrt(), etc.
    return `Número al cuadrado: ${valor ** 2}`;
  }

  // Aquí solo puede ser boolean
  return valor ? "Verdadero" : "Falso";
}

console.log(describir("hola"));   // Texto en mayúsculas: HOLA
console.log(describir(5));        // Número al cuadrado: 25
console.log(describir(true));     // Verdadero

// También funciona con null
function procesarNombre(nombre: string | null): string {
  if (nombre === null) {
    return "Sin nombre";
  }
  // Aquí TypeScript sabe que nombre es string (descartó null)
  return nombre.trim().toUpperCase();
}

console.log(procesarNombre("  Ana García  "));  // ANA GARCÍA
console.log(procesarNombre(null));              // Sin nombre