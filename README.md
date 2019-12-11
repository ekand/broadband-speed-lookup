The purpose of this website is to interpret and display internet connectivity data from an FCC database.

Contributors: Adam Gene Regnier, Erik Kristofer Anderson

What it does: A user can look up an address or zip code in the US, and find out the fastest available consumer fixed broadband internet.

How it works: A user enters a zipcode or address. This gets sent to a mapbox API which returns a place name and coordinates. Then these coordinates get sent to an FCC API which returns a cencsus block code. That census block code gets sent to another FCC API, which returns a list of entries, each representing an internet service available in that location. The fastest of these numbers gets displayed to the user.  
If the user then clicks "additional information," the page displays the original search entry, the found place name and coordinates, the found census block code, and the found and calculated maximum available speed.

Sources (Also cited in source code):
We used a bootstrap template found here [https://getbootstrap.com/docs/4.0/examples/cover/](https://getbootstrap.com/docs/4.0/examples/cover/).
We selected freely usable photos from unsplash.
For the form html and related javascript, we used the following references: [https://jsfiddle.net/seamusleahy/rxeuaatw/](https://jsfiddle.net/seamusleahy/rxeuaatw/), and [https://www.geeksforgeeks.org/form-validation-using-html-javascript/](https://www.geeksforgeeks.org/form-validation-using-html-javascript/).
We used APIs provided by mapbox and the FCC. The FCC also has an interactive map which partly inspired this project.
[https://docs.mapbox.com/api/](https://docs.mapbox.com/api/)  
[https://broadbandmap.fcc.gov/#/](https://broadbandmap.fcc.gov/#/)  
[https://opendata.fcc.gov/Wireline/Fixed-Broadband-Deployment-Data-Jun-2018-Status-V1/ehbi-rr4z](https://opendata.fcc.gov/Wireline/Fixed-Broadband-Deployment-Data-Jun-2018-Status-V1/ehbi-rr4z)  
[https://dev.socrata.com/foundry/opendata.fcc.gov/ehbi-rr4z](https://dev.socrata.com/foundry/opendata.fcc.gov/ehbi-rr4z)  
