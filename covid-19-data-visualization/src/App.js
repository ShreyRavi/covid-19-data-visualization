//imports
import React, {useState, useEffect} from 'react';

//imports of custom React components
import DynamicCOVIDMap from './components/DynamicCOVIDMap';
import Header from './components/Header';
import Title from './components/Title';
import COVIDSlider from './components/COVIDSlider';
import Footer from './components/Footer';

//Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
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

const App = () => {
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

  const CSSClasses = useStyles(); //const to instatiate styles for use below (Material-UI)

  //method to handle click of top-right button to see the GitHub
  const handleGithub = () => {
    window.location = "https://github.com/ShreyRavi/covid-19-data-visualization";
  }

  //method to open/close the drawer
  const toggleDrawer = () => {
    const newDrawer = !drawer;
    setDrawer(newDrawer);
  }

  //return required HTML
  return (
    <div className={CSSClasses.root}>

      <Header 
        drawer={drawer}
        toggleDrawer={toggleDrawer} 
        CSSClasses={CSSClasses} 
        handleGithub={handleGithub} 
      />

      <COVIDSlider 
        setSliderVal={setSliderVal}
        daysSince={daysSince} 
      />

      <Title 
        sliderVal={sliderVal} 
      />

      <DynamicCOVIDMap 
        data={data} 
      />

      <Divider /><br />

      <Footer />

    </div>
  );
}

export default App;
