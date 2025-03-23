using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentController(PaymentService paymentService, StoreContext storeContext) : BaseApiController
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
    }
}