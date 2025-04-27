// services/AuthService.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthService = {
  // Đăng nhập người dùng
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/login`, credentials);
      return response.data; 
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      throw error;
    }
  },

  // Đăng ký người dùng
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      throw error;
    }
  },
};

export default AuthService;
