// services/ProductService.js
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ProductService = {
  // lấy tất cả sản phẩm
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Product`);
      console.log(response);
      return response.data; // sửa lại nếu API trả về mảng trực tiếp
     
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      return [];
    }
  },
 
  getProductById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:7124/api/Product/${id}`);

      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      throw error;  // Rethrow the error to handle it elsewhere
    }
  },
  getProductByCategory: async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:7124/api/Product/category/${categoryId}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      throw error;  // Rethrow the error to handle it elsewhere
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Category`);
      console.log(response);
      return response.data; // sửa lại nếu API trả về mảng trực tiếp
     
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      return [];
    }
  },
};

export default ProductService;
