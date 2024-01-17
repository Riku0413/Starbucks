from PIL import Image, ImageDraw
import logging
import os
import requests
from io import BytesIO
import time
import uuid
import pandas as pd


log_file_path = "logfile.log"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = logging.FileHandler(log_file_path, mode='a')
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)

max_retries = 3
retry_delay = 1


def crop_to_circle(img, output_path):

    # 画像のサイズを取得
    width, height = img.size

    # 正方形のキャンバスを作成
    size = min(width, height)
    result = Image.new('RGBA', (size, size), (255, 255, 255, 0))

    # 円形のマスクを作成
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)

    # 元の画像を円形に切り抜いてキャンバスに貼り付け
    result.paste(img.crop(((width - size) // 2, (height - size) // 2, (width + size) // 2, (height + size) // 2)), mask=mask)

    # 結果を保存
    result.save(output_path, 'PNG')


def main():
    csv_path = "../data/ex_data.csv"
    output_folder = "../image/ex"

    # CSVファイルを読み込む
    df = pd.read_csv(csv_path)

    image_filenames = []

    for _, row in df.iterrows():
        # 画像のURLを取得
        photo_url = row['長方形画像URL']
        uid = uuid.uuid4()
        # 出力先のファイルパスを構築
        image_filename = f"image_{uid}.png"
        image_filenames.append(image_filename)
        output_path = f'{output_folder}/' + image_filename

        logger.info(f"processig the image of \"{photo_url}\" (ID: {uid}).")

        retry_count = 0
        while retry_count < max_retries:
            try:
                # 画像をダウンロード
                response = requests.get(photo_url)
                img = Image.open(BytesIO(response.content))

                # 円形に切り抜いて保存
                crop_to_circle(img, output_path)

                break

            except Exception as e:
                logger.error(f"An unexpected error occurred during processing \"{photo_url}\" (ID: {uid}): {str(e)}")
                retry_count += 1
                time.sleep(retry_delay)

        logger.info(f"Successfully processed the image of \"{photo_url}\" (ID: {uid}).")

    df['円形画像URL'] = image_filenames

    df.to_csv('../data/ex_data.csv', index=False)


if __name__ == "__main__":
    main()
