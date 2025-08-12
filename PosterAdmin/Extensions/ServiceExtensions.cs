using Microsoft.EntityFrameworkCore;
using PosterAdmin.Data;
using PosterAdmin.Mappers;
using PosterAdmin.Repositories;
using PosterAdmin.Services;
using PosterAdmin.Middleware;

namespace PosterAdmin.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Database
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // AutoMapper
            services.AddAutoMapper(typeof(OrderMappingProfile));

            // Repositories
            services.AddScoped<IOrderRepository, OrderRepository>();

            // Services
            services.AddScoped<IOrderService, OrderService>();

            // CORS
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            return services;
        }

        public static IApplicationBuilder UseApplicationMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
            return app;
        }
    }
}
