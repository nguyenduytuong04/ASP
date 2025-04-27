import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ProductDetail = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            ProductService.getProductById(id)
                .then((data) => {
                    setProduct(data); 
                })
                .catch((error) => {
                    console.error("Error fetching product:", error);
                });
        }
    }, [id]);  // Run this effect whenever the `id` changes
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === product.id);
    
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };
    if (!product) return <div className="text-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center items-center">
            <div className="max-w-screen-lg w-full bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Product Image */}
                <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-200">
                    <img
                        src={`http://localhost:7124${product.imageUrl}`}
                        alt={product.name}
                        className="object-contain max-h-96 md:max-h-full p-6"
                    />
                </div>

                {/* Product Details */}
                <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-6">{product.description}</p>

                    {/* Price and Stock Information */}
                    <div className="mb-6">
                        <p className="text-3xl font-semibold text-red-500">
                            {Number(product.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        <p className="text-lg text-gray-600 mt-2">Stock Available: {product.stockQuantity}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                        <span className="text-yellow-500 text-xl">
                            {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                        </span>
                        <span className="ml-2 text-gray-500 text-lg">({product.rating})</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full md:w-auto px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 text-lg"
                        >
                        Add to Cart
                        </button>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
