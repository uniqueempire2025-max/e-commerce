namespace YourECommerceProject.Modules.PosterModule.DTOs;

public record PosterDto(
    Guid Id,
    string Title,
    string Description,
    decimal Price,
    int CategoryId,
    string CategoryName,
    List<string> Tags,
    List<PosterImageDto> Images,
    DateTime CreatedAt,
    int ViewCount,
    int SalesCount,
    double AverageRating,
    int ReviewCount
);

public record CreatePosterDto(
    string Title,
    string Description,
    decimal Price,
    int CategoryId,
    List<string> Tags
);

public record PosterImageDto(
    Guid Id,
    string ImageUrl,
    string ThumbnailUrl,
    int ImageOrder,
    string? Alt
);
