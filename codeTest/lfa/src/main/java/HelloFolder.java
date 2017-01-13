import java.io.File;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/5.
 */
public class HelloFolder {
    public static void main(String[] args){
       /* File folder = new File("my new folder/one/two/three/main");
        if (folder.mkdirs()) {
            System.out.print("文件夹创建完成！\r\n");
        }else {
            if(folder.exists()){
            System.out.print("文件夹已经存在！！\r\n");
            }else {
                System.out.println("文件夹创建失败！");
            }
        }*/

      /*  File folder = new File("my new folder");
        File newfolder = new File("my new folder-new");
        if ((folder.renameTo(newfolder))){
            System.out.println("done");
        }else {
            System.out.print("fail \r\n");
        }*/
        File folder = new File("my new folder-new/one/two/three/main");
        if (folder.delete()){
            System.out.println("done");
        }else {
            System.out.println("fail");
        }
    }
}
