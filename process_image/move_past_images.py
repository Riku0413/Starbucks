import pandas as pd
import os
import shutil

df = pd.read_csv('../data/back_number.csv')

new_directory = '../image/back_number/'
defalut_directory = '../image/current/'

# 新しい保存場所のディレクトリが存在しない場合は作成する
if not os.path.exists(new_directory):
    os.makedirs(new_directory)

# 各行について画像ファイルを移動する
for index, row in df.iterrows():
    original_path = row['円形画像URL']
    new_path = os.path.join(new_directory, original_path)
    defalut_path = os.path.join(defalut_directory, original_path)
    try:
        # 画像ファイルを移動
        shutil.move(defalut_path, new_path)
        print(f"画像を移動しました: {original_path} -> {new_path}")
    except Exception as e:
        print(f"画像の移動に失敗しました: {original_path} -> {new_path}, エラー: {e}")
