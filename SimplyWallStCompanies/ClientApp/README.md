## Simply Wall St Project

## To Run
Open the solution (.sln) file in Rider/Visual studio. Run the `SimplyWallStCompanies` _project_. It should pull all node modules, and run the front & back end for you.
The port it runs on is defined in Properties/launchSettings.json -> applicationUrl.

## Technology
* ASP.NETCore 3.1
* React
* Sqlite

To use the API you can hit the URL `/companies?includeSharePrices=true` to return companies including share prices (false omits the share prices).

## To note

* I have used a 'Summaries' endpoint to fetch the data for the table. The 'Companies' one brings back more data than the frontend needs. You can still manually hit the API to return all Company data if need be.
* I have used React classes, not hooks. No reason in particular and it is easy to change it over if need be.
* Currencies do not have symbols in their formatting. It is likely they all need to be '$' signs but I'm not sure if this would need to work with others.
* Currencies are not converted into one currency i.e USD. Some are AUD and some are USD.
* The 90 day price fluctuation was computed against a date of 24/02/2020. If I used today's date you wouldn't get any results as the db isn't upto date.
* I have assumed the 'snowflake score' has a range of 0-20.
* I have not used any paging as the dataset is a fixed size right now.
* I have not added any API versioning.