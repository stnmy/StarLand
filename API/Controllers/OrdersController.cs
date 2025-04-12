using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extentions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController(StoreContext storeContext) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            var orders = await storeContext.Orders
                .ProjectToDto()
                .Where(x => x.BuyerEmail == User.GetUsername())
                .ToListAsync();
            return orders;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
        {
            var order = await storeContext.Orders
                .ProjectToDto()
                .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var basket = await storeContext.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

            if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                return BadRequest("Basket is empty or not found");
            }
            var items = CreateOrderItems(basket.Items);
            if (items == null)
            {
                return BadRequest("One or more items in the basket are out of stock.");
            }
            var subtotal = items.Sum(x => x.Price * x.Quantity);
            var deliveryFee = CalculateDeliveryFee(subtotal);

            var order = await storeContext.Orders
                .Include(x => x.OrderItems)
                .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

            if (order == null)
            {
                order = new Order
                {
                    OrderItems = items,
                    BuyerEmail = User.GetUsername(),
                    ShippingAddress = createOrderDto.ShippingAddress,
                    DeliveryFee = deliveryFee,
                    Subtotal = subtotal,
                    PaymentSummary = createOrderDto.PaymentSummary,
                    PaymentIntentId = basket.PaymentIntentId
                };
                storeContext.Orders.Add(order);
            }
            else
            {
                order.OrderItems = items;
            }



            var result = await storeContext.SaveChangesAsync() > 0;
            if (!result)
            {
                return BadRequest("Problem Creating Order!");
            }
            return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto());
        }

        private long CalculateDeliveryFee(long subtotal)
        {
            return subtotal > 10000 ? 0 : 500;
        }

        private List<OrderItem>? CreateOrderItems(List<BasketItem> items)
        {
            var OrderItems = new List<OrderItem>();

            foreach (var item in items)
            {
                if (item.Product.StockQuantity < item.Quantity)
                {
                    return null;
                }
                var orderItem = new OrderItem
                {
                    ItemOrdered = new ProductItemOrdered
                    {
                        ProductId = item.ProductId,
                        PictureUrl = item.Product.PictureUrl,
                        Name = item.Product.Name
                    },
                    Price = item.Product.Price,
                    Quantity = item.Quantity
                };
                OrderItems.Add(orderItem);

                item.Product.StockQuantity -= item.Quantity;
            }
            return OrderItems;
        }
    }
}