import os

source_file = 'g:/내 드라이브/주간지/2주차/week_2028_02_final.html'
work_dir = 'g:/내 드라이브/주간지'
css_file = os.path.join(work_dir, 'weekly_common.css')
template_file = os.path.join(work_dir, 'base_template.html')
build_script = os.path.join(work_dir, 'build_weekly.py')
sample_dir = os.path.join(work_dir, 'sample_pages')

# 1. Read the original HTML
with open(source_file, 'r', encoding='utf-8') as f:
    text = f.read()

# 2. Extract CSS
style_start = text.find('<style>')
style_end = text.find('</style>')

if style_start != -1 and style_end != -1:
    css_content = text[style_start+7:style_end].strip()
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("Created weekly_common.css")

# 3. Create base_template.html
# Let's replace the whole style tag with a link tag for previews, 
# and a specific marker for the build script to inject CSS back.
head_end = text.find('</head>')
if head_end != -1:
    # Instead of replacing <style>, let's just make the template clean.
    # The template will have <!-- INJECT_CSS_HERE -->
    template_text = text[:style_start] + '<!-- INJECT_CSS_HERE -->\n' + text[style_end+8:]
    
    # Now find where the pages start. It looks like: <div class="page-wrapper" ...>
    page_wrapper_idx = template_text.find('<div class="page-wrapper"')
    # And it ends right before the script tags at the bottom.
    script_idx = template_text.rfind('<script', 0, len(template_text))
    
    if page_wrapper_idx != -1 and script_idx != -1:
        # We will wrap the page content area with <!-- INJECT_PAGES_HERE -->
        # Actually, let's keep the very first page_wrapper declaration if it's a global one, 
        # but the pages themselves are inside it.
        # To be safe and simple, let's just replace everything between page_wrapper_idx and script_idx
        # with our marker, assuming the user will put <div class="page-wrapper"> inside their pages if needed,
        # or we just keep the wrapper in the template.
        
        # Let's find the first <div class="a4-page"
        first_page_idx = template_text.find('<div class="a4-page"', page_wrapper_idx)
        if first_page_idx != -1:
            # Find the end of the last page before the scripts.
            # Usually the flipbook-container div is after the pages.
            flipbook_container = template_text.find('<div id="flipbook-container"')
            if flipbook_container != -1:
                base_html = template_text[:first_page_idx] + '\n\n    <!-- INJECT_PAGES_HERE -->\n\n' + template_text[flipbook_container:]
                with open(template_file, 'w', encoding='utf-8') as f:
                    f.write(base_html)
                print("Created base_template.html")

# 4. Create sample page
os.makedirs(sample_dir, exist_ok=True)
sample_page_content = """<!DOCTYPE html>
<html>
<head>
    <!-- 개별 페이지 미리보기를 위한 스타일 링크 -->
    <link rel="stylesheet" href="../weekly_common.css">
</head>
<body>
    <!-- 여기서부터 실제 페이지 내용만 작업합니다 -->
    <div class="a4-page blank-page" style="background-color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.1); position: relative; height: 707px;">
        <div style="padding: 40px; text-align: center;">
            <h1 style="color: #0284c7;">3주차 샘플 페이지 1</h1>
            <p>이곳에 디자인을 입힙니다.</p>
        </div>
    </div>
</body>
</html>
"""
with open(os.path.join(sample_dir, 'page01.html'), 'w', encoding='utf-8') as f:
    f.write(sample_page_content)
print("Created sample page: page01.html")

# 5. Create build script
build_script_content = """import os
import glob
import re

work_dir = 'g:/내 드라이브/주간지'
css_file = os.path.join(work_dir, 'weekly_common.css')
template_file = os.path.join(work_dir, 'base_template.html')
pages_dir = os.path.join(work_dir, 'sample_pages')  # 쪼갠 페이지들이 있는 폴더
output_file = os.path.join(work_dir, 'week_2028_03_final.html') # 결과물

# 1. CSS 읽기
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

# 2. Template 읽기
with open(template_file, 'r', encoding='utf-8') as f:
    template = f.read()

# 3. CSS 삽입 (배포용 파일은 단일 파일이어야 하므로 css를 텍스트로 박아넣음)
template = template.replace('<!-- INJECT_CSS_HERE -->', f'<style>\\n{css_content}\\n</style>')

# 4. 페이지 내용들 수집
page_files = sorted(glob.glob(os.path.join(pages_dir, '*.html')))
all_pages_html = []

for pf in page_files:
    with open(pf, 'r', encoding='utf-8') as f:
        page_html = f.read()
        # <body> 태그 안의 내용만 추출 (정규식 또는 간단한 find 사용)
        body_start = page_html.find('<body>')
        body_end = page_html.find('</body>')
        if body_start != -1 and body_end != -1:
            content = page_html[body_start+6:body_end].strip()
            all_pages_html.append(content)
        else:
            # body가 없으면 전체 텍스트 추가 (주의 필요)
            all_pages_html.append(page_html)

# 5. 페이지들을 템플릿에 병합
merged_pages = '\\n\\n'.join(all_pages_html)
final_html = template.replace('<!-- INJECT_PAGES_HERE -->', merged_pages)

# 6. 결과 파일 저장
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(final_html)

print(f"빌드 완료! 총 {len(page_files)}개의 페이지가 병합되었습니다.")
print(f"결과 파일: {output_file}")
"""
with open(build_script, 'w', encoding='utf-8') as f:
    f.write(build_script_content)
print("Created build_weekly.py")
