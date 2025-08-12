namespace PosterAdmin.DTOs
{
    public class OrderListDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public DateTime? ShippedDate { get; set; }
        public DateTime EstimatedDeliveryStart { get; set; }
        public DateTime EstimatedDeliveryEnd { get; set; }
        public int ItemCount { get; set; }
    }
    
    public class OrderDetailDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal ShippingCost { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string DeliveryType { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public DateTime? ShippedDate { get; set; }
        public DateTime EstimatedDeliveryStart { get; set; }
        public DateTime EstimatedDeliveryEnd { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }
    
    public class OrderItemDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string? Frame { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string? ImageUrl { get; set; }
    }
    
    public class UpdateOrderStatusDto
    {
        public int OrderId { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime? ShippedDate { get; set; }
    }
    
    public class OrderStatsDto
    {
        public int TotalOrders { get; set; }
        public int PendingOrders { get; set; }
        public int ProcessingOrders { get; set; }
        public int ShippedOrders { get; set; }
        public int DeliveredOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TodayRevenue { get; set; }
    }
}
