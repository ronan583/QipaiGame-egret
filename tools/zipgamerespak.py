#coding=utf-8
#甄码农python代码
#使用zipfile做目录压缩，解压缩功能
import os,os.path
import zipfile
def zip_dir(dirname,zipfilename):
  filelist = []
  if os.path.isfile(dirname):
    filelist.append(dirname)
  else :
    for root, dirs, files in os.walk(dirname):
      for name in files:
        filelist.append(os.path.join(root, name))
  zf = zipfile.ZipFile(zipfilename, "w", zipfile.zlib.DEFLATED)
  for tar in filelist:
    arcname = tar[len(dirname):]
    #print arcname
    zf.write(tar,arcname)
  zf.close()
def unzip_file(zipfilename, unziptodir):
  if not os.path.exists(unziptodir): os.mkdir(unziptodir, 0777)
  zfobj = zipfile.ZipFile(zipfilename)
  for name in zfobj.namelist():
    name = name.replace('\\','/')
    if name.endswith('/'):
      os.mkdir(os.path.join(unziptodir, name))
    else:
      ext_filename = os.path.join(unziptodir, name)
      ext_dir= os.path.dirname(ext_filename)
      if not os.path.exists(ext_dir) : os.mkdir(ext_dir,0777)
      outfile = open(ext_filename, 'wb')
      outfile.write(zfobj.read(name))
      outfile.close()
if __name__ == '__main__':
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/bjl',r'I:/Work/gpgame-release/client/2.0.1/bjl.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/brnn',r'I:/Work/gpgame-release/client/2.0.1/brnn.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/by',r'I:/Work/gpgame-release/client/2.0.1/by.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/ddz',r'I:/Work/gpgame-release/client/2.0.1/ddz.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/duobao',r'I:/Work/gpgame-release/client/2.0.1/duobao.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/dzpk',r'I:/Work/gpgame-release/client/2.0.1/dzpk.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/ermj',r'I:/Work/gpgame-release/client/2.0.1/ermj.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/fruit',r'I:/Work/gpgame-release/client/2.0.1/fruit.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/hhdz',r'I:/Work/gpgame-release/client/2.0.1/hhdz.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/lhdz',r'I:/Work/gpgame-release/client/2.0.1/lhdz.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/pdk',r'I:/Work/gpgame-release/client/2.0.1/pdk.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/qznn',r'I:/Work/gpgame-release/client/2.0.1/qznn.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/tb',r'I:/Work/gpgame-release/client/2.0.1/tb.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/tgpd',r'I:/Work/gpgame-release/client/2.0.1/tgpd.zip')
  zip_dir(r'I:/Work/gpgame-client-new/gpgame-client-new/Game_Platform/resource/assets/zjh',r'I:/Work/gpgame-release/client/2.0.1/zjh.zip')
  