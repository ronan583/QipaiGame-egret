cd /Users/sky/GitHup/client/Game_Platform_android/assets/res/
rm -rf ./*
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/bcbm /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/bjl /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/brnn /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/by /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/ddz /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/duobao /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/dzpk /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/ermj /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/fqzs /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/hhdz /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/lhdz /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/pdk /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/qznn /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/tb /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/tgpd /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/zjh /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv /Users/sky/GitHup/client/Game_Platform_android/assets/game/resource/assets/fruit /Users/sky/GitHup/client/Game_Platform_android/assets/res/
echo '游戏拷贝完成'
cd /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mkdir zip
zip -q -r -o ./zip/bcbm.zip bcbm
zip -q -r -o ./zip/bjl.zip bjl
zip -q -r -o ./zip/brnn.zip brnn
zip -q -r -o ./zip/by.zip by
zip -q -r -o ./zip/ddz.zip ddz
zip -q -r -o ./zip/duobao.zip duobao
zip -q -r -o ./zip/dzpk.zip dzpk
zip -q -r -o ./zip/ermj.zip ermj
zip -q -r -o ./zip/fqzs.zip fqzs
zip -q -r -o ./zip/hhdz.zip hhdz
zip -q -r -o ./zip/lhdz.zip lhdz
zip -q -r -o ./zip/pdk.zip pdk
zip -q -r -o ./zip/qznn.zip qznn
zip -q -r -o ./zip/tb.zip tb
zip -q -r -o ./zip/tgpd.zip tgpd
zip -q -r -o ./zip/zjh.zip zjh
zip -q -r -o ./zip/fruit.zip fruit
echo '游戏压缩完成'
cd /Users/sky/GitHup/client/Game_Platform_android/assets/game/
zip -q -r -o update2.0.2.74.zip ./js ./resource
echo '更新资源压缩完成'
mv update2.0.2.74.zip /Users/sky/GitHup/sky-game-dev/client/2.0.2/update/
echo 'js发布完成'
cd /Users/sky/GitHup/client/Game_Platform_android/assets/res/
mv ./zip/* /Users/sky/GitHup/sky-game-dev/client/2.0.2/gameres
echo '全部发布完成'
