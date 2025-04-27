import { FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();
  const [animateBadge, setAnimateBadge] = useState(false);

  // Trigger badge animation when totalQuantity changes
  useEffect(() => {
    if (totalQuantity > 0) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  const handleLogout = () => {
    // Xóa token khi người dùng đăng xuất
    localStorage.removeItem("token");
    // Điều hướng về trang đăng nhập sau khi đăng xuất
    window.location.href = "/login"; // Hoặc bạn có thể dùng `navigate("/login")` nếu dùng `react-router-dom`
  };

  // Kiểm tra token để hiển thị hình người dùng hoặc đăng xuất
  const token = localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg p-4 flex items-center justify-between transition-all duration-300">
      {/* Logo + Nav */}
      <div className="flex items-center space-x-8">
        <Link to="/">
          <h1 className="text-[40px] font-extrabold text-red-700 animate-fade-in">Giày</h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200">
            Trang chủ
          </Link>
          <Link to="/product" className="text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200">
            Sản phẩm
          </Link>
          <Link to="/about" className="text-white text-lg font-semibold hover:text-red-500 transition-colors duration-200">
            Giới thiệu
          </Link>
        </nav>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-96 max-w-full">
          <input
            type="text"
            placeholder="Tìm kiếm giày..."
            className="w-full p-3 pl-12 pr-4 text-white bg-gray-800 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-red-500" />
        </div>
      </div>

      {/* User + Cart */}
      <div className="flex items-center space-x-6">
        {token ? (
          <button onClick={handleLogout} className="group">
            <FaSignOutAlt className="text-white text-2xl transform transition-all duration-200 group-hover:text-red-500 group-hover:scale-110" />
          </button>
        ) : (
          <Link to="/login" className="group">
            <FaUser className="text-white text-2xl transform transition-all duration-200 group-hover:text-red-500 group-hover:scale-110" />
          </Link>
        )}

        <Link to="/cart" className="group relative">
          <FaShoppingCart className="text-white text-2xl transform transition-all duration-200 group-hover:text-red-500 group-hover:scale-110" />
          {totalQuantity > 0 && (
            <span
              className={`absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-1 z-10 transition-all duration-300 ${animateBadge ? "animate-bounce" : ""}`}
            >
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
