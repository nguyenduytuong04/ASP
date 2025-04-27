using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.Model
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; } // 🆕 Mô tả sản phẩm

        public decimal Price { get; set; }

        public int StockQuantity { get; set; } // 🆕 Số lượng tồn kho

        public string ImageUrl { get; set; } // 🆕 Đường dẫn hình ảnh

        public string Brand { get; set; } // 🆕 Thương hiệu sản phẩm

        public bool IsAvailable { get; set; } // 🆕 Có sẵn hay không

        public double Rating { get; set; } // 🆕 Đánh giá (0 - 5)

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        public string UserCreate { get; set; }

        public string UserUpdate { get; set; }

        public string UserDelete { get; set; }

        // Khóa ngoại đến bảng Category
        public int CategoryId { get; set; }

        public Category Category { get; set; }

    }
}
