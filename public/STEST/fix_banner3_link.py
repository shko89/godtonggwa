import sys

filepath = 'C:/Users/shko8/godtonggwa/public/STEST/exam.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# The 3rd banner is the Weekly subscription banner. Let's find it.
# It currently has onclick="location.href='../package_info.html'"
# We only want to replace it for the Weekly banner.
idx = text.find('갓통과 WEEKLY<br>')
if idx != -1:
    # Find the nearest onclick="location.href='../package_info.html'" before it
    before_text = text[:idx]
    last_onclick = before_text.rfind("onclick=\"location.href='../package_info.html'\"")
    if last_onclick != -1:
        text = text[:last_onclick] + "onclick=\"location.href='../weekly_info.html'\"" + text[last_onclick + len("onclick=\"location.href='../package_info.html'\""):]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text)
        print("Banner link updated!")
    else:
        print("Could not find onclick for Weekly banner.")
