import React from 'react';
import {Typography, Box, TextField} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  container: {
      display: 'flex',
      flexDirection: 'column',
      width: "100vw",
      marginTop: 20,
  },

});

const HomePage = () => {
  const {classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant='h4'>Home Page</Typography>
      <Typography>im assuming we should make this blank?</Typography>
    </Box>
  );
};

export default HomePage;
