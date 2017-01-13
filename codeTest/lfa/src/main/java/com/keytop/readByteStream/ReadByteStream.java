package com.keytop.readByteStream;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/5.
 */
public class ReadByteStream {

    public static  void main(String[] args){
        try {
            File file = new File("test.txt");
            FileInputStream fis = new FileInputStream("test.txt");
            byte input[] = new byte[1000];
            fis.read(input);
            String inputString = new String(input,"UTF-8");
            System.out.print(inputString +"\n");
            fis.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
