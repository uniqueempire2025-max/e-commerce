namespace YourECommerceProject.Modules.PosterModule.Models;

public class Poster
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string Tags { get; set; } = "[]"; // JSON array
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public int ViewCount { get; set; } = 0;
    public int SalesCount { get; set; } = 0;

    // Navigation properties
    public virtual PosterCategory Category { get; set; } = null!;
    public virtual ICollection<PosterImage> Images { get; set; } = new List<PosterImage>();
    public virtual ICollection<PosterOrderItem> OrderItems { get; set; } = new List<PosterOrderItem>();
    public virtual ICollection<PosterReview> Reviews { get; set; } = new List<PosterReview>();
    public virtual ICollection<PosterCartItem> CartItems { get; set; } = new List<PosterCartItem>();
}

// PosterCategory
public class PosterCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int? ParentCategoryId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual PosterCategory? ParentCategory { get; set; }
    public virtual ICollection<PosterCategory> SubCategories { get; set; } = new List<PosterCategory>();
    public virtual ICollection<Poster> Posters { get; set; } = new List<Poster>();
}

// PosterImage
public class PosterImage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PosterId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public int ImageOrder { get; set; } = 1;
    public string? Alt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public virtual Poster Poster { get; set; } = null!;
}

// PosterOrder
public class PosterOrder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Status { get; set; } = "Pending";
    public decimal TotalAmount { get; set; }
    public string ShippingAddress { get; set; } = "{}"; // JSON
    public string? PaymentMethod { get; set; }
    public string? PaymentStatus { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual PosterUser User { get; set; } = null!;
    public virtual ICollection<PosterOrderItem> OrderItems { get; set; } = new List<PosterOrderItem>();
}

// PosterOrderItem
public class PosterOrderItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public Guid PosterId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }

    public virtual PosterOrder Order { get; set; } = null!;
    public virtual Poster Poster { get; set; } = null!;
}

// PosterCartItem
public class PosterCartItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid PosterId { get; set; }
    public int Quantity { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public virtual PosterUser User { get; set; } = null!;
    public virtual Poster Poster { get; set; } = null!;
}

// PosterReview
public class PosterReview
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PosterId { get; set; }
    public Guid UserId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public virtual Poster Poster { get; set; } = null!;
    public virtual PosterUser User { get; set; } = null!;
}
