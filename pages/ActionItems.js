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

const ActionItems = () => {
  const {classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant='h4'>Action Items</Typography>
      <Typography>insert the content of the ActionItems page.</Typography>
    </Box>
  );
};

export default ActionItems;
