import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("credit_card");  // Default: credit card
  const [statusPayment, setStatusPayment] = useState("pending");

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle payment submission
  const handlePayment = async () => {
    const orderDetails = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price
    }));

    const orderData = {
      userId: 1, 
      paymentMethod,
      statusPayment,
      orderDetails
    };
  // Lấy token từ localStorage
  const token = localStorage.getItem('token');
    try {
        const response = await axios.post(
            `${API_BASE_URL}/Order`, 
            orderData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,  
              }
            }
          );
      console.log('Order placed successfully:', response.data);

      // Sau khi thanh toán thành công, xóa giỏ hàng khỏi localStorage
      localStorage.removeItem("cart");

      // Điều hướng đến trang xác nhận đơn hàng
      navigate("/order-confirmation");
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại!');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">Thanh toán</h1>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold">Giỏ hàng</h2>
        {cartItems && cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>{item.quantity} x {Number(item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
            </div>
            <div className="font-bold text-red-500">
              {Number(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
            </div>
          </div>
        ))}

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Phương thức thanh toán</h3>
          <div className="space-y-2 mt-2">
            {/* Radio buttons for payment method */}
            <label className="flex items-center">
              <input
                type="radio"
                value="credit_card"
                checked={paymentMethod === "credit_card"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Thẻ tín dụng
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="bank_transfer"
                checked={paymentMethod === "bank_transfer"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Chuyển khoản ngân hàng
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="e_wallet"
                checked={paymentMethod === "e_wallet"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Ví điện tử (ví dụ: MoMo, ZaloPay)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="cash_on_delivery"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              Thanh toán khi nhận hàng
            </label>
          </div>
        </div>

        <div className="mt-4 text-right">
          <p className="text-xl font-semibold text-gray-700">
            Tổng cộng:{" "}
            {totalAmount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>

          <div className="mt-4">
            <button 
              onClick={handlePayment}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
