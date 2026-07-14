import re
import os

def fix_img_paths():
    html_path = r"g:\내 드라이브\주간지\2주차\week_2028_02_final.html"
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace src="./week_2028_02/FILENAME"
    # with src="https://firebasestorage.googleapis.com/v0/b/godtonggwa.firebasestorage.app/o/questions%2Fweek%2F2028%2Fweek_2028_02%2FFILENAME?alt=media"
    
    def repl(match):
        filename = match.group(1)
        firebase_url = f"https://firebasestorage.googleapis.com/v0/b/godtonggwa.firebasestorage.app/o/questions%2Fweek%2F2028%2Fweek_2028_02%2F{filename}?alt=media"
        return f'src="{firebase_url}"'

    new_content = re.sub(r'src="\./week_2028_02/([^"]+\.png)"', repl, content)
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Fixed image paths to point to Firebase Storage.")

if __name__ == '__main__':
    fix_img_paths()
