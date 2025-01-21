# SpotiVis
By Stijn, Veit & Ko for INFOMVIS UU 2025

---
SpotiVis provides a visualisation showing a full year of Spotify top 50 charts from 73 different countries. It can give insight into relations between songs, their artists albums and genres. Besides that, you can explore song rankings over for the past year for 73 different countries in the rank chart or investigate the intrinsic selected song features like Dancability or Valence in the feature matrix.

## File Overview
- `\data_preparation\main.ipnb`: A Python notebook containing the code for collecting and wrangling the source data
- `\data_preparation\cache`: A cache directory used by the Python notebook
- `\Visualisation`: All code for the visualizations
- `\Visualisation\css`: Styling
- `\Visualisation\data`: The directory where all source data should go
- `\Visualisation\js`: All JavaScript - including d3 and Bootstrap - divided into multiple files relating to their function on the page
- `\Visualisation\main.html`: The place where all visualisations come together. This page should be visited to actually experience SpotiVis

## Prerequisites for Running Data Preparation
*TODO*

## Prerequisites for Running SpotiVis
1. Download the wrangled and prepared data from [this link](https://solisservices-my.sharepoint.com/:f:/g/personal/s_j_d_lievaart_students_uu_nl/EsnOkMxa9iBMgjGCxXGu8b0BvjOsVQQl7Djd5c0afCo5AQ?e=ytYOfe)
2. Unzip the data and place the files in the `\data`directory
- Make sure `alpha2ToCountryName.json`, `artists.json`, `measurements.csv` and `songs.json` all exist
4. From the `Visualization` directory, use Docker to build the image and run the container.
```bash
docker compose up --build
```
4. Visit `http://localhost:8080/main.html`
5. Loading in all the data should take around 5 seconds. After that, the visualisation should be all functional!

Alternatively, the visualization can be accessed at [TODO].
