//imports
import React, {useState, useEffect} from 'react';
import DynamicCOVIDMap from './DynamicCOVIDMap';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import { csv } from "d3-fetch";

//makeStyles - where the CSS for the project will go
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
}));

function App() {
  //useState variables 
  const [daysSince, setDaysSince] = useState(0); //days since value for the slider position
  const [sliderVal, setSliderVal] = useState(150); //set default start to 150 just to show a pretty map
  const [data, setData] = useState([]); //state to hold data so map is refreshed with every change of slider
  const [drawer, setDrawer] = useState(false); //state for whether drawer is visible

  //onMount method, just get the number of days in the beginning to render size of slider
  useEffect(() => {
    fetch('/daysSince').then(res => res.json()).then(days => {
      setDaysSince(days.daysSince);
    });
  }, []);

  //useEffect called every time slider is manipulated
  useEffect(() => {
    if(typeof sliderVal != 'undefined') { //if not undefined (usually called at very beginning with undefined [Object object])
      csv('/data/' + sliderVal).then(counties => {
          setData(counties);
        }); //async method to load data from our own Python API endpoint
    }
  }, [sliderVal]);

  const CSSClasses = useStyles();
  const handleGithub = () => {
    window.location = "https://github.com/ShreyRavi/covid-19-data-visualization";
  }
  const toggleDrawer = () => {
    const newDrawer = !drawer;
    setDrawer(newDrawer);
  }
  return (
    <div className={CSSClasses.root}>
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
      <Typography variant="h4">   COVID-19 Data Visualization Help and Info</Typography>
      <Typography variant="body1">   Instructions: Move the blue slider above the map to adjust how many days after 1/22/2020 <br />you'd like the heatmap to populate. The map should auto-update based on the date chosen.   </Typography>
      <Typography variant="body1">   Note: Application is extremely slow currently due to repeated pulling from NYT data. <br />Future updates should drastically reduce this repeated pulls.   </Typography>
      <Divider />
      <center><Typography variant="body2">Copyright &copy; Shrey Ravi 2020. Data from <a href="">New York Times</a>. *Date chosen since start of NYT data collection. <a href="https://github.com/ShreyRavi/covid-19-data-visualization">GitHub</a>.</Typography></center>
      </Drawer>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" className={CSSClasses.menuButton} color="inherit" aria-label="menu">
            <HelpOutlineIcon />
          </IconButton>
          <Typography variant="h6" className={CSSClasses.title}>
            COVID-19 Data Visualization
          </Typography>
          <Button onClick={handleGithub} color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
      <center><Typography variant="h6">COVID-19 Heatmap Over Time (Days Since 1/22/2020*)</Typography><Typography variant="body2">Select number of days using slider below.</Typography></center>
        <Slider
          onChange={(e, val) => {setSliderVal(parseFloat(val))}}
          defaultValue={150}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={parseInt(daysSince)}
        />
        <center><Typography variant="h4">{sliderVal} Days Since 1/22/2020 USA COVID-19 Heatmap</Typography></center>
        <DynamicCOVIDMap data={data} />
      <Divider /><br />
      <center><Typography variant="body2">Copyright &copy; Shrey Ravi 2020. Data from <a href="">New York Times</a>. *Date chosen since start of NYT data collection.</Typography></center>
    </div>
  );
}

export default App;
