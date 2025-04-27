import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side password confirmation
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      setLoading(false);
      return;
    }

    try {
      const userData = { Username:username, Password: password, role: "User" };
      const response = await AuthService.register(userData);
      console.log("Registration successful:", response);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data || "Đăng ký thất bại. Vui lòng thử lại."
      );
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div
        className="bg-white p-10 rounded-lg shadow-lg w-[500px] max-w-lg transform transition-all duration-700 ease-out animate-slide-up"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng ký
        </h2>
        {error && (
          <div className="text-red-500 text-center mb-4 text-lg animate-shake">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold text-lg transition-all duration-300">
              Tên đăng nhập
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 transition-all duration-300">
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
            <label className="block text-gray-700 font-semibold text-lg transition-all duration-300">
              Mật khẩu
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 transition-all duration-300">
              <FaLock className="text-gray-500 mr-3 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu..."
                className="w-full outline-none bg-transparent text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold text-lg transition-all duration-300">
              Xác nhận mật khẩu
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 transition-all duration-300">
              <FaLock className="text-gray-500 mr-3 text-lg" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu..."
                className="w-full outline-none bg-transparent text-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-6">
            <a href="/login" className="text-blue-500 hover:underline text-lg transition-colors duration-200">
              Đã có tài khoản? Đăng nhập
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;