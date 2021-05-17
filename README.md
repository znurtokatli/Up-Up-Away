# Project 2 - Up, Up, and Awaaaayyyy

## Background

Atlanta and Los Angeles are two of the busiest airports in the country and ones that carry a heavy load of international travel. 
We wanted to dive into the data to see which countries are flying the most into the two airports. The team leveraged a JSON formatted API from api.aviationstack.com/ containing flight provider information including airport, airline, and flight information. 

## Database Design

The data from the API was cleaned and imported into a Postgresql database using Python. The ERD diagram below supported the database construction for the tables in the aviation database in PostgreSQL. 

![image](https://user-images.githubusercontent.com/74060853/116949171-74fc0780-ac4f-11eb-9d42-49567d9908ce.png)

## Dashboard

The final dashboard is interactive and allows users to flip between LAX and ATL airports to inspect there differences between the datasets. Each visualization can be found on it's own tab within the webpage. 

# Barchart
The barchart below shows the total number of flights that arrived in LAX/ATL from several domestic and international airports over the last week. The bar chart was created using the D3 javascript library.

![Alt Text](https://github.com/jared3194/project-2/blob/main/images/barchart.gif)

# ScatterChart
The scatter chart below shows the total number of flights and the airport's ranking (rank 1 = the airport the had the most flights arrive in ATL/LAX.) that arrived in LAX/ATL over the last 90 days from several domestic and international airports. The bar chart was created using the D3 javascript library.

![Alt Text](https://github.com/jared3194/project-2/blob/main/images/scatterchart.gif)

# Leaflet
The map chart below shows the pinpoints the specific countries/locations that had flights arrive in either LAX or ATL airports. The chart is interactive and displays a tooltip with the total number of flight, country name, and name of the arrival airport. The map chart was created using the D3 javascript library and leaflet js library.

![Alt Text](https://github.com/jared3194/project-2/blob/main/images/mapchart.gif)

### Heroku

Our visualization dashboard is hosted using Heroku. The link to the dashboard can be found below.

https://up-up-awayyy.herokuapp.com/



