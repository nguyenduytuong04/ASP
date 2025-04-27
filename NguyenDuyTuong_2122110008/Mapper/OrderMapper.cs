//using DangNuKimAnh_2122110482_b2.Model;
//using DangNuKimAnh_2122110482_b2.DTOs;
//using DangNuKimAnh_2122110482_b2.DTOs.Order;

//public static class OrderMapper
//{
//    public static Order ToOrder(OrderCreateDTO dto)
//    {
//        return new Order
//        {
//            UserId = dto.UserId,
//            OrderDate = dto.OrderDate,
//            OrderDetails = dto.OrderDetails.Select(d => new OrderDetail
//            {
//                ProductId = d.ProductId,
//                Quantity = d.Quantity,
//                UnitPrice = d.UnitPrice
//            }).ToList()
//        };
//    }

//    public static void UpdateOrder(Order order, OrderUpdateDTO dto)
//    {
//        order.OrderDate = dto.OrderDate;

//        // Nếu bạn muốn thay thế toàn bộ OrderDetails
//        order.OrderDetails = dto.OrderDetails.Select(d => new OrderDetail
//        {
//            ProductId = d.ProductId,
//            Quantity = d.Quantity,
//            UnitPrice = d.UnitPrice
//        }).ToList();
//    }

//    public static OrderResponseDTO ToOrderResponse(Order order)
//    {
//        return new OrderResponseDTO
//        {
//            Id = order.Id,
//            UserId = order.UserId,
//            UserName = order.User?.Name, // cần Include(User) nếu dùng EF
//            OrderDate = order.OrderDate,
//            OrderDetails = order.OrderDetails?.Select(d => new OrderDetailResponseDTO
//            {
//                ProductId = d.ProductId,
//                ProductName = d.Product?.Name, // cần Include(OrderDetails).ThenInclude(Product)
//                Quantity = d.Quantity,
//                UnitPrice = d.UnitPrice
//            }).ToList()
//        };
//    }
//}
