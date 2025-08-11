namespace YourECommerceProject.Models;

public partial class User // Make it partial if not already
{
    public virtual ICollection<PosterOrder> PosterOrders { get; set; } = new List<PosterOrder>();
    public virtual ICollection<PosterReview> PosterReviews { get; set; } = new List<PosterReview>();
    public virtual ICollection<PosterCartItem> PosterCartItems { get; set; } = new List<PosterCartItem>();
}
