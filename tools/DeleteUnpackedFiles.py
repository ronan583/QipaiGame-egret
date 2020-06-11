import os 
import string 
def del_files(dir,topdown=True): 
  needCheckArr = [
    "bjl",
    "brnn",
    "by",
    "ddz",
    "duobao",
    "dzpk",
    "ermj",
    "fruit",
    "hhdz",
    "lhdz",
    "pdk",
    "qznn",
    "tgpd",
    "zjh"
  ]
  bjlExclude = [
    "cardAssets.json",
    "cardAssets.png"
  ]
  for root, dirs, files in os.walk(dir, topdown): 
    for name in dirs: 
      if name in needCheckArr:
        if name == "bjl":
          bjlpath = os.path.join(root,name)
          for root, dirs, files in os.walk(bjlpath, topdown): 
            for filename in files:
              if filename in bjlExclude:
                print(os.path.join(bjlpath,filename))
              else
                os.remove(os.path.join(bjlpath,filename)
        else
          print(os.path.join(root,name)) 
          os.remove(os.path.join(root,name))
dir = "E:/GitHub/gpgame/client/Game_Platform_android/assets/game/resource/assets"
print(dir) 
del_files(dir)