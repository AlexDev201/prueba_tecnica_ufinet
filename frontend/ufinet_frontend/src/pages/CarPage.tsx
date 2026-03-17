import { useNavigate } from "react-router-dom";
import { useCar } from "../hooks/useCar";

export function CarPage() {
  const navigate = useNavigate();
  const { cars, isLoading, error, handleDelete, handleLogout } = useCar();
  return (
  <div className="min-h-screen bg-neutral-950 px-6 py-10">
 
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-block w-3 h-3 border border-yellow-700 rotate-45" />
          <h1 className="text-xs tracking-[0.4em] text-neutral-200 uppercase font-light">
            Gestión de vehículos
          </h1>
        </div>
        <p className="text-[10px] tracking-[0.25em] text-neutral-600 uppercase ml-6">
          Registro de vehículos
        </p>
      </div>
 
      <div className="flex gap-3">
        <button
          className="border border-yellow-700 text-yellow-700 text-[10px] tracking-[0.3em] uppercase font-light px-5 py-2.5 hover:bg-yellow-700 hover:text-neutral-950 transition-all duration-300"
          onClick={() => navigate("/car-form")}
          type="button"
        >
          Añadir vehículo
        </button>
        <button
          className="border border-neutral-700 text-neutral-400 text-[10px] tracking-[0.3em] uppercase font-light px-5 py-2.5 hover:border-neutral-500 hover:text-neutral-200 transition-all duration-300"
          onClick={handleLogout}
          type="button"
        >
          Salir
        </button>
      </div>
    </div>
 
    {/* Divider */}
    <div className="flex items-center gap-3 mb-8">
      <span className="flex-1 h-px bg-neutral-800" />
      <span className="w-1.5 h-1.5 bg-yellow-700 rotate-45" />
      <span className="flex-1 h-px bg-neutral-800" />
    </div>
 
    {/* States */}
    {isLoading && (
      <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase text-center py-12">
        Loading...
      </p>
    )}
    {error && (
      <p className="text-[10px] tracking-widest text-red-400 text-center border border-red-900/40 bg-red-950/20 py-3">
        {error}
      </p>
    )}
 
    {/* Table */}
    {!isLoading && !error && (
      <div className="overflow-x-auto border border-neutral-800">
 
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900">
              {["ID", "Brand", "Model", "Year", "Plate", "Color", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-light"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
 
          <tbody>
            {cars.map((car, i) => (
              <tr
                key={car.id}
                className={`border-b border-neutral-800 transition-colors duration-200 hover:bg-neutral-900 ${
                  i % 2 === 0 ? "bg-neutral-950" : "bg-neutral-900/40"
                }`}
              >
                <td className="px-5 py-3.5 text-[11px] text-neutral-600 font-light tracking-wider">
                  #{car.id}
                </td>
                <td className="px-5 py-3.5 text-sm text-neutral-300 font-light tracking-wide">
                  {car.brand}
                </td>
                <td className="px-5 py-3.5 text-sm text-neutral-300 font-light tracking-wide">
                  {car.model}
                </td>
                <td className="px-5 py-3.5 text-sm text-neutral-400 font-light">
                  {car.year}
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-[10px] tracking-[0.2em] text-yellow-700 border border-yellow-900/50 bg-yellow-950/20 px-2.5 py-1 uppercase">
                    {car.carPlate}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-neutral-400 font-light capitalize">
                  {car.color}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button
                      className="border border-neutral-700 text-neutral-400 text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 hover:border-yellow-700 hover:text-yellow-700 transition-all duration-200"
                      onClick={() => navigate(`/car-form/${car.id}`)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="border border-neutral-700 text-neutral-400 text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 hover:border-red-800 hover:text-red-500 transition-all duration-200"
                      onClick={() => handleDelete(car.id)}
                      type="button"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {cars.length === 0 && (
          <p className="text-[10px] tracking-[0.3em] text-neutral-600 uppercase text-center py-12">
            Vehiculos no encontrados
          </p>
        )}
      </div>
    )}
 
    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
  </div>
);

}