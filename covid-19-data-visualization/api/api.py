"""
api.py - Python backend to host Flask server and serve data for React visualizations
"""

#default imports
import io #for csv generation
from datetime import date, timedelta #for date parsing

#library imports
from flask import Flask, make_response #Flask to host backend
import pandas as pd #pandas to parse New York Times csv

#main Flask initialization, static folder/static url path are changed so that the React App is pointed correctly on deployment
app = Flask(__name__, static_folder='../build', static_url_path='/')

#constant date when NYT data was start collected
start_date = date(2020, 1, 21)

#constant endpoint URL to get county-level data from NYT
NYT_URL = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'

@app.route('/')
def index():
    """default index route

    Returns:
        static file: the static file index.html, which then contains the code to start the built React frontend
    """
    return app.send_static_file('index.html')

@app.route('/daysSince')
def get_days_since():
    """API route to get days since 1/21/2020

    Returns:
        json: json response with 1 member - 'daysSince' a string of the number of days since 1/21/2020
    """
    today_date = date.today()
    days_since = today_date - start_date
    return {
        'daysSince': str(days_since.days)
    }

@app.route('/data/<daysSince>')
def data_response(daysSince):
    """[summary]

    Args:
        daysSince ([type]): [description]

    Returns:
        csv: a generated csv file with data only for the daysSince days since 1/21/2020, with a little data clean-up
    """
    #use pandas to pull csv from NYT data
    NYT_data = pd.read_csv(NYT_URL)

    #try to get the date to parse
    try:
        date_to_parse = start_date + timedelta(days=int(daysSince))
    #if this fails, then that means it's just being called with [Object object] as daysSince, so return default map data
    except Exception as e:
        date_to_parse = date.today() + timedelta(days=int(150))

    #get only the NYT data for the selected date to look at
    NYT_data_parsed = NYT_data[NYT_data['date'] == str(date_to_parse)]

    #convert all FIPS code numbers to not have '.0' precision, as that initially could mess up the front-end (FIPS should be codes not floats)
    NYT_data_parsed['fips'] = NYT_data_parsed['fips'].astype(str).str[:-2]

    #code to handle creating a csv file to download
    StringIO_instance = io.StringIO()
    NYT_data_parsed.to_csv(StringIO_instance) #print the generated csv not to stdout

    #create response of the csv data and mark it as such for download
    resp = make_response(StringIO_instance.getvalue())
    resp.headers["Content-Disposition"] = "attachment; filename=export.csv"
    resp.headers["Content-type"] = "text/csv"

    return resp
