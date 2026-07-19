import os
import re

base_dir = 'g:/내 드라이브/주간지'
folders = [f'{i}주차' for i in range(4, 9)] + ['9회차', '10회차']
out_path = 'g:/내 드라이브/주간지/themes.txt'

with open(out_path, 'w', encoding='utf-8') as fout:
    for folder in folders:
        js_path = os.path.join(base_dir, folder, 'weekly_part1.js')
        if os.path.exists(js_path):
            with open(js_path, 'r', encoding='utf-8') as f:
                js_text = f.read()
                match = re.search(r'mainTheme:\s*"([^"]*)"', js_text)
                if match:
                    fout.write(f"{folder}: {match.group(1)}\n")
