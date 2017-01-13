import java.io.File;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/4.
 */
public class SetFileProperty {

    public static void main(String[] args){

        File file = new File("hello.txt");

        if(file.exists()){
          /*  file.setWritable(false);
            file.setReadable(true);*/
            file.setReadOnly();
        }

       /* System.out.println("判断文件是否存在"+file.exists());
        System.out.println("读取文件名称"+file.getName());
        System.out.println("读取文件路径:"+file.getPath());
        System.out.println("读取文件绝对路径："+file.getAbsolutePath());
        System.out.println("读取文件父级路径："+new File(file.getAbsolutePath()).getParent());
        System.out.println("读取文件大小："+(float)file.length()/1000+"KB");
        System.out.println("判断文件是否被隐藏："+file.isHidden());
        System.out.println("判断文件是否可读："+file.canRead());
        System.out.println("判断文件是否可写："+file.canWrite());
        System.out.println("判断文件是否为文件夹："+file.mkdir());*/


    }

}
