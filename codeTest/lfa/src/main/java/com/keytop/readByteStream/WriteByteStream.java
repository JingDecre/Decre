package com.keytop.readByteStream;

import java.io.*;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/5.
 */
public class WriteByteStream {

    public static  void main(String[] args){
        try {
            FileOutputStream fos = new FileOutputStream("texttw.txt");

            String outString = "write 123456写出数据";
            byte output[] = outString.getBytes("UTF-8");

            fos.write(output);

            fos.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
