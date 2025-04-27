import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Kiểm tra token (nếu không có token, điều hướng người dùng về trang đăng nhập)
    const token = localStorage.getItem("token"); // Hoặc sessionStorage.getItem("token") nếu bạn lưu token trong sessionStorage
    if (!token) {
      navigate("/login"); // Điều hướng về trang đăng nhập nếu không có token
    }
  }, [navigate]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleProceedToCheckout = () => {
    // Chuyển đến trang thanh toán và truyền dữ liệu giỏ hàng
    navigate("/checkout", { state: { cartItems, totalAmount } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Không có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={`http://localhost:7124${item.imageUrl}`} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-red-500 font-bold">
                    {Number(item.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-300 rounded-l">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-300 rounded-r">+</button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Xóa
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-xl font-semibold text-gray-700">
              Tổng:{" "}
              {totalAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <button 
              onClick={handleProceedToCheckout}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
