import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Kiểm tra xem đã có sản phẩm với id và size này chưa
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        // Nếu có rồi thì tăng số lượng
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      // Nếu chưa có thì thêm mới
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  };
  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
