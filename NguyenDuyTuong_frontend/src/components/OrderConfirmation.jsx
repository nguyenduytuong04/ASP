import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Cài đặt framer-motion để làm animation dễ dàng

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Điều hướng về trang chủ sau 5 giây
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold text-green-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Thanh toán thành công!
        </motion.h1>

        <motion.p
          className="text-xl text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đang được xử lý.
        </motion.p>

        <motion.div
          className="p-4 bg-yellow-100 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-lg text-gray-800">
            🛍️ Hàng sẽ được giao đến cho bạn trong vòng 1-2 ngày làm việc. Chúng tôi sẽ thông báo khi đơn hàng được giao!
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-sm text-gray-500">Trang sẽ tự động chuyển về trang chủ trong vài giây...</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
