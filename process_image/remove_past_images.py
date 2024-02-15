import pandas as pd
import os

df = pd.read_csv('../data/Back_Number.csv')

default_directory = '../my-app-2/public/'

# 各行について画像ファイルを削除する
for index, row in df.iterrows():
    original_path = row['円形画像URL']
    default_path = os.path.join(default_directory, original_path)
    try:
        # 画像ファイルを削除
        os.remove(default_path)
        print(f"画像を削除しました: {default_path}")
    except Exception as e:
        print(f"画像の削除に失敗しました: {default_path}, エラー: {e}")
