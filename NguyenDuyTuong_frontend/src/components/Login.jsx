import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import AuthService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credentials = { Username: username, Password: password };
      const response = await AuthService.login(credentials);
      
      // Store token in localStorage
      localStorage.setItem("token", response.token);
      const token=localStorage.getItem("token");
      console.log(token)
        navigate("/");
  
    } catch (error) {
      setError(
        error.response?.data || "Tên đăng nhập hoặc mật khẩu không đúng."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[500px] max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>
        {error && (
          <div className="text-red-500 text-center mb-4 text-lg">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold text-lg">
              Tên đăng nhập
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaUser className="text-gray-500 mr-3 text-lg" />
              <input
                type="text"
                placeholder="Nhập tên đăng nhập..."
                className="w-full outline-none bg-transparent text-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold text-lg">
              Mật khẩu
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3">
              <FaLock className="text-gray-500 mr-3 text-lg" />
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                className="w-full outline-none bg-transparent text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-between text-sm mb-6">
            <a href="#" className="text-blue-500 hover:underline text-lg">
              Quên mật khẩu?
            </a>
            <a href="/register" className="text-blue-500 hover:underline text-lg">
              Đăng ký ngay
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;