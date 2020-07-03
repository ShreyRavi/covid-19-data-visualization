import React from 'react';
import Typography from '@material-ui/core/Typography';

const Title = ({sliderVal}) => {
    return(
        <center><Typography variant="h4">{sliderVal} Days Since 1/22/2020 USA COVID-19 Heatmap</Typography></center>
    );
}
export default Title;