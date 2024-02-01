import os
import re
import csv
import time
import argparse
import logging
import requests
from bs4 import BeautifulSoup

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
log_file_path = "./logfile/logfile_20240201.log"

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
            image_url = img.get('src')
            name = img.get('alt')
            # print(a)
            lst.append([name, image_url, detail_url])

        logger.info("Successfully retrieved the list of data.")

    except requests.exceptions.RequestException as e:
        logger.error(f"An error occurred during the request: {str(e)}")
        return

    except Exception as e:
        logger.error(f"An unexpected error occurred during scraping: {str(e)}")
        return

    return lst


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
    parser = argparse.ArgumentParser()
    parser.add_argument('skip', type=int, default=0, help='整数引数（デフォルト: 0）')
    args = parser.parse_args()
    skip = args.skip
    # 可変箇所２
    csv_file_path = "../data/result_20240201.csv"

    headers = ["大ジャンル", "商品カテゴリ", "商品名", "長方形画像URL", "円形画像URL", "商品URL", "エネルギー", "タンパク質", "脂質", "炭水化物", "食塩相当量", "食物繊維", "糖質", "ナトリウム", "カリウム", "トランス脂肪酸", "飽和脂肪酸", "カフェイン", "お酒の使用"]
    
    if not os.path.isfile(csv_file_path):
        with open(csv_file_path, mode='w', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerow(headers)

    # 可変箇所３
    lst = scrape_item_list(URL_DESSERT)

    # print(lst)

    for i, item in enumerate(lst):
        if i < skip:
            continue

        # 臨時処理
        if i == 2:
            break

        data = scrape_item_detail(item[2], headers, item[0])
        # 可変箇所４
        data[0] = "フード"
        data[1] = "デザート"
        data[2] = item[0]
        data[3] = item[1]
        data[5] = item[2]

        with open(csv_file_path, mode='a', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerow(data)


if __name__ == "__main__":
    main()
