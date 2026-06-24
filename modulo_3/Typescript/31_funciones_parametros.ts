// Concepto puro

// Opcional: el parámetro puede no llegarse a pasar
function crearEtiqueta(texto: string, mayusculas?: boolean): string {
  // Dentro, mayusculas es boolean | undefined
  if (mayusculas) {
    return `[${texto.toUpperCase()}]`;
  }
  return `[${texto}]`;
}

console.log(crearEtiqueta("info"));          // [info]
console.log(crearEtiqueta("alerta", true)); // [ALERTA]

// Por defecto: si no se pasa, usa el valor indicado
function repetir(texto: string, veces: number = 3): string {
  return texto.repeat(veces);
}

console.log(repetir("ha"));    // hahaha  (usa el default 3)
console.log(repetir("ha", 5)); // hahahahaha