import React from 'react';
import Box from '@mui/material/Box';
import D3Chart from './d3';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';


const Page = () => {
  const [category, setCategory] = React.useState('エネルギー');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    // Additional logic to reload D3Chart if needed
    console.log('Category changed, reload D3Chart');
  }, [category]);

  return (
      <div style={{ backgroundColor: '#E6FFE9' }}>
        <div style={{height:'60px'}}></div>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100vw'}}>
        <Box sx={{fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          栄養成分別にデータを見れるよ！
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
            <InputLabel id="demo-simple-select-label">nutrition</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={"エネルギー"}>エネルギー</MenuItem>
              <MenuItem value={"タンパク質"}>タンパク質</MenuItem>
              <MenuItem value={"脂質"}>脂質</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      
      <div style={{height:'30px'}}></div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100vw' }}>
      <Box width={700}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{marginLeft: '30px'}}>
              Data
            </Typography>
            <Typography variant="h5" component="div" style={{marginLeft: '30px'}}>
              {category}
            </Typography>

            <D3Chart category={category}/>
            
            <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{marginLeft: '30px'}}>
              p.s.
            </Typography>
            <Typography variant="body2" style={{marginLeft: '30px'}}>
              健康に良いフラペチーノを選んでね
              <br/>
              - Don't go to cafe if you really focus on health -
            </Typography>
          </CardContent>
          <CardActions style={{marginRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
            <a href="https://product.starbucks.co.jp/beverage/frappuccino/" target="_blank" rel="noopener noreferrer">
              <Button size="small" variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>Buy one</Button>
            </a>
          </CardActions>
          <div style={{height: '20px'}}></div>
        </Card>
      </Box>
      </div>
      <div style={{height: '100px'}}></div>
    </div>

  );
};

export default Page;
