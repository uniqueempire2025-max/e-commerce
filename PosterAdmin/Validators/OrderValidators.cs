using System.ComponentModel.DataAnnotations;

namespace PosterAdmin.Validators
{
    public class ValidOrderStatusAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value is not string status)
                return false;

            return Enum.TryParse<Models.OrderStatus>(status, true, out _);
        }

        public override string FormatErrorMessage(string name)
        {
            return $"Invalid order status. Valid values are: {string.Join(", ", Enum.GetNames<Models.OrderStatus>())}";
        }
    }

    public class DateRangeAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            return true; // This will be handled in the controller for query parameters
        }
    }
}
