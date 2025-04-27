using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.DTOs.Product
{
    public class ProductCreateDTO
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; } // 🆕 Mô tả sản phẩm

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int StockQuantity { get; set; } // 🆕 Số lượng tồn kho

        public string? ImageUrl { get; set; } // 🆕 Link ảnh
        public IFormFile Image { get; set; }

        public string Brand { get; set; } // 🆕 Thương hiệu

        public bool IsAvailable { get; set; } = true; // 🆕 Mặc định là true

        [Range(0, 5)]
        public double Rating { get; set; } = 0; // 🆕 Mặc định 0

        public string UserCreate { get; set; }

        // Khóa ngoại đến bảng Category
        [Required]
        public int CategoryId { get; set; }
    }
}
