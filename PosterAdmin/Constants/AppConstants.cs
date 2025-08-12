namespace PosterAdmin.Constants
{
    public static class AppConstants
    {
        public static class OrderStatuses
        {
            public const string PENDING = "Pending";
            public const string PROCESSING = "Processing";
            public const string SHIPPED = "Shipped";
            public const string DELIVERED = "Delivered";
            public const string CANCELLED = "Cancelled";
        }

        public static class PaymentMethods
        {
            public const string CREDIT_CARD = "Credit Card";
            public const string DEBIT_CARD = "Debit Card";
            public const string PAYPAL = "PayPal";
            public const string BANK_TRANSFER = "Bank Transfer";
        }

        public static class DeliveryTypes
        {
            public const string STANDARD = "Standard Delivery";
            public const string EXPRESS = "Express Delivery";
            public const string OVERNIGHT = "Overnight Delivery";
            public const string PICKUP = "Store Pickup";
        }

        public static class ErrorMessages
        {
            public const string ORDER_NOT_FOUND = "Order not found";
            public const string INVALID_ORDER_STATUS = "Invalid order status";
            public const string INVALID_DATE_RANGE = "Start date cannot be greater than end date";
            public const string REQUIRED_FIELD = "This field is required";
        }
    }
}
