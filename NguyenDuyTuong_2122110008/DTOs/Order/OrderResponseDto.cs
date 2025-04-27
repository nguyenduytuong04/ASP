using NguyenDuyTuong_2122110008.DTOs.OrderDetail;

namespace NguyenDuyTuong_2122110008.DTOs.Order
{
    public class OrderResponseDto
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public string StatusPayment { get; set; }
        public List<OrderDetailResponseDto> OrderDetails { get; set; }
    }
}
