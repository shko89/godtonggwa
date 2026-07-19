import sys
import os

filepath = 'C:/Users/shko8/godtonggwa/public/STEST/weekly/timeattack/assets/index-CXWh_ofI.js'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the HS modal rendering with a redirect to the main app if not authenticated
# Original: :(0,$.jsx)(HS,{})}
# New: :(window.location.href="/STEST/exam.html",null)}
text = text.replace(':(0,$.jsx)(HS,{})}', ':(window.location.href="/STEST/exam.html",null)}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("timeattack JS updated to remove test modal.")
