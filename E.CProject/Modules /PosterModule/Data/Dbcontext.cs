namespace YourECommerceProject.Modules.PosterModule.Data;

public class PosterDbContext : DbContext
{
    public PosterDbContext(DbContextOptions<PosterDbContext> options) : base(options) { }

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
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PosterDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
