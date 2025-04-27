using NguyenDuyTuong_2122110008.DTOs.OrderDetail;

namespace NguyenDuyTuong_2122110008.DTOs.Order
{
    public class OrderCreateDto
    {
        public int UserId { get; set; }
        public string PaymentMethod { get; set; }
        public string StatusPayment { get; set; }
        public List<OrderDetailCreateDto> OrderDetails { get; set; }
    }
}
