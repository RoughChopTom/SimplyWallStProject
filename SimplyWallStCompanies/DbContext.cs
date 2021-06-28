using Microsoft.EntityFrameworkCore;
using SimplyWallStCompanies.Models;

namespace SimplyWallStCompanies
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyPriceClose> CompanyPriceCloses { get; set; }
        public DbSet<CompanyScore> CompanyStores { get; set; }

        public DbContext(DbContextOptions<DbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CompanyPriceClose>()
                .HasKey(x => new { x.Date, x.CompanyId });
        }
    }
}