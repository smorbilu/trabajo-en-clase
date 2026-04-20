export interface Login {
  usuario: string;
  password: string;
}

export interface Register {
  nombre: string;
  usuario: string;
  password: string;
}

export interface RegistroResponse {
  mensaje: string;
  usuario: {
    id: number;
    nombre: string;
    usuario: string;
    password?: string;
  };
}