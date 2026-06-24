// tipo-any.ts

let dato: any = "hola";
dato = 42;        // ✅ sin error
dato = true;      // ✅ sin error
dato = [1, 2, 3]; // ✅ sin error

// Parece útil pero es trampa: pierdes el autocompletado
// y los errores vuelven a aparecer en tiempo de ejecución
console.log(dato.metodoQueNoExiste()); // TypeScript no avisa, pero falla al ejecutar