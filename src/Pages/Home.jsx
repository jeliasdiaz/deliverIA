import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

const Home = () => {
  const inventoryChartRef = useRef(null);
  const demandChartRef = useRef(null);

  useEffect(() => {
    if (inventoryChartRef.current) inventoryChartRef.current.destroy();
    if (demandChartRef.current) demandChartRef.current.destroy();

    const inventoryChartCtx = document.getElementById("inventoryChart").getContext("2d");
    inventoryChartRef.current = new Chart(inventoryChartCtx, {
      type: "line",
      data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
        datasets: [
          {
            label: "Nivel de Inventario",
            data: [1200, 1150, 1400, 1300, 1280, 1500],
            borderColor: "#00BFA5",
            backgroundColor: "rgba(0, 191, 165, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
          x: { grid: { display: false } },
        },
      },
    });

    const demandChartCtx = document.getElementById("demandChart").getContext("2d");
    demandChartRef.current = new Chart(demandChartCtx, {
      type: "bar",
      data: {
        labels: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
          { label: "Demanda Real", data: [800, 950, 1100, 1250, null, null], backgroundColor: "#2962FF" },
          { label: "Demanda Predicha", data: [null, null, null, null, 1400, 1600], backgroundColor: "rgba(41, 98, 255, 0.5)" },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
          x: { grid: { display: false } },
        },
      },
    });

    return () => {
      if (inventoryChartRef.current) inventoryChartRef.current.destroy();
      if (demandChartRef.current) demandChartRef.current.destroy();
    };
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <aside className="w-64 fixed top-16 bottom-0 bg-white shadow-md p-4 border-r border-gray-200">
        <div className="mb-6">
          <h2 className="text-lg font-bold">Mi PyME</h2>
          <p className="text-gray-500 text-sm">Plan: Premium</p>
        <hr className="mt-4"/>
        </div>
        <div className="mb-6">
          <h3 className="text-gray-500 text-xs font-semibold uppercase mb-3">Gestión</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/productos" className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-teal-100 hover:text-teal-500">
                <i className="fas fa-boxes"></i> Productos
              </Link>
            </li>
            <li>
              <Link to="/proveedores" className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-teal-100 hover:text-teal-500">
                <i className="fas fa-truck"></i> Proveedores
              </Link>
            </li>
            <li>
              <Link to="/clientes" className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-teal-100 hover:text-teal-500">
                <i className="fas fa-users"></i> Clientes
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-500 text-xs font-semibold uppercase mb-3">Finanzas</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/creditos" className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-teal-100 hover:text-teal-500">
                <i className="fas fa-credit-card"></i> Créditos
              </Link>
            </li>
            <li>
              <Link to="/facturas" className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-teal-100 hover:text-teal-500">
                <i className="fas fa-file-invoice-dollar"></i> Facturas
              </Link>
            </li>
            <li>
              <Link to="/facturas" className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-teal-100 hover:text-teal-500">
              <i className="fas fa-chart-pie"></i> Reportes
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-5 bg-slate-100">
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="bg-white p-4 rounded shadow gap-y-2 flex flex-col">
            <h3 className="text-gray-500 text-base font-bold">Productos en Stock</h3>
            <div className="text-3xl font-semibold">1,234</div>
            <div className="text-green-500 text-sm">+5.2% vs mes anterior</div>
          </div>

          <div className="bg-white p-4 rounded shadow gap-y-2 flex flex-col">
            <h3 className="text-gray-500 text-base mb-2 font-bold">Productos por Agotarse</h3>
            <div className="text-3xl font-semibold">28</div>
            <div className="text-red-500 text-sm">Requiere atención</div>
          </div>

          <div className="bg-white p-4 rounded shadow gap-y-2 flex flex-col">
            <h3 className="text-gray-500 text-base mb-2 font-bold">Crédito Disponible</h3>
            <div className="text-3xl font-semibold">$25,000</div>
            <div className="text-sm">Límite: $50,000</div>
          </div>

          <div className="bg-white p-4 rounded shadow gap-y-2 flex flex-col">
            <h3 className="text-gray-500 text-base mb-2 font-bold">Pedidos Pendientes</h3>
            <div className="text-3xl font-semibold">12</div>
            <div className="text-sm">Todo en tiempo</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow h-80">
            <h3 className="text-gray-800 text-lg mb-4">Niveles de Inventario</h3>
            <canvas id="inventoryChart" className="w-full h-full"></canvas>
          </div>
          <div className="bg-white p-4 rounded shadow h-80">
            <h3 className="text-gray-800 text-lg mb-4">Predicción de Demanda</h3>
            <canvas id="demandChart" className="w-full h-full"></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
