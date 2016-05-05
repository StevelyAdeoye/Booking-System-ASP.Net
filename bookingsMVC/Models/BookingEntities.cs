using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace bookingsMVC.Models
{
    public class BookingEntities : DbContext
    {
            public DbSet<member> member { get; set; }
            public DbSet<seats> seats { get; set; }

            public DbSet<UserProfile> UserProfiles { get; set; }

    }
}