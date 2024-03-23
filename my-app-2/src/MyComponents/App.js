import React from "react";
import "./App.css";
import Header from "./Header";
import Page from "./Page";
import { createContext } from "react";
import useItemCategory from "../hooks/ItemHooks";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { drawer } from "./Drawer";

export const ItemContext = createContext();

const drawerWidth = 240;

const tabsData = [
  { label: "Frappuccino", value: 0, name: "フラペチーノ®" },
  { label: "Coffee", value: 1, name: "コーヒー" },
  { label: "Espresso", value: 2, name: "エスプレッソ" },
  { label: "Tea", value: 3, name: "ティー｜TEAVANA™" },
  { label: "Dessert", value: 4, name: "デザート" },
  { label: "Pastry", value: 5, name: "ペストリー" },
  { label: "Sandwich", value: 6, name: "サンドイッチ" },
];

const nameMap = {
  "フラペチーノ®": "beverage/frappuccino",
  "コーヒー": "beverage/drip",
  "エスプレッソ": "beverage/espresso",
  "ティー｜TEAVANA™": "beverage/tea",
  "デザート": "food/dessert",
  "ペストリー": "food/pastry",
  "サンドイッチ": "food/sandwich",
};

const menuItems = [
  "エネルギー",
  "タンパク質",
  "脂質",
  "炭水化物",
  "食塩相当量",
  "食物繊維",
  "糖質",
  "ナトリウム",
  "カリウム",
  "トランス脂肪酸",
  "飽和脂肪酸",
  "カフェイン",
  "健康偏差値",
  "不健康偏差値",
];

const unitMap = {
  "エネルギー": "kcal",
  "タンパク質": "g",
  "脂質": "g",
  "炭水化物": "g",
  "食塩相当量": "g",
  "食物繊維": "g",
  "糖質": "g",
  "ナトリウム": "mg",
  "カリウム": "mg",
  "カフェイン": "mg",
  "トランス脂肪酸": "g",
  "飽和脂肪酸": "g"
};

const csvPath = "ex_data.csv"

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <div className="App">
      <ItemContext.Provider value={useItemCategory(tabsData[0]["name"])}>
        <Box>
          <Header
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
            tabsData={tabsData}
          />
          <Page drawerWidth={drawerWidth} menuItems={menuItems} nameMap={nameMap} unitMap={unitMap} csvPath={csvPath}/>
        </Box>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer({ handleDrawerClose })}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer({})}
          </Drawer>
        </Box>
      </ItemContext.Provider>
    </div>
  );
}

export default App;
