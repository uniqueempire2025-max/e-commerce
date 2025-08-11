public record PosterOrderDto(
    Guid Id,
    Guid UserId,
    string Status,
    decimal TotalAmount,
    object ShippingAddress, // Will be deserialized from JSON
    string? PaymentMethod,
    string? PaymentStatus,
    DateTime CreatedAt,
    List<PosterOrderItemDto> OrderItems
);

public record PosterOrderItemDto(
    Guid Id,
    Guid PosterId,
    string PosterTitle,
    int Quantity,
    decimal UnitPrice,
    decimal TotalPrice
);

public record CreatePosterOrderDto(
    Guid UserId,
    object ShippingAddress,
    string? PaymentMethod,
    List<CreatePosterOrderItemDto> OrderItems
);

public record CreatePosterOrderItemDto(
    Guid PosterId,
    int Quantity
);
