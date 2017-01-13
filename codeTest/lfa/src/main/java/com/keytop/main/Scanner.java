package com.keytop.main;

import java.io.File;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/5.
 */
public class Scanner {
    public  static  void  main(String[] args){
        printFiles(new File("../lfa"),1);
    }

    public static  void  printFiles(File dir,int tab){
        if(dir.isDirectory()){
            File next[] = dir.listFiles();
            for (int i = 0; i<next.length; i++){
                for (int j=0; j< tab;j++){
                    System.out.print("|--");
                }
                System.out.println(next[i].getName());
                if(next[i].isDirectory()){
                    printFiles(next[i],tab+1);
                }
            }
        }
    }
}
