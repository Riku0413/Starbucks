import re
import time
import logging
import requests
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import urlparse


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

URL_LIST = [URL_DRIP, URL_ESPRESSO, URL_FRAPPUCCINO, URL_TEA, URL_DESSERT, URL_PASTRY, URL_SANDWICH, URL_PACKAGE]

dic_1 = {
    "beverage": "ビバレッジ",
    "food": "フード",
    }
dic_2 = {
    "drip": "コーヒー",
    "espresso": "エスプレッソ",
    "frappuccino": "フラペチーノ®",
    "tea": "ティー｜TEAVANA™",
    "dessert": "デザート",
    "pastry": "ペストリー",
    "sandwich": "サンドイッチ",
    "package": "パッケージ",
    }

# 可変箇所１
log_file_path = "./logfile/logfile_20240215_list.log"

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


def scrape_item_list(url):
    lst = []
    try:
        driver.get(url)
        time.sleep(0.5)

        logger.info("Scraping the list page.")

        xpath = '//body/div[@id="vue-product"]/div[@class="wrapper category layout-sub"]/article/div[@class="category-sub product-wrap"]/div[@class="category-sub-right"]/div[@class="category-recommend api-data"]/div[@class="card-wrap sub-wrap category-sub-layout"]'

        res = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, xpath)))
        target_html = res.get_attribute('outerHTML')

        soup = BeautifulSoup(target_html, 'html.parser') 

        divs = soup.find_all('div', class_='card')

        for div in divs:
            a = div.find('a')
            detail_url = "https:" + a.get('href')
            img = div.find('img')
            if div.find('div').find('span'):
                limited = True
            else:
                limited = False
            image_url = img.get('src')
            name = img.get('alt')
            lst.append([name, image_url, detail_url, limited])

        logger.info("Successfully retrieved the list of data.")

    except requests.exceptions.RequestException as e:
        logger.error(f"An error occurred during the request: {str(e)}")
        return

    except Exception as e:
        logger.error(f"An unexpected error occurred during scraping: {str(e)}")
        return

    return lst


def main(): 
    # 可変箇所２
    B_path = "./B.csv"
    D_path = "./D.csv"
    
    df = pd.read_csv('../data/Current.csv')
    headers = ["商品名", "長方形画像URL", "商品URL", "limited", "大ジャンル", "商品カテゴリ"]

    B_df = pd.DataFrame(columns=df.columns)
    D_df = pd.DataFrame(columns=headers)

    B_df.to_csv(B_path, index=False)
    D_df.to_csv(D_path, index=False)

    ignore_items = ['ポットサービス', 'スターバックス® コーヒートラベラー']

    for url in URL_LIST:
        lst = scrape_item_list(url)

        parsed_url = urlparse(url)
        path = parsed_url.path
        last_two_elements = path.split('/')[-3:-1]

        for item in lst:
            if item[0] in ignore_items:
                continue

            matching_rows = df[df['商品名'] == item[0]]
            if not matching_rows.empty:
                matching_rows.to_csv(B_path, mode='a', header=False, index=False)
            else:
                item += [dic_1[last_two_elements[0]], dic_2[last_two_elements[1]]]
                item_df = pd.DataFrame([item], columns=headers)
                item_df.to_csv(D_path, mode='a', header=False, index=False)


if __name__ == "__main__":
    main()
