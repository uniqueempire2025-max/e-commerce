namespace YourECommerceProject.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPosterModule(this IServiceCollection services)
    {
        // Register poster-specific repositories
        services.AddScoped<IPosterRepository, PosterRepository>();
        services.AddScoped<IPosterCategoryRepository, PosterCategoryRepository>();

        // Register poster-specific services
        services.AddScoped<PosterService>();
        services.AddScoped<PosterCategoryService>();

        // Register AutoMapper profile
        services.AddAutoMapper(typeof(PosterMappingProfile));

        return services;
    }
}
