namespace YourECommerceProject.Modules.PosterModule.Mappings;

public class PosterMappingProfile : Profile
{
    public PosterMappingProfile()
    {
        CreateMap<Poster, PosterDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => JsonSerializer.Deserialize<List<string>>(src.Tags) ?? new List<string>()))
            .ForMember(dest => dest.AverageRating, opt => opt.MapFrom(src => src.Reviews.Any() ? src.Reviews.Average(r => r.Rating) : 0))
            .ForMember(dest => dest.ReviewCount, opt => opt.MapFrom(src => src.Reviews.Count));

        CreateMap<CreatePosterDto, Poster>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => JsonSerializer.Serialize(src.Tags)))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));

        CreateMap<PosterImage, PosterImageDto>();
        CreateMap<PagedResult<Poster>, PagedResult<PosterDto>>();
    }
}
