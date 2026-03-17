import { ReactEventHandler, useState } from "react";
import { RegisterRequest } from "../types/User";
import { registerUser } from "../service/AuthService";
import { useNavigate } from "react-router-dom";

export function useRegister(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const[formData, setFormData] = useState<RegisterRequest> ({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            setError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        setLoading(true);
        try {
            const { confirmPassword, ...userData } = formData;
            const response = await registerUser(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
            console.log(response);
            

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Error al registrar usuario");
            }
        } finally {
            setLoading(false);  
        }

    };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        error,
        success
    };

}

