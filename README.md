# Starbucks

## このリポジトリについて

- スターバックスの商品データを取得して可視化します
- 最終的に健康への害が最小の注文方法を提案します

## フォルダ構造

```
Starbucks
 ┣━ crawler
 ┣━ data
 ┣━ my-app
 ┣━ process_data
 ┗━ test_d3
```

### crawler

- 営業部
- スクレイピングによる商品データの取得
  - [スタバの栄養成分データ](https://product.starbucks.co.jp/allergy/nutrient/)

### data

- 倉庫
- 使用しているデータをCSV形式で保持

### my-app

- ライブ会場
- Reactアプリケーション

### process_data

- 工房
- データの加工プログラム

### test_d3

- 実験室
- d3の機能のテストと実験、および機能拡張

## 起動方法

### ＜一般ユーザー向け＞

- 以下のリンクからアクセス
  - https://starbucks-pusozzw9e-riku0413s-projects.vercel.app/

### ＜開発者向け＞

- my-appディレクトリで以下のコマンドを実行

```
npm install react-scripts
```

```
npm start
```
