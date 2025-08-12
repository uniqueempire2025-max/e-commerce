using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PosterAdmin.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string OrderNumber { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string CustomerName { get; set; } = string.Empty;
        
        [Required]
        [StringLength(200)]
        public string CustomerEmail { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string CustomerPhone { get; set; } = string.Empty;
        
        [Required]
        [StringLength(500)]
        public string ShippingAddress { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string City { get; set; } = string.Empty;
        
        [Required]
        [StringLength(10)]
        public string ZipCode { get; set; } = string.Empty;
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal ShippingCost { get; set; }
        
        [Required]
        [StringLength(50)]
        public string PaymentMethod { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string DeliveryType { get; set; } = string.Empty;
        
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        
        public DateTime? ShippedDate { get; set; }
        
        public DateTime EstimatedDeliveryStart { get; set; }
        
        public DateTime EstimatedDeliveryEnd { get; set; }
        
        // Navigation Properties
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
    
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        
        [Required]
        [StringLength(200)]
        public string ProductName { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Size { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string? Frame { get; set; }
        
        public int Quantity { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }
        
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalPrice { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        // Navigation Properties
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; } = null!;
    }
    
    public enum OrderStatus
    {
        Pending = 1,
        Processing = 2,
        Shipped = 3,
        Delivered = 4,
        Cancelled = 5
    }
}
