using Microsoft.EntityFrameworkCore;
using PosterAdmin.Data;
using PosterAdmin.Models;

namespace PosterAdmin.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }
        
        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }
        
        public async Task<Order?> GetOrderWithItemsAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
        
        public async Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus status, DateTime? shippedDate = null)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return false;
            
            order.Status = status;
            if (shippedDate.HasValue)
            {
                order.ShippedDate = shippedDate.Value;
            }
            
            await _context.SaveChangesAsync();
            return true;
        }
        
        public async Task<(int total, int pending, int processing, int shipped, int delivered)> GetOrderStatsAsync()
        {
            var stats = await _context.Orders
                .GroupBy(o => 1)
                .Select(g => new
                {
                    Total = g.Count(),
                    Pending = g.Count(o => o.Status == OrderStatus.Pending),
                    Processing = g.Count(o => o.Status == OrderStatus.Processing),
                    Shipped = g.Count(o => o.Status == OrderStatus.Shipped),
                    Delivered = g.Count(o => o.Status == OrderStatus.Delivered)
                })
                .FirstOrDefaultAsync();
            
            return stats != null 
                ? (stats.Total, stats.Pending, stats.Processing, stats.Shipped, stats.Delivered)
                : (0, 0, 0, 0, 0);
        }
        
        public async Task<(decimal total, decimal today)> GetRevenueStatsAsync()
        {
            var today = DateTime.Today;
            
            var revenue = await _context.Orders
                .Where(o => o.Status != OrderStatus.Cancelled)
                .GroupBy(o => 1)
                .Select(g => new
                {
                    Total = g.Sum(o => o.TotalAmount),
                    Today = g.Where(o => o.OrderDate.Date == today).Sum(o => o.TotalAmount)
                })
                .FirstOrDefaultAsync();
            
            return revenue != null ? (revenue.Total, revenue.Today) : (0, 0);
        }
        
        public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus status)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.Status == status)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<Order>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .Where(o => o.OrderDate.Date >= startDate.Date && o.OrderDate.Date <= endDate.Date)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }
    }
}
