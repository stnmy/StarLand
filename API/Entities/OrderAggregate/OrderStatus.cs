namespace API.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymnetFailed,
        PaymentMismatch
    }
}