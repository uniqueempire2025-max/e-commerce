-- Create Database Tables (T-SQL)

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

-- Create Indexes for better performance
CREATE INDEX IX_Orders_Status ON Orders(Status);
CREATE INDEX IX_Orders_OrderDate ON Orders(OrderDate);
CREATE INDEX IX_Orders_OrderNumber ON Orders(OrderNumber);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);

-- Insert Sample Data
INSERT INTO Orders (OrderNumber, CustomerName, CustomerEmail, CustomerPhone, ShippingAddress, City, ZipCode, TotalAmount, ShippingCost, PaymentMethod, DeliveryType, Status, EstimatedDeliveryStart, EstimatedDeliveryEnd)
VALUES 
('12345', 'Ahmed Elhalabi', 'ahmed@example.com', '+1 (555) 123-4567', '123 Main Street', 'New York', '10001', 177.00, 12.00, 'Credit Card', 'Express Delivery', 1, '2025-08-18', '2025-08-21');

INSERT INTO OrderItems (OrderId, ProductName, Size, Frame, Quantity, UnitPrice, TotalPrice, ImageUrl)
VALUES 
(1, 'Custom Poster', '11x14"', 'Black Frame', 3, 55.00, 165.00, '/images/waterfall-poster.jpg');
