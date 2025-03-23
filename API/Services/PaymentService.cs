using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentService(IConfiguration configuration)
    {
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = configuration["StripeSettings:SecretKey"];
            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            var subTotal = basket.Items.Sum(x => x.Quantity * x.Product.Price);
            var deliveryFee = subTotal > 10000? 0 : 25;

            if(string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subTotal + deliveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await service.CreateAsync(options);
            }else{
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subTotal + deliveryFee
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            return intent;
        }
    }
}