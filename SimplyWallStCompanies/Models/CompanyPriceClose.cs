using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyWallStCompanies.Models
{
    [Table("swsCompanyPriceClose")]
    public class CompanyPriceClose
    {
        [Column("date")]
        public DateTime Date { get; set; }

        [Column("company_id")]
        public Guid CompanyId { get; set; }

        [Column("price")]
        public decimal Price { get; set; }

        [Column("date_created")]
        public DateTime DateCreated { get; set; }
    }
}