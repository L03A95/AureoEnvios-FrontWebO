interface Credenciales {
    email: string;
    username: string;
    password: string;
    codigoDeLlamada: string;
    celular: string;
    roles: [{id: 1 | 2}];
};

export enum userType {
    CONSUMIDOR = "CONSUMIDOR",
    PROVEEDOR = "PROVEEDOR"
}

export interface User {
    tipoPersona: string;
    tipoUsuario: userType;
    credenciales: Credenciales;
};

export interface UserLogin {
    username: string;
    password: string;
    grant_type: string;
}

export {};