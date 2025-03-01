export interface UserLogin {
    correo: string;
    clave: string;
}

export interface UserRegister extends UserLogin{
    nombre: string;
}

export interface UserResponse {
    isSuccess: boolean;
    token: string;
}

export interface tokenResponse {
    emailaddress: string;
    nameidentifier: number;
}