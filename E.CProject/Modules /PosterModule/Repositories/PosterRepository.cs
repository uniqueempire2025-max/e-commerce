namespace YourECommerceProject.Modules.PosterModule.Repositories;

public interface IPosterRepository : IRepository<Poster>
{
    Task<PagedResult<Poster>> GetPagedAsync(int page, int pageSize, string? search = null, int? categoryId = null);
    Task<IEnumerable<Poster>> GetByCategoryAsync(int categoryId);
    Task<IEnumerable<Poster>> GetFeaturedAsync(int count = 10);
    Task IncrementViewCountAsync(Guid posterId);
}

public class PosterRepository : IPosterRepository
{
    private readonly YourExistingDbContext _context; // Use your existing context
    private readonly DbSet<Poster> _dbSet;

    public PosterRepository(YourExistingDbContext context)
    {
        _context = context;
        _dbSet = context.Posters;
    }

    public async Task<Poster?> GetByIdAsync(object id)
    {
        return await _context.Posters
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.ImageOrder))
            .Include(p => p.Reviews)
            .FirstOrDefaultAsync(p => p.Id == (Guid)id);
    }

    public async Task<IEnumerable<Poster>> GetAllAsync()
    {
        return await _dbSet.Where(p => p.IsActive).ToListAsync();
    }

    public async Task<Poster> AddAsync(Poster entity)
    {
        _dbSet.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Poster> UpdateAsync(Poster entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(object id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return false;

        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(object id)
    {
        return await _dbSet.AnyAsync(e => e.Id == (Guid)id);
    }

    public async Task<PagedResult<Poster>> GetPagedAsync(int page, int pageSize, string? search = null, int? categoryId = null)
    {
        var query = _context.Posters
            .Where(p => p.IsActive)
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.ImageOrder))
            .Include(p => p.Reviews)
            .AsQueryable();

        // Apply search filter
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p => p.Title.Contains(search) || 
                                   p.Description.Contains(search) || 
                                   p.Tags.Contains(search));
        }

        // Apply category filter
        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        var totalCount = await query.CountAsync();
        var posters = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Poster>
        {
            Data = posters,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<IEnumerable<Poster>> GetByCategoryAsync(int categoryId)
    {
        return await _context.Posters
            .Where(p => p.CategoryId == categoryId && p.IsActive)
            .Include(p => p.Images.OrderBy(i => i.ImageOrder))
            .Include(p => p.Reviews)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<IEnumerable<Poster>> GetFeaturedAsync(int count = 10)
    {
        return await _context.Posters
            .Where(p => p.IsActive)
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.ImageOrder))
            .Include(p => p.Reviews)
            .OrderByDescending(p => p.ViewCount)
            .ThenByDescending(p => p.SalesCount)
            .Take(count)
            .ToListAsync();
    }

    public async Task IncrementViewCountAsync(Guid posterId)
    {
        await _context.Database.ExecuteSqlRawAsync(
            "UPDATE Posters SET ViewCount = ViewCount + 1 WHERE Id = {0}", 
            posterId);
    }
} 
