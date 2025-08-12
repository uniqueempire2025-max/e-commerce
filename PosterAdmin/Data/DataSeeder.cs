using Microsoft.EntityFrameworkCore;
using PosterAdmin.Models;

namespace PosterAdmin.Data
{
    public static class DataSeeder
    {
        public static async Task SeedDataAsync(AppDbContext context)
        {
            if (!await context.Orders.AnyAsync())
            {
                var sampleOrders = new List<Order>
                {
                    new Order
                    {
                        OrderNumber = "POS-2025-001",
                        CustomerName = "Ahmed Mahmoud",
                        CustomerEmail = "ahmed.mahmoud@email.com",
                        CustomerPhone = "+20 100 123 4567",
                        ShippingAddress = "15 Tahrir Square, Downtown",
                        City = "Cairo",
                        ZipCode = "11511",
                        TotalAmount = 250.00m,
                        ShippingCost = 20.00m,
                        PaymentMethod = "Credit Card",
                        DeliveryType = "Express Delivery",
                        Status = OrderStatus.Processing,
                        OrderDate = DateTime.UtcNow.AddDays(-5),
                        EstimatedDeliveryStart = DateTime.UtcNow.AddDays(2),
                        EstimatedDeliveryEnd = DateTime.UtcNow.AddDays(4),
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                ProductName = "Islamic Calligraphy Poster",
                                Size = "A3",
                                Frame = "Golden Frame",
                                Quantity = 2,
                                UnitPrice = 95.00m,
                                TotalPrice = 190.00m,
                                ImageUrl = "/images/islamic-calligraphy.jpg"
                            },
                            new OrderItem
                            {
                                ProductName = "Cairo Skyline Poster",
                                Size = "A4",
                                Frame = "Black Frame",
                                Quantity = 1,
                                UnitPrice = 60.00m,
                                TotalPrice = 60.00m,
                                ImageUrl = "/images/cairo-skyline.jpg"
                            }
                        }
                    },
                    new Order
                    {
                        OrderNumber = "POS-2025-002",
                        CustomerName = "Fatma Hassan",
                        CustomerEmail = "fatma.hassan@email.com",
                        CustomerPhone = "+20 111 987 6543",
                        ShippingAddress = "42 Zamalek Street, Zamalek",
                        City = "Cairo",
                        ZipCode = "11211",
                        TotalAmount = 180.00m,
                        ShippingCost = 15.00m,
                        PaymentMethod = "PayPal",
                        DeliveryType = "Standard Delivery",
                        Status = OrderStatus.Shipped,
                        OrderDate = DateTime.UtcNow.AddDays(-3),
                        ShippedDate = DateTime.UtcNow.AddDays(-1),
                        EstimatedDeliveryStart = DateTime.UtcNow.AddDays(1),
                        EstimatedDeliveryEnd = DateTime.UtcNow.AddDays(3),
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                ProductName = "Motivational Quote Poster",
                                Size = "A2",
                                Frame = "White Frame",
                                Quantity = 1,
                                UnitPrice = 120.00m,
                                TotalPrice = 120.00m,
                                ImageUrl = "/images/motivational-quote.jpg"
                            },
                            new OrderItem
                            {
                                ProductName = "Nature Landscape",
                                Size = "A4",
                                Frame = null,
                                Quantity = 1,
                                UnitPrice = 45.00m,
                                TotalPrice = 45.00m,
                                ImageUrl = "/images/nature-landscape.jpg"
                            }
                        }
                    },
                    new Order
                    {
                        OrderNumber = "POS-2025-003",
                        CustomerName = "Omar Ali",
                        CustomerEmail = "omar.ali@email.com",
                        CustomerPhone = "+20 122 456 7890",
                        ShippingAddress = "88 New Cairo, 5th Settlement",
                        City = "New Cairo",
                        ZipCode = "11835",
                        TotalAmount = 320.00m,
                        ShippingCost = 25.00m,
                        PaymentMethod = "Bank Transfer",
                        DeliveryType = "Express Delivery",
                        Status = OrderStatus.Pending,
                        OrderDate = DateTime.UtcNow.AddDays(-1),
                        EstimatedDeliveryStart = DateTime.UtcNow.AddDays(3),
                        EstimatedDeliveryEnd = DateTime.UtcNow.AddDays(5),
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                ProductName = "Abstract Art Collection",
                                Size = "A1",
                                Frame = "Premium Black Frame",
                                Quantity = 3,
                                UnitPrice = 98.33m,
                                TotalPrice = 295.00m,
                                ImageUrl = "/images/abstract-art.jpg"
                            }
                        }
                    }
                };

                await context.Orders.AddRangeAsync(sampleOrders);
                await context.SaveChangesAsync();
            }
        }
    }
}
