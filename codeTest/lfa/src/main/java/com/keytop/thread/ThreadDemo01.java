package com.keytop.thread;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/30.
 */
public class ThreadDemo01 {

    public static void main(String[] args){

      /*  NyThread a = new NyThread("A");
        NyThread b = new NyThread("B");
        a.start();
        b.start();*/
        MyRunnable r1 = new MyRunnable("A");
        MyRunnable r2 = new MyRunnable("B");
        Thread t1 = new Thread(r1);
        Thread t2 = new Thread(r2);
        t1.start();
        t2.start();

    }
}
