import pandas as pd

# CSVファイル読み込み
df1 = pd.read_csv('../data/ex_data_ver0.csv')
df2 = pd.read_csv('../data/ex_data.csv')

# 一つ目のデータフレームの列を基準に、片方だけに存在する列を追加
merged_df = df1.copy()
for column in df2.columns:
    if column not in merged_df.columns:
        merged_df[column] = None

# 二つ目のデータフレームを追加（片方だけに存在する列はNoneで埋める）
merged_df = pd.concat([merged_df, df2], axis=0, ignore_index=True)

# 結合結果をCSVファイルとして保存
merged_df.to_csv('../data/ex_data_2.csv', index=False)
