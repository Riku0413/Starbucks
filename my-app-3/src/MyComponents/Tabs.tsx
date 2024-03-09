import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useContext } from 'react';
// @ts-expect-error TS(6142): Module './App' was resolved to '/Users/kobayashiri... Remove this comment to see the full error message
import { ItemContext } from './App';


function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const context = useContext(ItemContext);

  const tabsData = [
    { label: "Frappuccino", value: 0, name: "フラペチーノ®" },
    { label: "Coffee", value: 1, name: "コーヒー" },
    { label: "Espresso", value: 2, name: "エスプレッソ" },
    { label: "Tea", value: 3, name: "ティー｜TEAVANA™" },
    { label: "Dessert", value: 4, name: "デザート" },
    { label: "Pastry", value: 5, name: "ペストリー" },
    { label: "Sandwich", value: 6, name: "サンドイッチ" },
  ];

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    const selectedTab = tabsData.find(tab => tab.value === newValue);
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    context.setItemCategory(selectedTab.name);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box sx={{ width: '100%' }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* ScrollButton プロパティを使用してスクロール機能を有効にする */}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'green', // アンダーバーの色をオレンジに変更
              '& .Mui-selected': {
                color: 'green', // 選択中のタブをオレンジ色に変更
              },
            },
          }}
        >
          {tabsData.map((tab, index) => (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Tab 
              key={index} 
              label={tab.label} 
              {...a11yProps(index)} 
              sx={{
                '&.Mui-selected': {
                  color: 'green', // オレンジ色に変更
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
