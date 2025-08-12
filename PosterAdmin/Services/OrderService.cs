using AutoMapper;
using PosterAdmin.DTOs;
using PosterAdmin.Models;
using PosterAdmin.Repositories;

namespace PosterAdmin.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        
        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<OrderListDto>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();
            return _mapper.Map<IEnumerable<OrderListDto>>(orders);
        }
        
        public async Task<OrderDetailDto?> GetOrderDetailsAsync(int id)
        {
            var order = await _orderRepository.GetOrderWithItemsAsync(id);
            return order != null ? _mapper.Map<OrderDetailDto>(order) : null;
        }
        
        public async Task<bool> UpdateOrderStatusAsync(UpdateOrderStatusDto updateDto)
        {
            return await _orderRepository.UpdateOrderStatusAsync(
                updateDto.OrderId, 
                updateDto.Status, 
                updateDto.ShippedDate
            );
        }
        
        public async Task<OrderStatsDto> GetOrderStatsAsync()
        {
            var (total, pending, processing, shipped, delivered) = await _orderRepository.GetOrderStatsAsync();
            var (totalRevenue, todayRevenue) = await _orderRepository.GetRevenueStatsAsync();
            
            return new OrderStatsDto
            {
                TotalOrders = total,
                PendingOrders = pending,
                ProcessingOrders = processing,
                ShippedOrders = shipped,
                DeliveredOrders = delivered,
                TotalRevenue = totalRevenue,
                TodayRevenue = todayRevenue
            };
        }
        
        public async Task<IEnumerable<OrderListDto>> GetOrdersByStatusAsync(string status)
        {
            if (!Enum.TryParse<OrderStatus>(status, true, out var orderStatus))
            {
                return Enumerable.Empty<OrderListDto>();
            }
            
            var orders = await _orderRepository.GetOrdersByStatusAsync(orderStatus);
            return _mapper.Map<IEnumerable<OrderListDto>>(orders);
        }
        
        public async Task<IEnumerable<OrderListDto>> GetOrdersByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var orders = await _orderRepository.GetOrdersByDateRangeAsync(startDate, endDate);
            return _mapper.Map<IEnumerable<OrderListDto>>(orders);
        }
    }
}
