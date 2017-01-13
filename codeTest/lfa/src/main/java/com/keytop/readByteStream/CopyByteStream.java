package com.keytop.readByteStream;

import java.io.*;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/5.
 */
public class CopyByteStream {

    public static  void main(String[] args){
        try {
            FileInputStream fis =  new FileInputStream("dtws.png");
            FileOutputStream fos = new FileOutputStream("dt.png");

            byte input[] = new byte[100];
            while (fis.read(input) != -1){
                fos.write(input);
            }
            fis.close();
            fos.close();
            System.out.println("done");

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
