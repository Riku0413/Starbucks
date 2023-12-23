import chardet
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

# スクレイピング対象のURL
URL = 'https://product.starbucks.co.jp/allergy/nutrient/'

chrome_driver_path = '/Users/kobayashiriku/opt/anaconda3/lib/python3.9/site-packages/chromedriver_binary/chromedriver'
chrome_service = Service(chrome_driver_path)
driver = webdriver.Chrome(service=chrome_service)

# ロガーの用意
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# リトライ処理のための変数
max_retries = 1
retry_delay = 1


def extract_value_unit(input_string):
    match = re.match(r'([\d.]+)\s*([a-zA-Z]+)', input_string)
    return (float(match.group(1)), match.group(2)) if match else None


def scrape_data(url, csv_file_path):
    headers = ["大ジャンル", "販売カテゴリ", "商品カテゴリ", "商品名", "ミルクカスタム", "エネルギー", "タンパク質", "脂質", "炭水化物", "食塩相当量", "食物繊維", "糖質", "ナトリウム", "カリウム", "トランス脂肪酸", "飽和脂肪酸", "カフェイン"]
    # headers = ["大ジャンル", "販売カテゴリ", "商品カテゴリ", "商品名", "ミルクカスタム", "エネルギー", "タンパク質", "脂質", "炭水化物", "食塩相当量", "食物繊維", "糖質", "ナトリウム", "カリウム", "トランス脂肪酸", "飽和脂肪酸", "お酒の使用"]

    category = ""
    shop_category = ""
    item_category = ""
    # milk = ""

    with open(csv_file_path, mode='w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(headers)

    for attempt in range(max_retries):
        try:
            driver.get(url)
            time.sleep(0.5)

            logger.info(f"Scraping the data of {url}")

            selected_html = driver.page_source
            soup = BeautifulSoup(selected_html, 'html.parser')
            # element_1 = soup.find("div", class_='beverage-STARBUCKS')
            # element_1 = soup.find("div", class_='food-STARBUCKS')
            # element_1 = soup.find("div", class_='beverage-RESERVE')
            element_1 = soup.find("div", class_='beverage-ROASTERY')
            element_2 = element_1.find_all("div", class_="alle-l-outer")

            print(f"length of elements: {len(element_2)}")

            for i, element in enumerate(element_2):
                if i == 0: continue

                if i % 2 == 1:
                    category = element.find("h4").text
                    shop_category = element.find("div", class_="store-kbn-name").text
                    print(category)
                    print(shop_category)

                elif i % 2 == 0:
                    table = element.find("div", class_="js-table-origin").find("tbody")
                    tr_elements = table.find_all("tr")
                    print(f"length of tr: {len(tr_elements)}")
                    
                    for tr in tr_elements:
                        if "tr-category" in tr.get("class", []):
                            item_category = tr.find("h4").text
                            print(f"item category: {item_category}")
                            continue
                        if "tr-menu" in tr.get("class", []):
                            data = [None for _ in range(len(headers))]
                            data[0] = category
                            data[1] = shop_category
                            data[2] = item_category
                            if tr.find("th", class_="is-product"):
                                item = tr.find("th", class_="is-product").find("span").text
                                print(f"item: {item}")
                            data[3] = item
                            if "tr-milk" in tr.get("class", []):
                                milk = tr.find("span").text
                            else:
                                milk = ""
                            print(f"milk: {milk}")
                            data[4] = milk
                            td_elements = tr.find_all("td")
                            if len(td_elements) > 0:
                                print(f"length of td: {len(td_elements)}")
                                for i, td in enumerate(td_elements):
                                    try:
                                        value = float(td.text)
                                    except:
                                        value = td.text
                                    print(f"value: {value}")
                                    data[i + 5] = value

                                with open(csv_file_path, mode='a', newline='') as csvfile:
                                    csv_writer = csv.writer(csvfile)
                                    csv_writer.writerow(data)

            logger.info(f"Successfully retrieved the data of {url}")

        except requests.exceptions.RequestException as e:
            logger.error(f"An error occurred during the request of \"{url}\": {str(e)}")

            if attempt < max_retries - 1:
                logger.warning(f"Retrying ({attempt + 1}/{max_retries}) after {retry_delay} seconds...")
                time.sleep(retry_delay)
                continue

            return

        except Exception as e:
            logger.error(f"An unexpected error occurred during scraping the data of \"{url}\": {str(e)}")
            return

    return


def main(): 
    csv_file_path = "beverage-ROASTARY.csv"

    scrape_data(URL, csv_file_path)


if __name__ == "__main__":
    main()
