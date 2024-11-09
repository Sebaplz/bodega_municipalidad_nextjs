import axios from "axios";

export interface User {
  email: string;
  password: string;
}

export const registerUser = async (user: User) => {
  try {
    //TODO: Verificar porque no funciona con la instancia de axios
    const response = await axios.post(
      `http://localhost:8080/api/v1/auth/register`,
      user
    );
    return response;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};
