type TicketID = string | number;
type Prioridad = "baja" | "media" | "alta" | "critica";

type Ticket = {
  id: TicketID;
  titulo: string;
  prioridad: Prioridad;
  resuelta: boolean;
};

function imprimirTicket(t: Ticket): void {
  const estrella = t.prioridad === "critica" ? " ⚠️" : "";
  console.log(`[${t.id}] ${t.titulo} — ${t.prioridad}${estrella}`);
}

const t1: Ticket = { id: "T-001", titulo: "Error de login",  prioridad: "critica", resuelta: false };
const t2: Ticket = { id: 42,      titulo: "Ajuste de fuente", prioridad: "baja",    resuelta: true  };

imprimirTicket(t1); // [T-001] Error de login — critica ⚠️
imprimirTicket(t2); // [42] Ajuste de fuente — baja

type Moneda = "USD" | "EUR" | "MXN";

type Precio = { monto: number; moneda: Moneda };

const p1: Precio = { monto: 100, moneda: "USD" };
const p2: Precio = { monto: 200, moneda: "EUR" };
const p3: Precio = { monto: 300, moneda: "MXN" };

console.log(p1, p2, p3);