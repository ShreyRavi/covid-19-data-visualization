import React from 'react';
import Slider from '@material-ui/core/Slider';

const COVIDSlider = ({setSliderVal, daysSince}) => {
    return(
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
    );
}
export default COVIDSlider;