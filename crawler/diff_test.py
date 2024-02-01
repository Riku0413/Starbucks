# 差分抽出のテスト

import pandas as pd

def extract_difference(file_a, file_b, output_file):
    # CSVファイルを読み込む
    df_a = pd.read_csv(file_a)
    df_b = pd.read_csv(file_b)

    # データの同一性を「商品名」で確認し、Aには含まれていてBには含まれないデータを抽出
    diff_df = df_a[~df_a['商品名'].isin(df_b['商品名'])]

    # 結果を新しいCSVファイルに書き込む
    diff_df.to_csv(output_file, index=False)

# 使用例
file_a_path = "../data/ex_data_ほうじ+常在.csv"  # CSVファイルAのパスを指定
file_b_path = "../data/ex_data_現在.csv"  # CSVファイルBのパスを指定
output_file_path = "non_matching_data.csv"  # 出力ファイルのパスを指定

extract_difference(file_a_path, file_b_path, output_file_path)
