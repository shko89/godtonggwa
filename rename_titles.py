import os

base_dir = 'g:/내 드라이브/주간지'
folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]

for folder in folders:
    old_path = os.path.join(base_dir, folder, 'title.html')
    new_path = os.path.join(base_dir, folder, 'page01.html')
    
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed {old_path} -> {new_path}")
    else:
        print(f"File not found: {old_path}")
