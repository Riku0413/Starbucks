import pandas as pd
import numpy as np

# CSVファイル読み込み
df = pd.read_csv('./data/C.csv')

# 分母のコラムと分子のコラムの名前
denominator_column = 'エネルギー'
numerator_columns = ['タンパク質', '食物繊維', 'ナトリウム', 'カリウム', '脂質', '食塩相当量', '糖質', 'トランス脂肪酸', '飽和脂肪酸', 'カフェイン']

# 新しいコラムを作成し、割り算の結果を登録
for numerator_column in numerator_columns:
    new_column_name = f'{numerator_column}_per_{denominator_column}'
    df[new_column_name] = np.where((pd.isna(df[numerator_column]) | (df[denominator_column] == 0)), None, df[numerator_column] / df[denominator_column])

# 新しいCSVファイルとして保存
df.to_csv('./data/C.csv', index=False)
