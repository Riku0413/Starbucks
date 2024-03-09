import * as React from 'react';
import * as d3 from "d3";
import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ItemContext } from './App';


const D3Chart = ({category, sortOrder}) => {
  console.log("D3Chart");

  const isFirstRender = useRef(true);
  const context = useContext(ItemContext);
  let itemCategory = context.itemCategory;
  let chart = context.contextChart;
  let allData = context.contextAllData;
  let contextData = context.contextData;
  let selectedItem = itemCategory;
  let selectedCategory = category;
  let selectedValue = sortOrder;
  let data;
  let currentData;

  // グラフの描画、アップデート
  const createGraphs = (data, category) => {    

    console.log("createGraphs");
    console.log(`データ数は：${data.length}`);
    console.log(data);
    console.log(category);
  
    const width = 640;
    const height = 84 * data.length;
    const marginTop = 20;
    const marginRight = 100;
    const marginBottom = 30;
    const marginLeft = 120;
    
    // 値に単位をつけて返す関数
    const getLabelText = (d, category) => {
        if (d[`${category}_number`] < 0) {
            return "no data";
        } else if (category === "エネルギー") {
            return d[`${category}_number`] + ' kcal';
        } else if (category === "タンパク質" | category === "脂質" | category === "炭水化物" | category === "食塩相当量" | category === "食物繊維" | category === "糖質" | category === "トランス脂肪酸" | category === "飽和脂肪酸" ) {
            return d[`${category}_number`] + ' g';
        } else if (category === "ナトリウム" | category === "カリウム" | category === "カフェイン")　{
            return d[`${category}_number`] + ' mg';
        } else {
            return d[`${category}_number`];
        }
    };
  
    data.forEach(d => {
        if (d[category] === "") {
            d[category] = "-1";
        }
        d[`${category}_number`] = +d[category]; // 数字の文字列を、数値に変換
    });
  
    d3.select("#chart-area").select("svg").remove();
  
    console.log("here")
    const svg = d3.select("#chart-area")
        .append("svg")
        .attr("viewBox", [0, 0, width, height*2]) // 変更してみた！！！
        .attr("style", `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`);
  
    // x軸（水平位置）のスケールを宣言
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[`${category}_number`])]).nice()
        .range([marginLeft, width - marginRight]);
  
    // y軸（垂直位置）のスケールと対応する軸ジェネレータを宣言
    const y = d3.scaleBand()
        .domain(data.map(d => d.letter))
        .range([marginTop + 10, height *2 - marginBottom])
        .padding(0.6);
  
    // テキストを描画
    const gy = svg.append("g").selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "item-name")
        .attr("y", (d) => y(d.letter) - 15)
        .attr("x", 120)
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .attr("font-size", "30px")
        .text(d => (d.letter.length > 18) ? d.letter.slice(0, 18) + "..." : d.letter);

  
    const images = svg.append("g").selectAll("image")
        .data(data)
        .enter()
        .append("image")
        .attr("x", 0)
        .attr("y", (d) => y(d.letter) - 5)
        .attr("width", 90) // 画像の幅
        .attr("height", 90) // 画像の高さ
        .attr("cursor", "pointer")
        .attr("xlink:href", (d) => d.円形画像URL)
        .on("click", function(e, d) {
            window.open(d.商品URL, "_blank"); // 新しいタブで外部リンクを開く
        });
    
    // 棒グラフを描画
    const bar = svg.append("g")
        .attr("fill", "green")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .style("mix-blend-mode", "multiply") // 重なっている時のカラーを暗くする
        .attr("y", d => y(d.letter)) // 棒の成長アニメーションの開始 y-座標
        .attr("x", marginLeft)
        .attr("width", d => Math.max(x(d[`${category}_number`]) - marginLeft, 0))
        .attr("height", y.bandwidth());
  
    // ここに分割して成長アニメーションを置くことで、ソートアニメーションを行使できる！
    bar
      .attr("width", 0) // Set initial width to 0
      .attr("height", y.bandwidth())
      .transition() // Add transition for initial animation
      .duration(750)
      .delay((d, i) => i * 100)
      .attr("width", d => Math.max(x(d[`${category}_number`]) - marginLeft, 0))
  
    const text = svg.append("g").selectAll("text")
      .data(data)
      .enter()  // enter() を追加して新しいデータに対する要素を作成
      .append("text")
      .attr("class", "value") // 動的に生成したIDを割り当て
      .attr("id", (d, i) => `text-${i}`) // 動的に生成したIDを割り当て
      .attr("x", d => 10 + x(Math.max(d[`${category}_number`], 0))) // テキストのX座標（バーの右横に調整）
      .attr("y", d => y(d.letter) + 40) // テキストのY座標
      .text(d => getLabelText(d, category))
      .attr("fill", "black")
      .attr("font-size", "30px")
      .attr("font-family", "Arial"); // フォントを指定
  
    text
      .attr("opacity", 0) // 初期状態で透明に設定
      .transition() // フェードインのアニメーション
      .duration(1000);
  
    return Object.assign(svg.node(), {
        update(order, flag) {
            console.log("update");
  
            const sortedData = [...data].sort(order);    
            y.domain(sortedData.map(d => d.letter));

            // この値を調整すれば、ソートが終わったジャストタイミングで透明度を1にできそう！
            const t = svg.transition()
                .duration(1000);
    
            bar.data(sortedData, d => d.letter)
                .attr("opacity", flag)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter)) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)
                .attr("opacity", 1);
  
            text.data(sortedData, d => d.letter)
                .attr("opacity", 0)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) + 40) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)
                .transition(t/2)
                .attr("x", d => 10 + x(Math.max(d[`${category}_number`], 0)) + 5) // テキストのX座標（バーの右横に調整）
                .attr("opacity", 1); // アニメーション中に不透明に変更
  
            gy.data(sortedData, d => d.letter)
                .attr("opacity", flag)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) - 15) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)
                .attr("x", 120)
                .attr("opacity", 1); // アニメーション中に不透明に変更
    
            images.data(sortedData, d => d.letter)
                .attr("opacity", flag)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) - 15) // 棒グラフのソートの終了位置 y-座標
                .attr("x", 0)
                .attr("opacity", 1); // アニメーション中に不透明に変更
  
            return sortedData // 直前のソート順を参照したいので、ここでソートデータを返す！
        }
    });
    
  }

  // ソートオーダーに基づく比較関数
  const comparator = (a, b) => {
      if (selectedValue === "asc") {
          return a[selectedCategory] - b[selectedCategory];
      } else if (selectedValue === "desc") {
          return b[selectedCategory] - a[selectedCategory];
      } else if (selectedValue === "alpha") {
          return a.letter.localeCompare(b.letter);
      }
  };

  // データのフィルタリングを更新し再描画する関数
  function updateFilteredData() {
      console.log("Filtering category changed")
      console.log(data)
      currentData = allData.filter(item => item["商品カテゴリ"] === selectedItem); // "商品カテゴリ２" 列を基にフィルタリング
      currentData = currentData.sort(comparator); // ソート

      d3.select("svg")
          .selectAll(".value")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0)  // 透明度を0に変更

      d3.select("svg")
          .selectAll(".item-name")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0)  // 透明度を0に変更

      d3.select("svg")
          .selectAll("image")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0)  // 透明度を0に変更
  
      // SVG内のrect要素に対してアニメーションを追加
      d3.select("svg")
          .selectAll("rect")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0)  // 透明度を0に変更
          .end()  // transitionが終了したらresolveするPromiseを返す
          .then(() => {                
              chart = createGraphs(currentData, selectedCategory); // グラフを再描画
              currentData = chart.update(comparator, 0); // グラフを更新
              context.setContextChart(chart);
              context.setContextData(currentData);
          });

      return currentData
  }

  // カテゴリセレクタの変更時に呼ばれる関数
  async function onCategoryChange() {
    console.log("onCategoryChange")
    console.log(`選択されたカテゴリは：${selectedCategory}`)

    d3.select("#chart-area").select("svg")
        .selectAll(".value")
        .attr("opacity", 1)
        .transition()
        .duration(500)  // アニメーションの時間（ミリ秒）
        .attr("opacity", 0)  // 透明度を0に変更

    d3.select("#chart-area").select("svg")
        .selectAll(".item-name")
        .attr("opacity", 1)
        .transition()
        .duration(500)  // アニメーションの時間（ミリ秒）
        .attr("opacity", 0.3)  // 透明度を0に変更

    d3.select("#chart-area").select("svg")
        .selectAll("image")
        .attr("opacity", 1)
        .transition()
        .duration(500)  // アニメーションの時間（ミリ秒）
        .attr("opacity", 0.3)  // 透明度を0に変更

    // SVG内のrect要素に対してアニメーションを追加
    d3.select("#chart-area").select("svg")
        .selectAll("rect")
        .attr("opacity", 1)
        .transition()
        .duration(500)  // アニメーションの時間（ミリ秒）
        .attr("opacity", 0)  // 透明度を0に変更
        .end()  // transitionが終了したらresolveするPromiseを返す
        .then(() => {
            chart = createGraphs(contextData, selectedCategory); // グラフを再描画
            currentData = chart.update(comparator, 0.3); // グラフをソート
            context.setContextChart(chart)
            context.setContextData(currentData)
        });
  }

  // セレクタの変更時に呼ばれる関数
  function onSelectorChange(flag) {
      console.log("onSelectorChange")
      console.log(`選択されたソート方法は：${selectedValue}`)

      d3.select("#chart-area").select("svg")
          .selectAll(".value")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0)  // 透明度を0に変更

      d3.select("#chart-area").select("svg")
          .selectAll("image")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0.3)  // ここは本当は 0.3 → flag に変えるべき！

      // SVG内のrect要素に対してアニメーションを追加
      d3.select("#chart-area").select("svg")
          .selectAll("rect")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0.3)  // ここは本当は 0.3 → flag に変えるべき！

      d3.select("#chart-area").select("svg")
          .selectAll(".item-name")
          .attr("opacity", 1)
          .transition()
          .duration(500)  // アニメーションの時間（ミリ秒）
          .attr("opacity", 0.3)  // ここは本当は 0.3 → flag に変えるべき！
          .end()  // transitionが終了したらresolveするPromiseを返す
          .then(() => {
              chart = context.contextChart
              currentData = chart.update(comparator, flag); // グラフを更新
              context.setContextChart(chart);
              context.setContextData(currentData);
          });
  }

  // 初回のレンダリング
  useEffect(() => {
    console.log("first")
    const fetchData = async () => {
      try {
        const response = await fetch('ex_data.csv');
        const csvtData = await response.text();
        const rows = await csvtData.split('\n');
        const headers = await rows[0].split(',');
        data = rows.slice(1).map(row => {
          const values = row.split(',');
          return headers.reduce((obj, header, index) => {
            const trimmedHeader = header.trim();
            const trimmedValue = values[index] ? values[index].trim() : ''; // Check if value is undefined before trimming
            obj[trimmedHeader] = trimmedValue;
            return obj;
          }, {});
        });
        context.setContextData(data);
        currentData = data;

        if (currentData) {
          currentData = currentData.filter(item => item["商品カテゴリ"] === selectedItem); // 初回のフィルター
          currentData = currentData.sort((a, b) => a.letter.localeCompare(b.letter)); // 初回のソート
          chart = createGraphs(currentData, selectedCategory); // 初回のグラフ表示
          currentData = chart.update(comparator, 0); // 初回のソートを実行、これは必要！！！
          console.log(currentData);

          await context.setContextAllData(data);
          await context.setContextData(currentData);
          await context.setContextChart(chart);
        }

      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();

  }, []);

  // アイテムカテゴリ変更に対する応答
  useEffect(() => {
    if (isFirstRender.current) {
      return
    }
    console.log("item category")
    console.log(itemCategory)
    updateFilteredData();
  }, [itemCategory]);

  // データカテゴリ変更に対する応答
  useEffect(() => {
    if (isFirstRender.current) {
      return
    }
    console.log("data category")
    console.log(category)
    onCategoryChange()
  }, [category]);

  // ソートオーダー変更に対する応答
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    console.log("sort order")
    console.log(sortOrder)
    onSelectorChange(0.3)
  }, [sortOrder]);

  // global state の all data のトレース
  useEffect(() => {
    console.log(context.contextAllData);
  }, [context.contextAllData]);

  // global state の current data のトレース
  useEffect(() => {
    console.log(context.contextData);
  }, [context.contextData]);

  return (
    <Box sx={{ flexGrow: 1 }}></Box>
  );
}

export default D3Chart;
