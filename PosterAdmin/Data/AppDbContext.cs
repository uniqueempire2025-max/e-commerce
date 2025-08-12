using Microsoft.EntityFrameworkCore;
using PosterAdmin.Models;

namespace PosterAdmin.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure Order entity
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.OrderNumber).IsRequired().HasMaxLength(50);
                entity.HasIndex(e => e.OrderNumber).IsUnique();
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(10,2)");
                entity.Property(e => e.ShippingCost).HasColumnType("decimal(10,2)");
            });
            
            // Configure OrderItem entity
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UnitPrice).HasColumnType("decimal(10,2)");
                entity.Property(e => e.TotalPrice).HasColumnType("decimal(10,2)");
                
                entity.HasOne(e => e.Order)
                      .WithMany(e => e.OrderItems)
                      .HasForeignKey(e => e.OrderId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
