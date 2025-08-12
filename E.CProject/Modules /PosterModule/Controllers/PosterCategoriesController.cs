namespace YourECommerceProject.Modules.PosterModule.Controllers;

[ApiController]
[Route("api/poster-categories")]
public class PosterCategoriesController : ControllerBase
{
    private readonly PosterCategoryService _categoryService;

    public PosterCategoriesController(PosterCategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PosterCategoryDto>>> GetCategories([FromQuery] int? parentId = null)
    {
        var result = parentId.HasValue 
            ? await _categoryService.GetCategoriesByParentAsync(parentId)
            : await _categoryService.GetActiveCategoriesAsync();

        return result.IsSuccess ? Ok(result.Data) : BadRequest(result.Error);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PosterCategoryDto>> GetCategory(int id)
    {
        var result = await _categoryService.GetCategoryAsync(id);
        return result.IsSuccess ? Ok(result.Data) : NotFound(result.Error);
    }

    [HttpPost]
    public async Task<ActionResult<PosterCategoryDto>> CreateCategory(CreatePosterCategoryDto createCategoryDto)
    {
        var result = await _categoryService.CreateCategoryAsync(createCategoryDto);
        return result.IsSuccess 
            ? CreatedAtAction(nameof(GetCategory), new { id = result.Data!.Id }, result.Data)
            : BadRequest(result.Error);
    }
}
