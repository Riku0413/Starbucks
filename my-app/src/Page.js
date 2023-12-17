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

import { useMediaQuery } from '@mui/material';

const Page = () => {
  // 画面の横幅が600pxより大きいかどうかを確認
  const isWideScreen = useMediaQuery('(min-width:800px)');
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
        <div style={{height:'80px'}}></div>
        <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '100vw'}}>
        <Box sx={{width: '80vw'}}>
        <Box sx={{ width: isWideScreen ? '72%' : '100%', fontWeight: 'bold', fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'left', marginLeft: '10px' }}>
          フラペチーノ
          <div style={{fontSize: '20px', alignSelf: 'flex-end', marginBottom: '8px'}}>を</div>
        </Box>
          <Box sx={{ display: 'flex', flexDirection: isWideScreen ? 'row' : 'column', justifyContent: 'space-between', width: '80vw' }}>
            <Box sx={{ width: isWideScreen ? '72%' : '100%', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: isWideScreen ? null : 'center' }}>
            　栄養成分別に比較できるよ🧋
            </Box>
            <div style={{height:'20px'}}></div>
            <Box sx={{ width: isWideScreen ? '24%' : '100%', marginRight: isWideScreen? '20px' : '0' }}>
              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
                <InputLabel id="demo-simple-select-label" color='success'>nutrition</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                  color='success'
                >
                  <MenuItem value={"エネルギー"}>エネルギー</MenuItem>
                  <MenuItem value={"タンパク質"}>タンパク質</MenuItem>
                  <MenuItem value={"脂質"}>脂質</MenuItem>
                  <MenuItem value={"炭水化物"}>炭水化物</MenuItem>
                  <MenuItem value={"食塩相当量"}>食塩相当量</MenuItem>
                  <MenuItem value={"価格"}>価格</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </div>
      
      <div style={{height:'30px'}}></div>

      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Box sx={{width: '80vw'}}>
          <Card sx={{ width: '100%' }}>
            <div style={{height: '20px'}}></div>
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
                - Don't go to cafe if you really value your health -
              </Typography>
            </CardContent>
            <CardActions style={{marginRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
              <a href="https://product.starbucks.co.jp/beverage/frappuccino/" target="_blank" rel="noopener noreferrer">
                <Button size="small" variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>go to store</Button>
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
