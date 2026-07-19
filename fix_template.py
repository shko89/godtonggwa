import sys
import os

source_file = 'g:/내 드라이브/주간지/2주차/week_2028_02_final.html'
template_file = 'g:/내 드라이브/주간지/base_template.html'

with open(source_file, 'r', encoding='utf-8') as f:
    text = f.read()

style_start = text.find('<style>')
style_end = text.find('</style>')

template_text = text[:style_start] + '<!-- INJECT_CSS_HERE -->\n' + text[style_end+8:]

# From our trace:
# First page_wrapper is at 34492 in the ORIGINAL text
# Last flipbook-container is at 259449 in the ORIGINAL text
# Let's find them dynamically in template_text

page_start = template_text.find('<div class="page-wrapper"')
# There are two flipbook-containers. The last one is at the bottom.
flipbook_end = template_text.rfind('<div id="flipbook-container"')

if page_start != -1 and flipbook_end != -1:
    base_html = template_text[:page_start] + '    <!-- INJECT_PAGES_HERE -->\n\n' + template_text[flipbook_end:]
    with open(template_file, 'w', encoding='utf-8') as f:
        f.write(base_html)
    print('Created base_template.html successfully!')
else:
    print('Failed to find markers.')
