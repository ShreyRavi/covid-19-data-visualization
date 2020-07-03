import React from 'react';
import HelpDrawer from './HelpDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';

const Header = ({drawer, toggleDrawer, CSSClasses, handleGithub}) => {
    return(
        <div>
            <HelpDrawer drawer={drawer} toggleDrawer={toggleDrawer} />
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
        </div>
    );
}
export default Header;