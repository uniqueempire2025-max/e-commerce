using PosterAdmin.Models;

namespace PosterAdmin.Repositories
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order?> GetOrderByIdAsync(int id);
        Task<Order?> GetOrderWithItemsAsync(int id);
        Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus status, DateTime? shippedDate = null);
        Task<(int total, int pending, int processing, int shipped, int delivered)> GetOrderStatsAsync();
        Task<(decimal total, decimal today)> GetRevenueStatsAsync();
        Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus status);
        Task<IEnumerable<Order>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
