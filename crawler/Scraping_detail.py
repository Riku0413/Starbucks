import os
import re
import csv
import time
import argparse
import logging
import requests
import pandas as pd
from bs4 import BeautifulSoup
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC

from webdriver_manager.chrome import ChromeDriverManager


# chrome_driver_path = '/Users/kobayashiriku/opt/anaconda3/lib/python3.9/site-packages/chromedriver_binary/chromedriver'
chrome_driver_path = '/Users/kobayashiriku/Downloads/chromedriver-mac-x64/chromedriver'
chrome_service = Service(chrome_driver_path)
# driver = webdriver.Chrome(service=chrome_service)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

URL_DRIP = "https://product.starbucks.co.jp/beverage/drip/"
URL_ESPRESSO = "https://product.starbucks.co.jp/beverage/espresso/"
URL_FRAPPUCCINO = "https://product.starbucks.co.jp/beverage/frappuccino/"
URL_TEA = "https://product.starbucks.co.jp/beverage/tea/"

URL_OTHERS = "https://product.starbucks.co.jp/beverage/beverage-others/"
URL_ARRIVIAMO = "https://product.starbucks.co.jp/beverage/arriviamo/"

URL_DESSERT = "https://product.starbucks.co.jp/food/dessert/"
URL_PASTRY = "https://product.starbucks.co.jp/food/pastry/"
URL_SANDWICH = "https://product.starbucks.co.jp/food/sandwich/"
URL_PACKAGE = "https://product.starbucks.co.jp/food/package/"

URL_SEASON = "https://product.starbucks.co.jp/new/lineup/?purchase_methods=STARBUCKS_COFFEE"

# 可変箇所１
today_date = datetime.now().strftime("%Y%m%d")
log_file_path = f"./crawler/logfile/logfile_{today_date}.log"

# ロガーの用意
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = logging.FileHandler(log_file_path, mode='a')
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)

# リトライ処理のための変数
max_retries = 1
retry_delay = 1


def extract_value_unit(input_string):
    match = re.match(r'([\d.]+)\s*([a-zA-Z]+)', input_string)
    return (float(match.group(1)), match.group(2)) if match else None


# 一つの商品の詳細データの取得
def scrape_item_detail(url, headers, name):
    data = [None for _ in range(len(headers))]

    for attempt in range(max_retries):
        try:
            driver.get(url)
            time.sleep(0.5)

            logger.info(f"Scraping the data of \"{name}\" of \"{url}\"")

            toggle_button = driver.find_element(By.ID, 's_nutrition-calculator_accordion')
            toggle_button.click()
            time.sleep(2)

            try:
                select_element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, 'select-size'))
                )
                
                select = Select(select_element)
                select.select_by_visible_text('トール')
                time.sleep(2)
            
            except:
                logger.warning(f"Failed to choose Tall size during processing \"{name}\" of \"{url}\"")
                pass

            selected_html = driver.page_source
            # print(selected_html)
            soup = BeautifulSoup(selected_html, 'html.parser')
            element_1 = soup.find(id='nutrition-calculator')
            element_2 = element_1.find(class_='alle-p-2col')
            trs = element_2.find_all('tr')

            for tr in trs:
                category = tr.find('th').text
                value = tr.find('td').text
                # result = extract_value_unit(value)
                # print(category, result[0], result[1])
                data[headers.index(category)] = value

            logger.info(f"Successfully retrieved the data of \"{name}\" of \"{url}\"")

        except requests.exceptions.RequestException as e:
            logger.error(f"An error occurred during the request of \"{url}\": {str(e)}")

            if attempt < max_retries - 1:
                logger.warning(f"Retrying ({attempt + 1}/{max_retries}) after {retry_delay} seconds...")
                time.sleep(retry_delay)
                continue

            return

        except Exception as e:
            logger.error(f"An unexpected error occurred during scraping the data of \"{name}\" of \"{url}\": {str(e)}")
            pass

        return data


def main(): 
    D_path = "./data/D.csv"
    D_df = pd.read_csv(D_path)

    C_path = "./data/C.csv"

    headers = ["大ジャンル", "商品カテゴリ", "商品名", "長方形画像URL", "円形画像URL", "商品URL", "エネルギー", "タンパク質", "脂質", "炭水化物", "食塩相当量", "食物繊維", "糖質", "ナトリウム", "カリウム", "トランス脂肪酸", "飽和脂肪酸", "カフェイン", "お酒の使用", "limited", "季節のおすすめ", "timestamp"]

    C_df = pd.DataFrame(columns=headers)
    C_df.to_csv(C_path, index=False)

    # if not os.path.isfile(C_path):
    #     with open(C_path, mode='w', newline='') as csvfile:
    #         csv_writer = csv.writer(csvfile)
    #         csv_writer.writerow(headers)

    # DataFrameの各行をforループで処理する
    for i, row in D_df.iterrows():
        # 各行のデータにアクセスする例
        product_name = row["商品名"]
        image_url = row["長方形画像URL"]
        product_url = row["商品URL"]
        limited = row["limited"]
        junle = row["大ジャンル"]
        item_category = row["商品カテゴリ"]

        data = scrape_item_detail(product_url, headers, product_name)
        
        data[0] = junle
        data[1] = item_category
        data[2] = product_name
        data[3] = image_url
        data[5] = product_url
        data[19] = limited
        if not limited:
            data[20] = True
        else:
            data[20] = False
        data[21] = datetime.now().strftime('%Y-%m-%d')

        with open(C_path, mode='a', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerow(data)


if __name__ == "__main__":
    main()
