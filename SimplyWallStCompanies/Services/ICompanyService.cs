using System.Collections.Generic;
using System.Threading.Tasks;
using SimplyWallStCompanies.Models;

namespace SimplyWallStCompanies.Services
{
    public interface ICompanyService
    {
        Task<IEnumerable<Company>> GetCompaniesAsync(bool includeSharePrices = false);
        Task<IEnumerable<Summary>> GetSummariesAsync();
    }
}