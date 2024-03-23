import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import D3Chart from "./D3Chart";
import D3ChartPC from "./D3ChartPC";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { ItemContext } from "./App";

const Page = ({ drawerWidth, menuItems, nameMap, unitMap, csvPath }) => {
  const isMobile = window.innerWidth <= 800; // 768は一般的なモバイル画面の幅ですが、必要に応じて調整してください

  const [category, setCategory] = useState(menuItems[0]);
  const [sortOrder, setSortOrder] = useState("alpha");
  const context = useContext(ItemContext);
  let itemCategory = context.itemCategory;
  console.log(itemCategory);

  // 商品ジャンルごとのリンク名を取得
  const Name = nameMap[itemCategory] || null;

  const CategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const SortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box
      sx={{
        bgcolor: "#E6FFE9",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Box sx={{ height: "156px" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "100%",
        }}
      >
        {/* <Box sx={{width: '80%'}}> */}
        {/* <Box sx={{ width: '100%', fontWeight: 'bold', fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'left', marginLeft: '10px' }}>
            {itemCategory}
          </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              fontWeight: "bold",
              fontSize: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              marginLeft: "10px",
            }}
          >
            {itemCategory}
          </Box>

          <Box sx={{ height: "20px" }} />
          <Box
            sx={{
              width: "100%",
              fontWeight: "bold",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            栄養成分別に比較できるよ🧋
          </Box>
          <Box sx={{ height: "20px" }} />

          <Box sx={{ width: "100%", marginRight: "0", display: "flex" }}>
            <FormControl
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "45%",
              }}
            >
              <InputLabel id="demo-simple-select-label" color="success">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={CategoryChange}
                color="success"
              >
                {menuItems.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ height: "24px", width: "10%" }} />

            <FormControl
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: "45%",
              }}
            >
              <InputLabel id="demo-simple-select-label" color="success">
                Sort Order
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortOrder}
                label="SortOrder"
                onChange={SortOrderChange}
                color="success"
              >
                <MenuItem value={"alpha"}>五十音順</MenuItem>
                <MenuItem value={"desc"}>降順</MenuItem>
                <MenuItem value={"asc"}>昇順</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* </Box> */}
      </Box>

      <Box sx={{ height: "32px" }} />

      {/* ここからデータ可視化コンポーネントの話 */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {/* <Box sx={{width: '80vw'}}> */}
        <Card sx={{ width: "100%" }}>
          <Box style={{ height: "20px" }} />
          <CardContent>
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                style={{ marginLeft: "30px" }}
              >
                Data
              </Typography>
              <Typography
                variant="h5"
                component="div"
                style={{ marginLeft: "40px", fontWeight: "bold" }}
              >
                {category}
              </Typography>
            </Box>

            <Box
              id="chart-area"
              style={{ width: "90%", margin: "0 auto", textAlign: "center" }}
            >
              {isMobile ? (
                <D3Chart category={category} sortOrder={sortOrder} unitMap={unitMap} csvPath={csvPath}/>
              ) : (
                <D3ChartPC category={category} sortOrder={sortOrder} />
              )}
            </Box>

            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                style={{ marginLeft: "30px" }}
              >
                p.s.
              </Typography>
              <Typography variant="body2" style={{ marginLeft: "30px" }}>
                健康に良い{itemCategory}を選んでね
                <br />- Don't have anything if you really value your health -
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            style={{
              marginRight: "40px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <a
              href={`https://product.starbucks.co.jp/${Name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button
                size="small"
                variant="contained"
                style={{ backgroundColor: "green", color: "white" }}
              >
                go to store
              </Button>
            </a>
          </CardActions>
          <Box sx={{ height: "20px" }} />
        </Card>
        {/* </Box> */}
      </Box>

      <Box sx={{ height: "100px" }} />
    </Box>
  );
};

export default Page;
