namespace YourECommerceProject;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Your existing service registrations (UNCHANGED)
        builder.Services.AddDbContext<YourExistingDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        
        // ADD the poster module
        builder.Services.AddPosterModule();

        // Your existing registrations continue...
        builder.Services.AddControllers();

        var app = builder.Build();

        // Your existing middleware configuration (UNCHANGED)
        
        app.Run();
    }
}
