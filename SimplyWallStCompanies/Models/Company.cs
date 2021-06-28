using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimplyWallStCompanies.Models
{
    [Table("swsCompany")]
    public class Company
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        
        [Column("name")]
        public string Name { get; set; }

        [Column("unique_symbol")]
        public string UniqueSymbol { get; set; }

        [Column("score_id")]
        public int ScoreId { get; set; }

        [Column("ticker_symbol")]
        public string TickerSymbol { get; set; }
        
        [Column("exchange_symbol")]
        public string ExchangeSymbol { get; set; }
        
        [Column("date_generated")]
        public DateTime DateGenerated { get; set; }
        
        [Column("security_name")]
        public string SecurityName { get; set; }
        
        [Column("exchange_country_iso")]
        public string ExchangeCountryIso { get; set; }
        
        [Column("listing_currency_iso")]
        public string ListingCurrencyIso { get; set; }
        
        [Column("canonical_url")]
        public string CanonicalUrl { get; set; }
        
        [Column("unique_symbol_slug")]
        public string UniqueSymbolSlug { get; set; }

        public ICollection<CompanyPriceClose> CompanyPriceCloses { get; set; }

        public CompanyScore CompanyScore { get; set; }
    }
}