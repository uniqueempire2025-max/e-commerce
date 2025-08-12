# Poster Admin Backend - Complete Setup Guide

## 🏗️ Project Structure

```
PosterAdmin/
├── Controllers/
│   └── OrdersController.cs
├── Data/
│   └── AppDbContext.cs
├── DTOs/
│   └── OrderDTOs.cs
├── Mappers/
│   └── OrderMapper.cs
├── Models/
│   ├── Order.cs
│   └── OrderItem.cs
├── Repositories/
│   ├── IOrderRepository.cs
│   └── OrderRepository.cs
├── Services/
│   ├── IOrderService.cs
│   └── OrderService.cs
├── appsettings.json
├── appsettings.Development.json
├── Program.cs
└── PosterAdmin.csproj
```

## 📦 Required NuGet Packages

Add these packages to your `.csproj` file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
    <PackageReference Include="AutoMapper" Version="12.0.1" />
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>

</Project>
```

## 🔧 Installation Commands

```bash
# Create new project
dotnet new webapi -n PosterAdmin
cd PosterAdmin

# Add required packages
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package AutoMapper
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package Swashbuckle.AspNetCore

# Create database migration
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## 🗄️ Database Setup

### Option 1: Entity Framework Migration
```bash
# Add migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update
```

### Option 2: Direct T-SQL Script
```sql
-- Create Database
CREATE DATABASE PosterAdminDb;
USE PosterAdminDb;

-- Create Orders Table
CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderNumber NVARCHAR(50) NOT NULL UNIQUE,
    CustomerName NVARCHAR(100) NOT NULL,
    CustomerEmail NVARCHAR(200) NOT NULL,
    CustomerPhone NVARCHAR(20) NOT NULL,
    ShippingAddress NVARCHAR(500) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    ZipCode NVARCHAR(10) NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    ShippingCost DECIMAL(10,2) NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    DeliveryType NVARCHAR(50) NOT NULL,
    Status INT NOT NULL DEFAULT 1,
    OrderDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ShippedDate DATETIME2 NULL,
    EstimatedDeliveryStart DATETIME2 NOT NULL,
    EstimatedDeliveryEnd DATETIME2 NOT NULL
);

-- Create OrderItems Table
CREATE TABLE OrderItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductName NVARCHAR(200) NOT NULL,
    Size NVARCHAR(100) NOT NULL,
    Frame NVARCHAR(100) NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    TotalPrice DECIMAL(10,2) NOT NULL,
    ImageUrl NVARCHAR(500) NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
);

-- Create Indexes
CREATE INDEX IX_Orders_Status ON Orders(Status);
CREATE INDEX IX_Orders_OrderDate ON Orders(OrderDate);
CREATE INDEX IX_Orders_OrderNumber ON Orders(OrderNumber);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);

-- Insert Sample Data
INSERT INTO Orders (OrderNumber, CustomerName, CustomerEmail, CustomerPhone, ShippingAddress, City, ZipCode, TotalAmount, ShippingCost, PaymentMethod, DeliveryType, Status, EstimatedDeliveryStart, EstimatedDeliveryEnd)
VALUES 
('12345', 'Ahmed Elhalabi', 'ahmed@example.com', '+1 (555) 123-4567', '123 Main Street', 'New York', '10001', 177.00, 12.00, 'Credit Card', 'Express Delivery', 1, '2025-08-18', '2025-08-21'),
('12346', 'Sarah Johnson', 'sarah@example.com', '+1 (555) 987-6543', '456 Oak Avenue', 'Los Angeles', '90210', 89.99, 5.00, 'PayPal', 'Standard Delivery', 2, '2025-08-20', '2025-08-25'),
('12347', 'Mike Brown', 'mike@example.com', '+1 (555) 456-7890', '789 Pine Street', 'Chicago', '60601', 234.50, 12.00, 'Credit Card', 'Express Delivery', 3, '2025-08-19', '2025-08-22');

INSERT INTO OrderItems (OrderId, ProductName, Size, Frame, Quantity, UnitPrice, TotalPrice, ImageUrl)
VALUES 
(1, 'Custom Poster - Waterfall', '11x14"', 'Black Frame', 3, 55.00, 165.00, '/images/waterfall-poster.jpg'),
(2, 'Abstract Art Poster', '8x10"', 'Natural Frame', 1, 84.99, 84.99, '/images/abstract-poster.jpg'),
(3, 'Nature Photography', '16x20"', 'Dark Frame', 2, 111.25, 222.50, '/images/nature-poster.jpg');
```

## ⚙️ Configuration Files

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=PosterAdminDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Cors": {
    "AllowedOrigins": ["http://localhost:3000", "https://localhost:3001"]
  }
}
```

### appsettings.Development.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=PosterAdminDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

## 🚀 Running the Application

```bash
# Restore packages
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run

# Or run with watch (auto-reload on changes)
dotnet watch run
```

The API will be available at:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`
- **Swagger UI**: `https://localhost:5001/swagger`

## 📋 API Endpoints

### Orders Management
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/stats` - Get order statistics
- `GET /api/orders/status/{status}` - Get orders by status
- `GET /api/orders/date-range?startDate={start}&endDate={end}` - Get orders by date range
- `PUT /api/orders/status` - Update order status

### Example API Calls

```javascript
// Get all orders
fetch('https://localhost:5001/api/orders')
  .then(response => response.json())
  .then(data => console.log(data));

// Get order statistics
fetch('https://localhost:5001/api/orders/stats')
  .then(response => response.json())
  .then(data => console.log(data));

// Update order status
fetch('https://localhost:5001/api/orders/status', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    orderId: 1,
    status: 2, // Processing
    shippedDate: null
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🎯 Key Features Implemented

### ✅ Clean Architecture
- **Models**: Pure entity classes
- **DTOs**: Data transfer objects for API communication
- **Repositories**: Data access layer with interface abstraction
- **Services**: Business logic layer
- **Controllers**: API endpoints
- **Mappers**: AutoMapper for object transformations

### ✅ Best Practices Applied
1. **Dependency Injection**: All services registered in DI container
2. **Repository Pattern**: Data access abstraction
3. **Service Layer**: Business logic separation
4. **AutoMapper**: Automatic object mapping
5. **Async/Await**: Non-blocking operations
6. **Entity Framework Core**: ORM with LINQ
7. **Error Handling**: Proper HTTP status codes
8. **CORS Support**: Cross-origin resource sharing
9. **Swagger Documentation**: API documentation

### ✅ Performance Optimizations
- **Indexes**: Database indexes for better query performance
- **Async Operations**: Non-blocking database calls
- **Include Strategy**: Efficient loading of related data
- **Projection**: Only select required fields
- **Caching Ready**: Structure supports future caching implementation

## 🔗 Frontend Integration

### Update API Base URL
In the admin frontend HTML file, update the API URL:

```javascript
const API_BASE_URL = 'https://localhost:5001/api'; // Your actual API URL
```

### CORS Configuration
The backend is configured to allow cross-origin requests. If you need specific origins:

```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000", "https://yourdomain.com")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

## 🧪 Testing the API

### Using Swagger UI
1. Run the application: `dotnet run`
2. Open browser: `https://localhost:5001/swagger`
3. Test endpoints directly from the UI

### Using Postman/curl

```bash
# Get all orders
curl -X GET "https://localhost:5001/api/orders" -H "accept: application/json"

# Get order statistics
curl -X GET "https://localhost:5001/api/orders/stats" -H "accept: application/json"

# Update order status
curl -X PUT "https://localhost:5001/api/orders/status" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "status": 2,
    "shippedDate": "2025-08-12T10:00:00Z"
  }'
```

## 🚀 Deployment Options

### 1. IIS Deployment
```bash
# Publish for IIS
dotnet publish -c Release -o ./publish

# Copy files to IIS wwwroot
# Configure IIS application pool for .NET 8
```

### 2. Azure App Service
```bash
# Install Azure CLI
az login

# Create resource group
az group create --name PosterAdminRG --location eastus

# Create app service plan
az appservice plan create --name PosterAdminPlan --resource-group PosterAdminRG --sku B1

# Create web app
az webapp create --name PosterAdminAPI --resource-group PosterAdminRG --plan PosterAdminPlan --runtime "DOTNETCORE|8.0"

# Deploy from local Git
az webapp deployment source config-local-git --name PosterAdminAPI --resource-group PosterAdminRG
```

### 3. Docker Deployment

#### Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PosterAdmin.csproj", "."]
RUN dotnet restore "./PosterAdmin.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "PosterAdmin.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PosterAdmin.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PosterAdmin.dll"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  posteradmin-api:
    build: .
    ports:
      - "5000:80"
      - "5001:443"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=sql-server;Database=PosterAdminDb;User Id=sa;Password=YourPassword123;TrustServerCertificate=true
    depends_on:
      - sql-server

  sql-server:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourPassword123
    ports:
      - "1433:1433"
    volumes:
      - sql-data:/var/opt/mssql

volumes:
  sql-data:
```

## 🔧 Advanced Configuration

### Environment Variables
```bash
# Development
export ASPNETCORE_ENVIRONMENT=Development
export ConnectionStrings__DefaultConnection="Server=localhost;Database=PosterAdminDb;Trusted_Connection=true"

# Production
export ASPNETCORE_ENVIRONMENT=Production
export ConnectionStrings__DefaultConnection="Server=prod-server;Database=PosterAdminDb;User Id=admin;Password=SecurePassword123"
```

### Logging Configuration
```json
{
  "Serilog": {
    "Using": ["Serilog.Sinks.File", "Serilog.Sinks.Console"],
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      {
        "Name": "Console"
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/posteradmin-.log",
          "rollingInterval": "Day",
          "retainedFileCountLimit": 30
        }
      }
    ]
  }
}
```

## 📊 Monitoring & Health Checks

### Add Health Checks
```csharp
// In Program.cs
builder.Services.AddHealthChecks()
    .AddDbContext<AppDbContext>()
    .AddSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

// Configure pipeline
app.MapHealthChecks("/health");
```

### Application Insights (Azure)
```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

## 🔒 Security Considerations

### Add Authentication (if needed)
```csharp
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://your-auth-server";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization();

// In controller
[Authorize]
[ApiController]
public class OrdersController : ControllerBase
{
    // Controller actions
}
```

### Rate Limiting
```csharp
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("ApiLimiter", options =>
    {
        options.PermitLimit = 100;
        options.Window = TimeSpan.FromMinutes(1);
    });
});

app.UseRateLimiter();
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check SQL Server is running
   sqlcmd -S (localdb)\mssqllocaldb -Q "SELECT @@VERSION"
   
   # Test connection string
   dotnet ef database update --verbose
   ```

2. **CORS Issues**
   ```csharp
   // Ensure CORS is properly configured
   app.UseCors(); // Add before UseAuthorization
   ```

3. **Port Conflicts**
   ```json
   // In launchSettings.json
   {
     "profiles": {
       "PosterAdmin": {
         "applicationUrl": "https://localhost:7000;http://localhost:5000"
       }
     }
   }
   ```

### Debug Mode
```bash
# Run with detailed logging
dotnet run --environment Development --verbosity detailed
```

## 📈 Performance Monitoring

### Add Response Time Logging
```csharp
public class ResponseTimeMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ResponseTimeMiddleware> _logger;

    public ResponseTimeMiddleware(RequestDelegate next, ILogger<ResponseTimeMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        await _next(context);
        stopwatch.Stop();
        
        _logger.LogInformation("Request {Method} {Path} took {ElapsedMilliseconds}ms", 
            context.Request.Method, 
            context.Request.Path, 
            stopwatch.ElapsedMilliseconds);
    }
}

// Register middleware
app.UseMiddleware<ResponseTimeMiddleware>();
```

## 🎯 Next Steps & Enhancements

### Immediate Improvements
1. **Add Input Validation**: Use FluentValidation
2. **Implement Caching**: Redis or in-memory caching
3. **Add Pagination**: For large order lists
4. **Error Handling**: Global exception handling middleware
5. **API Versioning**: Support multiple API versions

### Future Features
1. **Real-time Updates**: SignalR for live order updates
2. **File Upload**: Image upload for custom posters
3. **Email Notifications**: Send order updates to customers
4. **Reporting**: Advanced analytics and reports
5. **Inventory Management**: Track poster stock levels

### Sample Enhancement - Pagination
```csharp
public class PaginatedResult<T>
{
    public List<T> Data { get; set; } = new();
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}

// In repository
public async Task<PaginatedResult<Order>> GetOrdersPaginatedAsync(int pageNumber, int pageSize)
{
    var totalCount = await _context.Orders.CountAsync();
    var orders = await _context.Orders
        .Include(o => o.OrderItems)
        .OrderByDescending(o => o.OrderDate)
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return new PaginatedResult<Order>
    {
        Data = orders,
        TotalCount = totalCount,
        PageNumber = pageNumber,
        PageSize = pageSize
    };
}
```

This completes the comprehensive setup guide for your Poster Admin Backend system! 🚀
