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

- テーマカラーをトップ層の App.js で管理して切り替えられるようにする！
- グラフや背景の色指定を全てテーマカラーにする！
- パスの最初の要素に"starbucks"を入れる
- drawer で他のチェーン店を選択した時にパスを"doutor"等に切り替えられるように useNavigate
  - トップ層で各チェーン店に振り分けるルーターグループも作成（ここでデータやコラムなどの props を渡して伝搬させる）
  - というか使うコンポーネントは共通だが、渡すデータ、カラー、ロゴを変える
- host/starbucks...で始まる新たなパス構造に合わせて、全ファイルのパスやリンクを修正

- ドトールのロゴを取得
- ドトールのデータを手打ちで取得、画像やリンクも手打ちで取得（doutor というディレクトリに閉じ込めておく）
- process 系の関数を流用してデータを加工
- my-app-2 に移動

- i18next で英語対応させる
- 上下の文言を修正する
- useEffect をイベントハンドラに変える
- ブランチ管理をちゃんとして main をデプロイする

- アクセス数をトレースする
- 様子見てから広告つける
  - google adsence or affiliate
