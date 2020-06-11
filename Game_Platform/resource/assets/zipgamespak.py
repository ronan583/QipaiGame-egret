import os, zipfile, shutil
def get_zip_file(input_path, result):
  files = os.listdir(input_path)
  for file in files:
    if os.path.isdir(input_path + '/' + file):
      get_zip_file(input_path + '/' + file, result)
    else:
      result.append(input_path + '/' + file)
def zip_file_path(input_path, output_path, output_name):
  f = zipfile.ZipFile(output_path + '/' + output_name, 'w', zipfile.ZIP_DEFLATED)
  filelists = []
  get_zip_file(input_path, filelists)
  for file in filelists:
    f.write(file)
  f.close()
  return output_path + r"/" + output_name
  
if __name__ == "__main__":
  game_list = ['brnn', 'bcbm', 'bjl', 'by', 'ddz', 'duobao', 'dzpk', 'ermj', 'fqzs', 'fruit', 'hhdz', 'lhdz', 'pdk', 'qznn', 'tb', 'tgpd', 'zjh']
  for game in game_list:
	print game + 'begin'
	zip_file_path(r'./' + game, './', game + '.zip')
	print game + 'move'
	os.remove(r'I:/Work/sky-game-dev/client/2.0.2/gameres/' + game + '.zip')
	shutil.move(r'./' + game + r'.zip',r'I:/Work/sky-game-dev/client/2.0.2/gameres/')
	print game + 'complete'