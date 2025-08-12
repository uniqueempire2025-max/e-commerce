using PosterAdmin.DTOs;

namespace PosterAdmin.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderListDto>> GetAllOrdersAsync();
        Task<OrderDetailDto?> GetOrderDetailsAsync(int id);
        Task<bool> UpdateOrderStatusAsync(UpdateOrderStatusDto updateDto);
        Task<OrderStatsDto> GetOrderStatsAsync();
        Task<IEnumerable<OrderListDto>> GetOrdersByStatusAsync(string status);
        Task<IEnumerable<OrderListDto>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
