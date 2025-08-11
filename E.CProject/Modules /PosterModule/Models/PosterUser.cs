namespace YourECommerceProject.Modules.PosterModule.Models;

public class PosterUser
{
    public Guid Id { get; set; }
    public int? ExistingUserId { get; set; } // Foreign key to your existing User table
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
    public virtual ICollection<PosterOrder> PosterOrders { get; set; } = new List<PosterOrder>();
    public virtual ICollection<PosterReview> PosterReviews { get; set; } = new List<PosterReview>();
    public virtual ICollection<PosterCartItem> PosterCartItems { get; set; } = new List<PosterCartItem>();
    public virtual User? ExistingUser { get; set; }
}
