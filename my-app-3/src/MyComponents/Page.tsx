import { Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
// @ts-expect-error TS(6142): Module './D3Chart' was resolved to '/Users/kobayas... Remove this comment to see the full error message
import D3Chart from './D3Chart';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useContext } from 'react';
// @ts-expect-error TS(6142): Module './App' was resolved to '/Users/kobayashiri... Remove this comment to see the full error message
import { ItemContext } from './App';

const Page = () => {
  const [category, setCategory] = useState('エネルギー'); 
  const [sortOrder, setSortOrder] = useState('alpha');
  const context = useContext(ItemContext)
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
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

  const CategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const SortOrderChange = (event: any) => {
    setSortOrder(event.target.value);
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box sx={{bgcolor: '#E6FFE9' }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box sx={{height: '108px'}}></Box>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box sx={{height: '48px'}}></Box>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: '100vw'}}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{width: '80vw'}}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ width: '100%', fontWeight: 'bold', fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'left', marginLeft: '10px' }}>
            {itemCategory}
          </Box>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '80vw' }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{height:'20px'}}></Box>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{ width: '100%', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              栄養成分別に比較できるよ🧋
            </Box>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{height:'20px'}}></Box>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{ width: '100%', marginRight: '0', display: 'flex' }}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px', width: '45%' }}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <InputLabel id="demo-simple-select-label" color='success'>Category</InputLabel>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={CategoryChange}
                  color='success'
                >
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"エネルギー"}>エネルギー</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"タンパク質"}>タンパク質</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"脂質"}>脂質</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"炭水化物"}>炭水化物</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"食塩相当量"}>食塩相当量</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"食物繊維"}>食物繊維</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"糖質"}>糖質</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"ナトリウム"}>ナトリウム</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"カリウム"}>カリウム</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"トランス脂肪酸"}>トランス脂肪酸</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"飽和脂肪酸"}>飽和脂肪酸</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"カフェイン"}>カフェイン</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"健康偏差値"}>健康偏差値</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"不健康偏差値"}>不健康偏差値</MenuItem>
                </Select>
              </FormControl>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Box sx={{height: '24px', width: '10%'}}></Box>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '5px', width: '45%' }}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <InputLabel id="demo-simple-select-label" color='success'>Sort Order</InputLabel>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortOrder}
                  label="SortOrder"
                  onChange={SortOrderChange}
                  color='success'
                >
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"alpha"}>五十音順</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"desc"}>降順</MenuItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MenuItem value={"asc"}>昇順</MenuItem>
                </Select>
              </FormControl>

            </Box>
          </Box>
        </Box>
      </Box>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box sx={{height: '32px'}}></Box>

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box style={{ display: 'flex', justifyContent: 'center'}}>

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{width: '80vw'}}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Card sx={{ width: '100%' }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box style={{height: '20px'}}></Box>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <CardContent>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Box sx={{textAlign: 'left'}}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{marginLeft: '30px'}}>
                  Data
                </Typography>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Typography variant="h5" component="div" style={{marginLeft: '40px', fontWeight: 'bold'}}>
                  {category}
                </Typography>
              </Box>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Box id="chart-area" style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <D3Chart category={category} sortOrder={sortOrder} />
              </Box>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Box sx={{textAlign: 'left'}}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{marginLeft: '30px'}}>
                p.s.
              </Typography>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Typography variant="body2" style={{marginLeft: '30px'}}>
                健康に良い{itemCategory}を選んでね
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <br/>
                - Don't have anything if you really value your health -
              </Typography>
              </Box>
            </CardContent>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <CardActions style={{marginRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <a href={`https://product.starbucks.co.jp/${Name}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Button size="small" variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>go to store</Button>
              </a>
            </CardActions>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{height: '20px'}}></Box>
          </Card>
        </Box>
      </Box>
        
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box sx={{height: '100px'}}></Box>

    </Box>
  );
};

export default Page;
