# [COVID-19 Data Visualization](https://covid-19-data-visualization-py.herokuapp.com/)
A quick example of a full-stack data visualization project, with a React front-end and Python back-end. Note: This is a proof of concept, and much further work will be needed to be done to make the app more efficient.
<p align="center"><img src="https://raw.githubusercontent.com/ShreyRavi/covid-19-data-visualization/master/covid-19-data-visualization/screenshot.PNG" height="93%" width="93%">Screenshots of the COVID-19 Data Visualization in action.</p>

## [Link to Live Demo](https://covid-19-data-visualization-py.herokuapp.com/)

## Usage
Go to [the deployed app](https://covid-19-data-visualization-py.herokuapp.com/) and move the blue slider on top left/right to reduce/increase the number of days since 1/22/2020 to generate a heatmap of COVID-19 cases in the US.

## Local Setup
1. Clone Repository
```
git clone https://github.com/ShreyRavi/covid-19-data-visualization.git
```
2. Change to project top folder
```
cd covid-19-data-visualization
```
3. PIP install requirements
```
pip install -r requirements.txt
```
4. Run Flask app via yarn
```
yarn start-api
```
5. Run React frontend app via yarn
```
yarn start
```

## React Components
- **COVIDSlider** - a React component that holds the Material-UI Slider component so the user can choose the date (or days since 1/21/2020) to show data for
- **DynamicCOVIDMap** - a React component using [react-simple-maps](https://www.react-simple-maps.io/) to display pulled `.csv` data split by quintiles
- **Footer** - a React component that holds the front-end for the typical footer information
- **Header** - a React component that holds the front-end for the header Material-UI AppBar on top
- **HelpDrawer** - a React component that holds the Material-UI Drawer component for the informational drawer
- **Title** - a React component that holds the front-end for the title

## API Routes
- **`/data/<daysSince>`** - returns a generated `.csv` file from the New York Times COVID-19 data using Pandas with data only for the `daysSince` (a `GET` parameter) days since 1/22/2020, with a little data clean-up
- **`/`** - the static file index.html, which then contains the code to start the built React front-end
- **`/daysSince/`** - API route to get days since 1/21/2020
See [api/api.py](https://raw.githubusercontent.com/ShreyRavi/covid-19-data-visualization/master/covid-19-data-visualization/api/api.py) for Python/Flask code detailing this logic.

## Built With
- [Flask](https://palletsprojects.com/p/flask/)
- [pandas](https://pandas.pydata.org/)
- [python-dotenv](https://pypi.org/project/python-dotenv/)
- [Heroku](http://heroku.com/)
- [Gunicorn](https://gunicorn.org/)
- [d3-scale](https://www.npmjs.com/package/d3-scale)
- [d3-fetch](https://www.npmjs.com/package/d3-fetch)
- [react-simple-maps](https://www.react-simple-maps.io/)
- [Material-UI](https://material-ui.com/)

## Data Source/Attribution
The COVID-19 data is sourced from the New York Times's public GitHub repository CSV of COVID-19 data, from [here](https://github.com/nytimes/covid-19-data).

## Future Plans
- More efficient parsing of data 
- Possible date range GIF-like visualizations of growth over time
- Database to store data rather than pulling everytime from NYT
