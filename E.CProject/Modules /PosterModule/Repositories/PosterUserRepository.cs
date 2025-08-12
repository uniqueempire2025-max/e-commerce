public interface IPosterUserRepository : IRepository<PosterUser>
{
    Task<PosterUser?> GetByEmailAsync(string email);
    Task<bool> EmailExistsAsync(string email);
    Task<PosterUser?> GetByExistingUserIdAsync(int existingUserId);
}

public class PosterUserRepository : IPosterUserRepository
{
    private readonly YourExistingDbContext _context;
    private readonly DbSet<PosterUser> _dbSet;

    public PosterUserRepository(YourExistingDbContext context)
    {
        _context = context;
        _dbSet = context.PosterUsers;
    }

    public async Task<PosterUser?> GetByIdAsync(object id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<PosterUser>> GetAllAsync()
    {
        return await _dbSet.Where(u => u.IsActive).ToListAsync();
    }

    public async Task<PosterUser> AddAsync(PosterUser entity)
    {
        _dbSet.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<PosterUser> UpdateAsync(PosterUser entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(object id)
    {
        var entity = await GetByIdAsync(id);
        if (entity == null) return false;

        entity.IsActive = false; // Soft delete
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(object id)
    {
        return await _dbSet.AnyAsync(e => e.Id == (Guid)id && e.IsActive);
    }

    public async Task<PosterUser?> GetByEmailAsync(string email)
    {
        return await _dbSet
            .FirstOrDefaultAsync(u => u.Email == email && u.IsActive);
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _dbSet.AnyAsync(u => u.Email == email);
    }

    public async Task<PosterUser?> GetByExistingUserIdAsync(int existingUserId)
    {
        return await _dbSet
            .FirstOrDefaultAsync(u => u.ExistingUserId == existingUserId && u.IsActive);
    }
}
