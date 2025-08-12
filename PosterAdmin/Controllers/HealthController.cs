using Microsoft.AspNetCore.Mvc;
using PosterAdmin.Models;

namespace PosterAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public ActionResult<ApiResponse<object>> GetHealth()
        {
            var healthStatus = new
            {
                Status = "Healthy",
                Timestamp = DateTime.UtcNow,
                Version = "1.0.0",
                Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"
            };

            return Ok(ApiResponse<object>.SuccessResponse(healthStatus, "API is running"));
        }

        [HttpGet("database")]
        public ActionResult<ApiResponse<object>> GetDatabaseHealth([FromServices] AppDbContext context)
        {
            try
            {
                var canConnect = context.Database.CanConnect();
                var dbStatus = new
                {
                    DatabaseConnection = canConnect ? "Connected" : "Disconnected",
                    Timestamp = DateTime.UtcNow
                };

                return Ok(ApiResponse<object>.SuccessResponse(dbStatus, "Database health check completed"));
            }
            catch (Exception ex)
            {
                return Ok(ApiResponse<object>.ErrorResponse("Database connection failed", ex.Message));
            }
        }
    }
}
