using NguyenDuyTuong_2122110008_ASP.Model;
using Microsoft.EntityFrameworkCore;


namespace NguyenDuyTuong_2122110008_ASP.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}