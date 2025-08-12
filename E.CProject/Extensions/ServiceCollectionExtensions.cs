namespace YourECommerceProject.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPosterModule(this IServiceCollection services)
    {
        // Register poster-specific repositories
        services.AddScoped<IPosterRepository, PosterRepository>();
        services.AddScoped<IPosterCategoryRepository, PosterCategoryRepository>();
        services.AddScoped<IPosterUserRepository, PosterUserRepository>();

        // Register poster-specific services
        services.AddScoped<PosterService>();
        services.AddScoped<PosterCategoryService>();
        services.AddScoped<PosterUserService>();

        // Register AutoMapper profile
        services.AddAutoMapper(typeof(PosterMappingProfile));

        // Register additional services
        services.AddScoped<IPosterImageService, PosterImageService>();

        return services;
    }

    public static IServiceCollection AddPosterModuleWithSeparateDb(
        this IServiceCollection services, 
        string connectionString)
    {
        // Use this if you want a separate database for posters
        services.AddDbContext<PosterDbContext>(options =>
            options.UseSqlServer(connectionString));

        return services.AddPosterModule();
    }
}
