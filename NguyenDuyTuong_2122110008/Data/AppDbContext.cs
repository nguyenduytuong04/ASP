using NguyenDuyTuong_2122110008.Model;
using Microsoft.EntityFrameworkCore;

namespace NguyenDuyTuong_2122110008.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        public DbSet<News> News { get; set; }
    }
}
