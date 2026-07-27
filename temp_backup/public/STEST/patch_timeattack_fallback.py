import sys

filepath = 'C:/Users/shko8/godtonggwa/public/STEST/weekly/timeattack/assets/index-CXWh_ofI.js'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Original catch block:
# }catch(e){console.error(e),p(Array.from({length:20}).map((e,t)=>({id:t+1,answer:`1`,score:2.5})))}
# We want to change it to:
# }catch(e){console.error(e),p(Array.from({length:20}).map((e,t)=>({id:t+1,answer:`1`,score:2.5,fileName:`${a}_mock_q${String(t+1).padStart(2,'0')}.png`})))

old_catch = "}catch(e){console.error(e),p(Array.from({length:20}).map((e,t)=>({id:t+1,answer:`1`,score:2.5})))}"
new_catch = "}catch(e){console.error(e),p(Array.from({length:20}).map((e,t)=>({id:t+1,answer:`1`,score:2.5,fileName:`${a}_mock_q${String(t+1).padStart(2,'0')}.png`})))}"

text = text.replace(old_catch, new_catch)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("timeattack JS updated to include fileName in fallback data.")
