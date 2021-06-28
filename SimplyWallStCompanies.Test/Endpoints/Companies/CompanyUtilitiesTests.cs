using System;
using System.Collections.Generic;
using NUnit.Framework;
using SimplyWallStCompanies.Models;
using SimplyWallStCompanies.Services;

namespace SimplyWallStCompanies.Test.Endpoints.Companies
{
    [TestFixture]
    public class CompanyUtilitiesTests
    {
        private readonly DateTime _currentDate = DateTime.Now;
        
        [TestCase(89, 15)]
        [TestCase(31, 5)]
        [TestCase(100, 25)]
        public void PriceFluctuationValue_Should_Calculate(int dayRange, decimal expected)
        {
            
            var priceCloses = new List<CompanyPriceClose>
            {
                new CompanyPriceClose
                {
                    Date = _currentDate,
                    Price = new decimal(5),
                    CompanyId = new Guid(),
                    DateCreated = new DateTime()
                },
                new CompanyPriceClose
                {
                    Date = _currentDate.AddDays(-30),
                    Price = new decimal(10),
                    CompanyId = new Guid(),
                    DateCreated = new DateTime()
                },
                new CompanyPriceClose
                {
                    Date = _currentDate.AddDays(-60),
                    Price = new decimal(20),
                    CompanyId = new Guid(),
                    DateCreated = new DateTime()
                },
                new CompanyPriceClose
                {
                    Date = _currentDate.AddDays(-90),
                    Price = new decimal(30),
                    CompanyId = new Guid(),
                    DateCreated = new DateTime()
                }
            };

            var priceFluctuationValue = CompanyUtilities.PriceFluctuationValue(priceCloses, _currentDate.AddDays(-dayRange));
            
            Assert.AreEqual(expected, priceFluctuationValue);
        }
    }
}