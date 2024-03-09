import { Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import D3Chart from './D3Chart';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { ItemContext } from './App';

const Page = () => {
  const [category, setCategory] = useState('エネルギー'); 
  const [sortOrder, setSortOrder] = useState('alpha');
  const context = useContext(ItemContext)
  let itemCategory = context.itemCategory
  console.log(itemCategory)

  let Name = "beverage/frappuccino"
  if (itemCategory === "フラペチーノ®") {
    Name = "beverage/frappuccino";
  } else if (itemCategory === "コーヒー") {
    Name = "beverage/drip";
  } else if (itemCategory === "エスプレッソ") {
    Name = "beverage/espresso";
  } else if (itemCategory === "ティー｜TEAVANA™") {
    Name = "beverage/tea";
  } else if (itemCategory === "デザート") {
    Name = "food/dessert";
  } else if (itemCategory === "ペストリー") {
    Name = "food/pastry";
  } else if (itemCategory === "サンドイッチ") {
    Name = "food/sandwich";
  } else {
    Name = "defaultFallbackValue";
  }

  const CategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const SortOrderChange = (event) => {
    setSortOrder(event.target.value);
  }

  return (
    <Box sx={{bgcolor: '#E6FFE9' }}>
      <Box sx={{height: '108px'}}></Box>
      <Box sx={{height: '48px'}}></Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: '100vw'}}>
        <Box sx={{width: '80vw'}}>
          <Box sx={{ width: '100%', fontWeight: 'bold', fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'left', marginLeft: '10px' }}>
            {itemCategory}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '80vw' }}>
            <Box sx={{height:'20px'}}></Box>
            <Box sx={{ width: '100%', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              栄養成分別に比較できるよ🧋
            </Box>
            <Box sx={{height:'20px'}}></Box>
            <Box sx={{ width: '100%', marginRight: '0', display: 'flex' }}>
              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px', width: '45%' }}>
                <InputLabel id="demo-simple-select-label" color='success'>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={CategoryChange}
                  color='success'
                >
                  <MenuItem value={"エネルギー"}>エネルギー</MenuItem>
                  <MenuItem value={"タンパク質"}>タンパク質</MenuItem>
                  <MenuItem value={"脂質"}>脂質</MenuItem>
                  <MenuItem value={"炭水化物"}>炭水化物</MenuItem>
                  <MenuItem value={"食塩相当量"}>食塩相当量</MenuItem>
                  <MenuItem value={"食物繊維"}>食物繊維</MenuItem>
                  <MenuItem value={"糖質"}>糖質</MenuItem>
                  <MenuItem value={"ナトリウム"}>ナトリウム</MenuItem>
                  <MenuItem value={"カリウム"}>カリウム</MenuItem>
                  <MenuItem value={"トランス脂肪酸"}>トランス脂肪酸</MenuItem>
                  <MenuItem value={"飽和脂肪酸"}>飽和脂肪酸</MenuItem>
                  <MenuItem value={"カフェイン"}>カフェイン</MenuItem>
                  <MenuItem value={"健康偏差値"}>健康偏差値</MenuItem>
                  <MenuItem value={"不健康偏差値"}>不健康偏差値</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{height: '24px', width: '10%'}}></Box>

              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px', width: '45%' }}>
                <InputLabel id="demo-simple-select-label" color='success'>Sort Order</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortOrder}
                  label="SortOrder"
                  onChange={SortOrderChange}
                  color='success'
                >
                  <MenuItem value={"alpha"}>五十音順</MenuItem>
                  <MenuItem value={"desc"}>降順</MenuItem>
                  <MenuItem value={"asc"}>昇順</MenuItem>
                </Select>
              </FormControl>

            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{height: '32px'}}></Box>

      <Box style={{ display: 'flex', justifyContent: 'center'}}>

        <Box sx={{width: '80vw'}}>
          <Card sx={{ width: '100%' }}>
            <Box style={{height: '20px'}}></Box>
            <CardContent>
              <Box sx={{textAlign: 'left'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{marginLeft: '30px'}}>
                  Data
                </Typography>
                <Typography variant="h5" component="div" style={{marginLeft: '40px', fontWeight: 'bold'}}>
                  {category}
                </Typography>
              </Box>

              <Box id="chart-area" style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
                <D3Chart category={category} sortOrder={sortOrder} />
              </Box>

              <Box sx={{textAlign: 'left'}}>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{marginLeft: '30px'}}>
                p.s.
              </Typography>
              <Typography variant="body2" style={{marginLeft: '30px'}}>
                健康に良い{itemCategory}を選んでね
                <br/>
                - Don't have anything if you really value your health -
              </Typography>
              </Box>
            </CardContent>
            <CardActions style={{marginRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
              <a href={`https://product.starbucks.co.jp/${Name}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button size="small" variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>go to store</Button>
              </a>
            </CardActions>
            <Box sx={{height: '20px'}}></Box>
          </Card>
        </Box>
      </Box>
        
      <Box sx={{height: '100px'}}></Box>

    </Box>
  );
};

export default Page;
