using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimplyWallStCompanies.Models;

namespace SimplyWallStCompanies.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly DbContext _dbContext;
        private readonly DateTime _comparisonDate = new DateTime(2020, 05, 24).AddDays(-90); // Hardcoded comparison date as the DB is also hardcoded (otherwise you won't get any 'last 90 days' results)
        public CompanyService(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Company>> GetCompaniesAsync([FromQuery] bool includeSharePrices = false)
        {
            if (includeSharePrices)
            {
                return await _dbContext.Companies
                    .Include(company => company.CompanyPriceCloses)
                    .ToListAsync();
            }

            return await _dbContext.Companies.ToListAsync();
        }

        public async Task<IEnumerable<Summary>> GetSummariesAsync()
        {
            return await _dbContext.Companies
                .Include(nameof(Company.CompanyPriceCloses))
                .Include(nameof(Company.CompanyScore))
                .Select(
                    company => new Summary
                    {
                        Name = company.Name,
                        UniqueSymbol = company.UniqueSymbol,
                        LastSharePrice = company.CompanyPriceCloses.OrderByDescending(z => z.Date).FirstOrDefault().Price,
                        Score = company.CompanyScore.Total,
                        PriceFluctuation90Day = CompanyUtilities.PriceFluctuationValue(company.CompanyPriceCloses, _comparisonDate)
                    })
                .OrderBy(x => x.Name)
                .ToListAsync();
        }
        
    }
}