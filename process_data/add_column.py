import pandas as pd
from datetime import datetime

df = pd.read_csv('../data/ex_data_現在.csv')

# columns_to_drop = ['timestamp']
# df.drop(columns=columns_to_drop, inplace=True)

df['limited'] = False
df['季節のおすすめ'] = False
# タイムスタンプを日付まで追加
# df['timestamp'] = datetime.now().strftime('%Y-%m-%d')
specified_date = datetime(2023, 12, 29)
df['timestamp'] = specified_date.strftime('%Y-%m-%d')

df.to_csv('ex_data_現在.csv', index=False)
