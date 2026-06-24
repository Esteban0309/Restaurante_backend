// Concepto puro

// Declaración tradicional
function cuadrado(n: number): number {
  return n * n;
}

// Flecha equivalente — con cuerpo explícito
const cuadradoFlecha = (n: number): number => {
  return n * n;
};

// Flecha con retorno implícito (una expresión, sin llaves)
const cuadradoCorto = (n: number): number => n * n;

// Sin parámetros
const ahora = (): string => new Date().toLocaleTimeString();

// Un solo parámetro (paréntesis opcionales, pero recomendados en TS)
const doble = (n: number): number => n * 2;

console.log(cuadrado(5));       // 25
console.log(cuadradoFlecha(5)); // 25
console.log(cuadradoCorto(5));  // 25
console.log(doble(7));          // 14
console.log(ahora());           // e.g. "10:34:22"