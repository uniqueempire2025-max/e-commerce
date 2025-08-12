namespace YourECommerceProject.Shared.Common;

// ServiceResult
public class ServiceResult<T>
{
    public bool IsSuccess { get; }
    public T? Data { get; }
    public string? Error { get; }

    private ServiceResult(bool isSuccess, T? data, string? error)
    {
        IsSuccess = isSuccess;
        Data = data;
        Error = error;
    }

    public static ServiceResult<T> Success(T data) => new(true, data, null);
    public static ServiceResult<T> Failure(string error) => new(false, default, error);
}

// PagedResult
public class PagedResult<T>
{
    public IEnumerable<T> Data { get; set; } = new List<T>();
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasNextPage => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
}
