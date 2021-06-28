using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using SimplyWallStCompanies.Models;
using SimplyWallStCompanies.Services;

namespace SimplyWallStCompanies.Test.Endpoints.Companies
{
    [TestFixture]
    public class CompanyServiceTests
    {
        private Mock<ICompanyService> _companyServiceMock;
        private ICompanyService _testee;
        
        [SetUp]
        public void Setup()
        {
            _companyServiceMock = new Mock<ICompanyService>();
            _testee = _companyServiceMock.Object;
        }

        [Test]
        public async Task GetCompaniesAsync_Should_Return_Companies()
        {
            var companies = new List<Company>
            {
                new Company
                {
                    Id = new Guid(),
                    Name = "StubName",
                    CanonicalUrl = "StubCanonicalUrl",
                    ExchangeSymbol = "StubExchangeSymbol",
                    ScoreId = 1,
                    SecurityName = "StubSecurityName",
                    TickerSymbol = "StubTickerSymbol",
                    UniqueSymbol = "StubUniqueSymbol",
                    ExchangeCountryIso = "StubExchangeCountryIso",
                    ListingCurrencyIso = "StubListingCurrencyIso",
                    UniqueSymbolSlug = "StubUniqueSymbolSlug",
                },
                new Company
                {
                    Id = new Guid(),
                    Name = "StubName",
                    CanonicalUrl = "StubCanonicalUrl",
                    ExchangeSymbol = "StubExchangeSymbol",
                    ScoreId = 1,
                    SecurityName = "StubSecurityName",
                    TickerSymbol = "StubTickerSymbol",
                    UniqueSymbol = "StubUniqueSymbol",
                    ExchangeCountryIso = "StubExchangeCountryIso",
                    ListingCurrencyIso = "StubListingCurrencyIso",
                    UniqueSymbolSlug = "StubUniqueSymbolSlug"
                },
            };

            _companyServiceMock.Setup(x => x.GetCompaniesAsync(false).Result).Returns(companies);

            var result = (await _testee.GetCompaniesAsync().ConfigureAwait(false)).ToList();
            
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual(companies.First().Id, result.First().Id);
        }
        
        [Test]
        public async Task GetSummariesAsync_Should_Return_Summaries()
        {
            var summaries = new List<Summary>
            {
                new Summary
                {
                    Name = "StubName",
                    Score = 1,
                    UniqueSymbol = "StubUniqueSymbol",
                    LastSharePrice = new decimal(1.50),
                    PriceFluctuation90Day = new decimal(1.50)
                },
                new Summary
                {
                    Name = "StubName",
                    Score = 1,
                    UniqueSymbol = "StubUniqueSymbol",
                    LastSharePrice = new decimal(1.50),
                    PriceFluctuation90Day = new decimal(1.50)
                }
            };
            
            _companyServiceMock.Setup(x => x.GetSummariesAsync().Result).Returns(summaries);
            var result = (await _testee.GetSummariesAsync().ConfigureAwait(false)).ToList();
            
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual(summaries.First().Name, result.First().Name);
            Assert.AreEqual(summaries.First().LastSharePrice, result.First().LastSharePrice);
        }
    }
}