import pandas as pd

df = pd.read_csv('../data/test_data.csv')

new_column_name = '画像URL'
insert_position = 5

df.insert(insert_position, new_column_name, "")
df.to_csv('../data/test_data.csv', index=False)
