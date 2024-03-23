# 開発メモ

## D3Chart.js について

firstrender を false にする位置を、データ読み込みの useEffect の最後に変更することで、データの読み込みが終わらない限りはフィルタリング用の useEffect が起動できないようにした。

### 変更前

- データ読み込み ①
- フィルタ a ① → return
- フィルタ b ① → return
- フィルタ c ① → firstRender を false に
- データ読み込み ②
- フィルタ a ② → firstRender が false なので関数実行 → エラー（データ読み込み ① が未完了のため。）
- フィルタ b ②
- フィルタ c ②

### 変更後

- データ読み込み ①
- フィルタ a ① → return
- フィルタ b ① → return
- フィルタ c ① → return
- データ読み込み ②
- フィルタ a ② → return
- フィルタ b ② → return
- フィルタ c ② → return
- データ読み込み ① 完了 → firstRender を false に
- データ読み込み ② 完了

## Header.js について

- Drawer をつけた
- 画面幅が大きい時に、Chart が Drawer の裏に隠れないように、chart の width を動的にしたい

  - appbar と chart に共通親要素を作って、その要素 X の width を動的に設定する。
  - Drawer は要素 X の兄弟としておくべき。

- Box
  - AppBar
  - Chart
- Drawer

## To Do

- drawer の close ボタンが死んでる → const を function に変換しなきゃいけないんだけど、そうすると App.js での呼び出しがバグって、ぎゃくに open ボタンが作動しなくなるのよね 😢

- AppbarをDrawerの上に移動して、スタバのロゴはDrawerのオプションの一つに押し込んだ上で、このサイトオリジナルのロゴをAppbarに付与する