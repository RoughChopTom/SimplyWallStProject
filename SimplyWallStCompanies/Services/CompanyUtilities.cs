using System;
using System.Collections.Generic;
using System.Linq;
using SimplyWallStCompanies.Models;

namespace SimplyWallStCompanies.Services
{
    public static class CompanyUtilities
    {
        public static decimal PriceFluctuationValue(IEnumerable<CompanyPriceClose> priceCloses, DateTime comparisonDate)
        {
            var items = priceCloses.Where(priceClose => priceClose.Date > comparisonDate).ToList();
            return items.Max(x => x.Price) - items.Min(x => x.Price);
        }
    }
}