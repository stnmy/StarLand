using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public partial class BasketDto
    {
        public required string BasketId { get; set; }
        public List<BasketItemDto> Items { get; set; }
        public string? ClientSecret {get; set;}
        public string? PaymentIntentId {get; set;}
    }
}