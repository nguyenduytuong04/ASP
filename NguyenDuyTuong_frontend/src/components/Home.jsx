import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import NewsService from '../services/NewsService';
import { IMAGE_URL } from '../config';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    sessionStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/checkout");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await ProductService.getAllProducts();
        const newsData = await NewsService.getAllNews();
        setProducts(productData);
        setNewsList(newsData);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">Cửa hàng Của Chúng Tôi</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {products.slice(0, 6).map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
            <Link to={`/product/${product.id}`} className="h-full">
              <img
                src={`http://localhost:7124${product.imageUrl}`}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-red-500 font-bold mb-4">
                {Number(product.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <button
                onClick={() => handleBuyNow(product)}
                className="mt-auto px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              >
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tin tức mới nhất */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">Tin Tức Mới Nhất</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {newsList.slice(0, 3).map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-md p-4">
              {news.imagePath && (
                <img
                  src={`${IMAGE_URL}${news.imagePath}`}
                  alt={news.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">
                {news.content.slice(0, 100)}...
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Ngày đăng: {new Date(news.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/news" className="text-blue-500 hover:underline">
            Xem tất cả tin tức →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
