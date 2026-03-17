import {AxiosResponse} from "axios"; 
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/User";
import { apiClient } from "./ApiClient";
export const registerUser = async( credentials : RegisterRequest): Promise<RegisterResponse> => {

    try{
        const response : AxiosResponse<RegisterResponse> = await apiClient.post(
            "/api/auth/register",
            credentials
        );

        return response.data;
    }catch(e){
        throw new Error('Registration failed');
    }
}

export const userLogin = async(credentials: LoginRequest) : Promise<LoginResponse> => {
    try{
        const response : AxiosResponse<LoginResponse> = await apiClient.post(
             "/api/auth/login",
             credentials
        );
        
        const data = response.data;
        localStorage.setItem("token", data.token);
        return data;
    }catch(e){
        throw new Error('Login failed')
    }
}