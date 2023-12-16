import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';



const D3Chart = ({category}) => {
  console.log(category);
  
  const chartRef = useRef();

  useEffect(() => {
    const csvData = `商品名,エネルギー,タンパク質,脂質,炭水化物,食塩相当量,食物繊維,糖質,ナトリウム,カリウム,トランス脂肪酸,飽和脂肪酸,カフェイン,url
    メルティホワイト ピスタチオ フラペチーノ,462.0,6.6,27.4,47.3,0.6,0.2,47.1,243.0,202.0,0.1,9.7,0.0,https://menu.starbucks.co.jp/4524785556461
    エスプレッソ  アフォガート フラペチーノ,438.0,4.2,28.5,41.7,0.5,0.7,41.0,189.0,433.0,0.4,18.2,160.0,https://menu.starbucks.co.jp/4524785344143
    コーヒー フラペチーノ,183.0,3.3,2.9,36.0,0.4,0.1,35.9,173.0,268.0,0.1,1.7,86.0,https://menu.starbucks.co.jp/4524785165731
    ダーク モカ チップ フラペチーノ,312.0,4.5,12.9,44.7,0.5,2.1,42.5,200.0,552.0,0.1,8.3,98.0,https://menu.starbucks.co.jp/4524785166059
    キャラメル フラペチーノ,302.0,3.7,12.0,44.9,0.5,0.1,44.8,192.0,289.0,0.2,7.5,86.0,https://menu.starbucks.co.jp/4524785165816
    抹茶 クリーム フラペチーノ,322.0,5.3,12.7,47.1,0.5,0.9,46.1,184.0,273.0,0.2,7.8,78.0,https://menu.starbucks.co.jp/4524785165892
    バニラ クリーム フラペチーノ,255.0,4.5,12.4,31.5,0.5,0.1,31.4,184.0,206.0,0.2,7.7,0.0,https://menu.starbucks.co.jp/4524785165939
    マンゴー パッション ティー フラペチーノ,140.0,0.7,0.0,34.4,0.2,1.0,33.4,95.0,209.0,0.0,0.0,0.0,https://menu.starbucks.co.jp/4524785118751
    My フルーツ³ フラペチーノ グレープ ＆ ピーチ,425.0,7.7,15.2,66.6,0.6,,,,,,,,https://menu.starbucks.co.jp/4524785517479
    My フルーツ³ フラペチーノ ストロベリー,360.0,7.9,11.9,57.4,0.6,,,,,,,,https://menu.starbucks.co.jp/4524785479791`;
    
    // CSVデータを行ごとに分割
    const rows = csvData.split('\n');
    
    // ヘッダー行を取得
    const headers = rows[0].split(',');
    
    // CSVデータをJSON形式に変換
    const jsonData = rows.slice(1).map(row => {
      const values = row.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index].trim();
        return obj;
      }, {});
    });
    
    console.log(jsonData);

    // category が最大となるデータを取得
    const maxCategoryValue = d3.max(jsonData, (d) => parseFloat(d[category]));
    // ドメインとレンジを設定
    const lengthScale = d3.scaleLinear()
      .domain([0, maxCategoryValue]) // ドメインを設定
      .range([0, 449]); // レンジを設定


    const drawChart = async () => {
      d3.select(chartRef.current).selectAll("*").remove();

      const svg = d3.select(chartRef.current);

      // 商品名のラベルを表示
      const labels = svg.selectAll("text").data(jsonData).enter().append("text");

      labels
        .append("a") // Append an anchor tag to the text element
        .attr("href", (d) => d.url) // Set the href attribute to the external link
        .attr("target", "_blank") // Open the link in a new tab
        .append("tspan") // Append a tspan element for the text content
        .text((d) => d.商品名)
        .attr("y", (d, i) => i * 40 + 50) // ラベルのX座標（中央に調整）
        .attr("x", 30) // ラベルのY座標
        .attr("fill", "black") // ラベルの色
        .attr("font-size", "12px")
        .attr("font-weight", "bold"); // フォントを指定


      // 棒グラフの初期設定（高さ0）
      const bar = svg.selectAll("rect").data(jsonData).enter().append("rect");

      bar.attr("y", (d, i) => i * 40 + 30)
        .attr("x", 360)
        .attr("fill", "green")
        .attr("height", 30)
        .attr("width", 0);

      console.log(category)

      // 棒グラフのアニメーション
      bar.transition()
        .delay((d, i) => i * 100)
        .duration(700)
        .attr("x", (d) => 360)
        .attr("width", (d) => lengthScale(d[category]) / 2)
        .on("end", (d, i) => {
          showText(d, i);
        });

      console.log(category)

      // テキストを表示する関数
      const showText = (d, i) => {
        svg.append("text")
          .attr("x", 360 + lengthScale(d[category]) / 2) // テキストのX座標（バーの右横に調整）
          .attr("y", i * 40 + 50) // テキストのY座標
          .text(getLabelText(d, category))
          .attr("fill", "black")
          .attr("font-size", "12px")
          .attr("font-family", "Comic Sans MS") // フォントを指定
          .attr("opacity", 0) // 初期状態で透明に設定
          .transition() // フェードインのアニメーション
          .duration(500)
          .attr("opacity", 1) // アニメーション中に不透明に変更
          .attr("x", 360 + lengthScale(d[category]) / 2 + 5); // テキストのX座標（バーの右横に調整）
      };

      const getLabelText = (d, category) => {
        switch (category) {
          case "エネルギー":
            return d[category] + ' kcal';
          case "タンパク質":
            return d[category] + ' g';
          case "脂質":
            return d[category] + ' g';
          default:
            return ""; // デフォルトは空文字列としておく
        }
      };


    };

    
    drawChart();
  }, [category]);

  return (
    <svg ref={chartRef} width={800} height={450}>
      {/* D3-rendered elements go here */}
    </svg>
  );
};

export default D3Chart;
