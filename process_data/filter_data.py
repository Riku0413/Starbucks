import pandas as pd

# CSVファイル読み込み
df = pd.read_csv('../data/test_data.csv')

# 特定のコラムの値が特定の値の行だけを抽出
column_name = 'ミルクカスタム'

filtered_df = df[(df[column_name] == "ミルク") | pd.isna(df[column_name])]

# 抽出されたデータを新しいCSVファイルとして保存
filtered_df.to_csv('../data/test_data.csv', index=False)
