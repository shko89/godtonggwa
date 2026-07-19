import sys

filepath = 'C:/Users/shko8/godtonggwa/public/STEST/weekly/timeattack/assets/index-CXWh_ofI.js'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the strict auth check failure (null) with a fallback to localStorage or a test email
text = text.replace("s(e?e.email||e.uid||`student@godtonggwa.com`:null)", "s(e?e.email||e.uid||`student@godtonggwa.com`:window.localStorage.getItem('userEmail')||'test@test.com')")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Auth bypass applied to timeattack.")
