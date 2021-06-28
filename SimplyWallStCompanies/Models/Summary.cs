namespace SimplyWallStCompanies.Models
{
    public class Summary
    {
        public string Name { get; set; }
        public string UniqueSymbol { get; set; }
        public decimal LastSharePrice { get; set; }
        public int Score { get; set; }
        public decimal PriceFluctuation90Day { get; set; }
    }
}