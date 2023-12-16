import React from 'react';
import Box from '@mui/material/Box';
import D3Chart from './d3';
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from './d3';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Page = () => {

  return (
    <div style={{ backgroundColor: '#E6FFE9' }}>
      <div>Multiple Boxes Page</div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100vw'}}>
        <Box width={120} height={120} bgcolor="primary.main" color="white">
          Box 1
        </Box>
        <Box width={120} height={120} bgcolor="secondary.main" color="white">
          Box 2
        </Box>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100vw' }}>
      <Box width={700}>
      <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Data 1
            </Typography>
            <Typography variant="h5" component="div">
              Energy
            </Typography>
            <D3Chart />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

      </Box>
      </div>
    </div>

  );
};

export default Page;
