
const getData = async () => {
    const data = await d3.csv("./data/current_data.csv");
    // もし,読み込んだデータを加工したい場合は,ここで行う
    return data;
};


const createGraphs_2 = (data, category) => {    
    console.log("createGraph_2");
    console.log(data.length);
    // 追加
    d3.select("svg").remove();

    // Specify the chart’s dimensions.
    const width = 640;
    const height = 28 * data.length;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;
    
    const getLabelText = (d, category) => {
        console.log(category)
        console.log(d[category])
        switch (category) {
            case "エネルギー":
                return d[`${category}_number`] + ' kcal';
            case "タンパク質":
                return d[category] + ' g';
            case "脂質":
                return d[category] + ' g';
            case "炭水化物":
                return d[category] + ' g';
            case "食塩相当量":
                return d[category] + ' g';
            case "食物繊維":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' g';
                }
            case "糖質":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' g';
                }
            case "ナトリウム":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' mg';
                }
            case "カリウム":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' mg';
                }
            case "トランス脂肪酸":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' g';
                }
            case "飽和脂肪酸":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' g';
                }
            case "カフェイン":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`] + ' mg';
                }
            case "タンパク質_偏差値":
                if (d[`${category}_number`] < 0) {
                    return "no data";
                } else {
                    return d[`${category}_number`];
                }
            case "健康偏差値":
                return d[category];
            case "不健康偏差値":
                return d[category];
            case "価格":
                return '¥' + d[category];
            default:
                return ""; // デフォルトは空文字列としておく
        }
    };

    // Create the SVG container.
    const svg = d3.select("body")
        .append("svg")
        .attr("viewBox", [0, 0, width, height*2]) // 変更してみた！！！
        .attr("style", `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`);

    // y軸（垂直位置）のスケールと対応する軸ジェネレータを宣言
    const y = d3.scaleBand()
        .domain(data.map(d => d.letter))
        .range([marginTop + 10, height *2 - marginBottom])
        .padding(0.6);
    
    const yAxis = d3.axisRight(y).tickSize(0).tickSizeOuter(0);
        // .tickPadding(-18); // ラベルと軸線の間隔を設定

    // const gy = svg.append("g")
    //     .attr("transform", `translate(${marginLeft}, -16)`) // ラベルを軸線の右側に移動
    //     .attr("font-weight", "bold")
        // .call(d3.axisRight(y).tickSize(0).tickSizeOuter(0));

    // テキストを描画
    const gy = svg.append("g").selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "item-name") 
        // .attr("transform", `translate(${marginLeft + 10}, 0)`) // ラベルを軸線の右側に移動
        .attr("y", (d) => y(d.letter) - 5) // テキストのY座標
        .attr("x", 45) // テキストのx座標を調整する場合は変更してください
        .text(d => d.letter)
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .attr("font-size", "12px");

    const images = svg.append("g").selectAll("image")
        .data(data)
        .enter()
        .append("image")
        .attr("x", 0)  // 画像のX座標を調整する場合は変更してください
        .attr("y", (d) => y(d.letter) - 5) // 画像のY座標
        .attr("width", 30) // 画像の幅
        .attr("height", 30) // 画像の高さ
        .attr("xlink:href", "https://lh3.googleusercontent.com/pw/ABLVV84Ipo7hAK8WPT108dWgaXnUiOcGPwmg-19uzWuBFSyqJDKYNONhJBjRHPM2V76ctKuDfMLUQEghAz5PfQETgH0HkwotPn73S2lYWuDm0ZE9F-G2oIzcATBY6tXbxZmEGpChPwzxMj0qIhs-gjdHP45v=w498-h498-s-no-gm?authuser=0");
    


        // const text = svg.append("g").selectAll("text")
        // .data(data)
        // .enter()  // enter() を追加して新しいデータに対する要素を作成
        // .append("text")
        // .attr("class", "value") // 動的に生成したIDを割り当て
        // .attr("id", (d, i) => `text-${i}`) // 動的に生成したIDを割り当て
        // .attr("x", d => 10 + x(d[category])) // テキストのX座標（バーの右横に調整）
        // .attr("y", (d, i) => i * 47.2 + 71.8) // テキストのY座標
        // .text(d => getLabelText(d, category))
        // .attr("fill", "black")
        // .attr("font-size", "12px")
        // .attr("font-family", "Arial"); // フォントを指定

    // x軸（水平位置）のスケールを宣言
    data.forEach(d => {
        // d[category] = +d[category]; // 数値に変換
        console.log(d[category]);
        if (d[category] == "") {
            d[category] = "-1"
        }
        console.log(d[category]);
        d[`${category}_number`] = +d[category]; // 数値に変換
        console.log(d[`${category}_number`]);
    });
    
    const zz = d3.max(data, d => d[`${category}_number`]);
    console.log(zz);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[`${category}_number`])]).nice()
        .range([marginLeft, width - marginRight]);
    
    // Create a bar for each letter.
    const bar = svg.append("g")
        .attr("fill", "green")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .style("mix-blend-mode", "multiply") // Darker color when bars overlap during the transition.
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
    //   .attr("opacity", 1) // アニメーション中に不透明に変更
    //   .attr("x", d => 10 + x(d[category]) + 5); // テキストのX座標（バーの右横に調整）


    // const gx = svg.append("g")
    //     .attr("transform", `translate(0,${marginTop})`) // 上部に移動
    //     .call(d3.axisTop(x).ticks(10))
    //     .call(g => g.select(".domain").remove()); // removeで軸線を除去している

    return Object.assign(svg.node(), {
        update(order, flag) {
            console.log("update")
            // データの一時的なコピーを作成し、それをソートします
            const sortedData = [...data].sort(order);
    
            y.domain(sortedData.map(d => d.letter));
    
            const t = svg.transition()
                .duration(1000);

            const tt = svg.transition()
                .duration(700);
    
            bar.data(sortedData, d => d.letter)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter)) // 棒グラフのソートの終了位置 y-座標
                .attr("width", d => x(Math.max(d[`${category}_number`], 0)) - marginLeft)
                // .on("end", (d, i) => {
                //     showText(d, i);
                //   });

            text.data(sortedData, d => d.letter)
                .attr("opacity", 0)
                .transition(t)
                .delay((d, i) => i * 100)
                .attr("y", d => y(d.letter) + 13.7) // 棒グラフのソートの終了位置 y-座標
                // .attr("y", (d, i) => i * 47.2 + 71.8) // テキストのY座標
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

            // gy.transition(t)
            //     .call(yAxis)
            //     .selectAll(".tick")
            //     .delay((d, i) => i * 100);

            // 直前のソート順を参照したいので、ここでソートデータを返す！
            return sortedData
        }
    });
    
}



const main = async () => {
    // データを読み込む
    const data = await getData();

    // 各セレクタの要素を取得
    const ItemCategorySelector = document.querySelector("#ItemCategorySelector");
    const categorySelector = document.querySelector("#categorySelector");
    const sortSelector = document.querySelector("#sortSelector");

    var selectedItem = ItemCategorySelector.value;
    var selectedCategory = categorySelector.value;
    var selectedValue = sortSelector.value;

    console.log(selectedValue)

    var currentData = data;
    
    // null チェックを追加
    if (ItemCategorySelector && categorySelector && sortSelector) {
        // 初回のフィルター
        currentData = data.filter(item => item["商品カテゴリ２"] === selectedItem);
        console.log(currentData)
        // 初回のソート
        // currentData = currentData.sort((a, b) => d3.ascending(a.letter, b.letter));
        currentData = currentData.sort((a, b) => a.letter.localeCompare(b.letter));

        console.log(currentData)
        // const selectedCategory = categorySelector.value;
        // 初回のグラフ表示
        let chart = createGraphs_2(currentData, selectedCategory);
        // let sortedData = data

        // カテゴリセレクタの変更時に呼ばれる関数
        async function onCategoryChange() {
            console.log("category")
            // カテゴリセレクタの選択値を取得
            selectedCategory = categorySelector.value;
            console.log(selectedCategory)

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
                    // SVG要素を削除
                    d3.select("svg").remove();
        
                    console.log(selectedCategory);
        
                    // 新しいグラフを作成
                    // 直前のソートデータを渡すことで、自然なアニメーションを実現！
                    chart = createGraphs_2(currentData, selectedCategory);

                    console.log("here")
        
                    // 初回のソートを実行
                    console.log("selector")
                    selectedValue = sortSelector.value;
                    console.log(selectedValue)
                    // ここで改めてカテゴリ変数を作る荒技！！！
                    selectedCategory = categorySelector.value;
                    
                    console.log(selectedCategory)
        
                    // データをソートするための比較関数を定義
                    const comparator = (a, b) => {
                        if (selectedValue === "asc") {
                            return a[selectedCategory] - b[selectedCategory];
                        } else if (selectedValue === "desc") {
                            return b[selectedCategory] - a[selectedCategory];
                        } else if (selectedValue === "alpha") {
                            return a.letter.localeCompare(b.letter);
                        }
                    };
        
                    // グラフを更新
                    currentData = chart.update(comparator, 0.3);
                });
                
        }
        

        // カテゴリセレクタの変更イベントにリスナーを追加
        categorySelector.addEventListener("change", onCategoryChange);

        // セレクタの変更時に呼ばれる関数
        function onSelectorChange(flag) {
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
                    console.log("selector")
                    selectedValue = sortSelector.value;
                    console.log(selectedValue)
                    // ここで改めてカテゴリ変数を作る荒技！！！
                    selectedCategory = categorySelector.value;
                    
                    console.log(selectedCategory)
        
                    // データをソートするための比較関数を定義
                    const comparator = (a, b) => {
                        if (selectedValue === "asc") {
                            return a[selectedCategory] - b[selectedCategory];
                        } else if (selectedValue === "desc") {
                            return b[selectedCategory] - a[selectedCategory];
                        } else if (selectedValue === "alpha") {
                            return a.letter.localeCompare(b.letter);
                        }
                    };

                    // グラフを更新
                    currentData = chart.update(comparator, flag);
                });
        }

        // セレクタの変更イベントにリスナーを追加
        // sortSelector.addEventListener("change", onSelectorChange());
        sortSelector.addEventListener("change", () => onSelectorChange(0.3));


        // 初回のソートを実行、これは必要！！！
        // onSelectorChange(0);
        console.log("selector")
        selectedValue = sortSelector.value;
        console.log(selectedValue);
        selectedCategory = categorySelector.value;
        console.log(selectedCategory)
        const comparator = (a, b) => {
            if (selectedValue === "asc") {
                return a[selectedCategory] - b[selectedCategory];
            } else if (selectedValue === "desc") {
                return b[selectedCategory] - a[selectedCategory];
            } else if (selectedValue === "alpha") {
                return a.letter.localeCompare(b.letter);
            }
        };
        currentData = chart.update(comparator, 0);



        // 初期表示（すべてのデータを表示）
        // let filteredData = data

        // フィルタリングされたデータを更新する関数
        function updateFilteredData() {
            console.log("filter")
            // 選択されたアイテムカテゴリ
            selectedItem = ItemCategorySelector.value;
            console.log(selectedItem)
            // console.log(data)
            selectedValue = sortSelector.value;
            selectedCategory = categorySelector.value;

                        // データをソートするための比較関数を定義
                        const comparator = (a, b) => {
                            if (selectedValue === "asc") {
                                return a[selectedCategory] - b[selectedCategory];
                            } else if (selectedValue === "desc") {
                                return b[selectedCategory] - a[selectedCategory];
                            } else if (selectedValue === "alpha") {
                                return a.letter.localeCompare(b.letter);
                            }
                        };

            // "商品カテゴリ２" 列を基にフィルタリング
            currentData = data.filter(item => item["商品カテゴリ２"] === selectedItem);
            currentData = currentData.sort(comparator);
            console.log(currentData)

            // d3.select("svg").remove();

            // chart = createGraphs_2(currentData, selectedCategory);
            // onSelectorChange();

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
                    // SVG要素を削除
                    d3.select("svg").remove();
        
                    console.log(selectedCategory);
        
                    // 新しいグラフを作成
                    // 直前のソートデータを渡すことで、自然なアニメーションを実現！
                    chart = createGraphs_2(currentData, selectedCategory);

                    console.log("here")
        
                    // 初回のソートを実行
                    console.log("selector")
                    selectedValue = sortSelector.value;
                    console.log(selectedValue)
                    // ここで改めてカテゴリ変数を作る荒技！！！
                    selectedCategory = categorySelector.value;
                    
                    console.log(selectedCategory)
        
                    // データをソートするための比較関数を定義
                    const comparator = (a, b) => {
                        if (selectedValue === "asc") {
                            return a[selectedCategory] - b[selectedCategory];
                        } else if (selectedValue === "desc") {
                            return b[selectedCategory] - a[selectedCategory];
                        } else if (selectedValue === "alpha") {
                            return a.letter.localeCompare(b.letter);
                        }
                    };
        
                    // グラフを更新
                    currentData = chart.update(comparator, 0);
                });

            return currentData
        }

        console.log(currentData); // フィルタリングされたデータをコンソールに表示（確認用）

        // アイテムカテゴリが選択されたときのイベントリスナーを追加
        ItemCategorySelector.addEventListener("change", updateFilteredData);

    } else {
        console.error("Selector not found");
    }

};

main();

// To Do
// 
// 商品名がすれ違い重なる時に色を黒にし、普段はグレーにする。
// 数値のy座標をその場しのぎではなく、しっかり指定する
// 欠損値を0にまとめるのではなく、No data と表示する
// 商品名とグラフバーの間の距離を広げる or グラフを太くする、ことで、商品名と0値の文字の間に自然な間隔をあける
// プログラムの論理、実行順序をちゃんと確認する
// 商品名にカーソル合わせた時に、画像のツールチップ表示と文字のハイライト → リンクに繋げる
// レスポンシブデザイン
// 分母と分子のセレクタ、そのスイッチボタン
// 
// 以上