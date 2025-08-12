namespace YourECommerceProject.Modules.PosterModule.DTOs;

public record PosterCategoryDto(
    int Id,
    string Name,
    string? Description,
    int? ParentCategoryId,
    string? ParentCategoryName,
    List<PosterCategoryDto> SubCategories
);

public record CreatePosterCategoryDto(
    string Name,
    string? Description,
    int? ParentCategoryId
);

public record UpdatePosterCategoryDto(
    string Name,
    string? Description,
    int? ParentCategoryId
);
