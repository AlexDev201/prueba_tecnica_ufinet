import {AxiosResponse} from 'axios';
import { CarRequest, CarResponse } from '../types/Car';
import { apiClient } from './ApiClient';



export const getAllCars = async (): Promise<CarResponse[]> => {
  try {
    const response: AxiosResponse<CarResponse[]> = await apiClient.get(
      "/api/car"
    );

    return response.data;
  } catch (e) {
    throw new Error("Fetch cars failed");
  }
};


export const getCarById = async (id: number): Promise<CarResponse> => {
  try {
    const response: AxiosResponse<CarResponse> = await apiClient.get(
      `/api/car/${id}`
    );

    return response.data;
  } catch (e) {
    throw new Error("Fetch car failed");
  }
};


export const createCar = async( carData: CarRequest ) :  Promise<CarResponse> => {
    try{
        const response : AxiosResponse<CarResponse> = await apiClient.post(
            "/api/car/create-car",
            carData
        )

        return response.data;
    }catch(e){
        throw new Error('Creation failed');
    }
}

export const updateCar = async( id:number, carData: CarRequest ) :  Promise<CarResponse> => {
    try{
        const response : AxiosResponse<CarResponse> = await apiClient.patch(
            `/api/car/update-car/${id}`,
            carData
        )

        return response.data;
    }catch(e){
        throw new Error('Creation failed');
    }
}

export const deleteCar = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/api/car/delete-car/${id}`);
  } catch (e) {
    throw new Error('Delete failded')
  }
}  