// tipos-string.ts
const nombre:    string = "Koby";
const dueño:    string = `Esteban, ${nombre}`;
const raza:     string = "Pitbull";
const color:  string = 'cafe';

console.log(nombre);
console.log(dueño);
console.log(`La cadena vacía tiene longitud: ${raza.length}`);

// Métodos de string funcionan igual que en JS
console.log(nombre.toUpperCase());      // ANA GARCÍA
console.log(nombre.toLowerCase());      // ana garcía
console.log(nombre.includes("García")); // true
console.log(nombre.split(" "));         // ["Ana", "García"]