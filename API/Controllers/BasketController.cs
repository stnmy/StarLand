using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null)
            {
                return NoContent();
            }
            return basket.toDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            basket ??= CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if(product == null){
                return BadRequest("Problem Adding item to the basket");
            }

            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            
            if(result){
                return CreatedAtAction(nameof(GetBasket), basket.toDto());
            }
            return BadRequest("Problem updating basket");
        }

        private  Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOptions);
            var basket =  new Basket {BasketId = basketId};
            _context.Baskets.Add(basket);
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if(basket == null)
            {
                return BadRequest("Unable to Retrieve basket");
            }

            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok();
            }

            return BadRequest("Problem updating the basket");
        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }

    }
}