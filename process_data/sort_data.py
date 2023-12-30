import pandas as pd

# CSVファイル読み込み
df = pd.read_csv('../data/test_data.csv')

# '商品カテゴリ２'で昇順に並べ替え
df_sorted = df.sort_values(by='商品カテゴリ２')

# 新しいCSVファイルとして保存
df_sorted.to_csv('../data/test_data.csv', index=False)
