import java.io.*;

/**
 * @author 廖福安（liaofuan@rd.keytop.com.cn）
 * @date 2016/5/4.
 */
public class ReadFile {

    public static void main(String[] args) {

        File file = new File("test.txt");

        if (file.exists()) {
            System.out.print("exist\r\n");
            try {
                FileInputStream fis = new FileInputStream(file);
                InputStreamReader isr = new InputStreamReader(fis,"UTF-8");
                BufferedReader br = new BufferedReader(isr);
                String str;
                while((str = br.readLine()) !=null){
                    System.out.print(str);
                }
                br.close();
                isr.close();
                fis.close();
                System.out.println("写入完成！");
             } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


        File newfile = new File("newTest.txt");
        try {
            FileOutputStream fos = new FileOutputStream(newfile);
            OutputStreamWriter osw = new OutputStreamWriter(fos,"UTF-8");
            BufferedWriter bw = new BufferedWriter(osw);

            bw.write("  断水流\n");
            bw.write("  抽刀断水水更流，举杯消愁愁更愁\n");

            bw.close();
            osw.close();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
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
