namespace YourECommerceProject.Modules.PosterModule.Repositories;

public interface IPosterCategoryRepository : IRepository<PosterCategory>
{
    Task<IEnumerable<PosterCategory>> GetActiveAsync();
    Task<IEnumerable<PosterCategory>> GetByParentIdAsync(int? parentId);
}

public class PosterCategoryRepository : IPosterCategoryRepository
{
    private readonly YourExistingDbContext _context;
    private readonly DbSet<PosterCategory> _dbSet;

    public PosterCategoryRepository(YourExistingDbContext context)
    {
        _context = context;
        _dbSet = context.PosterCategories;
    }

    public async Task<PosterCategory?> GetByIdAsync(object id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<PosterCategory>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<PosterCategory> AddAsync(PosterCategory entity)
    {
        _dbSet.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<PosterCategory> UpdateAsync(PosterCategory entity)
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
        return await _dbSet.AnyAsync(e => e.Id == (int)id);
    }

    public async Task<IEnumerable<PosterCategory>> GetActiveAsync()
    {
        return await _dbSet
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<IEnumerable<PosterCategory>> GetByParentIdAsync(int? parentId)
    {
        return await _dbSet
            .Where(c => c.ParentCategoryId == parentId && c.IsActive)
            .Include(c => c.SubCategories.Where(sc => sc.IsActive))
            .OrderBy(c => c.Name)
            .ToListAsync();
    }
}
