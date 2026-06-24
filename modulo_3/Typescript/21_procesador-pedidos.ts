// procesador-pedidos.ts

type Pedido = {
  id:       number;
  cliente:  string;
  total:    number;
  estado:   "pendiente" | "pagado" | "cancelado";
};

function procesarPedidos(pedidos: Pedido[]): void {
  console.log("=== RESUMEN DE PEDIDOS ===\n");

  let totalFacturado: number = 0;
  let pedidosPendientes: number = 0;
  let pedidosPagados: number = 0;

  for (const pedido of pedidos) {
    // Switch para el estado
    switch (pedido.estado) {
      case "pagado":
        totalFacturado += pedido.total;
        pedidosPagados++;
        console.log(`✅ #${pedido.id} ${pedido.cliente.padEnd(15)} ${pedido.total}€`);
        break;
      case "pendiente":
        pedidosPendientes++;
        console.log(`⏳ #${pedido.id} ${pedido.cliente.padEnd(15)} ${pedido.total}€`);
        break;
      case "cancelado":
        console.log(`❌ #${pedido.id} ${pedido.cliente.padEnd(15)} CANCELADO`);
        break;
    }
  }

  console.log("\n--- Estadísticas ---");
  console.log(`  Pagados:    ${pedidosPagados}   | Facturado: ${totalFacturado}€`);
  console.log(`  Pendientes: ${pedidosPendientes}`);
  console.log(`  Total pedidos: ${pedidos.length}`);
}

const pedidos: Pedido[] = [
  { id: 1, cliente: "Ana García",   total: 150, estado: "pagado"    },
  { id: 2, cliente: "Luis Pérez",   total: 320, estado: "pendiente" },
  { id: 3, cliente: "Marta López",  total: 75,  estado: "pagado"    },
  { id: 4, cliente: "Carlos Ruiz",  total: 200, estado: "cancelado" },
  { id: 5, cliente: "Elena Vega",   total: 490, estado: "pagado"    },
  { id: 6, cliente: "Pedro Sanz",   total: 110, estado: "pendiente" },
];

procesarPedidos(pedidos);