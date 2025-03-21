using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                ?? throw new InvalidOperationException("Failed to Retrieve Store Context");

            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to Retrieve User Manager");
            SeedData(context, userManager);
        }

        private static async Task SeedData(StoreContext context, UserManager<User> userManager)
        {
            context.Database.Migrate();
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "shtanmoycoc@gmail.com",
                    Email = "shtanmoycoc@gmail.com",
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }

            if (context.Products.Any())
            {
                return;
            }

            var products = new List<Product>
            {
                new Product
                {
                    Name = "ASUS ROG Zephyrus G16 GA605WI",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 3000,
                    PictureUrl = "/images/products/rog-zephyrus-g16-ga605wi-01-500x500.png",
                    Brand = "Asus",
                    Type = "Laptop",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "Microsoft Surface Laptop Studio 2",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 2800,
                    PictureUrl = "/images/products/surface-laptop-studio-2-01-500x500.png",
                    Brand = "Microsoft",
                    Type = "Laptop",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "LG UltraGear 34GS95QE-B 34",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 2200,
                    PictureUrl = "/images/products/34gs95qe-b-01 -500x500.png",
                    Brand = "LG",
                    Type = "Monitor",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "ASUS ROG Swift OLED PG39WCDM",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2100,
                    PictureUrl = "/images/products/rog-swift-oled-pg39wcdm-01-500x500.png",
                    Brand = "Asus",
                    Type = "Monitor",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "GIGABYTE GeForce RTX 4090 WINDFORCE V2 24G",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2300,
                    PictureUrl = "/images/products/geforce-rtx-4090-windforce-v2-24g-01-500x500.png",
                    Brand = "Gigabyte",
                    Type = "GPU",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "MSI GeForce RTX 4090 SUPRIM LIQUID",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 2000,
                    PictureUrl = "/images/products/geforce-rtx-4090-suprim-liquid-x-24g-01-500x500.png",
                    Brand = "MSI",
                    Type = "GPU",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "ASUS ROG MAXIMUS Z790",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/rog-maximus-z790-hero-btf-01-500x500.png",
                    Brand = "Asus",
                    Type = "Motherboard",
                    StockQuantity = 100
                },
                new Product
                {
                    Name = "Antec Cannon Open Frame Full-Tower Gaming Case",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 450,
                    PictureUrl = "/images/products/cannon-01-500x500.png",
                    Brand = "Antec",
                    Type = "Casing",
                    StockQuantity = 100
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}