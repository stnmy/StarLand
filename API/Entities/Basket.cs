using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = [];
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }

        public void AddItem(Product product, int quantity)
        {
            if (product == null)
            {
                ArgumentNullException.ThrowIfNull(product);
            }
            if(quantity <= 0){
                throw new ArgumentException("Quantity Should be greater than 0", nameof(quantity));
            }

            var ExistingItem = FindItem(product.Id);
            if(ExistingItem == null){
                Items.Add(new BasketItem{
                    Product = product,
                    Quantity = quantity
                });
            }else{
                ExistingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity){
            if(quantity <=0){
                throw new ArgumentException("Quantity Should be greater than 0", nameof(quantity));
            }
            var item = FindItem(productId);
            if(item == null){
                return;
            }
            item.Quantity -= quantity;
            if(item.Quantity <= 0){
                Items.Remove(item);
            }
        }

        private BasketItem? FindItem(int productId)
        {
            return Items.FirstOrDefault(item => item.ProductId == productId);
        }
    }

}

