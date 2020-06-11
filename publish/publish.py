import os

with open('./GlobalTemplate.ts','r') as f:
    globalTemplate = f.readlines()
print(globalTemplate)
for i in range(0, len(globalTemplate)):
    globalTemplate[i] = globalTemplate[i].replace('-serverIp-', '127.0.0.1')
    globalTemplate[i] = globalTemplate[i].replace('-serverPort-', 3800)
    globalTemplate[i] = globalTemplate[i].replace('-version-', '2.0.2.80')

print(globalTemplate)
#os.system('egret publish ../Game_Platform --runtime android')
