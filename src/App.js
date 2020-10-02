import React from 'react';
import './App.scss';
import Data from './EnhancedTable';
import { Facebook, Telegram } from '@material-ui/icons';
import { Fab, Container, makeStyles, Box, Typography, Paper } from '@material-ui/core';
//https://material-ui.com/components/material-icons/

const useStyles = makeStyles((theme) => ({
  navIcon: {
    marginRight: "10px"
  },
  bottomContainer: {
    marginTop: "10px",
    bottom: "0px",
    width: "100%",
    marginLeft: "0px",
    textAlign: "center",
    backgroundColor: "#F0F0F0"
  }
}))

function App() {
  const classes = useStyles();

  return (
    <Box >
      <Data />
      <Paper display="block" className={classes.bottomContainer}>
      <Typography variant="h6" display="inline" gutterBottom>
      Get in touch with us - 
      </Typography>
      <Box display="block">
      <Fab 
      style={{margin: "10px 0px 20px 0px"}}
        variant="extended" 
        href="http://m.me/GenietalkSample" 
        target="_blank"
        color="primary">
          <Facebook className={classes.navIcon}/>
          Open Messenger
      </Fab>
      <Fab 
      style={{margin: "10px 0px 20px 10px"}}
        variant="extended"
        href="http://t.me/GenietalkSamplebot" 
        target="_blank"
        color="primary">
          <Telegram className={classes.navIcon}/>
          Open Telegram
      </Fab>

      {/* <Button 
        variant="contained" 
        href="http://m.me/GenietalkSample" 
        target="_blank"
        color="primary"> <Facebook /> Open Messenger</Button>
      <Button 
      style={{marginLeft:"10px"}}
        variant="contained" 
        href="http://t.me/GenietalkSamplebot" 
        target="_blank"
        color="primary"> <Telegram /> Open Telegram</Button> */}
        </Box>
        </Paper>

    </Box>
  );
}

export default App;
