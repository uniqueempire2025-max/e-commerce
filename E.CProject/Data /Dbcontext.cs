namespace YourECommerceProject.Data;

public partial class YourExistingDbContext : DbContext
{
    // Your existing DbSets remain unchanged
    
    // ADD these new DbSets for posters:
    public DbSet<Poster> Posters { get; set; }
    public DbSet<PosterCategory> PosterCategories { get; set; }
    public DbSet<PosterImage> PosterImages { get; set; }
    public DbSet<PosterUser> PosterUsers { get; set; }
    public DbSet<PosterOrder> PosterOrders { get; set; }
    public DbSet<PosterOrderItem> PosterOrderItems { get; set; }
    public DbSet<PosterCartItem> PosterCartItems { get; set; }
    public DbSet<PosterReview> PosterReviews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // Keep your existing configurations
        
        // ADD poster-specific configurations:
        ConfigurePosterEntities(modelBuilder);
    }

    private void ConfigurePosterEntities(ModelBuilder modelBuilder)
    {
        // Poster configuration
        modelBuilder.Entity<Poster>(entity =>
        {
            entity.ToTable("Posters");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.Price).HasColumnType("decimal(10,2)");
            entity.Property(e => e.Tags).HasMaxLength(500);
            
            entity.HasIndex(e => new { e.CategoryId, e.Price });
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.IsActive);
        });

        // PosterCategory configuration
        modelBuilder.Entity<PosterCategory>(entity =>
        {
            entity.ToTable("PosterCategories");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(500);
            
            entity.HasOne(e => e.ParentCategory)
                .WithMany(e => e.SubCategories)
                .HasForeignKey(e => e.ParentCategoryId);
        });

        // PosterImage configuration
        modelBuilder.Entity<PosterImage>(entity =>
        {
            entity.ToTable("PosterImages");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ImageUrl).HasMaxLength(500).IsRequired();
            entity.Property(e => e.ThumbnailUrl).HasMaxLength(500).IsRequired();
            entity.Property(e => e.Alt).HasMaxLength(255);
            
            entity.HasOne(e => e.Poster)
                .WithMany(e => e.Images)
                .HasForeignKey(e => e.PosterId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // PosterUser configuration
        modelBuilder.Entity<PosterUser>(entity =>
        {
            entity.ToTable("PosterUsers");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).HasMaxLength(255).IsRequired();
            entity.Property(e => e.FirstName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.LastName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.IsActive);
        });

        // Configure other poster entities similarly...
    }
}
