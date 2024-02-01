# Starbucks

## このリポジトリについて

- スターバックスの商品データを取得して可視化しました。
- 商品の写真を押すとスタバの公式サイトに遷移できます！

## フォルダ構造

```
Starbucks
 ┣━ crawler
 ┣━ data
 ┣━ my-app-2
 ┣━ process_data
 ┣━ process_image
 ┗━ test_d3
```

### 1. crawler

- 営業部
- スクレイピングによる商品データの取得
  - [スタバの栄養成分データ](https://product.starbucks.co.jp/allergy/nutrient/)

### 2. data

- 倉庫
- 使用しているデータをCSV形式で保持

### 3. my-app-2

- ライブ会場
- Reactアプリケーション

### 4. process_data

- 工房
- データの加工プログラム

### 5. process_image

- 工房2
- データの加工プログラム

### 6. test_d3

- 実験室
- d3の機能のテストと実験、および機能拡張

## 起動方法

### ＜ユーザー向け＞

- 以下のリンクからアクセス
  - [React App](https://starbucks-pusozzw9e-riku0413s-projects.vercel.app/)

### ＜開発者向け＞

#### 1. 環境設定（これは要らないかも）

以下によりnode.jsのバージョンを設定
```
asdf local nodejs 18.18.0
```

以下により確認
```
asdf list
```

#### 2. my-app-2 ディレクトリで以下のコマンドを実行

```
npm install react-scripts
```

```
npm start
```
