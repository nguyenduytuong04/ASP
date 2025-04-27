import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-10 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-red-600 mb-4">Giày</h2>
            <p className="text-gray-400 leading-relaxed">
              Chuyên cung cấp bánh ngọt chất lượng cao, mang đến giày cho mọi dịp đặc biệt.
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Liên hệ</h3>
            <p className="text-gray-400 mb-2">📍 123 Dường Tăng Nhơn Phú, TP. HCM</p>
            <p className="text-gray-400 mb-2">📞 0123 456 789</p>
            <p className="text-gray-400">📧 <a href="mailto:support@sgbakes.com" className="hover:text-red-500 transition-colors duration-200">support@sgbakes.com</a></p>
          </div>

          {/* Social Section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold text-white mb-4">Theo dõi chúng tôi</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-400 text-2xl transform transition-all duration-200 hover:text-red-500 hover:scale-125">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 text-2xl transform transition-all duration-200 hover:text-red-500 hover:scale-125">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 text-2xl transform transition-all duration-200 hover:text-red-500 hover:scale-125">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm">
          © 2024 SGBakes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;