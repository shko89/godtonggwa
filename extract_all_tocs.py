import os
import re
import json

base_dir = 'g:/내 드라이브/주간지'
folders = [f"{i}주차" for i in range(3, 9)] + ["9회차", "10회차"]
out_path = 'g:/내 드라이브/주간지/all_tocs.txt'

with open(out_path, 'w', encoding='utf-8') as fout:
    for folder in folders:
        js_path = os.path.join(base_dir, folder, "weekly_part1.js")
        if os.path.exists(js_path):
            with open(js_path, 'r', encoding='utf-8') as f:
                js_text = f.read()
            
            theme = re.search(r'mainTheme:\s*"([^"]*)"', js_text)
            keywords = re.search(r'coverKeywords:\s*"([^"]*)"', js_text)
            
            fout.write(f"--- {folder} ---\n")
            fout.write(f"Theme: {theme.group(1) if theme else 'None'}\n")
            fout.write(f"Keywords: {keywords.group(1) if keywords else 'None'}\n")
            
            toc_start = js_text.find('toc:')
            toc_end = js_text.find('],', toc_start)
            if toc_start != -1 and toc_end != -1:
                toc_chunk = js_text[toc_start:toc_end]
                items = re.findall(r'{[^{}]+}', toc_chunk)
                for item in items:
                    m_title = re.search(r'title:\s*"([^"]*)"', item)
                    m_desc = re.search(r'desc:\s*"([^"]*)"', item)
                    if m_title and "Fit 20" not in m_title.group(1):
                        fout.write(f" - {m_title.group(1)} : {m_desc.group(1) if m_desc else ''}\n")
            fout.write("\n")
