
using System.ComponentModel.DataAnnotations;

namespace NguyenDuyTuong_2122110008.Model
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public int UserId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public decimal TotalAmount { get; set; }

        public string Status { get; set; }

        public string PaymentMethod { get; set; }

        public string StatusPayment { get; set; }

        // Quan hệ với User
        public User User { get; set; }

        // Quan hệ 1-n với OrderDetail
        public List<OrderDetail> OrderDetails { get; set; }
    }
}
