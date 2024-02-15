import pandas as pd

def main():
    current_csv_path = "../data/Current.csv"
    b_3_csv_path = "../data/B_3.csv"
    back_number_csv_path = "../data/Back_Number.csv"
    
    current_df = pd.read_csv(current_csv_path)
    b_3_df = pd.read_csv(b_3_csv_path)
    
    missing_data = current_df[~current_df['商品名'].isin(b_3_df['商品名'])]
    
    # Back_Number.csvに追加
    with open(back_number_csv_path, 'a', newline='') as f:
        missing_data.to_csv(f, header=f.tell()==0, index=False)
    
if __name__ == "__main__":
    main()
