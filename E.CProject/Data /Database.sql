-- Poster Categories Table
CREATE TABLE PosterCategories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,
    ParentCategoryId INT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (ParentCategoryId) REFERENCES PosterCategories(Id)
);

-- Posters Table
CREATE TABLE Posters (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(2000) NULL,
    Price DECIMAL(10,2) NOT NULL,
    CategoryId INT NOT NULL,
    Tags NVARCHAR(500) NULL, -- JSON array of tags
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    ViewCount INT DEFAULT 0,
    SalesCount INT DEFAULT 0,
    FOREIGN KEY (CategoryId) REFERENCES PosterCategories(Id),
    INDEX IX_Posters_Category_Price (CategoryId, Price),
    INDEX IX_Posters_CreatedAt (CreatedAt DESC),
    INDEX IX_Posters_IsActive (IsActive),
    INDEX IX_Posters_Title (Title)
);

-- Poster Images Table
CREATE TABLE PosterImages (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PosterId UNIQUEIDENTIFIER NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    ThumbnailUrl NVARCHAR(500) NOT NULL,
    ImageOrder INT DEFAULT 1,
    Alt NVARCHAR(255) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (PosterId) REFERENCES Posters(Id) ON DELETE CASCADE,
    INDEX IX_PosterImages_PosterId_Order (PosterId, ImageOrder)
);

-- Poster Users Table (separate from your existing Users)
CREATE TABLE PosterUsers (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ExistingUserId INT NULL, -- Link to your existing User table if needed
    Email NVARCHAR(255) UNIQUE NOT NULL,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(20) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    IsActive BIT DEFAULT 1,
    INDEX IX_PosterUsers_Email (Email),
    INDEX IX_PosterUsers_IsActive (IsActive)
    -- Optional: FOREIGN KEY (ExistingUserId) REFERENCES YourExistingUserTable(Id)
);

-- Poster Orders Table
CREATE TABLE PosterOrders (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2) NOT NULL,
    ShippingAddress NVARCHAR(1000) NOT NULL, -- JSON object
    PaymentMethod NVARCHAR(50) NULL,
    PaymentStatus NVARCHAR(50) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (UserId) REFERENCES PosterUsers(Id),
    INDEX IX_PosterOrders_UserId_CreatedAt (UserId, CreatedAt DESC),
    INDEX IX_PosterOrders_Status (Status)
);

-- Poster Order Items Table
CREATE TABLE PosterOrderItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER NOT NULL,
    PosterId UNIQUEIDENTIFIER NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    TotalPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES PosterOrders(Id) ON DELETE CASCADE,
    FOREIGN KEY (PosterId) REFERENCES Posters(Id)
);

-- Poster Shopping Cart Table
CREATE TABLE PosterCartItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    PosterId UNIQUEIDENTIFIER NOT NULL,
    Quantity INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (UserId) REFERENCES PosterUsers(Id) ON DELETE CASCADE,
    FOREIGN KEY (PosterId) REFERENCES Posters(Id),
    UNIQUE (UserId, PosterId)
);

-- Poster Reviews Table
CREATE TABLE PosterReviews (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PosterId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Rating INT CHECK (Rating >= 1 AND Rating <= 5),
    Comment NVARCHAR(1000) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    FOREIGN KEY (PosterId) REFERENCES Posters(Id),
    FOREIGN KEY (UserId) REFERENCES PosterUsers(Id),
    UNIQUE (PosterId, UserId),
    INDEX IX_PosterReviews_PosterId (PosterId),
    INDEX IX_PosterReviews_Rating (Rating)
);

-- Sample Categories Data
INSERT INTO PosterCategories (Name, Description) VALUES 
('Movies', 'Movie posters and cinema art'),
('Music', 'Music band and artist posters'),
('Sports', 'Sports teams and athlete posters'),
('Art', 'Artistic and decorative posters'),
('Vintage', 'Classic and retro style posters');
GO
