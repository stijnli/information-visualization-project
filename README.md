# SpotiVis
By Stijn Lievaart, Veit Schneider & Ko Schoemaker for INFOMVIS UU 2025

---
SpotiVis provides a visualisation showing a full year of Spotify top 50 charts from 73 different countries. It can give insight into relations between songs, their artists albums and genres. Besides that, you can explore song rankings over for the past year for 73 different countries in the rank chart or investigate the intrinsic selected song features like Dancability or Valence in the feature matrix.

## File Overview
- `\data_preparation\main.ipnb`: A Python notebook containing the code for collecting and wrangling the source data
- `\data_preparation\cache`: A cache directory used by the Python notebook so that we do not continously fetch the songs (which is not good for API timeouts.
- `\Visualisation`: All code for the visualizations
- `\Visualisation\css`: Styling
- `\Visualisation\data`: The directory where all source data should go
- `\Visualisation\js`: All JavaScript - including d3 and Bootstrap - divided into multiple files relating to their function on the page
- `\Visualisation\main.html`: The place where all visualisations come together. This page should be visited to actually experience SpotiVis

## Prerequisites for Running Data Preparation
1. Open the jupyter notebook (either in VS code or the jupyter app)
2. Make sure to install all necessary python packages with pip.
3. Make sure that the cached files are there as the Spotify API is since then deprecated.

## Prerequisites for Running SpotiVis
1. If you do not have the data yet: Download the wrangled and prepared data from [this link](https://solisservices-my.sharepoint.com/:f:/g/personal/s_j_d_lievaart_students_uu_nl/EsnOkMxa9iBMgjGCxXGu8b0BvjOsVQQl7Djd5c0afCo5AQ?e=ytYOfe)
2. If you do not have the data yet: Unzip the data and place the files in the `Visualisation\data`directory
- Make sure `alpha2ToCountryName.json`, `artists.json`, `measurements.csv` and `songs.json` all exist
4. From the `Visualization` directory, use Docker to build the image and run the container. Alternatively a static webserver can be used within the Visualisation folder.
```bash
docker compose up --build
```
4. Visit `http://localhost:8080/main.html`, please use Chrome as there are some issues with other browser 
5. Loading in all the data should take around 5 seconds. After that, the visualisation should be all functional!

Alternatively, the visualization can be accessed at [this link](https://koschoemaker.nl/INFOMVIS/Visualisation/main.html), although loading might take longer because the data has to be transferred over the web.
