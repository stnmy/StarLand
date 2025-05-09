using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extentions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetUsername (this ClaimsPrincipal user){
            return user.Identity?.Name ?? throw new UnauthorizedAccessException();
        }
    }
}