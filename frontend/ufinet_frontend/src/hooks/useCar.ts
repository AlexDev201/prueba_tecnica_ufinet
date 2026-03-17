import { useState, useCallback, useEffect } from "react";
import { getAllCars, createCar, updateCar, deleteCar } from "../service/CarService";
import { CarResponse, CarRequest } from "../types/Car";
import { useNavigate } from "react-router-dom";
export function useCar(){

    const [cars, setCars] = useState<CarResponse[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const withLoading = async (fn: () => Promise<void>) => {
      setIsLoading(true);
      setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCars = useCallback(() =>
    withLoading(async () => {
      const data = await getAllCars();
      setCars(data);
    }),
  []);

  const handleCreate = useCallback(async (carData: CarRequest) => {
    await withLoading(async () => {
      const newCar = await createCar(carData);
      setCars((prev) => [...prev, newCar]);    
      setSuccess(true);
    });
  }, []);

   const handleUpdate = useCallback(async (id: number, carData: CarRequest) => {
    await withLoading(async () => {
      const updated = await updateCar(id, carData);
      setCars((prev) =>
        prev.map((car) => (car.id === id ? updated : car)) 
      );
    });
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await withLoading(async () => {
      await deleteCar(id);
      setCars((prev) => prev.filter((car) => car.id !== id)); 
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

   useEffect(() => {
    fetchCars();
  }, []);


  return{
    cars, selectedCar, isLoading, error, success, setSelectedCar, fetchCars, handleCreate, handleDelete, handleUpdate, handleLogout,
    loading, setLoading
  }


}