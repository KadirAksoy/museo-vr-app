import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
}

export interface RegisterUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
}

export interface LoginUser {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterUser): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log("Kayıt başarılı:", response.data);
  } catch (error) {
    console.error("Kayıt sırasında bir hata oluştu:", error);
    throw error;
  }
};

export const loginUser = async (userData: LoginUser) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Giriş sırasında bir hata oluştu:", error);
    throw error;
  }
};
