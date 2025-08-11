public class PosterUserService
{
    private readonly IPosterUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<PosterUserService> _logger;

    public PosterUserService(
        IPosterUserRepository userRepository,
        IMapper mapper,
        ILogger<PosterUserService> logger)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResult<PosterUserDto>> GetUserAsync(Guid userId)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return ServiceResult<PosterUserDto>.Failure("User not found");

            return ServiceResult<PosterUserDto>.Success(_mapper.Map<PosterUserDto>(user));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user {UserId}", userId);
            return ServiceResult<PosterUserDto>.Failure("Failed to retrieve user");
        }
    }

    public async Task<ServiceResult<PosterUserDto>> CreateUserAsync(CreatePosterUserDto createUserDto)
    {
        try
        {
            if (await _userRepository.EmailExistsAsync(createUserDto.Email))
                return ServiceResult<PosterUserDto>.Failure("Email already exists");

            var user = _mapper.Map<PosterUser>(createUserDto);
            var createdUser = await _userRepository.AddAsync(user);

            _logger.LogInformation("Poster user created: {UserId}", createdUser.Id);
            return ServiceResult<PosterUserDto>.Success(_mapper.Map<PosterUserDto>(createdUser));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user");
            return ServiceResult<PosterUserDto>.Failure("Failed to create user");
        }
    }

    public async Task<ServiceResult<PosterUserDto>> GetOrCreateUserFromExistingAsync(int existingUserId, string email, string firstName, string lastName)
    {
        try
        {
            // Check if poster user already exists for this existing user
            var existingPosterUser = await _userRepository.GetByExistingUserIdAsync(existingUserId);
            if (existingPosterUser != null)
                return ServiceResult<PosterUserDto>.Success(_mapper.Map<PosterUserDto>(existingPosterUser));

            // Create new poster user linked to existing user
            var newPosterUser = new PosterUser
            {
                ExistingUserId = existingUserId,
                Email = email,
                FirstName = firstName,
                LastName = lastName
            };

            var createdUser = await _userRepository.AddAsync(newPosterUser);
            _logger.LogInformation("Poster user created from existing user: {UserId}", createdUser.Id);

            return ServiceResult<PosterUserDto>.Success(_mapper.Map<PosterUserDto>(createdUser));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating poster user from existing user {ExistingUserId}", existingUserId);
            return ServiceResult<PosterUserDto>.Failure("Failed to create poster user");
        }
    }
}
