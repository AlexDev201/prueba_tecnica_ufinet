export interface RegisterRequest{
    firstName : string;
    lastName: string;
    username :string;
    email : string;
    phone : string;
    password: string;
    confirmPassword: string;
} 

export interface RegisterResponse{
    firstName : string;
    lastName: string;
    username :string;
    email : string;
    phone : string;
}

export interface LoginRequest{
    username : string;
    password : string;
}

export interface LoginResponse{
    token : string;
    user : Record<string, unknown>;
}