using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyWallStCompanies.Models
{
    [Table("swsCompanyScore")]
    public class CompanyScore
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("company_id")]
        public Guid CompanyId { get; set; }

        [Column("total")]
        public int Total { get; set; }
    }
}