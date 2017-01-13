package com.keytop.thread;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/30.
 */
public class MyRunnable implements Runnable{

    private String name;
    public MyRunnable(String name){
        this.name = name;
    }

    public void run(){
        for (int i = 0 ; i<1000; i++){
            System.out.println(name+":"+i);
        }

    }

}
