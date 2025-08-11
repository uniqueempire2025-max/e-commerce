namespace YourECommerceProject.Modules.PosterModule.Services;

public class PosterCategoryService
{
    private readonly IPosterCategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<PosterCategoryService> _logger;

    public PosterCategoryService(
        IPosterCategoryRepository categoryRepository,
        IMapper mapper,
        ILogger<PosterCategoryService> logger)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResult<List<PosterCategoryDto>>> GetActiveCategoriesAsync()
    {
        try
        {
            var categories = await _categoryRepository.GetActiveAsync();
            return ServiceResult<List<PosterCategoryDto>>.Success(_mapper.Map<List<PosterCategoryDto>>(categories));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting active categories");
            return ServiceResult<List<PosterCategoryDto>>.Failure("Failed to retrieve categories");
        }
    }

    public async Task<ServiceResult<List<PosterCategoryDto>>> GetCategoriesByParentAsync(int? parentId)
    {
        try
        {
            var categories = await _categoryRepository.GetByParentIdAsync(parentId);
            return ServiceResult<List<PosterCategoryDto>>.Success(_mapper.Map<List<PosterCategoryDto>>(categories));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting categories by parent {ParentId}", parentId);
            return ServiceResult<List<PosterCategoryDto>>.Failure("Failed to retrieve categories");
        }
    }

    public async Task<ServiceResult<PosterCategoryDto>> GetCategoryAsync(int categoryId)
    {
        try
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId);
            if (category == null)
                return ServiceResult<PosterCategoryDto>.Failure("Category not found");

            return ServiceResult<PosterCategoryDto>.Success(_mapper.Map<PosterCategoryDto>(category));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting category {CategoryId}", categoryId);
            return ServiceResult<PosterCategoryDto>.Failure("Failed to retrieve category");
        }
    }

    public async Task<ServiceResult<PosterCategoryDto>> CreateCategoryAsync(CreatePosterCategoryDto createCategoryDto)
    {
        try
        {
            // Validate parent category if provided
            if (createCategoryDto.ParentCategoryId.HasValue)
            {
                var parentExists = await _categoryRepository.ExistsAsync(createCategoryDto.ParentCategoryId.Value);
                if (!parentExists)
                    return ServiceResult<PosterCategoryDto>.Failure("Parent category not found");
            }

            var category = _mapper.Map<PosterCategory>(createCategoryDto);
            var createdCategory = await _categoryRepository.AddAsync(category);

            _logger.LogInformation("Category created: {CategoryId}", createdCategory.Id);
            return ServiceResult<PosterCategoryDto>.Success(_mapper.Map<PosterCategoryDto>(createdCategory));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating category");
            return ServiceResult<PosterCategoryDto>.Failure("Failed to create category");
        }
    }
}
