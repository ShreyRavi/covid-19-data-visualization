import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const HelpDrawer = ({drawer, toggleDrawer}) => {
    return(
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
          <Typography variant="h4">COVID-19 Data Visualization Help and Info</Typography>
          <Typography variant="body1">   Instructions: Move the blue slider above the map to adjust how many days after 1/22/2020 <br />you'd like the heatmap to populate. The map should auto-update based on the date chosen.   </Typography>
          <Typography variant="body1">   Note: Application is extremely slow currently due to repeated pulling from NYT data. <br />Future updates should drastically reduce this repeated pulls.   </Typography>
          <Divider />
          <center><Typography variant="body2">Copyright &copy; Shrey Ravi 2020. Data from <a href="">New York Times</a>. *Date chosen since start of NYT data collection. <a href="https://github.com/ShreyRavi/covid-19-data-visualization">GitHub</a>.</Typography></center>
        </Drawer>
    );
}

export default HelpDrawer;