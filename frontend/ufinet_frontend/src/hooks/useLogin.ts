import { useState } from "react";
import { LoginRequest } from "../types/User";
import { userLogin } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginRequest>({
        username: "",
        password : ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);
        try{
            const response = await userLogin(formData);
            navigate('/car-page')
            console.log(response);
        }catch(error){
            setError('Login failed');
        }finally{
            setLoading(false);
        }
    }

    return{
        formData,
        error,
        loading,
        handleChange,
        handleSubmit
    }
}