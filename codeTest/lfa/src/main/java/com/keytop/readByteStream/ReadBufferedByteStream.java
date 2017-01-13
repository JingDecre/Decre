package com.keytop.readByteStream;

import org.apache.commons.io.FileUtils;

import java.io.*;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/5.
 */
public class ReadBufferedByteStream {

    public static  void main(String[] args){
        try {
            FileInputStream fis = new FileInputStream("movie.mp4");
            BufferedInputStream bis = new BufferedInputStream(fis,5000);
            FileOutputStream fos = new FileOutputStream("movie_new.mp4");
            BufferedOutputStream bos = new BufferedOutputStream(fos,5000);
            byte input[] = new byte[1000];
            int count = 0;
            long before = System.currentTimeMillis();
            while (bis.read(input) != -1){
                bos.write(input);
                count++;
            }
            bis.close();
            fis.close();
            bos.close();
            fos.close();
            System.out.println(System.currentTimeMillis()-before+"ms");
            System.out.println("读取了："+count+"次");

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
