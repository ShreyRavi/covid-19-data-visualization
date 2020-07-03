"""
api.py - Python backend to host Flask server and serve data for React visualizations
"""

import io 
import csv
from datetime import date, timedelta
from flask import Flask, make_response
import pandas as pd

app = Flask(__name__)

start_date = date(2020, 1, 21)
NYT_URL = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'

@app.route('/daysSince')
def get_days_since():
    today_date = date.today()
    days_since = today_date - start_date
    return {
        'daysSince': str(days_since.days)
    }

@app.route('/data/<daysSince>')
def data_response(daysSince):

    NYT_data = pd.read_csv(NYT_URL)

    try:
        date_to_parse = start_date + timedelta(days=int(daysSince))
    except Exception as e:
        date_to_parse = date.today() + timedelta(days=int(150))

    NYT_data_parsed = NYT_data[NYT_data['date'] == str(date_to_parse)]
    NYT_data_parsed['fips'] = NYT_data_parsed['fips'].astype(str).str[:-2]

    StringIO_instance = io.StringIO()
    NYT_data_parsed.to_csv(StringIO_instance)
    resp = make_response(StringIO_instance.getvalue())
    resp.headers["Content-Disposition"] = "attachment; filename=export.csv"
    resp.headers["Content-type"] = "text/csv"
    return resp
