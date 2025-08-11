[ApiController]
[Route("api/poster-users")]
public class PosterUsersController : ControllerBase
{
    private readonly PosterUserService _userService;

    public PosterUsersController(PosterUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PosterUserDto>> GetUser(Guid id)
    {
        var result = await _userService.GetUserAsync(id);
        return result.IsSuccess ? Ok(result.Data) : NotFound(result.Error);
    }

    [HttpPost]
    public async Task<ActionResult<PosterUserDto>> CreateUser(CreatePosterUserDto createUserDto)
    {
        var result = await _userService.CreateUserAsync(createUserDto);
        return result.IsSuccess 
            ? CreatedAtAction(nameof(GetUser), new { id = result.Data!.Id }, result.Data)
            : BadRequest(result.Error);
    }

    [HttpPost("from-existing/{existingUserId:int}")]
    public async Task<ActionResult<PosterUserDto>> CreateFromExistingUser(
        int existingUserId, 
        [FromBody] CreateFromExistingUserRequest request)
    {
        var result = await _userService.GetOrCreateUserFromExistingAsync(
            existingUserId, request.Email, request.FirstName, request.LastName);
            
        return result.IsSuccess ? Ok(result.Data) : BadRequest(result.Error);
    }
}

public record CreateFromExistingUserRequest(string Email, string FirstName, string LastName);
