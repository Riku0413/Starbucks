# タイムスタンプのテスト

import csv
from datetime import datetime

def write_data_to_csv(file_path):
    # タイムスタンプを取得
    timestamp = datetime.now().strftime("%Y-%m-%d")

    # 書き込むデータ
    data = [
        ["John", timestamp],
        ["Alice", timestamp],
        ["Bob", timestamp]
    ]

    # CSVファイルを開いて書き込みモードでファイルを作成または上書き
    with open(file_path, mode='w', newline='') as file:
        # CSVライターを作成
        writer = csv.writer(file)

        # ヘッダーを書き込む（名前、タイムスタンプ）
        writer.writerow(["Name", "Timestamp"])

        # データをCSVファイルに書き込む
        writer.writerows(data)

if __name__ == "__main__":
    csv_file_path = "example.csv"  # CSVファイルのパスを指定
    write_data_to_csv(csv_file_path)
