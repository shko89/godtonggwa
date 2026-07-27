import os
import glob
import codecs
import re

target_dir = r'G:\내 드라이브\주간지\1주차'
page_files = glob.glob(os.path.join(target_dir, 'page*.html'))

removed_count = 0
for file_path in page_files:
    with codecs.open(file_path, 'r', 'utf-8') as f:
        content = f.read()
    
    # We want to remove the page-wrapper that contains a btn-download
    # It might contain multiple buttons or just one.
    # We will use re.sub with DOTALL to catch the block.
    # Since a page-wrapper might contain a concept-spread (which we WANT to keep),
    # we only match page-wrappers that immediately contain a btn-download.
    pattern = r'<div class="page-wrapper"[^>]*>\s*<button class="btn-download"[^>]*>.*?</button>\s*</div>'
    
    # Check if there are multiple buttons in one wrapper
    pattern2 = r'<div class="page-wrapper"[^>]*>(?:\s*<button class="btn-download"[^>]*>.*?</button>)+\s*</div>'
    
    new_content, count1 = re.subn(pattern2, '', content, flags=re.DOTALL)
    
    # Also, some wrappers might not have closing divs perfectly matched if they were at the end, 
    # but let's try the strict match first.
    # Actually, a simpler way: just remove the <div class="page-wrapper"...> if it doesn't contain concept-spread,
    # but the safest regex is matching <div class="page-wrapper"[^>]*>\s*<button class="btn-download".*?</button>\s*</div>
    
    # Let's also catch cases where the </div> is missing at the very end of the file.
    pattern3 = r'<div class="page-wrapper"[^>]*>(?:\s*<button class="btn-download"[^>]*>.*?</button>)+\s*(?:</div>)?\s*$'
    new_content, count2 = re.subn(pattern3, '', new_content, flags=re.DOTALL)
    
    # Also catch dangling buttons just in case
    pattern_dangling = r'<button class="btn-download"[^>]*>.*?</button>'
    new_content, count3 = re.subn(pattern_dangling, '', new_content, flags=re.DOTALL)
    
    # And empty page-wrappers that we might have left behind
    pattern_empty = r'<div class="page-wrapper"[^>]*>\s*</div>'
    new_content, count4 = re.subn(pattern_empty, '', new_content, flags=re.DOTALL)
    
    if count1 > 0 or count2 > 0 or count3 > 0 or count4 > 0:
        with codecs.open(file_path, 'w', 'utf-8') as f:
            f.write(new_content)
        removed_count += 1
        print(f"Removed buttons from {os.path.basename(file_path)}")

print(f"Total files updated: {removed_count}")
