import pandas as pd


def main():
    # CSVファイルのパス
    csv_file_path = '../data/ex_data.csv'

    # CSVファイルを読み込む
    df = pd.read_csv(csv_file_path)

    # 偏差値を計算するコラムの名前
    deviation_column_names = ['タンパク質', '食物繊維', 'ナトリウム', 'カリウム', '脂質', '食塩相当量', '糖質', 'トランス脂肪酸', '飽和脂肪酸']

    # 偏差値を計算する関数
    # def calculate_zscore(series):
    #     return round((series - series.mean()) / series.std() * 10 + 50, 1)

    def calculate_zscore(series):
        # 欠損値以外でZスコアを計算
        valid_values = series.dropna()
        zscore_valid = round((valid_values - valid_values.mean()) / valid_values.std() * 10 + 50, 1)
        
        # 結果の初期化（欠損値には50を設定）
        zscore_result = pd.Series(index=series.index, dtype=float, data=50)
        
        # 欠損値以外の部分に計算されたZスコアを代入
        zscore_result[valid_values.index] = zscore_valid
        
        return zscore_result

    # グループごとに偏差値を計算して新しい列に追加
    for column in deviation_column_names:
        # df[f'{column}_偏差値'] = df.groupby(group_column_name)[f"{column}_per_エネルギー"].transform(calculate_zscore)
        df[f'{column}_偏差値'] = calculate_zscore(df[f"{column}_per_エネルギー"])

    # 平均値を計算したいコラムのリスト
    columns_to_average_1 = ['タンパク質_偏差値', '食物繊維_偏差値', 'ナトリウム_偏差値', 'カリウム_偏差値']
    columns_to_average_2 = ['脂質_偏差値', '食塩相当量_偏差値', '糖質_偏差値', 'トランス脂肪酸_偏差値', '飽和脂肪酸_偏差値']

    # 新しいコラムに平均値を計算して追加
    df['健康偏差値'] = df[columns_to_average_1].mean(axis=1).round(3)
    df['不健康偏差値'] = df[columns_to_average_2].mean(axis=1).round(3)

    # 変換後のデータフレームをCSVに保存
    df.to_csv('../data/ex_data.csv', index=False)

    target_column_name_1 = '健康偏差値'
    target_column_name_2 = '不健康偏差値'

    max_value_1 = df[target_column_name_1].max()
    print(f"The maximum value in column '{target_column_name_1}' is: {max_value_1}")
    min_value_1 = df[target_column_name_1].min()
    print(f"The minimum value in column '{target_column_name_1}' is: {min_value_1}")
    max_value_2 = df[target_column_name_2].max()
    print(f"The maximum value in column '{target_column_name_2}' is: {max_value_2}")
    min_value_2 = df[target_column_name_2].min()
    print(f"The minimum value in column '{target_column_name_2}' is: {min_value_2}")


if __name__ == "__main__":
    main()
