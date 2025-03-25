using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Basket> Baskets {get; set;}
        public required DbSet<Order> Orders {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole {Id = "639b8d3a-2dde-4b6d-9f7c-aceb69e1d53a", Name = "Member", NormalizedName ="MEMBER"},
                    new IdentityRole {Id = "c4eda0f7-323f-4342-bc5d-ba527e8101c6", Name = "Admin", NormalizedName ="ADMIN"}         
                );
        }
    }
}