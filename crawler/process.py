# このプログラムは、スタバのサイトの各商品ページから泥臭くデータを取得していたver0の時のもの。
# 現在は使わない。

import re
import csv


def extract_value_unit(input_string):
    match = re.match(r'([\d.]+)\s*([a-zA-Z]+)', input_string)
    return (float(match.group(1)), match.group(2)) if match else None


def main():
    # CSVファイルの読み込み
    with open('result.csv', 'r') as csv_file:
        reader = csv.reader(csv_file)
        
        # ヘッダーをスキップする
        header = next(reader)
        data_list = list(reader)
        
        # 加工処理
        processed_data_list = []
        for data in data_list:
            new_data = []
            for i, value in enumerate(data):
                if i == 0:
                    new_data.append(value)
                else:
                    if value == '-':
                        new_data.append(None)
                    else:
                        res = extract_value_unit(value)
                        new_data.append(res[0])

            processed_data_list.append(new_data)



    # 新しいCSVファイルの書き込み
    with open('processed.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        
        # ヘッダーを書き込む
        writer.writerow(header)
        
        # 加工済みデータを書き込む
        writer.writerows(processed_data_list)


if __name__ == "__main__":
    main()
