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

## Built With
- [Flask](https://palletsprojects.com/p/flask/)
- [pandas](https://pandas.pydata.org/)
- [python-dotenv](https://pypi.org/project/python-dotenv/)
- [Heroku](http://heroku.com/)
- [Gunicorn](https://gunicorn.org/)
- [react-simple-maps](https://www.react-simple-maps.io/)
- [Material-UI](https://material-ui.com/)

## Data Source/Attribution
The COVID-19 data is sourced from the New York Times's public GitHub repository CSV of COVID-19 data, from [here](https://github.com/nytimes/covid-19-data).

## Future Plans
- More efficient parsing of data (right now, we're pulling EVERY TIME the slider is moved!)
