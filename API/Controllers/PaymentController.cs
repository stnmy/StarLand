using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extentions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentController(PaymentService paymentService, 
        StoreContext storeContext, IConfiguration configuration,
        ILogger<PaymentController> logger) : BaseApiController
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basketId = Request.Cookies["basketId"];
            if (string.IsNullOrEmpty(basketId))
            {
                return BadRequest("Basket ID is missing in the request.");
            }

            var basket = await storeContext.Baskets.GetBasketWithItems(basketId);
            if (basket == null)
            {
                return BadRequest("Basket not found.");
            }

            var intent = await paymentService.CreateOrUpdatePaymentIntent(basket);
            if (intent == null)
            {
                return BadRequest("Problem creating payment intent.");
            }

            basket.PaymentIntentId ??= intent.Id;
            basket.ClientSecret ??= intent.ClientSecret;

            if (storeContext.ChangeTracker.HasChanges())
            {
                var result = await storeContext.SaveChangesAsync() > 0;
                if (!result)
                {
                    return BadRequest("Problem updating basket with payment intent.");
                }
            }
            return basket.toDto();
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();
            try {
                var stripeEvent = ConstructStripeEvent(json);

                if(stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    return BadRequest("Invalid event data");
                }

                if(intent.Status == "succeeded")
                {
                    await HandlePaymentIntentSucceeded(intent);
                }
                else
                {
                    await HandlePaymentIntentFailed(intent);
                }
                return Ok();

            }
            catch(StripeException ex)
            {
                logger.LogError(ex, "Stripe Webhook Error");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook Error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An Unexpected Error occured");
                return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected Error");
            }
        }

        private async Task HandlePaymentIntentFailed(PaymentIntent intent)
        {
            var order = await storeContext.Orders
                .Include(x => x.OrderItems)
                .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                    ?? throw new Exception("Order not found");
            foreach(var item in order.OrderItems)
            {
                var productItem = await storeContext.Products
                    .FindAsync(item.ItemOrdered.ProductId)
                    ?? throw new Exception("Problem Updating order stock");
                productItem.StockQuantity += item.Quantity;
            }
        }

        private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            var order = await storeContext.Orders
                .Include(x => x.OrderItems)
                .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                    ?? throw new Exception("Order not found");
            if(order.GetTotal() != intent.Amount)
            {
                order.OrderStatus = OrderStatus.PaymentMismatch;
            }
            else
            {
                order.OrderStatus = OrderStatus.PaymentReceived;

            }
            var basket = await storeContext.Baskets.FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id);

            if(basket != null)
            {
                storeContext.Baskets.Remove(basket);
            }
            await storeContext.SaveChangesAsync();
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"]
                    , configuration["StripeSettings:WhSecret"]);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to construct stripe event");
                throw new StripeException("Invalid Signature");
            }
        }

        
        
    }
}