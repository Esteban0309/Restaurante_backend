// Concepto puro
const numeros: number[] = [1, 2, 3, 4];

// forEach: para "hacer algo" con cada elemento
numeros.forEach((n) => console.log(n * 10));  // 10, 20, 30, 40

// map: para CREAR una lista transformada
const dobles: number[] = numeros.map((n) => n * 2);
console.log(dobles);  // [2, 4, 6, 8]

/* IVA */ 
const precios: number [] = [100, 250, 80, 500]
const conIVA: number[] = precios.map((p)=> Number((p * 1.19).toFixed(2)));
conIVA.forEach((p, i)=> console.log('Precio ${i+1}: $${p}'));