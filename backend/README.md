# Backend 

These directories contain files needed for server side functionality. 

## aquaWatchMobileR
For the data visualizations for the pond and other water locations.

Prerequisites
 - Install [R](https://cran.rstudio.com/)
 - Install [R Studio](https://posit.co/download/rstudio-desktop/)

The first time you run the code you may be prompted to install various packages, install them. It should be as simple as clicking "Run App"

## aquaWatchMobileWeather
For the data visualizations for the weather.

Prerequisites
 - Install R
 - Install R Studio

The first time you run the code you may be prompted to install various packages, install them. It should be as simple as clicking "Run App"

## server
Server side code to upload Odin info onto Mongo (database) as well as to upload WQI info. Server also handles get requests to get WQI info from Mongo. 

Prerequisites
 - Install [node.js](https://nodejs.org/en) (also installs npm)

Setup Instructions
1. Open a terminal in this directory ``../BlueColab_MobileDataViz/aquawatch_mobile_app/``
2. Run ``npm i``, it installs all needed node_packages.
3. Run a server by ``node [filename].js``

Repeat step 3 for any subsequent runs.

Note: There's one file not loaded here, an API key. Will distribute not on GitHub.