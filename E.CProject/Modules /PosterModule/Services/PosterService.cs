namespace YourECommerceProject.Modules.PosterModule.Services;

public class PosterService
{
    private readonly IPosterRepository _posterRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<PosterService> _logger;

    public PosterService(
        IPosterRepository posterRepository,
        IMapper mapper,
        ILogger<PosterService> logger)
    {
        _posterRepository = posterRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResult<PagedResult<PosterDto>>> GetPostersAsync(int page, int pageSize, string? search = null, int? categoryId = null)
    {
        try
        {
            var posters = await _posterRepository.GetPagedAsync(page, pageSize, search, categoryId);
            var posterDtos = _mapper.Map<PagedResult<PosterDto>>(posters);
            
            return ServiceResult<PagedResult<PosterDto>>.Success(posterDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting posters");
            return ServiceResult<PagedResult<PosterDto>>.Failure("Failed to retrieve posters");
        }
    }

    public async Task<ServiceResult<PosterDto>> GetPosterAsync(Guid posterId, bool incrementViewCount = true)
    {
        try
        {
            var poster = await _posterRepository.GetByIdAsync(posterId);
            if (poster == null || !poster.IsActive)
                return ServiceResult<PosterDto>.Failure("Poster not found");

            if (incrementViewCount)
                await _posterRepository.IncrementViewCountAsync(posterId);

            return ServiceResult<PosterDto>.Success(_mapper.Map<PosterDto>(poster));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting poster {PosterId}", posterId);
            return ServiceResult<PosterDto>.Failure("Failed to retrieve poster");
        }
    }

    public async Task<ServiceResult<PosterDto>> CreatePosterAsync(CreatePosterDto createPosterDto)
    {
        try
        {
            var poster = _mapper.Map<Poster>(createPosterDto);
            var createdPoster = await _posterRepository.AddAsync(poster);

            _logger.LogInformation("Poster created: {PosterId}", createdPoster.Id);
            return ServiceResult<PosterDto>.Success(_mapper.Map<PosterDto>(createdPoster));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating poster");
            return ServiceResult<PosterDto>.Failure("Failed to create poster");
        }
    }
}
