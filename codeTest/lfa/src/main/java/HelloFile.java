import java.io.File;
import java.io.IOException;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/4.
 */
public class HelloFile {

    public static void main(String[] args) {

        File file = new File("test.txt");
        if (file.exists()) {
            System.out.println(file.isFile());
            System.out.println(file.isDirectory());
        } else {
            System.out.println("文件不存在！");
            try {
                file.createNewFile();
                System.out.println("文件已经成功创建！");
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

}
