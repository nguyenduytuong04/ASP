using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.Model
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }

        public Guid OrderId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }


        // Quan hệ với Order
        public Order Order { get; set; }

        // Quan hệ với Product
        public Product Product { get; set; }
    }
}
