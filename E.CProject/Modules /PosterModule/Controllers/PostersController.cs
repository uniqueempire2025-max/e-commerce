namespace YourECommerceProject.Modules.PosterModule.Controllers;

[ApiController]
[Route("api/posters")] // Use specific route to avoid conflicts
public class PostersController : ControllerBase
{
    private readonly PosterService _posterService;

    public PostersController(PosterService posterService)
    {
        _posterService = posterService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<PosterDto>>> GetPosters(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] int? categoryId = null)
    {
        var result = await _posterService.GetPostersAsync(page, pageSize, search, categoryId);
        return result.IsSuccess ? Ok(result.Data) : BadRequest(result.Error);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PosterDto>> GetPoster(Guid id)
    {
        var result = await _posterService.GetPosterAsync(id);
        return result.IsSuccess ? Ok(result.Data) : NotFound(result.Error);
    }

    [HttpPost]
    public async Task<ActionResult<PosterDto>> CreatePoster(CreatePosterDto createPosterDto)
    {
        var result = await _posterService.CreatePosterAsync(createPosterDto);
        return result.IsSuccess 
            ? CreatedAtAction(nameof(GetPoster), new { id = result.Data!.Id }, result.Data)
            : BadRequest(result.Error);
    }
}
