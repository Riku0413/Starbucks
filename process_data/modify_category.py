import pandas as pd

ITEM_TO_CATEGORY = {
  "ソイ チャイ ティー ラテ（ホット）" : "ティー | TEAVANA™",
  "ソイ チャイ ティー ラテ（アイス）" : "ティー | TEAVANA™",
  "メルティホワイト ピスタチオ フラペチーノ®" : "フラペチーノ",
  "メルティホワイト ピスタチオ モカ（ホット）" : "エスプレッソ",
  "メルティホワイト ピスタチオ モカ（アイス）" : "エスプレッソ",
  "ティー（ジョイフルメドレー）" : "ティー | TEAVANA™",
  "ジョイフルメドレー ティー ラテ" : "ティー | TEAVANA™",
  "ジンジャーブレッド ラテ（ホット）" : "エスプレッソ",
  "ジンジャーブレッド ラテ（アイス）" : "エスプレッソ",
  "クレーム ブリュレ ラテ（ホット）" : "エスプレッソ",
  "クレーム ブリュレ ラテ（アイス）" : "エスプレッソ",
  "ダブル チョコレート フラペチーノ®" : "フラペチーノ®",
  "ダブル チョコレート ラテ（ホット）" : "エスプレッソ",
  "ダブル チョコレート ラテ（アイス）" : "エスプレッソ",
  "チョコレートクリームドーナツ" : "ペストリー",
  "キャラメルトフィースコーン": "ペストリー",
  "チョコレートクランブル　ムースケーキ": "デザート",
  "ナッツ＆キャラメルチーズケーキ" : "デザート",
  "ハム＆クリームチーズ　石窯カンパーニュ": "サンドイッチ",
  "スターバックス　オリガミＲ＆バウムクーヘンアソートセット": "パッケージフード"
}

def main():
    # CSVファイルのパス
    # csv_file_path = '../data/beverage.csv'
    csv_file_path = '../data/food.csv'

    # CSVファイルを読み込む
    df = pd.read_csv(csv_file_path)

    # 変換したい列と分岐の基準となる列の名前
    target_column_name = '商品名'
    branch_column_name = '商品カテゴリ'

    # 新しい列に追加する値を計算する関数
    def transform_based_on_branch(row):
        # 分岐条件に応じて変換ロジックを実装
        if row[branch_column_name] == '季節のおすすめ':
            try:
                return ITEM_TO_CATEGORY[row[target_column_name]]
            except:
                return None
        else:
            return row[branch_column_name]

    # 新しい列に追加
    df['商品カテゴリ２'] = df.apply(transform_based_on_branch, axis=1)

    # 変換後のデータフレームをCSVに保存
    # df.to_csv('../data/beverage_2.csv', index=False)
    df.to_csv('../data/food.csv', index=False)

if __name__ == "__main__":
    main()
