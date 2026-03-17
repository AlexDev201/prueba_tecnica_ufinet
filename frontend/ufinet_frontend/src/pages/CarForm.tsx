import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarRequest } from "../types/Car";
import { getCarById } from "../service/CarService";
import { useCar } from "../hooks/useCar";

export function CarForm() {
  const navigate = useNavigate();
  const params = useParams();

  const carId = useMemo(() => {
    if (!params.id) return null;
    const n = Number(params.id);
    return Number.isFinite(n) ? n : null;
  }, [params.id]);

  const [error, setError] = useState<string | null>(null);
  const { handleCreate, handleUpdate, loading, setLoading } = useCar();
  const [formData, setFormData] = useState<CarRequest>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    carPlate: "",
    imageUrl: "",
  });
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (carId == null) return;

    let cancelled = false;
    setFetchLoading(true);
    setError(null);

    getCarById(carId)
      .then((car) => {
        if (cancelled) return;
        setFormData({
          brand: car.brand,
          model: car.model,
          year: car.year,
          color: car.color,
          carPlate: car.carPlate,
          imageUrl: car.imageUrl,
        });
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load car");
      })
      .finally(() => {
        if (cancelled) return;
        setFetchLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [carId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "year") {
        const n = Number(value);
        return { ...prev, year: Number.isFinite(n) ? n : prev.year };
      }

      if (name === "carPlate") {
        return { ...prev, carPlate: value.toUpperCase() };
      }

      return { ...prev, [name]: value } as CarRequest;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const plateRegex = /^[A-Z]{3}[0-9]{3}$/;

    if (!plateRegex.test(formData.carPlate)) {
      setError("La placa debe tener formato ABC123");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      if (carId == null) {
        await handleCreate(formData);
      } else {
        await handleUpdate(carId, formData);
      }
      navigate("/car-page");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 p-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="inline-block w-3 h-3 border border-yellow-700 rotate-45" />
            <h1 className="text-xs tracking-[0.4em] text-neutral-200 uppercase font-light">
              {carId == null ? "Add Vehicle" : `Edit Vehicle #${carId}`}
            </h1>
          </div>
          <p className="text-[10px] tracking-[0.25em] text-neutral-600 uppercase ml-6">
            {carId == null ? "New entry" : "Update record"}
          </p>
        </div>

        <button
          className="border border-neutral-700 text-neutral-400 text-[10px] tracking-[0.3em] uppercase font-light px-5 py-2.5 hover:border-neutral-500 hover:text-neutral-200 transition-all duration-300"
          onClick={() => navigate("/car-page")}
          type="button"
        >
          Volver
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-8">
        <span className="flex-1 h-px bg-neutral-800" />
        <span className="w-1.5 h-1.5 bg-yellow-700 rotate-45" />
        <span className="flex-1 h-px bg-neutral-800" />
      </div>

      {fetchLoading && <p className="text-center text-neutral-400">Cargando...</p>}

      {error && (
        <p className="mb-6 text-[10px] tracking-widest text-red-400 text-center border border-red-900/40 bg-red-950/20 py-3">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* Brand + Model */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Marca</label>
            <input
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Rolls-Royce"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Modelo</label>
            <input
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Fantasma"
              required
            />
          </div>
        </div>

        {/* Year + Color */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Año</label>
            <input
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              placeholder="2023"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Color</label>
            <input
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Negro medianoche"
              required
            />
          </div>
        </div>

        {/* Plate */}
        <div className="mb-4">
          <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Placa de carro</label>
          <input
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
            name="carPlate"
            value={formData.carPlate}
            onChange={handleChange}
            placeholder="ABC123"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-8">
          <label className="block text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Image URL</label>
          <input
            className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 text-sm font-light tracking-wide px-4 py-3 outline-none focus:border-yellow-700 placeholder:text-neutral-700 transition-colors duration-300"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Submit */}
        <button
          className="w-full border border-yellow-700 text-yellow-700 text-[10px] tracking-[0.35em] uppercase font-light py-3.5 hover:bg-yellow-700 hover:text-neutral-950 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : carId == null ? "Registrar Vehiculo" : "Guardar Cambios"}
        </button>
      </form>

      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
    </div>
  </div>
);

}
