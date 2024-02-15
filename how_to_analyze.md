## プログラム作成順序

### データの更新手順

1. crawler/Scraping_list.py
    - URL一覧を全部のアイテムについて再取得

2. crawler/Scraping_detail.py
    - 追加商品のみスクレイピング

3. 手動
    - 欠損しているデータを以下のリンクから手作業で補完
      - [スタバの栄養成分一覧表](https://product.starbucks.co.jp/allergy/nutrient/)

4. 手動
   - C.csvの中に実はGrand_Menuがあれば、"季節のおすすめ""をFalseに変える

5. crawler/remove_unit.py
    - 各データの単位を除去
    - ```'-'```という値を```None```に変換

6. process_image/make_circle_image.py
    - 商品画像リンクにアクセスして、円形画像に切り抜き
    - 切り抜いた画像をローカルに保存し、その保存先パスをCSVに保存

7. 手動
    - 作成した画像をmy-app-2にコピー

8. process_data/value_per_cal.py
    - エネルギーあたりの成分量を計算

9. process_data/merge_data.py
    - C.csvとB.csvを結合

10. process_data/analyze_data.py
    - エネルギーあたりの成分量の偏差値を計算
    - 健康偏差値と不健康偏差値を計算

11. process_data/A_not_B.py
    - 終わった商品データをBack_Numberに移動

12. process_image/move_past_images.py
    - 古い画像を移動

13. process_image/remove_past_images.py
    - 古い画像を消去

14. 手動
    - 完成したCSVファイルをmy-app-2に移動
    - ```商品名```を```letter```に変更

15. 手動
    - BとCurrent.csvを同一化



### データの加工手順（採用ver　商品画像やURLも同時に取れるメリットがある）

1. crawler/scraping.py
    - URLをカテゴリごとに手動で変えながらスクレイピング
    - 結構時間かかる
    - 画像URLと商品詳細ページURLを取得したいため、Seleniumを使ったこの方式を採用

2. 手動
    - 欠損しているデータを以下のリンクから手作業で補完
      - [スタバの栄養成分一覧表](https://product.starbucks.co.jp/allergy/nutrient/)

3. crawler/remove_unit.py
    - 各データの単位を除去
    - ```'-'```という値を```None```に変換

4. process_image/make_circle_image.py
    - 商品画像リンクにアクセスして、円形画像に切り抜き
    - 切り抜いた画像をローカルに保存し、その保存先パスをCSVに保存

5. process_data/value_per_cal.py
    - エネルギーあたりの成分量を計算

6. process_data/analyze_data.py
    - エネルギーあたりの成分量の偏差値を計算
    - 健康偏差値と不健康偏差値を計算

7. 手動
    - ```商品名```を```letter```に変更

### データの加工手順（不採用ver）

1. crawler/get_raw_data.py
    - `beverage.csv`と`food.csv`の２種類を作成

2. process_data/merge_data.py
    - `beverage.csv`と`food.csv`を結合

3. process_data/filter_data.py
    - `ミルクカスタム`の値でフィルタリング

4. process_data/modify_category.py
    - `季節のおすすめ`を各カテゴリに変換し、コラム`商品カテゴリ２`として追加
    - 期間限定商品が出るごとに、辞書の拡張が必要！

5. process_data/value_per_cal.py
    - カロリーあたりの成分量を計算

6. process_data/analyze_data.py
    - 偏差値を計算

## 機能一覧

- アイテム項目の切り替え
- データ項目の切り替え
- 並べ替え順序の切り替え
- ロゴからのリンク遷移
- アイテム項目ごとのリンク遷移
- アイテムごとのリンク遷移
- 棒グラフの成長アニメーション
- 値のフェードインアニメーション
- 表示要素のフェードアウトアニメーション
- グラフのソートアニメーション

## 設計上の工夫

- まずはコンポーネントツリーとステート管理をiPadで整理
- useEffectの初回レンダリングをuseRefで制御
- 複数のuseEffectで変数ごとにトリガーを分割
- データの取得はuseEffectで、初回ロードの時だけ行う
- 不本意なレンダリングを防ぐためにデータをuseContextで管理
- 異なるコンポーネント枝からアクセスしたいitemCategoryもuseContextで管理
- APIがなかったので、仕方なくスクレイピング
- 画像リンク、商品リンクが欲しかったので、Seleniumで商品ごとのページを探索
- d3のアニメーションは、トリガーと動きの関係をまずiPadで整理
- 次に、htmlベースでd3アニメーションを作成
- 最後に、state管理方法をコンポーネントツリーの中に組み込んだ上でReactアプリを構築

### 環境構築

以下によりnode.jsのバージョンを設定
```
asdf local nodejs 18.18.0
```

以下により確認
```
asdf list
```
