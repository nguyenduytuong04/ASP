using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.DTOs.Product
{
    public class ProductUpdateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public string Brand { get; set; }
        public IFormFile? Image { get; set; }

        public bool IsAvailable { get; set; }
        public double Rating { get; set; }
        public string UserUpdate { get; set; }
        public int CategoryId { get; set; }
    }

}
