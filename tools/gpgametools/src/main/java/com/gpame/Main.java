package com.gpame;


import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    private static String outputWorkDir ;

    public static void main(String[] args) {
        if(args.length != 4) {
            System.err.println("args error : workDir, originDir, contentDir, outputWorkDir");
            return;
        }
        String workDir = args[0];
        String originDir = args[1];
        String contentDir = args[2];
        outputWorkDir = args[3];
        System.out.println("workdir : " + workDir);
        System.out.println("originDir : " + originDir);
        System.out.println("contentDir : " + contentDir);
        System.out.println("outputWorkDir : " + outputWorkDir);
        compareDiffContent(workDir, originDir, contentDir);
    }

    private static List<DiffContent> compareDiffContent(String workDir, String originPath, String contentPath) {
        List<DiffContent> diffContentList = new ArrayList<>(100);
        File originFile = new File(workDir + originPath + "\\");
        if(!originFile.exists()) {
            System.err.println(originPath + "不存在");
            return null;
        }

        File contentFile = new File(workDir + contentPath + "\\");
        if(!contentFile.exists()) {
            System.err.println(contentPath + "不存在");
            return null;
        }

        List<String> contentFiles = new ArrayList<>(200);
        getAllFileName(contentFile, contentFiles);

        for(String filePath : contentFiles) {
            if(new File(filePath).isDirectory()) continue;
            // System.out.println(filePath);
            String subFilePath = filePath.replace(workDir + contentPath, "");
            String originFilePath = workDir + originPath + "\\" + subFilePath;

            // String originFilePath = filePath.replace(contentPath, originPath);
            File file = new File(originFilePath);
            if(!file.exists()) {
                // 源文件不存在  那么新文件肯定需要
                DiffContent diffContent = new DiffContent();
                diffContent.setOriginPath(originFilePath);
                diffContent.setCurPath(filePath);
                diffContentList.add(diffContent);
            } else {
                File compreFile = new File(filePath);
                System.out.println("正在比对:" + compreFile.getName());
                String originMd5 = Md5CaculateUtil.getMD5(file);
                String contentMd5 = Md5CaculateUtil.getMD5(compreFile);
                if(!originMd5.equals(contentMd5)) {
                    // 文件md5不相同
                    DiffContent diffContent = new DiffContent();
                    diffContent.setOriginPath(originFilePath);
                    diffContent.setCurPath(filePath);
                    diffContentList.add(diffContent);
                }
            }
        }

        for(DiffContent dc : diffContentList) {
            System.out.println(dc.getCurPath());
            String file0 = dc.getCurPath().replace(workDir +contentPath,"");
            // 输出到output
            File file = new File(outputWorkDir + file0);
            if(!file.exists()) {
                String dir = file.getAbsolutePath().substring(0, file.getAbsolutePath().lastIndexOf("\\"));
                File dirFile = new File(dir);
                if(!dirFile.exists()) {
                    dirFile.mkdirs();
                }
                try {
                    file.createNewFile();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            try {
                copyFile(new File(dc.getOriginPath()), file.getAbsoluteFile());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return diffContentList;
    }

    public static void copyFile(File sourceFile,File targetFile)
            throws IOException{
        // 新建文件输入流并对它进行缓冲
        FileInputStream input = new FileInputStream(sourceFile);
        BufferedInputStream inBuff=new BufferedInputStream(input);

        // 新建文件输出流并对它进行缓冲
        FileOutputStream output = new FileOutputStream(targetFile);
        BufferedOutputStream outBuff=new BufferedOutputStream(output);

        // 缓冲数组
        byte[] b = new byte[1024 * 5];
        int len;
        while ((len =inBuff.read(b)) != -1) {
            outBuff.write(b, 0, len);
        }
        // 刷新此缓冲的输出流
        outBuff.flush();

        //关闭流
        inBuff.close();
        outBuff.close();
        output.close();
        input.close();
    }


    /**
          * 获取一个文件夹下的所有文件全路径
          * @param path
          * @param listFileName
          */
    public static void getAllFileName(File file,List<String> listFileName){
        File [] files = file.listFiles();
        String [] names = file.list();
        if(names != null){
            String [] completNames = new String[names.length];
            for(int i=0;i<names.length;i++){
                completNames[i]=file.getAbsolutePath() + "\\" + names[i];
            }
            listFileName.addAll(Arrays.asList(completNames));
        }
        for(File a:files){
            if(a.isDirectory()){//如果文件夹下有子文件夹，获取子文件夹下的所有文件全路径。
                getAllFileName(a,listFileName);
            }
        }
    }
}
