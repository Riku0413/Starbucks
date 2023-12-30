import pandas as pd

df = pd.read_csv('../data/test_data.csv')

column_to_move = '商品カテゴリ２'
col = df.pop(column_to_move)

insert_position = 3
df.insert(insert_position, column_to_move, col)

df.to_csv('../data/test_data.csv', index=False)
