using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimplyWallStCompanies.Models;
using SimplyWallStCompanies.Services;

namespace SimplyWallStCompanies.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }
        
        [HttpGet]
        public async Task<IEnumerable<Company>> Get([FromQuery] bool includeSharePrices = false)
        {
            return await _companyService.GetCompaniesAsync(includeSharePrices).ConfigureAwait(false);
        }

        [HttpGet]
        [Route("summaries")]
        public async Task<IEnumerable<Summary>> Summaries()
        {
            return await _companyService.GetSummariesAsync().ConfigureAwait(false);
        }
    }
}