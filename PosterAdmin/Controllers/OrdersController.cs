using Microsoft.AspNetCore.Mvc;
using PosterAdmin.DTOs;
using PosterAdmin.Services;

namespace PosterAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderListDto>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailDto>> GetOrderDetails(int id)
        {
            var order = await _orderService.GetOrderDetailsAsync(id);
            if (order == null)
                return NotFound($"Order with ID {id} not found");
            
            return Ok(order);
        }
        
        [HttpPut("status")]
        public async Task<IActionResult> UpdateOrderStatus([FromBody] UpdateOrderStatusDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var result = await _orderService.UpdateOrderStatusAsync(updateDto);
            if (!result)
                return NotFound($"Order with ID {updateDto.OrderId} not found");
            
            return Ok(new { message = "Order status updated successfully" });
        }
        
        [HttpGet("stats")]
        public async Task<ActionResult<OrderStatsDto>> GetOrderStats()
        {
            var stats = await _orderService.GetOrderStatsAsync();
            return Ok(stats);
        }
        
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<OrderListDto>>> GetOrdersByStatus(string status)
        {
            var orders = await _orderService.GetOrdersByStatusAsync(status);
            return Ok(orders);
        }
        
        [HttpGet("date-range")]
        public async Task<ActionResult<IEnumerable<OrderListDto>>> GetOrdersByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            if (startDate > endDate)
                return BadRequest("Start date cannot be greater than end date");
            
            var orders = await _orderService.GetOrdersByDateRangeAsync(startDate, endDate);
            return Ok(orders);
        }
    }
}
