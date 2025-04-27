// services/NewsService.js
import axios from 'axios';
import { API_BASE_URL } from '../config';  // lấy BASE_URL giống như ProductService

const NewsService = {
  // Lấy tất cả tin tức
  getAllNews: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/News`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tin tức:', error);
      return [];
    }
  },

  // Lấy tin tức theo ID
  getNewsById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/News/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tin tức theo ID:', error);
      throw error;
    }
  },

  // Thêm tin tức mới
  createNews: async (newsData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/News`, newsData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi thêm tin tức:', error);
      throw error;
    }
  },

  // Cập nhật tin tức
  updateNews: async (id, newsData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/News/${id}`, newsData);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật tin tức:', error);
      throw error;
    }
  },

  // Xóa tin tức
  deleteNews: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/News/${id}`);
    } catch (error) {
      console.error('Lỗi khi xóa tin tức:', error);
      throw error;
    }
  },
};

export default NewsService;
