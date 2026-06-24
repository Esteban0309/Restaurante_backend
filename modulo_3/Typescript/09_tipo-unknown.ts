// tipo-unknown.ts

function procesarDato(valor: unknown): string {
  // No puedo usar valor directamente — debo verificar primero

  if (typeof valor === "string") {
    // Aquí TypeScript sabe que es string
    return valor.toUpperCase();
  }

  if (typeof valor === "number") {
    // Aquí TypeScript sabe que es number
    return valor.toFixed(2);
  }

  if (typeof valor === "boolean") {
    return valor ? "Sí" : "No";
  }

  return "Tipo no reconocido";
}

console.log(procesarDato("hola"));   // HOLA
console.log(procesarDato(3.14159));  // 3.14
console.log(procesarDato(true));     // Sí
console.log(procesarDato(null));     // Tipo no reconocido