
const getData = async () => {
    const data = await d3.csv("./data/ex_data.csv");
    return data;
};


const createGraphs = (data, category) => {    
    console.log("createGraphs");
    console.log(`データ数は：${data.length}`);

    const width = 640;
    const height = 28 * data.length;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;
    
    // 値に単位をつけて返す関数
    const getLabelText = (d, category) => {
        if (d[`${category}_number`] < 0) {
            return "no data";
        } else if (category == "エネルギー") {
            return d[`${category}_number`] + ' kcal';
        } else if (category == "タンパク質" | category == "脂質" | category == "炭水化物" | category == "食塩相当量" | category == "食物繊維" | category == "糖質" | category == "トランス脂肪酸" | category == "飽和脂肪酸" ) {
            return d[`${category}_number`] + ' g';
        } else if (category == "ナトリウム" | category == "カリウム" | category == "カフェイン")　{
            return d[`${category}_number`] + ' mg';
        } else {
            return d[`${category}_number`];
        }
    };

    data.forEach(d => {
        if (d[category] == "") {
            d[category] = "-1"
        }
        d[`${category}_number`] = +d[category]; // 数字の文字列を、数値に変換
    });

    d3.select("svg").remove();

    const svg = d3.select("body")
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
        .attr("y", (d) => y(d.letter) - 5)
        .attr("x", 45)
        .text(d => d.letter)
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .attr("font-size", "12px");

    const images = svg.append("g").selectAll("image")
        .data(data)
        .enter()
        .append("image")
        .attr("x", 0)
        .attr("y", (d) => y(d.letter) - 5)
        .attr("width", 30) // 画像の幅
        .attr("height", 30) // 画像の高さ
        .attr("cursor", "pointer")
        .attr("xlink:href", (d) => "./image/" + d.円形画像URL)
        .on("click", function(e, d) {
            window.open(d.商品URL, "_blank"); // 新しいタブで外部リンクを開く
        });
    
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
      .attr("y", d => y(d.letter) + 13.7) // テキストのY座標
      .text(d => getLabelText(d, category))
      .attr("fill", "black")
      .attr("font-size", "12px")
      .attr("font-family", "Arial"); // フォントを指定
  
    text
      .attr("opacity", 0) // 初期状態で透明に設定
      .transition() // フェードインのアニメーション
      .duration(1000)

    return Object.assign(svg.node(), {
        update(order, flag) {
            console.log("update")

            const sortedData = [...data].sort(order);    
            y.domain(sortedData.map(d => d.letter));
    
            const t = svg.transition()
                .duration(1000);
    
            bar.data(sortedData, d => d.letter)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter)) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)

            text.data(sortedData, d => d.letter)
                .attr("opacity", 0)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) + 13.7) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)
                .transition(t/2)
                .attr("x", d => 10 + x(Math.max(d[`${category}_number`], 0)) + 5) // テキストのX座標（バーの右横に調整）
                .attr("opacity", 1); // アニメーション中に不透明に変更

            gy.data(sortedData, d => d.letter)
                .attr("opacity", flag)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) - 5) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)
                .attr("x", 45)
                .attr("opacity", 1); // アニメーション中に不透明に変更
    
            images.data(sortedData, d => d.letter)
                .attr("opacity", flag)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) - 5) // 棒グラフのソートの終了位置 y-座標
                .attr("x", 0)
                .attr("opacity", 1); // アニメーション中に不透明に変更

            return sortedData // 直前のソート順を参照したいので、ここでソートデータを返す！
        }
    });
    
}


const main = async () => {
    // データを読み込む
    const data = await getData();
    var currentData = data;

    // 各セレクタの要素を取得
    const ItemCategorySelector = document.querySelector("#ItemCategorySelector");
    const categorySelector = document.querySelector("#categorySelector");
    const sortSelector = document.querySelector("#sortSelector");

    var selectedItem = ItemCategorySelector.value;
    var selectedCategory = categorySelector.value;
    var selectedValue = sortSelector.value;

    const comparator = (a, b) => {
        if (selectedValue === "asc") {
            return a[selectedCategory] - b[selectedCategory];
        } else if (selectedValue === "desc") {
            return b[selectedCategory] - a[selectedCategory];
        } else if (selectedValue === "alpha") {
            return a.letter.localeCompare(b.letter);
        }
    };
    
    // null チェックを追加
    if (ItemCategorySelector && categorySelector && sortSelector) {
        currentData = data.filter(item => item["商品カテゴリ"] === selectedItem); // 初回のフィルター
        currentData = currentData.sort((a, b) => a.letter.localeCompare(b.letter)); // 初回のソート
        console.log(currentData)
        console.log(`商品のジャンルは: ${selectedItem}`);
        console.log(`表示する値は: ${selectedCategory}`);
        console.log(`ソートの方法は: ${selectedValue}`);
        let chart = createGraphs(currentData, selectedCategory); // 初回のグラフ表示
        currentData = chart.update(comparator, 0); // 初回のソートを実行、これは必要！！！

        // フィルタリングされたデータを更新する関数
        function updateFilteredData() {
            console.log("Filtering category changed")
            selectedItem = ItemCategorySelector.value;
            console.log(`商品のジャンルは: ${selectedItem}`);
            currentData = data.filter(item => item["商品カテゴリ"] === selectedItem); // "商品カテゴリ２" 列を基にフィルタリング
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
                });

            return currentData
        }
        
        // カテゴリセレクタの変更時に呼ばれる関数
        async function onCategoryChange() {
            console.log("onCategoryChange")
            selectedCategory = categorySelector.value;
            console.log(`選択されたカテゴリは：${selectedCategory}`)

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
                .attr("opacity", 0.3)  // 透明度を0に変更

            d3.select("svg")
                .selectAll("image")
                .attr("opacity", 1)
                .transition()
                .duration(500)  // アニメーションの時間（ミリ秒）
                .attr("opacity", 0.3)  // 透明度を0に変更
        
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
                    currentData = chart.update(comparator, 0.3); // グラフをソート
                });
        }
        
        // セレクタの変更時に呼ばれる関数
        function onSelectorChange(flag) {
            console.log("onSelectorChange")
            selectedValue = sortSelector.value;
            console.log(`選択されたソート方法は：${selectedValue}`)

            d3.select("svg")
                .selectAll(".value")
                .attr("opacity", 1)
                .transition()
                .duration(500)  // アニメーションの時間（ミリ秒）
                .attr("opacity", 0)  // 透明度を0に変更

            d3.select("svg")
                .selectAll("image")
                .attr("opacity", 1)
                .transition()
                .duration(500)  // アニメーションの時間（ミリ秒）
                .attr("opacity", 0.3)  // 透明度を0に変更

            d3.select("svg")
                .selectAll(".item-name")
                .attr("opacity", 1)
                .transition()
                .duration(500)  // アニメーションの時間（ミリ秒）
                .attr("opacity", 0.3)
                .end()  // transitionが終了したらresolveするPromiseを返す
                .then(() => {
                    currentData = chart.update(comparator, flag); // グラフを更新
                });
        }

        // 各変更イベントにリスナーを追加
        categorySelector.addEventListener("change", onCategoryChange);
        sortSelector.addEventListener("change", () => onSelectorChange(0.3));
        ItemCategorySelector.addEventListener("change", updateFilteredData);

    } else {
        console.error("Selector not found");
    }

};

main();
