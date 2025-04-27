import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";


// Utility function to generate a URL-friendly slug from the category name
const generateSlug = (name) => {
  return name
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize to decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .trim("-"); // Trim leading/trailing hyphens
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all"); // Store category ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    sessionStorage.setItem("buyNowProduct", JSON.stringify(product));
    navigate("/checkout");
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch categories
        const categoryData = await ProductService.getCategories();
        console.log("Categories:", categoryData); // Debug: Log categories
        setCategories(categoryData);

        // Fetch products
        let productData;
        if (selectedCategoryId === "all") {
          // If "all" is selected, fetch all products without category filter
          productData = await ProductService.getAllProducts();
        } else {
            console.log(selectedCategoryId)
          productData = await ProductService.getProductByCategory(selectedCategoryId);
        }

        console.log("Products:", productData); // Debug: Log products
        setProducts(productData);

      } catch (error) {
        setError("Không thể tải sản phẩm hoặc danh mục. Vui lòng thử lại sau.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategoryId]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedCategoryId("all");
      navigate("/products");
    } else {
      const selectedCat = categories.find((cate) => cate.id.toString() === value);
      if (selectedCat) {
        setSelectedCategoryId(selectedCat.id);
        const slug = generateSlug(selectedCat.name); // Generate slug from name
        navigate(`/category/${slug}`);
      }
    }
  };

  if (loading) return <div className="text-center text-lg text-white bg-black min-h-screen flex items-center justify-center">Đang tải...</div>;
  if (error) return <div className="text-red-500 text-center text-lg bg-black min-h-screen flex items-center justify-center">{error}</div>;

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">Danh sách sản phẩm</h1>

      {/* Category Filter Dropdown */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-64">
          <select
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-700"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg">
            Không có sản phẩm nào trong danh mục này.
          </div>
        ) : (
          products.map((product) => (
           
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className=" bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 transform animate-fade-in"
            >
                 <h1>ssfdsfsdsds</h1>
              <img
                src={`http://localhost:7124${product.imageUrl}`}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.name}</h2>
                <p className="text-red-500 font-bold mb-4 text-center">
                  {Number(product.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <button
                    onClick={() => handleBuyNow(product)}
                    className="mt-auto mx-auto px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all duration-200 transform hover:scale-110"
                >
                    Mua ngay
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;